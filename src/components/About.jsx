import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Self-contained Icon component using SVG for a single-file solution
const Icon = ({ d, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={d} />
  </svg>
);

const About = ({ onRegisterClick }) => {
  const highlights = [{
    icon: (
      <Icon
        d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zM6 13a6 6 0 0 0 12 0v-2h-2v2a4 4 0 0 1-8 0v-2H6v2zm6 11a7 7 0 0 1-7-7h2a5 5 0 0 0 10 0h2a7 7 0 0 1-7 7z"
        className="w-8 h-8 text-white"
      />
    ),
    title: '20+ Sessions',
    description: 'Reviewing annual health reports and engaging in collaborative panel discussions.'
  }, {
    icon: (
      <Icon
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        className="w-8 h-8 text-white"
      />
    ),
    title: '25+ Speakers',
    description: 'Higher officials, donors, partners, and healthcare leaders sharing their insights.'
  }, {
    icon: (
      <Icon
        d="M21 21c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16zM5 5v14h14V5H5zm8 4h-2V7h2v2zm-2 4h2v-2h-2v2zm4 0h-2v-2h2v2zm-4 4h2v-2h-2v2zm4 0h-2v-2h2v2z"
        className="w-8 h-8 text-white"
      />
    ),
    title: '8+ Side Events',
    description: 'Field visits, an awards ceremony, and discussions on advancing the health sector.'
  }, {
    icon: (
      <Icon
        d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 0v14h16V5H4zm2 2v2h2v-2H6zm0 4v2h2v-2H6zm4-4v2h2v-2h-2zm0 4v2h2v-2h-2zm4-4v2h2v-2h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zm-4 0v2h2v-2h-2zm-4 0v2h2v-2H6z"
        className="w-8 h-8 text-white"
      />
    ),
    title: '12+ Exhibitions Booths',
    description: 'All regional and national-level exhibitors are participating and exhibiting their works at the event.'
  }];

  return (
    <section id="about" className="py-20 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            About the ARM
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The 27th Annual Review Meeting brings together key healthcare stakeholders, including partners, donors,
              and higher officials from various regions. The primary goal is to collaboratively review the annual
              health reports and engage in panel discussions on advancing the nation's health sector through
              digitalization.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This year, our mission is clear: to gain significant health improvements through sustainable investments
              and innovations.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-900 to-red-600 rounded-full mb-6 mx-auto">
                {highlight.icon}
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                {highlight.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {highlight.description}
              </p>
              {highlight.title === '12+ Exhibitions Booths' && (
                <div className="text-center mt-4">
                  <button
                    onClick={onRegisterClick}
                    className="inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    Register as Exhibitor
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ExhibitorRegistrationForm = ({ onBackClick, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    contactPerson: '',
    organization: '',
    email: '',
    phoneNumber: '',
    region: '',
    whatToExhibit: '',
    itemsToDisplay: '',
    requestedResources: '',
    sponsorshipType: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ethiopianRegions = [
    'Afar', 'Amhara', 'Benishangul-Gumuz', 'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'Southern Nations, Nationalities, and Peoples\' Region', 'South West Ethiopia Peoples\' Region', 'Tigray'
  ];

  const sponsorshipTypes = ['Platinium', 'Gold', 'Silver'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send the form data to the backend server using the fetch API
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      // Call the success handler from the parent component
      onRegistrationSuccess();
    } catch (e) {
      console.error('Error submitting form:', e);
      setError(`An error occurred during registration. Please check if the backend server is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto w-full max-w-2xl">
      <div className="absolute top-4 right-4">
        <button onClick={onBackClick} className="text-gray-500 hover:text-gray-800 transition-colors">
          <Icon d="M6 18L18 6M6 6l12 12" className="w-8 h-8" />
        </button>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
        Exhibitor Registration
      </h2>
      <p className="text-gray-700 mb-8">
        Please fill out the form below to register your organization as an exhibitor.
      </p>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-semibold text-gray-700 mb-1">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          >
            <option value="">Select a Region</option>
            {ethiopianRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-1">
            Contact Person Full Name
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          />
        </div>
        <div>
          <label htmlFor="whatToExhibit" className="block text-sm font-semibold text-gray-700 mb-1">
            What to Exhibit?
          </label>
          <textarea
            id="whatToExhibit"
            name="whatToExhibit"
            rows="3"
            value={formData.whatToExhibit}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="itemsToDisplay" className="block text-sm font-semibold text-gray-700 mb-1">
            Items to Display
          </label>
          <textarea
            id="itemsToDisplay"
            name="itemsToDisplay"
            rows="3"
            value={formData.itemsToDisplay}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="requestedResources" className="block text-sm font-semibold text-gray-700 mb-1">
            Requested Resources at the Booth
          </label>
          <textarea
            id="requestedResources"
            name="requestedResources"
            rows="3"
            value={formData.requestedResources}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="sponsorshipType" className="block text-sm font-semibold text-gray-700 mb-1">
            Sponsorship Type
          </label>
          <select
            id="sponsorshipType"
            name="sponsorshipType"
            value={formData.sponsorshipType}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          >
            <option value="">Select Sponsorship Type</option>
            {sponsorshipTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">
            Additional Notes / Requirements
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

const ConfirmationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center"
      >
        <div className="text-green-500 mx-auto mb-4">
          <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-6">
          We will be in touch shortly with more details about your exhibition.
        </p>
        <button
          onClick={onClose}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};


const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const modalRef = useRef(null);

  const handleRegisterClick = () => {
    setIsPanelOpen(true);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsPanelOpen(false);
    }
  };

  const handleBackClick = () => {
    setIsPanelOpen(false);
  };

  const handleRegistrationSuccess = () => {
    setIsPanelOpen(false);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="relative min-h-screen">
      <About onRegisterClick={handleRegisterClick} />

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4 md:p-8"
          >
            <motion.div
              ref={modalRef}
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-2xl relative"
            >
              <ExhibitorRegistrationForm onBackClick={handleBackClick} onRegistrationSuccess={handleRegistrationSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationModal onClose={handleCloseConfirmation} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
