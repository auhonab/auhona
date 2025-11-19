'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, User, Brain, AlertTriangle } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  iconIndex?: number;
}

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
        <div key={index} className="space-y-3">
          <div className="bg-dutch-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-dutch-white text-center font-bold">
            {item.question}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="ml-4 p-3 bg-dutch-white/5 rounded-lg"
          >
            <TypewriterText text={item.answer} isVisible={true} />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

interface DesktopWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition: { x: number; y: number };
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}

const DesktopWindow = ({ title, children, onClose, initialPosition, dragConstraintsRef }: DesktopWindowProps) => {
  return (
    <motion.div
      className="absolute z-50 bg-wine-red/80 backdrop-blur-sm rounded-xl border border-dutch-white/20 shadow-2xl overflow-hidden"
      style={{
        width: '320px',
        maxWidth: '400px',
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        x: initialPosition.x,
        y: initialPosition.y
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: initialPosition.x,
        y: initialPosition.y
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.9 
      }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraintsRef}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between p-3 bg-gray-700/50 cursor-move select-none"
      >
        <div className="flex items-center space-x-3">
          {/* Window Controls */}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" style={{ marginLeft: '7px' }}
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" style={{ marginLeft: '2px' }}/>
            <div className="w-3 h-3 rounded-full bg-green-500" style={{ marginLeft: '2px' }}/>
          </div>
          
          {/* Title */}
          <span className="text-dutch-white font-medium text-sm"style={{ marginLeft: '5px' }}>
            {title}
          </span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dutch-white/30 hover:scrollbar-thumb-dutch-white/50">
        <div className="text-dutch-white">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const AboutMe = () => {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({});
  const desktopRef = React.useRef<HTMLDivElement | null>(null);

  const openWindow = (windowId: string) => {
    setOpenWindows(prev => ({ ...prev, [windowId]: true }));
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => ({ ...prev, [windowId]: false }));
  };

  const getWindowPosition = (iconIndex: number) => {
    const baseTop = 140;
    const leftOffset = iconIndex * 180;
    return {
      x: 50 + leftOffset,
      y: baseTop
    };
  };

  const questionData = {
    bio: [
      {
        question: "So… who is Auhona?",
        answer: "A third-year Computer Engineering student who somehow balances AI projects, leadership roles, and a mild caffeine addiction.",
      },
      {
        question: "What's her thing?",
        answer: "Passionate about AI/ML and crafting apps that seem smooth, but only after battling epic debugging wars.",
      },
    ],
    brain: [
      {
        question: "Anything cool she's done on campus?",
        answer: "President of the AI & Data Society, WiSE rep, Vanier leadership roles… basically everywhere at once.",
      },
      {
        question: "What fuels all this chaos?",
        answer: "Coffee, lo-fi playlists, and the occasional \"I'll fix this bug in 5 minutes\" lie.",
      },
    ],
    alerts: [
      {
        question: "What does she do for fun?",
        answer: "Hackathons, journaling, exploring cozy cafés, reading, taking aesthetic photos, and vlogging.",
      },
      {
        question: "What's her vibe?",
        answer: "Soft-girl energy, sweet, smart (tries to be), and slightly chaotic in the best way.",
      },
    ],
  };

  const desktopIcons = [
    {
      id: 'bio',
      title: 'Bio.txt',
      icon: User,
      content: <BubbleQuestions questions={questionData.bio} />
    },
    {
      id: 'brain',
      title: 'Brain.exe',
      icon: Brain,
      content: <BubbleQuestions questions={questionData.brain} />
    },
    {
      id: 'alerts',
      title: 'System Alerts',
      icon: AlertTriangle,
      content: <BubbleQuestions questions={questionData.alerts} />
    }
  ];

  return (
    <section id="about" className="h-screen bg-wine-red relative flex flex-col justify-center items-center px-6">
      <div className="container mx-auto max-w-6xl flex flex-col justify-center items-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dutch-white mb-12">
            About <span className="text-dutch-white">Me</span>
          </h2>
        </motion.div>

        {/* Desktop Interface */}
        <div className="relative flex-1 flex justify-center items-center w-full">
          {/* Monitor Container */}
          <motion.div
            ref={desktopRef}
            className="w-full max-w-4xl bg-wine-red rounded-2xl shadow-2xl relative overflow-hidden"
            style={{ 
              aspectRatio: '16/10',
              backgroundColor: '#722f37'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Mock Title Bar (Menubar) */}
            <div className="flex items-center justify-start h-10 px-4 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex ml-4">
                <div className="w-3 h-3 rounded-full bg-red-500" style={{ marginLeft: '20px' }} ></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500" style={{ marginLeft: '10px' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-500" style={{ marginLeft: '10px' }}></div>
              </div>
            </div>
            
            {/* Desktop Content */}
            <div className="absolute inset-0 top-10 p-8 flex items-center justify-center">
            {/* Desktop Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
                {[...Array(400)].map((_, i) => (
                  <div key={i} className="border border-gray-600"></div>
                ))}
              </div>
            </div>

              {/* Desktop Icons */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl justify-items-center items-center h-full">
              {desktopIcons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  className="flex flex-col items-center cursor-pointer group"
                  initial={{ scale: 0, rotateY: 180 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.2,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openWindow(icon.id)}
                >
                  <div className="bg-gradient-to-br from-wine-red to-wine-red-dark p-6 rounded-2xl shadow-lg group-hover:shadow-wine-red/25 transition-all duration-300 mb-3">
                    <icon.icon size={48} className="text-dutch-white" />
                  </div>
                  <span className="text-dutch-white font-medium text-lg group-hover:text-wine-red transition-colors">
                    {icon.title}
                  </span>
                </motion.div>
              ))}
              </div>
            </div>


          </motion.div>
        </div>

        {/* Windows */}
        <AnimatePresence>
          {desktopIcons.map((icon, index) => 
            openWindows[icon.id] && (
              <DesktopWindow
                key={icon.id}
                title={icon.title}
                onClose={() => closeWindow(icon.id)}
                initialPosition={getWindowPosition(index)}
                dragConstraintsRef={desktopRef}
              >
                {icon.content}
              </DesktopWindow>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutMe;