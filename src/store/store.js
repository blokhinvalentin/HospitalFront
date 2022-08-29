import { getMeetings, addMeeting, editMeeting, deleteMeeting } from 'src/services/MeetingService';

export default class Store {
  user = {};
  isAuth = true;
  authState = [];

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
}