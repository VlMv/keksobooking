import { makeNearResidePlaces, RESIDE_PLACE_COUNT } from './reside-places-data.js';
export { generateOffers };

const cardContent = document.querySelector('#card').content;
const offerNode = cardContent.querySelector('.popup');


const generateOffers = (offersCount = RESIDE_PLACE_COUNT) => {
  const offersFragment = new DocumentFragment();
  const residePlaces = makeNearResidePlaces(offersCount);

  for (let i = 0; i < offersCount; i++) {
    const offerData = residePlaces[i].offer;
    const offerDataAuthor = residePlaces[i].author;

    offersFragment.appendChild(generateOffer(offerData, offerDataAuthor));
  }

  return offersFragment.firstChild.innerHTML;
};


function generateOffer(offerData, offerDataAuthor) {
  const offer = offerNode.cloneNode(true);
  const price = offer.querySelector('.popup__text--price');
  const type = offer.querySelector('.popup__type');
  const guestsCapacity = offer.querySelector('.popup__text--capacity');
  const checkinChekoutTime = offer.querySelector('.popup__text--time');
  const features = offer.querySelector('.popup__features');
  const photos = offer.querySelector('.popup__photos');
  const authorAvatar = offer.querySelector('.popup__avatar');

  const wordsEndings = {
    roomWord: ['', 'а', 'ы'],
    guestWord: ['ей', 'я', 'ей'],
  }

  const offerTextElementsData = {
    title: {
      selector: offer.querySelector('.popup__title'),
      data: offerData.title,
    },
    address: {
      selector: offer.querySelector('.popup__text--address'),
      data: offerData.address,
    },
    description: {
      selector: offer.querySelector('.popup__description'),
      data: offerData.description,
    },
  }
  for (const element in offerTextElementsData) {
    addTextElementIfDataExists(
      offerTextElementsData[element].selector,
      offerTextElementsData[element].data
    )
  }

  offerData.price ?
    price.querySelector('span').previousSibling.replaceData(0, 4, offerData.price) :
    price.remove();

  (offerData.checkin && offerData.checkout) ?
    checkinChekoutTime.textContent = `Заезд после ${offerData.checkin}, выезд до ${offerData.checkout}` :
    checkinChekoutTime.remove();

  setOfferTypeContent(offerData.type, type);

  setGuestsCapacityContent(offerData.rooms, offerData.guests, guestsCapacity, wordsEndings);

  setFeatures(offerData.features, features);

  setPhotos(offerData.photos, photos);

  setAvatar(offerDataAuthor.avatar, authorAvatar);

  return offer;
}


function addTextElementIfDataExists(element, data) {
  data ?
    element.textContent = data :
    element.remove();
}

function setOfferTypeContent(offerDataType, offerType) {
  if (!offerDataType) {
    offerType.remove();
    return;
  }

  const residePlaceTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',

    getMatchedType: function (offerDataType) {
      for (let type in this) {
        if (type === offerDataType) return this[type];
      }
    },
  };

  offerType.textContent = residePlaceTypes.getMatchedType(offerDataType);
}


function setGuestsCapacityContent(resideRooms, resideGuests, guestsCapacity, wordsEndings) {
  if (!resideRooms || !resideGuests) {
    guestsCapacity.remove();
    return;
  }

  let numberOfRooms = `${resideRooms} комнат${getWordEnding(resideRooms, wordsEndings.roomWord)}`;
  let numberOfGuests = `${resideGuests} гост${getWordEnding(resideGuests, wordsEndings.guestWord)}`;

  guestsCapacity.textContent = `${numberOfRooms} для ${numberOfGuests}`;
}

function getWordEnding(numeral, endings) {
  const stringedNumeral = `${numeral}`;

  const isLastNumberZeroOrFrom5To9 = stringedNumeral.match(/[0]+$|[5-9]+$/);
  const isLastNumberOne = stringedNumeral.match(/[1]+$/);
  const isLastNumberFrom2To4 = stringedNumeral.match(/[2-4]+$/);
  const isNumeralFrom10To20 = (numeral > 10) && (numeral < 20);

  if (isLastNumberZeroOrFrom5To9 || isNumeralFrom10To20) {
    return endings[0];
  } else if (isLastNumberOne) {
    return endings[1];
  } else if (isLastNumberFrom2To4) {
    return endings[2];
  }
}


function setFeatures(resideFeatures, features) {
  if (resideFeatures.length === 0) {
    features.remove();
    return;
  }
  const templateOfferFeatures = features.querySelectorAll('.popup__feature');

  for (const templateOfferFeature of templateOfferFeatures) {
    const templateFeatureClass = templateOfferFeature.getAttribute('class');

    const resideFeature = resideFeatures.find(item =>
      templateFeatureClass.includes(`popup__feature--${item}`)
    );
    if (resideFeature === undefined) {
      features.removeChild(templateOfferFeature);
    }
  }
}


function setPhotos(residePhotos, photos) {
  if (residePhotos.length === 0) {
    photos.remove();
    return;
  }

  const templateOfferPhoto = photos.querySelector('.popup__photo');
  templateOfferPhoto.remove();

  residePhotos.forEach((photoUrl, i) => {
    const offerPhoto = templateOfferPhoto.cloneNode();

    offerPhoto.setAttribute('src', photoUrl);
    const altContent = offerPhoto.getAttribute('alt');
    offerPhoto.setAttribute('alt', `${altContent} ${i}`);

    photos.appendChild(offerPhoto);
  });
}


function setAvatar(offerAuthorAvatar, authorAvatar) {
  if (checkFileNotExists(offerAuthorAvatar)) {
    authorAvatar.remove();
    return;
  }
  authorAvatar.setAttribute('src', offerAuthorAvatar);
}

function checkFileNotExists(urlToFile) {
  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();
  if (xhr.status == '404') {
    return true;
  }
}
