"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Simplified exhibition stall for portfolio / card views             */
/*  Configurations:                                                    */
/*    small  (9 sqm)  – compact, 1 open side (front)                   */
/*    medium (12-18)  – mid-size, 2 open sides (front + one side)      */
/*    large  (36 sqm) – pavilion, 3 open sides                         */
/* ------------------------------------------------------------------ */

interface FloatingStallProps {
  size?: "small" | "medium" | "large";
  color?: string;
  floating?: boolean;
}

export default function FloatingStall({
  size = "medium",
  color = "#D4AF37",
  floating = true,
}: FloatingStallProps) {
  const groupRef = useRef<THREE.Group>(null);

  /* Dimensions based on size */
  const dims = useMemo(() => {
    switch (size) {
      case "small":
        return { w: 1.8, d: 1.4, h: 1.6, wallH: 1.4, openSides: 1 };
      case "medium":
        return { w: 2.6, d: 2.0, h: 2.0, wallH: 1.6, openSides: 2 };
      case "large":
        return { w: 3.6, d: 2.8, h: 2.4, wallH: 1.8, openSides: 3 };
    }
  }, [size]);

  const accentColor = useMemo(() => new THREE.Color(color), [color]);
  const neon = useMemo(() => new THREE.Color("#00D4FF"), []);

  /* Float animation */
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (floating) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const hw = dims.w / 2;
  const hd = dims.d / 2;
  const wt = 0.05; // wall thickness

  return (
    <group ref={groupRef}>
      {/* ===== Base platform ===== */}
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <boxGeometry args={[dims.w, 0.06, dims.d]} />
        <meshStandardMaterial
          color="#0A0A0A"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* ===== Back wall (always present) ===== */}
      <mesh position={[0, dims.wallH / 2, -hd + wt / 2]} castShadow>
        <boxGeometry args={[dims.w, dims.wallH, wt]} />
        <meshStandardMaterial color="#151515" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Gold strip on back wall */}
      <mesh position={[0, dims.wallH - 0.02, -hd + wt / 2 + 0.01]}>
        <boxGeometry args={[dims.w, 0.04, wt + 0.02]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.3}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* ===== Left wall (small & medium have it) ===== */}
      {dims.openSides < 3 && (
        <mesh position={[-hw + wt / 2, dims.wallH / 2, 0]} castShadow>
          <boxGeometry args={[wt, dims.wallH, dims.d]} />
          <meshStandardMaterial
            color="#151515"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      )}

      {/* ===== Right wall (small only) ===== */}
      {dims.openSides < 2 && (
        <mesh position={[hw - wt / 2, dims.wallH / 2, 0]} castShadow>
          <boxGeometry args={[wt, dims.wallH, dims.d]} />
          <meshStandardMaterial
            color="#151515"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      )}

      {/* ===== Canopy frame ===== */}
      <group position={[0, dims.wallH + 0.03, 0]}>
        {/* Front beam */}
        <mesh position={[0, 0, hd]}>
          <boxGeometry args={[dims.w, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Back beam */}
        <mesh position={[0, 0, -hd]}>
          <boxGeometry args={[dims.w, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Left beam */}
        <mesh position={[-hw, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, dims.d]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Right beam */}
        <mesh position={[hw, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, dims.d]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </group>

      {/* ===== LED edge strip (neon) ===== */}
      <mesh position={[0, 0.01, hd - 0.01]}>
        <boxGeometry args={[dims.w, 0.02, 0.02]} />
        <meshStandardMaterial
          color={neon}
          emissive={neon}
          emissiveIntensity={1.4}
          roughness={0.1}
        />
      </mesh>

      {/* ===== Display stand ===== */}
      <mesh position={[0, 0.28, -hd * 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.56, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.58, -hd * 0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.2}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* ===== Extra stand for medium & large ===== */}
      {(size === "medium" || size === "large") && (
        <>
          <mesh position={[hw * 0.45, 0.22, hd * 0.3]} castShadow>
            <boxGeometry args={[0.28, 0.44, 0.28]} />
            <meshStandardMaterial
              color="#e0e0e0"
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
          <mesh position={[hw * 0.45, 0.45, hd * 0.3]}>
            <boxGeometry args={[0.32, 0.02, 0.32]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.2}
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>
        </>
      )}

      {/* ===== Extra stands for large ===== */}
      {size === "large" && (
        <>
          <mesh position={[-hw * 0.45, 0.22, hd * 0.3]} castShadow>
            <boxGeometry args={[0.28, 0.44, 0.28]} />
            <meshStandardMaterial
              color="#e0e0e0"
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
          <mesh position={[-hw * 0.45, 0.45, hd * 0.3]}>
            <boxGeometry args={[0.32, 0.02, 0.32]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.2}
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>
          {/* Reception counter for large */}
          <mesh position={[0, 0.3, hd * 0.7]} castShadow>
            <boxGeometry args={[dims.w * 0.4, 0.6, 0.3]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>
          <mesh position={[0, 0.61, hd * 0.7]}>
            <boxGeometry args={[dims.w * 0.42, 0.02, 0.32]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.2}
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>
        </>
      )}

      {/* ===== Lighting ===== */}
      <pointLight
        position={[0, dims.h, 0]}
        intensity={8}
        color="#ffffff"
        distance={dims.w * 2}
      />
      <pointLight
        position={[0, 0.05, hd * 0.8]}
        intensity={1.5}
        color="#00D4FF"
        distance={dims.w}
      />
    </group>
  );
}
