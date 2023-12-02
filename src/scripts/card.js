import { putLike, deleteLike } from "./api";

export const createCard = (cardData, userData, сallbackForRemove, сallbackForLike, сallbackForShowImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.name;

  if (cardData.likes.length) {
    newCard.querySelector('.card__like-count').textContent = cardData.likes.length;
    newCard.querySelector('.card__like-count').classList.add('card__like-count_is-active');

    for (const ownerLike of cardData.likes) {
      if (ownerLike['_id'] === userData['_id']) {
        newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
    }
  }

  if (cardData.owner['_id'] !== userData['_id']) {
    newCard.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
  }

  newCard.querySelector('.card__image').addEventListener('click', () => {
    сallbackForShowImage(cardData);
  });
  newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    сallbackForRemove(evt, cardData);
  });
  newCard.querySelector('.card__like-button').addEventListener('click', (evt) => {
    сallbackForLike(evt, cardData);
  });

  return newCard;
}

export const likeCard = (evt, cardData) => {
  const likeButton = evt.target;
  const likeCount = evt.target.closest('.card__like-block').querySelector('.card__like-count');

  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardData['_id'])
      .then((result) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.classList.add('card__like-count_is-active');
        likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(cardData['_id'])
      .then((result) => {
        likeButton.classList.remove('card__like-button_is-active');
        if (result.likes.length) {
          likeCount.textContent = result.likes.length;
        } else {
          likeCount.classList.remove('card__like-count_is-active');
        }
      })
  }
}