import React from "react";
import { Link } from "react-router-dom"; // Import Link
import '../css/styles.css';

const nav = [
  { text: "Home", link: "#!", icon: "home" },
  { text: "About", link: "#!", icon: "box" },
  { text: "Demande Medecin", link: "/DemandeMedcin", icon: "book" },
];

const Sidebar = ({ toggleBtn }) => {
  return (
    <div className={`${toggleBtn ? "sidebar collapse" : "sidebar"}`} data-simplebar>
      <ul>
        {nav.map(item => (
          <li key={item.text}>
            <Link to={item.link} className={item.active ? "active" : ""}>
              <span className="icon">
                <i className={`fas fa-${item.icon}`} />
              </span>
              <span className="title">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
