/* eslint-disable no-undef */
import { getData } from './offers-data.js';
import { generateOffers } from './offers-generation.js';
import { setOfferAddressCoordinates } from './offer-form.js';
import { filterData, filterOffers } from './map-filters.js';
import { debounce } from './common.js';

export { resetMainMarkerPosition, renderOffersMarkers };

const DEFAULT_LATITUDE = 35.67822;
const DEFAULT_LONGITUDE = 139.74901;
const MAP_MARKER_PADDING_X = 200;
const MAP_MARKER_PADDING_Y = 150;
const DEFAULT_MAP_ZOOM = 14;
const MARKER_DRAG_SPEED = 7;
const POPUP_OFFSET_COORDINATES = [0, -32];
const DELAY = 500;


const offerForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');

const debouncedFilter = debounce(filterOffers, DELAY);


setFormsDisabled()


// set marker icons

const mainMarkerIcon = L.icon({
  iconUrl: '/img/leaflet-img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const commonMarkerIcon = L.icon({
  iconUrl: '/img/leaflet-img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


// set leaflet map

const map = L.map('map-canvas')
  .once('load', setOfferFormAccessible)
  .setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, DEFAULT_MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

getData()
  .then(data => {
    filterData(() => debouncedFilter(data, generateOffers));
    return generateOffers(data);
  })
  .then(offers => renderOffersMarkers(offers))
  .then(setFilterFormAccessible());


// set main Marker dragging

const mainMarker = L.marker(
  [DEFAULT_LATITUDE, DEFAULT_LONGITUDE],
  {
    icon: mainMarkerIcon,
    draggable: true,
    autoPan: true,
    autoPanPadding: [MAP_MARKER_PADDING_X, MAP_MARKER_PADDING_Y],
    autoPanSpeed: MARKER_DRAG_SPEED,
  },
).addTo(map);

mainMarker.on('mouseover', (e) => {
  e.target.dragging.enable();
})

mainMarker.on('drag', () => {
  const markerLatitude = mainMarker.getLatLng().lat;
  const markerLongitude = mainMarker.getLatLng().lng;

  setOfferAddressCoordinates(markerLatitude, markerLongitude)
});


//offers markers rendering

const offersMarkerLayer = new L.LayerGroup().addTo(map);

function renderOffersMarkers(offersMap) {
  offersMarkerLayer.clearLayers();

  offersMap.forEach((offer, location) => {
    L.marker(
      [+location.lat, +location.lng],
      { icon: commonMarkerIcon },
    ).bindPopup(
      L.popup(
        {
          content: offer.innerHTML,
          offset: POPUP_OFFSET_COORDINATES,
        })
    ).addTo(offersMarkerLayer);
  });
}



function resetMainMarkerPosition() {
  mainMarker.setLatLng([DEFAULT_LATITUDE, DEFAULT_LONGITUDE]);
  map.setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, DEFAULT_MAP_ZOOM)
}

function setFormsDisabled() {
  for (const fieldset of offerFormFieldsets) {
    fieldset.setAttribute('disabled', '');
  }
  for (const mapFilter of mapFilters.children) {
    mapFilter.setAttribute('disabled', '');
  }
  offerForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
}

function setOfferFormAccessible() {
  offerForm.classList.remove('ad-form--disabled');
  for (const fieldset of offerFormFieldsets) {
    fieldset.removeAttribute('disabled', '');
  }
}

function setFilterFormAccessible() {
  mapFilters.classList.remove('map__filters--disabled');
  for (const mapFilter of mapFilters.children) {
    mapFilter.removeAttribute('disabled', '');
  }
}

