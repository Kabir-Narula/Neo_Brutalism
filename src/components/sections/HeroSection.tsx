"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { NeoButton } from "@/components/NeoButton";
import { useLayout } from "@/context/LayoutContext";
import { EditableText } from "@/components/EditableText";

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

export function HeroSection() {
  const { projectData, updateProjectData } = useLayout();

  return (
    <motion.section variants={itemVariants} className="relative mt-24 w-full max-w-5xl px-4 md:mt-32">
      <div className="border-3 border-neo-black bg-white p-8 shadow-neo lg:p-12">
        <div className="mb-6 flex items-center gap-2 border-b-3 border-neo-black pb-4">
          <div className="h-4 w-4 rounded-full bg-neo-pink border-2 border-neo-black" />
          <div className="h-4 w-4 rounded-full bg-neo-lime border-2 border-neo-black" />
          <div className="h-4 w-4 rounded-full bg-neo-blue border-2 border-neo-black" />
          <span className="ml-auto font-mono text-sm font-bold">SYSTEM_READY</span>
        </div>
        <h1 className="mb-6 font-sans text-4xl font-black uppercase leading-none tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl break-words">
          <span className="glitch-hover inline-block" data-cursor-text="EDIT_ME">
            <EditableText 
                value={projectData.name.split(" ")[0]} 
                onSave={(val) => {
                    const lastName = projectData.name.split(" ")[1] || "";
                    updateProjectData({ ...projectData, name: `${val} ${lastName}` });
                }}
                as="span"
            />
          </span>
          <br />
          <span 
            className="text-neo-lime glitch-hover inline-block"
            data-cursor-text="EDIT_ME"
            style={{ 
              textShadow: "4px 4px 0px #000",
              WebkitTextStroke: "2px black",
            }}
          >
            <EditableText 
                value={projectData.name.split(" ")[1] || ""} 
                onSave={(val) => {
                    const firstName = projectData.name.split(" ")[0] || "";
                    updateProjectData({ ...projectData, name: `${firstName} ${val}` });
                }}
                as="span"
            />
          </span>
        </h1>
        <p className="mb-2 font-mono text-xl font-bold text-neo-black">
           Full-Stack Software Developer
        </p>
        <div className="mb-8 max-w-2xl font-mono text-lg font-bold leading-tight text-neo-dark-grey">
          <EditableText 
            value={projectData.about} 
            onSave={(val) => updateProjectData({ ...projectData, about: val })}
            multiline
            as="p"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/resume">
            <NeoButton variant="primary" size="lg" className="shadow-neo">
              VIEW_RESUME
            </NeoButton>
          </Link>
          <Link href="#contact">
            <NeoButton variant="outline" size="lg" className="bg-white">
              CONTACT_ME
            </NeoButton>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
