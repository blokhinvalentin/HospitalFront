import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../index';
import { Context } from '../..';
import logo from '../../img/logo.png';
import './style.scss';

const AuthorizationWindow = () => {
  const [user, setUser] = useState({ login: '', password: '' });
  const store  = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  }

  useEffect(() => {
    // store.publish(isAuth isAuth);
  }, []);

  return (<>
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
          type="email"
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
          onClick={() => store.login(user.login, user.password)}
        >
          Войти
        </button>

        <Link to="/registration" className="do-redirection-registration">Зарегистрироваться</Link>
      </div>
    </div>
  </>)
} 

export default AuthorizationWindow;
