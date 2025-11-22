"use client";

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [dots, setDots] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    // Generate dots only on client side to avoid hydration mismatch
    const generatedDots = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setDots(generatedDots);
  }, []);
  return (
    <main className="relative">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* About Me Section */}
        <AboutMe />

        {/* Projects Section */}
        <Projects />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Experience Section */}
        <Experience />
        
               
        {/* Contact Section */}
        <Contact />
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-wine-red opacity-90"></div>
        
        {/* Subtle animated dots */}
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-wine-red/10 rounded-full animate-pulse"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                animationDuration: dot.duration
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
