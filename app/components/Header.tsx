'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Instagram, Search, Command } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const searchOptions = [
    { label: 'Go to Home', href: '#hero', type: 'navigation' },
    { label: 'Go to Work', href: '#experience', type: 'navigation' },
    { label: 'Go to About', href: '#about', type: 'navigation' },
    { label: 'Go to Contact', href: '#contact', type: 'navigation' },
    { label: 'Open GitHub', href: 'https://github.com/auhonab', type: 'external' },
    { label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/auhona-basu', type: 'external' },
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
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
    setIsMobileMenuOpen(false);
  };

  const handleSearchOptionClick = (option: typeof searchOptions[0]) => {
    if (option.type === 'navigation') {
      scrollToSection(option.href);
    } else {
      window.open(option.href, '_blank');
    }
    setIsSearchOpen(false);
    setSearchQuery('');
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
              Auhona B
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
            
            {/* Search Command Button */}
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1 px-5 py-2.5 rounded-md text-sm transition-all"
              style={{ color: '#ffffff', backgroundColor: 'transparent' }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Command size={14} />
              <span>K</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-dutch-white hover:text-gray-300 transition-colors"
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
                    className="block w-full text-left text-dutch-white hover:text-gray-300 transition-colors font-medium"
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

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Search Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
              style={{ margin: '0 20px' }}
            >
              <div className="bg-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {/* Search Input */}
                <div className="border-b border-white/10" style={{ paddingLeft: '45px', paddingRight: '16px', paddingTop: '20px', paddingBottom: '24px' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="w-full bg-transparent text-white placeholder-white/40 outline-none text-base"
                    autoFocus
                  />
                </div>
                
                {/* Search Options */}
                <div className="max-h-96 overflow-y-auto overflow-x-hidden" style={{ paddingLeft: '45px', paddingRight: '16px', paddingTop: '16px', paddingBottom: '8px' }}>
                  {searchOptions.filter(option => 
                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 ? (
                    searchOptions
                      .filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((option, index) => (
                        <motion.button
                          key={option.label}
                          onClick={() => handleSearchOptionClick(option)}
                          className="w-full text-left text-white transition-colors text-base"
                          style={{ marginBottom: '16px', padding: '8px 16px', borderRadius: '8px' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4, backgroundColor: '#3a3a3a' }}
                        >
                          {option.label}
                        </motion.button>
                      ))
                  ) : (
                    <div className="text-white/40 text-center py-8">
                      No search options
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;