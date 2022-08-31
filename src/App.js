import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '.';
import MeetingsPage from 'src/components/MeetingsPage/MeetingsPage';
import './App.scss';

const App = () => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  useEffect(() => {
    store.subscribe(isAuth => setIsAuth(isAuth));
  }, [])

  if (isAuth) {
    return (
      <Routes>
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="*" element={<Navigate to="meetings" />} />
      </Routes>
    )
  }
}

export default App;
