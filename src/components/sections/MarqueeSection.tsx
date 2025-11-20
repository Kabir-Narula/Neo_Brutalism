"use client";

import { motion, Variants } from "framer-motion";
import { useLayout } from "@/context/LayoutContext";

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Memoize these outside component to prevent recreation
const MARQUEE_REPEATS = Array.from({ length: 4 });

export function MarqueeSection() {
  const { projectData } = useLayout();

  return (
    <motion.section variants={itemVariants} className="my-24 w-full overflow-hidden border-y-3 border-neo-black bg-neo-lime py-6 relative">
      <button
        onClick={(e) => {
          const marquee = e.currentTarget.nextElementSibling as HTMLElement;
          if (marquee.style.animationPlayState === 'paused') {
            marquee.style.animationPlayState = 'running';
            e.currentTarget.textContent = 'PAUSE';
            e.currentTarget.setAttribute('aria-label', 'Pause scrolling animation');
          } else {
            marquee.style.animationPlayState = 'paused';
            e.currentTarget.textContent = 'PLAY';
            e.currentTarget.setAttribute('aria-label', 'Resume scrolling animation');
          }
        }}
        aria-label="Pause scrolling animation"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-neo-black text-neo-lime px-3 py-1 text-xs font-bold border-2 border-neo-black hover:bg-neo-pink hover:text-white focus:outline-none focus:ring-2 focus:ring-neo-black focus:ring-offset-2 focus:ring-offset-neo-lime"
      >
        PAUSE
      </button>
      <div className="animate-marquee flex whitespace-nowrap text-4xl font-black uppercase tracking-tighter text-neo-black">
        {MARQUEE_REPEATS.map((_, i) => (
          <div key={i} className="flex shrink-0">
            {projectData.skills.map((skill) => (
              <span key={skill} className="mx-8 flex items-center gap-4">
                {skill}
                <span className="h-4 w-4 bg-neo-black" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
