import React from 'react';
import { motion } from 'framer-motion';

const Speakers = () => {
  const speakers = [
    {
      name: 'H.E. Dr. Mekdes Daba',
      title: 'Minister',
      institution: 'Ministry of Health, Ethiopia',
      bio: 'A respected public health professional, she has dedicated her career to improving the health and well-being of the Ethiopian population. Her leadership focuses on strengthening the country\'s healthcare system and addressing key public health challenges',
      image:  'https://www.moh.gov.et/sites/default/files/styles/mt_member_photo/public/2024-03/DR%20Mekdes%20Dabba.jpg?itok=oxAtJCmY'
    },
    {
      name: 'H.E. Dr. Dereje Duguma',
      title: 'State Minister',
      institution: 'Ministry of Health, Ethiopia',
      bio:  ' H.E. Dr. Dereje Duguma is instrumental in the implementation of national health policies and the oversight of key public health programs. His work focuses on advancing healthcare access and improving health outcomes for all Ethiopians.',
      image:  'https://addisfortune.news/wp-content/uploads/2025/05/dereje-duguma.jpg'
    },
    {
      name: ' H.E. Frehiwot Abebe',
      title: 'State Minister',
      institution: 'Ministry of Health, Ethiopia',
      bio: 'H.E. Frehiwot Abebe is the State Minister of Health, leading the Resource, Administration, and Regulatory Wing. She oversees key areas such as the pharmaceutical supply chain, professional regulation, and the Ethiopian Health Insurance Service, where she was previously the Director General.',
      image:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvEE6mzH-4ukgRCo-7KEXJE55MWJP6-O3EsA&s'
    },
    {
      name: 'H.E. Sahrela Abdulahi',
      title: 'State Minister',
      institution: 'Ministry of Health, Ethiopia',
      bio: 'H.E. Sahrela Abdulahi is a former State Minister of Health for Ethiopia. During her tenure, she played a key role in public health initiatives and health system capacity building. She has since transitioned to a new role, continuing her public service career.',
      image: 'https://www.thereporterethiopia.com/wp-content/uploads/2023/01/Navigating-the-min.jpg'
    }
  ];

  return (
    <section id="speakers" className="py-20 bg-white" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Featured Speakers
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Learn from world-renowned experts who are shaping the future of Health care medicine
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {speaker.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-1">
                  {speaker.title}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {speaker.institution}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;