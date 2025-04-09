import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import AboutSection from './components/AboutSection/AboutSection';
import WhatWeDoSection from './components/AboutSection/WhatWeDoSection';
import Footer from './components/Footer/Footer';
import Testimonials from './components/Reviews/Testimonials';
import FormSection from './components/FormSection/FormSection';
import QuoteFormPage from './pages/QuoteFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <AboutSection />
            <WhatWeDoSection />
            <Testimonials />
            <FormSection />
            <Footer />
          </>
        } />
        <Route path="/quote" element={<QuoteFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
