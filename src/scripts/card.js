function createCard(cardData, сallbackForRemove, сallbackForLike, сallbackForShowImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');

  newCardTitle.textContent = cardData.name;
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardImage.addEventListener('click', () => {
    сallbackForShowImage(newCardImage.src, newCardTitle.textContent);
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