"use client";

import { useLayout } from "@/context/LayoutContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { motion, Variants, Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function PageContent() {
  const { sectionOrder, setSectionOrder, isEditMode } = useLayout();

  const sections: Record<string, React.ReactNode> = {
    hero: <HeroSection />,
    marquee: <MarqueeSection />,
    projects: <ProjectsSection />,
    timeline: <TimelineSection />,
    "connect-contact": <ContactSection />,
  };

  if (isEditMode) {
    return (
      <main id="main-content" className="flex min-h-screen flex-col items-center overflow-x-hidden pb-24 bg-neo-white/50">
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-neo-black text-neo-lime border-2 border-neo-lime px-6 py-3 font-mono font-bold shadow-neo">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-neo-lime rounded-full animate-pulse"></div>
            <span>BUILDER MODE: Drag sections with grip icon • Click text to edit</span>
          </div>
        </div>
        
        <Reorder.Group 
            axis="y" 
            values={sectionOrder} 
            onReorder={setSectionOrder}
            className="w-full flex flex-col items-center gap-8 pt-24"
        >
          {sectionOrder.map((sectionId) => (
            <Reorder.Item 
                key={sectionId} 
                value={sectionId}
                className="w-full flex justify-center relative group"
                dragListener={true}
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 cursor-grab active:cursor-grabbing p-4 bg-neo-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-neo">
                    <GripVertical size={24} />
                </div>
                <div className="w-full flex justify-center border-2 border-dashed border-neo-black/20 hover:border-neo-blue/50 p-4 rounded-lg transition-colors">
                    {sections[sectionId]}
                </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </main>
    );
  }

  return (
    <motion.main 
      id="main-content"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen flex-col items-center overflow-x-hidden pb-24"
    >
      {sectionOrder.map((sectionId) => (
        <div key={sectionId} className="w-full flex justify-center">
            {sections[sectionId]}
        </div>
      ))}
    </motion.main>
  );
}

export default function Home() {
  return (
      <PageContent />
  );
}
