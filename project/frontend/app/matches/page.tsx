"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  Trophy,
  Sparkles,
} from "lucide-react";

const matches = [
  {
    id: 1,
    team1: "RCB",
    team1Name: "Royal Challengers Bengaluru",
    team1Logo: "RCB",
    team2: "CSK",
    team2Name: "Chennai Super Kings",
    team2Logo: "CSK",
    date: "12 Oct",
    time: "7:30 PM",
    venue: "M. Chinnaswamy Stadium",
    status: "Upcoming",
    prediction: {
      team1: 64,
      team2: 36,
    },
  },
  {
    id: 2,
    team1: "MI",
    team1Name: "Mumbai Indians",
    team2: "GT",
    team2Name: "Gujarat Titans",
    date: "13 Oct",
    time: "7:30 PM",
    venue: "Wankhede Stadium",
    status: "Upcoming",
    prediction: {
      team1: 57,
      team2: 43,
    },
  },
  {
    id: 3,
    team1: "RR",
    team1Name: "Rajasthan Royals",
    team2: "KKR",
    team2Name: "Kolkata Knight Riders",
    date: "14 Oct",
    time: "7:30 PM",
    venue: "Sawai Mansingh Stadium",
    status: "Upcoming",
    prediction: {
      team1: 48,
      team2: 52,
    },
  },
  {
    id: 4,
    team1: "SRH",
    team1Name: "Sunrisers Hyderabad",
    team2: "DC",
    team2Name: "Delhi Capitals",
    date: "15 Oct",
    time: "7:30 PM",
    venue: "Rajiv Gandhi International Stadium",
    status: "Upcoming",
    prediction: {
      team1: 61,
      team2: 39,
    },
  },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-10 text-white md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-green-400">
            <Trophy size={16} />
            IPL Match Center
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Upcoming Matches
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Explore upcoming matches, AI predictions and build your fantasy
            team for every game.
          </p>
        </div>

        {/* ================= FEATURED MATCH ================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/[0.10] via-white/[0.03] to-transparent">

          <div className="p-6 md:p-8">

            {/* Match Header */}

            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
                    NEXT MATCH
                  </span>

                  <span className="text-xs text-gray-500">
                    Match #1
                  </span>
                </div>

                <h2 className="text-xl font-semibold">
                  Royal Challengers Bengaluru vs Chennai Super Kings
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays size={16} />
                12 October
              </div>

            </div>

            {/* Teams */}

            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">

              {/* Team 1 */}

              <TeamDisplay
                shortName="RCB"
                name="Royal Challengers Bengaluru"
              />

              {/* VS */}

              <div className="text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30">
                  <span className="text-sm font-bold text-gray-400">
                    VS
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Clock3 size={14} />
                  7:30 PM
                </div>

              </div>

              {/* Team 2 */}

              <TeamDisplay
                shortName="CSK"
                name="Chennai Super Kings"
                reverse
              />

            </div>

            {/* Venue */}

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <MapPin size={15} />
              M. Chinnaswamy Stadium
            </div>

            {/* Prediction */}

            <div className="mt-8 rounded-2xl border border-white/5 bg-black/20 p-5">

              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-green-400" />

                <span className="text-sm font-medium">
                  AI Match Prediction
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <Prediction
                  team="RCB"
                  percentage={64}
                  winner
                />

                <Prediction
                  team="CSK"
                  percentage={36}
                />

              </div>

            </div>

            {/* CTA */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/team-builder"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold transition hover:bg-green-500"
              >
                Build AI Team
                <ChevronRight size={16} />
              </Link>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.06]">
                Match Details
                <ChevronRight size={16} />
              </button>

            </div>

          </div>
        </section>

        {/* ================= ALL MATCHES ================= */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                All Matches
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upcoming IPL fixtures
              </p>
            </div>

            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
              {matches.length} Matches
            </span>

          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
              />
            ))}

          </div>

        </section>

      </section>
    </main>
  );
}

/* =========================================================
   TEAM DISPLAY
========================================================= */

function TeamDisplay({
  shortName,
  name,
  reverse = false,
}: {
  shortName: string;
  name: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${
        reverse ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >

      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg font-bold">
        {shortName}
      </div>

      <div>
        <h3 className="font-semibold">
          {shortName}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {name}
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   PREDICTION
========================================================= */

function Prediction({
  team,
  percentage,
  winner = false,
}: {
  team: string;
  percentage: number;
  winner?: boolean;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span className="font-medium">
            {team}
          </span>

          {winner && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-green-400">
              AI Pick
            </span>
          )}

        </div>

        <span className="text-sm font-semibold">
          {percentage}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">

        <div
          className={`h-full rounded-full transition-all ${
            winner ? "bg-green-500" : "bg-gray-600"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({
  match,
}: {
  match: (typeof matches)[number];
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-green-500/30 hover:bg-white/[0.04]">

      {/* Top */}

      <div className="mb-5 flex items-center justify-between">

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          {match.status}
        </span>

        <span className="text-xs text-gray-500">
          {match.date}
        </span>

      </div>

      {/* Teams */}

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] font-bold">
            {match.team1}
          </div>

          <p className="mt-2 text-sm font-medium">
            {match.team1}
          </p>
        </div>

        <div className="text-center">

          <span className="text-xs font-medium text-gray-600">
            VS
          </span>

          <p className="mt-1 text-xs text-gray-500">
            {match.time}
          </p>

        </div>

        <div className="text-right">

          <div className="ml-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] font-bold">
            {match.team2}
          </div>

          <p className="mt-2 text-sm font-medium">
            {match.team2}
          </p>

        </div>

      </div>

      {/* Venue */}

      <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
        <MapPin size={13} />
        {match.venue}
      </div>

      {/* AI Prediction */}

      <div className="mt-5 border-t border-white/5 pt-5">

        <div className="mb-3 flex items-center gap-2">

          <Sparkles
            size={14}
            className="text-green-400"
          />

          <span className="text-xs font-medium text-gray-400">
            AI Win Prediction
          </span>

        </div>

        <div className="space-y-3">

          <Prediction
            team={match.team1}
            percentage={match.prediction.team1}
            winner={
              match.prediction.team1 >
              match.prediction.team2
            }
          />

          <Prediction
            team={match.team2}
            percentage={match.prediction.team2}
            winner={
              match.prediction.team2 >
              match.prediction.team1
            }
          />

        </div>

      </div>

      {/* Button */}

      <Link
        href="/team-builder"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-sm font-medium transition hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-400"
      >
        Build Team
        <ChevronRight size={15} />
      </Link>

    </div>
  );
}