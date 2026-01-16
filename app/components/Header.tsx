'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-wine-red/80 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Container with inline padding */}
      <div 
        className="mx-auto" 
        style={{ 
            paddingTop: '20px', 
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
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="text-2xl font-bold text-dutch-white tracking-wide hover:text-dutch-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Auhona B
            </motion.button>
            
            {/* Social Icons Row directly below logo */}
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-dutch-white hover:text-dutch-white/80 transition-colors"
                  style={{ marginRight: index !== socialLinks.length - 1 ? '15px' : '0px' }} // Gap between icons
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
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
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-dutch-white hover:text-wine-red transition-colors"
            style={{ padding: '8px' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{ marginTop: '16px' }}
            >
              <div className="glass-effect rounded-lg" style={{ padding: '16px' }}>
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-dutch-white hover:text-wine-red transition-colors font-medium"
                    style={{ padding: '10px 0' }} // Vertical spacing for mobile links
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;