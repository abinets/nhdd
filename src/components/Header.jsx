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
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Venue', href: '#venue' },
    { name: 'Resources', href: '#Resources' },
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
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ARM</span>
            </div>
            <div>
              <h1 className={`font-bold text-xl ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                27th Annual Review Meeting
              </h1>
              <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                2025
              </p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors hover:text-red-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <FlipText>{item.name}</FlipText>
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300 group"
            >
              <motion.div
                className="absolute inset-0 bg-[#102542]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Register Now</span>
            </motion.button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            <SafeIcon icon={isMobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.2, height: 'auto' }}
            exit={{ opacity: 0.2, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg p-4 mx-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button className="w-full bg-red-600 text-white py-2 rounded-full mt-4 hover:bg-red-700 transition-colors relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-[#102542]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Register Now</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;