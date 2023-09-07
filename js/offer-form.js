import { submitData } from './offers-data.js';
import { resetMainMarkerPosition } from './map.js';
export { setOfferAddressCoordinates };

const FLOAT_SYMBOLS_COUNT = 5;

const offerForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters')
const addressInput = offerForm.querySelector('#address');
const body = document.querySelector('body');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');


// price of place type dependencies
const placeTypesSelect = offerForm.querySelector('#type');
const priceInput = offerForm.querySelector('#price');
const placesMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,

  getMatchedValue: function (placeType) {
    for (let key in this) {
      if (key === placeType) return this[key];
    }
  },
}

placeTypesSelect.addEventListener('change', () => {
  priceInput.setAttribute('min', placesMinPrice.getMatchedValue(placeTypesSelect.value));
  priceInput.setAttribute('placeholder', placesMinPrice.getMatchedValue(placeTypesSelect.value));
});

priceInput.addEventListener('change', () => {
  priceInput.reportValidity()
});


// chekin and checkout dependencies
const checkInInput = offerForm.querySelector('#timein');
const checkOutInput = offerForm.querySelector('#timeout');
const timeFieldset = offerForm.querySelector('.ad-form__element--time');

timeFieldset.addEventListener('input', (evt) => {
  if (evt.target.matches('#timein')) {
    checkOutInput.value = checkInInput.value;
  }
  if (evt.target.matches('#timeout')) {
    checkInInput.value = checkOutInput.value;
  }
});


// rooms and guests dependencies
const roomsNumberSelect = offerForm.querySelector('#room_number');
const guestsCapacitySelect = offerForm.querySelector('#capacity');

const checkGuestsCapacityValidaton = () => {
  const isGuestsCountDoesNotMatchRooms = +guestsCapacitySelect.value > +roomsNumberSelect.value && +guestsCapacitySelect.value !== 0;
  const isNotForGuests = (+roomsNumberSelect.value === 100 && +guestsCapacitySelect.value !== 0);
  const isNotEnoughRooms = +roomsNumberSelect.value !== 100 && +guestsCapacitySelect.value === 0;

  if (isNotForGuests) {
    guestsCapacitySelect.setCustomValidity('Допустимо: не для гостей');

  } else if (isNotEnoughRooms) {
    roomsNumberSelect.setCustomValidity('Допустимое количество комнат не менее 100')

  } else if (isGuestsCountDoesNotMatchRooms) {
    guestsCapacitySelect.setCustomValidity(`Допустимо: число гостей не более ${roomsNumberSelect.value}`);

  } else {
    guestsCapacitySelect.setCustomValidity('');
    roomsNumberSelect.setCustomValidity('');
  }

  guestsCapacitySelect.reportValidity();
  roomsNumberSelect.reportValidity();
};

guestsCapacitySelect.addEventListener('change', checkGuestsCapacityValidaton);
roomsNumberSelect.addEventListener('change', checkGuestsCapacityValidaton);


function setOfferAddressCoordinates(latitude, longitude) {
  addressInput.value = `${latitude.toFixed(FLOAT_SYMBOLS_COUNT)}, ${longitude.toFixed(FLOAT_SYMBOLS_COUNT)}`;
}


offerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  await submitData(new FormData(offerForm), onSuccessSubmit, onErrorSubmit);
});


function onSuccessSubmit() {
  body.appendChild(successPopup);

  offerForm.reset();
  filtersForm.reset();
  resetMainMarkerPosition();

  body.addEventListener('click', () => successPopup.remove(), { once: true });
  body.addEventListener('keydown', removeSuccessPopup);
}
function removeSuccessPopup(evt) {
  removePopup(evt, successPopup, removeSuccessPopup);
}


function onErrorSubmit() {
  body.appendChild(errorPopup);

  errorPopup.querySelector('.error__button').addEventListener('click', () => errorPopup.remove(), { once: true });
  body.addEventListener('keydown', removeErrorPopup);
}
function removeErrorPopup(evt) {
  removePopup(evt, errorPopup, removeErrorPopup);
}


function removePopup(evt, popupSelector, handler) {
  if (evt.key === 'Escape') {
    popupSelector.remove()
    body.removeEventListener('keydown', handler);
  }
}


