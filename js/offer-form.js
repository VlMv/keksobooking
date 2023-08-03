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

  getMatchedValue: function (placeTypeValue) {
    for (let type in this) {
      if (type === placeTypeValue) return this[type];
    }
  },
}

placeTypesSelect.addEventListener('change', () => {
  priceInput.setAttribute('min', placesMinPrice.getMatchedValue(placeTypesSelect.value));
  priceInput.setAttribute('placeholder', placesMinPrice.getMatchedValue(placeTypesSelect.value));
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

