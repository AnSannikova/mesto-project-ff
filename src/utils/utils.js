export const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const renderLoading = (
  isLoading,
  button,
  buttonText = 'Сохранить',
  loadingText = 'Сохранение...'
) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};

export const renderError = (
  isError, 
  button, 
  buttonText = 'Сохранить', 
  erorText = 'Ошибка загрузки'
) => {
  if (isError) {
    console.log(erorText);
    button.textContent = erorText;
  } else {
    button.textContent = buttonText;
  }
}

export const handleSubmit = (request, evt, loadingText = 'Сохранение...') => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      renderLoading(false, submitButton, initialText);
    })
    .catch(err => {
      renderError(true, submitButton, initialText);
      console.error(`Ошибка: ${err}`);
    });
};
