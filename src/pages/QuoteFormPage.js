import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import QuoteForm from '../components/Quote/QuoteForm';

const QuoteFormPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: '1', paddingTop: '100px' }}>
            <QuoteForm />
          </main>
          <Footer />
        </div>
      );
  };
  

export default QuoteFormPage;
