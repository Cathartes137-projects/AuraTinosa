/* ============================================================
   AURA TIÑOSA — MÓDULO 4: HÁBITAT, DISTRIBUCIÓN Y MAPA INTERACTIVO
   Lógica de inicialización con Leaflet.js
   Centrado en el continente americano: Latitud 15.0, Longitud -75.0, Zoom 3
   Capa gratuita OpenStreetMap (sin API Key) y marcadores explicativos
   ============================================================ */

function initMapaAura() {
  const mapContainer = document.getElementById('mapa-aura');
  if (!mapContainer) return null;

  // Evitar doble inicialización si el mapa ya fue creado
  if (mapContainer._leaflet_id) {
    return null;
  }

  // Comprobar disponibilidad de la librería Leaflet en ventana
  if (typeof L === 'undefined') {
    console.warn('Leaflet.js no está disponible o aún no se ha cargado.');
    return null;
  }

  // 1. Inicializa el mapa centrado en el continente americano (Latitud: 15.0, Longitud: -75.0, Zoom: 3)
  const mapa = L.map(mapContainer, {
    center: [15.0, -75.0],
    zoom: 3,
    minZoom: 2,
    maxZoom: 18,
    scrollWheelZoom: false
  });

  // 2. Capa gratuita de OpenStreetMap (no requiere API Key)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(mapa);

  // Icono carmesí interactivo con estilo y pulso distintivo (#D32F2F)
  const iconCarmesi = L.divIcon({
    className: 'custom-map-marker',
    html: '<span class="marker-pulse-ring" aria-hidden="true"></span><span class="marker-pin-circle" aria-hidden="true"></span>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });

  // 3. Añade 4 marcadores interactivos con popups explicativos sobre la presencia del Aura Tiñosa:
  // * Canadá / EE.UU. (Migración estacional norteña).
  // * Puerto Rico / Cuba (Poblaciones caribeñas residentes).
  // * Colombia / Región Andina (Presencia continua en América del Sur).
  // * Patagonia / Argentina (Límite de distribución sur).
  const marcadores = [
    {
      titulo: 'Canadá / EE.UU.',
      subtitulo: 'Migración estacional norteña',
      tag: 'Norteamérica',
      coords: [45.4215, -75.6972],
      texto: 'Migración estacional norteña. Durante la primavera y el verano boreales, las poblaciones de Aura Tiñosa aprovechan las corrientes ascendentes de las llanuras y bosques boreales para nidificar, migrando masivamente hacia el sur antes del invierno.'
    },
    {
      titulo: 'Puerto Rico / Cuba',
      subtitulo: 'Poblaciones caribeñas residentes',
      tag: 'Caribe Insular',
      coords: [21.5218, -77.7812],
      texto: 'Poblaciones caribeñas residentes. Presencia continua y sedentaria todo el año en las Antillas Mayores, con densas poblaciones insulares que cumplen un papel de desinfección y saneamiento biológico vital.'
    },
    {
      titulo: 'Colombia / Región Andina',
      subtitulo: 'Presencia continua en América del Sur',
      tag: 'Sudamérica Tropical',
      coords: [4.7110, -74.0721],
      texto: 'Presencia continua en América del Sur. Zona de convergencia y corredor migratorio continental; las aves patrullan valles interandinos y llanuras utilizando eficientemente las térmicas generadas en las laderas montañosas.'
    },
    {
      titulo: 'Patagonia / Argentina',
      subtitulo: 'Límite de distribución sur',
      tag: 'Cono Sur',
      coords: [-46.5000, -68.8000],
      texto: 'Límite de distribución sur. Representa el límite austral más extremo de distribución continental del Cathartes aura, adaptado a los vientos severos y estepas frías de la Patagonia argentina.'
    }
  ];

  marcadores.forEach(m => {
    const popupHtml = `
      <div class="map-popup-inner">
        <div class="map-popup-header">
          <span class="map-popup-badge">${m.tag}</span>
          <h4 class="map-popup-title">${m.titulo}</h4>
        </div>
        <p class="map-popup-subtitle">${m.subtitulo}</p>
        <p class="map-popup-text">${m.texto}</p>
      </div>
    `;

    L.marker(m.coords, { icon: iconCarmesi })
      .addTo(mapa)
      .bindPopup(popupHtml, {
        className: 'custom-leaflet-popup',
        maxWidth: 300
      });
  });

  // 4. Verifica que el mapa cargue suavemente al hacer scroll a la sección
  const seccionDistribucion = document.getElementById('habitat') || mapContainer;

  // Función de invalidación y renderizado fluido
  const refrescarMapa = () => {
    mapa.invalidateSize({ pan: false });
  };

  // IntersectionObserver para asegurar carga suave en el momento en que el usuario se aproxima a la sección
  if ('IntersectionObserver' in window && seccionDistribucion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          refrescarMapa();
        }
      });
    }, {
      rootMargin: '150px 0px',
      threshold: 0.1
    });

    observer.observe(seccionDistribucion);
  }

  // Listener de scroll pasivo para sincronización suave en navegación rápida
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (!scrollTimer) {
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        const rect = mapContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          refrescarMapa();
        }
      }, 100);
    }
  }, { passive: true });

  // Recálculo ante cambios de tamaño de ventana o rotación de pantalla
  window.addEventListener('resize', refrescarMapa);

  // Recálculo tras tiempo de espera inicial para asegurar que estilos y fuentes terminaron de maquetar
  setTimeout(refrescarMapa, 250);
  setTimeout(refrescarMapa, 600);

  return mapa;
}

// main.js coordina la inicialización para evitar duplicidades.
if (typeof window !== 'undefined') {
  window.initMapaAura = initMapaAura;
}
