import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PortalProvider } from 'react-portal-hook';
import App from './App';
import Store from './store/store';
import './index.scss';

const store = new Store();
// console.log(store.login('asd', 'asd'));

export const Context = createContext(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PortalProvider>
      <Context.Provider value={store}>
        <App />
      </Context.Provider>
    </PortalProvider>
  </BrowserRouter>
);
