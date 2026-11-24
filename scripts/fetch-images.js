#!/usr/bin/env node
/**
 * fetch-images.js
 * Descarga las fotografías de Aura Tiñosa / Zopilote Negro usadas en el sitio
 * desde Wikimedia Commons y genera assets/img/CREDITOS.md con la atribución.
 * Incluye las 7 imágenes principales del encargo y una foto de apoyo para la
 * tarjeta de termorregulación/defensa.
 *
 * Uso:  node scripts/fetch-images.js
 *
 * Las licencias se consultan en vivo desde la API; no se asume ninguna.
 */

'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const API = 'https://commons.wikimedia.org/w/api.php';
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'img');
const USER_AGENT = 'AuraTinosaBot/1.0 (proyecto educativo; +https://auratinosa.example.com)';

const IMAGES = [
  {
    file: 'hero.jpg',
    title: 'File:Cathartes aura -Florida -USA -flying-8.jpg',
    width: 1920,
    alt: 'Aura Tiñosa (Cathartes aura) en vuelo majestuoso con las alas extendidas sobre cielo azul',
  },
  {
    file: 'cabeza-roja.jpg',
    title: 'File:Turkey Vulture Head Closeup.jpg',
    width: 1200,
    alt: 'Primer plano de la cabeza desnuda y roja del Aura Tiñosa, con pico ganchudo y ojo visible',
  },
  {
    file: 'olfato-rastreo.jpg',
    title: 'File:Cathartes aura-gliding.jpg',
    width: 1600,
    alt: 'Aura Tiñosa rastreando en planeo con las alas abiertas contra el cielo',
  },
  {
    file: 'vuelo-v.jpg',
    title: 'File:Turkey Vulture - DPLA - c419e3abaa377ee32a81f3f7cab05c0e.jpg',
    width: 1600,
    alt: 'Aura Tiñosa en planeo térmico mostrando el diedro positivo con las alas elevadas en forma de V',
  },
  {
    file: 'defensa-urohidrosis.jpg',
    title: 'File:Getting Some Sun.jpg',
    width: 1600,
    alt: 'Aura Tiñosa con las alas extendidas al sol en postura de termorregulación',
  },
  {
    file: 'huevos-aura.jpg',
    title: 'File:Turkey vulture chick and eg.jpg',
    width: 1200,
    alt: 'Polluelo recién eclosionado junto a los huevos crema con manchas pardas del Aura Tiñosa',
  },
  {
    file: 'zopilote-negro.jpg',
    title: 'File:Black Vulture (Coragyps atratus) portrait ... (28690799946).jpg',
    width: 1600,
    alt: 'Retrato de un Zopilote Negro (Coragyps atratus) con cabeza negruzca y rugosa',
  },
  {
    file: 'aura-percha.jpg',
    title: 'File:Turkey Vulture Perched on Branch 1.jpg',
    width: 1600,
    alt: 'Aura Tiñosa posada en una rama, con la cabeza roja y el plumaje oscuro',
  },
];

function stripHtml(value = '') {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function commons(params) {
  const url = new URL(API);
  url.search = new URLSearchParams({ format: 'json', ...params }).toString();
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`API de Commons respondió ${response.status} para "${params.titles || ''}"`);
  }
  return response.json();
}

async function fetchImage(item) {
  const data = await commons({
    action: 'query',
    titles: item.title,
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: String(item.width || 1600),
    iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|Credit|ImageDescription',
  });

  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined || !page.imageinfo?.[0]) {
    throw new Error(`No se encontró la imagen "${item.title}" en Commons`);
  }

  const info = page.imageinfo[0];
  const meta = info.extmetadata ?? {};
  const sourceUrl = info.thumburl || info.url;

  const response = await fetch(sourceUrl, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) {
    throw new Error(`No se pudo descargar "${item.title}" (${response.status})`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const dest = path.join(OUT_DIR, item.file);
  await fs.writeFile(dest, bytes);

  const credit = {
    file: item.file,
    alt: item.alt,
    title: page.title,
    author: stripHtml(meta.Artist?.value) || 'Autoría no indicada',
    license: stripHtml(meta.LicenseShortName?.value) || 'Ver página del archivo',
    licenseUrl: meta.LicenseUrl?.value || '',
    pageUrl: info.descriptionurl,
    width: info.width,
    height: info.height,
    sizeKb: Math.round(bytes.length / 1024),
  };

  console.log(
    `✓ ${item.file.padEnd(20)} ${credit.width}x${credit.height} · ${credit.sizeKb} KB · ${credit.license}`
  );
  return credit;
}

function buildCredits(credits) {
  const rows = credits
    .map(
      (c) =>
        `| \`${c.file}\` | [${c.title.replace(/^File:/, '')}](${c.pageUrl}) | ${c.author} | [${
          c.license
        }](${c.licenseUrl || c.pageUrl}) |`
    )
    .join('\n');

  return `# Créditos de imágenes

Las siguientes fotografías provienen de [Wikimedia Commons](https://commons.wikimedia.org/)
y se usan bajo sus respectivas licencias libres. Cada archivo conserva los términos de
atribución y compartir igual de su licencia original.

| Archivo local | Archivo original | Autoría | Licencia |
| --- | --- | --- | --- |
${rows}

> Generado automáticamente por \`scripts/fetch-images.js\`. Si se reemplaza una imagen,
> actualice también este archivo y la sección de créditos de \`index.html\`.
`;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Descargando ${IMAGES.length} imágenes en ${OUT_DIR}\n`);

  const credits = [];
  for (const item of IMAGES) {
    credits.push(await fetchImage(item));
  }

  await fs.writeFile(path.join(OUT_DIR, 'CREDITOS.md'), buildCredits(credits), 'utf8');
  console.log(`\nListo. Créditos guardados en assets/img/CREDITOS.md`);
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
});
