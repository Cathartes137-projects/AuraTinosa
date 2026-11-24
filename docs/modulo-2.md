# ESPECIFICACIÓN TÉCNICA: MÓDULO 2 - BIOLOGÍA Y ADAPTACIONES

## REGLAS DE DESARROLLO Y ARQUITECTURA
1. ARCHIVOS A MODIFICAR: `index.html` y `css/styles.css`.
2. SEPARACIÓN ESTRICTA DE CÓDIGO: Prohibido utilizar estilos inline (`style="..."`) o bloques `<style>` dentro del HTML. Todo el CSS debe agregarse exclusivamente en `css/styles.css`.
3. CONSERVACIÓN DE ESTRUCTURA: Mantén intactos el Header y la Hero Section (Módulo 1). Ubica la nueva sección `<section id="biologia">` inmediatamente debajo de la Hero Section.
4. CÓDIGO CLEAN Y ESTRUCTURADO: Incluye comentarios de bloque en HTML y CSS indicando claramente el inicio y fin del Módulo 2.

---

## 1. ESTRUCTURA EN `index.html`

Crear la sección `<section id="biologia" class="section-biologia">`:

- **Encabezado Principal de Sección:**
  - `<h2>`: "Anatomía y Adaptaciones de Supervivencia"
  - `<p>`: "Evolución y características biológicas que convierten al Aura Tiñosa (*Cathartes aura*) en el limpiador natural por excelencia."

- **Grid de Adaptaciones (`.grid-adaptaciones`):**
  - **Tarjeta 1 — Cabeza Desnuda Roja (`.card-adaptacion`):**
    - Título: "Cabeza Desnuda e Higiene"
    - Descripción: Explica que la piel roja al descubierto evita la acumulación de bacterias y residuos al alimentarse dentro de carroña, además de facilitar la termorregulación corporal.
  - **Tarjeta 2 — Superolfato Único (`.card-adaptacion`):**
    - Título: "Sentido del Olfato Desarrollado"
    - Descripción: Destaca su bulbo olfatorio hipertrofiado que le permite detectar etanotiol (gas derivado de la descomposición) a grandes distancias y por encima del dosel arbóreo.
  - **Tarjeta 3 — Vuelo en Diedro Positivo (`.card-adaptacion`):**
    - Título: "Planeo Eficiente en 'V'"
    - Descripción: Describe la postura característica de sus alas elevadas en diedro positivo mientras se tambalea suavemente, aprovechando corrientes térmicas ascendentes sin necesidad de aletear constantemente.
  - **Tarjeta 4 — Termorregulación y Defensa (`.card-adaptacion`):**
    - Título: "Urohidrosis y Vómito Defensivo"
    - Descripción: Detalla el uso de la urohidrosis para enfriar y desinfectar sus patas con ácido úrico, así como la expulsión de vómito altamente ácido para repeler posibles depredadores.

- **Subsección de Reproducción y Nidificación (`.subseccion-nidos`):**
  - Título: "Estrategia de Nidificación y Cuidado de Huevos"
  - Contenido: Explica que el Aura Tiñosa no construye nidos elaborados con ramas, sino que deposita sus huevos directamente en cavidades de árboles, grietas rocosas o en el suelo resguardado. Incluye datos sobre la pigmentación crema con manchas pardo-rojizas y la calidad del cascarón.

---

## 2. ESTILOS EN `css/styles.css`

- **`.section-biologia`**:
  - `padding`: Generoso (ej. `5rem 2rem` o `80px 20px`).
  - `max-width`: Contenedor centrado (`1200px`).
  - Alineación de encabezados al centro con jerarquía clara.

- **`.grid-adaptaciones`**:
  - Display `grid`.
  - Grid template: 2 columnas en escritorio (`repeat(2, 1fr)`) y 1 columna en dispositivos móviles.
  - `gap`: `1.5rem` o `2rem`.

- **`.card-adaptacion`**:
  - `background-color`: Var `--bg-card` (`#1E1E24`).
  - `border`: `1px solid var(--border-card)` (`#2A2A32`).
  - `border-radius`: `12px` u `8px`.
  - `padding`: `2rem`.
  - Badges / Iconos destacados en `--accent-red` (`#D32F2F`).
  - Efecto `:hover`: `transform: translateY(-4px)`, `border-color: var(--accent-red)` y sombra resplandeciente sutil.

- **`.subseccion-nidos`**:
  - Bloque destacado de ancho completo dentro de la sección.
  - `background-color`: `--bg-card` con acento visual en borde lateral o superior de color `--accent-red`.
  - `margin-top`: `3rem`.
  - Layout adaptable (flexbox o grid) con tipografía legible y organizada.
