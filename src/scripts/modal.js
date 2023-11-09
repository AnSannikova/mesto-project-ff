function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEscPress);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEscPress);
}

function closeModalOnEscPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function closeModalOnBackdropClick(evt, popup) {
  if (evt.currentTarget === evt.target) closeModal(popup);
}

export { openModal, closeModal, closeModalOnBackdropClick }