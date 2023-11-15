function createCard(cardData, сallbackForRemove, сallbackForLike, сallbackForShowImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);


  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.name;
  newCard.querySelector('.card__image').addEventListener('click', () => {
    сallbackForShowImage(cardData);
  });
  newCard.querySelector('.card__delete-button').addEventListener('click', сallbackForRemove);
  newCard.querySelector('.card__like-button').addEventListener('click', сallbackForLike);

  return newCard;
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}


export { createCard, removeCard, likeCard };