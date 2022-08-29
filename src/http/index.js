import axios from 'axios';
import { url } from 'src/constants';

const $api = axios.create({
  withCredentials: true,
  baseURL: url
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;