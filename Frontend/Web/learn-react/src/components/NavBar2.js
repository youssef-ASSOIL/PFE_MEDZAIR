import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../images/logo.png';

const Navbar2 = ({ setToggle }) => {
  const navigate = useNavigate();
  
  
  const handleDeConnectClick = () => {
    navigate("/SignIn"); 
  };
  const handleUserNotFound = () => {
    navigate("/UserNotFound");
  };
  
 
  return (
    <div className="navbar">
      <div className="brand">
        <div className="hamburger" onClick={setToggle}>
          <div />
          <div />
          <div />
        </div>
        <div className="logo">
          <a href="#!">
            <img src={logo} alt="App Logo" className="logo-img" />
          </a>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/" onClick={handleUserNotFound}>Nos Clients</a>
        </li>
        <li>
          <a href="/">Contacter nous</a>
        </li>
        <li>
          
            <button className="meConnecterButton" onClick={handleDeConnectClick}>
              Logout
            </button>
          
        </li>
      </ul>
    </div>
  );
};

export default Navbar2;
