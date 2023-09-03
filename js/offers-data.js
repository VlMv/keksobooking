export { getData };

function getData() {
  let data = fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Ошибка загрузки данных с сервера. Попробуйте перезагрузить страницу.');
    })
    .catch((error) => renderError(error));

  return data;
}


function renderError(errorText) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.classList.add('error', 'error_data');
  div.textContent = errorText;

  body.append(div);
}
