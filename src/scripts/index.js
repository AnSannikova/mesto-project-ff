import '../pages/index.css';

import { createCard, likeCard } from './card.js';
import { openModal, closeModal, closeModalOnBackdropClick } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getUserData,
  changeUserData,
  getInitialCards,
  sendNewCard,
  removeCurrentCard,
  changeUserAvatar,
  checkImageUrl,
} from './api.js';
import { handleSubmit } from '../utils/utils.js';
import {
  cardContainer,
  userName,
  userDescription,
  userAvatar,
  popups,
  buttonsClosePopups,
  profileEditPopup,
  profileEditButton,
  profileEditForm,
  nameInput,
  descriptionInput,
  changeAvatarPopup,
  changeAvatarForm,
  changeAvatarInput,
  addNewCardPopup,
  addNewCardButton,
  addNewCardForm,
  cardNameInput,
  cardlinkInput,
  showImagePopup,
  popupImage,
  popupImageCaption,
  popupAvatar,
  popupOwnerName,
  removeCardPopup,
  removeCardForm,
  validationConfig,
} from './constants.js';

let userId;
let cardDataForRemove;

const renderCard = ({
  cardData,
  userDataId,
  сallbackForRemove,
  сallbackForLike,
  сallbackForShowImage,
}) => {
  const newCard = createCard({
    cardData,
    userDataId,
    сallbackForRemove,
    сallbackForLike,
    сallbackForShowImage,
  });
  cardContainer.append(newCard);
};

const handleProfileFormSubmit = (evt) => {
  const makeRequest = () => {
    return changeUserData(nameInput.value, descriptionInput.value).then(
      (userData) => {
        userName.textContent = userData.name;
        userDescription.textContent = userData.about;
        closeModal(profileEditPopup);
      },
    );
  };

  handleSubmit(makeRequest, evt);
};

const handleChangeAvatarFormSubmit = (evt) => {
  const makeRequest = () => {
    return Promise.all([
      checkImageUrl(changeAvatarInput.value),
      changeUserAvatar(changeAvatarInput.value),
    ]).then((results) => {
      const userData = results[1];
      userAvatar.setAttribute(
        'style',
        `background-image: url(${userData.avatar});`,
      );
      closeModal(changeAvatarPopup);
    });
  };

  handleSubmit(makeRequest, evt);
};

const handleAddNewCardFormSubmit = (evt) => {
  const makeRequest = () => {
    return sendNewCard(cardNameInput.value, cardlinkInput.value).then(
      (cardData) => {
        const newCard = createCard({
          cardData: cardData,
          userDataId: userId,
          сallbackForRemove: removeCard,
          сallbackForLike: likeCard,
          сallbackForShowImage: showImage,
        });
        cardContainer.prepend(newCard);
        closeModal(addNewCardPopup);
      },
    );
  };

  handleSubmit(makeRequest, evt);
};

const removeCard = (evt, cardData) => {
  cardDataForRemove = [evt.target.closest('.card'), cardData['_id']];
  openModal(removeCardPopup);
};

const handleRemoveCardFormSubmit = (evt) => {
  const [currentCard, cardId] = cardDataForRemove;
  const makeRequest = () => {
    return removeCurrentCard(cardId).then(() => {
      closeModal(removeCardPopup);
      currentCard.remove();
    });
  };

  handleSubmit(makeRequest, evt, 'Удаление...');
};

const showImage = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  popupAvatar.src = cardData.owner.avatar;
  popupAvatar.alt = cardData.owner.name;
  popupOwnerName.textContent = cardData.owner.name;
  openModal(showImagePopup);
};

Promise.all([getUserData(), getInitialCards()])
  .then((results) => {
    const [userData, initialCards] = results;
    userId = userData['_id'];
    userName.textContent = userData.name;
    userDescription.textContent = userData.about;
    userAvatar.setAttribute(
      'style',
      `background-image: url(${userData.avatar});`,
    );

    initialCards.forEach((card) => {
      renderCard({
        cardData: card,
        userDataId: userId,
        сallbackForRemove: removeCard,
        сallbackForLike: likeCard,
        сallbackForShowImage: showImage,
      });
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
  item.addEventListener('mousedown', (evt) => {
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

removeCardForm.addEventListener('submit', handleRemoveCardFormSubmit);

userAvatar.addEventListener('click', () => {
  openModal(changeAvatarPopup);
});

changeAvatarForm.addEventListener('submit', handleChangeAvatarFormSubmit);

enableValidation(validationConfig);
