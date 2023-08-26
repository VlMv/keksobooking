const offerForm = document.querySelector('.ad-form');


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


// chekin of checkout dependencies
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


// rooms adn guests dependencies
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


offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
