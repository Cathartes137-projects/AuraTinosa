# ESPECIFICACIÓN TÉCNICA: MÓDULO 5 - DIMENSIÓN CULTURAL, ESPIRITUAL Y CIENCIA

> **AGENTE ASIGNADO:** Hermes (o Antigravity)

## REGLAS DE DESARROLLO Y ARQUITECTURA
1. ARCHIVOS A MODIFICAR: `index.html` y `css/styles.css`.
2. SEPARACIÓN ESTRICTA: Sin estilos inline ni JS en el archivo HTML.
3. CONSERVACIÓN DE CÓDIGO: Ubicar la sección justo debajo de `#habitat`.
4. CÓDIGO CLEAN: Utilizar comentarios claros de delimitación de módulo.

---

## 1. ESTRUCTURA EN `index.html`

Crear la sección `<section id="cultura" class="section-cultura">`:

- **Encabezado de Sección:**
  - `<h2>`: "Dimensión Cultural, Espiritual y Frontera Científica"
  - `<p>`: "El puente entre la veneración ancestral y los descubrimientos genómicos modernos."

- **Grid de Contenido en 3 Bloques (`.cultura-grid`):**

  - **Bloque 1: Simbolismo Afrocaribeño y Osha-Ifá (`.card-cultura`):**
    - Vocabulario y representación sagrada en la regla de Osha-Ifá.
    - Símbolo de purificación: Su rol como limpiadora terrenal y espiritual que transmuta la materia muerta en vida.

  - **Bloque 2: Frontera Genómica y Biológica (`.card-cultura`):**
    - Datos del Genoma Completo (*GigaDB Dataset*): Resistencia inmunológica única frente a toxinas botulínicas y bacterias patógenas.
    - Hallazgos sobre la cáscara de sus huevos (*Journal of Caribbean Ornithology*): Grosor y pigmentación pre-plaguicidas.

  - **Bloque 3: Retos de Conservación y Amenazas (`.card-cultura`):**
    - Impacto de contaminantes químicos y residuos de diclofenaco.
    - Colisiones aéreas, tendidos eléctricos y prejuicios estéticos infundados.

- **Cita Destacada (`.bloque-cita`):**
  - `<blockquote>`: "No juzgamos al cirujano por usar guantes ni al Aura por carecer de plumas en su cabeza; ambas son herramientas de absoluta pureza."

---

## 2. ESTILOS EN `css/styles.css`

- **`.section-cultura`**: Fondo con degradado sutil desde `#121214` hacia `#18181C`.
- **`.cultura-grid`**: Grid de 3 columnas en Desktop, 1 columna en pantallas reducidas.
- **`.card-cultura`**:
  - Fondo: `--bg-card` (`#1E1E24`), borde `--border-card` (`#2A2A32`).
  - Encabezados internos con acento carmesí o badges distintivos.
- **`.bloque-cita`**:
  - Diseño estilo editorial: Borde izquierdo grueso en `--accent-red` (`4px solid #D32F2F`), fondo sutil, texto en itálica marfil (`#F4F4F2`) y espaciado elegante.
