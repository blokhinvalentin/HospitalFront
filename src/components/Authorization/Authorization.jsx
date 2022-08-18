import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortals } from 'react-portal-hook';
import { Context } from 'src';
import { Header } from 'src/components';
import { Notification } from 'src/components';
import { checkLogin, checkPassword } from 'src/helpers/validation';
import logo from 'src/img/logo.png';
import './style.scss';

const Authorization = () => {
  const store  = useContext(Context);
  const portalManager = usePortals();
  const [user, setUser] = useState({ 
    login: '', 
    password: '' 
  });

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  }

  const showNotification = (status, message) => {
        portalManager.open(
          portal => <Notification 
            closeNotification={portal.close} 
            status={status} 
            message={message} 
          />
        );
      }
  const logIn = (login, password) => {
    try {
      if (checkLogin(login) && checkPassword(password)) {
        return store.login(login, password);
      }
      return showNotification('Ошибка', 'Неверное имя или пароль!');
    } catch (error) {
      showNotification('Ошибка', 'Повторите запрос позже...');
    }
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <Header title="Войти в систему" />
      <div className="authorization__page">
        <img 
          src={logo} 
          alt="" 
          className="img__logo"
        />

        <div className="authorization__form">
          <h3 className="authorization__form-title">Войти в систему</h3>
          <p className="authorization__form-text">Логин:</p>
          <input 
            type="text"
            value={user.login}
            onChange={(event) => handleChange('login', event.target.value)}
            className="authorization__form-enter-info"
            placeholder="Логин"
          />
          <p className="authorization__form-text">Пароль:</p>
          <input 
            type="password"
            value={user.password}
            onChange={(event) => handleChange('password', event.target.value)}
            className="authorization__form-enter-info"
            placeholder="Пароль"
          />
          <button 
            type="button" 
            className="authorization__form-user"
            onClick={() => logIn(user.login, user.password)}
          >
            Войти
          </button>
          <Link to="/registration" className="do-redirection-registration">Зарегистрироваться</Link>
        </div>
      </div>
    </>
  )
} 

export default Authorization;
