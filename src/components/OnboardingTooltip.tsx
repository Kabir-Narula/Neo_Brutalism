"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, Sparkles } from "lucide-react";

export function OnboardingTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has seen the tooltip before
    const seen = localStorage.getItem("portfolio-onboarding-seen");
    if (seen) {
      setHasSeenTooltip(true);
      return;
    }

    // Show tooltip after 3 seconds on first visit
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("portfolio-onboarding-seen", "true");
    setHasSeenTooltip(true);
  };

  const handleActivateBuilder = () => {
    setShowPopup(false);
    setIsVisible(false);
    localStorage.setItem("portfolio-onboarding-seen", "true");
    setHasSeenTooltip(true);
    window.dispatchEvent(new CustomEvent("toggle-chaos"));
  };

  return (
    <>
      {/* Floating Help Icon - Always visible after dismissing initial tooltip */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: hasSeenTooltip ? 1 : 0, 
          opacity: hasSeenTooltip ? 1 : 0 
        }}
        transition={{ delay: 0.5 }}
        onClick={() => setShowPopup(true)}
        className="fixed bottom-4 left-4 z-[9998] flex h-14 w-14 items-center justify-center rounded-full border-3 border-neo-black bg-neo-blue text-white shadow-neo hover:bg-neo-pink hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-neo-lime focus:ring-offset-2"
        aria-label="Open Builder Mode tutorial"
        data-cursor-text="HELP"
      >
        <HelpCircle className="h-6 w-6" />
      </motion.button>

      {/* Initial Onboarding Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-20 right-4 z-[9999] w-80 border-3 border-neo-black bg-white shadow-neo-lg"
          >
            <div className="relative p-6">
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center hover:bg-concrete transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neo-lime border-2 border-neo-black">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-black uppercase">
                    Did You Know?
                  </h3>
                  <p className="font-mono text-xs text-neo-dark-grey">
                    Hidden Feature Unlocked
                  </p>
                </div>
              </div>

              <p className="font-mono text-sm leading-relaxed mb-4">
                You can <span className="font-bold text-neo-blue">rearrange sections</span> and{" "}
                <span className="font-bold text-neo-pink">edit text</span> on this portfolio using{" "}
                <span className="font-black">Builder Mode</span>!
              </p>

              <div className="bg-concrete p-3 mb-4 border-2 border-neo-black">
                <p className="font-mono text-xs font-bold mb-2">Quick Access:</p>
                <ul className="font-mono text-xs space-y-1">
                  <li>• Press <kbd className="px-1 py-0.5 bg-white border border-neo-black">Ctrl+K</kbd> → "Builder Mode"</li>
                  <li>• Konami Code: ↑↑↓↓←→←→BA</li>
                  <li>• Click the <HelpCircle className="inline h-3 w-3" /> icon anytime</li>
                </ul>
              </div>

              <button
                onClick={handleActivateBuilder}
                className="w-full border-3 border-neo-black bg-neo-lime px-4 py-3 font-bold shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                TRY IT NOW
              </button>
            </div>

            {/* Animated corner accent */}
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-neo-pink border-2 border-neo-black" />
            <div className="absolute -bottom-1 -left-1 h-4 w-4 bg-neo-lime border-2 border-neo-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Popup (when clicking the help icon) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-neo-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md border-4 border-neo-lime bg-neo-black p-8 shadow-[0_0_50px_rgba(190,242,100,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center border-2 border-neo-lime hover:bg-neo-lime hover:text-neo-black text-neo-lime transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h2 className="font-sans text-3xl font-black uppercase text-neo-lime mb-2">
                  Builder Mode
                </h2>
                <p className="font-mono text-sm text-white/80">
                  Customize this portfolio yourself
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border-2 border-neo-lime/30 p-4">
                  <h3 className="font-mono text-sm font-bold text-neo-lime mb-2">
                    🎯 What You Can Do:
                  </h3>
                  <ul className="font-mono text-xs text-white space-y-1">
                    <li>• Drag sections to reorder them</li>
                    <li>• Click any text to edit it live</li>
                    <li>• Change project descriptions</li>
                    <li>• Personalize the hero section</li>
                  </ul>
                </div>

                <div className="border-2 border-neo-lime/30 p-4">
                  <h3 className="font-mono text-sm font-bold text-neo-lime mb-2">
                    ⌨️ How to Activate:
                  </h3>
                  <ul className="font-mono text-xs text-white space-y-1">
                    <li>• Press <kbd className="px-1 py-0.5 bg-neo-lime text-neo-black">Ctrl+K</kbd> or <kbd className="px-1 py-0.5 bg-neo-lime text-neo-black">⌘K</kbd></li>
                    <li>• Select "Builder Mode"</li>
                    <li>• Or try the Konami Code easter egg!</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleActivateBuilder}
                className="w-full border-3 border-neo-lime bg-neo-lime px-6 py-4 font-bold text-neo-black shadow-neo hover:bg-neo-pink hover:border-neo-pink hover:text-white transition-all"
              >
                ACTIVATE BUILDER MODE
              </button>

              <p className="mt-4 text-center font-mono text-xs text-white/60">
                Don't worry - refresh to reset everything!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
