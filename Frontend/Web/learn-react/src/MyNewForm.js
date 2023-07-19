import React, { Component } from 'react';
import './css/MyNewForm.css';

class MyNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "signUp"
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    });
  }

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form className='Form'>
            <h2 className='Form__heading'>Inscription !</h2>
            <fieldset className='Form__fieldset'>
              <legend className='Form__legend'>Créer un compte</legend>
              <ul className='Form__list'>
                <li className='Form__listItem'>
                  <label htmlFor="username" className='Form__label'>Nom d'utilisateur :</label>
                  <input type="text" id="username" className='Form__input' required />
                </li>
                <li className='Form__listItem'>
                  <label htmlFor="email" className='Form__label'>Email :</label>
                  <input type="email" id="email" className='Form__input' required />
                </li>
                <li className='Form__listItem'>
                  <label htmlFor="password" className='Form__label'>Mot de passe :</label>
                  <input type="password" id="password" className='Form__input' required />
                </li>
              </ul>
            </fieldset>
            <button className='Form__button'>Envoyer</button>
            <button
              type="button"
              className='Form__button'
              onClick={() => this.changeView("logIn")}
            >
              J'ai déjà un compte
            </button>
          </form>
        );
      case "logIn":
        return (
          
          <form className='Form'>
            <h2 className='Form__heading'>Bienvenue !</h2>
            <fieldset className='Form__fieldset'>
              <legend className='Form__legend'>Connexion</legend>
              <ul className='Form__list'>
                <li className='Form__listItem'>
                  <label htmlFor="username" className='Form__label'>Nom d'utilisateur :</label>
                  <input type="text" id="username" className='Form__input' required />
                </li>
                <li className='Form__listItem'>
                  <label htmlFor="password" className='Form__label'>Mot de passe :</label>
                  <input type="password" id="password" className='Form__input' required />
                </li>
                
                <button
                    className='Form__button Form__button--forgotPassword'
                    onClick={() => this.changeView("PWReset")}
                >
                    Mot de passe oublié ?
                </button>
                
              </ul>
            </fieldset>
            <button className='Form__button'>Se connecter</button>
            <button
              type="button"
              className='Form__button'
              onClick={() => this.changeView("signUp")}
            >
              Créer un compte
            </button>
          </form>
        );
      case "PWReset":
        return (
          <form className='Form'>
            <h2 className='Form__heading'>Réinitialisation du mot de passe</h2>
            <fieldset className='Form__fieldset'>
              <legend className='Form__legend'>Réinitialisation du mot de passe</legend>
              <ul className='Form__list'>
                <li className='Form__listItem'>
                  <em className='Form__em'>
                    Un lien de réinitialisation sera envoyé dans votre boîte de réception !
                  </em>
                </li>
                <li className='Form__listItem'>
                  <label htmlFor="email" className='Form__label'>Email :</label>
                  <input type="email" id="email" className='Form__input' required />
                </li>
              </ul>
            </fieldset>
            <button className='Form__button'>Envoyer le lien de réinitialisation</button>
            <button
              type="button"
              className='Form__button'
              onClick={() => this.changeView("logIn")}
            >
              Retour
            </button>
          </form>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    );
  }
}

export default MyNewForm;