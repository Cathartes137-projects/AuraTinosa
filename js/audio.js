/* ============================================================
   AURA TIÑOSA — MÓDULO 6: REPRODUCTOR HTML5 Y REGISTRO DE AVISTAMIENTOS
   El audio utiliza los controles nativos accesibles definidos en
   .card-audio. Este archivo se encarga del volumen inicial, la
   detección de errores de reproducción y del formulario ciudadano.
   ============================================================ */

'use strict';

function initAuraAudio() {
  const audio = document.getElementById('aura-audio');

  if (!audio) {
    return;
  }

  // Volumen inicial confortable para una reproducción en segundo plano.
  audio.volume = 0.75;

  // Evita que varias pistas compitan por la salida de audio.
  document.querySelectorAll('audio').forEach((element) => {
    if (element !== audio) {
      element.addEventListener('play', () => audio.pause());
    }
  });

  audio.addEventListener('error', () => {
    console.warn(
      'Aura Tiñosa: no se pudo cargar el audio. ' +
      'Ejecuta "python scripts/setup-audio.py" para generar assets/audio/siseo-aura.mp3.'
    );
  });
}

function initAvistamientosForm() {
  const form = document.getElementById('form-avistamiento');
  const feedback = document.getElementById('avistamiento-feedback');

  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('avistamiento-nombre')?.value.trim();
    const ubicacion = document.getElementById('avistamiento-ubicacion')?.value.trim();
    const fecha = document.getElementById('avistamiento-fecha')?.value;
    const notas = document.getElementById('avistamiento-notas')?.value.trim();

    if (!nombre || !ubicacion || !fecha || !notas) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Por favor completa todos los campos requeridos para enviar tu registro.';
      }
      return;
    }

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.textContent = '✓ ¡Avistamiento reportado con éxito! Gracias por tu contribución comunitaria.';
    }

    form.reset();

    window.setTimeout(() => {
      if (feedback) {
        feedback.textContent = '';
      }
    }, 6000);
  });
}

// Las funciones se exponen para que main.js coordine la inicialización.
if (typeof window !== 'undefined') {
  window.initAuraAudio = initAuraAudio;
  window.initAvistamientosForm = initAvistamientosForm;
}
