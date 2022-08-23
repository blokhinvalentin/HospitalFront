import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import Header from 'src/components/Header/Header';
import ErrorSnackbar from 'src/components/ErrorSnackbar/ErrorSnackbar';
import { checkLogin, checkPassword } from 'src/helpers/validation';
import logo from 'src/img/logo.png';
import './style.scss';

const Registration = () => {
  const store = useContext(Context);
  const [user, setUser] = useState({ 
    login: '', 
    password: '', 
    passwordRepeat: '' 
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = (message) => {
    setOpen(true);
    setErrorMessage(message);
  };

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  }

  const registration = () => {
    try {
      if (!checkLogin(user.login) || !checkPassword(user.password)) {
        return handleOpen("Неверный формат логина или пароля!");
      }
      
      if (user.password !== user.passwordRepeat) {
        return handleOpen("Пароли не совпадают!");
      }
      
      return store.userRegistration(user.login, user.password);
    } catch (error) {
      handleOpen('Повторите запрос позже...');
    }
  }

  return (
    <>
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
            type="text" 
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
            placeholder="Повторите пароль"
          />
          <button 
            type="button" 
            className="registration__form-user"
            onClick={registration}
          >
            Зарегистрироваться
          </button>
          <Link to="/authorization" className="do-redirection-authorization">Авторизоваться</Link>
          <ErrorSnackbar 
            open={open} 
            setOpen={setOpen}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </>
  )
} 

export default Registration;
