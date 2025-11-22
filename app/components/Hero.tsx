'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cloud } from 'lucide-react';

const FloatingElements = () => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  const elements = [
    { x: 10, duration: 15, delay: 0 }, { x: 25, duration: 18, delay: 1 },
    { x: 40, duration: 12, delay: 2 }, { x: 55, duration: 20, delay: 0.5 },
    { x: 70, duration: 16, delay: 3 }, { x: 85, duration: 14, delay: 1.5 },
    { x: 15, duration: 19, delay: 4 }, { x: 30, duration: 13, delay: 2.5 },
    { x: 45, duration: 17, delay: 0.8 }, { x: 60, duration: 21, delay: 3.5 },
    { x: 75, duration: 11, delay: 1.2 }, { x: 90, duration: 18, delay: 4.5 },
    { x: 5, duration: 16, delay: 2.8 }, { x: 35, duration: 14, delay: 0.3 },
    { x: 50, duration: 20, delay: 3.8 }, { x: 65, duration: 12, delay: 1.8 },
    { x: 80, duration: 17, delay: 4.2 }, { x: 95, duration: 15, delay: 0.7 },
    { x: 20, duration: 19, delay: 2.3 }, { x: 75, duration: 13, delay: 3.2 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-wine-red/20 rounded-full"
          initial={{
            x: (element.x / 100) * windowDimensions.width,
            y: windowDimensions.height
          }}
          animate={{
            y: -100,
            x: (element.x / 100) * windowDimensions.width
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

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

  const CloudElement = ({ delay = 0, duration = 20, size = 40, opacity = 0.1, yPosition = 50 }) => {
    const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    }, []);
    
    return (
      <motion.div
        className="absolute text-dutch-white/10"
        initial={{ x: -100, y: (yPosition / 100) * windowDimensions.height }}
        animate={{
          x: windowDimensions.width + 100,
          y: (yPosition / 100) * windowDimensions.height
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
        {[
          { delay: 0, duration: 20, size: 45, opacity: 0.08, yPosition: 15 },
          { delay: 2.5, duration: 18, size: 38, opacity: 0.12, yPosition: 35 },
          { delay: 5, duration: 22, size: 52, opacity: 0.06, yPosition: 55 },
          { delay: 7.5, duration: 25, size: 33, opacity: 0.10, yPosition: 75 },
          { delay: 10, duration: 19, size: 41, opacity: 0.09, yPosition: 25 },
          { delay: 12.5, duration: 21, size: 47, opacity: 0.07, yPosition: 45 },
          { delay: 15, duration: 17, size: 36, opacity: 0.11, yPosition: 65 },
          { delay: 17.5, duration: 23, size: 49, opacity: 0.08, yPosition: 85 }
        ].map((cloud, i) => (
          <CloudElement
            key={i}
            delay={cloud.delay}
            duration={cloud.duration}
            size={cloud.size}
            opacity={cloud.opacity}
            yPosition={cloud.yPosition}
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
      <FloatingElements />
    </section>
  );
};

export default Hero;