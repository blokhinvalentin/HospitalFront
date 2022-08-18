import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../index';
import { Context } from '../..';
import logo from '../../img/logo.png';
import './style.scss';

const RegistrationWindow = () => {
  const store = useContext(Context);
  const [user, setUser] = useState({ login: '', password: '', passwordRepeat: '' })
  const [isAuth, setIsAuth] = useState(store.isAuth);

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  }

  useEffect(() => {
    // store.publish(isAuth => setIsAuth(isAuth));
  }, []);

  return (<>
    <Header title="Зарегистрироваться в системе" />
    <div className="registration__page">
      <img 
        src={logo} 
        alt=""
        className="img__logo" 
      />

      <div className="registration__form">
        <h3 className="registration__form-title">Регистрация</h3>
        <p className="registration__form-text">Логин:</p>
        <input 
          type="email" 
          value={user.login} 
          onChange={(event) => handleChange('login', event.target.value)}
          className="registration__form-enter-info"
          placeholder="Логин"
        />

        <p className="registration__form-text">Пароль:</p>
        <input 
          type="password" 
          value={user.password} 
          onChange={(event) => handleChange('password', event.target.value)}
          className="registration__form-enter-info"
          placeholder="Пароль"
        />

        <p className="registration__form-text">Повторите пароль:</p>
        <input 
          type="password" 
          value={user.passwordRepeat} 
          onChange={(event) => handleChange('passwordRepeat', event.target.value)}
          className="registration__form-enter-info"
          placeholder="Пароль"
        />

        <button 
          type="button" 
          className="registration__form-user"
          onClick={() => store.userRegistration(user.login, user.password)}
        >
          Зарегистрироваться
        </button>

        <Link to="/authorization" className="do-redirection-authorization">Авторизоваться</Link>
      </div>
    </div>
  </>)
} 

export default RegistrationWindow;
