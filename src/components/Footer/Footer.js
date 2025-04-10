import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <a href="#hero">Home</a>
          <a href="#about">About Us</a>
        </div>

        <div className="footer__center">
        <img src="/logo.PNG" alt="West Hill Express LLC" className="navbar__logo" />
            <br/>
          <p>Copyright © West Hill Express L.L.C</p>
        </div>

        <div className="footer__right">
        <div className="footer__contacts">
         <p><strong>    Contacts:</strong></p>
              <p><FaPhoneAlt style={{ marginRight: '8px' }} /> +1-315-400-9620</p>
              <p><FaEnvelope style={{ marginRight: '8px' }} /> Westhillexpress@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
