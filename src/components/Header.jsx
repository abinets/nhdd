import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';

const { FiMenu, FiX } = FiIcons;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('beforeinstallprompt event fired');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setIsMobileMenuOpen(false);
      });
    }
  };

  const navItems = [
    { name: 'Disease List', href: '#diseaseList' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Install App', isInstallLink: true }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 56;
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
      className={`fixed w-full z-50 transition-all duration-300 bg-[#015aa4] shadow-lg`}
      style={{ height: '56px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden z-20 transition-colors text-white`}
          >
            <SafeIcon icon={isMobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
          
          {/* This is the corrected desktop and mobile header text section */}
          <div className="flex flex-col ml-1">
            <h1 className={`font-bold text-sm leading-tight transition-colors text-white hidden md:block`}>
              National Health Data Dictionary
            </h1>
            <h1 className={`font-bold text-sm leading-tight transition-colors text-white md:hidden`}>
              NHDD
            </h1>
            <p className={`text-xs leading-tight transition-colors text-white/80 md:hidden`}>
              MoH
            </p>
          </div>
        </div>

        <nav className="flex-1 hidden md:flex items-center justify-end space-x-8">
          {navItems.map((item) => {
            if (item.isInstallLink) {
              return deferredPrompt ? (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstallClick}
                  className="flex items-center bg-white text-[#015aa4] px-6 py-2 rounded-full font-bold transition-all duration-300 group"
                >
                  <FaDownload className="mr-2" />
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ) : null;
            }
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-bold transition-colors text-white hover:text-white"
              >
                <FlipText>{item.name}</FlipText>
              </button>
            );
          })}
          <a href="http://196.188.63.190:3000/users/sign_in">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-white text-[#015aa4] px-6 py-2 rounded-full transition-all duration-300 group"
            >
              <motion.div
                className="absolute inset-0 bg-[#f0f0f0]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Register</span>
            </motion.button>
          </a>
        </nav>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-14 left-0 right-0 w-[80%] mx-auto bg-[#015aa4] rounded-lg shadow-lg py-3 px-2"
            style={{ maxHeight: 'calc(100vh - 70px)' }}
          >
            {navItems.map((item) => {
              if (item.isInstallLink) {
                return deferredPrompt ? (
                  <button
                    key={item.name}
                    onClick={handleInstallClick}
                    className="w-full bg-white text-[#015aa4] py-2 rounded-full mt-4 font-bold transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">{item.name}</span>
                  </button>
                ) : null;
              }
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-center py-2 text-white font-medium hover:bg-white/10 transition-colors rounded-md"
                >
                  {item.name}
                </button>
              );
            })}
            <a href="http://196.188.63.190:3000/users/sign_in">
              <button className="w-full bg-white text-[#015aa4] py-2 rounded-full mt-4 font-bold transition-colors relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-[#f0f0f0]"
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