# ESPECIFICACIÓN TÉCNICA: MÓDULO 1 — HEADER Y HERO SECTION

## REGLAS DE DESARROLLO Y ARQUITECTURA

1. ARCHIVOS A MODIFICAR: `index.html`, `css/styles.css` y `js/main.js`.
2. SEPARACIÓN ESTRICTA: Sin estilos inline, sin bloques `<style>` y sin JavaScript incrustado en `index.html`.
3. ESTRUCTURA SEMÁNTICA: El contenido principal de los módulos debe permanecer dentro de `<main id="contenido-principal">`.
4. ACCESIBILIDAD: Enlaces con texto visible, área táctil mínima de 44 px, `aria-label`, `aria-expanded` y control del menú mediante clases CSS.

---

## 1. ESTRUCTURA EN `index.html`

### Header fijo

- `<header class="header" id="header">`.
- `<nav>` con logo SVG en "V" y texto `AURA TIÑOSA`.
- Lista `.nav-links` con los enlaces:
  `#inicio`, `#biologia`, `#comparativa`, `#habitat`, `#ecologia`, `#cultura` y `#multimedia`.
- Botón `.nav-toggle` con `aria-controls="menu-principal"` y `aria-expanded` actualizado por JavaScript.

### Hero Section

- `<section class="hero" id="inicio">`.
- `<h1>` jerárquico y subtítulo con clase `.hero-subtitle`.
- Botones `.btn-primary` y `.btn-secondary` hacia los módulos siguientes.
- Bloque `.stats` con cuatro tarjetas de datos.
- Imagen de fondo grande: `assets/img/hero.jpg`.
- Capa de contraste mediante degradado oscuro para mantener la legibilidad.

---

## 2. ESTILOS EN `css/styles.css`

- El header usa posición fija/`sticky`, z-index alto, desenfoque y fondo base del tema.
- El estado desplazado se controla con `.header.is-scrolled`; no se asigna `background` desde JavaScript.
- El menú móvil utiliza `.nav-links` oculto y `.nav-links.open` visible mediante `transform`, `opacity` y `visibility`.
- La Hero tiene altura mínima fluida, imagen `background-size: cover`, posición central y degradado de contraste.
- Los enlaces y botones del menú deben mantener un área táctil de al menos 44 × 44 px.

---

## 3. LÓGICA EN `js/main.js`

- Alternar `is-scrolled` cuando el desplazamiento supere los 80 px.
- Abrir, cerrar y mantener sincronizado `aria-expanded` del menú.
- Cerrar el menú al pulsar un enlace o la tecla `Escape`.
- Aplicar desplazamiento suave compensando la altura del header.
- Resaltar el enlace de la sección visible usando los identificadores de `<section>`.
- No crear ni inyectar `<style>` desde JavaScript.
