import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const scrollToSectionAfterNavigate = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHomeAndScroll = () => scrollToSectionAfterNavigate('hero');

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <img
            src="/logo.PNG"
            alt="West Hill Express LLC"
            className="navbar__logo"
            onClick={goHomeAndScroll}
            style={{ cursor: 'pointer' }}
          />

          <div className={`navbar__menu ${isMenuOpen ? 'open' : ''}`}>
            <button className="link-button" onClick={goHomeAndScroll}>
              Home
            </button>
            <button className="link-button" onClick={() => scrollToSectionAfterNavigate('about')}>
              About
            </button>
          </div>
        </div>

        <div className="navbar__right">
          <button
            className="navbar__button"
            onClick={() => scrollToSectionAfterNavigate('contact-form')}
          >
            Contact Us
          </button>
          <div className="navbar__burger" onClick={toggleMenu}>☰</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
