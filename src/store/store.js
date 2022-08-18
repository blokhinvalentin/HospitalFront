import { registration, logIn, logOut, refresh } from '../services/AuthService';
import { checkLogin, checkPassword } from '../helpers/validation';

export default class Store {
  user = {};
  isAuth = false;
  authState = [];

  setUser(userInfo) {
    this.user = userInfo;
  }

  setAuth(isAuthorized) {
    this.isAuth = isAuthorized;
    this.publish(this.isAuth);
  }

  async login(login, password) {
    try {
      const resp = await logIn(login, password);
      console.log('resp', resp.request);
      localStorage.setItem('token', resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
      console.log('this Auth', this.isAuth);
    } catch (error) {
      console.log(error);
    }
  }

  async userRegistration (login, password) {
    try {
      if (checkLogin(login) && checkPassword(password)) {
        const resp = await registration(login, password);
        localStorage.setItem('token', resp.data.accessToken);
        this.setAuth(true);
        this.setUser(resp.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const resp = await logOut();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error);
    }
  }

  async authCheck() {
    try {
      if (localStorage.getItem('token')) {
        const resp = await refresh();
        localStorage.setItem('token', resp.data.accessToken);
        this.setAuth(true);
        this.setUser(resp.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async subscribe(event) {
    if (!this.authState) {
      this.authState = [];
    }
    this.authState.push(event);
  }

  async publish(data) {
    if (!this.authState) return;
    this.authState.forEach(setData => setData(data));
  }
}