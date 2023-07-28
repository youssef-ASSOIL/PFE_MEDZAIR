import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyNewForm.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleToReset = () => {
    navigate("/ResetPwd");
  };

  const handleConnection = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/checkHospitalUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          console.log("Hospital user already exists!");
        } else {
          try {
            const addResponse = await fetch("http://localhost:3002/submitFormData", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });

            if (addResponse.ok) {
              console.log("Form data submitted successfully!");
              setFormData({ username: "", password: "" });
            } else {
              console.error("Failed to submit form data:", addResponse.statusText);
            }
          } catch (error) {
            console.error("Error submitting form data:", error);
          }
        }
      } else {
        console.error("Failed to check hospital user:", response.statusText);
      }
    } catch (error) {
      console.error("Error checking hospital user:", error);
    }
  };

  const HandleSignUp = () => {
    navigate("/SignUp");
  };

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
              name="username"
              value={formData.username}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
      <button className="Form__button" onClick={handleConnection}>
        Se connecter
      </button>
      <button type="button" className="Form__button" onClick={HandleSignUp}>
        Créer un compte
      </button>
    </form>
  );
}
