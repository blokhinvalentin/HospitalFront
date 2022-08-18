import axios from 'axios';
import { url } from '../components/constants';
// import url from "../http";

axios.defaults.withCredentials = true;

export const registration = async (login, password) => await axios.post(`${url}/registration`, { login: login, password: password });

export const logIn = async (login, password) => await axios.post(`${url}/authorization`, { login: login, password: password });

export const logOut = async () => await axios.post(`${url}/logout`);

export const refresh = async () => await axios.get(`${url}/refresh`, { withCredentials: true });