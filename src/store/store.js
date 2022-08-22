import { registration, logIn, logOut, refresh } from 'src/services/AuthService';

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
      localStorage.setItem('token', resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (error) {
      return error;
    }
  }

  async userRegistration (login, password) {
    try {
      const resp = await registration(login, password);
      localStorage.setItem('token', resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      return error;
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
      return error;
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