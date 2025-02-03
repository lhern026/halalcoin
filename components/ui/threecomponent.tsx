import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function FloatingImage() {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, "https://i.imgur.com/LJhDPBp.png");

  const [float, setFloat] = useState({
    x: 0,
    y: 0,
    z: 0,
    xSpeed: 0.3,
    ySpeed: 0.2,
    zSpeed: 0.1,
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Floating movement with more pronounced motion
    float.x += float.xSpeed * delta;
    float.y += float.ySpeed * delta;

    // Wider range of movement
    if (Math.abs(float.x) > 1) float.xSpeed *= -1;
    if (Math.abs(float.y) > 1) float.ySpeed *= -1;

    meshRef.current.position.x = float.x * 0.5;
    meshRef.current.position.y = float.y * 0.5;

    // Slight rotation
    meshRef.current.rotation.z += delta * 0.2;
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
