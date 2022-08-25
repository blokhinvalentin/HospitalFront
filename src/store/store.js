import { registration, logIn, logOut, refresh } from 'src/services/AuthService';
import { getMeetings } from 'src/services/MeetingService';

export default class Store {
  user = {};
  isAuth = false;
  authState = [];

  setUser = (userInfo) => {
    this.user = userInfo;
  }

  setAuth = (isAuthorized) => {
    this.isAuth = isAuthorized;
    this.publish(this.isAuth);
  }

  login = async (login, password) => {
    try {
      const resp = await logIn(login, password);
      localStorage.setItem('token', resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (error) {
      return error.response.data.message;
    }
  }

  userRegistration = async (login, password) => {
    try {
      const resp = await registration(login, password);
      localStorage.setItem('token', resp.data.accessToken);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (error) {
      return error;
    }
  }

  logout = async () => {
    try {
      await logOut();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      return error;
    }
  }

  authCheck = async () => {
    try {
      if (localStorage.getItem('token')) {
        const resp = await refresh();
        localStorage.setItem('token', resp.data.accessToken);
        this.setAuth(true);
        this.setUser(resp.data.user);
      }
    } catch (error) {
      this.setAuth(false);
      return error;
    }
  }

  getAllMeetings = async () => {
    try {
      const resp = await getMeetings();
      return resp;
    } catch (error) {
      return (error);
    }
  }

  subscribe = async (event) => {
    if (!this.authState) {
      this.authState = [];
    }
    this.authState.push(event);
  }

  publish = async (data) => {
    if (!this.authState) return;
    this.authState.forEach(setData => setData(data));
  }
}