import { Suspense } from "react";
import { Metadata } from "next";
import { HERITAGE_SITES, getRecordsWithHotspots } from "@/lib/archive";
import { ExploreNavbar } from "@/components/explore/ExploreNavbar";
import {
  DualMonumentViewerWrapper,
  ViewerLoadingSkeleton,
} from "@/components/explore/AdalajViewerWrapper";
import { FileText, ShieldCheck } from "lucide-react";
import { MonumentId, HeritageSite } from "@/lib/archive/types";

export const metadata: Metadata = {
  title: "Dual-Monument 3D Heritage Exploration — Adalaj & Rani ki Vav | ATEET",
  description:
    "Interactive 3D procedural heritage exploration of Gujarat's monumental stepwells: Adalaj Stepwell (1498 CE) and Rani ki Vav (11th c. UNESCO World Heritage). Explore architectural sections and in situ archival hotspots.",
};

async function ExploreContent({
  searchParams,
}: {
  searchParams?: Promise<{ monument?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const monumentParam = resolvedParams.monument?.toLowerCase();

  let initialMonument: MonumentId = "adalaj_stepwell";
  if (monumentParam === "rani-ki-vav" || monumentParam === "rani_ki_vav") {
    initialMonument = "rani_ki_vav";
  } else if (monumentParam === "adalaj" || monumentParam === "adalaj_stepwell") {
    initialMonument = "adalaj_stepwell";
  }

  const sites = HERITAGE_SITES as Record<MonumentId, HeritageSite>;
  const allHotspots = getRecordsWithHotspots();

  return (
    <DualMonumentViewerWrapper
      sites={sites}
      allHotspots={allHotspots}
      initialMonument={initialMonument}
    />
  );
}

export default function ExplorePage(props: {
  searchParams?: Promise<{ monument?: string }>;
}) {
  const allHotspots = getRecordsWithHotspots();

  return (
    <main className="min-h-screen bg-[#10120f] text-[#f2eee4]">
      {/* Exploration Header Navbar */}
      <ExploreNavbar
        monumentName="Dual Monument 3D Exploration"
        hotspotsCount={allHotspots.length}
      />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
        {/* Main Platform Title & Badges */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#c6a66b]/40 bg-[#c6a66b]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-[#dfc18a] uppercase">
              Interactive 3D Exploration Platform
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60">
              Chaulukya &amp; Sultanate Subterranean Architecture
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck size={12} />
              Verified Archival Anchors
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="font-serif italic text-base text-[#c6a66b]">
                Gujarat Subterranean Heritage
              </p>
              <h1 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                Dual-Monument 3D Architecture
              </h1>
            </div>

            <p className="max-w-md text-xs leading-relaxed text-white/60">
              Select between <strong className="text-[#f2eee4]">Adalaj Stepwell</strong> and{" "}
              <strong className="text-[#f2eee4]">Rani ki Vav</strong> below to inspect their
              distinct architectural levels, 3D spatial hotspots, and source-grounded dossiers.
            </p>
          </div>
        </div>

        {/* 3D Dual-Monument Viewer (Client-Side R3F Canvas with Suspense Boundary) */}
        <Suspense fallback={<ViewerLoadingSkeleton />}>
          <ExploreContent searchParams={props.searchParams} />
        </Suspense>

        {/* Archival Research Context & Citation Footer */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#0d0f0c] p-6 text-xs text-white/50 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[#c6a66b]" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/80">
              Archival Survey Reference Sources &amp; Archaeological Citations
            </h4>
          </div>
          <p className="leading-relaxed mb-4">
            The spatial coordinates, architectural sections, and historical records powering
            both 3D exploration environments are derived from peer-reviewed architectural surveys
            and institutional records:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 font-mono text-[11px] text-white/60">
            <div className="space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <strong className="text-[#dfc18a] block">Adalaj Stepwell (Rudabai ni Vav, 1498 CE):</strong>
              <p>• Dr. James Burgess &amp; Henry Cousens (1903): <em>The Architectural Antiquities of Northern Gujarat</em>, ASWI Vol. IX.</p>
              <p>• Bourne &amp; Shepherd (1874): <em>Photographs of Architecture in Gujarat</em>, Plate 3 (INHA Paris / British Library).</p>
              <p>• Archaeological Survey of India (ASI): Western Circle Epigraphical Archive (ASI-WC-EPI-ADL-01).</p>
            </div>

            <div className="space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <strong className="text-[#dfc18a] block">Rani ki Vav (The Queen&apos;s Stepwell, 11th c. CE):</strong>
              <p>• UNESCO World Heritage Committee (2014): Nomination Dossier No. 1317 (Archaeological Survey of India).</p>
              <p>• Kirit Mankodi (1991): <em>The Queen&apos;s Stepwell at Patan</em>, Project for Indian Cultural Studies.</p>
              <p>• Archaeological Survey of India (ASI): Patan Sub-Circle Excavation &amp; Conservation Reports.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
