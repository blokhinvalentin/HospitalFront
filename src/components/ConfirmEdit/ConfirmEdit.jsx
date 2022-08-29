import { useState } from 'react';
import moment from 'moment';
import './style.scss';

const ConfirmEdit = ({ closeConfirmEdit, editOneMeeting, meeting }) => {
  const [meetingToEdit, setMeetingToEdit] = useState({
    patientName: meeting.patientName,
    doctorName: meeting.doctorName,
    date: meeting.date,
    reports: meeting.reports,
    _id: meeting._id
  });
  const _id = meeting._id;

  const handleChange = (key, value) => {
    setMeetingToEdit({...meetingToEdit, [key]: value});
  }

  return (
    <div className="confirm-edit-container">
      <div className="confirm-edit-info">
        <div className="title">
          <h3>Изменить прием</h3>
        </div>
        <div className="meeting-info-update">
          <div className="update-patient-name">
            <p>Имя:</p>
            <input 
              type="text"
              value={meetingToEdit.patientName}
              onChange={(event) => handleChange('patientName', event.target.value)}
            />
          </div>
          <div className="update-doctor-name">
            <p>Врач:</p>
            <select
              value={meetingToEdit.doctorName}
              onChange={(event) => handleChange('doctorName', event.target.value)}
            >
              <option value="" disabled></option>
              <option value="Доктор Врач">Доктор Врач</option>
              <option value="Иванов Иван Иванович">Иванов Иван Иванович</option>
              <option value="А. Б. Ввфывыфвфы">А. Б. Ввфывыфвфы</option>
            </select>
          </div>
          <div className="update-date">
            <p>Дата:</p>
            <input 
              type="date"
              value={moment(meetingToEdit.date).format('YYYY-MM-DD')}
              onChange={(event) => handleChange('date', event.target.value)}
            />
          </div>
          <div className="update-reports">
            <p>Жалобы:</p>
            <textarea 
              name="reports" 
              cols="61" 
              rows="5"
              value={meetingToEdit.reports}
              onChange={(event) => handleChange('reports', event.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <button 
            type="button" 
            className="button__cancel"
            onClick={closeConfirmEdit}>Отмена</button>
          <button 
            type="button" 
            className="button__edit"
            onClick={() => {
              // meeting = { patientName, doctorName, date, reports, _id };
              editOneMeeting(meetingToEdit);
              closeConfirmEdit();
            }}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEdit;