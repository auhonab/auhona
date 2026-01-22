'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Brain, Sparkles } from 'lucide-react';

const TypewriterText = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return <span>{displayText}</span>;
};

const BubbleQuestions = ({ questions }: { questions: Array<{ question: string; answer: string }> }) => {
  return (
    <div className="space-y-6">
      {questions.map((item, index) => (
        <div key={index} className="space-y-4">
          {/* Question - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 1.5, duration: 0.8 }}
            className="flex justify-start"
            style={{ marginLeft: '20px', marginBottom: '20px' }}
          >
            <div 
              className="rounded-2xl rounded-tl-sm max-w-[80%] text-sm sm:text-base"
              style={{
                backgroundColor: 'rgba(97, 39, 39, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239, 208, 202, 0.15)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px'
              }}
            >
              <p className="text-dutch-white font-medium">{item.question}</p>
            </div>
          </motion.div>
          
          {/* Answer - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 1.5 + 0.8, duration: 0.8 }}
            className="flex justify-end"
            style={{ marginRight: '20px', marginBottom: '20px' }}
          >
            <div 
              className="rounded-2xl rounded-tr-sm max-w-[80%] text-sm sm:text-base"
              style={{
                backgroundColor: 'rgba(239, 208, 202, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239, 208, 202, 0.2)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px'
              }}
            >
              <p className="text-dutch-white/90">{item.answer}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

interface PopupCardProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const PopupCard = ({ title, children, onClose }: PopupCardProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[12px]" />
      
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-[340px] sm:max-w-md"
        style={{
          backgroundColor: 'rgba(97, 39, 39, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 208, 202, 0.1)'
        }}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-dutch-white text-base sm:text-lg font-bold w-full text-center">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-dutch-white/70 hover:text-dutch-white transition-colors bg-transparent border-none cursor-pointer p-2 hover:bg-white/10 rounded-full absolute right-3 sm:right-4"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 max-h-[75vh] sm:max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutMe = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const icons = [
    {
      id: 'bio',
      title: 'Bio.txt',
      icon: User,
      content: <BubbleQuestions questions={[
        { question: "So… who is Auhona?", answer: "A third-year Computer Engineering student who somehow balances AI projects, leadership roles, and a mild caffeine addiction." },
        { question: "What's her thing?", answer: "Passionate about AI/ML and crafting apps that seem smooth, but only after battling epic debugging wars." }
      ]} />,
      position: { x: '15%', y: '30%' }
    },
    {
      id: 'brain',
      title: 'Brain.exe',
      icon: Brain,
      content: <BubbleQuestions questions={[
        { question: "Anything cool she's done on campus?", answer: "President of the AI & Data Society, WiSE rep, Vanier leadership roles… basically everywhere at once." },
        { question: "What fuels all this chaos?", answer: "Coffee, lo-fi playlists, and the occasional \"I'll fix this bug in 5 minutes\" lie." }
      ]} />,
      position: { x: '50%', y: '60%' }
    },
    {
      id: 'alerts',
      title: 'fun.Ext',
      icon: Sparkles,
      content: <BubbleQuestions questions={[
        { question: "What does she do for fun?", answer: "Hackathons, journaling, exploring cozy cafés, reading, taking aesthetic photos, and vlogging." },
        { question: "What's her vibe?", answer: "Soft-girl energy, sweet, smart (tries to be), and slightly chaotic in the best way." }
      ]} />,
      position: { x: '85%', y: '42%' }
    }
  ];

  return (
    <section id="about" className="min-h-screen bg-wine-red relative flex flex-col justify-center items-center px-4 py-12 sm:py-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-dutch-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-dutch-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dutch-white tracking-tight">
            About <span className="opacity-80">Me</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-dutch-white/30 mx-auto rounded-full" />
        </motion.div>

        <div ref={containerRef} className="relative w-full h-[420px] sm:h-[500px] md:h-[600px]">
          {/* Refined Path with Glow */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Glow Shadow Path */}
            <motion.path
              d="M 150 180 Q 350 100, 500 360 T 850 252"
              fill="none"
              stroke="#EFD0CA"
              strokeWidth="6"
              strokeOpacity="0.1"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
              style={{ filter: 'blur(8px)' }}
            />

            {/* Main Sharp Path */}
            <motion.path
              d="M 150 180 Q 350 100, 500 360 T 850 252"
              fill="none"
              stroke="#EFD0CA"
              strokeWidth="2.5"
              strokeOpacity="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </svg>

          {icons.map((icon) => (
            <motion.div
              key={icon.id}
              className="absolute cursor-pointer z-20"
              style={{ left: icon.position.x, top: icon.position.y, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }} // Triggers after path finishes
              viewport={{ once: true }}
              onClick={() => setOpenCard(icon.id)}
            >
              <div className="flex flex-col items-center group">
                {/* Large Circular Frosted Background */}
                <div 
                  className="relative rounded-full transition-all duration-300 w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] p-4 sm:p-6"
                  style={{
                    backgroundColor: 'rgba(97, 39, 39, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(239, 208, 202, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <icon.icon size={32} className="text-dutch-white sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-dutch-white font-medium text-[11px] sm:text-xs md:text-sm text-center leading-tight">
                    {icon.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openCard && (
          <PopupCard title={icons.find(i => i.id === openCard)?.title || ''} onClose={() => setOpenCard(null)}>
            {icons.find(i => i.id === openCard)?.content}
          </PopupCard>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutMe;