import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DiseaseList from './components/DiseaseList';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {/* This padding is now managed by the DiseaseList component. */}
          {/* We've removed the container and padding classes here. */}
          <div className="pt-14 md:pt-16">
            <DiseaseList showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          </div>
          {/* <About /> */}
          {/* <Contact /> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;