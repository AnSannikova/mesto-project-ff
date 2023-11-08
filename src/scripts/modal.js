function openModal(popup) {
  const buttonCloseModal = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-opened');
  buttonCloseModal.addEventListener('click', closeModal);
  popup.addEventListener('click', closeModalOnBackdropClick);
  document.addEventListener('keydown', closeModalOnEscPress);
}

function closeModal(evt) {
  evt.target.closest('.popup').classList.remove('popup_is-opened');
}

function closeModalOnBackdropClick(evt) {
  if (evt.currentTarget === evt.target) closeModal(evt);
}

function closeModalOnEscPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscPress);
  }
}

export { openModal, closeModal }