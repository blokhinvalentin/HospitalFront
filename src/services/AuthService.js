import $api from 'src/http/index';

export const registration = (login, password) => $api.post('/registration', { login, password });

export const logIn = (login, password) => $api.post('/authorization', { login, password });

export const logOut = () => $api.get('/logout');

export const refresh = () => $api.get('/refresh', { withCredentials: true });