import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const { FiMail, FiPhone, FiGlobe } = FiIcons;

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: FiGlobe, href: 'https://nhdd.moh.gov.et', label: 'Website' },
    { icon: FaFacebook, href: 'https://www.facebook.com/FMoHealth', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/FMoHealthEthiopia', label: 'Twitter' },
    { icon: FaYoutube, href: 'https://www.youtube.com/channel/UC-your-channel-id', label: 'YouTube' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/ministry-of-health-ethiopia/', label: 'LinkedIn' }, // Added a hypothetical LinkedIn link
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
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">NHDD</span>
              </div>
              <div>
                <h1 className="font-bold text-xl">National Health Data Dictionary App</h1>
                <p className="text-blue-200 text-sm"> </p>
              </div>
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Serving as a national effort to standardize health data, improve data interoperability, and strengthen Ethiopia's digital health ecosystem for better public health outcomes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-red-400" />
                <span className="text-blue-200">nhdd@moh.gov.et</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-red-400" />
                <span className="text-blue-200">+251 (914) 555-2025</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-blue-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <p className="text-blue-200 text-sm mb-3">
                Stay updated on app news and updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-blue-800 border border-blue-700 rounded-l-lg text-white placeholder-blue-300 focus:outline-none focus:border-red-500"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-[#102542]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <SafeIcon icon={FiMail} className="w-4 h-4 relative z-10" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-blue-200">
            © 2024 National Health Data Dictionary App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;