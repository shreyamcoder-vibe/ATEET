"use client";

import Link from "next/link";
import { ArchiveRecord } from "@/lib/archive/types";
import {
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight,
  AlertTriangle,
  Info,
  CheckCircle2,
} from "lucide-react";

interface ArchiveRecordCardProps {
  record: ArchiveRecord;
  onSelectRecord: (record: ArchiveRecord) => void;
}

export function ArchiveRecordCard({ record, onSelectRecord }: ArchiveRecordCardProps) {
  // Format category label
  const categoryLabels: Record<string, string> = {
    historical_photograph: "Historical Photograph",
    architectural_drawing: "Architectural Drawing",
    epigraphic_inscription: "Epigraphic Inscription",
    archival_survey_report: "Archival Survey Report",
    field_notebook_record: "Field Notebook Record",
  };

  // Verification status badge styles
  const isPrimary = record.verificationStatus === "primary_source_verified";
  const isScholarly = record.verificationStatus === "scholarly_verified";

  // Media role badge styles
  const isContextual = record.mediaRole === "contextual_representative";
  const isProxy = record.mediaRole === "illustrative_proxy";

  return (
    <article
      onClick={() => onSelectRecord(record)}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141712] transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a66b]/60 hover:bg-[#181b15] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={record.mediaUrl}
          alt={record.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141712] via-transparent to-black/40" />

        {/* Verification Status Badge (Top Right) */}
        <div className="absolute top-3 right-3 z-10">
          {isPrimary && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#c6a66b]/40 bg-[#10120f]/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#dfc18a] shadow-sm backdrop-blur-md">
              <ShieldCheck size={13} className="text-[#c6a66b]" /> Primary Verified
            </span>
          )}
          {isScholarly && (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#10120f]/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-emerald-300 shadow-sm backdrop-blur-md">
              <CheckCircle2 size={13} className="text-emerald-400" /> Scholarly Verified
            </span>
          )}
        </div>

        {/* Archival Category Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            {categoryLabels[record.category] || record.category}
          </span>
        </div>

        {/* Media Role Disclaimer Strip (Bottom of image) */}
        {(isContextual || isProxy) && (
          <div className="absolute bottom-2 inset-x-2 z-10 flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-black/85 px-2.5 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-md">
            {isContextual && (
              <>
                <Info size={13} className="text-amber-400 shrink-0" />
                <span className="truncate">Representative view (does not depict slab directly)</span>
              </>
            )}
            {isProxy && (
              <>
                <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                <span className="truncate">Illustrative modern proxy (1903 scan pending)</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Record ID and Spatial Tier */}
        <div className="mb-2 flex items-center justify-between text-xs text-white/45">
          <span className="font-mono tracking-wider text-[#c6a66b]">{record.id}</span>
          {record.tier && (
            <span className="flex items-center gap-1">
              <Layers size={12} />
              {record.tier.replace(/_/g, " ")}
            </span>
          )}
        </div>

        {/* Record Title */}
        <h4 className="mb-2 text-base font-medium leading-snug text-[#f2eee4] transition-colors group-hover:text-[#dfc18a]">
          {record.title}
        </h4>

        {/* Description Excerpt */}
        <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
          {record.description}
        </p>

        {/* Metadata Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3 text-[11px] text-white/50">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-[#c6a66b]" />
            {record.dateCreatedVerified || record.dateCreatedApproximate || "Historic"}
          </span>

          <span>•</span>

          <span className="truncate max-w-[170px]" title={record.provenance.attribution}>
            {record.provenance.attribution.split(",")[0]}
          </span>
        </div>

        {/* Card Footer Button */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <span className="text-[11px] uppercase tracking-wider text-white/40">
            {record.entities.length} Extracted Entities
          </span>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50 transition group-hover:text-white/80">
              Preview
            </span>
            <Link
              href={`/archive/${record.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 font-medium text-[#c6a66b] transition hover:text-[#dfc18a] hover:underline underline-offset-4"
              title="Open full archival dossier"
            >
              <span>Dossier</span> <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
