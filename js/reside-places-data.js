import { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayElements, shuffleArrayElements } from './common-functions.js';


export { residePlaces, RESIDE_PLACE_COUNT };


const RESIDE_PLACE_COUNT = 10;

const FLOAT_SYMBOLS_COUNT = 5;

const ROOMS_COUNT = {
  min: 1,
  max: 5,
}

const GUESTS_COUNT = {
  min: 1,
  max: 6,
}

const X_RANGE_COORDINATES = [35.65000, 35.70000];
const Y_RANGE_COORDINATES = [139.70000, 139.80000];

const RANGE_PRICES = [500, 100000];

const RESIDE_PLACE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const RESIDE_PLACE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const RESIDE_PLACE_DESCRIPTIONS = [
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, deleniti!',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus veniam officiis explicabo? Lorem ipsum dolor sit amet.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat harum culpa ipsum aspernatur porro velit neque! Fugit, autem numquam?',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam obcaecati, hic maiores praesentium, aperiam animi commodi suscipit pariatur repellat sed cumque impedit maxime cupiditate doloremque! Accusantium veritatis fuga esse repudiandae eveniet non nisi hic eum.',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A error eveniet soluta accusamus quae, dolore praesentium perferendis?',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo temporibus pariatur expedita, maxime veniam laborum fugiat! Dolorem a fugit excepturi sit! Molestias.',
];

const RESIDE_PLACE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const getOffer = () => {
  return {
    title: `title ${getRandomInteger(1, RESIDE_PLACE_COUNT)}`,
    address: '',
    price: getRandomInteger(...RANGE_PRICES),
    type: getRandomArrayElement(RESIDE_PLACE_TYPES),
    rooms: getRandomInteger(ROOMS_COUNT.min, ROOMS_COUNT.max),
    guests: getRandomInteger(GUESTS_COUNT.min, GUESTS_COUNT.max),
    checkin: getRandomArrayElement(CHECKIN_HOURS),
    checkout: getRandomArrayElement(CHECKOUT_HOURS),
    features: getRandomArrayElements(RESIDE_PLACE_FEATURES),
    description: getRandomArrayElement(RESIDE_PLACE_DESCRIPTIONS),
    photos: getRandomArrayElements(RESIDE_PLACE_PHOTOS),
  }
}

const getLocation = () => {
  return {
    x: getRandomFloat(...X_RANGE_COORDINATES, FLOAT_SYMBOLS_COUNT),
    y: getRandomFloat(...Y_RANGE_COORDINATES, FLOAT_SYMBOLS_COUNT),
  }
}

const getRandomResidePlace = () => {
  let location = getLocation();
  let offer = getOffer();
  offer.address = `${location.x}, ${location.y}`;

  return {
    author: { avatar: '' },
    offer,
    location,
  }
}

const makeNearResidePlaces = (placesCount = RESIDE_PLACE_COUNT) => {
  let places = new Array(placesCount).fill(null).map(() => getRandomResidePlace());

  let userIndexes = new Array(placesCount).fill(1).map((el, i) => el *= ++i);
  userIndexes = userIndexes.map((index) =>
    index < 10 ?
      index = `0${index}` :
      index = `${index}`
  );
  shuffleArrayElements(userIndexes);

  places.map((place, i) =>
    place.author.avatar = `img/avatars/user${userIndexes[i]}.png`
  );
  return places;
}

const residePlaces = makeNearResidePlaces();
