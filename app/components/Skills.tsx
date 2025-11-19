"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const skillsData = {
  "AI/ML": ["TensorFlow", "Pandas", "NumPy"],
  "Backend": ["Node.js", "Python", "Flask", "FastAPI"],
  "Frontend": ["JavaScript", "TypeScript", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  "Languages": ["Python", "JavaScript", "TypeScript", "C", "C++", "AssemblyScript", "Java", "HTML5", "CSS3", "Markdown", "SQL", "Assembly (RISC-V)"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB", "VectorDB", "SQLite"],
  "DevOps & Tools": ["Git", "GitHub", "Poetry", "Linux", "Postman", "Clerk"],
  "Concepts & Other Skills": ["DSA", "OOP", "RISC-V Leadership", "PM", "Public Speaking", "Tech Presentations", "Event Mangement"],
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(Object.keys(skillsData)[0]);

  return (
    <motion.section
      id="skills"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-wine-red px-4 sm:px-6 lg:px-8"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col py-10">
        <motion.div 
          className="w-full flex flex-col items-center" 
          variants={fadeIn}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* HEADING */}
          {/* Using style for the 48px bottom margin */}
          <h3 
            className="text-center text-5xl sm:text-6xl font-bold text-dutch-white"
            style={{ marginBottom: '48px' }}
          >
            Skills and Expertise
          </h3>
          
          <div className="w-full flex flex-col items-center">
            {/* TABS ROW */}
            {/* Using style for 16px gap and 24px bottom margin */}
            <div 
              className="flex flex-wrap justify-center"
              style={{ gap: '16px', marginBottom: '24px' }}
            >
              {Object.keys(skillsData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  // Using style for exact padding: 6px top/bottom, 12px left/right
                  style={{ padding: '6px 12px' }}
                  className={`text-base font-medium transition-colors duration-300 relative bg-transparent ${
                    activeTab === category 
                      ? 'text-dutch-white' 
                      : 'text-dutch-white/60 hover:text-dutch-white'
                  }`}
                >
                  {category}
                  
                  {activeTab === category && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dutch-white" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* SUB-TABS (BADGES) CONTENT */}
            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="w-full max-w-4xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Using style for 16px gap between badges */}
                  <div 
                    className="flex flex-wrap justify-center w-full"
                    style={{ gap: '16px' }}
                  >
                    {skillsData[activeTab as keyof typeof skillsData].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                      >
                        {/* Using style for exact padding: 8px top/bottom, 16px left/right */}
                        <div 
                          className="bg-dutch-white text-wine-red rounded-lg text-base font-medium cursor-default"
                          style={{ padding: '8px 16px' }}
                        >
                          {skill}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}