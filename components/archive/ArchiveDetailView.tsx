"use client";

import Link from "next/link";
import { ArchiveRecord } from "@/lib/archive/types";
import { getRecordById } from "@/lib/archive";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  ExternalLink,
  BookOpen,
  Tag,
  X,
  ArrowRight,
  Database,
} from "lucide-react";

interface ArchiveDetailViewProps {
  record: ArchiveRecord;
  onClose?: () => void;
  onSelectRelated?: (record: ArchiveRecord) => void;
}

export function ArchiveDetailView({
  record,
  onClose,
  onSelectRelated,
}: ArchiveDetailViewProps) {
  const isPrimary = record.verificationStatus === "primary_source_verified";

  const isContextual = record.mediaRole === "contextual_representative";
  const isProxy = record.mediaRole === "illustrative_proxy";

  // Resolve related records
  const relatedRecords = record.relatedRecordIds
    .map((id) => getRecordById(id))
    .filter((r): r is ArchiveRecord => r !== undefined);

  return (
    <div className="text-[#f2eee4]">
      {/* Top action bar if in modal or page */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c6a66b]">
            Record ID: {record.id}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs capitalize text-white/50">
            {record.monumentId.replace(/_/g, " ")}
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
            title="Close Detail View"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Main Grid: Left Media & Provenance, Right Context & Analysis */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column (5 cols): Media, Verification, Provenance */}
        <div className="space-y-6 lg:col-span-5">
          {/* Image Container */}
          <div className="overflow-hidden rounded-xl border border-white/15 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={record.mediaUrl}
              alt={record.title}
              className="w-full object-contain max-h-[460px] mx-auto bg-black"
            />
          </div>

          {/* Media Role & Verification Banners */}
          <div className="space-y-3">
            {/* Verification Status */}
            <div
              className={`flex items-start gap-3 rounded-lg border p-3.5 text-xs ${
                isPrimary
                  ? "border-[#c6a66b]/40 bg-[#c6a66b]/10 text-[#dfc18a]"
                  : "border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
              }`}
            >
              {isPrimary ? (
                <ShieldCheck size={18} className="text-[#c6a66b] shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold uppercase tracking-wider text-[11px]">
                  {isPrimary ? "Primary Source Verified" : "Scholarly Verified (ASI)"}
                </p>
                <p className="mt-1 leading-relaxed opacity-90">
                  {isPrimary
                    ? "The historical claims in this record are directly supported by an authentic primary artifact or 19th-century photographic plate."
                    : "The historical claims are corroborated by the Archaeological Survey of India (ASI) or published peer-reviewed epigraphical volumes."}
                </p>
              </div>
            </div>

            {/* Media Disclaimer Alert if Contextual or Proxy */}
            {(isContextual || isProxy) && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-950/30 p-3.5 text-xs text-amber-200">
                {isContextual ? (
                  <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[11px]">
                    {isContextual ? "Representative Visual Context" : "Illustrative Visual Proxy"}
                  </p>
                  <p className="mt-1 leading-relaxed opacity-90">
                    {record.mediaNote ||
                      "This media asset provides spatial context and does not depict the exact historical document directly."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Provenance Box */}
          <div className="rounded-xl border border-white/10 bg-[#171a15] p-5 text-xs">
            <h4 className="mb-3 flex items-center gap-2 font-semibold uppercase tracking-wider text-[#c6a66b]">
              <Database size={14} /> Archival Provenance
            </h4>

            <dl className="space-y-3">
              <div>
                <dt className="text-white/40">Holding Collection / Repository</dt>
                <dd className="mt-0.5 font-medium text-white/90">
                  {record.provenance.repositoryOrCollection}
                </dd>
              </div>

              {record.provenance.accessionOrPlateNumber && (
                <div>
                  <dt className="text-white/40">Accession / Plate Number</dt>
                  <dd className="mt-0.5 font-mono text-white/80">
                    {record.provenance.accessionOrPlateNumber}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-white/40">Attribution</dt>
                <dd className="mt-0.5 font-medium text-white/90">
                  {record.provenance.attribution}
                </dd>
              </div>

              <div>
                <dt className="text-white/40">Copyright / License</dt>
                <dd className="mt-0.5 font-medium text-emerald-300">
                  {record.provenance.license}
                </dd>
              </div>

              {record.provenance.custodialHistory && (
                <div>
                  <dt className="text-white/40">Custodial History</dt>
                  <dd className="mt-0.5 leading-relaxed text-white/70">
                    {record.provenance.custodialHistory}
                  </dd>
                </div>
              )}

              <div className="border-t border-white/10 pt-3">
                <dt className="text-white/40">Direct Primary Asset URL</dt>
                <dd className="mt-1">
                  <a
                    href={record.provenance.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#c6a66b] transition hover:text-[#dfc18a] hover:underline"
                  >
                    View Source Asset on Repository <ExternalLink size={13} />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column (7 cols): Historical Data, Transcription, Entities */}
        <div className="space-y-6 lg:col-span-7">
          {/* Header & Badges */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-[#c6a66b]/20 px-3 py-1 font-medium text-[#dfc18a]">
                {record.category.replace(/_/g, " ")}
              </span>

              {record.tier && (
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                  <Layers size={12} className="text-[#c6a66b]" />
                  {record.tier.replace(/_/g, " ")}
                </span>
              )}

              {record.geospatial?.subterraneanDepthMeters !== undefined && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                  Depth: -{record.geospatial.subterraneanDepthMeters}m
                </span>
              )}
            </div>

            <h2 className="text-2xl font-light text-[#f2eee4] md:text-3xl">
              {record.title}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-sm text-[#c6a66b]">
              <Calendar size={15} />
              <span>
                {record.dateCreatedVerified
                  ? `Verified Date: ${record.dateCreatedVerified}`
                  : `Approximate Period: ${record.dateCreatedApproximate}`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-white/10 bg-[#141712] p-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              Archival Description & Analysis
            </h4>
            <p className="text-sm leading-relaxed text-white/80">
              {record.description}
            </p>
          </div>

          {/* Transcription (if available) */}
          {record.transcription && (
            <div className="rounded-xl border border-[#c6a66b]/30 bg-[#191b15] p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#c6a66b]" />
                  <h4 className="text-sm font-medium text-[#f2eee4]">
                    Document Transcription & Epigraphical Translation
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="rounded bg-black/50 px-2 py-0.5 capitalize text-[#dfc18a]">
                    {record.transcription.originalLanguage} ({record.transcription.script})
                  </span>
                  <span className="text-emerald-400">
                    Confidence: {(record.transcription.ocrConfidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Raw Inscription Text */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Original Text
                </span>
                <blockquote className="mt-1 rounded-lg border border-white/10 bg-black/60 p-4 font-serif text-sm leading-relaxed text-[#f2eee4]/90 italic">
                  {record.transcription.rawText}
                </blockquote>
              </div>

              {/* English Translation */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Scholarly Translation
                </span>
                <p className="mt-1 rounded-lg border border-white/5 bg-[#141712] p-4 text-xs leading-relaxed text-white/85">
                  {record.transcription.englishTranslation}
                </p>
              </div>

              {/* Scholarly Commentary */}
              {record.transcription.scholarlyNotes && (
                <div className="border-t border-white/10 pt-3 text-xs text-white/60">
                  <strong className="text-[#c6a66b]">Scholarly Note: </strong>
                  {record.transcription.scholarlyNotes}
                </div>
              )}
            </div>
          )}

          {/* Extracted Entities */}
          {record.entities.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-[#141712] p-5">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                Extracted Historical Entities & Terminology ({record.entities.length})
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                {record.entities.map((entity) => (
                  <div
                    key={entity.id}
                    className="rounded-lg border border-white/5 bg-black/40 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#dfc18a]">{entity.text}</span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60 capitalize">
                        {entity.category.replace(/_/g, " ")}
                      </span>
                    </div>
                    {entity.verifiedMeaning && (
                      <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
                        {entity.verifiedMeaning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {record.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={13} className="text-white/30" />
              {record.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Records */}
          {relatedRecords.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#c6a66b]">
                Interconnected Archival Records
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                {relatedRecords.map((rel) => {
                  const cardContent = (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.mediaUrl}
                        alt={rel.title}
                        className="h-14 w-14 rounded object-cover shrink-0 bg-black"
                      />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-[10px] font-mono text-[#c6a66b]">{rel.id}</p>
                        <p className="truncate text-xs font-medium text-white/90 group-hover:text-[#dfc18a]">
                          {rel.title}
                        </p>
                        <p className="text-[10px] text-white/40 capitalize">
                          {rel.category.replace(/_/g, " ")}
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-[#c6a66b] shrink-0" />
                    </>
                  );

                  return onSelectRelated ? (
                    <button
                      type="button"
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-[#171a15] p-3 text-left transition hover:border-[#c6a66b]/50 hover:bg-[#1a1e17]"
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <Link
                      key={rel.id}
                      href={`/archive/${rel.id}`}
                      className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#171a15] p-3 transition hover:border-[#c6a66b]/50 hover:bg-[#1a1e17]"
                    >
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
