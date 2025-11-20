"use client";

import { motion, Variants } from "framer-motion";
import { Timeline } from "@/components/Timeline";

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

export function TimelineSection() {
  return (
    <motion.section variants={itemVariants} className="w-full px-4">
      <Timeline />
    </motion.section>
  );
}
