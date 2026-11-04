"use client";

import { useState, useMemo, useEffect } from "react";
import {
  getAllArchiveRecords,
  getHeritageSites,
  searchArchive,
  ArchiveCategory,
  ArchiveRecord,
  ArchiveVerificationStatus,
  MonumentId,
} from "@/lib/archive";
import { ArchiveNavbar } from "@/components/archive/ArchiveNavbar";
import { HeritageSitesBanner } from "@/components/archive/HeritageSitesBanner";
import { ArchiveRecordCard } from "@/components/archive/ArchiveRecordCard";
import { ArchiveDetailView } from "@/components/archive/ArchiveDetailView";
import {
  Search,
  RotateCcw,
  X,
  FileQuestion,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function ArchiveExplorerPage() {
  const allRecords = useMemo(() => getAllArchiveRecords(), []);
  const allSites = useMemo(() => getHeritageSites(), []);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonument, setSelectedMonument] = useState<MonumentId | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ArchiveVerificationStatus | "all">("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  // Selected Record Modal State
  const [activeRecord, setActiveRecord] = useState<ArchiveRecord | null>(null);

  // Compute record counts per monument
  const recordCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const site of allSites) {
      counts[site.id] = allRecords.filter((r) => r.monumentId === site.id).length;
    }
    return counts;
  }, [allSites, allRecords]);

  // Unique tiers available in the dataset
  const availableTiers = useMemo(() => {
    const set = new Set<string>();
    for (const record of allRecords) {
      if (record.tier) set.add(record.tier);
    }
    return Array.from(set);
  }, [allRecords]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return searchArchive({
      query: searchQuery,
      monumentId: selectedMonument,
      category: selectedCategory,
      verificationStatus: selectedStatus,
      tier: selectedTier,
    });
  }, [searchQuery, selectedMonument, selectedCategory, selectedStatus, selectedTier]);

  // Check if any filter is active
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedMonument !== "all" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    selectedTier !== "all";

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMonument("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedTier("all");
  };

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeRecord) {
        setActiveRecord(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRecord]);

  return (
    <div className="min-h-screen bg-[#10120f] text-[#f2eee4]">
      {/* Sticky Navigation */}
      <ArchiveNavbar totalRecordsCount={allRecords.length} />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        {/* Intro / Mission Header */}
        <section className="mb-12 border-b border-white/10 pb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a66b]">
                <span className="h-px w-8 bg-[#c6a66b]" />
                HC26-CULT01 · HackCult &apos;26 IIT Gandhinagar
              </div>
              <h1 className="text-3xl font-light tracking-tight text-[#f2eee4] sm:text-5xl">
                Unstructured Heritage Archive
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Transforming fragmented architectural records, historical photographs, colonial
                surveys, and epigraphic inscriptions into interconnected, verified, and geospatially
                grounded cultural knowledge.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-[#141712] px-4 py-3 text-xs">
                <span className="block text-white/40">Total Archival Records</span>
                <span className="mt-1 block text-lg font-semibold text-[#f2eee4]">
                  {allRecords.length} Items
                </span>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#141712] px-4 py-3 text-xs">
                <span className="block text-white/40">Chronological Span</span>
                <span className="mt-1 block text-lg font-semibold text-[#c6a66b]">
                  1498 – 2016 CE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Sites Showcase Banner */}
        <HeritageSitesBanner
          sites={allSites}
          selectedMonument={selectedMonument}
          onSelectMonument={setSelectedMonument}
          recordCounts={recordCounts}
        />

        {/* Search & Discovery Filter Bar */}
        <section className="mb-8 rounded-xl border border-white/10 bg-[#141712] p-5 shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Top row: Search input & Reset */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, historical figures (Queen Rudabai), or terms (mandapa, kumbha)..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-10 text-sm text-[#f2eee4] placeholder-white/30 transition focus:border-[#c6a66b] focus:outline-none focus:ring-1 focus:ring-[#c6a66b]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-[#dfc18a] transition hover:bg-white/10"
                >
                  <RotateCcw size={14} /> Reset Filters
                </button>
              )}
            </div>

            {/* Filter controls row */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-3 sm:grid-cols-4">
              {/* Monument Filter */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">
                  Monument
                </label>
                <select
                  value={selectedMonument}
                  onChange={(e) => setSelectedMonument(e.target.value as MonumentId | "all")}
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/80 focus:border-[#c6a66b] focus:outline-none"
                >
                  <option value="all">All Sites ({allRecords.length})</option>
                  <option value="adalaj_stepwell">
                    Adalaj Stepwell ({recordCounts["adalaj_stepwell"] || 0})
                  </option>
                  <option value="rani_ki_vav">
                    Rani ki Vav ({recordCounts["rani_ki_vav"] || 0})
                  </option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">
                  Archive Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as ArchiveCategory | "all")
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/80 focus:border-[#c6a66b] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="historical_photograph">Historical Photograph</option>
                  <option value="epigraphic_inscription">Epigraphic Inscription</option>
                  <option value="archival_survey_report">Archival Survey Report</option>
                </select>
              </div>

              {/* Verification Status Filter */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">
                  Verification Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as ArchiveVerificationStatus | "all")
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/80 focus:border-[#c6a66b] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="primary_source_verified">Primary Source Verified</option>
                  <option value="scholarly_verified">Scholarly Verified (ASI)</option>
                  <option value="approximate_historical">Approximate Attribution</option>
                </select>
              </div>

              {/* Subterranean Tier Filter */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">
                  Subterranean Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/80 focus:border-[#c6a66b] focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  {availableTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Counter & Active Query Status */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <div>
            Showing <strong className="text-[#f2eee4]">{filteredRecords.length}</strong> of{" "}
            {allRecords.length} archival records
            {hasActiveFilters && (
              <span className="ml-2 rounded bg-[#c6a66b]/15 px-2 py-0.5 text-[11px] text-[#dfc18a]">
                Filtered View
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c6a66b]" /> Primary Source Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Scholarly Verified (ASI)
            </span>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredRecords.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecords.map((record) => (
              <ArchiveRecordCard
                key={record.id}
                record={record}
                onSelectRecord={setActiveRecord}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#141712] p-16 text-center">
            <FileQuestion size={48} className="mx-auto text-white/25" />
            <h3 className="mt-4 text-xl font-medium text-[#f2eee4]">
              No Archival Records Found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/50">
              No existing records match your current filter criteria &quot;{searchQuery}&quot;. Try
              adjusting your search keyword, selecting &quot;All Sites&quot;, or resetting your
              active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c6a66b] px-6 py-2.5 text-xs font-semibold text-black transition hover:bg-[#dfc18a]"
            >
              <RotateCcw size={14} /> Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Record Detail Modal */}
      {activeRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <div
            onClick={() => setActiveRecord(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/20 bg-[#11130f] p-6 shadow-2xl sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#c6a66b]">
                Archival Record Dossier
              </span>
              <Link
                href={`/archive/${activeRecord.id}`}
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-[#c6a66b]"
              >
                Open in Dedicated URL <ExternalLink size={13} />
              </Link>
            </div>

            <ArchiveDetailView
              record={activeRecord}
              onClose={() => setActiveRecord(null)}
              onSelectRelated={(related) => setActiveRecord(related)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-white/40">
        <p>ATEET Digital Heritage Archive · HackCult &apos;26 IIT Gandhinagar</p>
        <p className="mt-1">
          Ground-truth historical documentation adhering to ASI and open archival provenance standards.
        </p>
      </footer>
    </div>
  );
}
