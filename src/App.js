import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from 'src';
import { Authorization } from 'src/components/index';
import { Registration } from 'src/components/index';
import { MeetingsPage } from 'src/components/index';
import 'src/App.scss';

const App = () => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  useEffect(() => {
    store.authCheck();
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

  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="registration" />} />
    </Routes>
  )
}

export default App;
