"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1c1c1e] text-white"
    >
      <div className="flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-center"
          style={{ fontFamily: '"Dela Gothic One", sans-serif', paddingBottom: '32px' }}
        >
          𑣲⋆Auhona B⋆˙⟡
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="text-lg text-[#ccc] animate-pulse font-medium" style={{ paddingBottom: '32px' }}>
            Loading ...
          </p>
          
          <p className="text-[#888] text-sm md:text-base text-center max-w-md px-6">
            Best viewed on desktop. On mobile? Rotate to landscape.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
