import $api from 'src/http/index';

export const getMeetings = async () => await $api.get('/meetings');

export const getMeeting = async () => await $api.get('/meetings');

export const addMeeting = async (meeting) => await $api.post('/meetings', { 
  patientName: meeting.patientName,
  doctorName: meeting.doctorName,
  date: meeting.date,
  complaints: meeting.complaints
});

export const deleteMeeting = async (id) => await $api.delete(`/meetings/${id}`);

export const editMeeting = async (meeting) => await $api.patch(`/meetings/${meeting._id}`, { meeting });
