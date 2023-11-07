import '../pages/index.css';
import { initialCards, createCard, removeCard } from './cards.js';

const cardContainer = document.querySelector('.places__list');

function renderCard(cardData, сallbackForRemove) {
  const newCard = createCard(cardData, сallbackForRemove);
  cardContainer.append(newCard);
}

initialCards.forEach((item) => {
  renderCard(item, removeCard);
});