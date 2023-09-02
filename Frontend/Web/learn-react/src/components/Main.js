import React, { useState } from 'react';
import logo from '../images/logo.png'; // Correct the path to the logo image.
import '../css/Main.css'; // Correct the path to the Main.css file.
import Sidebar from './Hospital/Barside'; // Correct the import path for the Sidebar component.
import Navbar from './Navbar'; // Correct the import path for the Navbar component.
import Navbar2 from './NavBar2';

const Main = () => {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn((val) => !val);
  const [loginState, setLoginState] = useState(false);
 

  return (
    <div className="top-wrapper">
      {loginState ? <Navbar2 setToggle={toggle} /> : <Navbar setToggle={toggle} />}
      <div className="content-principale"></div>
    </div>
  );
};

export default Main;
