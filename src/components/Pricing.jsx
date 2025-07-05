import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiUser, FiUsers } = FiIcons;

const Pricing = () => {
  const pricingPlans = [
    {
      title: 'Student',
      earlyBird: 99,
      standard: 129,
      icon: FiUser,
      features: [
        'Access to all sessions',
        'Conference materials',
        'Networking events',
        'Certificate of attendance',
        'Student ID required'
      ],
      popular: false
    },
    {
      title: 'Professional',
      earlyBird: 249,
      standard: 299,
      icon: FiUsers,
      features: [
        'Access to all sessions',
        'Conference materials',
        'Networking events',
        'Certificate of attendance',
        'Workshop access',
        'Lunch included',
        'Continuing education credits'
      ],
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Conference Pricing
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Choose the registration option that best fits your needs
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-700 font-semibold">
              Early Bird pricing ends August 15, 2025
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                plan.popular ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-900 to-red-600 rounded-full mb-4 mx-auto">
                    <SafeIcon icon={plan.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {plan.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-500">Early Bird:</span>
                      <span className="text-3xl font-bold text-green-600">
                        ${plan.earlyBird}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-500">Standard:</span>
                      <span className="text-2xl font-bold text-gray-700">
                        ${plan.standard}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#102542]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Register Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;