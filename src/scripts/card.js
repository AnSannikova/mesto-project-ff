import { putLike, deleteLike } from "./api";

export const createCard = ({ cardData, userDataId, сallbackForRemove, сallbackForLike, сallbackForShowImage }) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardLikeCount = newCard.querySelector('.card__like-count');
  const newCardLikeButton = newCard.querySelector('.card__like-button');
  const newCardDeleteButton = newCard.querySelector('.card__delete-button');
  const newCardOwnerName = newCard.querySelector('.card__owner');

  newCard.querySelector('.card__title').textContent = cardData.name;
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;

  if (cardData.likes.length) {
    newCardLikeCount.textContent = cardData.likes.length;
    newCardLikeCount.classList.add('card__like-count_is-active');

    for (const ownerLike of cardData.likes) {
      if (ownerLike['_id'] === userDataId) {
        newCardLikeButton.classList.add('card__like-button_is-active');
      }
    }
  }

  if (cardData.owner['_id'] !== userDataId) {
    newCardDeleteButton.classList.add('card__delete-button_hidden');
  }

  newCardOwnerName.textContent = cardData.owner.name;

  newCardImage.addEventListener('click', () => {
    сallbackForShowImage(cardData);
  });
  newCardDeleteButton.addEventListener('click', (evt) => {
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
      .catch((err) => {
        console.log(err);
      });
  }
}