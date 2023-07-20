import React, { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleEnvoyer = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    try {
      // Make an HTTP POST request to the server to submit the form data
      const response = await fetch('http://localhost:3001/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        // Optionally, you can reset the form data after successful submission
        setFormData({ username: '', email: '', password: '' });
      } else {
        console.error('Failed to submit form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  return (
    <form className="Form" onSubmit={handleEnvoyer}>
      <h2 className="Form__heading">Inscription !</h2>
      <fieldset className="Form__fieldset">
        <legend className="Form__legend">Créer un compte</legend>
        <ul className="Form__list">
          <li className="Form__listItem">
            <label htmlFor="username" className="Form__label">
              Nom d'utilisateur:
            </label>
            <input
              type="text"
              id="username"
              className="Form__input"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </li>
          <li className="Form__listItem">
            <label htmlFor="email" className="Form__label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="Form__input"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </li>
          <li className="Form__listItem">
            <label htmlFor="password" className="Form__label">
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              className="Form__input"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </li>
        </ul>
      </fieldset>
      <button className="Form__button" type="submit">
        Envoyer
      </button>
      <button
        type="button"
        className="Form__button"
        onClick={() => this.changeView("logIn")}
      >
        J'ai déjà un compte
      </button>
    </form>
  );
}
