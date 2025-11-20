"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: readonly string[];
  link: string;
  className?: string;
}

export function ProjectCard({ title, description, techStack, link, className }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col justify-between border-3 border-neo-black bg-white p-6 shadow-neo transition-all hover:shadow-neo-lg",
        className
      )}
    >
      {/* Glitch effect decorative element */}
      <div className="absolute -right-2 -top-2 h-full w-full border-3 border-neo-blue opacity-0 transition-opacity group-hover:opacity-100" style={{ zIndex: -1 }} />
      
      <div>
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-sans text-2xl font-bold leading-tight uppercase">{title}</h3>
          {link && (
            <Link 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="z-10 flex h-11 w-11 items-center justify-center rounded-none border-2 border-neo-black bg-neo-lime transition-transform hover:bg-neo-pink hover:text-white focus:outline-none focus:ring-2 focus:ring-neo-pink focus:ring-offset-2 group/link"
              aria-label={`View ${title} project on GitHub (opens in new tab)`}
              title="Opens in new tab"
            >
              <ExternalLink className="h-5 w-5 group-hover/link:scale-110 transition-transform" strokeWidth={3} aria-hidden="true" />
            </Link>
          )}
        </div>
        <p className="mb-6 font-mono text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="border-2 border-neo-black bg-concrete px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#000]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

