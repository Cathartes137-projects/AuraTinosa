# ESPECIFICACIÓN TÉCNICA: FASE 4 - AUDITORÍA, OPTIMIZACIÓN (SEO + RENDIMIENTO) Y DESPLIEGUE

## REGLAS GENERALES Y OBJETIVO
1. OBJETIVO: Realizar una auditoría completa y aplicar optimizaciones de rendimiento, adaptabilidad móvil (responsive) y SEO técnico sobre el proyecto `/aura-tinosa-web`.
2. SEPARACIÓN ESTRICTA: Mantener la separación de responsabilidades (HTML semántico en `index.html`, estilos organizados en `css/styles.css` y scripts de optimización/interactividad en `js/main.js`).
3. SCRIPTING Y AUTOMATIZACIÓN: Usar este documento como checklist de refactorización y control de calidad antes del despliegue definitivo.

---

## 1. OPTIMIZACIÓN SEO TÉCNICO Y METADATOS EN `index.html`

### 1.1 Metadatos Básicos y Redes Sociales (Open Graph & Twitter Cards)
Asegurar que el `<head>` de `index.html` contenga los siguientes meta tags enriquecidos:

- **SEO Esencial:**
  - `<title>Aura Tiñosa (Cathartes aura) | Guardián Silencioso del Cielo</title>`
  - Meta description sobre la biología, superolfato, función ecológica y conservación de la Aura Tiñosa.
  - Meta keywords: `Aura Tiñosa, Cathartes aura, Zopilote Aura, buitre americano, aves de puerto rico, aves de cuba, ornitologia, conservacion`.
  - Link canonical.

- **Open Graph (Facebook, WhatsApp, LinkedIn):**
  - `og:type`: `website`
  - `og:title`: `Aura Tiñosa (Cathartes aura) | El Rey Incomprendido del Cielo`
  - `og:description`: `Explora la anatomía, el superolfato y la función ecológica de la Aura Tiñosa a través de una experiencia web interactiva.`
  - `og:image`: `assets/images/og-aura-tinosa.jpg`

- **Twitter Cards:**
  - `twitter:card`: `summary_large_image`
  - `twitter:title`: `Aura Tiñosa | Guardián Silencioso del Cielo`
  - `twitter:description`: `Guía interactiva sobre la biología, ecología y conservación del Cathartes aura.`

### 1.2 Datos Estructurados (Schema.org / JSON-LD)
Incrustar un bloque `<script type="application/ld+json">` en el `<head>` para indexación ornitológica:

- Categoría Schema: `Taxon` / `BiologicalSpecies`
- Nombre científico: `Cathartes aura`
- Nombres comunes: `Aura Tiñosa`, `Turkey Vulture`, `Zopilote Aura`
- Descripción biológica y ecológica del ave.

---

## 2. ADAPTABILIDAD MÓVIL (RESPONSIVE DESIGN) EN `css/styles.css` Y `js/main.js`

### 2.1 Ajustes Layout y Viewport
- Confirmar el meta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Prevenir el desbordamiento horizontal en `css/styles.css` (`html, body { max-width: 100%; overflow-x: hidden; }`).
- **Menú de Navegación Móvil (Hamburger Toggle):**
  - Implementar en `index.html` el botón de menú hamburguesa (`.nav-toggle`) visible en pantallas pequeñas (`< 768px`).
  - En `js/main.js`, añadir el evento de apertura/cierre para activar `.nav-menu.active`.
  - En `css/styles.css`, asegurar que los enlaces tengan áreas de toque cómodas (mínimo 44px por 44px).

### 2.2 Breakpoints Flexibles
Verificar que las cuadrículas de tarjetas se adapten suavemente:
- Mobile First (Base): 1 columna (`grid-template-columns: 1fr`).
- Tablet (`>= 768px`): 2 columnas (`grid-template-columns: repeat(2, 1fr)`).
- Desktop (`>= 1024px`): 4 columnas para cifras y 2 columnas para adaptaciones de gran tamaño.

---

## 3. PRUEBAS DE RENDIMIENTO Y CARGA OPTIMIZADA

### 3.1 Carga Diferida (Lazy Loading) y Scripts Asíncronos
- Añadir el atributo `loading="lazy"` a todas las imágenes debajo de la Hero Section.
- Asegurar que los scripts de JavaScript tengan la etiqueta `defer` o estén posicionados antes del cierre de `</body>`.

### 3.2 Optimización de Recursos y Fuentes
- Usar `preconnect` en `index.html` para fuentes y hojas de estilo de mapas.
- Aplicar `font-display: swap;` en las fuentes CSS para evitar texto invisible durante la carga.

---

## 4. CHECKLIST DE CONTROL DE CALIDAD Y DESPLIEGUE FINAL (KILO CLI)

Ejecutar la siguiente rutina de auditoría previa al envío final:

1. **Revisión Sintáctica:** Cero etiquetas HTML mal cerradas y cero estilos inútiles.
2. **Accesibilidad:** Atributos `alt` en imágenes y contraste de color accesible sobre fondo oscuro.
3. **Instrucción para Kilo CLI:**
   - *"Kilo, realiza la auditoría de responsive design, accesibilidad y metadatos SEO en aura-tinosa-web según docs/fase-4-optimizacion.md. Luego inicializa o actualiza el repositorio Git, realiza el commit con el mensaje 'feat: optimizacion SEO, responsive design y rendimiento en Fase 4' y realiza el push a GitHub para el despliegue automático."*
