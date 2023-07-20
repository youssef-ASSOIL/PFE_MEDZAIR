import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/SideBar.css"
const Sidebar = ({ showSidebar, setShowSidebar }) => {

  return (
    <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        <FontAwesomeIcon 
          icon={faTimes}
          onClick={() => setShowSidebar(false)} 
        />
      </div>

      <ul className="sidebar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link> 
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
