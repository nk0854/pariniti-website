"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";

interface ExhibitionStallProps {
  rotationY?: number;
  scale?: number;
}

/* ------------------------------------------------------------------ */
/*  Procedural 3D Exhibition Booth - Clean Apple Aesthetic              */
/*  White/cream walls, warm wood accents, gold trim.                    */
/*  No neon, no LEDs, no harsh emissive materials.                      */
/* ------------------------------------------------------------------ */

export default function ExhibitionStall({
  rotationY = 0,
  scale = 1,
}: ExhibitionStallProps) {
  const groupRef = useRef<THREE.Group>(null);

  /* ---------- colour palette ---------- */
  const GOLD = useMemo(() => new THREE.Color("#B8952C"), []);
  const WHITE = useMemo(() => new THREE.Color("#f5f5f0"), []);
  const CREAM = useMemo(() => new THREE.Color("#faf8f2"), []);
  const WARM_WOOD = useMemo(() => new THREE.Color("#8B6914"), []);
  const LIGHT_WOOD = useMemo(() => new THREE.Color("#C4A35A"), []);

  /* ---------- reusable materials (memoised) ---------- */
  const matCreamFloor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CREAM,
        roughness: 0.35,
        metalness: 0.05,
      }),
    [CREAM]
  );

  const matWhiteWall = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WHITE,
        roughness: 0.6,
        metalness: 0.0,
      }),
    [WHITE]
  );

  const matWarmWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WARM_WOOD,
        roughness: 0.45,
        metalness: 0.05,
      }),
    [WARM_WOOD]
  );

  const matLightWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LIGHT_WOOD,
        roughness: 0.5,
        metalness: 0.05,
      }),
    [LIGHT_WOOD]
  );

  const matGoldAccent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.3,
        metalness: 0.85,
      }),
    [GOLD]
  );

  const matWhitePedestal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        roughness: 0.4,
        metalness: 0.05,
      }),
    []
  );

  return (
    <group ref={groupRef} rotation-y={rotationY} scale={scale}>
      {/* ===== BASE PLATFORM ===== */}
      <mesh position={[0, -0.06, 0]} material={matCreamFloor} receiveShadow>
        <boxGeometry args={[5, 0.12, 4]} />
      </mesh>

      {/* Gold edge trim around platform */}
      {/* Front */}
      <mesh position={[0, -0.06, 2.02]} material={matGoldAccent}>
        <boxGeometry args={[5.08, 0.12, 0.04]} />
      </mesh>
      {/* Back */}
      <mesh position={[0, -0.06, -2.02]} material={matGoldAccent}>
        <boxGeometry args={[5.08, 0.12, 0.04]} />
      </mesh>
      {/* Left */}
      <mesh position={[-2.52, -0.06, 0]} material={matGoldAccent}>
        <boxGeometry args={[0.04, 0.12, 4.08]} />
      </mesh>
      {/* Right */}
      <mesh position={[2.52, -0.06, 0]} material={matGoldAccent}>
        <boxGeometry args={[0.04, 0.12, 4.08]} />
      </mesh>

      {/* ===== BACK WALL ===== */}
      <mesh position={[0, 1.5, -1.95]} material={matWhiteWall} castShadow receiveShadow>
        <boxGeometry args={[5, 3, 0.1]} />
      </mesh>
      {/* Wood accent strip at bottom of back wall */}
      <mesh position={[0, 0.15, -1.88]} material={matWarmWood}>
        <boxGeometry args={[4.9, 0.3, 0.04]} />
      </mesh>
      {/* Gold accent strip at top of back wall */}
      <mesh position={[0, 2.98, -1.88]} material={matGoldAccent}>
        <boxGeometry args={[5, 0.06, 0.06]} />
      </mesh>

      {/* ===== SIDE WALLS (partial height, warm wood panel lower half) ===== */}
      {/* Left side - upper white */}
      <mesh position={[-2.46, 1.8, -0.5]} material={matWhiteWall} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.4, 2.8]} />
      </mesh>
      {/* Left side - lower wood panel */}
      <mesh position={[-2.46, 0.55, -0.5]} material={matLightWood} castShadow>
        <boxGeometry args={[0.08, 1.1, 2.8]} />
      </mesh>
      {/* Left gold trim at junction */}
      <mesh position={[-2.46, 1.1, -0.5]} material={matGoldAccent}>
        <boxGeometry args={[0.1, 0.03, 2.82]} />
      </mesh>

      {/* Right side - upper white */}
      <mesh position={[2.46, 1.8, -0.5]} material={matWhiteWall} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.4, 2.8]} />
      </mesh>
      {/* Right side - lower wood panel */}
      <mesh position={[2.46, 0.55, -0.5]} material={matLightWood} castShadow>
        <boxGeometry args={[0.08, 1.1, 2.8]} />
      </mesh>
      {/* Right gold trim at junction */}
      <mesh position={[2.46, 1.1, -0.5]} material={matGoldAccent}>
        <boxGeometry args={[0.1, 0.03, 2.82]} />
      </mesh>

      {/* ===== RECEPTION DESK ===== */}
      {/* Main desk body - warm wood */}
      <mesh position={[0, 0.45, 1.3]} material={matWarmWood} castShadow>
        <boxGeometry args={[1.8, 0.9, 0.6]} />
      </mesh>
      {/* Desk top surface - white */}
      <mesh position={[0, 0.92, 1.3]} material={matWhitePedestal}>
        <boxGeometry args={[1.84, 0.04, 0.64]} />
      </mesh>
      {/* Desk gold front trim */}
      <mesh position={[0, 0.92, 1.62]} material={matGoldAccent}>
        <boxGeometry args={[1.84, 0.04, 0.02]} />
      </mesh>

      {/* ===== OVERHEAD CANOPY FRAME (clean wood beams) ===== */}
      {/* Front beam */}
      <mesh position={[0, 3.05, 0.95]} material={matWarmWood}>
        <boxGeometry args={[5.1, 0.08, 0.08]} />
      </mesh>
      {/* Back beam */}
      <mesh position={[0, 3.05, -1.95]} material={matWarmWood}>
        <boxGeometry args={[5.1, 0.08, 0.08]} />
      </mesh>
      {/* Left beam */}
      <mesh position={[-2.48, 3.05, -0.5]} material={matWarmWood}>
        <boxGeometry args={[0.08, 0.08, 2.98]} />
      </mesh>
      {/* Right beam */}
      <mesh position={[2.48, 3.05, -0.5]} material={matWarmWood}>
        <boxGeometry args={[0.08, 0.08, 2.98]} />
      </mesh>
      {/* Cross beams */}
      <mesh position={[0, 3.05, -0.5]} material={matWarmWood}>
        <boxGeometry args={[5, 0.06, 0.06]} />
      </mesh>
      <mesh position={[0, 3.05, -0.5]} material={matWarmWood}>
        <boxGeometry args={[0.06, 0.06, 2.96]} />
      </mesh>
      {/* Gold trim on canopy front edge */}
      <mesh position={[0, 3.0, 0.95]} material={matGoldAccent}>
        <boxGeometry args={[5.12, 0.03, 0.03]} />
      </mesh>
      {/* Canopy top surface (thin white panel) */}
      <mesh position={[0, 3.1, -0.5]} material={matWhiteWall}>
        <boxGeometry args={[5.1, 0.02, 3.0]} />
      </mesh>

      {/* ===== DISPLAY STANDS ===== */}
      {/* Stand 1 - cylinder pedestal (left) */}
      <mesh position={[-1.4, 0.45, -0.8]} material={matWhitePedestal} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.9, 32]} />
      </mesh>
      <mesh position={[-1.4, 0.92, -0.8]} material={matGoldAccent}>
        <cylinderGeometry args={[0.24, 0.24, 0.03, 32]} />
      </mesh>

      {/* Stand 2 - box pedestal (center, taller) */}
      <mesh position={[0, 0.55, -1.0]} material={matWhitePedestal} castShadow>
        <boxGeometry args={[0.5, 1.1, 0.5]} />
      </mesh>
      <mesh position={[0, 1.12, -1.0]} material={matGoldAccent}>
        <boxGeometry args={[0.54, 0.03, 0.54]} />
      </mesh>

      {/* Stand 3 - cylinder pedestal (right) */}
      <mesh position={[1.4, 0.45, -0.8]} material={matWhitePedestal} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.9, 32]} />
      </mesh>
      <mesh position={[1.4, 0.92, -0.8]} material={matGoldAccent}>
        <cylinderGeometry args={[0.24, 0.24, 0.03, 32]} />
      </mesh>

      {/* ===== LIGHTING (soft studio 3-point) ===== */}
      {/* Key light - warm overhead */}
      <spotLight
        position={[2, 5, 3]}
        angle={0.5}
        penumbra={1}
        intensity={40}
        color="#fff8e7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Fill light - softer, from the left */}
      <spotLight
        position={[-3, 4, 2]}
        angle={0.6}
        penumbra={0.9}
        intensity={20}
        color="#ffffff"
      />
      {/* Rim/back light */}
      <spotLight
        position={[0, 4, -3]}
        angle={0.5}
        penumbra={0.8}
        intensity={15}
        color="#fff5e0"
      />
    </group>
  );
}
