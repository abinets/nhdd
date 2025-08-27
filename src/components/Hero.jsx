import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiClock } = FiIcons;

// Break the text into an array of characters
const text = "Annual Review Meeting";
const text_am = "የጤናው ዘርፍ ዓመታዊ ጉባዔ";
const characters = Array.from(text);
const characters_am = Array.from(text_am);

// Define variants for the English parent container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
    },
  },
};

// Define variants for the Amharic parent container to wave in the opposite direction
const containerVariantsAmharic = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: -0.05, // Negative stagger to wave from right to left
    },
  },
};

// Define variants for each individual English character
const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: [0, -10, 0], // Wave effect with movement on the y-axis
    color: ['#FFFFFF', '#40E0D0'], // Animate to a light cyan color
    scale: [1, 1.1, 1], // Increased the bounce effect
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.5,
    },
  },
};

// Define variants for each individual Amharic character (opposite y-axis movement)
const characterVariantsAmharic = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: [0, 10, 0], // Wave effect with opposite y-axis movement
    color: ['#FFFFFF', '#40E0D0'],
    scale: [1, 1.1, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.5,
    },
  },
};

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-10-16T09:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Background with blur overlay */}
      <div className="absolute inset-0">
        <iframe 
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/pgjORbFCwVo?autoplay=1&mute=1&loop=1&playlist=pgjORbFCwVo&controls=0&modestbranding=1"
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Updated: Reduced the opacity of the gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/50 to-blue-900/40 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight mb-2" // Reduced margin to bring closer
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={characterVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h1 
              className="text-3xl md:text-5xl font-bold leading-tight mb-4" // Smaller size for translation
              initial="hidden"
              animate="visible"
              variants={containerVariantsAmharic}
            >
              {characters_am.map((char, index) => (
                <motion.span
                  key={index}
                  variants={characterVariantsAmharic}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.span 
              // Changed size, color, and reduced duration
              className="block text-5xl md:text-7xl font-bold text-cyan-400"
              initial={{ opacity: 0, scale: 0.8, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1, // Reduced duration for a faster animation
                delay: 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            >
              ARM - 2025
            </motion.span>
          </div>
          
          <motion.p 
            // Made the text bold
            className="text-xl md:text-2xl mb-8 text-blue-100 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Advancing Health Care Service Through Digitilization
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-blue-500" />
              <span className="text-lg">October 16–18, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiMapPin} className="w-6 h-6 text-blue-500" />
              <span className="text-lg">Jimma, Oromia Region</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div 
                key={item.label} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-blue-500">{item.value}</div>
                <div className="text-sm text-blue-100">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 group"
            >
              <motion.div
                className="absolute inset-0 bg-[#102542]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Register Now</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
