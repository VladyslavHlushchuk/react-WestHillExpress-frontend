import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
    <div className="about-section__image">
      <h2>About</h2> {/* ← Тільки для мобільної */}
    </div>
  
    <div className="about-section__text-block">
      <h2>About</h2> {/* ← Тільки для десктопу */}
      <p>
        West Hill Express LLC is a trusted family-owned transportation company based in Syracuse, New York. <br/>
        With over 5 years in business, we specialize in providing fast, reliable, and professional vehicle 
        transport services across the country.
      </p>
    </div>
  </section>

  );
};

export default AboutSection;
