"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Maximize2,
  Info,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { ArchiveRecord, HeritageSite } from "@/lib/archive/types";
import {
  AdalajStepwellCanvas,
  CameraPreset,
} from "./AdalajStepwellCanvas";

export interface AdalajViewerProps {
  site: HeritageSite;
  hotspots: ArchiveRecord[];
}

export default function AdalajViewer({ site, hotspots }: AdalajViewerProps) {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(
    hotspots[0]?.id ?? null
  );
  const [cameraPreset, setCameraPreset] =
    useState<CameraPreset>("three_quarter");
  const [resetSignal, setResetSignal] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const selectedRecord = hotspots.find((h) => h.id === selectedHotspotId);

  const handleResetCamera = () => {
    setCameraPreset("three_quarter");
    setResetSignal((s) => s + 1);
  };

  return (
    <div className="space-y-6">
      {/* =========================================================================
          VIEWPORT CONTAINER (LIVE PROCEDURAL THREE.JS CANVAS)
          ========================================================================= */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/15 bg-[#0e100d] shadow-2xl transition-all ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
        }`}
      >
        {/* Top Control & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#131612]/95 px-4 py-3 text-xs backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wider text-emerald-400 uppercase">
              Procedural 3D Reconstruction Live
            </span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span className="hidden font-mono text-[11px] text-white/50 sm:inline">
              WebGL 2.0 Active · Three.js / R3F Engine
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 font-mono text-[11px] text-[#c6a66b] md:flex">
              <Compass size={13} />
              <span>North-South Axial Alignment (75.3m)</span>
            </div>
            <div className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70">
              Depth: {site.depthMeters}m · 5 Tiers
            </div>
          </div>
        </div>

        {/* The 3D Canvas Viewport Frame */}
        <div
          className={`relative w-full overflow-hidden bg-[#090b08] select-none ${
            isFullscreen
              ? "h-[calc(100vh-100px)]"
              : "aspect-[16/10] min-h-[460px] sm:min-h-[560px]"
          }`}
        >
          {/* Subtle Architectural Coordinate Grid in Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(198, 166, 107, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(198, 166, 107, 0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Mount Genuine Three.js / React Three Fiber Canvas */}
          <AdalajStepwellCanvas
            currentPreset={cameraPreset}
            resetSignal={resetSignal}
          />

          {/* Viewport Top-Left: Camera Perspective Quick Presets */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#10120f]/80 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setCameraPreset("three_quarter")}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                cameraPreset === "three_quarter"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Elevated 3/4
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset("long_axis")}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                cameraPreset === "long_axis"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Section Cutaway
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset("entrance")}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                cameraPreset === "entrance"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              South Approach
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset("top_down")}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                cameraPreset === "top_down"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Top-Down Shaft
            </button>
          </div>

          {/* Viewport Top-Right: Datum & Coordinate Overlay */}
          <div className="pointer-events-none absolute top-4 right-4 z-10 hidden text-right font-mono text-[10px] text-white/50 sm:block">
            <div>DATUM: GROUND_LEVEL (Y = 0.0m)</div>
            <div>LOWEST RESERVOIR: TIER 5 (Y = -16.5m)</div>
            <div>OCTAGONAL CORE: Z = -5.5m</div>
          </div>

          {/* Viewport Bottom-Left: Navigation Interaction Hint */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden items-center gap-2 rounded-lg border border-white/10 bg-[#10120f]/70 px-3 py-1.5 font-mono text-[10px] text-white/50 backdrop-blur-md sm:flex">
            <span>Left-click: Orbit</span>
            <span>•</span>
            <span>Right-click: Pan</span>
            <span>•</span>
            <span>Scroll: Zoom</span>
          </div>

          {/* Viewport Bottom-Right: Camera Actions (Reset & Fullscreen) */}
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetCamera}
              title="Reset Camera to default perspective"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10120f]/80 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md transition hover:border-[#c6a66b]/40 hover:bg-white/10 hover:text-[#dfc18a]"
            >
              <RotateCcw size={13} />
              <span className="font-mono text-[11px]">Reset Camera</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewport"}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#10120f]/80 text-white/70 backdrop-blur-md transition hover:border-[#c6a66b]/40 hover:bg-white/10 hover:text-white"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Viewport Footer: Archival Provenance & Integrity Notice */}
        <div className="border-t border-white/10 bg-[#111410] px-4 py-3 sm:px-6">
          <div className="flex items-start gap-3">
            <Info size={16} className="mt-0.5 shrink-0 text-[#c6a66b]" />
            <p className="text-xs leading-relaxed text-white/70">
              <strong className="text-[#dfc18a]">
                Historical &amp; Academic Notice:
              </strong>{" "}
              Procedural architectural reconstruction based on James Burgess (1903) and
              ASI measured survey references. This is an illustrative procedural visualization,
              not a photogrammetric mesh or LiDAR scan. Archival metadata retains verified
              custodial provenance, while 3D geometry represents architectural massing.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SPATIAL HOTSPOT ANCHORS SECTION (PRESERVED FUNCTIONALITY)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-light text-[#f2eee4]">
              Anchored Archival Hotspots
            </h3>
            <p className="text-xs text-white/50">
              Verified historical features with anchored 3D coordinates ready for
              spatial projection in Stage 3.
            </p>
          </div>
          <span className="font-mono text-xs text-[#c6a66b]">
            {hotspots.length} Anchors Verified
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Hotspots List (Left: 7 cols) */}
          <div className="space-y-2.5 md:col-span-7">
            {hotspots.map((record) => {
              const isSelected = record.id === selectedHotspotId;
              const coords = record.hotspot?.spatialCoordinates3D;

              return (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(record.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#c6a66b] bg-[#1a1e16] shadow-lg shadow-[#c6a66b]/5"
                      : "border-white/10 bg-[#131612] hover:border-white/20 hover:bg-[#161a14]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] tracking-wider text-[#c6a66b] uppercase">
                          {record.id}
                        </span>
                        <span className="text-[10px] text-white/30">•</span>
                        <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60">
                          {record.hotspot?.targetTier.replace(/_/g, " ")}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-[#f2eee4]">
                        {record.hotspot?.label ?? record.title}
                      </h4>
                      <p className="line-clamp-1 text-xs text-white/50">
                        {record.hotspot?.architecturalZone}
                      </p>
                    </div>

                    {coords && (
                      <div className="shrink-0 text-right font-mono text-[10px] text-white/40">
                        <div>X: {coords.x > 0 ? `+${coords.x}` : coords.x}m</div>
                        <div className="text-[#dfc18a]">Y: {coords.y}m</div>
                        <div>Z: {coords.z > 0 ? `+${coords.z}` : coords.z}m</div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Preview & Dossier Link (Right: 5 cols) */}
          <div className="md:col-span-5">
            {selectedRecord ? (
              <div className="sticky top-24 space-y-4 rounded-2xl border border-white/15 bg-[#131612] p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                    <ShieldCheck size={12} />
                    Verified Archival Anchor
                  </span>
                  <span className="font-mono text-xs text-[#c6a66b]">
                    {selectedRecord.id}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-medium text-[#f2eee4]">
                    {selectedRecord.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#c6a66b]">
                    {selectedRecord.hotspot?.architecturalZone}
                  </p>
                </div>

                {/* Spatial Coordinate Pill Card */}
                {selectedRecord.hotspot?.spatialCoordinates3D && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Relative 3D Procedural Vector
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                      <div className="rounded bg-black/40 py-1">
                        <span className="text-white/40">X:</span>{" "}
                        <strong className="text-[#f2eee4]">
                          {selectedRecord.hotspot.spatialCoordinates3D.x}m
                        </strong>
                      </div>
                      <div className="rounded bg-black/40 py-1">
                        <span className="text-white/40">Y:</span>{" "}
                        <strong className="text-[#dfc18a]">
                          {selectedRecord.hotspot.spatialCoordinates3D.y}m
                        </strong>
                      </div>
                      <div className="rounded bg-black/40 py-1">
                        <span className="text-white/40">Z:</span>{" "}
                        <strong className="text-[#f2eee4]">
                          {selectedRecord.hotspot.spatialCoordinates3D.z}m
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                <p className="line-clamp-3 text-xs leading-relaxed text-white/60">
                  {selectedRecord.description}
                </p>

                {/* Direct Archival Dossier Bridge Button */}
                <div className="pt-2">
                  <Link
                    href={`/archive/${selectedRecord.id}`}
                    className="flex w-full items-center justify-between rounded-xl bg-[#c6a66b] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10120f] transition hover:bg-[#dfc18a]"
                  >
                    <span>Inspect Full Archival Dossier</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#131612]/50 p-8 text-center text-xs text-white/40">
                Select a hotspot anchor to preview spatial details and open
                dossier.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
