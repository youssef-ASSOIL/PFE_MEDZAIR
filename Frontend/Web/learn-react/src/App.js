
import React, { useState } from 'react';
import './css/App.css';
import logo from './images/logo.png';
import MyNewForm from './MyNewForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Barside';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);


  const handleConnectClick = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="menu-icon" onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="logo">
          <img src={logo} alt="Company Logo" />
          <span className="company-name">MedZair</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Nos Clients</a>
          </li>
          <li>
            <a href="/">Contacter nous</a>
          </li>
          <li>
            <button className="meConnecterButton" onClick={handleConnectClick}>
              Me connecter
            </button>
          </li>
        </ul>
      </nav>

      <Sidebar 
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}  
      />

     

      {showForm && <MyNewForm />}
    </div>
  );
};

export default App;
