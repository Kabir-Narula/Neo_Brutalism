"use client";

import { motion, Variants } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { NeoButton } from "@/components/NeoButton";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { useLayout } from "@/context/LayoutContext";
import { useMemo } from "react";

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

export function ContactSection() {
  const { projectData } = useLayout();

  // Memoize social links to avoid repeated .find() calls
  const socialLinks = useMemo(() => ({
    linkedin: projectData.contact.social.find(s => s.name === "LinkedIn")?.url,
    github: projectData.contact.social.find(s => s.name === "GitHub")?.url,
  }), [projectData]);

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 px-4 lg:flex-row">
      {/* Connect Section */}
      <motion.section variants={itemVariants} className="flex-1">
        <div className="mb-8 text-center lg:text-left">
           <h2 className="inline-block border-3 border-neo-black bg-neo-lime px-8 py-4 text-4xl font-black uppercase shadow-neo transform -rotate-1">
            Connect
          </h2>
        </div>
        <div className="flex flex-col gap-4 border-3 border-neo-black bg-white p-8 shadow-neo">
           <p className="font-mono font-bold text-neo-dark-grey">
              Connect with me on social platforms.
           </p>
           <div className="flex flex-col gap-4 sm:flex-row">
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                <NeoButton variant="default" className="w-full justify-between gap-3 bg-[#0077b5] text-white hover:bg-[#0077b5]/90">
                  <span className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                    LINKEDIN
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-60" aria-hidden="true" />
                </NeoButton>
              </a>
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1"
                aria-label="View GitHub profile (opens in new tab)"
              >
                <NeoButton variant="default" className="w-full justify-between gap-3 bg-[#333] text-white hover:bg-[#333]/90">
                  <span className="flex items-center gap-3">
                    <Github className="h-5 w-5" aria-hidden="true" />
                    GITHUB
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-60" aria-hidden="true" />
                </NeoButton>
              </a>
           </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section variants={itemVariants} id="contact" className="flex-1">
        <div className="mb-8 text-center lg:text-right">
          <h2 className="inline-block border-3 border-neo-black bg-neo-blue px-8 py-4 text-4xl font-black uppercase shadow-neo transform rotate-1">
            Contact_Protocol
          </h2>
        </div>
        <ContactForm />
      </motion.section>
    </div>
  );
}
