import { useContext } from 'react';
import { Context } from 'src';
import meds from 'src/img/meds.png';
import './style.scss';

const Header = ({ title }) => {
  const store = useContext(Context);

  const logOut = () => {
    return store.logout();
  }

  return (
    <header>
      <img 
        src={meds} 
        alt=""
        className="header__logo"  
      />
      <h2 className="header__title">{title}</h2>
      <div className={store.isAuth ? 'user-authorized' : 'user-unauthorized'} onClick={logOut}>
        <button className="button__logout">Выход</button>
      </div>
    </header>
  )
}

export default Header;
