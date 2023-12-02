const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEscPress);
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEscPress);
}

const closeModalOnEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

const closeModalOnBackdropClick = (evt, popup) => {
  if (evt.currentTarget === evt.target) closeModal(popup);
}

export { openModal, closeModal, closeModalOnBackdropClick }