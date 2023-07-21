import React from 'react';
import logo from '../images/logo.png';
import "../css/Main.css";

export default function Main() {
  return (
    <div className="main-container">
      <img src={logo} alt="Company Logo" />
      <div className="centered-content">
        Rejoignez le réseau d’un établissement de santé et postulez à ses missions de remplacement
      </div>
    </div>
  );
}
