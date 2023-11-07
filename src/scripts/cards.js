const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(cardData, сallbackForRemove) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', сallbackForRemove);

  return newCard;
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

export { initialCards, createCard, removeCard }