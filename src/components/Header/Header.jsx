import { useState, useContext } from 'react';
import { Context } from 'src';
import meds from 'src/img/meds.png';
import 'src/components/Header/style.scss';

const Header = ({ title }) => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  return (
    <header>
      <img 
        src={meds} 
        alt=""
        className="header__logo"  
      />
      <h2 className="header__title">{title}</h2>
      <div className={isAuth ? 'user-authorized' : 'user-unauthorized'} onClick={store.logout}>
        <button className="button__logout">Выход</button>
      </div>
    </header>
  )
}

export default Header;
