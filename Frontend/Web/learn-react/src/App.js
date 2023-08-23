
import React, { useState } from 'react';
import './css/App.css';
import {Route , Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPwd from './components/ResetPwd';
import Navbar from './components/Navbar';
import Main from './components/Main';
import UserNotFound from './components/UserNotFound';
import TableMedcinCalls from './components/TableMedcinCalls';
import DemandeMedcin from './components/DemandeMedcin';
import HospitalProfile from './components/HospitalProfile';
import SuccessAlert from './components/SuccessAlert';

const App = () => {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>} ></Route>
        <Route path='/SignUp' element={<SignUp/>} ></Route>
        <Route path='/SignIn' element={<SignIn/>} ></Route>
        <Route path='/ResetPwd' element={<ResetPwd/>} ></Route>
        <Route path='/SuccessAlert' element={<SuccessAlert/>} ></Route>
        <Route path='/UserNotFound' element={<UserNotFound/>} ></Route>
        <Route path='/TableMedcinCalls' element={<TableMedcinCalls/>}></Route>
        <Route path='/DemandeMedcin' element={<DemandeMedcin/>}></Route>
        <Route path='/HospitalProfile' element={<HospitalProfile/>}></Route>
      </Routes>
    </div>
  );
};

export default App;


