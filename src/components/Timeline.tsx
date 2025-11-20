"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { RESUME_DATA } from "@/resume-data";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  cardDescription?: string;
  index: number;
}

function TimelineItem({ year, title, company, description, cardDescription, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn(
        "relative mb-12 flex w-full items-center md:justify-between",
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Spacer for Desktop Layout */}
      <div className="hidden w-5/12 md:block"></div>
      
      {/* Center/Left Axis Point */}
      <div className="absolute left-[-20px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-3 border-neo-black bg-neo-lime shadow-[2px_2px_0px_0px_#000] md:left-1/2 md:-translate-x-1/2">
        <div className="h-3 w-3 bg-neo-black" />
      </div>

      {/* Content Card */}
      <div className="ml-8 w-full md:ml-0 md:w-5/12">
        <div className="border-3 border-neo-black bg-white p-6 shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-lg">
          <span className="mb-2 inline-block border-2 border-neo-black bg-neo-pink px-2 py-1 text-xs font-bold text-white">
            {year}
          </span>
          <h3 className="font-sans text-xl font-bold uppercase">{company}</h3>
          <p className="mb-2 font-mono text-sm font-bold text-neo-blue">{title}</p>
          <p className="font-mono text-sm leading-relaxed text-neo-dark-grey">
            {cardDescription || description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const items = RESUME_DATA.work.map((job) => ({
    year: `${job.start} - ${job.end}`,
    company: job.company,
    title: job.title,
    description: job.description,
    cardDescription: (job as any).cardDescription,
  }));

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl py-20">
       <div className="mb-12 flex items-center justify-center">
          <h2 className="border-3 border-neo-black bg-neo-lime px-6 py-2 text-3xl font-black uppercase shadow-neo transform rotate-1">
            Experience_Log
          </h2>
       </div>

      {/* Vertical Line - Responsive Placement */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute left-[-5px] top-32 h-[85%] w-1 bg-neo-black md:left-1/2 md:-translate-x-1/2"
      />

      {items.map((item, index) => (
        <TimelineItem key={index} {...item} index={index} />
      ))}
    </div>
  );
}
