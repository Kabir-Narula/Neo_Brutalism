"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";
import { useRef, Suspense, useMemo, useState, useEffect } from "react";
import { Monolith } from "./Monolith";

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => {
    const data = new Float32Array(1500 * 3); 
    random.inSphere(data, { radius: 6.5 });  
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  }, []);

  useFrame((_state: RootState, delta: number) => {
    if (ref.current) {
      ref.current.rotation.y -= delta / 30;
      ref.current.rotation.x -= delta / 50;
    }
    // Request next frame
    _state.invalidate();
  });

  return (
    <group rotation={[0, 0, Math.PI / 4] as [number, number, number]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#CCFF00"
          size={0.018}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
}

export default function KineticBackground() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
    setMounted(true);
  }, []);

  if (!mounted || !hasWebGL) {
    return (
      <>
        <div className="fixed inset-0 z-[-1] h-full w-full pointer-events-none opacity-[0.03]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
             }} 
        />
        <div className="fixed inset-0 -z-10 h-full w-full bg-cream" />
        {!mounted && (
          <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none" role="status" aria-live="polite">
            <div className="border-3 border-neo-black bg-white px-6 py-3 shadow-neo">
              <span className="font-mono text-sm font-bold text-neo-dark-grey">LOADING_3D_SCENE...</span>
            </div>
          </div>
        )}
        {!hasWebGL && mounted && (
          <div className="fixed bottom-4 left-4 -z-10 border-2 border-neo-black bg-neo-pink text-white px-4 py-2 text-xs font-bold shadow-neo" role="alert">
            WebGL not supported. Using fallback mode.
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[-1] h-full w-full pointer-events-none opacity-[0.03]"
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }} 
      />

      <div className="fixed inset-0 -z-10 h-full w-full bg-cream">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            depth: false,
            stencil: false
          }} 
          frameloop="demand"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10] as [number, number, number]} />
          
          <Suspense fallback={null}>
            <ParticleField />
            <Monolith position={[3, 0, 0]} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
