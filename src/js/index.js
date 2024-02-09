import '../css/normalize.css';
import '../css/style.css';


import './modules/offer-form';


import { debounce } from './modules/common';
import { getData } from './modules/offers-data';
import { generateOffers } from './modules/offers-generation';
import { filterData, filterOffers } from './modules/map-filters';
import { setFilterFormAccessible, renderOffersMarkers } from './modules/map';


const DELAY = 500;
const debouncedFilter = debounce(filterOffers, DELAY);


getData()
  .then(data => {
    filterData(() => debouncedFilter(data, generateOffers));
    return generateOffers(data);
  })
  .then(offers => renderOffersMarkers(offers))
  .then(setFilterFormAccessible());
