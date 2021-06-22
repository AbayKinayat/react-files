import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import ClotheStore from './store/ClotheStore';

export const Context = createContext(null);


ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      clothe: new ClotheStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();