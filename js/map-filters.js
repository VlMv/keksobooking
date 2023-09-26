import { renderOffersMarkers } from './map.js';
export { filterData, filterOffers };


// const DEFAULT_MARKERS_COUNT = 10;

const filtersForm = document.querySelector('.map__filters');
const placeTypeSelect = filtersForm.querySelector('#housing-type');
const priceSelect = filtersForm.querySelector('#housing-price');
const roomsCountSelect = filtersForm.querySelector('#housing-rooms');
const guestsCountSelect = filtersForm.querySelector('#housing-guests');

const filterSelects = new Map()
  .set(placeTypeSelect, 'type')
  .set(priceSelect, null)
  .set(roomsCountSelect, 'rooms')
  .set(guestsCountSelect, 'guests');


function filterOffers(data, generateOffers) {
  let offersData = data.slice();

  filterSelects.forEach((feature, select) => {
    if (select.value !== 'any' && select !== priceSelect) {
      offersData = filterOffersByFeature(offersData, feature, select);
    }
    if (select.value !== 'any' && select === priceSelect) {
      offersData = offersData.filter(
        offerData => filterOffersByPrice(offerData.offer.price));
    }
  });

  renderOffersMarkers(generateOffers(offersData));
}


function filterData(filterCallBack) {
  placeTypeSelect.addEventListener('input', filterCallBack);
  priceSelect.addEventListener('input', filterCallBack);
  roomsCountSelect.addEventListener('input', filterCallBack);
  guestsCountSelect.addEventListener('input', filterCallBack);
}


function filterOffersByFeature(offersData, feature, input) {
  console.log(input.value)
  return offersData.filter(
    offerData => String(offerData.offer[feature]) === input.value);
}

function filterOffersByPrice(price) {
  if (
    priceSelect.value === 'middle'
    && price >= 10000
    && price <= 50000
  ) return price;

  if (
    priceSelect.value === 'low'
    && price < 10000
  ) return price;

  if (
    priceSelect.value === 'high'
    && price > 50000
  ) return price;
}


