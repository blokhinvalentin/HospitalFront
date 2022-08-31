import { useEffect, useState, useContext } from 'react';
import { usePortals } from 'react-portal-hook';
import { Context } from 'src';
import { getMeetings, editMeeting, deleteMeeting } from 'src/services/MeetingService';
import Header from 'src/components/Header/Header';
import MeetingAddition from 'src/components/MeetingAddition/MeetingAddition';
import MeetingsContainer from 'src/components/MeetingsContainer/MeetingsContainer';
import ErrorSnackbar from 'src/components/ErrorSnackbar/ErrorSnackbar';
import './style.scss';

const MeetingsPage = () => {
  const store  = useContext(Context);
  const portalManager = usePortals();
  const [meetings, setMeetings] = useState([]);
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showSnackbar = (message) => {
    setIsSnackbarOpened(true);
    setErrorMessage(message);
  };

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

  useEffect(() => {
    getAllMeetings();
  }, []);

  return (
    <>
      <Header title="Приемы" />
      <MeetingAddition meetings={meetings} setMeetings={setMeetings} />
      <MeetingsContainer meetings={meetings} />
      <ErrorSnackbar 
        isSnackbarOpened={isSnackbarOpened} 
        setIsSnackbarOpened={setIsSnackbarOpened}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default MeetingsPage;