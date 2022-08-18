import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthorizationWindow, MeetingsPage, RegistrationWindow } from '../src/components/index';
import { Context } from './index';
import './App.scss';

const App = () => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);
  console.log('isAuth', isAuth);

  useEffect(() => {
    store.authCheck();
    store.subscribe(isAuth => setIsAuth(isAuth));
  }, [])

  if (isAuth === true) {
    return (
    <Routes>
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="*" element={<Navigate to="meetings" />} />
    </Routes>
      
    );
  }

  return (
    <Routes>
        <Route path="/authorization" element={<AuthorizationWindow />} />
        <Route path="/registration" element={<RegistrationWindow />} />
        <Route path="*" element={<Navigate to="authorization" />} />
    </Routes>
  )
}

export default App;
