import React from 'react';
import './WhatWeDoSection.css';

const WhatWeDoSection = () => {
  return (
    <section className="what-we-do-section">
      <div className="what-we-do-section__image">
        <h2>What We Do</h2> {/* Мобільна/планшетна версія */}
      </div>
      <div className="what-we-do-section__text-block">
        <h2>What We Do</h2> {/* Десктопна версія */}
        <p>
          At West Hill Express LLC, we understand the importance of safe and timely vehicle transportation. We work with dealerships, auctions, and private clients, handling a wide range of vehicles, including:
        </p>
        <ul>
          <li>New & Used Cars</li>
          <li>Auction Relocation</li>
          <li>Ambulance Units</li>
          <li>Fire Machines</li>
          <li>Vans & Handicap Vans</li>
          <li>And Much More!</li>
        </ul>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
