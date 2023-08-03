const offerForm = document.querySelector('.ad-form');

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



