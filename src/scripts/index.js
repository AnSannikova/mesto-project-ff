import '../pages/index.css';

import { createCard, removeCard, likeCard } from './card.js';
import { openModal, closeModal, closeModalOnBackdropClick } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserData, changeUserData, getInitialCards, sendNewCard, deleteCurrentCard, changeUserAvatar, checkImageUrl } from './api.js';
import { handleSubmit } from '../utils/utils.js';

let userId;

const cardContainer = document.querySelector('.places__list');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

const popups = document.querySelectorAll('.popup');
const buttonsClosePopups = document.querySelectorAll('.popup__close');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.elements.name;
const descriptionInput = profileEditForm.elements.description;

const changeAvatarPopup = document.querySelector('.popup_type_change-avatar');
const changeAvatarForm = document.forms['new-avatar'];
const changeAvatarInput = changeAvatarForm.elements.link;

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardForm = document.forms['new-place'];
const cardNameInput = addNewCardForm.elements['place-name'];
const cardlinkInput = addNewCardForm.elements.link;

const showImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const renderCard = (cardData, userDataId, сallbackForRemove, сallbackForLike, сallbackForShowImage) => {
  const newCard = createCard(cardData, userDataId, сallbackForRemove, сallbackForLike, сallbackForShowImage);
  cardContainer.append(newCard);
}

const handleProfileFormSubmit = (evt) => {
  const makeRequest = () => {
    return changeUserData(nameInput.value, descriptionInput.value)
      .then((userData) => {
        userName.textContent = userData.name;
        userDescription.textContent = userData.about;
        closeModal(profileEditPopup);
      })
  }

  handleSubmit(makeRequest, evt);
}

const handleChangeAvatarFormSubmit = (evt) => {
  const makeRequest = () => {
    return Promise.all([checkImageUrl(changeAvatarInput.value), changeUserAvatar(changeAvatarInput.value)])
      .then((results) => {
        const userData = results[1];
        userAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);
        closeModal(changeAvatarPopup);
        clearValidation(changeAvatarForm, validationConfig);
      })
  }

  handleSubmit(makeRequest, evt);
}

const handleAddNewCardFormSubmit = (evt) => {
  const makeRequest = () => {
    return sendNewCard(cardNameInput.value, cardlinkInput.value)
      .then((cardData) => {
        const newCard = createCard(cardData, userId, removeCard, likeCard, showImage);
        cardContainer.prepend(newCard);
        closeModal(addNewCardPopup);
        clearValidation(addNewCardForm, validationConfig);
      })
  }

  handleSubmit(makeRequest, evt);
}

const showImage = (cardData) => {
  openModal(showImagePopup);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
}

Promise.all([getUserData(), getInitialCards()])
  .then((results) => {
    const [userData, initialCards] = results;
    userId = userData['_id'];
    userName.textContent = userData.name;
    userDescription.textContent = userData.about;
    userAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);

    initialCards.forEach((card) => {
      renderCard(card, userId, removeCard, likeCard, showImage);
    });
  })
  .catch((err) => {
    console.log(err);
  });

buttonsClosePopups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const openedPopup = evt.target.closest('.popup');
    closeModal(openedPopup);
  });
});

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closeModalOnBackdropClick(evt, item);
  });
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(profileEditPopup);
});

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardPopup);
});

addNewCardForm.addEventListener('submit', handleAddNewCardFormSubmit);

userAvatar.addEventListener('click', () => {
  openModal(changeAvatarPopup);
})

changeAvatarForm.addEventListener('submit', handleChangeAvatarFormSubmit);

enableValidation(validationConfig);