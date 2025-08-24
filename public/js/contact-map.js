/**
 * Módulo para inicializar el mapa de contacto usando OpenStreetMap y Leaflet
 * @author Farmasalud
 * @version 1.0.0
 */

// Configuración del mapa
const MAP_CONFIG = {
  // Coordenadas de Av. Grau 1583, La Victoria, Chiclayo
  coordinates: {
    lat: -6.791915,
    lng: -79.847244
  },
  zoom: 16,
  maxZoom: 19,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Información de la empresa para el popup
const COMPANY_INFO = {
  name: 'Farmasalud',
  address: 'Av. Grau Nro. 1583',
  district: 'La Victoria, Chiclayo',
  region: 'Lambayeque, Perú'
};

/**
 * Inicializa el mapa de OpenStreetMap
 * @returns {L.Map} Instancia del mapa de Leaflet
 */
const initializeMap = () => {
  try {
    // Verificar que Leaflet esté disponible
    if (typeof L === 'undefined') {
      throw new Error('Leaflet no está disponible. Asegúrate de incluir la librería.');
    }

    // Crear el mapa
    const map = L.map('map').setView(
      [MAP_CONFIG.coordinates.lat, MAP_CONFIG.coordinates.lng],
      MAP_CONFIG.zoom
    );

    return map;
  } catch (error) {
    console.error('Error al inicializar el mapa:', error);
    return null;
  }
};

/**
 * Agrega la capa base de tiles al mapa
 * @param {L.Map} map - Instancia del mapa de Leaflet
 */
const addTileLayer = map => {
  if (!map) return;

  L.tileLayer(MAP_CONFIG.tileLayer, {
    attribution: MAP_CONFIG.attribution,
    maxZoom: MAP_CONFIG.maxZoom
  }).addTo(map);
};

/**
 * Crea el contenido HTML del popup
 * @returns {string} HTML del popup
 */
const createPopupContent = () => {
  return `
    <div class="map-popup">
      <h4><strong>${COMPANY_INFO.name}</strong></h4>
      <p>
        📍 ${COMPANY_INFO.address}<br>
        ${COMPANY_INFO.district}<br>
        ${COMPANY_INFO.region}
      </p>
      <small>A una cuadra del Hospital Privado Juan Pablo II</small>
    </div>
  `;
};

/**
 * Agrega el marcador con popup al mapa
 * @param {L.Map} map - Instancia del mapa de Leaflet
 */
const addMarker = map => {
  if (!map) return;

  // Crear marcador
  const marker = L.marker([MAP_CONFIG.coordinates.lat, MAP_CONFIG.coordinates.lng]).addTo(map);

  // Agregar popup con información
  const popupContent = createPopupContent();
  marker.bindPopup(popupContent).openPopup();

  return marker;
};

/**
 * Configura los controles del mapa
 * @param {L.Map} map - Instancia del mapa de Leaflet
 */
const setupMapControls = map => {
  if (!map) return;

  // Agregar control de zoom en la esquina superior derecha
  map.addControl(
    L.control.zoom({
      position: 'topright'
    })
  );
};

/**
 * Función principal para inicializar todo el mapa
 */
const initContactMap = () => {
  // Verificar que el elemento del mapa existe
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('No se encontró el elemento #map en el DOM');
    return;
  }

  // Inicializar componentes del mapa
  const map = initializeMap();
  if (!map) return;

  addTileLayer(map);
  addMarker(map);
  setupMapControls(map);

  console.log('Mapa de contacto inicializado correctamente');
  return map;
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initContactMap);

// Exportar funciones para uso externo si es necesario
export { initContactMap, MAP_CONFIG, COMPANY_INFO };
