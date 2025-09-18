import React from 'react';
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

const About = () => {
  const highlights = [{
    icon: (
      <Icon
        d="M2 20h20V4H2v16zM4 6h16v12H4V6zm2 2v2h2V8H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm4-8v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zm4-8v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
        className="w-8 h-8 text-white"
      />
    ),
    title: 'Standardized Data',
    description: 'Ensuring consistency and quality across all health information systems for better data collection and analysis.'
  }, {
    icon: (
      <Icon
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        className="w-8 h-8 text-white"
      />
    ),
    title: 'Improved Patient Care',
    description: 'Enabling precise diagnosis and treatment by using a globally recognized, detailed classification system.'
  }, {
    icon: (
      <Icon
        d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
        className="w-8 h-8 text-white"
      />
    ),
    title: 'Global Interoperability',
    description: 'Facilitating the seamless exchange of health data between different systems and countries for collaborative research and reporting.'
  }, {
    icon: (
      <Icon
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        className="w-8 h-8 text-white"
      />
    ),
    title: 'Enhanced Searchability',
    description: 'Making it easier for doctors and researchers to find and categorize specific conditions with a consistent set of codes.'
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
            About the NHDD & ICD-11
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The **National Health Data Dictionary (NHDD)** provides a standardized framework for health data in Ethiopia. It ensures that data collected from various sources is consistent, reliable, and interoperable.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The **International Classification of Diseases, 11th Revision (ICD-11)** is a global standard for diagnostic health information. As the foundation for our disease list, it provides a comprehensive, structured, and globally recognized system for classifying diseases, injuries, and other health-related conditions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By leveraging both the NHDD and ICD-11, this application aims to create a unified and efficient platform for accessing and managing essential health data.
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;