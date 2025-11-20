"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";

interface MonolithProps {
  position?: [number, number, number];
}

export function Monolith({ position = [2, 0, 0] }: MonolithProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // CLEANUP: Removed unused 'useThree' and 'invalidate'
  // Since we are using frameloop="always" in the parent Canvas, we don't need to manually invalidate.

  // Create 27 cubes (3x3x3 grid)
  const count = 27;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Store initial positions for the cubes
  const positions = useMemo(() => {
    const pos = [];
    const offset = 1.2; // Spacing between cubes
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          pos.push(new THREE.Vector3(x * offset, y * offset, z * offset));
        }
      }
    }
    return pos;
  }, []);

  useFrame((state: RootState) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const explodeFactor = Math.min(scrollOffsetRef.current / 500, 1.5);

    const baseRotationX = time * 0.2;
    const baseRotationY = time * 0.3;

    for (let i = 0; i < count; i++) {
      const pos = positions[i];
      const scale = 1 + explodeFactor * 3;
      
      dummy.position.set(
        pos.x * scale,
        pos.y * scale,
        pos.z * scale
      );
      
      dummy.rotation.set(
        baseRotationX + (explodeFactor * i * 0.1),
        baseRotationY + (explodeFactor * i * 0.1),
        0
      );
      
      const s = 1 - explodeFactor * 0.3;
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = baseRotationY;
    meshRef.current.rotation.x = baseRotationX * 0.5;
    
    // Request next frame
    state.invalidate();
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count] as [any, any, number]} position={position}>
      <boxGeometry args={[1, 1, 1] as [number, number, number]} />
      <meshStandardMaterial
        color="#CCFF00"
        wireframe={true}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}
