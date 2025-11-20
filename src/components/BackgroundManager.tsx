"use client";

import dynamic from "next/dynamic";

// Lazy load the Heavy 3D component
const KineticBackground = dynamic(() => import("@/components/KineticBackground"), {
  ssr: false,
  loading: () => null,
});

export function BackgroundManager() {
  return <KineticBackground />;
}

