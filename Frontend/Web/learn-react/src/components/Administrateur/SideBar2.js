import React from "react";
import { Link } from "react-router-dom";
import "../../css/styles.css";


const nav = [
  { text: "Ajouter Medecin", link: "/AjouterMedecin", icon: "home" },
  { text: "Modifier Medecin", link: "/ModifierMedcin", icon: "home" },
  { text: "Supprimer Medecin", link: "/SupprimerMedecin", icon: "home" },
  { text: "Lister Medecin", link: "/ListerMedcin", icon: "home" },
  
  { text: "Ajouter Hopital", link: "/AjouterHospital", icon: "home" },
  { text: "Modifier Hopital", link: "/ModifierHospital", icon: "home" },
  { text: "Supprimer Hopital", link: "/SupprimerHospital", icon: "home" },
  { text: "Lister Hopital", link: "/ListerHospitals", icon: "home" },
  // { text: "Login demande", link: "/LoginDemande", icon: "home" },
 
];

const SideBar2 = ({ toggleBtn }) => {
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

export default SideBar2;
