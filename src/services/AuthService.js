import { API_URL } from 'src/http/index';
import $api from 'src/http/index';

export const registration = (login, password) => $api.post(`${API_URL}/registration`, { login, password });

export const logIn = (login, password) => $api.post(`${API_URL}/authorization`, { login, password });

export const logOut = () => $api.get(`${API_URL}/logout`);

export const refresh = () => $api.get(`${API_URL}/refresh`, { withCredentials: true });