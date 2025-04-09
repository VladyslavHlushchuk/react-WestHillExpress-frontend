import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Tyler D.',
      text: 'TTransporting my vehicle with West Hill Express LLC was a great decision. Their communication was top-notch—they kept me informed every step of the way. The team was respectful and efficient, making what could have been a stressful experience totally easy and comfortable. Highly impressed!',
      rating: 5,
    },
    {
      name: 'Jeff Klonowski',
      text: 'I had an excellent experience shipping my car with West Hill Express LLC. Right from the start, the staff was friendly, professional, and extremely helpful. They kept in touch throughout the journey, and the entire process went smoothly without any issues. I really appreciated their attention to detail.',
      rating: 4.5,
    },
    {
      name: 'Jordan L.',
      text: 'If you need a reliable and hassle-free car transport service, West Hill Express LLC is the way to go. I will definitely be using them again and highly recommend them to anyone in need of auto transport!',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileCarousel, setIsMobileCarousel] = useState(window.innerWidth <= 1321);

  // Відстежуємо зміну розміру вікна
  useEffect(() => {
    const handleResize = () => {
      setIsMobileCarousel(window.innerWidth <= 1321);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функції для перемикання
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">What Our Customers Say</h2>

      {isMobileCarousel ? (
        // 1) Якщо ширина до 1321px => один відгук + кнопки
        <>
          <div className="testimonials__container single">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className={`testimonials__card ${idx === currentIndex ? 'active' : 'hidden'}`}
              >
                <h3 className="testimonials__name">{review.name}</h3>
                <p className="testimonials__text">{review.text}</p>
                <div className="testimonials__rating">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__arrows">
            <button onClick={handlePrev} className="arrow-btn">{'<'}</button>
            <button onClick={handleNext} className="arrow-btn">{'>'}</button>
          </div>
        </>
      ) : (
        // 2) Якщо ширина від 1322px => грід із 3 відгуками, без кнопок
        <div className="testimonials__container grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="testimonials__card">
              <h3 className="testimonials__name">{review.name}</h3>
              <p className="testimonials__text">{review.text}</p>
              <div className="testimonials__rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
