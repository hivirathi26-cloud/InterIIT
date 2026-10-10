"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Brain,
  CalendarDays,
  ChevronDown,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { mockPlayers, type Player } from "@/data/mockPlayers";

export default function TeamBuilderPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateTeam = () => {
    setGenerating(true);
    setGenerated(false);

    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#07090D] text-white">
      {/* Header */}
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="flex items-center gap-2 text-xs text-gray-600">
          
        <div className="flex items-center gap-2 text-xs text-gray-600">
        <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-lime-400/[0.08] hover:text-lime-400"
        >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Overview
        </Link>
        </div>
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              Build your optimal XI
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Let our AI analyze IPL player performance and build the strongest
              possible fantasy XI for your selected match.
            </p>
          </div>
        </div>
      </section>

      {/* Match Selection */}
      <section className="border-b border-white/[0.07] bg-[#0B0F14]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <TeamBadge short="MI" name="Mumbai Indians" />

              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-700">VS</p>

                <p className="mt-1 whitespace-nowrap text-[10px] text-gray-600">
                  APR 12 · 7:30 PM
                </p>
              </div>

              <TeamBadge short="RCB" name="Royal Challengers Bengaluru" />
            </div>

            <div className="hidden h-8 w-px bg-white/[0.08] md:block" />

            <div className="hidden items-center gap-2 text-xs text-gray-500 md:flex">
              <CalendarDays className="h-4 w-4" />
              IPL · T20 · Wankhede Stadium
            </div>
          </div>

          <Button
            onClick={generateTeam}
            disabled={generating}
            className="bg-lime-400 font-bold text-black shadow-lg shadow-lime-400/10 hover:bg-lime-300"
          >
            {generating ? (
              <>
                <Brain className="h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Optimal XI
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-[1400px] px-6 py-10">
        {!generated && !generating && (
          <EmptyState onGenerate={generateTeam} />
        )}

        {generating && <AnalyzingState />}

        {generated && <GeneratedTeam />}
      </section>
    </main>
  );
}

/* ---------------- MATCH TEAM ---------------- */

function TeamBadge({
  short,
  name,
}: {
  short: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[10px] font-bold text-gray-400">
        {short}
      </div>

      <div className="hidden sm:block">
        <p className="text-xs font-semibold">{name}</p>
      </div>
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <Card className="relative w-full max-w-2xl overflow-hidden border-white/[0.08] bg-[#0D1117]">
        <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-lime-400/[0.05] blur-3xl" />

        <div className="relative flex flex-col items-center px-8 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/[0.07]">
            <Brain className="h-7 w-7 text-lime-400" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Let AI build your team
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            Our model will analyze IPL player form, training performance,
            consistency and other performance signals to find the strongest XI.
          </p>

          <Button
            onClick={onGenerate}
            size="lg"
            className="mt-7 bg-lime-400 px-7 font-bold text-black hover:bg-lime-300"
          >
            <Sparkles className="h-4 w-4" />
            Generate Optimal XI
          </Button>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Feature text="Form analysis" />
            <Feature text="Training data" />
            <Feature text="Consistency" />
            <Feature text="AI optimization" />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- ANALYZING ---------------- */

function AnalyzingState() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <Card className="w-full max-w-2xl border-white/[0.08] bg-[#0D1117]">
        <div className="flex flex-col items-center px-8 py-16 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/[0.06]">
            <Brain className="h-7 w-7 animate-pulse text-lime-400" />

            <div className="absolute inset-0 animate-ping rounded-2xl border border-lime-400/20" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            AI is analyzing the IPL match
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Comparing player performance and finding the optimal combination...
          </p>

          <div className="mt-8 w-full max-w-sm">
            <Progress
              value={72}
              className="h-1.5 bg-white/[0.06]"
            />
          </div>

          <div className="mt-5 flex gap-6 text-[10px] uppercase tracking-wider text-gray-600">
            <span>Form</span>
            <span>Training</span>
            <span>Consistency</span>
            <span>Optimization</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- GENERATED TEAM ---------------- */

function GeneratedTeam() {
  const players = generateOptimalXI();

  const teamScore = Math.round(
    players.reduce((sum, player) => sum + player.aiScore, 0) / players.length
  );

  const battingPlayers = players.filter(
    (player) =>
      player.role === "Batter" ||
      player.role === "Wicket-Keeper" ||
      player.role === "All-Rounder"
  );

  const bowlingPlayers = players.filter(
    (player) =>
      player.role === "Bowler" || player.role === "All-Rounder"
  );

  const battingStrength = Math.round(
    battingPlayers.reduce((sum, player) => sum + player.battingScore, 0) /
      battingPlayers.length
  );

  const bowlingStrength = Math.round(
    bowlingPlayers.reduce((sum, player) => sum + player.bowlingScore, 0) /
      bowlingPlayers.length
  );

  const consistency = Math.round(
    players.reduce((sum, player) => sum + player.consistency, 0) /
      players.length
  );

  const form = Math.round(
    players.reduce((sum, player) => sum + player.form, 0) /
      players.length
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* XI */}
      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-lime-400" />

              <span className="text-xs font-semibold uppercase tracking-wider text-lime-300">
                AI Recommendation
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-semibold">
              Your Optimal XI
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Selected using player performance, form, training data and
              role balance.
            </p>
          </div>

          <Badge className="hidden bg-lime-400/10 text-lime-300 hover:bg-lime-400/10 sm:flex">
            94% confidence
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {players.map((player, index) => (
            <PlayerRecommendation
              key={player.id}
              player={player}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Analysis */}
      <aside>
        <Card className="sticky top-24 border-white/[0.08] bg-[#0D1117]">
          <div className="border-b border-white/[0.07] p-5">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-lime-400" />

              <span className="text-sm font-semibold">
                Team Analysis
              </span>
            </div>
          </div>

          <div className="space-y-6 p-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-600">
                Overall AI Score
              </p>

              <p className="mt-1 text-5xl font-bold">
                {teamScore}
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-lime-400"
                  style={{ width: `${teamScore}%` }}
                />
              </div>
            </div>

            <AnalysisMetric
              label="Batting strength"
              value={battingStrength}
            />

            <AnalysisMetric
              label="Bowling strength"
              value={bowlingStrength}
            />

            <AnalysisMetric
              label="Consistency"
              value={consistency}
            />

            <AnalysisMetric
              label="Recent form"
              value={form}
            />

            <div className="rounded-xl border border-lime-400/10 bg-lime-400/[0.04] p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-lime-400" />

                <p className="text-xs font-semibold">
                  Why this team?
                </p>
              </div>

              <ul className="mt-3 space-y-2 text-xs leading-5 text-gray-500">
                <li>• Strong recent player form</li>
                <li>• High training performance</li>
                <li>• Balanced batting and bowling</li>
                <li>• Multiple high-impact players</li>
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
            >
              Edit Team
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}

/* ---------------- AI TEAM LOGIC ---------------- */

function generateOptimalXI(): Player[] {
  const sorted = [...mockPlayers].sort(
    (a, b) => b.aiScore - a.aiScore
  );

  const wicketKeepers = sorted.filter(
    (player) => player.role === "Wicket-Keeper"
  );

  const batters = sorted.filter(
    (player) => player.role === "Batter"
  );

  const allRounders = sorted.filter(
    (player) => player.role === "All-Rounder"
  );

  const bowlers = sorted.filter(
    (player) => player.role === "Bowler"
  );

  const selected: Player[] = [];

  // 1 Wicket-Keeper
  if (wicketKeepers.length > 0) {
    selected.push(wicketKeepers[0]);
  }

  // 4 Batters
  selected.push(...batters.slice(0, 4));

  // 2 All-Rounders
  selected.push(...allRounders.slice(0, 2));

  // 4 Bowlers
  selected.push(...bowlers.slice(0, 4));

  // Fill remaining positions if needed
  if (selected.length < 11) {
    const remaining = sorted.filter(
      (player) => !selected.some((selectedPlayer) => selectedPlayer.id === player.id)
    );

    selected.push(...remaining.slice(0, 11 - selected.length));
  }

  return selected.slice(0, 11);
}

/* ---------------- PLAYER ---------------- */

function PlayerRecommendation({
  player,
  index,
}: {
  player: Player;
  index: number;
}) {
  const captain = index === 0;
  const viceCaptain = index === 1;

  return (
    <Card className="border-white/[0.07] bg-[#0D1117] transition-colors hover:border-white/[0.14]">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-[10px] font-bold text-gray-400">
              {player.team}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {player.name}
              </p>

              <p className="mt-1 text-[10px] text-gray-600">
                {player.role}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-gray-600">
              AI
            </p>

            <p className="text-lg font-bold text-lime-400">
              {player.aiScore}
            </p>
          </div>
        </div>

        {(captain || viceCaptain) && (
          <div className="mt-4">
            <Badge
              className={
                captain
                  ? "bg-lime-400 text-black hover:bg-lime-400"
                  : "bg-white/[0.08] text-gray-300 hover:bg-white/[0.08]"
              }
            >
              {captain ? "C" : "VC"}
            </Badge>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3">
          <MiniStat label="FORM" value={player.form} />
          <MiniStat label="TRAIN" value={player.training} />
          <MiniStat label="CONS." value={player.consistency} />
        </div>
      </div>
    </Card>
  );
}

/* ---------------- MINI STAT ---------------- */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <p className="text-[8px] tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-gray-300">
        {value}
      </p>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Feature({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] text-gray-500">
      {text}
    </div>
  );
}

function AnalysisMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-xs text-gray-500">
          {label}
        </span>

        <span className="text-xs font-medium text-gray-300">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-lime-400/70"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}