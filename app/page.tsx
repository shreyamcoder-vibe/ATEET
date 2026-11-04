"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Landmark,
  Sparkles,
  Layers,
  Database,
  Box,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  ScrollText,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#10120f] text-[#f2eee4]">
      {/* =========================================================================
          NAVIGATION HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10120f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-semibold tracking-[0.22em] text-[#f2eee4]">
              ATEET<span className="text-[#c6a66b]">.</span>
            </span>
            <span className="hidden rounded-full border border-[#c6a66b]/30 bg-[#c6a66b]/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#dfc18a] uppercase sm:inline-block">
              Heritage Archive
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-wider text-white/70 md:flex">
            <Link
              href="/explore"
              className="flex items-center gap-1.5 text-[#c6a66b] transition hover:text-[#dfc18a]"
            >
              <Box size={13} />
              3D Exploration
            </Link>
            <Link
              href="/archive"
              className="flex items-center gap-1.5 text-white/80 transition hover:text-[#dfc18a]"
            >
              <Database size={13} />
              Archive Explorer
            </Link>
            <a href="#monuments" className="transition hover:text-white">
              Monuments
            </a>
            <a href="#architecture" className="transition hover:text-white">
              Architecture
            </a>
            <a href="#capabilities" className="transition hover:text-white">
              Capabilities
            </a>
            <a href="#discoveries" className="transition hover:text-white">
              Discoveries
            </a>
          </nav>


          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="border-b border-white/10 bg-[#141712] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium tracking-wide">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-[#c6a66b]"
              >
                <span className="flex items-center gap-2">
                  <Box size={16} />
                  3D Heritage Exploration
                </span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/archive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-white/80 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Database size={16} />
                  Archive Explorer (9 Records)
                </span>
                <ChevronRight size={16} />
              </Link>
              <a
                href="#monuments"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-white/70 hover:text-white"
              >
                Heritage Monuments
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-white/70 hover:text-white"
              >
                Architectural Insights
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-white/70 hover:text-white"
              >
                Platform Capabilities
              </a>
              <a
                href="#discoveries"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-white/70 hover:text-white"
              >
                Featured Discoveries
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO SECTION: FULL-BLEED CINEMATIC COMPOSITION
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 py-24 md:px-12 lg:min-h-screen lg:py-32">
        {/* Full-Bleed Continuous Panoramic Background */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-heritage-panorama.jpg"
            alt="Artistic architectural panorama of ancient Indian subterranean stepwells with carved sandstone colonnades"
            className="h-full w-full object-cover object-[center_right] md:object-right"
          />

          {/* Deep Obsidian Multi-Stop Gradient Overlays for Guaranteed Text Legibility */}
          {/* Horizontal: Solid dark on the left, softly transitioning to reveal the majestic architecture on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#10120f] via-[#10120f]/95 via-40% to-transparent sm:via-[#10120f]/85 sm:via-50% lg:via-[#10120f]/75 lg:via-55%" />

          {/* Vertical: Seamless blending with sticky navbar at top and next section at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#10120f]/80 via-transparent via-25% to-[#10120f]" />

          {/* Subtle Warm Atmospheric Light Diffusion */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse at 75% 35%, rgba(198, 166, 107, 0.4) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Hero Content: Elevated on the Left Side */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="max-w-2xl lg:max-w-3xl"
          >
            {/* Problem Statement & Mission Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#c6a66b]/30 bg-[#10120f]/85 px-4 py-1.5 text-[11px] font-medium tracking-widest text-[#dfc18a] uppercase shadow-lg backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c6a66b] animate-pulse" />
              HackCult &apos;26 · Problem HC26-CULT01
            </div>

            {/* Preserved Prominent Headline */}
            <h1 className="text-5xl font-light leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white">
              History is not
              <br />
              <span className="font-serif italic text-[#c6a66b]">
                forgotten.
              </span>
              <br />
              It&apos;s waiting.
            </h1>

            {/* Narrative Subtitle */}
            <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              Transforming fragmented cultural and architectural heritage archives —
              19th-century colonial albumen plates, in situ Sanskrit epigraphs, and
              deep subterranean survey reports — into an interconnected, living knowledge base.
            </p>

            {/* Hero Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="flex items-center gap-3 rounded-full bg-[#c6a66b] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#10120f] transition hover:bg-[#dfc18a] hover:shadow-[0_0_30px_rgba(198,166,107,0.45)]"
              >
                Explore 3D Monuments <ArrowRight size={16} />
              </Link>

              <a
                href="#monuments"
                className="flex items-center gap-3 rounded-full border border-white/20 bg-[#10120f]/60 px-7 py-4 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-md transition hover:border-[#c6a66b]/60 hover:bg-[#10120f]/90 hover:text-white"
              >
                <Compass size={15} className="text-[#c6a66b]" /> Discover Showcase
              </a>
            </div>

            {/* Telemetry Quick-Stats Strip */}
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <span className="block font-serif text-3xl font-light text-[#dfc18a]">2</span>
                <span className="text-[11px] uppercase tracking-wider text-white/50">Verified Sites</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-light text-[#dfc18a]">9</span>
                <span className="text-[11px] uppercase tracking-wider text-white/50">Archival Records</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-light text-[#dfc18a]">5 Tiers</span>
                <span className="text-[11px] uppercase tracking-wider text-white/50">Subterranean Depth</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-light text-[#dfc18a]">1498 CE</span>
                <span className="text-[11px] uppercase tracking-wider text-white/50">Foundation Epigraph</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Artistic Architectural Disclaimer Badge (Bottom-Right) */}
        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-[#10120f]/80 px-3.5 py-1.5 font-mono text-[10px] text-white/50 backdrop-blur-md md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c6a66b]" />
          Artistic Panorama · Gujarat Stepwell Architecture (Adalaj &amp; Rani ki Vav Typology)
        </div>
      </section>

      {/* =========================================================================
          SECTION A: DISCOVER HERITAGE (PRIMARY SHOWCASE & SCALABILITY EXTENSION)
          ========================================================================= */}
      <section id="monuments" className="relative border-t border-white/10 bg-[#121511] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a66b]">
              <Landmark size={14} /> Primary Showcase &amp; Architectural Scalability
            </div>
            <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
              Subterranean Masterpieces
              <br />
              <span className="font-serif italic text-[#c6a66b]">
                of Western India.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Grounded in primary epigraphic slabs, colonial surveys by Dr. James Burgess,
              and authenticated photography from national repositories.
            </p>
          </div>

          {/* Monuments Dual Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Monument 1: Adalaj Stepwell (Primary Showcase) */}
            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151913] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Adalaj_Stepwell.JPG"
                  alt="Adalaj Stepwell entrance pavilion and axial stairway approach"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151913] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full border border-[#c6a66b]/40 bg-[#10120f]/90 px-3 py-1 text-xs font-medium text-[#dfc18a] shadow-md">
                    Primary Showcase
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs font-mono text-white/70">
                    7 Verified Records
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#c6a66b]">Gandhinagar, Gujarat</span>
                    <h3 className="text-2xl font-medium text-white">Adalaj Stepwell</h3>
                    <p className="text-xs text-white/60">Rudabai ni Vav (અડાલજની વાવ)</p>
                  </div>
                  <span className="font-mono text-xs text-white/50">1498 CE</span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider">Patrons</span>
                    <span className="mt-1 font-medium text-white/90">Queen Rudabai &amp; Mahmud Begada</span>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider">Dynasty</span>
                    <span className="mt-1 font-medium text-white/90">Vaghela / Gujarat Sultanate</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-white/40 uppercase tracking-wider">Dimensions</span>
                    <span className="mt-1 font-medium text-[#dfc18a]">5 Tiers · 16.5m Depth · 75.3m Length</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/65">
                  A five-storey subterranean marvel engineered with a triple-flight entrance staircase
                  converging on the first platform, carved Solanki sandstone pillars, an octagonal light shaft,
                  and a verified 24-line Sanskrit foundation inscription slab.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/archive"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a66b] transition hover:text-[#dfc18a]"
                  >
                    Explore 7 Adalaj Records <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/archive/ADL-EPI-1498"
                    className="text-xs text-white/40 underline-offset-4 hover:text-white hover:underline"
                  >
                    View 1498 Inscription Dossier
                  </Link>
                </div>
              </div>
            </article>

            {/* Monument 2: Rani ki Vav (Scalability Extension) */}
            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151913] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG"
                  alt="Rani ki Vav seven-storey subterranean corridor overview at Patan"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151913] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full border border-[#c6a66b]/40 bg-[#10120f]/90 px-3 py-1 text-xs font-medium text-[#dfc18a] shadow-md">
                    Scalability Extension
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs font-mono text-white/70">
                    UNESCO World Heritage
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#c6a66b]">Patan, Gujarat</span>
                    <h3 className="text-2xl font-medium text-white">Rani ki Vav</h3>
                    <p className="text-xs text-white/60">The Queen&apos;s Stepwell (રાણકી વાવ)</p>
                  </div>
                  <span className="font-mono text-xs text-white/50">c. 1063 CE</span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider">Patron</span>
                    <span className="mt-1 font-medium text-white/90">Queen Udayamati</span>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider">Dynasty</span>
                    <span className="mt-1 font-medium text-white/90">Chaulukya (Solanki)</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-white/40 uppercase tracking-wider">Dimensions</span>
                    <span className="mt-1 font-medium text-[#dfc18a]">7 Levels · 28.0m Depth · 65.0m Length</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/65">
                  Designed as an inverted temple honoring water sanctity. Built in the 11th century CE
                  by Queen Udayamati in memory of King Bhima I, it descends seven levels and features
                  over 500 major sculptural masterworks including Dashavatara panels.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/archive"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a66b] transition hover:text-[#dfc18a]"
                  >
                    Explore Rani ki Vav Records <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/archive/RKV-PHO-LEVEL4"
                    className="text-xs text-white/40 underline-offset-4 hover:text-white hover:underline"
                  >
                    View Level 4 Sculptural Dossier
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: BEYOND THE MONUMENTS (ARCHITECTURAL INSIGHTS & HIDDEN SCIENCE)
          ========================================================================= */}
      <section id="architecture" className="relative border-t border-white/10 bg-[#10120f] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a66b]">
              <Sparkles size={14} /> Architectural Insights &amp; Cultural Context
            </div>
            <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
              Beyond the Monuments:
              <br />
              <span className="font-serif italic text-[#c6a66b]">
                The Science in Stone.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Uncovering the climatic adaptation, syncretic epigraphy, and hydraulic genius
              that made western Indian subterranean architecture legendary.
            </p>
          </div>

          {/* 4 Architectural Insights Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Insight 1: Subterranean Microclimate */}
            <div className="rounded-xl border border-white/10 bg-[#141712] p-6 transition-colors hover:border-[#c6a66b]/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#c6a66b]">01 / CLIMATIC SCIENCE</span>
                <span className="rounded bg-[#c6a66b]/10 px-2 py-0.5 font-mono text-[11px] text-[#dfc18a]">
                  -5°C Cooler
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">Passive Subterranean Cooling</h3>
              <p className="text-xs leading-relaxed text-white/60">
                The five-tier subterranean depth creates a microclimate where temperatures remain
                consistently 5°C to 6°C cooler than the arid surface, creating rest sanctuaries for caravans
                along historic trade routes between Ahmedabad and Patan.
              </p>
            </div>

            {/* Insight 2: Syncretic Epigraphy */}
            <div className="rounded-xl border border-white/10 bg-[#141712] p-6 transition-colors hover:border-[#c6a66b]/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#c6a66b]">02 / EPIGRAPHY</span>
                <span className="rounded bg-[#c6a66b]/10 px-2 py-0.5 font-mono text-[11px] text-[#dfc18a]">
                  Samvat 1555
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">Syncretic Co-Existence</h3>
              <p className="text-xs leading-relaxed text-white/60">
                Queen Rudabai&apos;s Sanskrit inscription documents a Hindu queen commemorating her Vaghela
                chieftain husband while honoring Sultan Mahmud Begada&apos;s sovereign protection, recording an
                investment of 5,00,111 tankas.
              </p>
            </div>

            {/* Insight 3: Inverted Temple */}
            <div className="rounded-xl border border-white/10 bg-[#141712] p-6 transition-colors hover:border-[#c6a66b]/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#c6a66b]">03 / SACRED TYPOLOGY</span>
                <span className="rounded bg-[#c6a66b]/10 px-2 py-0.5 font-mono text-[11px] text-[#dfc18a]">
                  500+ Sculptures
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">Inverted Temple Archetype</h3>
              <p className="text-xs leading-relaxed text-white/60">
                Rather than soaring heavenward, Solanki architecture at Rani ki Vav descends into the earth.
                Pillared pavilions and stepped corridors become shrines consecrating life-giving water with
                Dashavatara and Sheshashayi Vishnu masterworks.
              </p>
            </div>

            {/* Insight 4: Triple Stairway Convergence */}
            <div className="rounded-xl border border-white/10 bg-[#141712] p-6 transition-colors hover:border-[#c6a66b]/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#c6a66b]">04 / GEOMETRY</span>
                <span className="rounded bg-[#c6a66b]/10 px-2 py-0.5 font-mono text-[11px] text-[#dfc18a]">
                  Triple Flight
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">Triple-Axis Convergence</h3>
              <p className="text-xs leading-relaxed text-white/60">
                Documented in Dr. James Burgess&apos;s 1903 ASI survey: three distinct flights descend
                from south, west, and north, converging at an octagonal platform on the first tier to regulate
                pedestrian flow and light entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: EXPERIENCE ATEET (THREE CONNECTED CAPABILITIES)
          ========================================================================= */}
      <section id="capabilities" className="relative border-t border-white/10 bg-[#141712] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a66b]">
              <Layers size={14} /> Problem Statement HC26-CULT01 Architecture
            </div>
            <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
              Three Connected Pillars of
              <br />
              <span className="font-serif italic text-[#c6a66b]">
                Digital Heritage Revitalisation.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Transforming unstructured archives into searchable, interconnected, and spatially organized knowledge.
            </p>
          </div>

          {/* 3 Capabilities Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1: Digital Archival Explorer */}
            <div className="group rounded-2xl border border-white/10 bg-[#10120f] p-8 transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-sm text-[#c6a66b]">01</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#c6a66b] group-hover:border-[#c6a66b]/40">
                  <Database size={22} />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-medium text-white">
                Digital Archival Explorer
              </h3>

              <p className="mb-6 text-xs leading-relaxed text-white/60">
                Interconnected archive records with strict verification statuses, verified custodian provenance,
                bilingual Sanskrit-to-English transcriptions, and CC/PD licensing integrity.
              </p>

              <ul className="mb-8 space-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Multi-Tier &amp; Category Filters
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Curated Sanskrit-Devanagari Epigraphic Transcription
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Direct Wikimedia Commons &amp; ASI Source Citations
                </li>
              </ul>

              <Link
                href="/archive"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a66b] transition hover:text-[#dfc18a]"
              >
                Launch Explorer <ArrowRight size={14} />
              </Link>
            </div>

            {/* Pillar 2: Interactive 3D Spatial Exploration */}
            <div className="group rounded-2xl border border-white/10 bg-[#10120f] p-8 transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-sm text-[#c6a66b]">02</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#c6a66b] group-hover:border-[#c6a66b]/40">
                  <Layers size={22} />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-medium text-white">
                Interactive 3D Spatial Index
              </h3>

              <p className="mb-6 text-xs leading-relaxed text-white/60">
                Procedural architectural volumetric reconstruction based on 1903 ASI survey dimensions (not photogrammetry or LiDAR scans).
                Anchors genuine archival documents to relative 3D spatial coordinates and subterranean depths.
              </p>

              <ul className="mb-8 space-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Subterranean 5-Tier Volumetric Scaffold
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Spatial Hotspots Anchored to Real Records
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Bi-Directional Hotspot-to-Dossier Navigation
                </li>
              </ul>

              <Link
                href="/archive"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a66b] transition hover:text-[#dfc18a]"
              >
                Inspect Hotspot Anchors <ArrowRight size={14} />
              </Link>
            </div>

            {/* Pillar 3: Archival Knowledge Architecture & AI-Ready Schema */}
            <div className="group rounded-2xl border border-white/10 bg-[#10120f] p-8 transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-sm text-[#c6a66b]">03</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#c6a66b] group-hover:border-[#c6a66b]/40">
                  <Sparkles size={22} />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-medium text-white">
                Archival Knowledge Architecture &amp; AI-Ready Schema
              </h3>

              <p className="mb-6 text-xs leading-relaxed text-white/60">
                Structured historical entity taxonomy and verified contextual dossier metadata designed for
                future AI retrieval-augmented grounding, backed by rigorous provenance and license transparency.
              </p>

              <ul className="mb-8 space-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Curated Historical Entities &amp; Lineages
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Strict Verification Status Taxonomy
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#c6a66b]" /> Provenance-Labelled Metadata Standard
                </li>
              </ul>

              <Link
                href="/archive/ADL-EPI-1498"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a66b] transition hover:text-[#dfc18a]"
              >
                Examine Entity Schema <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: FEATURED ARCHIVAL DISCOVERIES (ACTUAL ARCHIVE RECORDS)
          ========================================================================= */}
      <section id="discoveries" className="relative border-t border-white/10 bg-[#10120f] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a66b]">
                <ScrollText size={14} /> Verified Historical Evidence
              </div>
              <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
                Featured Archival Discoveries.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Sample dossiers from the 9 verified records currently cataloged in ATEET.
                Each record retains full custodial provenance and license transparency.
              </p>
            </div>

            <Link
              href="/archive"
              className="inline-flex items-center gap-2 rounded-full border border-[#c6a66b]/40 bg-[#c6a66b]/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#dfc18a] transition hover:bg-[#c6a66b] hover:text-[#10120f]"
            >
              View All 9 Records <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Featured Records Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Record 1: ADL-EPI-1498 */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141712] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Wav_or_well_at_Adalaj%2C_Ahmedabad.jpg"
                    alt="Adalaj stepwell gallery near inscription niche"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141712] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#dfc18a]">
                    ADL-EPI-1498
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-[#10120f]/90 px-2 py-0.5 text-[10px] text-emerald-400">
                    <ShieldCheck size={11} /> Scholarly Verified
                  </div>
                </div>

                <div className="p-4">
                  <span className="font-mono text-[10px] text-[#c6a66b]">Epigraphic Inscription · 1498 CE</span>
                  <h4 className="mt-1 line-clamp-2 text-sm font-medium text-white group-hover:text-[#dfc18a]">
                    Sanskrit Epigraph Slab of Queen Rudabai
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs text-white/50">
                    24-line Sanskrit foundation epigraph in Devanagari script recording the Vaghela genealogy and 5,00,111 tankas cost.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/archive/ADL-EPI-1498"
                  className="flex items-center justify-between text-xs font-medium text-[#c6a66b] transition hover:text-[#dfc18a]"
                >
                  <span>Open Dossier</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>

            {/* Record 2: ADL-PHO-1874 */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141712] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Wav_or_well_at_Adalaj%2C_Ahmedabad.jpg"
                    alt="Bourne and Shepherd 1874 Albumen Print"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter sepia-[0.2]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141712] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#dfc18a]">
                    ADL-PHO-1874
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-[#10120f]/90 px-2 py-0.5 text-[10px] text-[#dfc18a]">
                    <ShieldCheck size={11} /> Primary Verified
                  </div>
                </div>

                <div className="p-4">
                  <span className="font-mono text-[10px] text-[#c6a66b]">Historical Photograph · 1874 CE</span>
                  <h4 className="mt-1 line-clamp-2 text-sm font-medium text-white group-hover:text-[#dfc18a]">
                    Bourne &amp; Shepherd 1874 Albumen Print
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs text-white/50">
                    Original 1874 albumen print (Plate 3) documenting subterranean sandstone galleries 150 years ago.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/archive/ADL-PHO-1874"
                  className="flex items-center justify-between text-xs font-medium text-[#c6a66b] transition hover:text-[#dfc18a]"
                >
                  <span>Open Dossier</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>

            {/* Record 3: ADL-PHO-OCTAGON */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141712] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Adalaj_stepwell_-_horizontal_view.jpg"
                    alt="Adalaj stepwell octagonal shaft"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141712] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#dfc18a]">
                    ADL-PHO-OCTAGON
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-[#10120f]/90 px-2 py-0.5 text-[10px] text-emerald-400">
                    <ShieldCheck size={11} /> Scholarly Verified
                  </div>
                </div>

                <div className="p-4">
                  <span className="font-mono text-[10px] text-[#c6a66b]">Architecture · Tier 3 (-9.8m)</span>
                  <h4 className="mt-1 line-clamp-2 text-sm font-medium text-white group-hover:text-[#dfc18a]">
                    Octagonal Shaft &amp; Stepped Pavilion Perspective
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs text-white/50">
                    Solar illumination dynamics and horizontal view across all five subterranean tiers.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/archive/ADL-PHO-OCTAGON"
                  className="flex items-center justify-between text-xs font-medium text-[#c6a66b] transition hover:text-[#dfc18a]"
                >
                  <span>Open Dossier</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>

            {/* Record 4: RKV-PHO-LEVEL4 */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141712] transition-all duration-300 hover:border-[#c6a66b]/60 hover:shadow-xl">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d7/View_of_the_Rani-ki-Vav_from_the_fourth_level_of_the_step_well.jpg"
                    alt="Rani ki Vav Level 4 sculptural gallery"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141712] via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#dfc18a]">
                    RKV-PHO-LEVEL4
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-[#10120f]/90 px-2 py-0.5 text-[10px] text-emerald-400">
                    <ShieldCheck size={11} /> Scholarly Verified
                  </div>
                </div>

                <div className="p-4">
                  <span className="font-mono text-[10px] text-[#c6a66b]">UNESCO Monument · Level 4</span>
                  <h4 className="mt-1 line-clamp-2 text-sm font-medium text-white group-hover:text-[#dfc18a]">
                    Rani ki Vav Fourth Level Gallery &amp; Pillar Vista
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs text-white/50">
                    Chaulukya dynasty tiered pillared pavilions with sculptural friezes dedicated to Vishnu avatars.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/archive/RKV-PHO-LEVEL4"
                  className="flex items-center justify-between text-xs font-medium text-[#c6a66b] transition hover:text-[#dfc18a]"
                >
                  <span>Open Dossier</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: CLOSING EXPERIENCE (THE INVITATION)
          ========================================================================= */}
      <section className="relative overflow-hidden border-t border-white/10 px-6 py-28 text-center md:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(198, 166, 107, 0.25) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#c6a66b]/40 bg-[#c6a66b]/10 text-[#c6a66b]">
            <Compass size={28} strokeWidth={1.5} />
          </div>

          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c6a66b]">
            The Journey Begins In The Archives
          </p>

          <h2 className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Rediscover what
            <br />
            <span className="font-serif italic text-[#c6a66b]">
              time left behind.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/60 sm:text-base">
            Every stepwell holds a story of water, sovereignty, and craftsmanship.
            Step into the verified historical archives of Adalaj and Rani ki Vav.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/archive/ADL-EPI-1498"
              className="flex items-center gap-3 rounded-full bg-[#c6a66b] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#10120f] transition hover:bg-[#dfc18a] hover:shadow-[0_0_25px_rgba(198,166,107,0.4)]"
            >
              Inspect Adalaj Epigraph Dossier <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/10 bg-[#0d0f0c] px-6 py-12 text-xs text-white/50 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <span className="text-xl font-semibold tracking-[0.2em] text-[#f2eee4]">
              ATEET<span className="text-[#c6a66b]">.</span>
            </span>
            <p className="mt-2 text-white/40">
              Digital Revitalisation of Unstructured Cultural &amp; Architectural Heritage Archives
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#c6a66b]/80">
              HackCult &apos;26 · Problem Statement HC26-CULT01 · IIT Gandhinagar
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:text-right">
            <p className="text-white/60">
              Primary Showcase: Adalaj Stepwell · Scalability Extension: Rani ki Vav
            </p>
            <p className="text-[11px] text-white/40">
              Sources: Archaeological Survey of India (ASI) · Wikimedia Commons Heritage Collection · INHA Paris
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
