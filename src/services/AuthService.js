import { url } from 'src/constants';
import $api from 'src/http/index';

export const registration = (login, password) => $api.post(`${url}/registration`, { login, password });

export const logIn = (login, password) => $api.post(`${url}/authorization`, { login, password });

export const logOut = () => $api.get(`${url}/logout`);

export const refresh = () => $api.get(`${url}/refresh`, { withCredentials: true });