import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from 'src';
import Header from 'src/components/Header/Header';
import ErrorSnackbar from 'src/components/ErrorSnackbar/ErrorSnackbar';
import { checkLogin, checkPassword } from 'src/helpers/validation';
import logo from 'src/img/logo.png';
import './style.scss';

const Authorization = () => {
  const store  = useContext(Context);
  const [user, setUser] = useState({ 
    login: '', 
    password: '' 
  });
  const [isShown, setIsShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showSnackbar = (message) => {
    setIsShown(true);
    setErrorMessage(message);
  };

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  }

  const logIn = async () => {
    try {
      if (!checkLogin(user.login) || !checkPassword(user.password)) {
        showSnackbar('Неверный логин или пароль!');
        return;
      }
      
      const errorMessage = await store.login(user.login, user.password);
      if (errorMessage) {
        showSnackbar(errorMessage.response.data.message);
        return;
      }
    } catch (error) {
      showSnackbar('Повторите запрос позже...');
    }
  }

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
            onClick={logIn}
          >
            Войти
          </button>
          <Link to="/registration" className="do-redirection-registration">Зарегистрироваться</Link>
          <ErrorSnackbar 
            isShown={isShown} 
            setIsShown={setIsShown}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </>
  )
} 

export default Authorization;
