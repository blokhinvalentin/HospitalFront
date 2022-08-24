import { useState } from 'react';
import moment from 'moment';
import './style.scss';

const ConfirmEdit = ({ closeConfirmEdit, status, editOneMeeting, meeting }) => {
  const [patientName, setPatientName] = useState(meeting.patientName);
  const [doctorName, setDoctorName] = useState(meeting.doctorName);
  const [date, setDate] = useState(meeting.date);
  const [reports, setReports] = useState(meeting.reports);
  const _id = meeting._id;

  return (
    <div className="confirm-edit-container">
      <div className="confirm-edit-info">
        <div className="title">
          <h3>{status}</h3>
        </div>

        <div className="meeting-info-update">
          <div className="update-patient-name">
            <p>Имя:</p>
            <input 
              type="text"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
            />
          </div>

          <div className="update-doctor-name">
            <p>Врач:</p>
            <select
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
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
              value={moment(date).format('YYYY-MM-DD')}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="update-reports">
            <p>Жалобы:</p>
            <textarea 
              name="reports" 
              cols="61" 
              rows="5"
              value={reports}
              onChange={(event) => setReports(event.target.value)}
              
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
              meeting = { patientName, doctorName, date, reports, _id };
              editOneMeeting(meeting);
              closeConfirmEdit();
            }}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEdit;