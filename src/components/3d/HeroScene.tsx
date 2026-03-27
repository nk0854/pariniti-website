"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import ExhibitionStall from "./ExhibitionStall";

function RotatingStall() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [size]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle left-right sway only, no full 360 rotation
    const swayY = Math.sin(t * 0.3) * 0.35;
    const mouseInfluenceY = mouseRef.current.x * 0.15;
    const mouseInfluenceX = mouseRef.current.y * 0.04;

    groupRef.current.rotation.y = swayY + mouseInfluenceY;
    groupRef.current.rotation.x = THREE.MathUtils.clamp(
      mouseInfluenceX,
      -0.06,
      0.06
    );
  });

  return (
    <group ref={groupRef}>
      <ExhibitionStall scale={1} />
    </group>
  );
}

function LoadingFallback() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 1.2;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#B8952C"
        roughness={0.4}
        metalness={0.6}
        wireframe
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          minHeight: 400,
        }}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [6, 4.5, 8], fov: 40 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{ position: "absolute", inset: 0, background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <hemisphereLight
          color="#ffffff"
          groundColor="#f5f0e8"
          intensity={0.4}
        />

        <directionalLight
          position={[5, 8, 5]}
          intensity={1.0}
          color="#fff8e7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0001}
        />

        <directionalLight
          position={[-4, 6, 3]}
          intensity={0.4}
          color="#ffffff"
        />

        <directionalLight
          position={[0, 5, -5]}
          intensity={0.3}
          color="#fff5e0"
        />

        <Suspense fallback={<LoadingFallback />}>
          <RotatingStall />
          <Environment preset="studio" />
        </Suspense>

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.13, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.08} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={6}
          maxDistance={14}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.4}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
          enableDamping
          dampingFactor={0.05}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
