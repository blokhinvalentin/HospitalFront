import { getMeetings } from 'src/services/MeetingService';

export default class Store {
  getAllMeetings = async () => {
    try {
      const resp = await getMeetings();
      return resp;
    } catch (error) {
      return error;
    }
  }
}