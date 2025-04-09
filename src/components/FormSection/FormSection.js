import React, { useState } from 'react';
import './FormSection.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/^\+?1?\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid US phone number';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;
    setIsSending(true);

    try {
      const res = await fetch('https://westhillexpressllc.com//send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      if (res.ok) {
        toast.success('✅ Message sent successfully!');
        setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' });
        setErrors({});
      } else {
        toast.error('❌ Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to connect to the server.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="form-section" id="contact-form">
      <div className="form-section__bg"></div>
      <div className="form-section__wrapper">
        <div className="form-section__left">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Family-Owned &amp; Operated – Personalized service with a commitment to excellence.</li>
            <li>Fast &amp; Responsible – We prioritize on-time and secure vehicle deliveries.</li>
            <li>Experienced &amp; Trusted – Over 5 years in business, working with top dealers and auctions.</li>
            <li>Hassle-Free Quotes – Call or text us anytime for a free, no-obligation quote!</li>
          </ul>
        </div>

        <div className="form-section__right">
          <h2>Write your Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-row full">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {Object.values(errors).map((e, i) => (
              <p key={i} style={{ color: 'red', fontSize: '0.9rem', margin: '0.3rem 0' }}>{e}</p>
            ))}

            <button type="submit" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
  position="bottom-right"
  autoClose={3000}
  theme="dark"
/>
    </section>
  );
};

export default FormSection;
