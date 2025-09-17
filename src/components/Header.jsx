import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX } = FiIcons;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    // { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Itinerary', href: '#visits' },
    { name: 'Resources', href: '#Resources' },
    { name: 'Awardees', href: '#awardees' },
    { name: 'Online', href: '#online-event' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const FlipText = ({ children, className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -30 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ y: 30 }}
          animate={{ y: isHovered ? 0 : 30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Mobile menu button is now on the left */}
          <div className="flex items-center space-x-2"> {/* New flex container for the menu and text */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              <SafeIcon icon={isMobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>

            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="https://hispmd.moh.gov.et/app/MOH_logo_text_white.png"
                  alt="Ministry of Health Ethiopia Logo"
                  className="rounded-full w-10 h-10"
                />
              </div>
              {/* Conditional rendering for mobile and desktop views */}
              <div className="hidden md:block">
                <h1 className={`font-bold text-xl ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                 Ministry of Health, Ethiopia
                </h1>
                <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                  2025
                </p>
              </div>
              {/* Mobile-specific layout: breaks the title into two lines and reduces font size */}
              <div className="block md:hidden">
                <div className="flex flex-col ml-1">
                  <h1 className={`font-bold text-sm leading-tight ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                    Ministry of Health,
                  </h1>
                  <p className={`text-xs leading-tight ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                    Ethiopia | 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <FlipText>{item.name}</FlipText>
              </button>
            ))}
            <a href="http://196.188.63.190:3000/users/sign_in">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 group"
              >
                <motion.div
                  className="absolute inset-0 bg-[#102542]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Register</span>
              </motion.button>
            </a>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 1, height: 0 }}
            className="absolute top-full left-0 right-0 w-[70%] bg-white rounded-lg shadow-lg p-4 mx-auto"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <a href="http://196.188.63.190:3000/users/sign_in">
              <button className="w-full bg-blue-600 text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition-colors relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-[#102542]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Register</span>
              </button>
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;