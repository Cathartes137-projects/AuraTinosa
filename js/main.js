/* ============================================================
   AURA TIÑOSA — NAVEGACIÓN, HEADER Y ANIMACIONES GLOBALES
   Todos los efectos visuales se controlan mediante clases CSS;
   este archivo no inyecta estilos inline ni bloques <style>.
   ============================================================ */

'use strict';

const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// --- Estado del header al hacer scroll ---
function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle('is-scrolled', window.scrollY > 80);
}

if (header) {
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
}

// --- Menú móvil ---
function closeMobileMenu() {
  if (!navToggle || !navLinksContainer) {
    return;
  }

  navToggle.classList.remove('active');
  navLinksContainer.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navLinksContainer) {
  navToggle.addEventListener('click', () => {
    const willOpen = !navLinksContainer.classList.contains('open');

    navToggle.classList.toggle('active', willOpen);
    navLinksContainer.classList.toggle('open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

// --- Scroll suave compensando la altura del header ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth',
    });
  });
});

// --- Resaltado de la sección activa ---
function updateActiveLink() {
  const scrollPos = window.scrollY;
  const sections = document.querySelectorAll('section[id]');

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);
updateActiveLink();

// --- Animaciones de aparición mediante clases CSS ---
const animatedElements = document.querySelectorAll(
  '.stats-grid, .grid-adaptaciones, .subseccion-nidos, .comparativa-container, .habitat-layout, .ecology-content, .cultura-grid, .card-audio, .galeria-grid, .avistamientos-box'
);

if ('IntersectionObserver' in window && animatedElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  });

  animatedElements.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

/* ============================================================
   INICIALIZACIÓN INTEGRADA DE MÓDULOS
   ============================================================ */
function initAuraTinosaModules() {
  if (typeof window.initComparativa === 'function') {
    window.initComparativa();
  }

  if (typeof window.initMapaAura === 'function') {
    window.initMapaAura();
  }

  if (typeof window.initAuraAudio === 'function') {
    window.initAuraAudio();
  }

  if (typeof window.initAvistamientosForm === 'function') {
    window.initAvistamientosForm();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuraTinosaModules);
} else {
  initAuraTinosaModules();
}
