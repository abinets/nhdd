import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiMic, FiBookOpen } = FiIcons;

const About = () => {
  const highlights = [
    {
      icon: FiMic,
      title: '20+ Sessions',
      description: 'Comprehensive presentations covering the latest in Health care research and clinical practice'
    },
    {
      icon: FiUsers,
      title: '25+  Speakers',
      description: 'World-renowned experts sharing cutting-edge insights and breakthrough discoveries'
    },
    {
      icon: FiBookOpen,
      title: 'Hands-on Workshops',
      description: 'Interactive learning experiences with advanced cardiac imaging and intervention techniques'
    }
  ];

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
              The Annual Review Meeting 2025 brings together leading Health care specialists, researchers, 
              and healthcare professionals from around the world to share cutting-edge research, innovative 
              treatment approaches, and collaborative solutions for advancing health care service through Digitilization.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission focuses on pioneering gender-based Health care, exploring the role of 
              artificial intelligence in cardiology, and fostering international collaboration to tackle 
              the most pressing challenges in cardiac medicine today.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                <SafeIcon icon={highlight.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                {highlight.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
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