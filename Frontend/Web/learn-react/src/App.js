
import React, { useState } from 'react';
import './css/App.css';
import {Route , Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPwd from './components/ResetPwd';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>} ></Route>
        <Route path='/SignUp' element={<SignUp/>} ></Route>
        <Route path='/ResetPwd' element={<ResetPwd/>} ></Route>
        
      </Routes>
    </div>
  );
};

export default App;
