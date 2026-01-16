'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, User, Brain, Sparkles, Battery, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow } from 'lucide-react';

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

const MenuBarStatus = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      setCurrentTime(`${dateString} ${timeString}`);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Get battery status
    const getBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: any = await (navigator as any).getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);

          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });

          battery.addEventListener('chargingchange', () => {
            setIsCharging(battery.charging);
          });
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    getBatteryStatus();

    return () => clearInterval(timeInterval);
  }, []);

  const getBatteryIcon = () => {
    if (isCharging) return BatteryCharging;
    if (batteryLevel === null) return Battery;
    if (batteryLevel > 80) return BatteryFull;
    if (batteryLevel > 30) return BatteryMedium;
    return BatteryLow;
  };

  const BatteryIcon = getBatteryIcon();

  return (
    <div className="flex items-center gap-3 text-dutch-white text-xs font-medium">
      {batteryLevel !== null && (
        <div className="flex items-center gap-1">
          <BatteryIcon size={16} />
          <span>{batteryLevel}%</span>
        </div>
      )}
      <span>{currentTime}</span>
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
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Hide hint after 8 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const openWindow = (windowId: string) => {
    // Close all windows first, then open the clicked one
    setOpenWindows({
      bio: false,
      brain: false,
      alerts: false,
      [windowId]: true
    });
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => ({ ...prev, [windowId]: false }));
  };

  const getWindowPosition = (iconIndex: number) => {
    const windowWidth = 320;
    const windowHeight = 350;
    
    // Desktop dimensions with proper fallback
    const desktopWidth = desktopRef.current?.offsetWidth || 700;
    const desktopHeight = desktopRef.current?.offsetHeight || 450;
    
    // Position window on the right side with padding
    const padding = 20;
    const titleBarHeight = 40; // Account for the desktop title bar
    
    // Ensure X keeps window within right side bounds
    const x = Math.max(padding, desktopWidth - windowWidth - padding);
    
    // Calculate Y position based on icon index (vertically stacked)
    const availableHeight = desktopHeight - titleBarHeight - (2 * padding);
    const iconSpacing = availableHeight / 3;
    const startY = titleBarHeight + padding;
    let y = startY + (iconIndex * iconSpacing);
    
    // Ensure Y doesn't push window out of bottom
    const maxY = desktopHeight - windowHeight - padding;
    y = Math.max(startY, Math.min(y, maxY));
    
    return {
      x: x,
      y: y
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
      title: 'Creative.Extensions',
      icon: Sparkles,
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
              backgroundColor: '#8b3a42'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Mock Title Bar (Menubar) */}
            <div className="flex items-center justify-between h-10 px-4 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm relative">
              <div style={{ display: 'flex', marginLeft: '16px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', marginLeft: '20px' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308', marginLeft: '10px' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', marginLeft: '10px' }}></div>
              </div>
              
              {/* Centered Hint Note */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 transform -translate-x-1/2"
                  >
                    <p className="text-dutch-white text-xs font-medium whitespace-nowrap">
                      Click on each icon to know more
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div style={{ marginRight: '36px' }}>
                <MenuBarStatus />
              </div>
            </div>
            
            {/* Desktop Content */}
            <div className="absolute inset-0 top-10 p-8 flex items-center">
            {/* Desktop Pattern - Grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
                {[...Array(300)].map((_, i) => (
                  <div key={i} className="border border-dutch-white/10"></div>
                ))}
              </div>
            </div>

              {/* Desktop Icons - Vertical on Left */}
              <div className="relative z-10 flex flex-col justify-center gap-12" style={{ paddingLeft: '140px' }}>
              {desktopIcons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  className="flex flex-col items-center cursor-pointer group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openWindow(icon.id)}
                >
                  <div className="p-6 mb-3">
                    <icon.icon size={48} className="text-dutch-white" />
                  </div>
                  <span className="text-dutch-white font-medium text-lg group-hover:text-wine-red transition-colors">
                    {icon.title}
                  </span>
                </motion.div>
              ))}
              </div>
            </div>

            {/* Windows - Inside Desktop */}
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

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;