import { generateOffers } from './offers-generation.js';

const FLOAT_SYMBOLS_COUNT = 5;

const offerForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const addressInput = offerForm.querySelector('#address');

for (const fieldset of offerFormFieldsets) {
  fieldset.setAttribute('disabled', '');
}
for (const mapFilter of mapFilters.children) {
  mapFilter.setAttribute('disabled', '');
}
offerForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');


// set leaflet map

const map = L.map('map-canvas')
  .once('load', () => {
    offerForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    for (const fieldset of offerFormFieldsets) {
      fieldset.removeAttribute('disabled', '');
    }
    for (const mapFilter of mapFilters.children) {
      mapFilter.removeAttribute('disabled', '');
    }
  })
  .setView({
    lat: 35.627330,
    lng: 139.779539,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


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


// set main Marker dragging

const mainMarker = L.marker(
  [35.627330, 139.779539],
  {
    icon: mainMarkerIcon,
    draggable: true,
    autoPan: true,
    autoPanPadding: [200, 150],
    autoPanSpeed: 7,
  },
).addTo(map);

mainMarker.on('mouseover', (e) => {
  e.target.dragging.enable();
})

mainMarker.on('drag', () => {
  const markerLatitude = mainMarker.getLatLng().lat;
  const markerLongitude = mainMarker.getLatLng().lng;

  addressInput.value = `${markerLatitude.toFixed(FLOAT_SYMBOLS_COUNT)}, ${markerLongitude.toFixed(FLOAT_SYMBOLS_COUNT)}`;
});


//offers markers generation

const offersFragment = generateOffers();
const offers = Array.from(offersFragment.children);

offers.forEach((offer) => {
  const addressCoordinates = offer.querySelector('.popup__text--address')
    .textContent.split(', ');

  L.marker(
    [+addressCoordinates[0], +addressCoordinates[1]],
    { icon: commonMarkerIcon },
  ).addTo(map).bindPopup(
    L.popup(
      {
        content: offer.innerHTML,
        offset: [0, -32],
      })
  );
});
