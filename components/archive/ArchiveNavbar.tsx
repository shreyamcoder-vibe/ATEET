"use client";

import Link from "next/link";
import { ArrowLeft, Database, Landmark } from "lucide-react";

interface ArchiveNavbarProps {
  totalRecordsCount?: number;
  currentSite?: string;
}

export function ArchiveNavbar({ totalRecordsCount = 9 }: ArchiveNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10120f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Left: Brand & Back to Home */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 transition hover:text-[#c6a66b]"
          >
            <ArrowLeft size={16} /> Home
          </Link>

          <div className="h-4 w-px bg-white/15" />

          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-semibold tracking-[0.2em] text-[#f2eee4]">
              ATEET<span className="text-[#c6a66b]">.</span>
            </span>
            <span className="hidden rounded-full border border-[#c6a66b]/30 bg-[#c6a66b]/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#dfc18a] sm:inline-block">
              Archive Explorer
            </span>
          </Link>
        </div>

        {/* Center / Right metadata badges */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-[#171a15] px-3.5 py-1.5 text-white/70 md:flex">
            <Landmark size={14} className="text-[#c6a66b]" />
            <span>2 Heritage Sites</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#c6a66b]/30 bg-[#171a15] px-3.5 py-1.5 text-white/80">
            <Database size={14} className="text-[#c6a66b]" />
            <span>
              <strong className="text-[#f2eee4]">{totalRecordsCount}</strong> Verified Records
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

