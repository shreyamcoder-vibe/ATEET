"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ProceduralAdalajStepwell } from "./ProceduralAdalajStepwell";

export type CameraPreset =
  | "three_quarter"
  | "long_axis"
  | "entrance"
  | "top_down";

const CAMERA_PRESETS: Record<
  CameraPreset,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  three_quarter: {
    position: [18, 14, 22],
    target: [0, -7, -1],
  },
  long_axis: {
    position: [26, 4, -2],
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
};

interface CameraControllerProps {
  preset: CameraPreset;
  resetSignal: number;
}

function CameraController({ preset, resetSignal }: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const config = CAMERA_PRESETS[preset] || CAMERA_PRESETS.three_quarter;
    if (controlsRef.current) {
      // Smoothly reposition camera and orbit target
      camera.position.set(...config.position);
      controlsRef.current.target.set(...config.target);
      controlsRef.current.update();
    }
  }, [preset, resetSignal, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={6}
      maxDistance={55}
      maxPolarAngle={Math.PI / 2 + 0.08}
      target={CAMERA_PRESETS.three_quarter.target}
    />
  );
}

interface AdalajStepwellCanvasProps {
  currentPreset?: CameraPreset;
  resetSignal?: number;
}

export function AdalajStepwellCanvas({
  currentPreset = "three_quarter",
  resetSignal = 0,
}: AdalajStepwellCanvasProps) {
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
          position={CAMERA_PRESETS.three_quarter.position}
          near={0.5}
          far={120}
        />

        <CameraController preset={currentPreset} resetSignal={resetSignal} />

        <Suspense fallback={null}>
          <ProceduralAdalajStepwell />
        </Suspense>
      </Canvas>
    </div>
  );
}
