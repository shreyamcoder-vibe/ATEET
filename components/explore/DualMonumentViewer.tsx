"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Maximize2,
  Info,
  ExternalLink,
  RotateCcw,
  Layers,
  X,
  Sparkles,
} from "lucide-react";
import { ArchiveRecord, HeritageSite, MonumentId } from "@/lib/archive/types";
import {
  DualMonumentCanvas,
  CameraPreset,
} from "./DualMonumentCanvas";
import { ARCHITECTURAL_SECTIONS } from "./architecturalSections";

export interface DualMonumentViewerProps {
  sites: Record<MonumentId, HeritageSite>;
  allHotspots: ArchiveRecord[];
  initialMonument?: MonumentId;
}

export default function DualMonumentViewer({
  sites,
  allHotspots,
  initialMonument = "adalaj_stepwell",
}: DualMonumentViewerProps) {
  const [activeMonument, setActiveMonument] = useState<MonumentId>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const m = urlParams.get("monument")?.toLowerCase();
      if (m === "rani-ki-vav" || m === "rani_ki_vav") return "rani_ki_vav";
      if (m === "adalaj" || m === "adalaj_stepwell") return "adalaj_stepwell";
    }
    return initialMonument;
  });
  const [cameraPreset, setCameraPreset] =
    useState<CameraPreset>("three_quarter");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter hotspots for the active monument
  const currentHotspots = allHotspots.filter(
    (h) => h.monumentId === activeMonument
  );

  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(
    currentHotspots[0]?.id ?? null
  );

  const activeSite = sites[activeMonument];
  const availableSections = ARCHITECTURAL_SECTIONS[activeMonument] || [];
  const activeSection =
    availableSections.find((s) => s.id === activeSectionId) || null;
  const selectedRecord = currentHotspots.find(
    (h) => h.id === selectedHotspotId
  );

  const handleMonumentSwitch = useCallback(
    (monumentId: MonumentId) => {
      setActiveMonument(monumentId);
      setActiveSectionId(null);
      setCameraPreset("three_quarter");
      const monumentHotspots = allHotspots.filter(
        (h) => h.monumentId === monumentId
      );
      setSelectedHotspotId(monumentHotspots[0]?.id ?? null);
      setResetSignal((s) => s + 1);

      if (typeof window !== "undefined") {
        const paramValue =
          monumentId === "rani_ki_vav" ? "rani-ki-vav" : "adalaj";
        const newUrl = `${window.location.pathname}?monument=${paramValue}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl
        );
      }
    },
    [allHotspots]
  );

  // Listen to browser back/forward popstate transitions
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const m = urlParams.get("monument")?.toLowerCase();
      if (m === "rani-ki-vav" || m === "rani_ki_vav") {
        handleMonumentSwitch("rani_ki_vav");
      } else {
        handleMonumentSwitch("adalaj_stepwell");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handleMonumentSwitch]);

  const handleSectionSelect = (sectionId: string) => {
    if (!sectionId) {
      setActiveSectionId(null);
      return;
    }
    setActiveSectionId(sectionId);
    const sec = availableSections.find((s) => s.id === sectionId);
    if (sec && sec.relatedRecordIds.length > 0) {
      // Auto-select related hotspot if available
      const relatedHotspot = currentHotspots.find((h) =>
        sec.relatedRecordIds.includes(h.id)
      );
      if (relatedHotspot) {
        setSelectedHotspotId(relatedHotspot.id);
      }
    }
  };

  const handleHotspotSelect = (record: ArchiveRecord) => {
    setSelectedHotspotId(record.id);
    // Find matching section if any
    const matchingSection = availableSections.find((s) =>
      s.relatedRecordIds.includes(record.id)
    );
    if (matchingSection) {
      setActiveSectionId(matchingSection.id);
    }
  };

  const handleResetCamera = () => {
    setActiveSectionId(null);
    setCameraPreset("three_quarter");
    setResetSignal((s) => s + 1);
  };

  return (
    <div className="space-y-6">
      {/* =========================================================================
          1. DUAL-MONUMENT SELECTION INTERFACE (TABS / CARDS)
          ========================================================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Card 1: Adalaj Stepwell */}
        <button
          type="button"
          onClick={() => handleMonumentSwitch("adalaj_stepwell")}
          className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
            activeMonument === "adalaj_stepwell"
              ? "border-[#c6a66b] bg-[#1a1e16] shadow-xl shadow-[#c6a66b]/10 ring-1 ring-[#c6a66b]"
              : "border-white/10 bg-[#131612] hover:border-white/20 hover:bg-[#161a14]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
                activeMonument === "adalaj_stepwell"
                  ? "bg-[#c6a66b] text-[#10120f]"
                  : "bg-white/10 text-white/60"
              }`}
            >
              Primary Showcase
            </span>
            <span className="font-mono text-xs text-[#c6a66b]">1498 CE</span>
          </div>

          <h3 className="mt-3 text-lg font-medium text-[#f2eee4]">
            Adalaj Stepwell
          </h3>
          <p className="font-serif italic text-xs text-[#c6a66b]">
            અડાલજની વાવ (Rudabai ni Vav)
          </p>

          <p className="mt-2 text-xs leading-relaxed text-white/60 line-clamp-2">
            5-tier subterranean marvel featuring an octagonal light core, triple
            entrance staircases, and Solanki pillar galleries.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-white/50">
            <span className="rounded bg-black/40 px-2 py-0.5">5 Tiers</span>
            <span className="rounded bg-black/40 px-2 py-0.5">16.5m Depth</span>
            <span className="rounded bg-black/40 px-2 py-0.5">
              7 Spatial Anchors
            </span>
          </div>
        </button>

        {/* Card 2: Rani ki Vav */}
        <button
          type="button"
          onClick={() => handleMonumentSwitch("rani_ki_vav")}
          className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
            activeMonument === "rani_ki_vav"
              ? "border-[#c6a66b] bg-[#1a1e16] shadow-xl shadow-[#c6a66b]/10 ring-1 ring-[#c6a66b]"
              : "border-white/10 bg-[#131612] hover:border-white/20 hover:bg-[#161a14]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
                activeMonument === "rani_ki_vav"
                  ? "bg-[#c6a66b] text-[#10120f]"
                  : "bg-white/10 text-white/60"
              }`}
            >
              UNESCO World Heritage
            </span>
            <span className="font-mono text-xs text-[#c6a66b]">11th c. CE</span>
          </div>

          <h3 className="mt-3 text-lg font-medium text-[#f2eee4]">
            Rani ki Vav
          </h3>
          <p className="font-serif italic text-xs text-[#c6a66b]">
            રાણકી વાવ (The Queen&apos;s Stepwell)
          </p>

          <p className="mt-2 text-xs leading-relaxed text-white/60 line-clamp-2">
            7-storey inverted temple descending 28 meters, adorned with over 500
            principal Dashavatara and Vishnu stone sculptures.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-white/50">
            <span className="rounded bg-black/40 px-2 py-0.5">7 Tiers</span>
            <span className="rounded bg-black/40 px-2 py-0.5">28.0m Depth</span>
            <span className="rounded bg-black/40 px-2 py-0.5">
              Inverted Temple
            </span>
          </div>
        </button>
      </div>

      {/* =========================================================================
          2. VIEWPORT CONTAINER (GENUINE THREE.JS DUAL-MONUMENT CANVAS)
          ========================================================================= */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/15 bg-[#0e100d] shadow-2xl transition-all ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
        }`}
      >
        {/* Top Control Bar: Monument Badge + Architectural Section Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#131612]/95 px-4 py-3 text-xs backdrop-blur-md sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <strong className="text-sm font-medium text-[#f2eee4]">
                {activeSite.name}
              </strong>
            </div>

            <span className="hidden text-white/20 md:inline">|</span>

            {/* Architectural Section Navigator Dropdown */}
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#c6a66b]" />
              <select
                aria-label="Select Architectural Section"
                value={activeSectionId ?? ""}
                onChange={(e) => handleSectionSelect(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#1b1f18] px-3 py-1.5 font-mono text-xs text-[#dfc18a] focus:border-[#c6a66b] focus:outline-none"
              >
                <option value="">
                  {activeMonument === "adalaj_stepwell"
                    ? "Explore Adalaj Tiers (Level 0 – 5)..."
                    : "Explore Rani ki Vav Tiers (Level 0 – 7)..."}
                </option>
                {availableSections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.levelLabel} — {sec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 text-xs">
            <div className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70">
              Depth: {activeSite.depthMeters}m · {activeSite.totalSubterraneanTiers} Levels
            </div>
          </div>
        </div>

        {/* Viewport Canvas Frame */}
        <div
          className={`relative w-full overflow-hidden bg-[#090b08] select-none ${
            isFullscreen
              ? "h-[calc(100vh-120px)]"
              : "aspect-[16/10] min-h-[480px] sm:min-h-[580px]"
          }`}
        >
          {/* Subtle Architectural Grid in Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(198, 166, 107, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(198, 166, 107, 0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Mount Three.js Dual-Monument Canvas */}
          <DualMonumentCanvas
            activeMonument={activeMonument}
            hotspots={currentHotspots}
            selectedHotspotId={selectedHotspotId}
            onSelectHotspot={handleHotspotSelect}
            currentPreset={cameraPreset}
            activeSection={activeSection}
            resetSignal={resetSignal}
          />

          {/* Top-Left: Camera Presets Bar */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#10120f]/80 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setActiveSectionId(null);
                setCameraPreset("three_quarter");
              }}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                !activeSection && cameraPreset === "three_quarter"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Elevated 3/4
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSectionId(null);
                setCameraPreset("long_axis");
              }}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                !activeSection && cameraPreset === "long_axis"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Section Cutaway
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSectionId(null);
                setCameraPreset("entrance");
              }}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                !activeSection && cameraPreset === "entrance"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Entrance View
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSectionId(null);
                setCameraPreset("top_down");
              }}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${
                !activeSection && cameraPreset === "top_down"
                  ? "bg-[#c6a66b] font-medium text-[#10120f]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Top-Down Shaft
            </button>
          </div>

          {/* Active Section Info Floating Card (Appears when a section is selected) */}
          {activeSection && (
            <div className="absolute top-16 left-4 z-10 max-w-sm rounded-xl border border-[#c6a66b]/40 bg-[#131612]/95 p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#c6a66b] uppercase">
                  <Sparkles size={12} />
                  <span>{activeSection.levelLabel}</span>
                  <span>•</span>
                  <span>{activeSection.depthLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSectionId(null)}
                  className="rounded p-0.5 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
              <h4 className="mt-1 text-xs font-semibold text-[#f2eee4]">
                {activeSection.name}
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                {activeSection.significance}
              </p>
            </div>
          )}

          {/* Viewport Top-Right: Datum Overlay */}
          <div className="pointer-events-none absolute top-4 right-4 z-10 hidden text-right font-mono text-[10px] text-white/50 sm:block">
            <div>
              AXIS: {activeMonument === "adalaj_stepwell" ? "SOUTH → NORTH" : "EAST → WEST"}
            </div>
            <div>DEPTH: 0.0m → -{activeSite.depthMeters}m</div>
          </div>

          {/* Viewport Bottom-Left: Interaction Hint */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden items-center gap-2 rounded-lg border border-white/10 bg-[#10120f]/70 px-3 py-1.5 font-mono text-[10px] text-white/50 backdrop-blur-md sm:flex">
            <span>Left-click: Orbit</span>
            <span>•</span>
            <span>Right-click: Pan</span>
            <span>•</span>
            <span>Scroll: Zoom</span>
            <span>•</span>
            <span className="text-[#dfc18a]">Click 3D pins to inspect</span>
          </div>

          {/* Viewport Bottom-Right: Controls */}
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetCamera}
              title="Reset Camera"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10120f]/80 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md transition hover:border-[#c6a66b]/40 hover:bg-white/10 hover:text-[#dfc18a]"
            >
              <RotateCcw size={13} />
              <span className="font-mono text-[11px]">Reset</span>
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
            <div className="space-y-1 text-xs leading-relaxed text-white/70">
              <p>
                <strong className="text-[#dfc18a]">Historical &amp; Academic Notice:</strong>{" "}
                Procedural architectural reconstruction based on James Burgess (1903) and ASI measured survey references.
                This is an illustrative procedural visualization, not a photogrammetric mesh or LiDAR scan. Archival metadata
                retains verified custodial provenance, while 3D geometry represents architectural massing.
              </p>
              <p className="font-mono text-[11px] text-white/40">
                Axial corridor lengths and relative coordinates are procedurally normalized for 3D WebGL viewport framing, not exact laser measurements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SPATIAL HOTSPOT ANCHORS & ARCHIVAL DOSSIER BRIDGE
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-light text-[#f2eee4]">
              {activeSite.name} — Spatial Archival Anchors
            </h3>
            <p className="text-xs text-white/50">
              Interactive 3D hotspots linked directly to verified archival dossiers and evidence.
            </p>
          </div>
          <span className="font-mono text-xs text-[#c6a66b]">
            {currentHotspots.length} Anchors Verified
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Hotspots List (Left: 7 cols) */}
          <div className="space-y-2.5 md:col-span-7">
            {currentHotspots.map((record) => {
              const isSelected = record.id === selectedHotspotId;
              const coords = record.hotspot?.spatialCoordinates3D;

              return (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => handleHotspotSelect(record)}
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

                {/* Media Image Thumbnail (if available) */}
                {selectedRecord.mediaUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedRecord.mediaUrl}
                      alt={selectedRecord.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

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
                Select a spatial anchor to inspect its archival dossier.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
