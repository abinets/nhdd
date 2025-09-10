import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiUser } = FiIcons;

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      date: 'October 22',
      title: 'Day 1',
      sessions: [
        { time: '8:00 AM', title: 'Field Visit Diparture from Town', speaker: 'Led By Coordinators' },
        { time: '10:30 AM', title: 'Arrive on Selected Sites', speaker: 'Led By Higher Officials' },
        { time: '12:00 PM', title: 'Lunch & Networking', speaker: 'Led By Site Coordinators' },
        { time: '1:30 PM', title: 'Selected Facilities Visit', speaker: 'Led By Higher Officials' },
        { time: '3:00 PM', title: 'Discussion and Feedback', speaker: 'Led By Higher Officials' },
        { time: '4:30 PM', title: 'Return back to the Town', speaker: 'Led By Coordinators' }
      ]
    },
    {
      date: 'October 23',
      title: 'Day 2',
      sessions: [
        { time: '9:00 AM', title: 'Opening Remark', speaker: 'Dr. Mekdes Daba' },
        { time: '9:30 AM', title: 'Key Note Remark' , speaker: 'Regional Representative' },
        { time: '10:00 AM', title: 'Award Ceremony' , speaker: 'Led By Coordinators' },
        { time: '11:00 AM', title: 'Exhibition Visit' , speaker: 'Led by Coordinators' },
        { time: '12:00 PM', title: 'Lunch & Poster Session', speaker: '' },
        { time: '1:30 PM', title: 'Pannel Discussion', speaker: 'Led by Coordinators' },
        { time: '3:00 PM', title: 'Pannel Discussion', speaker: 'Led by Coordinators' },
        { time: '4:30 PM', title: 'Day 1 Recap', speaker: 'Dr. Mekdes Daba' }
      ]
    },
    {
      date: 'October 24',
      title: 'Day 3',
      sessions: [
        { time: '9:00 AM', title: 'Annual Performance Report', speaker: 'Dr. Muluken K.' },
        { time: '10:30 AM', title: 'Pannel Discussion', speaker: 'Dr. Habas A' },
        { time: '12:00 PM', title: 'Lunch & Awards Ceremony', speaker: '' },
        { time: '1:30 PM', title: 'Global Health Inoviations and Local Context', speaker: 'Dr. Sophie Gagnon' },
        { time: '3:00 PM', title: 'Pannel Discussion', speaker: 'Dr. Ahmed Yusuf' },
        { time: '4:30 PM', title: 'Closing Remarks & Networking', speaker: 'ARM Committee' }
      ]
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            ARM Schedule
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Three days of intensive learning, networking, and collaboration
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    activeDay === index
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  {activeDay !== index && (
                    <motion.div
                      className="absolute inset-0 bg-[#102542]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">
                    {day.title} - {day.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white p-6">
              <h3 className="text-2xl font-bold">
                {days[activeDay].title} - {days[activeDay].date}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {days[activeDay].sessions.map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-24 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <SafeIcon icon={FiClock} className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-gray-600">
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-900 mb-1">
                        {session.title}
                      </h4>
                      {session.speaker && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <SafeIcon icon={FiUser} className="w-4 h-4" />
                          <span className="text-sm">{session.speaker}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;