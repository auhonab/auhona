'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cloud } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const phrases = [
    'welcome to my portfolio!',
    'I create stuff sometimes',
    'Software Engineer, Problem Solver',
    'Creative developer & Life-long learner'
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentText.length < phrases[currentIndex].length) {
        timeout = setTimeout(() => {
          setCurrentText(phrases[currentIndex].slice(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(phrases[currentIndex].slice(0, currentText.length - 1));
        }, 50);
      } else {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isTyping, phrases]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CloudElement = ({ delay = 0, duration = 20, size = 40, opacity = 0.1 }) => {
    const getRandomY = () => typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800;
    const getWindowWidth = () => typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    return (
      <motion.div
        className="absolute text-dutch-white/10"
        initial={{ x: -100, y: getRandomY() }}
        animate={{
          x: getWindowWidth() + 100,
          y: getRandomY()
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear'
        }}
        style={{
          fontSize: size,
          opacity,
          top: Math.random() * 80 + '%',
        }}
      >
        <Cloud className="cloud" />
      </motion.div>
    );
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <CloudElement
            key={i}
            delay={i * 2.5}
            duration={15 + Math.random() * 10}
            size={30 + Math.random() * 30}
            opacity={0.05 + Math.random() * 0.1}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-wine-red"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-dutch-white leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Hi, I&apos;m{' '}
            <span className="text-dutch-white">Auhona</span>
          </motion.h1>

          {/* Animated Subheading */}
          <div className="h-20 md:h-24 flex items-center justify-center">
            <motion.p
              className="text-xl md:text-3xl text-dutch-white font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-dutch-white typing-effect inline-block min-w-[300px] text-left">
                {currentText}
              </span>
            </motion.p>
          </div>


        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="text-wine-red hover:text-wine-red-light transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={32} />
        </motion.button>
        
        {/* Bouncing Ball */}
        <motion.div
          className="w-3 h-3 bg-dutch-white rounded-full mx-auto mt-4"
          animate={{ 
            y: [0, 10, 0],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const getRandomX = () => typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200;
          const getInitialY = () => typeof window !== 'undefined' ? window.innerHeight : 800;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-wine-red/20 rounded-full"
              initial={{
                x: getRandomX(),
                y: getInitialY()
              }}
              animate={{
                y: -100,
                x: getRandomX()
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Hero;