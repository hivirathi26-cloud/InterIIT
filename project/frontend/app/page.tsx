"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Brain,
  ChevronRight,
  Menu,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090D] text-white">
      

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center gap-16 px-6 py-12 lg:grid-cols-[1.05fr_.95fr]">
          {/* LEFT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.05] px-3.5 py-2 text-xs font-medium text-lime-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI-POWERED IPL TEAM OPTIMIZATION
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              Don't guess.
              <br />
              <span className="text-lime-400">Predict.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Build your strongest IPL fantasy XI using AI-driven player
              performance analysis, predictive modeling, and intelligent team
              optimization.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/team-builder">
                <Button
                  size="lg"
                  className="bg-lime-400 font-bold text-black shadow-lg shadow-lime-400/10 hover:bg-lime-300"
                >
                  Build AI Team
                  <ArrowUpRight />
                </Button>
              </Link>

              <Link href="/analytics">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 bg-white/[0.02] text-gray-300 hover:bg-white/[0.05] hover:text-white"
                >
                  Explore Analytics
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Small stats */}
            <div className="mt-12 flex gap-10 border-t border-white/[0.07] pt-7">
              <MiniStat
                value="10"
                label="IPL teams tracked"
              />

              <MiniStat
                value="94%"
                label="Model confidence"
              />

              <MiniStat
                value="12+"
                label="Performance signals"
              />
            </div>
          </div>

          {/* RIGHT — MATCH / AI PANEL */}
          <div className="relative">
            {/* Soft glow */}
            <div className="absolute -inset-6 rounded-[40px] bg-lime-400/[0.045] blur-3xl" />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#11161D] shadow-2xl shadow-black/50">
              {/* Internal grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Accent */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/70 to-transparent" />

              {/* Card Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-gray-500">
                    FEATURED MATCH
                  </div>

                  <div className="mt-1 text-sm font-semibold text-gray-200">
                    IPL · T20
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.08] px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                  </span>

                  <span className="text-[10px] font-semibold tracking-wide text-lime-300">
                    AI LIVE
                  </span>
                </div>
              </div>

              {/* Teams */}
              <div className="relative grid grid-cols-[1fr_auto_1fr] items-center px-7 py-9">
                <Team
                  name="Mumbai Indians"
                  short="MI"
                />

                <div className="px-4 text-center">
                  <div className="text-[10px] font-semibold text-gray-600">
                    VS
                  </div>

                  <div className="mt-1 whitespace-nowrap text-[10px] text-gray-500">
                    IPL · T20
                  </div>
                </div>

                <Team
                  name="Royal Challengers Bengaluru"
                  short="RCB"
                  right
                />
              </div>

              {/* AI Analysis */}
              <div className="relative mx-5 mb-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#080B10] p-5">
                <div className="absolute left-0 top-0 h-full w-px bg-lime-400/40" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-400/10">
                      <Brain className="h-4 w-4 text-lime-400" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-white">
                        AI TEAM ANALYSIS
                      </span>

                      <p className="mt-0.5 text-[10px] text-gray-600">
                        Optimal XI detected
                      </p>
                    </div>
                  </div>

                  <span className="rounded-md border border-lime-400/10 bg-lime-400/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-lime-300">
                    Recommended
                  </span>
                </div>

                {/* Score */}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-600">
                      Optimal XI Score
                    </div>

                    <div className="mt-1 text-5xl font-bold tracking-tight text-white">
                      93.8
                    </div>

                    <div className="mt-1 text-[10px] text-gray-600">
                      Team strength score
                    </div>
                  </div>

                  <div className="pb-1 text-right">
                    <div className="text-sm font-semibold text-lime-400">
                      +7.6%
                    </div>

                    <div className="mt-1 text-[10px] text-gray-600">
                      vs average XI
                    </div>
                  </div>
                </div>

                {/* Score bar */}
                <div className="mt-6">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[94%] rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.35)]" />
                  </div>

                  <div className="mt-2 flex justify-between text-[10px]">
                    <span className="text-gray-600">
                      Model confidence
                    </span>

                    <span className="font-medium text-gray-400">
                      94%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="relative grid grid-cols-2 gap-3 px-5 pb-5">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                  <div className="text-[9px] font-medium uppercase tracking-wider text-gray-600">
                    Players analyzed
                  </div>

                  <div className="mt-1 text-sm font-semibold text-white">
                    20+
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                  <div className="text-[9px] font-medium uppercase tracking-wider text-gray-600">
                    Performance signals
                  </div>

                  <div className="mt-1 text-sm font-semibold text-white">
                    12+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-white/[0.07] md:grid-cols-3 md:divide-x md:divide-y-0">
          <Feature
            number="01"
            title="Analyze"
            description="Evaluate IPL players across form, training, consistency and match impact."
          />

          <Feature
            number="02"
            title="Optimize"
            description="Let the model find the strongest combination of players for your IPL match."
          />

          <Feature
            number="03"
            title="Understand"
            description="See exactly why the AI selected each player and how confident it is."
          />
        </div>
      </section>
    </main>
  );
}

/* ---------------- NAVIGATION ---------------- */

function NavItem({
  children,
  href,
  active = false,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
        active
          ? "bg-white/[0.07] text-white"
          : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}

/* ---------------- TEAM ---------------- */

function Team({
  name,
  short,
  right = false,
}: {
  name: string;
  short: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "text-right" : ""}>
      <div
        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-gray-300 ${
          right ? "ml-auto" : ""
        }`}
      >
        {short}
      </div>

      <div className="text-sm font-semibold">
        {name}
      </div>

      <div className="mt-1 text-[10px] text-gray-600">
        {right ? "AWAY" : "HOME"}
      </div>
    </div>
  );
}

/* ---------------- MINI STAT ---------------- */

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-xl font-semibold tracking-tight">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-gray-600">
        {label}
      </div>
    </div>
  );
}

/* ---------------- FEATURE ---------------- */

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="px-6 py-10 md:px-10 lg:py-12">
      <div className="mb-8 text-[10px] font-semibold tracking-[0.2em] text-lime-400">
        {number}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}