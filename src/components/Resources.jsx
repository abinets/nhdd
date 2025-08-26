import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon'; // Assuming SafeIcon correctly renders FiIcons
import * as FiIcons from 'react-icons/fi';

const { FiDownload } = FiIcons; // Only need FiDownload now

const Resources = () => {
  // Updated ResourcesPlans with more items for a 4x5 grid layout
  // Each item now includes a title and a downloadLink
  const ResourcesPlans = [
    { title: 'Annual Report 2024', downloadLink: 'https://example.com/annual-report-2024.pdf' },
    { title: 'Fact Sheet Q1 2025', downloadLink: 'https://example.com/fact-sheet-q1-2025.pdf' },
    { title: 'Guideline Document A', downloadLink: 'https://example.com/guideline-a.pdf' },
    { title: 'Policy Brief 001', downloadLink: 'https://example.com/policy-001.pdf' },
    { title: 'Research Paper Vol 1', downloadLink: 'https://example.com/research-v1.pdf' },
    { title: 'Annual Report 2023', downloadLink: 'https://example.com/annual-report-2023.pdf' },
    { title: 'Fact Sheet Q4 2024', downloadLink: 'https://example.com/fact-sheet-q4-2024.pdf' },
    { title: 'Guideline Document B', downloadLink: 'https://example.com/guideline-b.pdf' },
    { title: 'Policy Brief 002', downloadLink: 'https://example.com/policy-002.pdf' },
    { title: 'Research Paper Vol 2', downloadLink: 'https://example.com/research-v2.pdf' },
    { title: 'Annual Report 2022', downloadLink: 'https://example.com/annual-report-2022.pdf' },
    { title: 'Fact Sheet Q3 2024', downloadLink: 'https://example.com/fact-sheet-q3-2024.pdf' },
    { title: 'Guideline Document C', downloadLink: 'https://example.com/guideline-c.pdf' },
    { title: 'Policy Brief 003', downloadLink: 'https://example.com/policy-003.pdf' },
    { title: 'Research Paper Vol 3', downloadLink: 'https://example.com/research-v3.pdf' },
    { title: 'Annual Report 2021', downloadLink: 'https://example.com/annual-report-2021.pdf' },
    { title: 'Fact Sheet Q2 2024', downloadLink: 'https://example.com/fact-sheet-q2-2024.pdf' },
    { title: 'Guideline Document D', downloadLink: 'https://example.com/guideline-d.pdf' },
    { title: 'Policy Brief 004', downloadLink: 'https://example.com/policy-004.pdf' },
    { title: 'Research Paper Vol 4', downloadLink: 'https://example.com/research-v4.pdf' },
  ];

  return (
    <section id="Resources" className="py-20 bg-white" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            ARM Resources
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore and download our valuable resources.
          </p>
        </motion.div>

        {/* Grid adjusted to 4 columns on medium and larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {ResourcesPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }} // Slightly reduced delay for more items
              viewport={{ once: true }}
              whileHover={{ y: -5 }} // Slightly reduced hover lift
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6 flex flex-col items-center text-center"
            >
              {/* Title of the resource */}
              <h3 className="text-xl font-bold text-blue-900 mb-4 h-16 flex items-center justify-center">
                {plan.title}
              </h3>

              {/* QR Code */}
              <div className="mb-6 flex-shrink-0">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(plan.downloadLink)}`}
                  alt={`QR Code for ${plan.title}`}
                  className="rounded-lg shadow-md w-36 h-36"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/cccccc/000000?text=QR+Error" }} // Fallback image for error
                />
                <p className="text-xs text-gray-500 mt-2">Scan to Download</p>
              </div>

              {/* Download Button */}
              <motion.a
                href={plan.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group bg-red-600 text-white hover:bg-red-700 flex items-center justify-center space-x-2"
              >
                <FiDownload className="w-5 h-5 z-10" />
                <span className="relative z-10">Download</span>
                {/* Background hover effect */}
                <motion.div
                    className="absolute inset-0 bg-blue-900"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;