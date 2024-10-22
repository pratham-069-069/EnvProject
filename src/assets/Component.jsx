import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaCalendarAlt, FaTruck } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EcoCollectLanding.css';
import { Link } from 'react-router-dom';

const EcoCollectLanding = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    wasteType: '',
    collectionDate: new Date(),
    termsAgreed: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      collectionDate: date
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/collect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            setFormSubmitted(true);
        } else {
            console.log('Error submitting form');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="eco-collect-landing">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <FaLeaf className="logo-icon" />
            <span>EcoCollect</span>
          </Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/component">Form</Link></li>
              <li><Link to="/wastepricing">Pricing</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>EcoCollect: Your Partner in Clean Communities</h1>
              <p>Join us in our mission to keep our neighborhoods clean and green. Schedule your garbage collection today!</p>
              <div className="cta-buttons">
                <a href="#learn-more" className="button primary">Learn More</a>
                <a href="#contact" className="button secondary">Contact Us</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Why Choose EcoCollect?</h2>
            <div className="feature-grid">
              <motion.div
                className="feature-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRecycle className="feature-icon" />
                <h3>Eco-Friendly</h3>
                <p>We use sustainable practices to minimize environmental impact.</p>
              </motion.div>
              <motion.div
                className="feature-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt className="feature-icon" />
                <h3>Flexible Scheduling</h3>
                <p>Choose a collection time that works best for you.</p>
              </motion.div>
              <motion.div
                className="feature-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTruck className="feature-icon" />
                <h3>Reliable Service</h3>
                <p>Count on us for timely and efficient waste collection.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="schedule-pickup">
          <div className="container">
            <h2>Schedule Your Pickup</h2>
            
            {formSubmitted ? (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Thank You!</h3>
                <p>Your collection request has been submitted successfully. We'll be in touch soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="pickup-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="wasteType">Type of waste</label>
                    <select
                      id="wasteType"
                      name="wasteType"
                      required
                      value={formData.wasteType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select waste type</option>
                      <option value="general">General Waste</option>
                      <option value="recyclable">Recyclable</option>
                      <option value="green">Green Waste</option>
                      <option value="electronic">Electronic Waste</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="collectionDate">Preferred collection date</label>
                    <DatePicker
                      selected={formData.collectionDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      id="collectionDate"
                      name="collectionDate"
                    />
                  </div>
                </div>
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAgreed"
                    required
                    checked={formData.termsAgreed}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>
                <button type="submit" className="button primary">Submit Request</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <div className="next-button">
        <Link to="/wastepricing" className="button primary">Next</Link>
      </div>
    </div>
  );
};

export default EcoCollectLanding;