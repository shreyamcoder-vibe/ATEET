"use client";

import Link from "next/link";
import { ArrowLeft, Box, Database } from "lucide-react";

interface ExploreNavbarProps {
  monumentName?: string;
  hotspotsCount?: number;
}

export function ExploreNavbar({
  monumentName = "Dual Monument Heritage",
  hotspotsCount = 9,
}: ExploreNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10120f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 transition hover:text-[#c6a66b]"
          >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Home</span>
          </Link>

          <div className="h-4 w-px bg-white/15" />

          <Link href="/explore" className="flex items-center gap-2.5">
            <span className="text-xl font-semibold tracking-[0.2em] text-[#f2eee4]">
              ATEET<span className="text-[#c6a66b]">.</span>
            </span>
            <span className="hidden rounded-full border border-[#c6a66b]/30 bg-[#c6a66b]/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[#dfc18a] uppercase md:inline-block">
              3D Exploration
            </span>
          </Link>
        </div>

        {/* Center: Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-white/40">
          <Link href="/" className="transition hover:text-white/70">
            Home
          </Link>
          <span>/</span>
          <span className="text-white/60">3D Heritage Exploration</span>
          <span>/</span>
          <span className="font-medium text-[#c6a66b]">{monumentName}</span>
        </div>

        {/* Right: Actions and Status */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#171a15] px-3.5 py-1.5 text-white/70">
            <Box size={14} className="text-[#c6a66b]" />
            <span className="font-mono text-[11px] text-[#dfc18a]">
              {hotspotsCount} Spatial Anchors
            </span>
          </div>

          <Link
            href="/archive"
            className="flex items-center gap-2 rounded-full border border-[#c6a66b]/40 bg-[#c6a66b]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[#dfc18a] transition hover:bg-[#c6a66b] hover:text-[#10120f]"
          >
            <Database size={13} />
            <span className="hidden sm:inline">Archive Explorer</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

