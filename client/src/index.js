import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from "./context/UserContext"
console.log(process.env)


ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
