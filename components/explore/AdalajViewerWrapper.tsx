"use client";

import dynamic from "next/dynamic";
import { Component, ReactNode } from "react";
import { Compass, RotateCcw, AlertTriangle } from "lucide-react";
import { ArchiveRecord, HeritageSite, MonumentId } from "@/lib/archive/types";

export function ViewerLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Monument Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-2xl bg-[#131612] border border-white/10" />
        <div className="h-32 rounded-2xl bg-[#131612] border border-white/10" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0e100d] shadow-2xl">
        {/* Top Control Bar Skeleton */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#131612] px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#c6a66b]/40" />
            <div className="h-4 w-44 rounded bg-white/10" />
          </div>
          <div className="h-4 w-32 rounded bg-white/10" />
        </div>

        {/* Viewport Frame Skeleton */}
        <div className="relative aspect-[16/10] min-h-[480px] w-full flex flex-col items-center justify-center p-6 bg-[#090b08] sm:min-h-[580px]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#c6a66b]/30 bg-[#c6a66b]/10">
            <Compass
              size={32}
              className="animate-spin text-[#c6a66b]"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <div className="h-4 w-60 rounded bg-white/15 mb-2" />
          <div className="h-3 w-80 max-w-full rounded bg-white/10" />
        </div>

        {/* Notice Bar Skeleton */}
        <div className="border-t border-white/10 bg-[#111410] px-6 py-3">
          <div className="h-3 w-3/4 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

const DynamicDualMonumentViewer = dynamic(
  () => import("./DualMonumentViewer"),
  {
    ssr: false,
    loading: () => <ViewerLoadingSkeleton />,
  }
);

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ViewerErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage:
        error?.message ||
        "An unexpected error occurred in the 3D heritage exploration viewport.",
    };
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-amber-500/30 bg-[#16130d] p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-lg font-medium text-[#f2eee4]">
            3D Exploration Viewport Unavailable
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/60">
            The browser environment encountered an issue mounting the spatial exploration canvas:
          </p>
          <p className="mx-auto mt-2 max-w-md rounded bg-black/40 p-2 font-mono text-[11px] text-amber-300">
            {this.state.errorMessage}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c6a66b] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10120f] transition hover:bg-[#dfc18a]"
          >
            <RotateCcw size={14} /> Retry Viewport Mount
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export interface DualMonumentViewerWrapperProps {
  sites: Record<MonumentId, HeritageSite>;
  allHotspots: ArchiveRecord[];
  initialMonument?: MonumentId;
}

export function DualMonumentViewerWrapper({
  sites,
  allHotspots,
  initialMonument = "adalaj_stepwell",
}: DualMonumentViewerWrapperProps) {
  return (
    <ViewerErrorBoundary>
      <DynamicDualMonumentViewer
        key={initialMonument}
        sites={sites}
        allHotspots={allHotspots}
        initialMonument={initialMonument}
      />
    </ViewerErrorBoundary>
  );
}

// Backward compatibility export if needed
export const AdalajViewerWrapper = DualMonumentViewerWrapper;
