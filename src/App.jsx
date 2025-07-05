import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import Venue from './components/Venue';
import Sponsors from './components/Sponsors';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Speakers />
          <Schedule />
          <Venue />
          <Sponsors />
          <Pricing />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;