import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function FloatingImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "https://i.imgur.com/LJhDPBp.png");

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Subtle floating motion
    meshRef.current.position.x = Math.sin(state.clock.elapsedTime) * 0.3;
    meshRef.current.position.y = Math.cos(state.clock.elapsedTime) * 0.2;

    // Gentle rotation
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} transparent opacity={0.5} />
    </mesh>
  );
}

function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <FloatingImage />
      </Canvas>
    </div>
  );
}

export default ThreeBackground;
