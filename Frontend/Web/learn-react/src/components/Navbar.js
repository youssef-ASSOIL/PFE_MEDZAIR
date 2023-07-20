import React, { Component } from "react";

export default class Navbar extends Component {
    


     handleConnectClick = (event) => {
      event.preventDefault();
      setShowForm(true);
    };
  
     handleMenuClick = () => {
      setShowSidebar(!showSidebar);
    };
  render() {
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
              <button
                className="meConnecterButton"
                onClick={handleConnectClick}
              >
                Me connecter
              </button>
            </li>
          </ul>
        </nav>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    );
  }
}
