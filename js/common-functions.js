export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayElements, shuffleArrayElements };


function getRandomInteger(min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function getRandomFloat(min, max, symbolsCount) {
  if (min < 0 || max < 0 || symbolsCount < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  let randomFloat = Math.random() * (max - min) + min;
  return +randomFloat.toFixed(Math.round(symbolsCount));
}


function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}


function getRandomArrayElements(array) {
  let spliceArray = [...array];
  let element = getRandomInteger(0, array.length);
  let range = getRandomInteger(1, array.length);
  return spliceArray.splice(element, range);
}


function shuffleArrayElements(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = getRandomInteger(0, i + 1);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array
}
