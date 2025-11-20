"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Unlock, Sparkles } from "lucide-react";

export function SecretCodePanel() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Secret unlock: Click the hidden corner element 7 times in 3 seconds
  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount === 0) {
      // Show hint after first click
      setTimeout(() => setShowHint(true), 500);
      // Reset click count after 3 seconds
      setTimeout(() => {
        setClickCount(0);
        setShowHint(false);
      }, 3000);
    }

    if (clickCount + 1 === 7) {
      setIsUnlocked(true);
      setShowHint(false);
      localStorage.setItem("portfolio-secret-unlocked", "true");
    }
  };

  useEffect(() => {
    const unlocked = localStorage.getItem("portfolio-secret-unlocked");
    if (unlocked) setIsUnlocked(true);

    // Easter Egg: Console Art
    console.log(
      "%c🎨 KABIR'S PORTFOLIO ",
      "background: #BEF264; color: #000; font-size: 20px; font-weight: bold; padding: 10px;"
    );
    console.log(
      "%cLooking for secrets? Try clicking the glowing corner 7 times! 🔍",
      "color: #BEF264; font-size: 12px;"
    );
    console.log(
      "%cOr try the Konami Code: ↑↑↓↓←→←→BA",
      "color: #FF6B9D; font-size: 12px;"
    );
  }, []);

  const secretCode = `// 🎭 Hidden Feature: Dynamic Theme Generator
const themes = {
  cyberpunk: { bg: '#0a0e27', accent: '#00ff9f', shadow: '#ff00ff' },
  sunset: { bg: '#1a1a2e', accent: '#ff6b9d', shadow: '#feca57' },
  matrix: { bg: '#000000', accent: '#00ff00', shadow: '#003300' },
  ocean: { bg: '#001f3f', accent: '#7fdbff', shadow: '#39cccc' }
};

// Apply theme dynamically
document.documentElement.style.setProperty('--bg', themes.cyberpunk.bg);
document.documentElement.style.setProperty('--accent', themes.cyberpunk.accent);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Secret Trigger - Bottom Right Corner Pixel */}
      {!isUnlocked && (
        <>
          <motion.div
            onClick={handleSecretClick}
            className="fixed bottom-0 right-0 w-8 h-8 z-[9997] cursor-pointer bg-gradient-to-br from-neo-lime via-neo-blue to-neo-pink opacity-40 hover:opacity-80 transition-opacity rounded-tl-full"
            animate={{
              opacity: clickCount > 0 ? [0.6, 1, 0.6] : 0.4,
              scale: clickCount > 0 ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: clickCount > 0 ? Infinity : 0 }}
            aria-label="Secret feature"
            title="???"
          />
          
          {/* Hint Tooltip */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed bottom-12 right-4 bg-neo-black text-neo-lime border-2 border-neo-lime px-3 py-2 font-mono text-xs z-[9998] shadow-neo"
              >
                🔍 {clickCount}/7 clicks...
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Secret Panel */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-24 right-4 z-[9999] w-80 border-4 border-neo-lime bg-neo-black shadow-[8px_8px_0px_0px_#BEF264]"
          >
            {/* Header */}
            <div className="border-b-4 border-neo-lime bg-neo-lime/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Unlock className="w-5 h-5 text-neo-lime" />
                <h3 className="font-mono font-black text-neo-lime text-sm uppercase">
                  Secret Unlocked
                </h3>
              </div>
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-neo-lime hover:text-white transition-colors"
                aria-label="Close panel"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-neo-lime mt-1 flex-shrink-0" />
                <p className="font-mono text-xs text-white/80 leading-relaxed">
                  Congrats! You discovered the <span className="text-neo-lime font-bold">easter egg</span>. 
                  Here's a bonus code snippet for dynamic theming:
                </p>
              </div>

              {/* Code Block */}
              <div className="relative">
                <pre className="bg-black border-2 border-neo-lime/30 p-3 text-[10px] overflow-x-auto font-mono text-neo-lime/90 leading-relaxed">
                  {secretCode}
                </pre>
                
                {/* Copy Button */}
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 flex items-center gap-1 bg-neo-lime text-neo-black px-2 py-1 text-[10px] font-bold hover:bg-white transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      COPY
                    </>
                  )}
                </button>
              </div>

              {/* Footer Message */}
              <div className="mt-3 border-t-2 border-neo-lime/20 pt-3">
                <p className="font-mono text-[10px] text-white/60 text-center">
                  💡 <span className="text-neo-lime">Pro tip:</span> Check the console for more secrets
                </p>
              </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-neo-pink border-2 border-neo-black" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-neo-blue border-2 border-neo-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
