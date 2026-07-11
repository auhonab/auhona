'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, ChevronDown, Linkedin, Mail, Instagram, Github, X, Folder, FileText, Info, Clock } from 'lucide-react';

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState('portfolio');
  const [portfolioExpanded, setPortfolioExpanded] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [showNotesApp, setShowNotesApp] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [torontoTime, setTorontoTime] = useState('');
  const [localTimeLive, setLocalTimeLive] = useState('');
  const [activeNote, setActiveNote] = useState('about');
  const [positionIndex, setPositionIndex] = useState(0);
  const [hobbyIndex, setHobbyIndex] = useState(0);

  const activities = [
    "reading",
    "chasing golden hour with a camera",
    "getting lost in music",
    "showing up to every workshop I can find"
  ];

  const positions = [
    "Machine Learning and Gen-AI Intern @ Ericsson",
    "Participant, Google Cloud Facilitator Program '25 @ Google Cloud Skills Boost",
    "AI/ML Intern — Credit Risk & Predictive Analytics @ Bajaj Finserv",
    "IBM Z Student Ambassador @ IBM",
    "SOAR Student Mentee @ Dell Technologies"
  ];

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }));
      
      setTorontoTime(now.toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLowerCase());
      setLocalTimeLive(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLowerCase());
    };
    
    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const portfolioSubItems = [
    { id: 'hero', label: 'Main', href: '#hero' },
    { id: 'about', label: 'About me', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills and expertise', href: '#skills' },
    { id: 'experience', label: 'Journey', href: '#experience' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const favorites = [
    { 
      id: 1,
      name: 'about',
      type: 'file',
      icon: FileText,
    },
    { 
      id: 2,
      name: 'why I build',
      type: 'folder',
      icon: Folder,
    },
    { 
      id: 3,
      name: 'hobbies',
      type: 'file',
      icon: FileText,
    },
    { 
      id: 4,
      name: 'Resume.pdf',
      type: 'file',
      icon: FileText,
      href: 'https://drive.google.com/file/d/1vtxvSCpYryVtiz_HkfOh1n_3yRz1pM6l/view?usp=sharing',
    },
    { 
      id: 5,
      name: 'Research',
      subtitle: 'In Progress',
      type: 'folder',
      icon: Folder,
      href: 'https://scholar.google.com/citations?user=gwE1qdgAAAAJ&hl=en',
    },
    { 
      id: 6,
      name: 'available',
      type: 'file',
      icon: FileText,
    },
  ];

  const socialLinks = [
    { 
      platform: 'Mail', 
      handle: 'auhonabasu03@gmail.com',
      icon: Mail,
      color: '#ea4335',
      href: 'mailto:auhonabasu03@gmail.com',
    },
    { 
      platform: 'GitHub', 
      handle: 'github.com/auhonab',
      icon: Github,
      color: '#ffffff',
      href: 'https://github.com/auhonab',
    },
    { 
      platform: 'LinkedIn', 
      handle: 'in/auhona-basu',
      icon: Linkedin,
      color: '#0077b5',
      href: 'https://www.linkedin.com/in/auhona-basu',
    },
    { 
      platform: 'Instagram', 
      handle: 'instagram/auhona_03',
      icon: Instagram,
      color: '#e4405f',
      href: 'https://www.instagram.com/auhona_03',
    },
  ];

  return (
    <section 
      id="about" 
      className="min-h-screen bg-black relative flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-6xl sm:text-7xl font-bold text-white"
        style={{ fontFamily: '"Dela Gothic One", sans-serif', marginBottom: '15px', marginTop: '-40px' }}
      >
        About Me
      </motion.h2>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl mx-auto flex gap-3"
        style={{ marginTop: '32px', alignItems: 'flex-start', position: 'relative' }}
      >
        {/* Left Sidebar Container */}
        <motion.div
          className="p-6 rounded-3xl"
          style={{
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            minHeight: '600px',
            width: '260px',
          }}
        >
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8" style={{ marginLeft: '20px', marginTop: '24px' }}>
            <div 
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Image 
                src="/images/auhona.png" 
                alt="Auhona Basu" 
                width={48} 
                height={48} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                COMPUTER ENGINEER
              </p>
              
              <h3 className="text-base font-medium text-white">
                auhona.basu
              </h3>
            </div>
          </div>

          {/* Portfolio Expandable */}
          <div className="mb-2" style={{ marginTop: '32px', marginLeft: '20px' }}>
            <button
              onClick={() => setPortfolioExpanded(!portfolioExpanded)}
              className="flex items-center rounded-lg text-sm transition-all duration-200"
              style={{
                backgroundColor: '#3a3a3a',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                <span>Portfolio</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${portfolioExpanded ? 'rotate-180' : ''}`}
                  style={{ color: '#888888', marginLeft: '80px' }}
                />
              </div>
            </button>
            
            {/* Sub-items */}
            {portfolioExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
                style={{ position: 'relative', marginLeft: '20px' }}
              >
                {/* Vertical connecting line */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '0',
                    height: 'calc(100% - 13px)',
                    width: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
                
                {/* Sub-items with horizontal connectors */}
                <div className="space-y-2" style={{ paddingLeft: '24px' }}>
                  {portfolioSubItems.map((item, index) => (
                    <div key={item.id} style={{ position: 'relative' }}>
                      {/* Horizontal connector curve */}
                      <div 
                        style={{
                          position: 'absolute',
                          left: '-16px',
                          top: '50%',
                          width: '12px',
                          height: '1px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-50%)',
                        }}
                      />
                      
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          scrollToSection(item.href);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded text-sm transition-all duration-200"
                        style={{
                          color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {item.label}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Info Button */}
          <div className="mb-2" style={{ marginTop: '16px', marginLeft: '20px' }}>
            <button
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className="flex items-center rounded-lg text-sm transition-all duration-200"
              style={{
                backgroundColor: '#3a3a3a',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Info</span>
              </div>
            </button>
          </div>

          {/* Time Display Header (Boxed) */}
          <div style={{ marginTop: '16px', marginLeft: '20px' }}>
            <div
              className="flex items-center rounded-lg text-sm transition-all duration-200"
              style={{
                backgroundColor: '#3a3a3a',
                color: '#ffffff',
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                display: 'inline-flex'
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Timezone</span>
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div 
            style={{ 
              marginTop: '16px',
              marginLeft: '20px', 
              marginRight: '20px' 
            }}
          >
            <div 
              className="bg-white/5 border border-white/10 rounded-lg"
              style={{
                marginBottom: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '12px',
                paddingRight: '12px',
              }}
            >
              <p 
                className="text-white/80 text-xs uppercase tracking-wider font-bold"
                style={{ marginBottom: '4px' }}
              >
                Toronto Time:
              </p>
              <p className="text-white text-sm font-mono">{torontoTime}</p>
            </div>

            <div 
              className="bg-white/5 border border-white/10 rounded-lg"
              style={{
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '12px',
                paddingRight: '12px',
              }}
            >
              <p 
                className="text-white/80 text-xs uppercase tracking-wider font-bold"
                style={{ marginBottom: '4px' }}
              >
                Your local time:
              </p>
              <p className="text-white text-sm font-mono">{localTimeLive}</p>
            </div>
          </div>
        </motion.div>

        {/* Center Content Container */}
        <motion.div
          className="p-8 rounded-3xl"
          style={{
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            minHeight: '600px',
            flex: '1',
            position: 'relative',
          }}
        >
          {/* Favorites Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8" style={{ marginLeft: '20px', marginTop: '12px' }}>Favorites</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px', maxWidth: '400px' }}>
              {favorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    if (item.href) {
                      window.open(item.href, '_blank', 'noopener,noreferrer');
                    } else if (item.name === 'about' || item.name === 'why I build' || item.name === 'hobbies' || item.name === 'available') {
                      setActiveNote(item.name);
                      setShowNotesApp(true);
                      setShowInfoPanel(false);
                    }
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{
                    marginRight: index % 2 === 0 ? '40px' : '0px',
                    marginBottom: '32px',
                    width: '120px',
                  }}
                >
                  {/* Icon/Thumbnail */}
                  <div 
                    className="mb-2 flex items-center justify-center transition-all duration-300"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <Image 
                      src="/images/ff.png" 
                      alt={item.name} 
                      width={100} 
                      height={100} 
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Label */}
                  <p className="text-white/80 text-sm font-medium text-center">
                    {item.name}
                  </p>
                  {item.subtitle && (
                    <p className="text-white/40 text-xs text-center mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notes App Window */}
          {showNotesApp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#1e1e1e',
                borderRadius: '24px',
                zIndex: 50,
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Sidebar */}
              <div style={{ width: '260px', backgroundColor: '#242426', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                {/* Traffic Lights */}
                <div style={{ padding: '20px 16px 16px', display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setShowNotesApp(false);
                      setShowInfoPanel(true);
                    }}
                    style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', border: 'none', cursor: 'pointer' }} 
                  />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                </div>
                
                {/* Sidebar Content */}
                <div style={{ padding: '0 16px', flex: 1 }}>
                  <h3 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', marginBottom: '12px', marginTop: '8px' }}>Today</h3>
                  
                  {/* Note: about me */}
                  <div 
                    onClick={() => setActiveNote('about')}
                    style={{ backgroundColor: activeNote === 'about' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '8px', padding: '12px', cursor: 'pointer', marginBottom: '4px' }}
                  >
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>about me</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontSize: '12px' }}>{currentTime || '7:40 PM'}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>No addition...</span>
                    </div>
                  </div>

                  {/* Note: hobbies */}
                  <div 
                    onClick={() => setActiveNote('hobbies')}
                    style={{ backgroundColor: activeNote === 'hobbies' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '8px', padding: '12px', cursor: 'pointer', marginBottom: '4px' }}
                  >
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>hobbies</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontSize: '12px' }}>{currentTime || '7:40 PM'}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Away from the...</span>
                    </div>
                  </div>

                  {/* Note: why I build */}
                  <div 
                    onClick={() => setActiveNote('why I build')}
                    style={{ backgroundColor: activeNote === 'why I build' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '8px', padding: '12px', cursor: 'pointer', marginBottom: '4px' }}
                  >
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>why I build</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontSize: '12px' }}>{currentTime || '7:40 PM'}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>I use tech to build...</span>
                    </div>
                  </div>

                  {/* Note: available */}
                  <div 
                    onClick={() => setActiveNote('available')}
                    style={{ backgroundColor: activeNote === 'available' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
                  >
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>available</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontSize: '12px' }}>{currentTime || '7:40 PM'}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>B.Eng student...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e' }}>
                {/* Toolbar */}
                <div style={{ height: '52px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
                   <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                     {currentDate || 'July 10, 2026 at 7:40 PM'}
                   </span>
                </div>
                
                {/* Editor Space */}
                <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
                  {activeNote === 'about' ? (
                    <>
                      <h3 className="font-bold mb-6 text-3xl" style={{ color: '#ffffff' }}>
                        about me
                      </h3>
                      <div className="leading-relaxed space-y-4" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px' }}>
                        <p>
                          I build systems that turn messy, high-stakes data into tools people can actually rely on. Whether I'm engineering RAG pipelines that ground LLMs in 15,000+ vector embeddings, training models to predict loan defaults across 350,000+ records, or shipping document-intelligence pipelines at 12-hour hackathons, I thrive on taking a hard technical problem from idea to production. I love moving fast, sweating the details that make a model trustworthy, and building with people who care about getting it right.{' '}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShowNotesApp(false);
                              setShowInfoPanel(true);
                              scrollToSection('#experience');
                            }}
                            className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors cursor-pointer"
                          >
                            See my work.
                          </button>
                        </p>
                      </div>
                    </>
                  ) : activeNote === 'why I build' ? (
                    <>
                      <h3 className="font-bold mb-6 text-3xl" style={{ color: '#ffffff' }}>
                        why I build
                      </h3>
                      <div className="leading-relaxed space-y-4" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px' }}>
                        <p>
                          I use tech to build the access I didn't always have. Over the years, I've...{' '}
                          <span 
                            onClick={() => setPositionIndex((prev) => (prev + 1) % positions.length)}
                            className="text-[#ffbd2e] underline underline-offset-4 cursor-pointer hover:text-white transition-colors select-none"
                          >
                            {positions[positionIndex]}
                          </span>
                        </p>
                        <p>
                          Every role reinforced the same belief — you push until the door opens, then you hold it open for the next person.
                        </p>
                      </div>
                    </>
                  ) : activeNote === 'available' ? (
                    <>
                      <h3 className="font-bold mb-6 text-3xl" style={{ color: '#ffffff' }}>
                        available
                      </h3>
                      <div className="leading-relaxed space-y-4" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px' }}>
                        <p>
                          B.Eng student (Specialized Honours in Computer Engineering) at York University, actively seeking full-time and internship roles for Fall 2026. Willing to relocate. Work eligible via co-op/internship permit. Reach out: auhonabasu03@gmail.com
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold mb-6 text-3xl" style={{ color: '#ffffff' }}>
                        hobbies
                      </h3>
                      <div className="leading-relaxed space-y-4" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px' }}>
                        <p>
                          Away from the keyboard, I'm{' '}
                          <span 
                            onClick={() => setHobbyIndex((prev) => (prev + 1) % activities.length)}
                            className="text-[#ffbd2e] underline underline-offset-4 cursor-pointer hover:text-white transition-colors select-none"
                          >
                            {activities[hobbyIndex]}
                          </span>
                          .
                        </p>
                        <p>
                          On campus, I'm leading as Co-President @ AI & Data Society, representing as Year Rep @ WiSE, and keeping things running as Administrator @ York Science Collective.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Info Panel */}
        {showInfoPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-80 rounded-3xl"
            style={{
              backgroundColor: 'rgba(15, 15, 15, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '20px',
              paddingBottom: '28px',
              position: 'absolute',
              right: '40px',
              top: '-35px',
              zIndex: 10,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold text-lg">Info</h4>
              <button 
                onClick={() => setShowInfoPanel(false)}
                className="text-white hover:text-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider line */}
            <div 
              style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                width: '100%',
                marginBottom: '20px',
              }}
            />
            
            {/* Education */}
            <div style={{ marginBottom: '24px' }}>
              <p className="text-white/50 text-sm" style={{ marginBottom: '12px' }}>Education</p>
              <div 
                className="rounded-lg"
                style={{
                  backgroundColor: '#1b1919',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingLeft: '10px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
              >
                <p className="text-blue-400 font-medium mb-1">York University</p>
                <p className="text-white/70 text-xs">Bachelor of Engineering - Specialized Honors in Computer Engineering</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-white/50 text-sm" style={{ marginBottom: '12px' }}>Find me on other platforms</p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div 
                      className="rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${link.color}20`,
                        width: '36px',
                        height: '36px',
                      }}
                    >
                      <link.icon className="w-4 h-4" style={{ color: link.color }} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{link.platform}</p>
                      <p className="text-white/50 text-xs">{link.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Who is Auhona Section - Below Info */}
            <div 
              style={{
                marginTop: '24px',
                backgroundColor: 'rgba(40, 40, 40, 0.9)',
                borderRadius: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3 className="font-semibold mb-2 text-sm" style={{ color: '#ffffff' }}>
                who is auhona?
              </h3>
              <div className="leading-relaxed space-y-2" style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'justify', fontSize: '12px' }}>
                <p>
                  AI/ML engineer building intelligent systems — RAG pipelines, credit risk models, full stack products and explainable AI — turning research into products that solve real problems in fintech and beyond.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AboutMe;