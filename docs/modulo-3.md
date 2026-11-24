# ESPECIFICACIÓN TÉCNICA: MÓDULO 3 - COMPARATIVA INTERACTIVA (AURA TIÑOSA VS. ZOPILOTE NEGRO)

> **AGENTE ASIGNADO:** Antigravity (Lógica JS interactiva + Maquetación y CSS)

## REGLAS DE DESARROLLO Y ARQUITECTURA
1. ARCHIVOS A MODIFICAR: `index.html`, `css/styles.css` y `js/main.js` (o script dedicado `js/comparativa.js`).
2. SEPARACIÓN ESTRICTA: Prohibido usar estilos inline (`style="..."`) o etiquetas `<style>` / `<script>` en HTML. Todo el CSS debe agregarse en `css/styles.css` y la lógica en archivos `.js`.
3. CONSERVACIÓN: Preserva intactos los Módulos 1 y 2. Agrega la nueva sección en `index.html` justo debajo de la sección `#biologia`.
4. CÓDIGO CLEAN Y COMENTADO: Agrega comentarios de bloque que delimiten el inicio y fin del Módulo 3.

---

## 1. ESTRUCTURA EN `index.html`

Crear la sección `<section id="comparativa" class="section-comparativa">`:

- **Encabezado de Sección:**
  - `<h2>`: "Aura Tiñosa vs. Zopilote Negro: El Duelo por el Cielo"
  - `<p>`: "Dos reyes del aire con estrategias totalmente opuestas pero complementarias en el ecosistema."

- **Contenedor Interactivo de Comparativa (`.comparativa-container`):**
  - **Selector / Pestañas de Filtrado (`.comparativa-tabs`):**
    - Botón 1: `Visual & Anatómica` (Activo por defecto)
    - Botón 2: `Estrategia de Caza/Rastreo`
    - Botón 3: `Dinámica de Vuelo y Jerarquía`
  - **Tarjetas Comparativas Lado a Lado (`.comparativa-grid`):**
    - **Columna Aura Tiñosa (*Cathartes aura*):**
      - Encabezado con distintivo carmesí `#D32F2F`.
      - Ítem 1 (Olfato): Rastreador biológico capaz de oler etanotiol a gran altura.
      - Ítem 2 (Cabeza): Roja, desnuda y lisa.
      - Ítem 3 (Vuelo): Planeo en "V" estable sin apenas aletear.
      - Ítem 4 (Comportamiento): Encuentra primero la carroña en solitario o parejas.
    - **Columna Zopilote Negro (*Coragyps atratus*):**
      - Encabezado con distintivo gris/carbón `#555560`.
      - Ítem 1 (Vista): Carece de superolfato; depende 100% de la vista.
      - Ítem 2 (Cabeza): Negruzca y rugosa.
      - Ítem 3 (Vuelo): Aleteo rápido seguido de planeo plano horizontal.
      - Ítem 4 (Comportamiento): Sigue al Aura Tiñosa desde las alturas y la desplaza por número en el suelo.

---

## 2. ESTILOS EN `css/styles.css`

- **`.section-comparativa`**: Padding amplio (80px arriba/abajo), centrado de títulos y fondo oscuro consistente.
- **`.comparativa-tabs`**: Flexbox centrado con botones interactivos `.tab-btn`.
  - Estado normal: Fondo `--bg-card` (`#1E1E24`), texto `--text-secondary`, borde `--border-card`.
  - Estado activo (`.active`): Fondo `--accent-red` (`#D32F2F`), texto `--text-primary`, sombra carmesí.
- **`.comparativa-grid`**: Layout de 2 columnas en Desktop y 1 columna acumulada en Móvil.
- **`.card-especie`**:
  - Estilos diferenciados para `.card-aura` (borde sutil carmesí) y `.card-zopilote` (borde neutro).
  - Animación suave de transición (`transition: all 0.3s ease`) al cambiar de pestaña.

---

## 3. LÓGICA INTERACTIVA EN `js/main.js` (O `js/comparativa.js`)

- **Event Listeners para Pestañas:**
  - `js/comparativa.js` captura clics en los botones `[data-tab]`.
  - Alterna la clase `.active` y sincroniza `aria-pressed`.
  - Filtra los bloques de información mediante las clases CSS `.hidden` y `.visible`.
- **Transiciones fluidas:** `.comparativa-items` reserva altura mínima para evitar saltos de pantalla (*layout shifts*).
