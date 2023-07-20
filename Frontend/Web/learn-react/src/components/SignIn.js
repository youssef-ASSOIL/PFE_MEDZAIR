import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/MyNewForm.css"
import SignUp from './SignUp';
export default function SignIn() {
    const navigate= useNavigate();

    const handleToReset = () => {
        navigate("/ResetPwd");
      };

    const HandleSignUp =()=>{
        navigate("/SignUp")
    }

  
    return (
        <form className="Form">
            <h2 className="Form__heading">Bienvenue !</h2>
            <fieldset className="Form__fieldset">
              <legend className="Form__legend">Connexion</legend>
              <ul className="Form__list">
                <li className="Form__listItem">
                  <label htmlFor="username" className="Form__label">
                    Nom d'utilisateur :
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="Form__input"
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
            <button className="Form__button">Se connecter</button>
            <button
              type="button"
              className="Form__button"
              onClick={() => HandleSignUp()}
            >
              Créer un compte
            </button>
          </form>
    )
  }

