import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyNewForm.css";
import UserNotFound from "./UserNotFound"; 
import axios from "axios";
import TableMedcinCalls from "./TableMedcinCalls";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const SignInUserCheck = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      setError("Email and password must be provided");
      return;
    }

    setError(""); // Clear any previous error

    // Make a POST request to the /signIn endpoint on your server
    axios
      .post("/signIn", { email, password })
      .then((response) => {
        console.log(response.data); // You can handle the response here if needed
        navigate("/TableMedcinCalls");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError("Invalid credentials"); // Set error message based on server response
      });
  };

  const handleToReset = () => {
    navigate("/ResetPwd");
  };

  const HandleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div>
    <form className="Form">
      
      <h2 className="Form__heading">Bienvenue !</h2>
      <fieldset className="Form__fieldset">
        <legend className="Form__legend">Connexion</legend>
        <ul className="Form__list">
          <li className="Form__listItem">
            <label htmlFor="username" className="Form__label">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="Form__input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            className="Form__button Form__button--forgotPassword"
            onClick={() => handleToReset()}
          >
            Mot de passe oublié ?
          </button>
        </ul>
      </fieldset>
      <button className="Form__button" onClick={SignInUserCheck}>
        Se connecter
      </button>
      <button type="button" 
      className="Form__button" 
      onClick={()=>HandleSignUp()}
      >
        Créer un compte
      </button>
    </form>
   {error && <UserNotFound />}
    </div>
  );
}
