"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * ARCHITECTURAL PROCEDURAL RECONSTRUCTION OF RANI KI VAV (PATAN, GUJARAT, c. 1063–1068 CE)
 *
 * Grounded in archaeological surveys & UNESCO World Heritage documentation:
 * - Typology: Inverted Temple (Chaulukya / Solanki Dynasty)
 * - Patron: Queen Udayamati in memory of King Bhima I
 * - Verified dimensional anchors:
 *   - 7 Subterranean Levels descending from Ground Surface to the Deep Sacred Well
 *   - East-to-West axial corridor orientation (East entrance at +Z, West well at -Z)
 *   - Multi-tiered pillared halls (especially Level 4 Master Pavilion)
 *   - Wall friezes and sculptural niche corridors
 *   - Terminal circular well cylinder and subterranean water reservoir
 */

interface RaniPillarProps {
  position: [number, number, number];
  height?: number;
  sandstoneMaterial: THREE.Material;
  darkSandstoneMaterial: THREE.Material;
}

function RaniPillar({
  position,
  height = 3.0,
  sandstoneMaterial,
  darkSandstoneMaterial,
}: RaniPillarProps) {
  const shaftHeight = height - 0.75;

  return (
    <group position={position}>
      {/* 1. Stepped Kumbha Base */}
      <mesh
        position={[0, 0.2, 0]}
        material={darkSandstoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.55, 0.4, 0.55]} />
      </mesh>
      <mesh
        position={[0, 0.45, 0]}
        material={sandstoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.46, 0.1, 0.46]} />
      </mesh>

      {/* 2. Faceted Chaulukya Column Shaft */}
      <mesh
        position={[0, 0.5 + shaftHeight / 2, 0]}
        material={sandstoneMaterial}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.17, 0.2, shaftHeight, 12]} />
      </mesh>

      {/* 3. Carved Capital Mouldings & Ring */}
      <mesh
        position={[0, 0.5 + shaftHeight + 0.08, 0]}
        material={sandstoneMaterial}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.26, 0.18, 0.16, 12]} />
      </mesh>

      {/* 4. Ornate Roll-Corbel Capital Arms */}
      <mesh
        position={[0, 0.5 + shaftHeight + 0.2, 0]}
        material={darkSandstoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.6, 0.1, 0.32]} />
      </mesh>
      <mesh
        position={[0, 0.5 + shaftHeight + 0.2, 0]}
        material={darkSandstoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.32, 0.1, 0.6]} />
      </mesh>
    </group>
  );
}

interface RaniStairFlightProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  width: number;
  stepsCount: number;
  material: THREE.Material;
}

function RaniStairFlight({
  startPos,
  endPos,
  width,
  stepsCount,
  material,
}: RaniStairFlightProps) {
  const steps = useMemo(() => {
    const items = [];
    const dx = (endPos[0] - startPos[0]) / stepsCount;
    const dy = (endPos[1] - startPos[1]) / stepsCount;
    const dz = (endPos[2] - startPos[2]) / stepsCount;
    const stepDepth = Math.sqrt(dx * dx + dz * dz) * 1.05;
    const stepHeight = Math.abs(dy);

    for (let i = 0; i < stepsCount; i++) {
      const x = startPos[0] + dx * (i + 0.5);
      const y = startPos[1] + dy * (i + 0.5);
      const z = startPos[2] + dz * (i + 0.5);

      items.push({
        key: i,
        pos: [x, y, z] as [number, number, number],
        args: [width, Math.max(0.12, stepHeight), stepDepth] as [
          number,
          number,
          number
        ],
      });
    }
    return items;
  }, [startPos, endPos, width, stepsCount]);

  return (
    <group>
      {steps.map((step) => (
        <mesh
          key={step.key}
          position={step.pos}
          material={material}
          receiveShadow
        >
          <boxGeometry args={step.args} />
        </mesh>
      ))}
    </group>
  );
}

export function ProceduralRaniKiVav() {
  const {
    sandstonePrimary,
    sandstoneDark,
    sandstoneWeathered,
    groundSurfaceMat,
    sacredWaterMat,
    sculptureNicheMat,
  } = useMemo(() => {
    return {
      // Warm golden Patan Solanki sandstone
      sandstonePrimary: new THREE.MeshStandardMaterial({
        color: "#caa973",
        roughness: 0.82,
        metalness: 0.05,
      }),
      // Shaded subterranean gallery stone
      sandstoneDark: new THREE.MeshStandardMaterial({
        color: "#a3824f",
        roughness: 0.88,
        metalness: 0.05,
      }),
      // Weathered foundation masonry
      sandstoneWeathered: new THREE.MeshStandardMaterial({
        color: "#7a5f36",
        roughness: 0.95,
      }),
      // Semi-arid Patan terrain
      groundSurfaceMat: new THREE.MeshStandardMaterial({
        color: "#28251e",
        roughness: 0.95,
      }),
      // Deep sacred reservoir water
      sacredWaterMat: new THREE.MeshStandardMaterial({
        color: "#164547",
        roughness: 0.16,
        metalness: 0.3,
        transparent: true,
        opacity: 0.88,
      }),
      // Intricate bas-relief carving niche panels
      sculptureNicheMat: new THREE.MeshStandardMaterial({
        color: "#b8955f",
        roughness: 0.75,
        metalness: 0.08,
      }),
    };
  }, []);

  return (
    <group name="RaniKiVavProceduralModel">
      {/* =======================================================================
          1. GROUND SURFACE & STEPPED EXCAVATION ENVELOPE
          Oriented East (+Z) to West (-Z)
          ======================================================================= */}
      {/* East Surface (Approach) */}
      <mesh position={[0, 0, 18]} material={groundSurfaceMat} receiveShadow>
        <boxGeometry args={[34, 0.5, 8]} />
      </mesh>
      {/* South Terrain */}
      <mesh position={[14, 0, -2]} material={groundSurfaceMat} receiveShadow>
        <boxGeometry args={[12, 0.5, 34]} />
      </mesh>
      {/* North Terrain */}
      <mesh position={[-14, 0, -2]} material={groundSurfaceMat} receiveShadow>
        <boxGeometry args={[12, 0.5, 34]} />
      </mesh>
      {/* West Terrain (behind deep well) */}
      <mesh position={[0, 0, -21]} material={groundSurfaceMat} receiveShadow>
        <boxGeometry args={[34, 0.5, 8]} />
      </mesh>

      {/* Subterranean Side Retaining Walls (Stepped Corridor Flanks) */}
      {/* South Wall with Sculptural Tier Ledges */}
      <mesh position={[4.8, -10.5, -2]} material={sandstoneDark} receiveShadow>
        <boxGeometry args={[0.8, 21.0, 32]} />
      </mesh>
      {/* North Wall with Sculptural Tier Ledges */}
      <mesh position={[-4.8, -10.5, -2]} material={sandstoneDark} receiveShadow>
        <boxGeometry args={[0.8, 21.0, 32]} />
      </mesh>
      {/* West End Wall */}
      <mesh position={[0, -10.5, -17.5]} material={sandstoneDark} receiveShadow>
        <boxGeometry args={[10.4, 21.0, 0.8]} />
      </mesh>

      {/* Sculptural String Courses & Horizontal Niches (Dashavatara / Apsara friezes) */}
      {[-3, -6, -9, -12, -15, -18].map((y) => (
        <group key={`sculpture-tier-${y}`}>
          {/* South wall niche frieze */}
          <mesh position={[4.3, y + 1.0, -2]} material={sculptureNicheMat} receiveShadow>
            <boxGeometry args={[0.25, 1.4, 31.6]} />
          </mesh>
          {/* North wall niche frieze */}
          <mesh position={[-4.3, y + 1.0, -2]} material={sculptureNicheMat} receiveShadow>
            <boxGeometry args={[0.25, 1.4, 31.6]} />
          </mesh>
          {/* Continuous stone string course moulding */}
          <mesh position={[4.3, y, -2]} material={sandstonePrimary} receiveShadow>
            <boxGeometry args={[0.35, 0.22, 31.8]} />
          </mesh>
          <mesh position={[-4.3, y, -2]} material={sandstonePrimary} receiveShadow>
            <boxGeometry args={[0.35, 0.22, 31.8]} />
          </mesh>
        </group>
      ))}

      {/* =======================================================================
          2. LEVEL 0: EASTERN GROUND APPROACH & STEPPED ENTRY (Z = +14m)
          ======================================================================= */}
      <group position={[0, 0, 14]}>
        {/* Entry Terrace Plinth */}
        <mesh position={[0, 0.2, 0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[7.6, 0.4, 4.0]} />
        </mesh>
        {/* Gateway Flanking Pillars */}
        <RaniPillar
          position={[-2.8, 0.4, 0]}
          height={3.2}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
        <RaniPillar
          position={[2.8, 0.4, 0]}
          height={3.2}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
      </group>

      {/* Grand Flight 1: Down from Level 0 (Z: 12.5, Y: 0) to Level 1 (Z: 10.0, Y: -3.0) */}
      <RaniStairFlight
        startPos={[0, 0.2, 12.4]}
        endPos={[0, -3.0, 10.2]}
        width={6.4}
        stepsCount={14}
        material={sandstonePrimary}
      />

      {/* =======================================================================
          3. LEVEL 1: FIRST SUBTERRANEAN TERRACE (Y = -3.0m, Z = +9.0m)
          ======================================================================= */}
      <group position={[0, -3.0, 9.0]}>
        <mesh position={[0, 0.1, 0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[7.4, 0.3, 2.8]} />
        </mesh>
      </group>

      {/* Flight 2: Level 1 to Level 2 (Z: 7.6 to 5.4, Y: -3.0 to -6.0) */}
      <RaniStairFlight
        startPos={[0, -3.0, 7.6]}
        endPos={[0, -6.0, 5.6]}
        width={6.2}
        stepsCount={12}
        material={sandstonePrimary}
      />

      {/* =======================================================================
          4. LEVEL 2: SECOND TIER PAVILION (Y = -6.0m, Z = +4.5m)
          ======================================================================= */}
      <group position={[0, -6.0, 4.5]}>
        <mesh position={[0, 0.1, 0]} material={sandstoneDark} receiveShadow>
          <boxGeometry args={[7.4, 0.3, 2.6]} />
        </mesh>
        <RaniPillar
          position={[-2.6, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
        <RaniPillar
          position={[2.6, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
      </group>

      {/* Flight 3: Level 2 to Level 3 (Z: 3.2 to 1.4, Y: -6.0 to -9.0) */}
      <RaniStairFlight
        startPos={[0, -6.0, 3.2]}
        endPos={[0, -9.0, 1.6]}
        width={6.0}
        stepsCount={12}
        material={sandstoneDark}
      />

      {/* =======================================================================
          5. LEVEL 3: THIRD TIER PAVILION (Y = -9.0m, Z = +0.5m)
          ======================================================================= */}
      <group position={[0, -9.0, 0.5]}>
        <mesh position={[0, 0.1, 0]} material={sandstoneDark} receiveShadow>
          <boxGeometry args={[7.4, 0.3, 2.6]} />
        </mesh>
        <RaniPillar
          position={[-2.6, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
        <RaniPillar
          position={[2.6, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstonePrimary}
          darkSandstoneMaterial={sandstoneDark}
        />
      </group>

      {/* Flight 4: Level 3 to Level 4 Master Hall (Z: -0.8 to -2.4, Y: -9.0 to -12.0) */}
      <RaniStairFlight
        startPos={[0, -9.0, -0.8]}
        endPos={[0, -12.0, -2.4]}
        width={5.8}
        stepsCount={12}
        material={sandstoneDark}
      />

      {/* =======================================================================
          6. LEVEL 4: MASTER PILLARED HALL (THE INVERTED TEMPLE PAVILION)
          Y = -12.0m, Z = -3.8m (RKV-PHO-LEVEL4 Hotspot Zone)
          Multi-storey pillared pavilion with Vishnu / Dashavatara sculptural friezes
          ======================================================================= */}
      <group position={[0, -12.0, -3.8]}>
        {/* Main Hall Platform Floor */}
        <mesh position={[0, 0.1, 0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[7.6, 0.3, 3.4]} />
        </mesh>

        {/* 6 High-Order Solanki Pillars in Hall */}
        {[-2.6, 0, 2.6].map((x) => (
          <group key={`lvl4-pillar-pair-${x}`}>
            <RaniPillar
              position={[x, 0.25, -1.0]}
              height={3.2}
              sandstoneMaterial={sandstonePrimary}
              darkSandstoneMaterial={sandstoneDark}
            />
            <RaniPillar
              position={[x, 0.25, 1.0]}
              height={3.2}
              sandstoneMaterial={sandstonePrimary}
              darkSandstoneMaterial={sandstoneDark}
            />
          </group>
        ))}

        {/* Transverse Architraves & Sculptured Beams */}
        <mesh position={[0, 3.55, -1.0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[6.8, 0.3, 0.4]} />
        </mesh>
        <mesh position={[0, 3.55, 1.0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[6.8, 0.3, 0.4]} />
        </mesh>
        <mesh position={[-2.6, 3.55, 0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[0.4, 0.3, 2.4]} />
        </mesh>
        <mesh position={[2.6, 3.55, 0]} material={sandstonePrimary} receiveShadow>
          <boxGeometry args={[0.4, 0.3, 2.4]} />
        </mesh>

        {/* Upper Storey Gallery Canopy */}
        <mesh position={[0, 3.75, 0]} material={sandstoneWeathered} receiveShadow>
          <boxGeometry args={[7.2, 0.2, 3.0]} />
        </mesh>
      </group>

      {/* Flight 5: Level 4 to Level 5 (Z: -5.5 to -7.0, Y: -12.0 to -15.0) */}
      <RaniStairFlight
        startPos={[0, -12.0, -5.5]}
        endPos={[0, -15.0, -7.0]}
        width={5.4}
        stepsCount={12}
        material={sandstoneDark}
      />

      {/* =======================================================================
          7. LEVEL 5: LOWER PILLARED GALLERY (Y = -15.0m, Z = -8.2m)
          ======================================================================= */}
      <group position={[0, -15.0, -8.2]}>
        <mesh position={[0, 0.1, 0]} material={sandstoneDark} receiveShadow>
          <boxGeometry args={[7.4, 0.3, 2.6]} />
        </mesh>
        <RaniPillar
          position={[-2.4, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstoneDark}
          darkSandstoneMaterial={sandstoneWeathered}
        />
        <RaniPillar
          position={[2.4, 0.25, 0]}
          height={2.8}
          sandstoneMaterial={sandstoneDark}
          darkSandstoneMaterial={sandstoneWeathered}
        />
      </group>

      {/* Flight 6: Level 5 to Level 6 (Z: -9.5 to -11.0, Y: -15.0 to -18.0) */}
      <RaniStairFlight
        startPos={[0, -15.0, -9.5]}
        endPos={[0, -18.0, -11.0]}
        width={5.0}
        stepsCount={12}
        material={sandstoneWeathered}
      />

      {/* =======================================================================
          8. LEVEL 6 & 7: DEEP SACRED WATER RESERVOIR & TERMINAL WELL
          Y = -18.0m to -21.0m, Z = -12.0m to -16.0m
          ======================================================================= */}
      {/* Level 6 Platform */}
      <mesh position={[0, -17.9, -12.0]} material={sandstoneWeathered} receiveShadow>
        <boxGeometry args={[7.2, 0.3, 2.4]} />
      </mesh>

      {/* Final Stair Flight down into Level 7 Water Bed */}
      <RaniStairFlight
        startPos={[0, -18.0, -13.2]}
        endPos={[0, -20.6, -14.4]}
        width={4.4}
        stepsCount={10}
        material={sandstoneWeathered}
      />

      {/* Level 7 Subterranean Water Table & Reservoir Tank */}
      <group position={[0, -21.0, -14.6]}>
        {/* Reservoir Bed */}
        <mesh position={[0, 0, 0]} material={sandstoneWeathered} receiveShadow>
          <boxGeometry args={[6.8, 0.4, 3.6]} />
        </mesh>
        {/* Sacred Subterranean Water Plane */}
        <mesh
          position={[0, 0.35, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={sacredWaterMat}
          receiveShadow
        >
          <planeGeometry args={[6.6, 3.4]} />
        </mesh>
      </group>

      {/* Terminal Cylindrical Well (Western Shaft) */}
      <group position={[0, 0, -16.8]}>
        {/* Deep Well Cylinder descending through all 7 storeys */}
        <mesh position={[0, -10.5, 0]} material={sandstoneDark} receiveShadow>
          <cylinderGeometry args={[2.5, 2.5, 21.0, 24, 1, true]} />
        </mesh>
        {/* Surface Parapet */}
        <mesh position={[0, 0.5, 0]} material={sandstonePrimary} receiveShadow>
          <cylinderGeometry args={[2.7, 2.7, 0.8, 24, 1, true]} />
        </mesh>
        {/* Well Bottom Sacred Water Plane */}
        <mesh
          position={[0, -20.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={sacredWaterMat}
        >
          <circleGeometry args={[2.4, 24]} />
        </mesh>
      </group>

      {/* =======================================================================
          9. ATMOSPHERIC SUBTERRANEAN LIGHTING & SUNBEAM
          ======================================================================= */}
      {/* 1. Low-Angle Eastern Morning Sunlight streaming into the stepped corridor */}
      <directionalLight
        position={[14, 28, 24]}
        intensity={2.6}
        color="#fff0d0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={10}
        shadow-camera-far={70}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.0005}
      />

      {/* 2. Warm Diffuse Ambient Fill */}
      <ambientLight intensity={0.7} color="#d4be92" />

      {/* 3. Deep Shaft Penetration Light */}
      <directionalLight
        position={[0, 25, -3.8]}
        intensity={1.4}
        color="#fbe6be"
        target-position={[0, -21.0, -14.6]}
      />

      {/* 4. Turquoise Sacred Water Glow at Lowest Depths */}
      <pointLight
        position={[0, -20.0, -14.6]}
        intensity={2.0}
        distance={12}
        color="#2dd4bf"
      />
    </group>
  );
}

