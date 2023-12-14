import { checkResponse } from '../utils/utils.js';

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '25acbbe0-12c1-426d-be21-ec07addb3936',
    'Content-Type': 'application/json',
  },
};

const request = (endpoint, options) => {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then(checkResponse);
};

export const getUserData = () => {
  return request('users/me', {
    headers: config.headers,
  });
};

export const changeUserData = (userName, userDescription) => {
  return request('users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription,
    }),
  });
};

export const changeUserAvatar = linkImage => {
  return request('users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkImage,
    }),
  });
};

export const checkImageUrl = linkImage => {
  return fetch(`${linkImage}`, {
    method: 'HEAD',
  }).then(res => {
    if (!res.ok && !res.headers.get('Content-Type').includes('image')) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export const getInitialCards = () => {
  return request('cards', {
    headers: config.headers,
  });
};

export const sendNewCard = (cardName, cardLink) => {
  return request('cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  });
};

export const removeCurrentCard = cardId => {
  return request(`cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

export const putLike = cardId => {
  return request(`cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  });
};

export const deleteLike = cardId => {
  return request(`cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};
