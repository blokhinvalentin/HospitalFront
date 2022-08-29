import { getMeetings, addMeeting, editMeeting, deleteMeeting } from 'src/services/MeetingService';

export default class Store {
  user = {};
  isAuth = true;
  authState = [];

  setUser = (userInfo) => {
    this.user = userInfo;
  }

  setAuth = (isAuthorized) => {
    this.isAuth = isAuthorized;
    this.publish(this.isAuth);
  }

  getAllMeetings = async () => {
    try {
      const resp = await getMeetings();
      return resp;
    } catch (error) {
      return error;
    }
  }

  addNewMeeting = async () => {
    try {
      const resp = await addMeeting();
      return resp;
    } catch (error) {
      return error;
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