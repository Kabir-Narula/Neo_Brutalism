"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RESUME_DATA } from "@/resume-data";

// Use a more flexible type for runtime editing
interface EditableProject {
  title: string;
  description: string;
  techStack: readonly string[];
  link: { label: string; href: string };
}

interface EditableProjectData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: typeof RESUME_DATA.contact;
  education: typeof RESUME_DATA.education;
  work: typeof RESUME_DATA.work;
  skills: typeof RESUME_DATA.skills;
  projects: EditableProject[];
}

interface LayoutContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  sectionOrder: string[];
  setSectionOrder: (order: string[]) => void;
  projectData: EditableProjectData;
  updateProjectData: (newData: Partial<EditableProjectData>) => void;
  resetLayout: () => void;
}

const defaultOrder = ["hero", "marquee", "projects", "timeline", "connect-contact"];

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>(defaultOrder);
  const [projectData, setProjectData] = useState<EditableProjectData>({
    ...RESUME_DATA,
    projects: RESUME_DATA.projects.map(p => ({ ...p }))
  });

  // Load from localStorage on mount
  useEffect(() => {
    // We intentionally do not load saved layout/data on mount to ensure 
    // the user always sees the original layout on refresh, as requested.
    // To enable persistence, uncomment the following:
    /*
    const savedOrder = localStorage.getItem("portfolio-layout-order");
    const savedData = localStorage.getItem("portfolio-data");

    if (savedOrder) {
      try {
        setSectionOrder(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Failed to parse saved layout order");
      }
    }

    if (savedData) {
      try {
        setProjectData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved project data");
      }
    }
    */
  }, []);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleSetSectionOrder = (order: string[]) => {
    setSectionOrder(order);
    // localStorage.setItem("portfolio-layout-order", JSON.stringify(order));
  };

  const updateProjectData = (newData: Partial<EditableProjectData>) => {
    setProjectData(prev => ({ ...prev, ...newData }));
    // localStorage.setItem("portfolio-data", JSON.stringify(newData));
  };

  const resetLayout = () => {
    setSectionOrder(defaultOrder);
    setProjectData({
      ...RESUME_DATA,
      projects: RESUME_DATA.projects.map(p => ({ ...p }))
    });
    // localStorage.removeItem("portfolio-layout-order");
    // localStorage.removeItem("portfolio-data");
    // No reload needed if we just update state
  };

  return (
    <LayoutContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        sectionOrder,
        setSectionOrder: handleSetSectionOrder,
        projectData,
        updateProjectData,
        resetLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
