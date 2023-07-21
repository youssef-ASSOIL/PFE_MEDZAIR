import React from "react";
import { Link } from "react-router-dom";
import "../css/SideBar.css";

const nav = [
  { text: "Home", link: "/", icon: "home" },
  { text: "About", link: "/about", icon: "box" },
  { text: "Movies", link: "/movies", icon: "tv", active: true },
  { text: "Contacts", link: "/contact", icon: "user" },
  { text: "Bobliothèque", link: "/library", icon: "book" },
  { text: "Cartographie", link: "/map", icon: "map-signs" },
  { text: "Nature", link: "/nature", icon: "leaf" },
];

const Sidebar = ({ toggleBtn }) => {
  return (
    <div className={`sidebar ${toggleBtn ? "collapse" : ""}`} data-simplebar>
      <ul>
        {nav.map((item) => (
          <li key={item.text}>
            <Link to={item.link} className={item.active ? "active" : ""}>
              <span className="icon">
                <i className={`fas fa-${item.icon}`} />
              </span>
              <span className={`title ${toggleBtn ? "collapsed" : ""}`}>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
