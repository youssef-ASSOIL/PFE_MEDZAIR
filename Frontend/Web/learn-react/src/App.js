
import React, { useState } from 'react';
import './css/App.css';
import {Route , Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPwd from './components/ResetPwd';
import Navbar from './components/Navbar';
import Main from './components/Main';


const App = () => {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>} ></Route>
        <Route path='/SignUp' element={<SignUp/>} ></Route>
        <Route path='/SignIn' element={<SignIn/>} ></Route>
        <Route path='/ResetPwd' element={<ResetPwd/>} ></Route>
        
      </Routes>
    </div>
  );
};

export default App;
