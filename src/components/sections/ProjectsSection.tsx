"use client";

import { motion, Variants } from "framer-motion";
import { ProjectCardDetailed } from "@/components/ProjectCardDetailed";
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

export function ProjectsSection() {
  const { projectData, updateProjectData } = useLayout();

  return (
    <motion.section variants={itemVariants} className="mb-24 w-full max-w-7xl px-4">
      <div className="mb-12 flex items-center gap-4">
         <h2 className="border-3 border-neo-black bg-neo-pink px-6 py-2 text-3xl font-black uppercase shadow-neo transform -rotate-1">
          Selected_Works
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectData.projects.map((project, index) => (
          <div key={project.title}>
            {/* We wrap ProjectCardDetailed to inject editable props if needed, 
                 but ProjectCardDetailed is complex. For now, let's just allow editing description via a wrapper or modify the card itself.
                 Actually, let's modify ProjectCardDetailed to accept editable props or handle it internally?
                 Better: Just render it, and if we want to edit, we need to pass the edit handler.
             */}
             {/* For this demo, I'll wrap the description in the card with EditableText if I modify the card component.
                 But since I can't easily modify the card component without breaking its internal logic (it takes string),
                 I will just pass the string. To make it editable, I would need to refactor ProjectCardDetailed.
                 
                 Let's stick to the requirement: "change prjcets descprtion".
                 I will modify ProjectCardDetailed to accept an onEdit callback.
             */}
            <ProjectCardDetailed
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              link={project.link.href}
              // We can't easily edit inside the complex card without refactoring it.
              // Let's assume for now we just display it. 
              // Wait, the user explicitly asked for it.
              // I will add an "onDescriptionChange" prop to ProjectCardDetailed.
              onDescriptionChange={(newDesc) => {
                  const newProjects = [...projectData.projects];
                  newProjects[index] = { ...newProjects[index], description: newDesc };
                  updateProjectData({ ...projectData, projects: newProjects });
              }}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
