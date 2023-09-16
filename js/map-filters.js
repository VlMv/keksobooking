export { filterData };

const DEFAULT_MARKERS_COUNT = 10;

const filtersForm = document.querySelector('.map__filters');
const residingPlaceType = filtersForm.querySelector('#housing-type');

function filterData(offers) {
  let offersData = offers.slice();


  let data = filterResidingPlaceType(offersData);

  return data;
  // принимаем все данные
  // фильтруем элементы массива по значениям валью инпутов

  // клеим все к офферсДата и потом ремувим повторы

  // ранжируем по совпадениям
  // передаем дальше первые десять
}

function filterResidingPlaceType(offersData) {
  let offersDataCopy = offersData.slice();

  residingPlaceType.addEventListener('input', (e) => {
    if (e.target.value !== 'any') {

      offersDataCopy.forEach((offerData, i) => {
        if (offerData.offer.type !== e.target.value) {
          offersDataCopy.splice(i, 1);
        }
      });
    }
  });
  return offersDataCopy;
}

