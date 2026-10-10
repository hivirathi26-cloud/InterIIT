"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Trophy,
  Users,
  ChevronDown,
} from "lucide-react";

const players = [
  {
    name: "Virat Kohli",
    team: "RCB",
    role: "Batter",
    matches: 10,
    runs: 482,
    avg: 53.55,
    sr: 148.2,
    points: 742,
    form: [72, 88, 41, 96, 84],
    trend: "up",
  },
  {
    name: "Jasprit Bumrah",
    team: "MI",
    role: "Bowler",
    matches: 9,
    runs: 12,
    avg: 6.0,
    sr: 120.0,
    points: 698,
    form: [91, 76, 84, 63, 92],
    trend: "up",
  },
  {
    name: "Shubman Gill",
    team: "GT",
    role: "Batter",
    matches: 10,
    runs: 421,
    avg: 46.77,
    sr: 139.4,
    points: 651,
    form: [61, 73, 89, 52, 78],
    trend: "up",
  },
  {
    name: "Rashid Khan",
    team: "GT",
    role: "All-rounder",
    matches: 10,
    runs: 118,
    avg: 29.5,
    sr: 156.1,
    points: 624,
    form: [45, 82, 71, 58, 67],
    trend: "down",
  },
  {
    name: "Sanju Samson",
    team: "RR",
    role: "Wicketkeeper",
    matches: 10,
    runs: 398,
    avg: 44.22,
    sr: 151.8,
    points: 603,
    form: [79, 64, 43, 88, 71],
    trend: "up",
  },
];

const teamStats = [
  { team: "RCB", winRate: 72, form: "Excellent" },
  { team: "MI", winRate: 68, form: "Excellent" },
  { team: "GT", winRate: 61, form: "Good" },
  { team: "RR", winRate: 57, form: "Good" },
  { team: "CSK", winRate: 49, form: "Average" },
];

export default function AnalyticsPage() {
  const [filter, setFilter] = useState("All Players");

  const filteredPlayers =
    filter === "All Players"
      ? players
      : players.filter((player) => player.role === filter);

  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-10 text-white md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-green-400">
            AI Cricket Intelligence
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Player Analytics
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Explore player performance, recent form and AI-generated fantasy
            insights.
          </p>
        </div>

        {/* ================= TOP STATS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={20} />}
            title="Players Analysed"
            value="187"
            subtitle="+12 this week"
            positive
          />

          <StatCard
            icon={<Target size={20} />}
            title="AI Accuracy"
            value="87.4%"
            subtitle="+4.2% this season"
            positive
          />

          <StatCard
            icon={<Trophy size={20} />}
            title="Top Prediction"
            value="742 pts"
            subtitle="Virat Kohli"
            positive
          />

          <StatCard
            icon={<Activity size={20} />}
            title="Avg. Team Score"
            value="684"
            subtitle="Last 10 matches"
            positive
          />
        </div>

        {/* ================= MAIN ANALYTICS ================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* ---------- TOP PLAYERS ---------- */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Top Players
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Ranked by predicted fantasy points
                </p>
              </div>

              {/* Filter */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 pr-9 text-sm text-gray-200 outline-none transition focus:border-green-500/50"
                >
                  <option>All Players</option>
                  <option>Batter</option>
                  <option>Bowler</option>
                  <option>All-rounder</option>
                  <option>Wicketkeeper</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-3 text-gray-500"
                />
              </div>
            </div>

            {/* Players */}
            <div className="space-y-3">
              {filteredPlayers.map((player, index) => (
                <div
                  key={player.name}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-green-500/30 hover:bg-white/[0.04]"
                >

                  {/* Rank */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-semibold text-gray-400">
                    {index + 1}
                  </div>

                  {/* Player */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">
                        {player.name}
                      </p>

                      {player.trend === "up" ? (
                        <TrendingUp
                          size={15}
                          className="text-green-400"
                        />
                      ) : (
                        <TrendingDown
                          size={15}
                          className="text-red-400"
                        />
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {player.team} · {player.role}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">
                      {player.runs} runs
                    </p>

                    <p className="text-xs text-gray-500">
                      SR {player.sr}
                    </p>
                  </div>

                  {/* AI Points */}
                  <div className="w-20 text-right">
                    <p className="font-semibold text-green-300">
                      {player.points}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      AI points
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- AI INSIGHT ---------- */}
          <div className="rounded-2xl border border-green-500/20 bg-gradient-to-b from-green-500/10 to-transparent p-6">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-green-300">
                <Activity size={20} />
              </div>

              <div>
                <h2 className="font-semibold">
                  AI Insight
                </h2>

                <p className="text-xs text-gray-500">
                  Updated recently
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <Insight
                title="Strongest Pick"
                player="Virat Kohli"
                description="Consistent recent form with strong batting conditions."
              />

              <Insight
                title="Differential Pick"
                player="Rashid Khan"
                description="Lower ownership with strong all-round potential."
              />

              <Insight
                title="Safe Captain"
                player="Jasprit Bumrah"
                description="High consistency across the last five matches."
              />

            </div>

            <button className="mt-7 w-full rounded-xl bg-green-600 py-3 text-sm font-medium transition hover:bg-green-500">
              Build AI Team
            </button>
          </div>
        </div>

        {/* ================= RECENT FORM ================= */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Recent Form
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fantasy points from the last five matches
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

            {players.map((player) => (
              <div
                key={player.name}
                className="rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-green-500/20"
              >

                <div className="mb-4">
                  <p className="truncate text-sm font-medium">
                    {player.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {player.team}
                  </p>
                </div>

                {/* Form Bars */}
                <div className="flex h-24 items-end gap-1.5">

                  {player.form.map((value, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col justify-end"
                    >
                      <div
                        className="rounded-t-sm bg-green-500/70 transition hover:bg-green-400"
                        style={{
                          height: `${Math.max(
                            value * 0.7,
                            12
                          )}px`,
                        }}
                      />
                    </div>
                  ))}

                </div>

                <div className="mt-2 flex justify-between text-[10px] text-gray-600">
                  <span>5 matches ago</span>
                  <span>Latest</span>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* ================= TEAM PERFORMANCE ================= */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Team Performance
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current AI assessment of team strength
            </p>
          </div>

          <div className="space-y-5">

            {teamStats.map((team) => (
              <div key={team.team}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold">
                      {team.team}
                    </span>

                    <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-gray-400">
                      {team.form}
                    </span>

                  </div>

                  <span className="text-sm font-medium">
                    {team.winRate}%
                  </span>

                </div>

                {/* Progress */}
                <div className="h-2 overflow-hidden rounded-full bg-white/5">

                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${team.winRate}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        </section>

      </section>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-green-500/20">

      <div className="mb-5 flex items-center justify-between">

        <span className="text-gray-400">
          {icon}
        </span>

        {positive && (
          <span className="text-xs text-green-400">
            ↑
          </span>
        )}

      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   AI INSIGHT
========================================================= */

function Insight({
  title,
  player,
  description,
}: {
  title: string;
  player: string;
  description: string;
}) {
  return (
    <div className="border-b border-white/5 pb-5 last:border-0 last:pb-0">

      <p className="text-xs font-medium uppercase tracking-wider text-green-400">
        {title}
      </p>

      <p className="mt-1 font-medium">
        {player}
      </p>

      <p className="mt-1 text-sm leading-5 text-gray-500">
        {description}
      </p>

    </div>
  );
}