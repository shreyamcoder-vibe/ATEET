import { Suspense } from "react";
import { getAllArchiveRecords, getRecordById } from "@/lib/archive";
import { ArchiveNavbar } from "@/components/archive/ArchiveNavbar";
import { ArchiveDetailView } from "@/components/archive/ArchiveDetailView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllArchiveRecords().map((record) => ({
    id: record.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = getRecordById(id);

  if (!record) {
    return {
      title: "Record Not Found | ATEET Archive",
    };
  }

  return {
    title: `${record.id} — ${record.title} | ATEET Archive`,
    description: record.description,
  };
}

function RecordDetailLoadingFallback() {
  return (
    <div className="animate-pulse">
      {/* Top navigation placeholder */}
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/40">
          <ArrowLeft size={16} /> Back to Archive Explorer
        </div>
        <div className="h-4 w-28 rounded bg-[#c6a66b]/20" />
      </div>

      {/* Main card container skeleton */}
      <div className="rounded-2xl border border-white/15 bg-[#131612] p-6 shadow-2xl sm:p-10">
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-28 rounded bg-white/10" />
            <div className="h-6 w-36 rounded bg-[#c6a66b]/20" />
            <div className="h-6 w-32 rounded bg-white/10" />
          </div>
          <div className="h-8 w-3/4 rounded bg-white/15" />
          <div className="h-4 w-1/2 rounded bg-white/10" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 rounded-full border-2 border-[#c6a66b]/40 border-t-transparent animate-spin" />
                <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                  Loading Archival Dossier...
                </span>
              </div>
            </div>
            <div className="mt-3 h-10 w-full rounded-lg bg-white/5 border border-white/10" />
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="h-28 rounded-xl border border-white/10 bg-white/5 p-4" />
            <div className="h-32 rounded-xl border border-white/10 bg-white/5 p-4" />
            <div className="h-24 rounded-xl border border-white/10 bg-white/5 p-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function RecordDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = getRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 transition hover:text-[#c6a66b]"
        >
          <ArrowLeft size={16} /> Back to Archive Explorer
        </Link>

        <span className="font-mono text-xs text-[#c6a66b]">Dossier: {record.id}</span>
      </div>

      <div className="rounded-2xl border border-white/15 bg-[#131612] p-6 shadow-2xl sm:p-10">
        <ArchiveDetailView record={record} />
      </div>
    </>
  );
}

export default function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-[#10120f] text-[#f2eee4]">
      <ArchiveNavbar />

      <main className="mx-auto max-w-6xl px-6 py-10 md:px-12">
        <Suspense fallback={<RecordDetailLoadingFallback />}>
          <RecordDetailContent params={params} />
        </Suspense>
      </main>

      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-white/40">
        <p>ATEET · Digital Heritage Archive</p>
      </footer>
    </div>
  );
}
