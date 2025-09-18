import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import About from './components/About'; 
import Contact from './components/Contact';
import Footer from './components/Footer';
 import DiseaseList from './components/DiseaseList';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <DiseaseList />
          <About />
     
 
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;