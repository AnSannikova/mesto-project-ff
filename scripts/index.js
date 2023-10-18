const cardContainer = document.querySelector('.places__list');

function addCard(arrayObjetc, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = arrayObjetc.name;
  newCard.querySelector('.card__image').src = arrayObjetc.link;
  newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    callback(evt);
  });

  cardContainer.append(newCard);
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach((item) => {
  addCard(item, removeCard);
});
