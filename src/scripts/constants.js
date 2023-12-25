export const cardContainer = document.querySelector('.places__list');

export const userName = document.querySelector('.profile__title');
export const userDescription = document.querySelector('.profile__description');
export const userAvatar = document.querySelector('.profile__image');

export const popups = document.querySelectorAll('.popup');
export const buttonsClosePopups = document.querySelectorAll('.popup__close');

export const profileEditPopup = document.querySelector('.popup_type_edit');
export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);
export const profileEditForm = document.forms['edit-profile'];
export const nameInput = profileEditForm.elements.name;
export const descriptionInput = profileEditForm.elements.description;

export const changeAvatarPopup = document.querySelector(
  '.popup_type_change-avatar'
);
export const changeAvatarForm = document.forms['new-avatar'];
export const changeAvatarInput = changeAvatarForm.elements.link;

export const addNewCardPopup = document.querySelector('.popup_type_new-card');
export const addNewCardButton = document.querySelector('.profile__add-button');
export const addNewCardForm = document.forms['new-place'];
export const cardNameInput = addNewCardForm.elements['place-name'];
export const cardlinkInput = addNewCardForm.elements.link;

export const showImagePopup = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageCaption = document.querySelector('.popup__caption');
export const popupAvatar = document.querySelector('.popup__avatar');
export const popupOwnerName = document.querySelector('.popup__owner-name');

export const removeCardPopup = document.querySelector(
  '.popup_type_delete-card'
);
export const removeCardForm = document.forms['remove-card'];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
