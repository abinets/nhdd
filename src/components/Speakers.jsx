import React from 'react';
import { motion } from 'framer-motion';

const Speakers = () => {
  const speakers = [
    {
      name: 'Dr. Emily Chen',
      title: 'Chief of Cardiology',
      institution: 'Mayo Clinic',
      bio: 'Leading expert in interventional cardiology with over 20 years of experience in complex cardiac procedures.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Lucas Moreau',
      title: 'Professor of Cardiology',
      institution: 'Harvard Medical School',
      bio: 'Pioneering researcher in cardiac regenerative medicine and stem cell therapy applications.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Sophie Gagnon',
      title: 'Director of Cardiac Research',
      institution: 'McGill University',
      bio: 'Specialist in gender-based cardiovascular care and women\'s heart health initiatives.',
      image: 'https://images.unsplash.com/photo-1594824388853-d0c4a3b8b5b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Ahmed Yusuf',
      title: 'AI in Cardiology Lead',
      institution: 'Imperial College London',
      bio: 'Innovator in artificial intelligence applications for cardiac diagnostics and predictive modeling.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
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
            Learn from world-renowned experts who are shaping the future of cardiovascular medicine
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
                <p className="text-red-600 font-semibold mb-1">
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