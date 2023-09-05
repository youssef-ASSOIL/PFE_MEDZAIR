
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "../../css/MyNewForm.css";
import UserNotFound from "../UserNotFound";
import axios from "axios";

export default function SignInAdmin() {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [codeAdmin, setCodeAdmin] = useState("");


    const SignInHospital= () => {
        navigate("/SignIn"); 
    };
 
    
    const SignInUserCheck = (e) => {
        e.preventDefault();
  
        // Simple form validation
        if (!codeAdmin || !password) {
          setError("Email and password must be provided");
          return;
        }
  
        setError(""); // Clear any previous error
  
        
  
        // Make a POST request to the /signIn endpoint on your server
        axios
          .post("/SignInAdmin", { codeAdmin, password })
          .then((response) => {
            console.log(response.data);
            navigate("/AjouterHospital");
          })
          .catch((error) => {
            console.log(error.response.data);
            setError("Invalid credentials"); // Set error message based on server response
          });
      };

  return (
    <div>
      <form className="Form">
        
        <h2 className="Form__heading">Connecter Admin !</h2>
        <fieldset className="Form__fieldset">
          <ul className="Form__list">
            <li className="Form__listItem">
              <label htmlFor="codeAdmin" className="Form__label">
                Code Admin :
              </label>
              <input
                type="text"
                id="codeAdmin" 
                className="Form__input"
                value={codeAdmin}
                name="codeAdmin"
                onChange={(e) => setCodeAdmin(e.target.value)}
                required
                />
            </li>
            <li className="Form__listItem">
              <label htmlFor="password" className="Form__label">
                Mot de passe :
              </label>
              <input
                type="password"
                id="password"
                className="Form__input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            
          </ul>
        </fieldset>
        <button className="Form__button" onClick={SignInUserCheck}>
          Se connecter
        </button>
       
        <button className="Form__button" onClick={SignInHospital}>
          login as Hospital
        </button>
      </form>
    {error && <UserNotFound />}
    
      </div>
  )
}
