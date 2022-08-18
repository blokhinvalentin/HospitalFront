import { useState, useContext } from 'react';
import { Context } from '../../index';
import meds from '../../img/meds.png';
import './style.scss';

const Header = ({ title }) => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  return (
    <header>
      <img src={meds} alt="" />
      <h2>{title}</h2>
      
      <div className={isAuth ? 'user-authorized' : 'user-unauthorized'} onClick={store.logout}>
        <button>Выход</button>
      </div>
    </header>
  )
}

export default Header;