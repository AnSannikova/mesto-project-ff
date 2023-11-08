import '../pages/index.css';

import { initialCards, createCard, removeCard, likeCard } from './cards.js';
import { openModal, closeModal } from './modal.js';


const cardContainer = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.elements.name;
const descriptionInput = profileEditForm.elements.description;
const userName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardForm = document.forms['new-place'];
const cardNameInput = addNewCardForm.elements['place-name'];
const cardlinkInput = addNewCardForm.elements.link;

const showImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption');


function renderCard(cardData, сallbackForRemove, сallbackForLike, сallbackForShowImage) {
  const newCard = createCard(cardData, сallbackForRemove, сallbackForLike, сallbackForShowImage);
  cardContainer.append(newCard);
}

function assignInputsValues() {
  if (profileEditPopup.classList.contains('popup_is-opened')) {
    nameInput.value = userName.textContent;
    descriptionInput.value = description.textContent;
  } else {
    profileEditForm.reset();
  }
}

function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closeModal(evt);
}

function addNewCard(evt) {
  evt.preventDefault();

  const cardData = {};
  cardData.name = cardNameInput.value;
  cardData.link = cardlinkInput.value;

  const newCard = createCard(cardData, removeCard, likeCard, showImage);
  cardContainer.prepend(newCard);

  closeModal(evt);
  addNewCardForm.reset();
}

function showImage(evt) {
  const cardTitle = evt.target.closest('.card').querySelector('.card__title');

  openModal(showImagePopup);
  popupImage.src = evt.target.getAttribute('src');
  popupCaption.textContent = cardTitle.textContent;
}

initialCards.forEach((item) => {
  renderCard(item, removeCard, likeCard, showImage);
});

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);
  assignInputsValues();
  profileEditForm.addEventListener('submit', editProfile);
});

addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardPopup);
  addNewCardForm.addEventListener('submit', addNewCard);
});