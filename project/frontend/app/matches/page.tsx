"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  Trophy,
  Sparkles,
} from "lucide-react";


// =========================================================
//  TYPES
// =========================================================

type Match = {
  id: number;
  team1: string;
  team1Name: string;
  team1Logo?: string;

  team2: string;
  team2Name: string;
  team2Logo?: string;

  date: string;
  time: string;
  venue: string;
  status: string;

  prediction: {
    team1: number;
    team2: number;
  };
};


// =========================================================
//  MAIN PAGE
// =========================================================

export default function MatchesPage() {
  const [selectedDate, setSelectedDate] = useState("2026-10-12");

  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =======================================================
  // FETCH MATCHES WHEN DATE CHANGES
  // =======================================================

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://172.18.12.61:8000/api/team",
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
          throw new Error("Failed to fetch matches");
        }


        const data = await response.json();

        console.log("API RESPONSE:", data);


        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);

        setError("Could not load matches.");

        setMatches([]);
      } finally {
        setLoading(false);
      }
    };


    fetchMatches();
  }, [selectedDate]);


  // =======================================================
  // UI
  // =======================================================

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



        {/* ================= DATE SELECTOR ================= */}

        <section className="mb-8 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/[0.08] via-white/[0.03] to-transparent p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


            <div>

              <div className="mb-2 flex items-center gap-2">

                <CalendarDays
                  size={18}
                  className="text-green-400"
                />

                <span className="text-sm font-medium uppercase tracking-wider text-zinc-300">
                  Select Match Date
                </span>

              </div>


              <p className="text-sm text-gray-500">
                Choose a date to see the matches scheduled for that day.
              </p>

            </div>



            <div className="relative">

             <div className="flex items-center gap-3">
  <input
  type="date"
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  className="cursor-pointer rounded-xl border border-white/10 bg-lime-300 px-4 py-3 text-sm text-black font-extrabold outline-none transition focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30"
/>
</div>

            </div>

          </div>

        </section>



        {/* ================= SELECTED DATE ================= */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Matches
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Matches for{" "}
              <span className="text-gray-300">
                {formatDate(selectedDate)}
              </span>
            </p>

          </div>


          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
            {matches.length} Matches
          </span>

        </div>



        {/* ================= LOADING ================= */}

        {loading && (

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-green-500" />

            <p className="text-sm text-gray-400">
              Loading matches...
            </p>

          </div>

        )}



        {/* ================= ERROR ================= */}

        {!loading && error && (

          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-10 text-center">

            <p className="text-sm text-red-400">
              {error}
            </p>

          </div>

        )}



        {/* ================= NO MATCHES ================= */}

        {!loading && !error && matches.length === 0 && (

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">

            <CalendarDays
              size={32}
              className="mx-auto mb-4 text-gray-600"
            />

            <h3 className="font-medium text-gray-300">
              No matches found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are no matches scheduled for this date.
            </p>

          </div>

        )}



        {/* ================= ALL MATCHES ================= */}

        {!loading && !error && matches.length > 0 && (

          <div className="grid gap-4 lg:grid-cols-2">

            {matches.map((match) => (

              <MatchCard
                key={match.id}
                match={match}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}



// =========================================================
//  DATE FORMATTER
// =========================================================

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}



// =========================================================
//  TEAM DISPLAY
// =========================================================

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
        reverse
          ? "md:flex-row-reverse md:text-right"
          : ""
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



// =========================================================
//  PREDICTION
// =========================================================

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
            winner
              ? "bg-green-500"
              : "bg-gray-600"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}



// =========================================================
//  MATCH CARD
// =========================================================

function MatchCard({
  match,
}: {
  match: Match;
}) {

  return (

    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-green-500/30 hover:bg-white/[0.04]">


      {/* ================= TOP ================= */}

      <div className="mb-5 flex items-center justify-between">

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          {match.status}
        </span>


        <span className="text-xs text-gray-500">
          {match.date}
        </span>

      </div>



      {/* ================= TEAMS ================= */}

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">


        {/* TEAM 1 */}

        <div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] font-bold">
            {match.team1}
          </div>

          <p className="mt-2 text-sm font-medium">
            {match.team1}
          </p>

        </div>



        {/* VS */}

        <div className="text-center">

          <span className="text-xs font-medium text-gray-600">
            VS
          </span>

          <p className="mt-1 text-xs text-gray-500">
            {match.time}
          </p>

        </div>



        {/* TEAM 2 */}

        <div className="text-right">

          <div className="ml-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] font-bold">
            {match.team2}
          </div>

          <p className="mt-2 text-sm font-medium">
            {match.team2}
          </p>

        </div>

      </div>



      {/* ================= VENUE ================= */}

      <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">

        <MapPin size={13} />

        {match.venue}

      </div>



      {/* ================= AI PREDICTION ================= */}

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



      {/* ================= BUTTON ================= */}

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