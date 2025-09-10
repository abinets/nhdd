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
      description: 'Reviewing annual health reports and engaging in collaborative panel discussions.'
    },
    {
      icon: FiUsers,
      title: '25+ Speakers',
      description: 'Higher officials, donors, partners, and healthcare leaders sharing their insights.'
    },
    {
      icon: FiBookOpen,
      title: '8+ Side Events',
      description: 'Field visits, an awards ceremony, and discussions on advancing the health sector.'
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