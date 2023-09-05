
import React, { useState } from 'react';
import './css/App.css';
import {Route , Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPwd from './components/ResetPwd';
import Navbar from './components/Navbar';
import Main from './components/Main';
import UserNotFound from './components/UserNotFound';
import TableMedcinCalls from './components/Hospital/TableMedcinCalls';
import DemandeMedcin from './components/Hospital/DemandeMedcin';
import HospitalProfile from './components/Hospital/HospitalProfile';
import SuccessAlert from './components/Hospital/SuccessAlert';
import MedecinCalendar from './components/Hospital/MedecinCalendar';
import AjouterHospital from './components/Administrateur/AjouterHospital';
import ModifierHospital from './components/Administrateur/ModifierHospital';
import SupprimerHospital from './components/Administrateur/SupprimerHospital';
import AjouterMedecin from './components/Administrateur/AjouterMedecin';
import ModifierMedcin from './components/Administrateur/ModifierMedcin';
import SupprimerMedecin from './components/Administrateur/SupprimerMedecin';
import ListerHospitals from './components/Administrateur/ListerHospitals';
import ListerMedcin from './components/Administrateur/ListerMedcin';
import SignInAdmin from './components/Administrateur/SignInAdmin';

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
        <Route path='/MedecinCalendar' element={<MedecinCalendar/>}></Route> 
        <Route path='/AjouterHospital' element={<AjouterHospital/>}></Route> 
        <Route path='/AjouterMedecin' element={<AjouterMedecin/>}></Route> 
        <Route path='/ModifierHospital' element={<ModifierHospital/>}></Route> 
        <Route path='/SupprimerHospital' element={<SupprimerHospital/>}></Route> 
        <Route path='/ModifierMedcin' element={<ModifierMedcin/>}></Route> 
        <Route path='/SupprimerMedecin' element={<SupprimerMedecin/>}></Route> 
        <Route path='/ListerHospitals' element={<ListerHospitals/>}></Route> 
        <Route path='/ListerMedcin' element={<ListerMedcin/>}></Route> 
        <Route path='/SignInAdmin' element={<SignInAdmin/>}></Route> 
      </Routes>
    </div>
  );
};

export default App;


