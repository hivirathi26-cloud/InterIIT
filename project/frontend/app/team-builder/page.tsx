"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import Link from "next/link";

import {

  ArrowLeft,

  Brain,

  CheckCircle2,

  ChevronDown,

  Loader2,

  Sparkles,

  Trophy,

  Users,

  Zap,

} from "lucide-react";

import { Button } from "@/components/ui/button";

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";

type PredictedPlayer = {

  player_id: string;

  player: string;

  team: string;

  role: "BAT" | "BOWL" | "AR" | "WK" | string;

  role_source?: string;

  [key: string]: unknown;

};

type PlayerHistory = {
  match_id: string;
  date: string;
  opponent: string;
  total_fantasy_points: number;
  batting_fantasy_points: number;
  bowling_fantasy_points: number;
  fielding_fantasy_points: number;
};

type PlayerExplanation = {
  player_id: string;
  last_fantasy_points?: number;
  last_5_average?: number;
  last_10_average?: number;
  previous_matches?: number;
  opponent_average?: number;
  specialty_from_previous_matches?: string;
  past_domain_averages?: Record<string, number>;
  history?: PlayerHistory[];
  explanation?: string;
};

type PredictionResponse = {

  data: {

    actual_team: PredictedPlayer[];

    actual_team_definition: string;

    candidate_pool: {

      scope?: string;

      participants?: number;

      known_roles?: number;

      quality_flagged_players?: number;

      unknown_roles?: string[];

      [key: string]: unknown;

    };

    charts?: {

      player_form?: string;

      player_domains?: string;

    };

    comparison?: {

      predicted_team_expected_points?: number;

      predicted_team_actual_points?: number;

      actual_best_team_points?: number;

      selection_regret?: number;

      overlap?: number;

      [key: string]: unknown;

    };

    match: {

      match_id: string;

      date: string;

      venue: string;

      teams: string[];

      requested_date: string;

      [key: string]: unknown;

    };

    model?: {

      algorithm?: string;

      base_tree_max_depth?: number;

      estimators?: number;

      learning_rate?: number;

      training_cutoff?: string;

      [key: string]: unknown;

    };

    player_explanations?: PlayerExplanation[];

    player_predictions?: unknown[];

    predicted_team: PredictedPlayer[];

    request_key?: string;

    schema_version?: string;

    selection_constraints?: {

      players?: number;

      min_per_role?: number;

      max_per_role?: number;

      min_per_team?: number;

      credit_budget?: number | null;

      [key: string]: unknown;

    };

    selection_errors?: string[];

    status?: string;

    team_win_probabilities?: {

      status?: string;

      probabilities?: unknown[];

      [key: string]: unknown;

    };

    warnings?: string[];

  };

  date?: string;

  matchID?: number | string;

};

function getShortName(team: string) {

  const names: Record<string, string> = {

"Mumbai Indians": "MI",

"Royal Challengers Bengaluru": "RCB",

"Royal Challengers Bangalore": "RCB",

"Chennai Super Kings": "CSK",

"Kolkata Knight Riders": "KKR",

"Delhi Capitals": "DC",

"Punjab Kings": "PBKS",

"Rajasthan Royals": "RR",

"Sunrisers Hyderabad": "SRH",

"Lucknow Super Giants": "LSG",

"Gujarat Titans": "GT",

};

return (

    names[team] ||

    team

.split(" ")

.map((word) => word[0])

.join("")

.slice(0, 4)

.toUpperCase()

  );

}

function getInitials(name: string) {

return name

.split(" ")

.filter(Boolean)

.map((word) => word[0])

.join("")

.slice(0, 2)

.toUpperCase();

}

/**

 * Date coming from Matches page is already YYYY-MM-DD.

 *

 * DO NOT use new Date(dateString) here.

 * That can cause timezone-related date shifts.

 */

function formatDate(dateString: string) {

if (!dateString) return "Match date unavailable";

  const [year, month, day] = dateString.split("-");

if (!year || !month || !day) {

return dateString;

  }

  const months = [

"January",

"February",

"March",

"April",

"May",

"June",

"July",

"August",

"September",

"October",

"November",

"December",

];

  const monthIndex = Number(month) - 1;

if (monthIndex < 0 || monthIndex > 11) {

return dateString;

  }

return `${day} ${months[monthIndex]} ${year}`;

}

function getRoleLabel(role: string) {

switch (role) {

case "BAT":

return "Batter";

case "BOWL":

return "Bowler";

case "AR":

return "All-Rounder";

case "WK":

return "Wicketkeeper";

default:

return role;

  }

}

function LoadingPage() {

return (

    <main className="min-h-screen bg-[#080a0f] text-white">

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">

        <div className="flex flex-col items-center gap-4">

          <Loader2

className="animate-spin text-green-400"

size={32}

          />

          <p className="text-sm text-zinc-400">

            Loading Team Builder...

          </p>

        </div>

      </div>

    </main>

  );

}

export default function TeamBuilderPage() {

return (

    <Suspense fallback={<LoadingPage />}>

      <TeamBuilder />

    </Suspense>

  );

}

function TeamBuilder() {

  const searchParams = useSearchParams();

  const dateFromUrl = searchParams.get("date");

  const team1FromUrl = searchParams.get("team1");

  const team2FromUrl = searchParams.get("team2");

  const [selectedDate, setSelectedDate] = useState(

dateFromUrl || ""

);

  const [team1, setTeam1] = useState(

team1FromUrl || "Team 1"

);

  const [team2, setTeam2] = useState(

team2FromUrl || "Team 2"

);

  const [players, setPlayers] = useState<PredictedPlayer[]>([]);

  const [predictionData, setPredictionData] =

useState<PredictionResponse["data"] | null>(null);

  const [generated, setGenerated] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

/*

   * Read match information from URL.

   *

   * Example URL:

   *

   * /team-builder?

   * date=2026-05-12

   * &team1=Gujarat%20Titans

   * &team2=Royal%20Challengers%20Bengaluru

   */

useEffect(() => {

setSelectedDate(dateFromUrl || "");

setTeam1(team1FromUrl || "Team 1");

setTeam2(team2FromUrl || "Team 2");

setGenerated(false);

setPlayers([]);

setPredictionData(null);

setError("");

  }, [

    dateFromUrl,

    team1FromUrl,

    team2FromUrl,

  ]);

  const formattedDate = useMemo(() => {

    return formatDate(selectedDate);

}, [selectedDate]);

  const generateTeam = async () => {

    if (!selectedDate) {

setError("Match date is missing.");

      return;

}

    try {

setLoading(true);

setError("");

setGenerated(false);

setPlayers([]);

setPredictionData(null);

/*

       * IMPORTANT:

       *

       * selectedDate is already YYYY-MM-DD.

       *

       * Example:

       * "2026-05-12"

       *

       * We send exactly this to the backend.

       */

console.log(

"Sending prediction request:",

{

          date: selectedDate,

team1,

team2,

}

);

const response = await fetch(

"http://192.168.43.39:8000/api/Predicted11",

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

        throw new Error(

`Prediction request failed: ${response.status}`

);

}

const result: PredictionResponse =

        await response.json();

console.log(

"PREDICTION RESPONSE:",

result

);

console.log(

"REQUESTED DATE:",

selectedDate

);

console.log(

"BACKEND MATCH DATE:",

result?.data?.match?.date

);

console.log(

"BACKEND REQUESTED DATE:",

result?.data?.match?.requested_date

);

console.log(

"PREDICTED TEAM:",

result?.data?.predicted_team

);

const predictedTeam =

result?.data?.predicted_team;

      if (

!predictedTeam ||

predictedTeam.length === 0

) {

        throw new Error(

"No predicted team was returned by the backend."

);

}

setPredictionData(result.data);

setPlayers(predictedTeam);

setGenerated(true);

} catch (err) {

console.error(

"Error generating team:",

err

);

setError(

err instanceof Error

? err.message

: "Could not generate the team."

);

} finally {

setLoading(false);

}

};

  const roleCounts = useMemo(() => {

    return players.reduce(

(acc, player) => {

const role = player.role;

        if (role === "BAT") acc.BAT++;

        else if (role === "BOWL") acc.BOWL++;

        else if (role === "AR") acc.AR++;

        else if (role === "WK") acc.WK++;

        return acc;

},

{

        BAT: 0,

        BOWL: 0,

        AR: 0,

        WK: 0,

}

);

}, [players]);

return (

    <main className="min-h-screen bg-[#080a0f] text-white">

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">

        {/* BACK */}

        <Link

href="/matches"

className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"

        >

          <ArrowLeft size={16} />

          Back to Matches

        </Link>

        {/* HEADER */}

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10">

              <Brain

className="text-green-400"

size={19}

              />

            </div>

            <span className="text-sm font-medium text-green-400">

              AI Team Builder

            </span>

          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

            Build Your Dream XI

          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-400 md:text-base">

            Let the prediction model analyze the match

            and select the strongest XI from the

            available players.

          </p>

        </div>

        {/* SELECTED MATCH */}

        <Card className="mb-8 overflow-hidden border-white/10 bg-white/[0.03]">

          <CardContent className="p-6">

            <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">

              <Trophy size={14} />

              Selected Match

            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="flex items-center gap-4">

                  <div className="text-xl font-bold md:text-2xl">

                    {getShortName(team1)}

                  </div>

                  <span className="text-sm text-zinc-500">

                    vs

                  </span>

                  <div className="text-xl font-bold md:text-2xl">

                    {getShortName(team2)}

                  </div>

                </div>

                <p className="mt-2 text-sm text-zinc-400">

                  {team1} vs {team2}

                </p>

              </div>

              <div className="text-left md:text-right">

                <p className="text-sm font-medium text-zinc-300">

                  {formattedDate}

                </p>

                {predictionData?.match?.venue && (

                  <p className="mt-1 text-xs text-zinc-500">

                    {predictionData.match.venue}

                  </p>

                )}

              </div>

            </div>

          </CardContent>

        </Card>

        {/* BUILD BUTTON */}

        {!generated && !loading && (

          <div className="mb-10">

            <button

onClick={generateTeam}

disabled={!selectedDate}

className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-green-500 px-6 py-5 text-base font-bold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"

            >

              <Sparkles

size={21}

className="transition group-hover:rotate-12"

              />

              Build Team

              <Zap size={18} />

            </button>

            <p className="mt-3 text-center text-xs text-zinc-500">

              AI will analyze the available players and

              select the predicted best XI.

            </p>

          </div>

        )}

        {/* LOADING */}

        {loading && (

          <Card className="mb-10 border-green-500/20 bg-green-500/[0.03]">

            <CardContent className="flex flex-col items-center justify-center py-16">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">

                <Loader2

className="animate-spin text-green-400"

size={28}

                />

              </div>

              <h2 className="text-lg font-semibold">

                Building your XI...

              </h2>

              <p className="mt-2 text-sm text-zinc-500">

                Analyzing player predictions and selection

                constraints

              </p>

            </CardContent>

          </Card>

        )}

        {/* ERROR */}

        {error && !loading && (

          <Card className="mb-8 border-red-500/20 bg-red-500/[0.03]">

            <CardContent className="p-5">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 rounded-full bg-red-500/10 p-2">

                  <Zap

size={16}

className="text-red-400"

                  />

                </div>

                <div>

                  <h3 className="font-medium text-red-300">

                    Unable to build team

                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">

                    {error}

                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        )}

        {/* GENERATED TEAM */}

        {generated && predictionData && (

          <div className="space-y-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <CheckCircle2

size={18}

className="text-green-400"

                  />

                  <span className="text-sm font-medium text-green-400">

                    Prediction Complete

                  </span>

                </div>

                <h2 className="text-2xl font-bold">

                  AI Predicted XI

                </h2>

                <p className="mt-1 text-sm text-zinc-500">

                  {players.length} players selected for{" "}

                  {team1} vs {team2}

                </p>

              </div>

              <Button

onClick={generateTeam}

variant="outline"

className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"

              >

                <Sparkles

size={15}

className="mr-2"

                />

                Rebuild

              </Button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

              <Card className="border-white/10 bg-white/[0.03]">

                <CardContent className="p-4">

                  <p className="text-xs text-zinc-500">

                    Players

                  </p>

                  <p className="mt-1 text-xl font-bold">

                    {players.length}/11

                  </p>

                </CardContent>

              </Card>

              <Card className="border-white/10 bg-white/[0.03]">

                <CardContent className="p-4">

                  <p className="text-xs text-zinc-500">

                    Expected Points

                  </p>

                  <p className="mt-1 text-xl font-bold text-green-400">

                    {predictionData.comparison

?.predicted_team_expected_points !==

                    undefined

                      ? predictionData.comparison.predicted_team_expected_points.toFixed(

                          1

                        )

                      : "—"}

                  </p>

                </CardContent>

              </Card>

              <Card className="border-white/10 bg-white/[0.03]">

                <CardContent className="p-4">

                  <p className="text-xs text-zinc-500">

                    Team Overlap

                  </p>

                  <p className="mt-1 text-xl font-bold">

                    {predictionData.comparison

?.overlap ?? "—"}

                    /11

                  </p>

                </CardContent>

              </Card>

              <Card className="border-white/10 bg-white/[0.03]">

                <CardContent className="p-4">

                  <p className="text-xs text-zinc-500">

                    Model

                  </p>

                  <p className="mt-1 truncate text-sm font-bold">

                    {predictionData.model?.algorithm ||

                      "AI Model"}

                  </p>

                </CardContent>

              </Card>

            </div>

            {/* TEAM */}

            <Card className="overflow-hidden border-white/10 bg-white/[0.03]">

              <CardHeader className="border-b border-white/10">

                <div className="flex items-center justify-between">

                  <CardTitle className="flex items-center gap-2">

                    <Users size={19} />

                    Predicted Team

                  </CardTitle>

                  <Badge

variant="outline"

className="border-green-500/30 text-green-400"

                  >

                    AI Selected

                  </Badge>

                </div>

              </CardHeader>

              <CardContent className="p-0">

                <div className="divide-y divide-white/[0.06]">

                  {players.map((player, index) => (
                  <ExpandablePlayerCard
                    key={player.player_id}
                    player={player}
                    index={index}
                    explanation={predictionData.player_explanations?.find(
                      (item) => item.player_id === player.player_id
                    )}
                  />
                ))}

                </div>

              </CardContent>

            </Card>

            {/* ROLE BREAKDOWN */}

            <Card className="border-white/10 bg-white/[0.03]">

              <CardHeader>

                <CardTitle className="text-base">

                  Team Composition

                </CardTitle>

              </CardHeader>

              <CardContent>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                  <RoleCard

label="Wicketkeepers"

value={roleCounts.WK}

                  />

                  <RoleCard

label="Batters"

value={roleCounts.BAT}

                  />

                  <RoleCard

label="All-Rounders"

value={roleCounts.AR}

                  />

                  <RoleCard

label="Bowlers"

value={roleCounts.BOWL}

                  />

                </div>

              </CardContent>

            </Card>

            {/* MODEL ANALYSIS */}

            <Card className="border-white/10 bg-white/[0.03]">

              <CardHeader>

                <CardTitle className="flex items-center gap-2 text-base">

                  <Brain size={17} />

                  Model Analysis

                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-5">

                <div className="grid gap-4 md:grid-cols-2">

                  <div>

                    <p className="text-xs text-zinc-500">

                      Algorithm

                    </p>

                    <p className="mt-1 font-medium">

                      {predictionData.model?.algorithm ||

                        "Unavailable"}

                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-zinc-500">

                      Training Cutoff

                    </p>

                    <p className="mt-1 font-medium">

                      {predictionData.model?.training_cutoff ||

                        "Unavailable"}

                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-zinc-500">

                      Estimators

                    </p>

                    <p className="mt-1 font-medium">

                      {predictionData.model?.estimators ??

                        "Unavailable"}

                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-zinc-500">

                      Learning Rate

                    </p>

                    <p className="mt-1 font-medium">

                      {predictionData.model?.learning_rate ??

                        "Unavailable"}

                    </p>

                  </div>

                </div>

                {predictionData.comparison && (

                  <div className="border-t border-white/10 pt-5">

                    <p className="mb-4 text-sm font-medium">

                      Prediction vs Actual

                    </p>

                    <div className="space-y-4">

                      <ComparisonRow

label="Predicted Team Expected Points"

value={

                          predictionData.comparison

.predicted_team_expected_points

                        }

                      />

                      <ComparisonRow

label="Predicted Team Actual Points"

value={

                          predictionData.comparison

.predicted_team_actual_points

                        }

                      />

                      <ComparisonRow

label="Best Possible Team Points"

value={

                          predictionData.comparison

.actual_best_team_points

                        }

                      />

                      <ComparisonRow

label="Selection Regret"

value={

                          predictionData.comparison

.selection_regret

                        }

                      />

                    </div>

                  </div>

                )}

              </CardContent>

            </Card>

            {/* WARNINGS */}

            {predictionData.warnings &&

              predictionData.warnings.length > 0 && (

                <Card className="border-yellow-500/20 bg-yellow-500/[0.03]">

                  <CardHeader>

                    <CardTitle className="text-base text-yellow-400">

                      Model Notes

                    </CardTitle>

                  </CardHeader>

                  <CardContent>

                    <ul className="space-y-2">

                      {predictionData.warnings.map(

                        (warning, index) => (

                          <li

key={index}

className="text-sm leading-relaxed text-zinc-400"

                          >

                            • {warning}

                          </li>

                        )

                      )}

                    </ul>

                  </CardContent>

                </Card>

              )}

          </div>

        )}

        {/* DIRECT ACCESS */}

        {!generated &&

          !loading &&

          !error &&

          !selectedDate && (

            <Card className="border-white/10 bg-white/[0.03]">

              <CardContent className="flex flex-col items-center py-16 text-center">

                <div className="mb-4 rounded-full bg-white/[0.05] p-4">

                  <Trophy

size={25}

className="text-zinc-500"

                  />

                </div>

                <h2 className="font-semibold">

                  No match selected

                </h2>

                <p className="mt-2 max-w-md text-sm text-zinc-500">

                  Go back to the Matches page and select a

                  match to build an AI predicted XI.

                </p>

                <Link

href="/matches"

className="mt-5"

                >

                  <Button>

                    <ArrowLeft

size={15}

className="mr-2"

                    />

                    Go to Matches

                  </Button>

                </Link>

              </CardContent>

            </Card>

          )}

      </div>

    </main>

  );

}

function RoleCard({

  label,

  value,

}: {

  label: string;

  value: number;

}) {

return (

    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">

      <p className="text-xs text-zinc-500">

        {label}

      </p>

      <div className="mt-2 flex items-end justify-between">

        <p className="text-2xl font-bold">

          {value}

        </p>

        <Progress

value={(value / 11) * 100}

className="ml-4 h-1.5 flex-1"

        />

      </div>

    </div>

  );

}

function ComparisonRow({

  label,

  value,

}: {

  label: string;

  value?: number;

}) {

return (

    <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-4 py-3">

      <span className="text-sm text-zinc-400">

        {label}

      </span>

      <span className="font-semibold">

        {value !== undefined

          ? value.toFixed(1)

          : "—"}

      </span>

    </div>

  );

}

/** Feature 1 — pre-match player insights; uses existing Predicted11 response. */
function ExpandablePlayerCard({
  player,
  index,
  explanation,
}: {
  player: PredictedPlayer;
  index: number;
  explanation?: PlayerExplanation;
}) {
  const [expanded, setExpanded] = useState(false);
  const history = explanation?.history ?? [];
  const maxPoints = Math.max(1, ...history.map((game) => game.total_fantasy_points));
  const score = typeof player.predicted_points === "number" ? player.predicted_points : null;
  const fmt = (n?: number) => typeof n === "number" && Number.isFinite(n) ? n.toFixed(1) : "—";

  return (
    <div className="transition-colors hover:bg-white/[0.02]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`player-stats-${player.player_id}`}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:gap-4 md:px-6"
      >
        <span className="w-5 shrink-0 text-center text-xs text-zinc-500">{index + 1}</span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-300">
          {getInitials(player.player)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white sm:text-base">{player.player}</span>
          <span className="mt-1 block truncate text-xs text-zinc-400">
            {getShortName(player.team)} · {getRoleLabel(player.role)}
          </span>
        </span>
        <span className="hidden text-right sm:block">
          <span className="block text-[11px] text-zinc-500">Last 5 avg</span>
          <span className="text-sm font-medium text-zinc-200">{fmt(explanation?.last_5_average)}</span>
        </span>
        <span className="min-w-[62px] text-right">
          <span className="block text-[11px] text-zinc-500">Predicted</span>
          <span className="font-semibold text-green-400">{fmt(score ?? undefined)}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-zinc-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div id={`player-stats-${player.player_id}`} className="space-y-5 border-t border-white/[0.06] bg-white/[0.015] px-4 pb-5 pt-5 md:px-6">
          {!explanation ? (
            <p className="text-sm text-zinc-400">Detailed history is unavailable for this player.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <MiniPlayerStat label="Last 5 avg" value={fmt(explanation.last_5_average)} />
                <MiniPlayerStat label="Last 10 avg" value={fmt(explanation.last_10_average)} />
                <MiniPlayerStat label="Last match" value={fmt(explanation.last_fantasy_points)} />
                <MiniPlayerStat label="Career matches in data" value={String(explanation.previous_matches ?? "—")} />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#0f1319] p-4">
                  <h4 className="mb-1 text-sm font-semibold text-zinc-100">Recent fantasy form</h4>
                  <p className="mb-4 text-xs text-zinc-500">Fantasy points in the last {history.length} matches before this fixture</p>
                  {history.length ? (
                    <div className="flex h-36 items-end justify-between gap-2">
                      {history.map((game) => (
                        <div key={game.match_id} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2" title={`${game.date} vs ${game.opponent}: ${game.total_fantasy_points} pts`}>
                          <span className="text-[11px] font-medium text-zinc-300">{game.total_fantasy_points}</span>
                          <div className="flex h-24 w-full items-end justify-center rounded-md bg-white/[0.035]">
                            <div className="w-full max-w-9 rounded-t bg-green-500/80 transition-all" style={{ height: `${Math.max(4, Math.max(0, game.total_fantasy_points) / maxPoints * 100)}%` }} />
                          </div>
                          <span className="text-[10px] text-zinc-500">{game.date.slice(5)}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-xs text-zinc-500">No prior matches available.</p>}
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0f1319] p-4">
                  <h4 className="mb-3 text-sm font-semibold text-zinc-100">Fantasy points breakdown</h4>
                  <p className="mb-3 text-xs text-zinc-500">Average per match across recent history</p>
                  {(["Batting", "Bowling", "Fielding"] as const).map((domain) => {
                    const value = explanation.past_domain_averages?.[domain] ?? 0;
                    const total = Object.values(explanation.past_domain_averages ?? {}).reduce((sum, n) => sum + Math.max(0, n), 0);
                    return (
                      <div key={domain} className="mb-4 last:mb-0">
                        <div className="mb-1 flex justify-between text-xs"><span className="text-zinc-400">{domain}</span><span className="font-medium text-white">{fmt(value)}</span></div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-green-500/80" style={{width: `${total > 0 ? Math.max(0, value) / total * 100 : 0}%`}} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <MiniPlayerStat label="Avg vs opponent" value={fmt(explanation.opponent_average)} />
                <MiniPlayerStat label="Playing specialty" value={explanation.specialty_from_previous_matches ?? "—"} />
                <MiniPlayerStat label="Projected points" value={fmt(score ?? undefined)} />
              </div>
              <div className="rounded-lg border border-green-500/15 bg-green-500/[0.035] px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-green-400">Why AI selected this player</p>
                <p className="text-xs leading-relaxed text-zinc-400">{explanation.explanation ?? "Selected based on model-estimated fantasy points and XI constraints."}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MiniPlayerStat({label, value}: {label: string; value: string}) {
  return <div className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-3">
    <p className="text-[11px] text-zinc-500">{label}</p>
    <p className="mt-1 truncate text-base font-semibold text-zinc-100" title={value}>{value}</p>
  </div>;
}
