"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronRight } from 'lucide-react';

const projectsData = [
  {
    title: "AptWise",
    category: "Full stack Application",
    skills: ["Python", "FastAPI", "React", "PostgreSQL", "NLP", "Poetry", "QdrantDB"],
    details: "AI-powered interview platform for realistic mock interviews.",
    longDetails: "AptWise is an AI-powered interview automation platform designed to help candidates practice anytime with realistic mock interviews. Using NLP, it provides meaningful feedback and simulates human-like interviews, making preparation smarter and more accessible. This project combines backend, AI, and front-end development to create a full-fledged platform.",
    image: "/images/projects/aptwise.png",
    githubUrl: "https://github.com/orgs/AptWise/repositories",
    liveDemoUrl: "https://www.youtube.com/watch?v=nuLv2sP0XHc",
  },
  {
    title: "EverAfter Keepsake",
    category: "Web Development",
    skills: ["Next.js 14", "Clerk.dev", "MongoDB", "Cloudinary", "OpenStreetMap + Leaflet.js", "Gemini API", "Vercel"],
    details: "Friendship memory app with interactive timeline, photos, and AI poems.",
    longDetails: "EverAfter Keepsake is a friendship and relationship memory app featuring an interactive timeline, photo albums, and generated poems to add a personal touch. Users can visualize special moments on a map and enjoy an intuitive, aesthetically pleasing interface. The app is designed to make capturing and reliving memories both fun and meaningful.",
    image: "/images/projects/everafter-keepsake.png",
    githubUrl: "https://github.com/auhonab/everafter-keepsake",
    liveDemoUrl: "https://everafter-keepsake.vercel.app/",
  },
  {
    title: "Stock Sentiment Forecasting Model",
    category: "Data Visualization & Research Publication",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Transformers"],
    details: "Conv-LSTM + LLM model for stock trend prediction using time-series and textual data.",
    longDetails: "Stock Forecasting Model uses a Conv-LSTM Neural Network integrated with a Large Language Model (LLM) to predict stock trends. It analyzes historical stock data for temporal patterns while incorporating sentiment and context from financial news and social media. This hybrid approach combines numeric and textual insights to provide accurate, context-aware stock advice.",
    image: "/images/projects/stock-forecasting.png",
    liveDemoUrl: "https://doi.org/10.48550/arXiv.2410.12807",
  },
  {
    title: "Automated Plant Watering System",
    category: "Data Visualization",
    skills: ["Arduino", "Java", "Sensors"],
    details: "IoT system that waters plants based on soil moisture.",
    longDetails: "Automated Plant Watering System is an IoT project that monitors soil moisture and automatically waters plants, reducing manual effort and ensuring optimal growth conditions. Sensors and microcontrollers enable real-time decision making, making it ideal for smart homes or small-scale automated gardening.",
    image: "/images/projects/plant-watering-system.png",
    githubUrl: "https://github.com/auhonab/Automated-Plant-Watering-System-Java",
  },
  {
    title: "Loan Prediction Model",
    category: "Machine Learning",
    skills: ["Python", "Pandas", "Scikit-Learn", "Matplotlib / Seaborn", "Jupyter Notebook"],
    details: "Random Forest model to predict loan default risk for credit scoring.",
    longDetails: "Loan Prediction Model predicts loan default risk using a Random Forest Classifier, analyzing borrower attributes to automate credit scoring. Data visualization provides insights into patterns and trends, supporting more informed lending decisions. This project demonstrates a combination of machine learning, analytics, and practical application.",
    image: "/images/projects/loan-prediction.png",
    githubUrl: "https://github.com/auhonab/Loan-Prediction-Model",
  },
  {
    title: "Water Consumption model",
    category: "Data Visualization",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "Matplotlib", "Jupyter Notebook", "LSTM"],
    details: "ML model to forecast water usage for sustainability projects.",
    longDetails: "Water Consumption Model forecasts water usage for sustainability projects using machine learning. By analyzing historical consumption data and trends, it predicts future demand and supports efficient water management. LSTM networks capture temporal patterns, and visualization tools provide actionable insights.",
    image: "/images/projects/water-consumption.png",
    githubUrl: "https://github.com/auhonab/Water_Consumption",
  },
  {
    title: "Personal Portfolio",
    category: "Web Development & UI/UX",
    skills: ["Next.js", "TypeScript", "Framer Motion", "React", "Tailwind CSS"],
    details: "Modern portfolio website showcasing projects with advanced animations.",
    longDetails: "This Personal Portfolio serves as a comprehensive showcase of my technical abilities and creative projects. Built with Next.js and TypeScript for optimal performance and type safety, it utilizes Framer Motion to deliver seamless page transitions and interactive UI elements. The responsive design ensures a polished user experience across all devices.",
    image: "/images/projects/personal-portfolio.png",
    githubUrl: "https://github.com/auhonab/auhona",
    liveDemoUrl: "https://auhona.vercel.app/",
  },
  {
    title: "Connect Four Game",
    category: "Data Visualization",
    skills: ["Python"],
    details: "Interactive Connect Four game with AI opponent.",
    longDetails: "Connect Four Game is an interactive game featuring an AI opponent for single-player mode. It combines game logic with smooth gameplay animations and decision-making algorithms, offering a fun and engaging user experience while demonstrating algorithmic thinking.",
    image: "/images/projects/connect-four-game.png",
    githubUrl: "https://github.com/auhonab/Connect4Game-CODEBOZU",
  },
];

export default function ProjectsSection() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const selectedProject = projectsData[selectedProjectIndex];

  const handleNextProject = () => {
    setSelectedProjectIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const handlePreviousProject = () => {
    setSelectedProjectIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Show tooltip when component mounts, hide after 5 seconds
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Main Section Wrapper
    <section 
      id="projects" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '80px 0',
        backgroundColor: '#722f37'
      }}
    >
      {/* Inner Container */}
      <div style={{ width: '100%', maxWidth: '1150px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Heading */}
        <motion.h2
          className="text-5xl font-bold tracking-tight text-primary sm:text-6xl"
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        {/* Flexbox Layout for Content */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
          
          {/* LEFT COLUMN: Project List */}
          <motion.div
            style={{ flex: '1 1 300px', maxWidth: '400px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projectsData.map((project, index) => (
                <button
                  key={project.title}
                  onClick={() => setSelectedProjectIndex(index)}
                  className="focus-visible:ring-2 focus-visible:ring-primary hover:bg-muted/50"
                  style={{ 
                    position: 'relative', 
                    textAlign: 'left', 
                    padding: '16px', 
                    borderRadius: '6px',
                    outline: 'none',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  {/* Text Content */}
                  <h3 
                    className="text-xl font-semibold text-foreground transition-colors duration-300"
                    style={{ 
                        position: 'relative', 
                        zIndex: 1,
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  {/* ACTIVE INDICATOR LINE (Dutch White) */}
                  {selectedProjectIndex === index && (
                    <motion.div
                      layoutId="underline-right"
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        bottom: 0, 
                        width: '4px', 
                        backgroundColor: '#EFD0CA', // Dutch White
                        zIndex: 2,
                        borderTopRightRadius: '6px',
                        borderBottomRightRadius: '6px'
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* RIGHT COLUMN: MacBook Mockup */}
          <motion.div
            style={{ flex: '2 1 500px', minWidth: '320px' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ height: '500px', display: 'flex', justifyContent: 'center' }}
              >
                {selectedProject.image && (
                  <div style={{ width: '100%', maxWidth: '580px', position: 'relative' }}>
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          style={{ 
                            position: 'absolute',
                            top: '-50px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#EFD0CA',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            zIndex: 20,
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(239, 208, 202, 0.2)'
                          }}
                        >
                          🔴 Previous • 🟡 Details • 🟢 Next
                          {/* Tooltip arrow */}
                          <div style={{
                            position: 'absolute',
                            bottom: '-5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid rgba(0, 0, 0, 0.8)'
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Laptop Bezel */}
                    <div style={{ 
                      backgroundColor: '#612727ff',
                      borderRadius: '12px', 
                      padding: '4px', 
                      border: '3px solid #612727ff',
                      boxShadow: '0 0 25px rgba(0,0,0,0.4)',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>

                      {/* Screen Area */}
                      <div style={{ 
                        backgroundColor: '#000', 
                        borderRadius: '8px', 
                        overflow: 'hidden', 
                        position: 'relative',
                        aspectRatio: '16/9',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        
                        {/* Browser Bar (Faded Translucent Grey) */}
                        <div style={{ 
                          position: 'absolute', 
                          top: 0, left: 0, right: 0, 
                          height: '32px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                          backdropFilter: 'blur(4px)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          padding: '0 16px', 
                          gap: '8px',
                          zIndex: 10
                        }}>
                          <button onClick={handlePreviousProject} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', cursor: 'pointer' }} />
                          <button onClick={openModal} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308', border: 'none', cursor: 'pointer' }} />
                          <button onClick={handleNextProject} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', border: 'none', cursor: 'pointer' }} />
                        </div>
                        
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', paddingTop: '32px' }}
                        />
                      </div>

                      {/* Card Content */}
                      <div 
                        style={{ 
                          padding: '20px', 
                          borderTop: '2px solid hsl(353,41%,18%)',
                          backgroundColor: '#8b3a42',
                          backgroundImage: `
                            linear-gradient(rgba(239, 208, 202, 0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(239, 208, 202, 0.08) 1px, transparent 1px)
                          `,
                          backgroundSize: '20px 20px',
                          position: 'relative'
                        }}>
                        <h3 className="text-dutch-white" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>{selectedProject.title}</h3>
                        <p className="text-dutch-white/70" style={{ fontSize: '0.875rem', marginBottom: '16px' }}>{selectedProject.details}</p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                          {selectedProject.skills.slice(0, 4).map(skill => (
                            <span key={skill} className="bg-[hsl(353,41%,28%)] text-dutch-white" style={{ fontSize: '11px', padding: '4px 10px', fontWeight: '500', borderRadius: '6px' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <button 
                          onClick={openModal}
                          className="bg-[hsl(38,18%,62%)] text-wine-red hover:bg-[hsl(38,18%,70%)]"
                          style={{ 
                            width: '100%', 
                            padding: '10px 0', 
                            fontWeight: 'bold', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px',
                            fontSize: '0.875rem',
                            transition: 'all 300ms'
                          }}
                        >
                          View Details <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && isModalOpen && (
        <motion.div
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 50, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '16px' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }} />
          
          <motion.div
            className="bg-wine-red border-dutch-white/10"
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '896px',
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
              borderWidth: '1px',
              borderStyle: 'solid',
              zIndex: 10
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gray-200/50 dark:bg-gray-800/50" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 24px', 
              borderBottomWidth: '1px',
              backdropFilter: 'blur(4px)',
              borderBottom: '1px solid rgba(239, 208, 202, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={closeModal} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', cursor: 'pointer' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              </div>
              <button onClick={closeModal} className="text-dutch-white/50 hover:text-dutch-white" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px' }}>
              <h2 className="text-dutch-white" style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '24px' }}>{selectedProject.title}</h2>
              <p className="text-dutch-white/80" style={{ lineHeight: '1.625', fontSize: '1.125rem', marginBottom: '32px' }}>{selectedProject.longDetails}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {selectedProject.skills.map((skill) => (
                  <span key={skill} className="bg-[hsl(353,41%,28%)] text-dutch-white" style={{ padding: '6px 12px', fontSize: '0.875rem', fontWeight: '500', borderRadius: '6px' }}>
                    {skill}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {selectedProject.liveDemoUrl && (
                  <a 
                    href={selectedProject.liveDemoUrl} 
                    className="bg-dutch-white text-wine-red"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '12px 24px', 
                      fontWeight: 'bold', 
                      borderRadius: '8px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                      textDecoration: 'none',
                      transition: 'transform 300ms'
                    }}
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    className="border-dutch-white text-dutch-white/70 hover:text-dutch-white hover:border-dutch-white"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '12px 24px', 
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      backgroundColor: 'transparent',
                      borderRadius: '8px', 
                      fontWeight: '500', 
                      textDecoration: 'none',
                      transition: 'all 300ms'
                    }}
                  >
                    <Github size={18} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}