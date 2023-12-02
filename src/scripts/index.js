import '../pages/index.css';

import { createCard, likeCard } from './card.js';
import { openModal, closeModal, closeModalOnBackdropClick } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserData, changeUserData, getInitialCards, sendNewCard, deleteCurrentCard, changeUserAvatar, checkImageUrl } from './api.js';

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

const deleteCardPopup = document.querySelector('.popup_type_delete-card');

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

const renderLoading = (popup, isLoading) => {
  const buttonPopup = popup.querySelector('.popup__button');
  if (isLoading) {
    buttonPopup.textContent = 'Сохранение...';
  } else {
    buttonPopup.textContent = 'Сохранить';
  }
}

const editProfile = (evt) => {
  evt.preventDefault();
  const userData = {
    name: nameInput.value,
    about: descriptionInput.value
  }
  renderLoading(profileEditPopup, true);
  changeUserData(userData)
    .then((result) => {
      userName.textContent = result.name;
      userDescription.textContent = result.about;
      closeModal(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileEditPopup, false);
    });
}

const changeAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(changeAvatarPopup, true);
  Promise.all([checkImageUrl(changeAvatarInput.value), changeUserAvatar(changeAvatarInput.value)])
    .then((results) => {
      const userData = results[1];
      userAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);
      closeModal(changeAvatarPopup);
      changeAvatarForm.reset();
      clearValidation(changeAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(changeAvatarPopup, false);
    });
}

const addNewCard = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardlinkInput.value
  };
  renderLoading(addNewCardPopup, true);
  Promise.all([getUserData(), sendNewCard(cardData)])
    .then((result) => {
      const [userData, card] = result;
      const newCard = createCard(card, userData['_id'], removeCard, likeCard, showImage);
      cardContainer.prepend(newCard);
      closeModal(addNewCardPopup);
      addNewCardForm.reset();
      clearValidation(addNewCardForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(addNewCardPopup, false);
    });
}

const removeCard = (evt, cardData) => {
  const buttonElement = deleteCardPopup.querySelector('.popup__button');
  openModal(deleteCardPopup);
  buttonElement.addEventListener('click', () => {
    closeModal(deleteCardPopup);
    deleteCurrentCard(cardData['_id'])
      .then(() => {
        evt.target.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const showImage = (cardData) => {
  openModal(showImagePopup);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
}

getUserData()
  .then((userData) => {
    userName.textContent = userData.name;
    userDescription.textContent = userData.about;
    userAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([getUserData(), getInitialCards()])
  .then((results) => {
    const [userData, initialCards] = results;
    initialCards.forEach((card) => {
      renderCard(card, userData['_id'], removeCard, likeCard, showImage);
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

profileEditForm.addEventListener('submit', editProfile);

addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardPopup);
});

addNewCardForm.addEventListener('submit', addNewCard);

userAvatar.addEventListener('click', () => {
  openModal(changeAvatarPopup);
})

changeAvatarForm.addEventListener('submit', changeAvatar);

enableValidation(validationConfig);