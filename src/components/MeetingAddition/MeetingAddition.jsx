import { useState } from 'react';
import { addMeeting } from 'src/services/MeetingService';
import ErrorSnackbar from 'src/components/ErrorSnackbar/ErrorSnackbar';
import './style.scss';

const MeetingAddition = ({ meetings, setMeetings }) => {
  const [newMeeting, setNewMeeting] = useState({ 
    patientName: '', 
    doctorName: '', 
    date: '', 
    complaints: '' 
  });
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDisabled = false;
  const doctors = ['Доктор врач', 'Иванов Иван Иванович', 'А. Б. Ввфывыфвфы'];

  const handleChange = (key, value) => {
    setNewMeeting({...newMeeting, [key]: value});
  }

  const showSnackbar = (message) => {
    setIsSnackbarOpened(true);
    setErrorMessage(message);
  }

  const clearPatientInfo = () => {
    setNewMeeting({...newMeeting, patientName: '', doctorName: '', date: '', complaints: '' });
  }

    const addNewMeeting = async () => {
      try {
        const resp = await addMeeting(newMeeting);
        if (resp.statusText === 'OK') {
          setMeetings([...meetings, resp.data]);
          clearPatientInfo();
        }
      } catch (error) {
        showSnackbar('Невозможно добавить прием!');
      }
    }

  return (
    <div className="add-option">
      <div className="add-option__name">
        <p>Имя:</p>
        <input 
          className="add-option__input"
          type="text" 
          value={newMeeting.patientName}
          onChange={(event) => handleChange('patientName', event.target.value)}
        />
      </div>
      <div className="add-option__doctor">
        <p>Врач:</p>
        <select
          className="add-option__select"
          value={newMeeting.doctorName}
          onChange={(event) => handleChange('doctorName', event.target.value)}
        >
          <option value="" disabled></option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>{doctor}</option>
          ))}
        </select>
      </div>
      <div className="add-option__date">
        <p>Дата:</p>
        <input 
          className="add-option__input"
          type="date"
          value={newMeeting.date} 
          onChange={(event) => handleChange('date', event.target.value)}
        />
      </div>
      <div className="add-option__reports">
        <p>Жалобы:</p>
        <input 
          className="add-option__input"
          type="text" 
          value={newMeeting.complaints}
          onChange={(event) => handleChange('complaints', event.target.value)}
        />
      </div>
      <button 
        type="button"
        className="add-option__button-add"
        disabled={isDisabled}
        onClick={addNewMeeting}
      >
        Добавить
      </button>
      <ErrorSnackbar 
        isSnackbarOpened={isSnackbarOpened} 
        setIsSnackbarOpened={setIsSnackbarOpened}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default MeetingAddition;
