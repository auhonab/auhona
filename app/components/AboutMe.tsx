'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, ChevronDown, Linkedin, Mail, Instagram, Github, X, Folder, FileText, Info } from 'lucide-react';

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState('portfolio');
  const [portfolioExpanded, setPortfolioExpanded] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

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
      name: 'RAG Systems',
      type: 'folder',
      icon: Folder,
    },
    { 
      id: 2,
      name: 'ML Models',
      type: 'folder',
      icon: Folder,
    },
    { 
      id: 3,
      name: 'Reading.series',
      subtitle: '2025',
      type: 'image',
      icon: FileText,
    },
    { 
      id: 4,
      name: 'Portfolio.JPG',
      subtitle: '2026-finished',
      type: 'image',
      icon: FileText,
    },
    { 
      id: 5,
      name: 'Research.pdf',
      subtitle: '2025',
      type: 'folder',
      icon: Folder,
    },
    { 
      id: 6,
      name: 'Photography',
      subtitle: '2026',
      type: 'image',
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
        className="text-5xl sm:text-6xl font-bold text-white"
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

          {/* Who is Auhona Section - Bottom Right */}
          <div 
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              maxWidth: '420px',
              backgroundColor: 'rgba(40, 40, 40, 0.9)',
              borderRadius: '12px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3 className="font-semibold mb-3 text-sm" style={{ color: '#ffffff' }}>
              who is auhona?
            </h3>
            <div className="leading-relaxed space-y-2" style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'justify', fontSize: '12px' }}>
              <p>
                Engineer by degree, builder by instinct. I design LLM-powered systems and architect RAG pipelines that turn ideas into scalable impact. Curious and fueled by late-night debugging, I’m always building, learning, and refining. Beyond code, I enjoy reading, photography, and getting lost in music.
              </p>
              <p>
                And as the trend goes — if you ask me for my "common Auhona say your stupid line," I'd say:
              </p>
              <div className="italic mt-2">
                <p className="mb-1 text-[10px] text-white/80">"কিছুই আসলে সহজ নয়। লাইফে এত চাপ নিবি না বুঝলি, like i always say হাল ছাড়োনা বন্ধু।"</p>
                <p className="text-[10px]" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>"Nothing is really easy. Don't take so much stress in life, like i always say don't give up, my friend."</p>
              </div>
            </div>
          </div>
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
            <div className="mb-6">
              <p className="text-white/50 text-sm mb-3">Education</p>
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
              <p className="text-white/50 text-sm mb-4">Find me on other platforms</p>
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
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AboutMe;