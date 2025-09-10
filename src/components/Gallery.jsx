import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Self-contained Icon component using SVG for a single-file solution
const Icon = ({ d, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={d} />
  </svg>
);

const Gallery = () => {
  const [currentMedia, setCurrentMedia] = useState(0);

  const mediaItems = [
    {
      type: 'video',
      src: 'https://www.youtube.com/embed/5yKMelDOl1A',
      alt: 'ARM YouTube Highlights',
      thumbnail: 'https://placehold.co/800x600/102542/ffffff?text=ARM+Highlights'
    },
    {
      type: 'video',
      src: 'https://www.youtube.com/embed/-6yBbtYlcQ8',
      alt: 'ARM YouTube Highlights',
      thumbnail: 'https://placehold.co/800x600/102542/ffffff?text=ARM+Highlights'
    },
    {
      type: 'video',
      src: 'https://www.youtube.com/embed/RSSuRj6a6zw',
      alt: 'ARM YouTube Highlights',
      thumbnail: 'https://placehold.co/800x600/102542/ffffff?text=ARM+Highlights'
    },
    {
      type: 'video',
      src: 'https://www.facebook.com/video/embed?video_id=447721674600215',
      alt: 'ARM presentation highlights',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Networking event'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Panel discussion'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Medical equipment display'
    }
  ];

  const nextMedia = () => {
    setCurrentMedia((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentMedia((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            ARM Gallery
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Highlights from our previous ARM events
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <motion.div
              key={currentMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl shadow-2xl h-96"
            >
              {mediaItems[currentMedia].type === 'video' ? (
                <iframe
                  src={mediaItems[currentMedia].src}
                  title={mediaItems[currentMedia].alt}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              ) : (
                <img
                  src={mediaItems[currentMedia].src}
                  alt={mediaItems[currentMedia].alt}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
            >
              <Icon d="M15 18l-6-6 6-6" className="w-6 h-6" />
            </button>

            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
            >
              <Icon d="M9 18l6-6-6-6" className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-8">
            {mediaItems.map((media, index) => (
              <button
                key={index}
                onClick={() => setCurrentMedia(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  currentMedia === index ? 'ring-2 ring-red-500' : 'hover:opacity-80'
                }`}
              >
                <img
                  src={media.type === 'video' ? media.thumbnail : media.src}
                  alt={media.alt}
                  className="w-full h-20 object-cover"
                />
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                    <Icon d="M5 3l14 9-14 9V3z" className="w-8 h-8" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-2 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-[#102542]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <Icon d="M5 3l14 9-14 9V3z" className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Watch ARM 2024 Highlights</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
