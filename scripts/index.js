const cardContainer = document.querySelector('.places__list');

function addCard(cardData, сallbackForRemove) {
  const newCard = createCard(cardData, сallbackForRemove);
  cardContainer.append(newCard);
}

function createCard(cardData, сallbackForRemove) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    сallbackForRemove(evt);
  });

  return newCard;
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach((item) => {
  addCard(item, removeCard);
});
