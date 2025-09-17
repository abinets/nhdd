import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiClock } = FiIcons;

// Break the text into arrays of characters for two-line display on mobile
const textLine1 = "Annual Review";
const textLine2 = "Meeting";
const characters1 = Array.from(textLine1);
const characters2 = Array.from(textLine2);

const text_am_line1 = "የጤናው ዘርፍ";
const text_am_line2 = "ዓመታዊ ጉባዔ";
const characters_am1 = Array.from(text_am_line1);
const characters_am2 = Array.from(text_am_line2);

// Single line characters for larger screens
const charactersFull = Array.from("Annual Review Meeting");
const characters_amFull = Array.from("የጤናው ዘርፍ ዓመታዊ ጉባዔ");

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

// Semi-circle Gauge component to display time with a single pin and gradient
const SemiCircleGauge = ({ timeLeft }) => {
  const radius = 150;
  // Increased stroke width for a wider gauge line
  const strokeWidth = 30;
  const viewBoxSize = radius * 2 + strokeWidth;
  const center = viewBoxSize / 2;

  // Maximum value for the gauge (assuming a max of 365 days for the full semi-circle)
  const maxDays = 365;
  // Use a fixed value for demonstration as requested
  const daysRemaining = 35;

  // Define colors for the gradient
  const gradientColors = [
    { color: '#FF4136', offset: 0 }, // Red
    { color: '#FF851B', offset: 0.3 }, // Orange
    { color: '#FFDC00', offset: 0.5 }, // Yellow
    { color: '#2ECC40', offset: 0.7 }, // Green
    { color: '#0074D9', offset: 1 }, // Blue
  ];

  // Correctly calculate the rotation angle based on days remaining.
  // The gauge goes from left (365 days) to right (0 days).
  const angle = 180 * (daysRemaining / maxDays);

  return (
    <div className="flex flex-col items-center relative">
      <svg
        width={viewBoxSize}
        height={viewBoxSize / 2 + 30}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize / 2 + 30}`}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientColors.map((stop, index) => (
              <stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>

        {/* Semi-circle track with gradient segments */}
        <path
          d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
          fill="transparent"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Correctly designed pointer and pivot circle group, rotated based on daysRemaining */}
        <g transform={`rotate(${-angle}, ${center}, ${center})`}>
          {/* Pointer shape - a solid triangle path */}
          <path
            d={`M ${center} ${center - 10} L ${center + radius - 10} ${center} L ${center} ${center + 10} Z`}
            fill="#fff"
            className="shadow-lg"
          />
        </g>

        {/* Center pivot point circle */}
        <motion.circle
          cx={center}
          cy={center}
          r="10"
          fill="#fff"
          className="shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.5 }}
        />

      </svg>
      {/* Time remaining text display, now centered and with uppercase "REMAINED" */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-2 rounded-lg"
      >
        <div className="text-4xl font-bold text-white text-center">
          {daysRemaining}
        </div>
        <div className="text-sm text-blue-100 uppercase -mt-1">days</div>
        <div className="text-4xl font-bold text-white text-center mt-1">
          {timeLeft.hours}
        </div>
        <div className="text-sm text-blue-100 uppercase -mt-1">hrs</div>
        <div className="text-md text-blue-100 uppercase mt-2">REMAINED</div>
      </div>
      {/* Text labels for start and end, now with adjusted position */}
      <div className="flex justify-between w-full max-w-sm" style={{ marginTop: '-20px' }}>
          <span className="text-white text-xl font-bold">365</span>
          <span className="text-white text-xl font-bold">0</span>
      </div>
    </div>
  );
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
          // Added a responsive bottom padding to create a gap on mobile devices
          className="max-w-4xl mx-auto pb-8 md:pb-0"
        >
          <div className="mb-6">
            {/* Mobile View: two-line title */}
            <div className="md:hidden">
                <motion.h1
                  className="text-5xl font-bold leading-tight mb-0 whitespace-nowrap"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {characters1.map((char, index) => (
                    <motion.span
                      key={`line1-${index}`}
                      variants={characterVariants}
                      style={{ display: 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.h1
                  className="text-5xl font-bold leading-tight mb-2 whitespace-nowrap"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {characters2.map((char, index) => (
                    <motion.span
                      key={`line2-${index}`}
                      variants={characterVariants}
                      style={{ display: 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.h1
                  className="text-3xl font-bold leading-tight mb-0 whitespace-nowrap"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariantsAmharic}
                >
                  {characters_am1.map((char, index) => (
                    <motion.span
                      key={`amharic-line1-${index}`}
                      variants={characterVariantsAmharic}
                      style={{ display: 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.h1
                  className="text-3xl font-bold leading-tight mb-4 whitespace-nowrap"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariantsAmharic}
                >
                  {characters_am2.map((char, index) => (
                    <motion.span
                      key={`amharic-line2-${index}`}
                      variants={characterVariantsAmharic}
                      style={{ display: 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
            </div>

            {/* Desktop View: single-line title */}
            <div className="hidden md:block">
              <motion.h1
                className="text-7xl font-bold leading-tight mb-2 whitespace-normal"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {charactersFull.map((char, index) => (
                  <motion.span
                    key={`full-line1-${index}`}
                    variants={characterVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h1
                className="text-5xl font-bold leading-tight mb-4 whitespace-normal"
                initial="hidden"
                animate="visible"
                variants={containerVariantsAmharic}
              >
                {characters_amFull.map((char, index) => (
                  <motion.span
                    key={`full-amharic-line2-${index}`}
                    variants={characterVariantsAmharic}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

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
            Driving Health Gains Through Sustainable Investments and Innovations
          </motion.p>
 <motion.p
            // Made the text bold
            className="text-xl md:text-2xl mb-8 text-blue-100 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
                     ዘላቂ ኢንቨስትመንት እና ፈጠራ፤  ለጠንካራ የጤና ስርአት!

          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-blue-500" />
              <span className="text-lg">October 22–24, 2025</span>
               <span className="text-lg">ጥቅምት 12–14, 2018</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiMapPin} className="w-6 h-6 text-blue-500" />
              <span className="text-lg">Jimma, Oromia Region</span>
            </div>
          </motion.div>

          {/* New gauge timer section */}
          <motion.div
            className="flex justify-center items-center flex-col gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <SemiCircleGauge timeLeft={timeLeft} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <a href="http://196.188.63.190:3000/users/sign_in">
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
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;