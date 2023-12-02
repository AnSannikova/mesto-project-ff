const showInputError = (formElement, inputElement, errorMessage, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formData.errorClass);
};

const hideInputError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, formData) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formData);
  } else {
    hideInputError(formElement, inputElement, formData);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formData.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formData.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, formData);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, formData);
      toggleButtonState(inputList, buttonElement, formData);
    });
  });
};

const enableValidation = (formData) => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));

  formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formData);
  });
};

const clearValidation = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, formData);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formData);
  })
}

export { enableValidation, clearValidation }