# ESPECIFICACIÓN TÉCNICA: MÓDULO 6 - GALERÍA MULTIMEDIA, SONIDOS Y COMUNIDAD DE AVISTAMIENTO

> **AGENTE ASIGNADO:** Hermes / Antigravity

## REGLAS DE DESARROLLO Y ARQUITECTURA
1. ARCHIVOS A MODIFICAR: `index.html`, `css/styles.css`, `js/main.js` (o `js/audio.js`).
2. SEPARACIÓN ESTRICTA: Sin estilos inline ni JS incrustado en HTML.
3. CONSERVACIÓN DE CÓDIGO: Ubicar la sección al final de la página antes del Footer.
4. CÓDIGO CLEAN Y FINALIZACIÓN INTEGRAL.

---

## 1. ESTRUCTURA EN `index.html`

Crear la sección `<section id="multimedia" class="section-galeria">`:

- **Encabezado de Sección:**
  - `<h2>`: "Galería Multimedia y Registro de Avistamientos"
  - `<p>`: "Explora la majestuosidad de su vuelo, escucha sus vocalizaciones y únete al registro de observación."

- **Subsección 1: Galería y Audio (`.galeria-audio-container`):**
  - **Tarjeta destacada de audio (`.card-audio`):**
    - Nota informativa: "A diferencia de otras rapaces, el Aura Tiñosa no posee siringe vocal. Su única emisión sonora son siseos y gruñidos de advertencia."
    - Reproductor HTML5 nativo con `controls` y fuentes alternativas:
      `assets/audio/siseo-aura.mp3` y `assets/audio/siseo-aura.wav`.
    - Enlace a `assets/audio/CREDITOS-AUDIO.md` para atribución o método de generación.
  - **Grid de Galería Multimedia (`.galeria-grid`):**
    - Tarjetas fotográficas con placeholders o imágenes de alta calidad (siluetas en planeo, detalle de cabeza roja, envergadura al sol).

- **Subsección 2: Registro de Avistamientos y Pajareo (`.avistamientos-box`):**
  - Formulario interactivo simple para la comunidad de observadores de aves:
    - Campos: Nombre/Alias, Ubicación del avistamiento, Fecha, Notas de comportamiento.
    - Botón de envío: "Reportar Avistamiento" (Estilo `.btn-primary` en carmesí).
  - Enlaces comunitarios a plataformas de avistamiento (*Birdingplaces*, *eBird*, *iNaturalist*).

- **Footer General del Sitio (`<footer class="site-footer">`):**
  - Columna 1: Logo "AURA TIÑOSA" y lema de conservación.
  - Columna 2: Enlaces rápidos de navegación (`#inicio`, `#biologia`, `#comparativa`, `#habitat`, `#cultura`).
  - Columna 3: Créditos de desarrollo (Construido con HTML5, CSS3, JS | Desplegado en Vercel | Orca Workspaces).
  - Texto final de derechos y preservación de especies.

---

## 2. ESTILOS EN `css/styles.css`

- **`.card-audio`**: Fondo `#1E1E24`, borde de énfasis `#D32F2F`, padding amplio y nota informativa con acento carmesí.
- **`audio`**: `width: 100%`, `max-width: 500px` y `accent-color: #D32F2F` paraintegrarse al tema oscuro.
- **`.galeria-grid`**: Grid responsivo con imágenes recortadas (`object-fit: cover`), bordes redondeados y efecto hover con zoom sutil (`transform: scale(1.03)`).
- **`.avistamientos-box`**: Layout de formulario estilizado con inputs en tono oscuro (`#121214`), bordes neutros y focos en carmesí.
- **`.site-footer`**: Fondo carbón profundo (`#0A0A0C`), línea divisoria superior carmesí, texto secundario y redes/enlaces.

---

## 3. LÓGICA DE AUDIO EN `js/main.js` (O `js/audio.js`)

- **Reproductor HTML5:**
  - `js/audio.js` establece el volumen inicial de `#aura-audio` en `0.75`.
  - Los controles nativos del navegador administran reproducir, pausar y buscar.
  - `main.js` coordina `initAuraAudio()` e `initAvistamientosForm()` para evitar inicializaciones duplicadas.
  - Si cambian las fuentes disponibles, `python scripts/setup-audio.py` regenera o descarga el recurso y crea los créditos.
