"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ArchiveRecord, MonumentId } from "@/lib/archive/types";
import { ProceduralAdalajStepwell } from "./ProceduralAdalajStepwell";
import { ProceduralRaniKiVav } from "./ProceduralRaniKiVav";
import { SpatialHotspotMarker } from "./SpatialHotspotMarker";
import { ArchitecturalSection } from "./architecturalSections";

export type CameraPreset =
  | "three_quarter"
  | "long_axis"
  | "entrance"
  | "top_down";

const MONUMENT_PRESETS: Record<
  MonumentId,
  Record<CameraPreset, { position: [number, number, number]; target: [number, number, number] }>
> = {
  adalaj_stepwell: {
    three_quarter: {
      position: [18, 14, 22],
      target: [0, -7, -1],
    },
    long_axis: {
      position: [24, 7, -2],
      target: [0, -8, -2],
    },
    entrance: {
      position: [0, 8, 24],
      target: [0, -2, 10],
    },
    top_down: {
      position: [0.1, 32, -5.5],
      target: [0, -10, -5.5],
    },
  },
  rani_ki_vav: {
    three_quarter: {
      position: [20, 16, 24],
      target: [0, -9, 0],
    },
    long_axis: {
      position: [26, 8, -3],
      target: [0, -11, -3],
    },
    entrance: {
      position: [0, 9, 25],
      target: [0, -2, 12],
    },
    top_down: {
      position: [0.1, 34, -4],
      target: [0, -12, -4],
    },
  },
};

interface CameraControllerProps {
  monumentId: MonumentId;
  preset: CameraPreset;
  activeSection: ArchitecturalSection | null;
  resetSignal: number;
}

function CameraController({
  monumentId,
  preset,
  activeSection,
  resetSignal,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    if (activeSection) {
      // Focus directly on the selected architectural section
      camera.position.set(...activeSection.cameraPosition);
      controlsRef.current.target.set(...activeSection.cameraTarget);
      controlsRef.current.update();
    } else {
      // Use general camera preset for the active monument
      const monumentConfig = MONUMENT_PRESETS[monumentId] || MONUMENT_PRESETS.adalaj_stepwell;
      const config = monumentConfig[preset] || monumentConfig.three_quarter;

      camera.position.set(...config.position);
      controlsRef.current.target.set(...config.target);
      controlsRef.current.update();
    }
  }, [monumentId, preset, activeSection, resetSignal, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={5}
      maxDistance={65}
      maxPolarAngle={Math.PI / 2 + 0.08}
      target={
        activeSection
          ? activeSection.cameraTarget
          : MONUMENT_PRESETS[monumentId].three_quarter.target
      }
    />
  );
}

interface DualMonumentCanvasProps {
  activeMonument: MonumentId;
  hotspots: ArchiveRecord[];
  selectedHotspotId: string | null;
  onSelectHotspot: (record: ArchiveRecord) => void;
  currentPreset: CameraPreset;
  activeSection: ArchitecturalSection | null;
  resetSignal: number;
}

export function DualMonumentCanvas({
  activeMonument,
  hotspots,
  selectedHotspotId,
  onSelectHotspot,
  currentPreset,
  activeSection,
  resetSignal,
}: DualMonumentCanvasProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera
          makeDefault
          fov={42}
          position={MONUMENT_PRESETS[activeMonument].three_quarter.position}
          near={0.5}
          far={140}
        />

        <CameraController
          monumentId={activeMonument}
          preset={currentPreset}
          activeSection={activeSection}
          resetSignal={resetSignal}
        />

        <Suspense fallback={null}>
          {/* Active Monument Procedural Architecture */}
          {activeMonument === "adalaj_stepwell" ? (
            <ProceduralAdalajStepwell />
          ) : (
            <ProceduralRaniKiVav />
          )}

          {/* Interactive 3D Spatial Hotspots */}
          {hotspots.map((record) => (
            <SpatialHotspotMarker
              key={record.id}
              record={record}
              isSelected={record.id === selectedHotspotId}
              onSelect={onSelectHotspot}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

