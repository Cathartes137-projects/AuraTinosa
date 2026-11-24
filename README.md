# 🦅 Aura Tiñosa (*Cathartes aura*) — Web Platform

**Portal web interactivo, bio-educativo y de alto impacto dedicado al rey de los cielos y limpiador natural de los ecosistemas americanos.**

---

## 📌 Visión General del Proyecto

El portal web de la **Aura Tiñosa** es una plataforma educativa modular construida bajo los principios de **Clean Code** y **separación estricta de responsabilidades**:
- **HTML5 Semántico:** Estructura limpia, jerárquica y accesible.
- **CSS3 Personalizado:** Paleta de diseño en modo oscuro (`#121214`), acento carmesí (`#D32F2F`), variables CSS y adaptabilidad responsive fluida en 3 breakpoints (Móvil, Tablet, Desktop).
- **JavaScript ES6+:** Control del mapa de distribución geográfica interactivo con **Leaflet.js** y manipulación asíncrona de componentes.

---

## 🎨 Paleta de Colores y Sistema de Diseño

| Elemento | Color | Hexadecimal | Función y Uso |
| :--- | :--- | :--- | :--- |
| **Fondo Principal** | Charcoal Dark | `#121214` | Fondo general de la aplicación |
| **Tarjetas / Cards** | Card Dark | `#1E1E24` | Tarjetas de biología, comparativa y módulos |
| **Bordes** | Subtle Border | `#2A2A32` | Delimitación elegante entre componentes |
| **Acento Carmesí** | Crimson Red | `#D32F2F` | Badges, botones activos e íconos de la cabeza desnuda |
| **Texto Principal** | Ivory White | `#F5F5F7` | Encabezados y textos de alta legibilidad |

---

## 🧩 Estructura de Módulos (1 al 6)

### 🔴 Módulo 1: Header & Hero Section
- Navbar fija (*Sticky Navigation*) con navegación suave (*smooth scroll*).
- Hero Banner de gran impacto visual con imagen de fondo en gran formato (`assets/img/hero.jpg`), degradado oscuro de contraste y tipografía jerárquica.

### 🔴 Módulo 2: Biología y Adaptaciones de Supervivencia
- Grid 2x2 de tarjetas informativas (`.card-adaptacion`) con efectos de animación `:hover`:
  1. **Cabeza Desnuda Roja:** Termorregulación e higiene extrema tras alimentarse de carroña.
  2. **Superolfato Único:** Capacidad de detectar etanotiol (gas de descomposición) a grandes distancias.
  3. **Vuelo en Diedro Positivo:** Planeo característico en forma de "V" aprovechando corrientes térmicas.
  4. **Urohidrosis y Vómito Defensivo:** Mecanismos de enfriamiento, desinfección y defensa.
- Subsección sobre Nidificación y Huevos (detalles sobre la pigmentación y grosor del cascarón).

### 🔴 Módulo 3: Comparativa Interactiva (Aura Tiñosa vs. Zopilote Negro)
- Tarjetas y pestañas de filtrado dinámico (*Tabs*).
- Comparativa entre la estrategia de rastreo olfativo de *Cathartes aura* y la caza visual gregaria de *Coragyps atratus*.

### 🔴 Módulo 4: Distribución Geográfica y Mapa Interactivo
- Integración de **Leaflet.js** con capa **OpenStreetMap** (100% gratuita, sin necesidad de API Key).
- Filtro CSS de modo oscuro (`invert` + `hue-rotate`) para alineación estética con la web.
- Marcadores interactivos con popups informativos en Canadá/EE.UU., Caribe (Cuba/Puerto Rico), Región Andina (Colombia) y Sudamérica (Patagonia).

### 🔴 Módulo 5: Dimensión Cultural, Espiritual y Frontera Científica
- Iconografía en la regla de **Osha-Ifá** (purificación espiritual).
- Datos del dataset genómico en **GigaDB** (resistencia a toxinas bacterianas y sistema inmune).
- Investigaciones del *Journal of Caribbean Ornithology* sobre cascarones de huevos pre-DDT.

### 🔴 Módulo 6: Galería Multimedia, Vocalización y Comunidad
- Reproductor de audio HTML5 para siseos (*hissing*) y gruñidos guturales (explicando la ausencia biológica de siringe vocal).
- Galería fotográfica responsive con tarjetas adaptativas (`object-fit: cover`).
- Enlace directo al aplicativo comunitario de avistamientos de aves.
- Footer con derechos y créditos de autoría.

---

## 💻 Arquitectura de Archivos

```text
/AuraTinosa
├── assets/
│   ├── audio/          # Siseo HTML5, WAV alternativo y créditos
│   ├── img/            # Fotografías y galería (Hero, Biología, Comparativa)
│   └── icono-v.svg     # Favicon SVG
├── css/
│   └── styles.css      # Variables, componentes, animaciones y 3 breakpoints
├── js/
│   ├── main.js         # Navegación, header, scroll suave y observadores
│   ├── comparativa.js  # Filtro dinámico del Módulo 3
│   ├── mapa.js         # Mapa interactivo y marcadores del Módulo 4
│   └── audio.js        # Reproductor del Módulo 6 y formulario comunitario
├── scripts/
│   ├── fetch-images.js # Descarga de imágenes y generación de créditos
│   └── setup-audio.py  # Descarga o generación del recurso sonoro
├── docs/               # Especificaciones técnicas de los módulos 1 a 6
└── index.html          # Estructura semántica HTML5, SEO y datos estructurados
```

---

## 🛠️ Instrucción para Agentes Orca (Hermes / OpenCode / Kilo CLI)

> **"Hermes / OpenCode / Kilo: Lee este README.md y confirma la estructura modular en index.html, css/styles.css y js/. Revisa que no existan estilos inline ni archivos faltantes en assets/img/."**
