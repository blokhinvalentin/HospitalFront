import { useEffect, useState, useContext } from 'react';
import { usePortals } from 'react-portal-hook';
import moment from 'moment';
import { Context } from 'src';
import { getMeetings, addMeeting, editMeeting, deleteMeeting } from 'src/services/MeetingService';
import Header from 'src/components/Header/Header';
import ErrorSnackbar from 'src/components/ErrorSnackbar/ErrorSnackbar';
import deleteImg from 'src/img/delete.svg';
import editImg from 'src/img/edit.svg';
import './style.scss';

const MeetingsPage = () => {
  const store  = useContext(Context);
  const portalManager = usePortals();
  const [meetingToAdd, setMeetingToAdd] = useState({ 
    patientName: '', 
    doctorName: '', 
    date: '', 
    reports: '' 
  });
  const [meetings, setMeetings] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showSnackbar = (message) => {
    setIsSnackbarOpened(true);
    setErrorMessage(message);
  };

  const handleChange = (key, value) => {
    setMeetingToAdd({...meetingToAdd, [key]: value});
  }

  const getAllMeetings = async () => {
    try {
      const resp = await getMeetings();
      if (resp.statusText === 'OK') {
        setMeetings(resp.data);
      }
    } catch (error) {
      showSnackbar('Невозможно получить приемы!');
    }
  }

  const ifEmpty = () => {
    if (meetingToAdd.patientName === ''
      || meetingToAdd.doctorName === ''
      || meetingToAdd.date === ''
      || meetingToAdd.reports === ''
    ) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  }

  const clearPatientInfo = () => {
    setMeetingToAdd({...meetingToAdd, patientName: '', doctorName: '', date: '', reports: '' });
  }

  useEffect(() => {
    if (meetings.length === 0) {
      getAllMeetings();
    }
    ifEmpty();
  }, [meetingToAdd]);

  return (
    <>
      <Header title="Приемы"/>
      <div className="add-option">
        <div className="name">
          <p>Имя:</p>
          <input 
            type="text" 
            value={meetingToAdd.patientName}
            onChange={(event) => handleChange('patientName', event.target.value)}
          />
        </div>
        <div className="doctor">
          <p>Врач:</p>
          <select
            value={meetingToAdd.doctorName}
            onChange={(event) => handleChange('doctorName', event.target.value)}
          >
            <option value="" disabled></option>
            <option value="Доктор Врач">Доктор Врач</option>
            <option value="Иванов Иван Иванович">Иванов Иван Иванович</option>
            <option value="А. Б. Ввфывыфвфы">А. Б. Ввфывыфвфы</option>
          </select>
        </div>
        <div className="date">
          <p>Дата:</p>
          <input 
            type="date"
            value={meetingToAdd.date} 
            onChange={(event) => handleChange('date', event.target.value)}
          />
        </div>
        <div className="reports">
          <p>Жалобы:</p>
          <input 
            type="text" 
            value={meetingToAdd.reports}
            onChange={(event) => handleChange('reports', event.target.value)}
          />
        </div>
        <button 
          type="button" 
          disabled={isDisabled}>Добавить</button>
      </div>
      <div className="meetings-info">
        <div className="info-headers">
          <p className="patient-name__header">Имя</p>
          <p className="doctor-name__header">Врач</p>
          <p className="meeting-date__header">Дата</p>
          <p className="patient-reports__header">Жалобы</p>
          <p className="edit-or-delete__header"></p>
        </div>
        <div className="meetings-info__list">
          <table className="table">
            <tbody className="table__body">
              {meetings.map((meeting, index) => (
                <tr key={index}>
                  <td className="cell__patient-name">{meeting.patientName}</td>
                  <td className="cell__doctor-name">{meeting.doctorName}</td>
                  <td className="cell__meeting-date">{moment(meeting.date).format('DD.MM.YYYY')}</td>
                  <td className="cell__patient-reports">{meeting.reports}</td>
                  <td className="edit-or-delete">
                    <button 
                      type="button" 
                      className="delete-meeting__button"
                    >
                      <img src={deleteImg} alt="" />
                    </button>
                    <button 
                      type="button" 
                      className="edit-meeting__button"
                    >
                      <img src={editImg} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ErrorSnackbar 
        isSnackbarOpened={isSnackbarOpened} 
        setIsSnackbarOpened={setIsSnackbarOpened}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default MeetingsPage;