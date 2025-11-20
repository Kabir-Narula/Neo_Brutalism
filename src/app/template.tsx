"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0 0 0)" }}
      exit={{ clipPath: "inset(0 0 0 100%)" }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 1
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

