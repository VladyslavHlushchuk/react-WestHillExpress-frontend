import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section
      className="hero"
      id="hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/hero.png'})`,
      }}
    >
      <div className="hero__gradient">
        <div className="hero__container">
          <div className="hero__overlay">
            <h1>Our Logistics<br />Service</h1>

            <div className="quote-intro">
              <div className="quote-left">
                <p className="quote-subtitle">Your Custom Shipping Solution Starts Here</p>
              </div>

              <div className="quote-button-wrapper">
                <a href="/quote" className="hero__button">Get a Quote</a>
              </div>

              <div className="quote-right">
                <p className="quote-description">
                  Whether you're relocating, purchasing a new car, or managing corporate logistics, trust West Hill Express LLC to provide you with an efficient and straightforward auto shipping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
