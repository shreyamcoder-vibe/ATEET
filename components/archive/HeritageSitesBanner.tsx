"use client";

import { HeritageSite, MonumentId } from "@/lib/archive/types";
import { Landmark, Layers, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface HeritageSitesBannerProps {
  sites: HeritageSite[];
  selectedMonument: MonumentId | "all";
  onSelectMonument: (id: MonumentId | "all") => void;
  recordCounts: Record<string, number>;
}

export function HeritageSitesBanner({
  sites,
  selectedMonument,
  onSelectMonument,
  recordCounts,
}: HeritageSitesBannerProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c6a66b]">
            Documented Heritage Monuments
          </p>
          <h2 className="mt-1 text-2xl font-light text-[#f2eee4] md:text-3xl">
            Gujarat Architectural Stepwells
          </h2>
        </div>

        <button
          onClick={() => onSelectMonument("all")}
          className={`text-xs uppercase tracking-wider transition ${selectedMonument === "all"
            ? "font-semibold text-[#c6a66b] underline underline-offset-4"
            : "text-white/50 hover:text-white"
            }`}
        >
          View All Sites ({Object.values(recordCounts).reduce((a, b) => a + b, 0)} records)
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sites.map((site) => {
          const isSelected = selectedMonument === site.id;
          const count = recordCounts[site.id] || 0;
          const isPrimary = site.id === "adalaj_stepwell";

          return (
            <div
              key={site.id}
              onClick={() => onSelectMonument(isSelected ? "all" : site.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 ${isSelected
                ? "border-[#c6a66b] bg-[#1a1d17] shadow-[0_0_30px_rgba(198,166,107,0.15)] ring-1 ring-[#c6a66b]"
                : "border-white/10 bg-[#141712] hover:border-white/25 hover:bg-[#181b15]"
                }`}
            >
              <div className="p-6 md:p-7">
                {/* Header row */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#c6a66b]">{site.vernacularName}</span>
                      {isPrimary && (
                        <span className="rounded-full bg-[#c6a66b]/20 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#dfc18a]">
                          Primary Showcase
                        </span>
                      )}
                      {!isPrimary && (
                        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/60">
                          Scalability Extension
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-xl font-medium text-[#f2eee4] md:text-2xl">
                      {site.name}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#10120f] text-[#c6a66b]">
                    <Landmark size={20} />
                  </div>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-white/65">
                  {site.summaryDescription}
                </p>

                {/* Key architectural parameters */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="flex items-center gap-1 text-white/40">
                      <MapPin size={12} className="text-[#c6a66b]" /> Location
                    </span>
                    <p className="mt-1 font-medium text-white/90">
                      {site.location.cityOrVillage}, {site.location.district}
                    </p>
                  </div>

                  <div>
                    <span className="flex items-center gap-1 text-white/40">
                      <Calendar size={12} className="text-[#c6a66b]" /> Period
                    </span>
                    <p className="mt-1 font-medium text-white/90">
                      {site.completionYearVerified
                        ? `${site.completionYearVerified} CE`
                        : site.completionYearApproximate || site.period}
                    </p>
                  </div>

                  <div>
                    <span className="flex items-center gap-1 text-white/40">
                      <Layers size={12} className="text-[#c6a66b]" /> Subterranean
                    </span>
                    <p className="mt-1 font-medium text-white/90">
                      {site.totalSubterraneanTiers} Levels ({site.depthMeters}m)
                    </p>
                  </div>
                </div>

                {/* Monument Filter Action Row */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="font-mono text-[11px] text-[#c6a66b]">
                    {count} {count === 1 ? "Record" : "Records"}
                  </span>
                  <span className="flex items-center gap-1 text-white/50 transition group-hover:text-white">
                    {isSelected ? (
                      <>
                        <CheckCircle2 size={13} className="text-[#c6a66b]" /> Active Filter
                      </>
                    ) : (
                      "Filter archive →"
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

