# ESPECIFICACIÓN TÉCNICA: MÓDULO 4 - HÁBITAT, DISTRIBUCIÓN Y MAPA INTERACTIVO

> **AGENTE ASIGNADO:** Antigravity (Integración de Mapa Leaflet.js en JS + Estilos y HTML)

## REGLAS DE DESARROLLO Y ARQUITECTURA
1. ARCHIVOS A MODIFICAR: `index.html`, `css/styles.css` y `js/mapa.js` (o dentro de `js/main.js`).
2. SEPARACIÓN ESTRICTA: Sin estilos inline ni JS en el archivo HTML.
3. LIBRERÍA EXTERNA EN HTML: Incluir únicamente el CDN de CSS y JS de **Leaflet.js** en las secciones correspondientes de `index.html`.
4. MANTENER MÓDULOS PREVIOS: Colocar la sección justo debajo de `#comparativa`.

---

## 1. ESTRUCTURA EN `index.html`

Crear la sección `<section id="habitat" class="section-habitat">`:

- **CDN de Leaflet (en `<head>` y antes de `</body>`):**
  - CSS: `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />`
  - JS: `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>`

- **Encabezado de Sección:**
  - `<h2>`: "Distribución Geográfica y Hábitat"
  - `<p>`: "Desde Canadá hasta la Patagonia, con presencia histórica y destacada en el Caribe."

- **Contenedor del Mapa e Información (`.habitat-layout`):**
  - **Columna Mapa (`.mapa-wrapper`):**
    - Contenedor interactivo: `<div id="mapa-aura" class="mapa-container"></div>`
  - **Columna Detalles de Hábitat (`.habitat-info`):**
    - Tarjeta 1 (Ecosistemas): Bosques, desiertos, zonas costeras y áreas abiertas.
    - Tarjeta 2 (Corrientes Térmicas): Adaptación para sobrevolar montañas y valles aprovechando el calor del suelo.
    - Tarjeta 3 (Foco Caribeño): Registros e historia en Cuba y Puerto Rico (introducción histórica en el siglo XIX).

---

## 2. ESTILOS EN `css/styles.css`

- **`.mapa-container`**:
  - Altura mínima: `450px` en Desktop, `320px` en Móvil.
  - Ancho: `100%`.
  - Bordes redondeados (`12px`), sombra pronunciada y borde `1px solid #2A2A32`.
  - Z-index controlado para evitar superposición con el menú Sticky.
- **Estilos personalizados para Popups de Leaflet:**
  - Reemplazar estilos blancos por defecto de Leaflet por el tema oscuro del sitio (`.leaflet-popup-content-wrapper` con fondo `#1E1E24`, texto `#F4F4F2`, borde `#D32F2F`).

---

## 3. LÓGICA DEL MAPA EN `js/mapa.js`

- **Inicialización de Leaflet:**
  - Contenedor `#mapa-aura`.
  - Vista continental sobre América (`center: [15.0, -75.0]`, `zoom: 3`).
  - Capa gratuita de OpenStreetMap sin API Key:
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`.
  - Modo oscuro mediante filtro CSS sobre `.leaflet-tile-pane`, con `invert` y `hue-rotate`.
- **Marcadores de Presencia Clave:**
  - Canadá / EE.UU.: migración estacional norteña.
  - Cuba / Puerto Rico: poblaciones caribeñas residentes.
  - Colombia / Región Andina: corredor migratorio y valles interandinos.
  - Argentina / Patagonia: límite austral de distribución.
- **Iconos Personalizados:** `L.divIcon` con círculo carmesí `#D32F2F` y animación de pulso.
- **Renderizado seguro:** `invalidateSize()` mediante `IntersectionObserver`, `resize` y temporizadores iniciales. La visibilidad se maneja con clases CSS, no con estilos inline.
