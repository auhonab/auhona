'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const navigationItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const overlayLinks = [
    { label: 'home', href: '#hero' },
    { label: 'about', href: '#about' },
    { label: 'experience', href: '#experience' },
    { label: 'skills', href: '#skills' },
    { label: 'projects', href: '#projects' },
    { label: 'contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/auhonab', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/auhona-basu', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:auhonabasu03@gmail.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/auhona_03', label: 'Instagram' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOverlayOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOverlayOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Container with inline padding */}
      <div 
        className="mx-auto" 
        style={{ 
            paddingTop: '28px', 
            paddingBottom: '20px', 
            paddingLeft: '40px', 
            paddingRight: '40px',
            maxWidth: '100%',
            width: '100%'
        }}
      >
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}
        >
          {/* Left Side: Logo & Socials Column */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px' }}
          >
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="text-2xl font-bold text-dutch-white tracking-wide hover:text-dutch-white transition-colors"
              whileHover={{ y: -2 }}
            >
              𑣲⋆Auhona B⋆˙⟡
            </motion.button>
          </motion.div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center" style={{ gap: '32px', marginRight: '90px' }}>
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-dutch-white hover:text-dutch-white transition-colors font-medium relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dutch-white transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            
            {/* Overlay Menu Button */}
            <motion.button
              onClick={() => setIsOverlayOpen(true)}
              className="flex items-center justify-center p-2 rounded-md transition-all text-white"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Menu size={28} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOverlayOpen(true)}
            className="md:hidden text-dutch-white hover:text-gray-300 transition-colors"
            style={{ padding: '8px' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>

      </div>

      {/* Navigation Sidebar */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="fixed top-0 right-0 h-screen w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[45vw] max-w-[550px] z-[100] text-white overflow-hidden flex flex-col shadow-2xl border-l border-white/5"
            style={{ backgroundColor: '#000000' }}
          >
            {/* Decorative Shape */}
            <div 
              style={{
                position: 'absolute',
                top: '-15%',
                right: '-15%',
                width: '80%',
                aspectRatio: '1 / 1',
                backgroundColor: '#1a1a1a',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Top Right Close Button */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '40px', 
                right: '40px', 
                zIndex: 50 
              }}
            >
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="group shadow-md transition-colors"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
              >
                <X className="text-white group-hover:scale-110 transition-transform" size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Main Menu Navigation */}
            <div 
              className="flex-1 flex flex-col justify-center mt-12 md:mt-0"
              style={{ 
                paddingLeft: '15%', 
                paddingRight: '10%',
                zIndex: 10 
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '8px' }}>
                {overlayLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="group relative font-bold tracking-tight text-white hover:text-white/80 transition-colors block"
                    style={{ 
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                      fontSize: 'clamp(36px, 5vw, 56px)',
                      lineHeight: '1.1',
                      width: 'fit-content'
                    }}
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-6">
                      {link.label}
                    </span>
                    <span 
                      className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#888888]"
                      style={{
                        left: '-32px',
                        top: '50%',
                        transform: 'translateY(-55%)',
                        fontSize: 'clamp(24px, 4vw, 36px)'
                      }}
                    >
                      •
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ 
                paddingLeft: '15%', 
                paddingRight: '10%',
                paddingBottom: '48px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                zIndex: 10 
              }}
            >
              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="text-white/70 font-bold uppercase tracking-widest" style={{ fontSize: '11px' }}>
                  Email Address
                </span>
                <a href="mailto:auhonabasu03@gmail.com" className="text-white/90 hover:text-white transition-colors block" style={{ fontSize: '15px' }}>
                  auhonabasu03@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="https://www.linkedin.com/in/auhona-basu" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 font-mono uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-all" style={{ padding: '8px 20px', fontSize: '11px' }}>
                  LinkedIn
                </a>
                <a href="https://github.com/auhonab" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 font-mono uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-all" style={{ padding: '8px 20px', fontSize: '11px' }}>
                  GitHub
                </a>
                <a href="mailto:auhonabasu03@gmail.com" className="rounded-full border border-white/20 font-mono uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-all" style={{ padding: '8px 20px', fontSize: '11px' }}>
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;