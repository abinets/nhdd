import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi'; // Corrected import statement

const { FiAward, FiStar } = FiIcons; // Add FiAward and FiStar for voting

const Awardees = () => {
  // Initial awardee data with unique IDs, vote counts, Ethiopian names, and images
  const initialAwardees = [
    { id: '1', name: 'Dr. Almaz Kebede', description: 'Pioneering work in Digital Health Integration and successful implementation of Telemedicine solutions across rural regions.', votes: 15, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=AK' },
    { id: '2', name: 'Mr. Solomon Abebe', description: 'Innovator in Telemedicine Solutions for Rural Areas and a key advocate for accessible healthcare technology.', votes: 22, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=SA' },
    { id: '3', name: 'Ms. Genet Lemma', description: 'Leader in AI-driven Diagnostics, developing cutting-edge algorithms to improve early disease detection.', votes: 18, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=GL' },
    { id: '4', name: 'Dr. Tesfaye Negash', description: 'Architect of National Health Data Platforms, enabling seamless data exchange and robust analytics for public health.', votes: 30, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=TN' },
    { id: '5', name: 'Mrs. Sofia Bekele', description: 'Champion for Health Equity through Digital Literacy programs, empowering underserved communities with technology.', votes: 25, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=SB' },
    { id: '6', name: 'Mr. Kaleab Tadesse', description: 'Expert in Cybersecurity for Health Systems, safeguarding patient data and ensuring system integrity.', votes: 10, imageUrl: 'https://placehold.co/100x100/512bd4/ffffff?text=KT' },
  ];

  const [awardees, setAwardees] = useState(initialAwardees);
  // Initialize hasVoted from localStorage on component mount
  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem('hasVotedForAwardees') === 'true';
  });

  // Calculate total votes for percentage calculation in the chart
  const totalVotes = awardees.reduce((sum, awardee) => sum + awardee.votes, 0);

  // Function to handle voting
  const handleVote = (awardeeId) => {
    if (!hasVoted) {
      setAwardees(prevAwardees =>
        prevAwardees.map(awardee =>
          awardee.id === awardeeId ? { ...awardee, votes: awardee.votes + 1 } : awardee
        )
      );
      // Set the flag in localStorage after a vote is cast
      localStorage.setItem('hasVotedForAwardees', 'true');
      setHasVoted(true); // User has voted for this session
    }
  };

  return (
    <section id="awardees" className="py-20 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
           2025 Award Nominees
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Cast your vote for the outstanding contributors of the year!
          </p>
        </motion.div>

        {/* Awardees List with Voting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {awardees.map((awardee, index) => (
            <motion.div
              key={awardee.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-900"></div> {/* Decorative line - now blue */}
              
              {/* Awardee Image */}
              <img
                src={awardee.imageUrl}
                alt={awardee.name}
                className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-blue-500 p-1" // Image styling - now blue ring
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/cccccc/000000?text=IMG" }}
              />

              <SafeIcon icon={FiAward} className="w-16 h-16 text-blue-500 mb-4" /> {/* Icon now blue */}
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{awardee.name}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{awardee.description}</p>
              
              <motion.button
                onClick={() => handleVote(awardee.id)}
                disabled={hasVoted}
                whileHover={{ scale: hasVoted ? 1 : 1.05 }}
                whileTap={{ scale: hasVoted ? 1 : 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  hasVoted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700' // Button now blue
                }`}
              >
                <SafeIcon icon={FiStar} className="w-5 h-5" />
                <span>{hasVoted ? 'Voted!' : 'Vote Now'}</span>
              </motion.button>
              <p className="mt-2 text-sm text-gray-500">{awardee.votes} votes</p>
            </motion.div>
          ))}
        </div>

        {/* Voting Results Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            2025 Nominees Voting Results
          </h3>
          <div className="space-y-6">
            {awardees.map(awardee => {
              const percentage = totalVotes > 0 ? (awardee.votes / totalVotes) * 100 : 0;
              return (
                <div key={awardee.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-medium text-gray-800">{awardee.name}</span>
                    <span className="text-lg font-semibold text-blue-600">{percentage.toFixed(1)}%</span> {/* Percentage now blue */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-blue-500 h-full rounded-full" // Bar color now blue
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awardees;
