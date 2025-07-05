import React from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
  const sponsorTiers = [
    {
      title: 'Platinum Sponsors',
      sponsors: [
        { name: 'CardioTech Innovations', logo: 'https://via.placeholder.com/200x80/1e3a8a/ffffff?text=CardioTech' },
        { name: 'MedDevice Solutions', logo: 'https://via.placeholder.com/200x80/1e3a8a/ffffff?text=MedDevice' }
      ]
    },
    {
      title: 'Gold Sponsors',
      sponsors: [
        { name: 'HeartCare Systems', logo: 'https://via.placeholder.com/180x70/dc2626/ffffff?text=HeartCare' },
        { name: 'Cardiac Dynamics', logo: 'https://via.placeholder.com/180x70/dc2626/ffffff?text=Cardiac' },
        { name: 'Vascular Technologies', logo: 'https://via.placeholder.com/180x70/dc2626/ffffff?text=Vascular' }
      ]
    },
    {
      title: 'Silver Sponsors',
      sponsors: [
        { name: 'MedTech Partners', logo: 'https://via.placeholder.com/160x60/6b7280/ffffff?text=MedTech' },
        { name: 'Cardio Research Lab', logo: 'https://via.placeholder.com/160x60/6b7280/ffffff?text=Research' },
        { name: 'Heart Health Institute', logo: 'https://via.placeholder.com/160x60/6b7280/ffffff?text=Institute' },
        { name: 'Pulse Innovations', logo: 'https://via.placeholder.com/160x60/6b7280/ffffff?text=Pulse' }
      ]
    }
  ];

  return (
    <section id="sponsors" className="py-20 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We're grateful to our sponsors who make this conference possible
          </p>
        </motion.div>

        <div className="space-y-16">
          {sponsorTiers.map((tier, tierIndex) => (
            <motion.div
              key={tierIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: tierIndex * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-8">
                {tier.title}
              </h3>
              <div className={`grid gap-8 ${
                tier.sponsors.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
                tier.sponsors.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto' :
                'grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto'
              }`}>
                {tier.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;