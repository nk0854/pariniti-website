"use client";

import React, { Suspense, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Interactive 3D stall configurator                                  */
/*                                                                     */
/*  Props:                                                             */
/*    stallSize  – 9 | 12 | 18 | 24 | 36   (sqm)                      */
/*    openSides  – 1 | 2 | 3 | 4                                      */
/*    budget     – 'basic' | 'standard' | 'premium'                    */
/* ------------------------------------------------------------------ */

interface ConfiguratorSceneProps {
  stallSize?: number;
  openSides?: number;
  budget?: "basic" | "standard" | "premium";
}

/* ------------------------------------------------------------------ */
/*  Configurable stall mesh group                                      */
/* ------------------------------------------------------------------ */

interface StallMeshProps {
  stallSize: number;
  openSides: number;
  budget: "basic" | "standard" | "premium";
}

function ConfigurableStall({ stallSize, openSides, budget }: StallMeshProps) {
  /* ---------- Dimensions from area ---------- */
  const dims = useMemo(() => {
    // Approximate width:depth ratios for different sizes
    switch (stallSize) {
      case 9:
        return { w: 3, d: 3, h: 2.8 };
      case 12:
        return { w: 4, d: 3, h: 2.8 };
      case 18:
        return { w: 4.5, d: 4, h: 3.0 };
      case 24:
        return { w: 6, d: 4, h: 3.2 };
      case 36:
        return { w: 6, d: 6, h: 3.4 };
      default:
        return { w: 4, d: 3, h: 2.8 };
    }
  }, [stallSize]);

  const hw = dims.w / 2;
  const hd = dims.d / 2;
  const wt = 0.08; // wall thickness
  const wallH = dims.h * 0.85;

  /* ---------- Materials palette ---------- */
  const mats = useMemo(() => {
    const gold = new THREE.Color("#D4AF37");
    const neon = new THREE.Color("#00D4FF");

    switch (budget) {
      case "basic":
        return {
          floor: new THREE.MeshStandardMaterial({
            color: "#cccccc",
            roughness: 0.6,
            metalness: 0.1,
          }),
          wall: new THREE.MeshStandardMaterial({
            color: "#f0f0f0",
            roughness: 0.7,
            metalness: 0.05,
          }),
          trim: new THREE.MeshStandardMaterial({
            color: "#888888",
            roughness: 0.5,
            metalness: 0.3,
          }),
          frame: new THREE.MeshStandardMaterial({
            color: "#aaaaaa",
            roughness: 0.5,
            metalness: 0.3,
          }),
          stand: new THREE.MeshStandardMaterial({
            color: "#dddddd",
            roughness: 0.6,
            metalness: 0.1,
          }),
          desk: new THREE.MeshStandardMaterial({
            color: "#bbbbbb",
            roughness: 0.5,
            metalness: 0.2,
          }),
          led: null as unknown as THREE.MeshStandardMaterial,
          glass: null as unknown as THREE.MeshPhysicalMaterial,
        };
      case "standard":
        return {
          floor: new THREE.MeshStandardMaterial({
            color: "#1a1a1a",
            roughness: 0.3,
            metalness: 0.6,
          }),
          wall: new THREE.MeshStandardMaterial({
            color: "#222222",
            roughness: 0.4,
            metalness: 0.5,
          }),
          trim: new THREE.MeshStandardMaterial({
            color: "#888888",
            roughness: 0.35,
            metalness: 0.6,
          }),
          frame: new THREE.MeshStandardMaterial({
            color: "#333333",
            roughness: 0.35,
            metalness: 0.6,
          }),
          stand: new THREE.MeshStandardMaterial({
            color: "#e0e0e0",
            roughness: 0.5,
            metalness: 0.2,
          }),
          desk: new THREE.MeshStandardMaterial({
            color: "#2a2a2a",
            roughness: 0.3,
            metalness: 0.7,
          }),
          led: new THREE.MeshStandardMaterial({
            color: neon,
            emissive: neon,
            emissiveIntensity: 1.2,
            roughness: 0.1,
          }),
          glass: null as THREE.MeshPhysicalMaterial | null,
        };
      case "premium":
      default:
        return {
          floor: new THREE.MeshStandardMaterial({
            color: "#0A0A0A",
            roughness: 0.12,
            metalness: 0.9,
          }),
          wall: new THREE.MeshStandardMaterial({
            color: "#111111",
            roughness: 0.3,
            metalness: 0.7,
          }),
          trim: new THREE.MeshStandardMaterial({
            color: gold,
            emissive: gold,
            emissiveIntensity: 0.3,
            roughness: 0.2,
            metalness: 0.9,
          }),
          frame: new THREE.MeshStandardMaterial({
            color: "#1a1a1a",
            roughness: 0.25,
            metalness: 0.8,
          }),
          stand: new THREE.MeshStandardMaterial({
            color: "#e0e0e0",
            roughness: 0.4,
            metalness: 0.3,
          }),
          desk: new THREE.MeshStandardMaterial({
            color: "#1a1a1a",
            roughness: 0.2,
            metalness: 0.85,
          }),
          led: new THREE.MeshStandardMaterial({
            color: neon,
            emissive: neon,
            emissiveIntensity: 1.6,
            roughness: 0.1,
          }),
          glass: new THREE.MeshPhysicalMaterial({
            color: "#ffffff",
            roughness: 0.05,
            transmission: 0.9,
            thickness: 0.3,
            transparent: true,
            opacity: 0.25,
          }),
        };
    }
  }, [budget]);

  /* ---------- Which walls exist ---------- */
  // Sides: back=0, left=1, right=2, front=3
  // openSides=1 => front open, others closed
  // openSides=2 => front + right open
  // openSides=3 => front + right + left open
  // openSides=4 => all open (just canopy)
  const showBack = openSides < 4;
  const showLeft = openSides < 3;
  const showRight = openSides < 2;
  const showFront = false; // front is always open for visitor access

  const isPremium = budget === "premium";
  const hasLed = budget === "standard" || budget === "premium";

  return (
    <group>
      {/* ===== Floor platform ===== */}
      <mesh position={[0, -0.03, 0]} material={mats.floor} receiveShadow>
        <boxGeometry args={[dims.w, 0.06, dims.d]} />
      </mesh>

      {/* ===== Grid lines (premium & standard) ===== */}
      {hasLed &&
        Array.from({ length: Math.floor(dims.w / 0.5) + 1 }).map((_, i) => (
          <mesh
            key={`gx-${i}`}
            position={[-hw + i * 0.5, 0.002, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.003, dims.d]} />
            <meshStandardMaterial
              color="#00D4FF"
              emissive="#00D4FF"
              emissiveIntensity={0.1}
              transparent
              opacity={0.15}
            />
          </mesh>
        ))}

      {/* ===== BACK WALL ===== */}
      {showBack && (
        <>
          <mesh
            position={[0, wallH / 2, -hd + wt / 2]}
            material={mats.wall}
            castShadow
          >
            <boxGeometry args={[dims.w, wallH, wt]} />
          </mesh>
          {/* Trim strip */}
          <mesh position={[0, wallH - 0.02, -hd + wt / 2 + 0.01]}>
            <boxGeometry args={[dims.w, 0.05, wt + 0.02]} />
            <primitive object={mats.trim} attach="material" />
          </mesh>
          {hasLed && mats.led && (
            <mesh position={[0, 0.04, -hd + wt + 0.01]}>
              <boxGeometry args={[dims.w * 0.9, 0.03, 0.03]} />
              <primitive object={mats.led} attach="material" />
            </mesh>
          )}
        </>
      )}

      {/* ===== LEFT WALL ===== */}
      {showLeft && (
        <>
          {isPremium && mats.glass ? (
            <mesh position={[-hw + wt / 2, wallH * 0.35, 0]} castShadow>
              <boxGeometry args={[wt, wallH * 0.7, dims.d]} />
              <primitive object={mats.glass} attach="material" />
            </mesh>
          ) : (
            <mesh
              position={[-hw + wt / 2, wallH / 2, 0]}
              material={mats.wall}
              castShadow
            >
              <boxGeometry args={[wt, wallH, dims.d]} />
            </mesh>
          )}
          {/* Trim */}
          <mesh position={[-hw + wt / 2, wallH - 0.02, 0]}>
            <boxGeometry args={[wt + 0.02, 0.04, dims.d]} />
            <primitive object={mats.trim} attach="material" />
          </mesh>
        </>
      )}

      {/* ===== RIGHT WALL ===== */}
      {showRight && (
        <>
          {isPremium && mats.glass ? (
            <mesh position={[hw - wt / 2, wallH * 0.35, 0]} castShadow>
              <boxGeometry args={[wt, wallH * 0.7, dims.d]} />
              <primitive object={mats.glass} attach="material" />
            </mesh>
          ) : (
            <mesh
              position={[hw - wt / 2, wallH / 2, 0]}
              material={mats.wall}
              castShadow
            >
              <boxGeometry args={[wt, wallH, dims.d]} />
            </mesh>
          )}
          <mesh position={[hw - wt / 2, wallH - 0.02, 0]}>
            <boxGeometry args={[wt + 0.02, 0.04, dims.d]} />
            <primitive object={mats.trim} attach="material" />
          </mesh>
        </>
      )}

      {/* ===== FRONT WALL (only when openSides < 1 which never happens, but defensive) ===== */}
      {showFront && (
        <mesh
          position={[0, wallH / 2, hd - wt / 2]}
          material={mats.wall}
          castShadow
        >
          <boxGeometry args={[dims.w, wallH, wt]} />
        </mesh>
      )}

      {/* ===== CANOPY FRAME ===== */}
      <group position={[0, wallH + 0.04, 0]}>
        {/* Four horizontal beams */}
        <mesh position={[0, 0, hd]} material={mats.frame}>
          <boxGeometry args={[dims.w + 0.1, 0.05, 0.05]} />
        </mesh>
        <mesh position={[0, 0, -hd]} material={mats.frame}>
          <boxGeometry args={[dims.w + 0.1, 0.05, 0.05]} />
        </mesh>
        <mesh position={[-hw, 0, 0]} material={mats.frame}>
          <boxGeometry args={[0.05, 0.05, dims.d + 0.1]} />
        </mesh>
        <mesh position={[hw, 0, 0]} material={mats.frame}>
          <boxGeometry args={[0.05, 0.05, dims.d + 0.1]} />
        </mesh>
        {/* Cross beams */}
        <mesh position={[0, 0, 0]} material={mats.frame}>
          <boxGeometry args={[dims.w, 0.03, 0.03]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={mats.frame}>
          <boxGeometry args={[0.03, 0.03, dims.d]} />
        </mesh>

        {/* LED on canopy front edge */}
        {hasLed && mats.led && (
          <mesh position={[0, -0.03, hd]}>
            <boxGeometry args={[dims.w, 0.02, 0.02]} />
            <primitive object={mats.led} attach="material" />
          </mesh>
        )}
      </group>

      {/* ===== VERTICAL POSTS at corners ===== */}
      {[
        [-hw, hd],
        [hw, hd],
        [-hw, -hd],
        [hw, -hd],
      ].map(([x, z], i) => (
        <mesh
          key={`post-${i}`}
          position={[x, wallH / 2, z]}
          material={mats.frame}
          castShadow
        >
          <boxGeometry args={[0.06, wallH + 0.1, 0.06]} />
        </mesh>
      ))}

      {/* ===== LED VERTICAL STRIPS at front corners ===== */}
      {hasLed &&
        mats.led &&
        [
          [-hw + 0.01, hd - 0.01],
          [hw - 0.01, hd - 0.01],
        ].map(([x, z], i) => (
          <mesh
            key={`led-v-${i}`}
            position={[x, wallH / 2, z]}
          >
            <boxGeometry args={[0.025, wallH, 0.025]} />
            <primitive object={mats.led} attach="material" />
          </mesh>
        ))}

      {/* ===== RECEPTION DESK ===== */}
      <mesh position={[0, 0.4, hd * 0.6]} material={mats.desk} castShadow>
        <boxGeometry args={[dims.w * 0.35, 0.8, 0.4]} />
      </mesh>
      <mesh position={[0, 0.82, hd * 0.6]}>
        <boxGeometry args={[dims.w * 0.37, 0.03, 0.42]} />
        <primitive object={mats.trim} attach="material" />
      </mesh>

      {/* ===== DISPLAY STANDS ===== */}
      {/* Center stand */}
      <mesh
        position={[0, 0.35, -hd * 0.35]}
        material={mats.stand}
        castShadow
      >
        <cylinderGeometry args={[0.16, 0.18, 0.7, 20]} />
      </mesh>
      <mesh position={[0, 0.72, -hd * 0.35]}>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
        <primitive object={mats.trim} attach="material" />
      </mesh>

      {/* Side stands for larger stalls */}
      {stallSize >= 18 && (
        <>
          <mesh
            position={[-hw * 0.5, 0.28, 0]}
            material={mats.stand}
            castShadow
          >
            <boxGeometry args={[0.3, 0.56, 0.3]} />
          </mesh>
          <mesh position={[-hw * 0.5, 0.58, 0]}>
            <boxGeometry args={[0.34, 0.025, 0.34]} />
            <primitive object={mats.trim} attach="material" />
          </mesh>

          <mesh
            position={[hw * 0.5, 0.28, 0]}
            material={mats.stand}
            castShadow
          >
            <boxGeometry args={[0.3, 0.56, 0.3]} />
          </mesh>
          <mesh position={[hw * 0.5, 0.58, 0]}>
            <boxGeometry args={[0.34, 0.025, 0.34]} />
            <primitive object={mats.trim} attach="material" />
          </mesh>
        </>
      )}

      {/* ===== GLASS PANELS for premium (decorative partitions) ===== */}
      {isPremium && mats.glass && stallSize >= 18 && (
        <>
          <mesh position={[-hw * 0.3, wallH * 0.3, hd * 0.15]}>
            <boxGeometry args={[0.03, wallH * 0.6, 0.8]} />
            <primitive object={mats.glass} attach="material" />
          </mesh>
          <mesh position={[hw * 0.3, wallH * 0.3, hd * 0.15]}>
            <boxGeometry args={[0.03, wallH * 0.6, 0.8]} />
            <primitive object={mats.glass} attach="material" />
          </mesh>
        </>
      )}

      {/* ===== LIGHTING ===== */}
      <spotLight
        position={[0, dims.h + 2, 0]}
        angle={0.55}
        penumbra={0.7}
        intensity={isPremium ? 50 : budget === "standard" ? 35 : 25}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {budget !== "basic" && (
        <>
          <pointLight
            position={[0, 0.1, hd * 0.6]}
            intensity={2}
            color="#00D4FF"
            distance={dims.w}
          />
          <spotLight
            position={[-hw * 0.8, dims.h + 1, hd * 0.5]}
            angle={0.5}
            penumbra={0.6}
            intensity={isPremium ? 20 : 12}
            color="#D4AF37"
          />
          <spotLight
            position={[hw * 0.8, dims.h + 1, hd * 0.5]}
            angle={0.5}
            penumbra={0.6}
            intensity={isPremium ? 20 : 12}
            color="#D4AF37"
          />
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading fallback                                                   */
/* ------------------------------------------------------------------ */

function LoadingIndicator() {
  return (
    <mesh>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#D4AF37" wireframe />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported ConfiguratorScene                                         */
/* ------------------------------------------------------------------ */

export default function ConfiguratorScene({
  stallSize = 12,
  openSides = 1,
  budget = "standard",
}: ConfiguratorSceneProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Clamp values */
  const clampedOpen = Math.min(Math.max(openSides, 1), 4);
  const validSizes = [9, 12, 18, 24, 36];
  const clampedSize = validSizes.includes(stallSize) ? stallSize : 12;

  /* Camera distance based on stall size */
  const camDist = useMemo(() => {
    if (clampedSize <= 12) return 6;
    if (clampedSize <= 18) return 7.5;
    if (clampedSize <= 24) return 9;
    return 10;
  }, [clampedSize]);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          minHeight: 400,
        }}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [camDist, camDist * 0.7, camDist], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ background: "#0A0A0A" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0A0A0A", 1);
        }}
      >
        {/* Fog */}
        <fog attach="fog" args={["#0A0A0A", camDist + 4, camDist * 3.5]} />

        {/* Ambient fill */}
        <ambientLight intensity={0.2} color="#ffffff" />
        <hemisphereLight
          color="#1a1a2e"
          groundColor="#0A0A0A"
          intensity={0.25}
        />

        {/* Key light */}
        <directionalLight
          position={[6, 10, 6]}
          intensity={0.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<LoadingIndicator />}>
          <ConfigurableStall
            stallSize={clampedSize}
            openSides={clampedOpen}
            budget={budget}
          />
        </Suspense>

        {/* Ground plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.08, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#060606"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Grid helper */}
        <gridHelper
          args={[20, 40, "#1a1a1a", "#111111"]}
          position={[0, -0.07, 0]}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
}
