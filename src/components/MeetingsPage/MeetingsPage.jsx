import { useEffect, useState } from 'react';
import { addMeeting, getMeetings } from '../../services/requests';
import Header from '../Header/Header';
import Meeting from '../Meeting/Meeting';
import './style.scss';

const MeetingsPage = ({ 
  setTitle, 
  showNotification,  
  showConfirmDelete, 
  deleteOneMeeting, 
  showConfirmEdit, 
  editOneMeeting,
  navigate,
  isAuthorized
}) => {
  const [patientToAdd, setPatientToAdd] = useState({ patientName: '', doctorName: '', date: '', reports: '' }); 
  const [meetings, setMeetings] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const getAllMeetings = async () => {
    try {
      const resp = await getMeetings();
      if (resp.statusText === 'OK') {
        setMeetings(resp.data);
      }
    } catch (error) {
      showNotification('Ошибка!', 'Невозможно получить приемы!');
    }
  }

  const ifEmpty = () => {
    if (patientToAdd.patientName !== ''
      && patientToAdd.doctorName !== ''
      && patientToAdd.date !== ''
      && patientToAdd.reports !== ''
    ) {
      return setIsDisabled(false);
    } else {
      return setIsDisabled(true);
    }
  }

  const clearPatientInfo = () => {
    setPatientToAdd({...patientToAdd, patientName: '', doctorName: '', date: '', reports: ''
    });
  }

  const addNewMeeting = async () => {
    try {
      if (patientToAdd.patientName === ''
        || patientToAdd.doctorName === ''
        || patientToAdd.date === ''
        || patientToAdd.reports === ''
      ) {
        return showNotification('Ошибка!', 'Заполните пустые поля!');
      }
      const resp = await addMeeting(patientToAdd.patientName, patientToAdd.doctorName, patientToAdd.date, patientToAdd.reports);
      if (resp.statusText === 'OK') {
        setMeetings([...meetings, resp.data]);
        clearPatientInfo();
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllMeetings();
    // setTitle('Приемы');
    // setIsAuthorized(true);
    // if (!isAuthorized) {
    //   navigate('/authorization');
    // }
    ifEmpty();
  }, [patientToAdd]);

  return (
    <>
      <Header title="Приемы"/>

      <div className="add-option">
        <div className="name">
          <p>Имя:</p>
          <input 
            type="text" 
            value={patientToAdd.patientName}
            onChange={(event) => setPatientToAdd({...patientToAdd, patientName: event.target.value})}
          />
        </div>

        <div className="doctor">
          <p>Врач:</p>
          <select
            value={patientToAdd.doctorName}
            onChange={(event) => setPatientToAdd({...patientToAdd, doctorName: event.target.value})}
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
            value={patientToAdd.date} 
            onChange={(event) => setPatientToAdd({...patientToAdd, date: event.target.value})}
          />
        </div>

        <div className="reports">
          <p>Жалобы:</p>
          <input 
            type="text" 
            value={patientToAdd.reports}
            onChange={(event) => setPatientToAdd({...patientToAdd, reports: event.target.value})}
          />
        </div>

        <button 
          type="button" 
          onClick={() => addNewMeeting()}
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
            {meetings.map((meeting, index) => (
              <Meeting 
                key={index} 
                meeting={meeting} 
                showConfirmDelete={showConfirmDelete}
                deleteOneMeeting={deleteOneMeeting}
                showConfirmEdit={showConfirmEdit}
                editOneMeeting={editOneMeeting}
              />
            ))}
        </div>

      </div>
    </>
  )
}

export default MeetingsPage;
