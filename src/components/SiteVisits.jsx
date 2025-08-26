import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

// Using FiMapPin for location, FiInfo for details, FiImage for gallery, FiClock for visit times, FiCheckCircle for list items
const { FiMapPin, FiInfo, FiImage, FiClock, FiCheckCircle } = FiIcons; 

const SiteVisits = () => {
  const siteLocations = [
    {
      title: 'Jimma University Main Campus',
      description: 'The main campus of Jimma University, a leading institution in Ethiopia, known for its green environment and academic excellence. Attendees will explore key facilities relevant to digital health innovation and research.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7634628286047!2d36.83734491477065!3d7.683693294406201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b075e7a3721389%3A0x8f2d5743b2e5a4e0!2sJimma%20University%20University%20Main%20Campus!5e0!3m2!1sen!2set!4v1678912345678!5m2!1sen!2set',
      images: [
        'https://placehold.co/400x250/BADA55/FFFFFF?text=JU+Campus+1',
        'https://placehold.co/400x250/808000/FFFFFF?text=JU+Campus+2',
        'https://placehold.co/400x250/FF7F50/FFFFFF?text=JU+Campus+3',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 120',
        'Distance from Jimma City: 3 km',
        'Focus: Digital health research, academic collaborations'
      ],
    },
    {
      title: 'Abajifar Palace Museum',
      description: 'Step back in time at the historic Abajifar Palace, once the residence of King Abajifar. This site offers cultural insights and a glimpse into the regional history, providing a unique backdrop for ARM discussions.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.805566373801!2d36.82729111477063!3d7.678783694409396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b0758410940199%3A0x6a05e55b4b1a4a5!2sAbajifar%20Palace%20Museum!5e0!3m2!1sen!2set!4v1678912345679!5m2!1sen!2set',
      images: [
        'https://placehold.co/400x250/E0BBE4/FFFFFF?text=Palace+Ext',
        'https://placehold.co/400x250/957DAD/FFFFFF?text=Palace+Int',
        'https://placehold.co/400x250/D291BC/FFFFFF?text=Palace+Art',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 80',
        'Distance from Jimma City: 5 km',
        'Focus: Cultural exchange, historical context for ARM visitors'
      ],
    },
    {
      title: 'Boye Lake Recreational Area',
      description: 'A serene lake perfect for relaxation and recreation. Recent restoration efforts have made it a vibrant spot, offering a refreshing break and informal networking opportunity for ARM participants.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.67056024467!2d36.816654014770685!3d7.694697994399763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b074a3502b4d21%3A0x7d2836696b9d6e8e!2sLake%20Boye!5e0!3m2!1sen!2set!4v1678912345680!5m2=1sen!2set',
      images: [
        'https://placehold.co/400x250/FFDDC1/000000?text=Lake+View+1',
        'https://placehold.co/400x250/FFDAB9/000000?text=Boating',
        'https://placehold.co/400x250/FFC0CB/000000?text=Sunset',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 100',
        'Distance from Jimma City: 7 km',
        'Focus: Relaxation, informal networking for ARM attendees'
      ],
    },
    {
      title: 'Jimma Central Market',
      description: 'Immerse yourself in the bustling atmosphere of Jimma\'s central market. Experience local commerce and traditional Ethiopian goods, offering a cultural immersion for ARM guests.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.81830206259!2d36.830635214770635!3d7.677322994410291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b07584102b4d23%3A0x7d2836696b9d6e8f!2sJimma%20Central%20Market!5e0!3m2!1sen!2set!4v1678912345681!5m2!1sen!2set',
      images: [
        'https://placehold.co/400x250/C1E1C1/000000?text=Market+1',
        'https://placehold.co/400x250/A7D9A7/000000?text=Spices',
        'https://placehold.co/400x250/8CBE8C/000000?text=Textiles',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 60',
        'Distance from Jimma City: 2 km',
        'Focus: Local economy, cultural product insight for ARM delegates'
      ],
    },
    {
      title: 'Jimma Town Hall',
      description: 'A significant administrative building with architectural interest. While primarily an administrative center, its design reflects the town\'s governance, relevant for understanding local policy context for ARM.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8291884589286!2d36.82944321477062!3d7.676067994411139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b07584104c01d1%3A0x7d2836696b9d6e90!2sJimma%20Town%20Hall!5e0!3m2!1sen!2set!4v1678912345682!5m2!1sen!2set',
      images: [
        'https://placehold.co/400x250/ADD8E6/000000?text=Town+Hall+Ext',
        'https://placehold.co/400x250/87CEEB/000000?text=Architecture',
        'https://placehold.co/400x250/6A5ACD/000000?text=Entrance',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 40',
        'Distance from Jimma City: 1 km',
        'Focus: Governance structure, urban development relevant to ARM themes'
      ],
    },
    {
      title: 'Jimma Public Library',
      description: 'A community hub for learning and knowledge. The public library offers resources and a quiet space, highlighting local efforts in education and information access for ARM attendees.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.839974855268!2d36.82825121477061!3d7.674812994411986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b07584107101d2%3A0x7d2836696b9d6e91!2sJimma%20Public%20Library!5e0!3m2!1sen!2set!4v1678912345683!5m2!1sen!2set',
      images: [
        'https://placehold.co/400x250/DAF7A6/000000?text=Library+Ext',
        'https://placehold.co/400x250/C1E7B8/000000?text=Reading+Area',
        'https://placehold.co/400x250/9BCD9B/000000?text=Books',
      ],
      // Standardized visitInfo for ARM
      visitInfo: [
        'Date: October 15, 2025',
        'Total Participants: 50',
        'Distance from Jimma City: 1.5 km',
        'Focus: Educational initiatives, public resource accessibility for ARM visitors'
      ],
    },
  ];

  const [activeImage, setActiveImage] = useState({}); // State to track active image for each site

  // Function to handle image changes (simple next/prev functionality)
  const navigateImage = (siteTitle, direction) => {
    setActiveImage(prev => {
      const currentSite = siteLocations.find(site => site.title === siteTitle);
      if (!currentSite) return prev;

      const currentImageIndex = prev[siteTitle] || 0;
      let newIndex = currentImageIndex + direction;

      if (newIndex < 0) newIndex = currentSite.images.length - 1;
      if (newIndex >= currentSite.images.length) newIndex = 0;

      return { ...prev, [siteTitle]: newIndex };
    });
  };

  return (
    <section id="SiteVisits" className="py-20 bg-gray-100" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Explore Site Visits
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover key locations and learn about their significance and visiting details for the Annual Review Meeting.
          </p>
        </motion.div>

        {/* Grid adjusted to 2 columns for better content display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {siteLocations.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", rotateY: 2 }} // Enhanced hover for block
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Site Header */}
              <div className="p-6 pb-4 bg-blue-900 text-white rounded-t-xl flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-8 h-8 text-red-500" />
                <h3 className="text-3xl font-bold">{site.title}</h3>
              </div>

              <div className="p-6">
                {/* Site Info Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Animation for panel title
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="mb-6"
                >
                  <h4 className="flex items-center space-x-2 text-xl font-semibold text-blue-800 mb-3">
                    <SafeIcon icon={FiInfo} className="w-5 h-5 text-red-500" />
                    <span>About this Site</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{site.description}</p>
                </motion.div>

                {/* Image Slides */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Animation for panel title
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="mb-6"
                >
                  <h4 className="flex items-center space-x-2 text-xl font-semibold text-blue-800 mb-3">
                    <SafeIcon icon={FiImage} className="w-5 h-5 text-red-500" />
                    <span>Photo Gallery</span>
                  </h4>
                  <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={site.images[activeImage[site.title] || 0]} 
                      alt={`${site.title} image`} 
                      className="w-full h-full object-cover transition-opacity duration-300" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/cccccc/000000?text=Image+Error" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-2">
                      <button 
                        onClick={() => navigateImage(site.title, -1)}
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none"
                        aria-label="Previous image"
                      >
                        &#10094;
                      </button>
                      <button 
                        onClick={() => navigateImage(site.title, 1)}
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none"
                        aria-label="Next image"
                      >
                        &#10095;
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-right">
                    {activeImage[site.title] !== undefined ? activeImage[site.title] + 1 : 1} / {site.images.length}
                  </p>
                </motion.div>

                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Animation for panel title
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="mb-6"
                >
                  <h4 className="flex items-center space-x-2 text-xl font-semibold text-blue-800 mb-3">
                    <SafeIcon icon={FiMapPin} className="w-5 h-5 text-red-500" />
                    <span>Location Map</span>
                  </h4>
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={site.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${site.title}`}
                    ></iframe>
                  </div>
                </motion.div>

                {/* Visit Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Animation for panel title
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <h4 className="flex items-center space-x-2 text-xl font-semibold text-blue-800 mb-3">
                    <SafeIcon icon={FiClock} className="w-5 h-5 text-red-500" />
                    <span>Visit Information (ARM Focus)</span>
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {site.visitInfo.map((info, infoIndex) => (
                      <motion.li 
                        key={infoIndex} 
                        className="flex items-start space-x-2"
                        whileHover={{ scale: 1.03, color: '#DC2626', x: 5 }} // More noticeable hover for list items
                        transition={{ duration: 0.2 }}
                      >
                        <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span>{info}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteVisits;
