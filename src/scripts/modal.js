import { checkPopup } from './index';

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEscPress);
}

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  checkPopup(popup);
  document.removeEventListener('keydown', closeModalOnEscPress);
}

const closeModalOnEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export const closeModalOnBackdropClick = (evt, popup) => {
  if (evt.currentTarget === evt.target) closeModal(popup);
}