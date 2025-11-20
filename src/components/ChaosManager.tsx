"use client";

import { useEffect, useState } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useLayout } from "@/context/LayoutContext";
import { Settings, Save, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChaosManager() {
  const isKonamiActive = useKonamiCode();
  const [isActive, setIsActive] = useState(false);
  
  const { toggleEditMode, resetLayout } = useLayout();

  // Sync internal state with Konami code
  useEffect(() => {
    if (isKonamiActive) {
      toggleChaos();
    }
  }, [isKonamiActive]);

  // Listen for custom event from CommandMenu
  useEffect(() => {
    const handleToggle = () => toggleChaos();
    window.addEventListener("toggle-chaos", handleToggle);
    return () => window.removeEventListener("toggle-chaos", handleToggle);
  }, [isActive]);

  const toggleChaos = () => {
    toggleEditMode();
    setIsActive(!isActive);
    
    // Toggle body class for grid background
    if (!isActive) {
      document.body.classList.add("builder-mode");
    } else {
      document.body.classList.remove("builder-mode");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 p-2 bg-neo-black border-2 border-neo-lime shadow-[4px_4px_0px_0px_#BEF264]"
          >
            <div className="flex items-center gap-2 px-4 border-r border-neo-lime/30">
              <Settings className="w-5 h-5 text-neo-lime" />
              <span className="font-mono font-bold text-neo-lime text-sm">BUILDER_MODE_ACTIVE</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                resetLayout();
              }}
              className="flex items-center gap-2 bg-neo-pink text-neo-black px-4 py-2 font-bold text-xs hover:bg-white transition-colors"
              title="Reset all changes"
            >
              <RotateCcw className="w-4 h-4" />
              RESET
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleChaos();
              }}
              className="flex items-center gap-2 bg-neo-lime text-neo-black px-4 py-2 font-bold text-xs hover:bg-white transition-colors"
              title="Save changes and exit"
            >
              <Save className="w-4 h-4" />
              SAVE & EXIT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden trigger for testing/discovery */}
      <div className="fixed bottom-0 left-0 w-4 h-4 z-50 opacity-0 hover:opacity-100 cursor-pointer" onClick={toggleChaos} title="???">
        π
      </div>
    </>
  );
}


