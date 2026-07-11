"use client";

import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function EducationSection() {
  return (
    <motion.section
      id="education"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-4 sm:px-6 lg:px-8 py-20"
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
          {/* Centered Heading */}
          <h2
            className="text-center text-6xl sm:text-7xl font-bold text-dutch-white"
            style={{ marginBottom: '48px', fontFamily: '"Dela Gothic One", sans-serif' }}
          >
            Education
          </h2>

          {/* Details Section */}
          <div 
            className="w-full flex flex-col text-left"
            style={{ marginTop: '24px', paddingRight: '15px' }}
          >
            {/* University Row */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                  YORK UNIVERSITY
                </h3>
                <span className="text-white/60 text-sm sm:text-base whitespace-nowrap">
                  Toronto, ON • Expected 2027
                </span>
              </div>
              <span className="text-xl sm:text-2xl text-white/80 font-medium">
                Bachelor of Engineering, Specialized Honours in Computer Engineering
              </span>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Standing Row */}
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Junior Year (third-year), on track to graduate in 2027.
              </p>
              
              {/* Coursework Row */}
              <div>
                <strong className="text-white/90 font-bold block text-lg sm:text-xl" style={{ marginBottom: '24px' }}>Coursework:</strong> 
                <div className="flex flex-wrap gap-3">
                  {[
                    "Advanced Object Oriented Programming", 
                    "Intro to logic for CS", 
                    "Programming & Mechatronics", 
                    "Computer Organization & Architecture", 
                    "Embedded Systems", 
                    "Probability & Statistics", 
                    "Data Structure & Algorithm", 
                    "Design Analysis & Algorithm", 
                    "Digital Logic Design", 
                    "Communication Network", 
                    "Operating System", 
                    "Digital System Engineering", 
                    "Software Design", 
                    "Signals & Systems"
                  ].map((course, i) => (
                    <span 
                      key={i} 
                      className="bg-transparent border border-white/20 rounded-md text-base font-medium text-white/70 hover:bg-gray-200 hover:!text-black hover:border-gray-200 transition-colors duration-300 cursor-default"
                      style={{ padding: '8px 16px' }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
