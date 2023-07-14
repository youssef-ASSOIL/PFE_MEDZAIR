import React, { useState } from 'react';
import './css/App.css'; // Import the CSS file for Navbar styles
import logo from './images/logo.png'; // Import the logo image
import MyNewForm from './MyNewForm'; // Import the MyNewForm component

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleConnectClick = (event) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
    setShowForm(true);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Company Logo" /> {/* Use the imported logo image */}
          <span className="company-name">MedZair</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Nos Clients</a></li>
          <li><a href="/">Contacter nous</a></li>
          <li>
            <button className="meConnecterButton" onClick={handleConnectClick}>
              Me connecter
            </button>
          </li>
        </ul>
      </nav>
      {showForm && <MyNewForm />}
    </div>
  );
};

export default App;
