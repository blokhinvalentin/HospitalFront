import axios from 'axios';
import { url } from '../../src/constants';

axios.defaults.withCredentials = true;

export const registration = (login, password) => axios.post(`${url}/registration`, { login, password });

export const logIn = (login, password) => axios.post(`${url}/authorization`, { login, password });

export const logOut = () => axios.get(`${url}/logout`);

export const refresh = () => axios.get(`${url}/refresh`, { withCredentials: true });