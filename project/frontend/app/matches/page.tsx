"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  RotateCcw,
  SearchX,
  Shield,
  Sparkles,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";

interface Match {
  id: number;
  date: string;
  season: string;
  team1: string;
  team2: string;
  venue?: string | null;
  city?: string | null;
  match_type?: string | null;
}

interface ApiResponse {
  data: Match[];
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.43.39:8000").replace(/\/$/, "");
const INITIAL_DATE = "2025-04-03";
const abbreviations: Record<string, string> = {
  "Chennai Super Kings": "CSK",
  "Mumbai Indians": "MI",
  "Royal Challengers Bengaluru": "RCB",
  "Royal Challengers Bangalore": "RCB",
  "Kolkata Knight Riders": "KKR",
  "Delhi Capitals": "DC",
  "Delhi Daredevils": "DD",
  "Punjab Kings": "PBKS",
  "Kings XI Punjab": "KXIP",
  "Rajasthan Royals": "RR",
  "Sunrisers Hyderabad": "SRH",
  "Lucknow Super Giants": "LSG",
  "Gujarat Titans": "GT",
  "Gujarat Lions": "GL",
  "Rising Pune Supergiant": "RPS",
  "Rising Pune Supergiants": "RPS",
};

function teamShortName(team: string) {
  return abbreviations[team] || team.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 4).toUpperCase();
}

function displayDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function matchTime(iso: string) {
  // Only the displayed clock time is converted to India time; the requested date is not.
  if (!iso || !iso.includes("T")) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(date) + " IST";
}

function TeamIdentity({ name, accent }: { name: string; accent: "green" | "blue" }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-sm font-black tracking-wide shadow-inner sm:h-16 sm:w-16 ${accent === "green" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-sky-400/20 bg-sky-400/10 text-sky-300"}`}>
        {teamShortName(name)}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{teamShortName(name)}</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-zinc-100 sm:text-base">{name}</h3>
      </div>
    </div>
  );
}

function MatchCard({ match, selectedDate, index }: { match: Match; selectedDate: string; index: number }) {
  const params = new URLSearchParams({ date: selectedDate, team1: match.team1, team2: match.team2 });
  const time = matchTime(match.date);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12171d] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="p-5 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-3 py-1 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Match {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-zinc-400">
              {match.match_type || "Cricket"}
            </span>
            {match.season && <span className="text-xs text-zinc-500">Season {match.season}</span>}
          </div>
          {time && <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400"><Clock3 className="h-3.5 w-3.5" /> {time}</span>}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <TeamIdentity name={match.team1} accent="green" />
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="h-5 w-px bg-gradient-to-b from-transparent to-zinc-700" />
            <span className="text-xs font-black tracking-[0.2em] text-zinc-500">VS</span>
            <div className="h-5 w-px bg-gradient-to-t from-transparent to-zinc-700" />
          </div>
          <TeamIdentity name={match.team2} accent="blue" />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-emerald-400/80" /> {displayDate(selectedDate)}</span>
            {(match.venue || match.city) && (
              <span className="inline-flex items-start gap-2"><MapPin className="mt-px h-4 w-4 shrink-0 text-emerald-400/80" /> {[match.venue, match.city].filter(Boolean).join(", ")}</span>
            )}
          </div>
          <Link
            href={`/team-builder?${params.toString()}`}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-[#062417] shadow-[0_5px_25px_rgba(16,185,129,0.12)] transition-all hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:w-auto"
          >
            <WandSparkles className="h-4 w-4" /> Build AI Team <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MatchesPage() {
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshIndex, setRefreshIndex] = useState(0);

  const retry = useCallback(() => setRefreshIndex((previous) => previous + 1), []);

  useEffect(() => {
    if (!selectedDate) {
      setMatches([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    async function fetchMatches() {
      setLoading(true);
      setError("");
      setMatches([]);
      try {
        const response = await fetch(`${API_BASE_URL}/api/team`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: selectedDate }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        const result: ApiResponse = await response.json();
        if (!Array.isArray(result?.data)) throw new Error("Unexpected matches response from backend");
        if (!controller.signal.aborted) setMatches(result.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unable to load matches");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void fetchMatches();
    return () => controller.abort();
  }, [selectedDate, refreshIndex]);

  return (
    <div className="min-h-screen bg-[#080a0f] text-zinc-100">
      <div className="pointer-events-none absolute inset-x-0 top-16 h-80 overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.10),transparent_65%)]" />
      <header className="relative z-10 border-b border-white/[0.07] bg-[#0b0e13]/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-bold text-white sm:text-base">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10"><Trophy className="h-5 w-5 text-emerald-400" /></span>
            AI Cricket <span className="text-emerald-400">Predictor</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition hover:text-white sm:text-sm"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered fantasy cricket
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Explore <span className="text-emerald-400">Matches</span></h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">Pick a match date, explore the fixtures, and build your AI-optimized fantasy XI.</p>
          </div>
          <div className="hidden items-center gap-3 rounded-xl border border-white/[0.07] bg-[#12171d] px-4 py-3 md:flex">
            <span className="rounded-lg bg-emerald-400/10 p-2"><Shield className="h-5 w-5 text-emerald-400" /></span>
            <div><div className="text-sm font-semibold text-white">Data-driven selections</div><div className="mt-0.5 text-xs text-zinc-500">Player form · Fantasy projections</div></div>
          </div>
        </div>

        <section className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12171d] p-5 sm:p-6" aria-label="Match date selector">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10"><CalendarDays className="h-5 w-5 text-emerald-400" /></span>
              <div><h2 className="font-semibold text-white">Choose match date</h2><p className="mt-1 text-xs text-zinc-400">Available matches update automatically</p></div>
            </div>
            <input
              type="date"
              aria-label="Select match date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-white/[0.12] bg-[#0b0f14] px-4 py-3 text-sm font-medium text-zinc-100 outline-none transition [color-scheme:dark] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:w-52"
            />
          </div>
        </section>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-emerald-400" /><h2 className="text-base font-bold text-white">Matches for {displayDate(selectedDate)}</h2></div>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400">{loading ? "Loading" : `${matches.length} ${matches.length === 1 ? "match" : "matches"}`}</span>
        </div>

        {loading && <div className="space-y-4" role="status" aria-label="Loading matches">{[0, 1].map((i) => <div key={i} className="h-64 animate-pulse rounded-2xl border border-white/[0.07] bg-[#12171d] p-6"><div className="mb-10 h-5 w-40 rounded bg-white/[0.06]" /><div className="h-16 rounded-xl bg-white/[0.06]" /><div className="mt-8 h-12 rounded-xl bg-white/[0.06]" /></div>)}</div>}

        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.05] px-6 py-12 text-center">
            <SearchX className="mx-auto mb-4 h-9 w-9 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Couldn’t load matches</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{error}. Check that your backend is running and reachable.</p>
            <button onClick={retry} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-[#062417] transition hover:bg-emerald-400"><RotateCcw className="h-4 w-4" /> Try again</button>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#12171d] px-6 py-14 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10"><CalendarDays className="h-7 w-7 text-emerald-400" /></div>
            <h3 className="text-lg font-bold text-white">No matches found</h3>
            <p className="mt-2 text-sm text-zinc-400">There are no matches available for {displayDate(selectedDate)}. Try another date.</p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && <div className="space-y-4">{matches.map((match, index) => <MatchCard key={`${match.id}-${index}`} match={match} selectedDate={selectedDate} index={index} />)}</div>}

        <footer className="mt-10 flex items-center justify-center gap-2 text-xs text-zinc-600"><Sparkles className="h-3.5 w-3.5" /> Match details and predictions are provided by your connected backend <ArrowRight className="h-3.5 w-3.5" /></footer>
      </main>
    </div>
  );
}
