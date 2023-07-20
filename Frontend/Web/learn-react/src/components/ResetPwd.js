import React, { Component } from 'react'

export default class ResetPwd extends Component {



  render() {
    return (
        <form className="Form">
          <h2 className="Form__heading">Réinitialisation du mot de passe</h2>
          <fieldset className="Form__fieldset">
            <legend className="Form__legend">
              Réinitialisation du mot de passe
            </legend>
            <ul className="Form__list">
              <li className="Form__listItem">
                <em className="Form__em">
                  Un lien de réinitialisation sera envoyé dans votre boîte de
                  réception !
                </em>
              </li>
              <li className="Form__listItem">
                <label htmlFor="email" className="Form__label">
                  Email :
                </label>
                <input
                  type="email"
                  id="email"
                  className="Form__input"
                  required
                />
              </li>
            </ul>
          </fieldset>
          <button className="Form__button">
            Envoyer le lien de réinitialisation
          </button>
          <button
            type="button"
            className="Form__button"
            onClick={() => this.changeView("logIn")}
          >
            Retour
          </button>
        </form>
    )
  }
}
