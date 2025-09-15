import React from 'react';
import { motion } from 'framer-motion';

const Awardees = () => {
  return (
    <section id="awardees" className="py-20 bg-gray-50 flex items-center justify-center min-h-screen" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Awards Nominees
          </h2>
          <p className="text-xl text-gray-700">
            To be announced soon. Please check back later for updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Awardees;