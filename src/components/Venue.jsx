import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiInfo } = FiIcons;

const Venue = () => {
  return (
    <section id="venue" className="py-20 bg-white" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Venue & Location
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Join us at Jimma's Aba Jifar Meeting Hall  in the heart of the city
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl p-8 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiMapPin} className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Jimma</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Jimma's Aba Jifar Meeting Hall, Jimma , Oromia
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  World-Class Facilities
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  it provides the perfect environment for our 
                  international conference.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">
                    Location Benefits
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Centrally located near top hotels and restaurants</li>
                  <li>• Easy access to Montreal's subway system</li>
                  <li>• Walking distance to Old Montreal attractions</li>
                  <li>• Modern conference facilities with latest technology</li>
                  <li>• Ample parking and accessibility features</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://i.ytimg.com/vi/pgjORbFCwVo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBZV9RlBk5cYayEFs46e7R5H4nUHA"
                alt="Jimma Traditional Coffee Center"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            <div className="mt-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj8mVXTdgp88BLMw941FczhNkj8Nl5Yh1UVcw4J8uLwTqFQgGboW7kwEyX7EyDlXsKBWg&usqp=CAU"
                alt="Jimma coridors"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;