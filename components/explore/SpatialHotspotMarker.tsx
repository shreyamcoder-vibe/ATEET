"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ArchiveRecord } from "@/lib/archive/types";

interface SpatialHotspotMarkerProps {
  record: ArchiveRecord;
  isSelected: boolean;
  onSelect: (record: ArchiveRecord) => void;
}

export function SpatialHotspotMarker({
  record,
  isSelected,
  onSelect,
}: SpatialHotspotMarkerProps) {
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const gemRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const coords = record.hotspot?.spatialCoordinates3D;

  // Clean up cursor on unmount
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulseRingRef.current) {
      const scale = 1.0 + Math.sin(t * 3.5) * 0.15;
      pulseRingRef.current.scale.set(scale, scale, scale);
    }
    if (gemRef.current) {
      gemRef.current.rotation.y = t * 1.2;
    }
  });

  // Canvas-native billboard sprite texture (replaces Drei <Html> DOM portal)
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const label = record.hotspot?.label ?? record.id;
    const active = isSelected || hovered;

    ctx.clearRect(0, 0, 512, 128);

    // Rounded rectangle pill
    const x = 16;
    const y = 16;
    const w = 480;
    const h = 96;
    const r = 48;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = active ? "rgba(22, 26, 19, 0.96)" : "rgba(16, 18, 15, 0.88)";
    ctx.fill();

    ctx.strokeStyle = isSelected
      ? "#dfc18a"
      : hovered
      ? "#c6a66b"
      : "rgba(198, 166, 107, 0.4)";
    ctx.lineWidth = active ? 4 : 2;
    ctx.stroke();

    // Status beacon dot
    ctx.beginPath();
    ctx.arc(x + 44, y + 48, 12, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#dfc18a" : "#34d399";
    ctx.fill();

    // Hotspot Label text
    ctx.fillStyle = active ? "#ffffff" : "#f2eee4";
    ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 72, y + 50, w - 90);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [record.hotspot?.label, record.id, isSelected, hovered]);

  // Texture cleanup
  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!coords) return null;

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect(record);
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(false);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "auto";
    }
  };

  const spriteScale: [number, number, number] = isSelected
    ? [2.4, 0.6, 1]
    : hovered
    ? [2.3, 0.575, 1]
    : [2.1, 0.525, 1];

  return (
    <group
      position={[coords.x, coords.y, coords.z]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 3D Vertical Beacon Line */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
        <meshBasicMaterial
          color={isSelected ? "#dfc18a" : "#c6a66b"}
          transparent
          opacity={isSelected ? 0.9 : 0.6}
        />
      </mesh>

      {/* Ground Pulse Disc */}
      <mesh
        ref={pulseRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <ringGeometry args={[0.3, 0.45, 24]} />
        <meshBasicMaterial
          color={isSelected ? "#dfc18a" : "#c6a66b"}
          side={THREE.DoubleSide}
          transparent
          opacity={isSelected ? 0.9 : 0.6}
        />
      </mesh>

      {/* 3D Rotating Beacon Head Diamond */}
      <mesh ref={gemRef} position={[0, 0.95, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={isSelected ? "#dfc18a" : hovered ? "#e5c890" : "#c6a66b"}
          emissive={isSelected ? "#dfc18a" : "#c6a66b"}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Native Three.js Billboard Text Sprite (Zero DOM manipulation) */}
      {texture && (
        <sprite position={[0, 1.45, 0]} scale={spriteScale}>
          <spriteMaterial
            map={texture}
            transparent
            depthTest={false}
          />
        </sprite>
      )}
    </group>
  );
}
