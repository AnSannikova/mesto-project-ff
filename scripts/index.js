const cardContainer = document.querySelector('.places__list');

function addCard(cardData, deleteCallback) {
  const newCard = createCard(cardData, deleteCallback);
  cardContainer.append(newCard);
}

function createCard(cardData, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    deleteCallback(evt);
  });

  return newCard;
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach((item) => {
  addCard(item, removeCard);
});
