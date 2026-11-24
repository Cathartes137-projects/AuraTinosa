/* ============================================================
   AURA TIÑOSA — MÓDULO 3: COMPARATIVA INTERACTIVA
   Filtrado accesible por pestañas mediante clases CSS.
   main.js coordina la inicialización.
   ============================================================ */

'use strict';

function initComparativa() {
  const tabs = document.querySelectorAll('.comparativa-tabs [data-tab]');
  const items = document.querySelectorAll('.comparativa-item');

  if (!tabs.length || !items.length) {
    return;
  }

  function filterItems(targetTab) {
    items.forEach((item) => {
      const categories = (item.getAttribute('data-category') || '').split(' ');
      const shouldShow = categories.includes(targetTab);

      item.classList.toggle('visible', shouldShow);
      item.classList.toggle('hidden', !shouldShow);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) {
        return;
      }

      tabs.forEach((candidate) => {
        candidate.classList.remove('active');
        candidate.setAttribute('aria-pressed', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      filterItems(tab.getAttribute('data-tab'));
    });
  });

  const defaultTab = document.querySelector('.comparativa-tabs [data-tab].active');

  if (defaultTab) {
    filterItems(defaultTab.getAttribute('data-tab'));
  }
}

if (typeof window !== 'undefined') {
  window.initComparativa = initComparativa;
}
