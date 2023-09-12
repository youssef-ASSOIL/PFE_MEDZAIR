import React, { useState } from 'react';
import logo from '../images/logo.png'; // Correct the path to the logo image.
import '../css/Main.css'; // Correct the path to the Main.css file.
import Navbar from './Navbar'; // Correct the import path for the Navbar component.
import Navbar2 from './NavBar2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Slider from 'react-slick'; // Importez la bibliothèque de carrousel
import 'slick-carousel/slick/slick.css'; // Styles de slick-carousel
import 'slick-carousel/slick/slick-theme.css'; // Thème de slick-carousel


const Main = () => {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn((val) => !val);
  const [loginState, setLoginState] = useState(false);

  const testimonials = [
    {
      text:
        "La collaboration avec Medzair est basée sur la confiance, la disponibilité et surtout le respect des engagements. Je suis rémunéré de la même façon avec les hôpitaux qui appliquent la loi Rist ou les autres.",
      author: "Dr. K.Y",
      specialty: "Gastroentérologue",
    },
    {
      text:
        "Disponible, efficace et rapide. Medzair m'a redonné goût pour les remplacements. Merci",
      author: "Dr. N.K",
      specialty: "Anesthésiste réanimateur",
    },
  ];
  

  return (
    <div className="top-wrapper">
      {loginState ? <Navbar2 setToggle={toggle} /> : <Navbar setToggle={toggle} />}
      <div className='hello'>
      <section className="centered-content">
        <p>Notre mission est de vous aider à trouver des médecins extrêmement rapides pour répondre à vos besoins de santé.</p>
      </section>
      
     


      <div className='MedZairDef'>
        <p><p className='med'>MEDZAIR</p>  <br /> <br />est une agence de mise en relation entre les médecins et personnels de santé d’un côté et les structures hospitalières de l’autre. <br /> <br /></p>
        <p>Cette initiative découle de la nécessité de répondre aux attaques injustes et incessantes envers les médecins remplaçants, une composante cruciale pour la continuité des soins, voire la survie de certaines structures médicales. <br /> <br /></p>
        <p>En outre, la mise en place de la loi Rist a engendré des difficultés pour l'ensemble du système de santé, en particulier pour les petits hôpitaux qui risquent de ne plus pouvoir assurer les soins nécessaires à la population et se trouvent menacés de fermeture. <br /> <br /></p>
        <p>MEDZAIR représente une action citoyenne visant à défendre un droit universel fondamental : le droit à la santé.</p>
      </div>
      </div>
      <section className="testimonials">
        <h2>Nos avis candidats :</h2>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">
                {testimonial.author}, {testimonial.specialty}
              </p>
            </div>
          ))}
        </Slider>
      </section>

      <div className="landing-page">
        <header className="header">
          <img src={logo} alt="Company Logo" className="logo" />
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Medzair/100090049247966/">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.linkedin.com">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </header>
        
        <section className="contact-section">
          <h1>Contactez-nous</h1>
          <p>
            E-mail : <a href="mailto:recrutement@medzair.com">recrutement@medzair.com</a>
          </p>
          <p>
            Téléphone : <a href="tel:0651870434">06 51 87 04 34</a>
          </p>
          <p>Horaires : Du lundi au vendredi de 9h à 18h</p>
        </section>
    </div>
    </div>
  );
};

export default Main;
