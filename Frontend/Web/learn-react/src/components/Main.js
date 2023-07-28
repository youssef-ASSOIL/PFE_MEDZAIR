import React, { useState } from 'react';
import logo from '../images/logo.png'; // Correct the path to the logo image.
import '../css/Main.css'; // Correct the path to the Main.css file.
import Sidebar from './Barside'; // Correct the import path for the Sidebar component.
import Navbar from './Navbar'; // Correct the import path for the Navbar component.

const Main = () => {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn((val) => !val);
  
  return (
    <div className="top-wrapper">
      <Navbar setToggle={toggle} />
      <Sidebar toggleBtn={toggleBtn} />
      <div className="content-principale"></div>
    </div>
  );
};

export default Main;
