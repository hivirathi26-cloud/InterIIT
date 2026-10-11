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

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */

type Player = {
  id?: string | number;
  name?: string;
  player_name?: string;

  team?: string;
  team_name?: string;

  role?: string;
  player_role?: string;

  aiScore?: number;
  ai_score?: number;
  score?: number;

  form?: number;
  training?: number;
  consistency?: number;

  isCaptain?: boolean;
  isViceCaptain?: boolean;
};

/* -------------------------------------------------------
   PAGE
------------------------------------------------------- */

export default function TeamBuilderPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [selectedDate, setSelectedDate] = useState("2026-10-12");

  const [players, setPlayers] = useState<Player[]>([]);

  const [error, setError] = useState("");

  /* -------------------------------------------------------
     FETCH PREDICTED XI
  ------------------------------------------------------- */

  const generateTeam = async () => {
    try {
      setGenerating(true);
      setGenerated(false);
      setError("");

      const response = await fetch(
        "http://172.18.12.61:8000/api/Predicted11",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      console.log("Predicted11 API response:", data);

      /*
        For now we support a few common response formats.

        If API returns:

        [
          {...},
          {...}
        ]

        -> data

        If API returns:

        {
          "players": [...]
        }

        -> data.players

        If API returns:

        {
          "data": [...]
        }

        -> data.data
      */

      let apiPlayers: Player[] = [];

      if (Array.isArray(data)) {
        apiPlayers = data;
      } else if (Array.isArray(data.players)) {
        apiPlayers = data.players;
      } else if (Array.isArray(data.data)) {
        apiPlayers = data.data;
      } else if (Array.isArray(data.predicted11)) {
        apiPlayers = data.predicted11;
      }

      if (apiPlayers.length === 0) {
        throw new Error("No players found in API response");
      }

      setPlayers(apiPlayers);
      setGenerated(true);
    } catch (err) {
      console.error("Predicted11 API error:", err);

      setError(
        "Unable to fetch the predicted XI. Check the API or response format."
      );
    } finally {
      setGenerating(false);
    }
  };

  /* -------------------------------------------------------
     DATE FORMAT
  ------------------------------------------------------- */

  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#07090D] text-white">

      {/* ---------------------------------------------------
          HEADER
      --------------------------------------------------- */}

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1400px] px-6 py-8">

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-lime-400/[0.08] hover:text-lime-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Overview
            </Link>
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

      {/* ---------------------------------------------------
          MATCH / DATE SELECTION
      --------------------------------------------------- */}

      <section className="border-b border-white/[0.07] bg-[#0B0F14]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5">

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-4">

              <TeamBadge
                short="MI"
                name="Mumbai Indians"
              />

              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-700">
                  VS
                </p>

                <p className="mt-1 whitespace-nowrap text-[10px] text-gray-600">
                  {formattedDate}
                </p>
              </div>

              <TeamBadge
                short="RCB"
                name="Royal Challengers Bengaluru"
              />

            </div>

            <div className="hidden h-8 w-px bg-white/[0.08] md:block" />

            <div className="hidden items-center gap-2 text-xs text-gray-500 md:flex">
              <CalendarDays className="h-4 w-4" />
              IPL · T20
            </div>

          </div>

          {/* DATE PICKER */}

          <div className="flex items-center gap-3">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setGenerated(false);
                setError("");
              }}
              className="cursor-pointer rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/30 [color-scheme:dark]"
            />

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

        </div>
      </section>

      {/* ---------------------------------------------------
          MAIN
      --------------------------------------------------- */}

      <section className="mx-auto max-w-[1400px] px-6 py-10">

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!generated && !generating && (
          <EmptyState onGenerate={generateTeam} />
        )}

        {/* LOADING */}

        {generating && <AnalyzingState />}

        {/* GENERATED */}

        {generated && !generating && (
          <GeneratedTeam players={players} />
        )}

      </section>
    </main>
  );
}

/* -------------------------------------------------------
   TEAM BADGE
------------------------------------------------------- */

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
        <p className="text-xs font-semibold">
          {name}
        </p>
      </div>

    </div>
  );
}

/* -------------------------------------------------------
   EMPTY STATE
------------------------------------------------------- */

function EmptyState({
  onGenerate,
}: {
  onGenerate: () => void;
}) {
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

/* -------------------------------------------------------
   ANALYZING STATE
------------------------------------------------------- */

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
            Fetching the predicted XI and analyzing player performance...
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

/* -------------------------------------------------------
   GENERATED TEAM
------------------------------------------------------- */

function GeneratedTeam({
  players,
}: {
  players: Player[];
}) {

  const getScore = (player: Player) =>
    player.aiScore ??
    player.ai_score ??
    player.score ??
    0;

  const getRole = (player: Player) =>
    player.role ??
    player.player_role ??
    "Player";

  const battingPlayers = players.filter(
    (player) =>
      getRole(player) === "Batter" ||
      getRole(player) === "Wicket-Keeper" ||
      getRole(player) === "All-Rounder"
  );

  const bowlingPlayers = players.filter(
    (player) =>
      getRole(player) === "Bowler" ||
      getRole(player) === "All-Rounder"
  );

  const average = (values: number[]) => {
    if (values.length === 0) return 0;

    return Math.round(
      values.reduce((sum, value) => sum + value, 0) /
        values.length
    );
  };

  const teamScore = average(
    players.map((player) => getScore(player))
  );

  const battingStrength = average(
    battingPlayers.map((player) => getScore(player))
  );

  const bowlingStrength = average(
    bowlingPlayers.map((player) => getScore(player))
  );

  const consistency = average(
    players.map((player) => player.consistency ?? getScore(player))
  );

  const form = average(
    players.map((player) => player.form ?? getScore(player))
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
              Selected using the prediction returned by the backend API.
            </p>

          </div>

          <Badge className="hidden bg-lime-400/10 text-lime-300 hover:bg-lime-400/10 sm:flex">
            {teamScore}% confidence
          </Badge>

        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">

          {players.map((player, index) => (
            <PlayerRecommendation
              key={
                player.id ??
                `${player.name ?? player.player_name}-${index}`
              }
              player={player}
              index={index}
            />
          ))}

        </div>

      </div>

      {/* ANALYSIS */}

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
                  style={{
                    width: `${Math.min(teamScore, 100)}%`,
                  }}
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
                <li>• Strong predicted player performance</li>
                <li>• Balanced batting and bowling</li>
                <li>• Backend AI prediction</li>
                <li>• Selected for the chosen match date</li>
              </ul>

            </div>

            <Button
              variant="outline"
              className="w-full border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Change Date
              <ChevronDown className="h-4 w-4" />
            </Button>

          </div>

        </Card>

      </aside>

    </div>
  );
}

/* -------------------------------------------------------
   PLAYER CARD
------------------------------------------------------- */

function PlayerRecommendation({
  player,
  index,
}: {
  player: Player;
  index: number;
}) {

  const captain =
    player.isCaptain ??
    index === 0;

  const viceCaptain =
    player.isViceCaptain ??
    index === 1;

  const name =
    player.name ??
    player.player_name ??
    "Unknown Player";

  const team =
    player.team ??
    player.team_name ??
    "N/A";

  const role =
    player.role ??
    player.player_role ??
    "Player";

  const aiScore =
    player.aiScore ??
    player.ai_score ??
    player.score ??
    0;

  return (
    <Card className="border-white/[0.07] bg-[#0D1117] transition-colors hover:border-white/[0.14]">

      <div className="p-4">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-[10px] font-bold text-gray-400">
              {team}
            </div>

            <div>

              <p className="text-sm font-semibold">
                {name}
              </p>

              <p className="mt-1 text-[10px] text-gray-600">
                {role}
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-[9px] uppercase tracking-wider text-gray-600">
              AI
            </p>

            <p className="text-lg font-bold text-lime-400">
              {aiScore}
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

          <MiniStat
            label="FORM"
            value={player.form ?? aiScore}
          />

          <MiniStat
            label="TRAIN"
            value={player.training ?? aiScore}
          />

          <MiniStat
            label="CONS."
            value={player.consistency ?? aiScore}
          />

        </div>

      </div>

    </Card>
  );
}

/* -------------------------------------------------------
   MINI STAT
------------------------------------------------------- */

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

/* -------------------------------------------------------
   FEATURE
------------------------------------------------------- */

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] text-gray-500">
      {text}
    </div>
  );
}

/* -------------------------------------------------------
   ANALYSIS METRIC
------------------------------------------------------- */

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
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}