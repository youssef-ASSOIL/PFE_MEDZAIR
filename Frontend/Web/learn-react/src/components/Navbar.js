import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Barside';
import logo from '../images/logo.png';
import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = React.useState(false);

  const handleConnectClick = () => {
    navigate("/SignIn");
  };

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar); // Toggle the state to show/hide the sidebar
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
      <Sidebar toggleBtn={showSidebar} /> {/* Pass the showSidebar state as a prop */}
    </div>
  );
}
