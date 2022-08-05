import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Design from './components/pages/Design';
import Merch from './components/pages/Merch';
import Music from './components/pages/Music';
import Shows from './components/pages/Shows';
import Names from './components/pages/Names';
import About from './components/pages/About';
import Beatstore from './components/pages/Beatstore';
import Journal from './components/pages/Journal';
import Mathle from './components/pages/mratth';
import Account from './Account';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Navigation />
      <Routes>
        <Route exact path ='/' element={<Home/>} />
        <Route path='/Music' element={<Music/>} />
        <Route path='/Shows' element={<Shows/>} />
        <Route path='/Design' element={<Design/>} />
        <Route path='/Merch' element={<Merch/>} />
        <Route path='/Names' element={<Names/>} />
        <Route path='/Beats' element={<Beatstore/>} />
        <Route path='/About' element={<About />} />
        <Route path='/Journal' element={<Journal />} />
        <Route path='/mathle' element={<Mathle />} />
        <Route path='/User' element={<Account />} />
        <Route path='/User/Forgot' element={<ForgotPassword />} />
        <Route path='/User/changepassword' element={<ChangePassword />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
