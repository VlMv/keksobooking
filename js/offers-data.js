fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      returnresponse.json()
    }
    throw new Error('ошибка загрузки данных');
  })
  .then((offers) => console.log(offers))
  .catch((error) => console.log(error));
