
"use client";

import Link from "next/link";
import { Menu, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07090D]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-black">
            <Trophy className="h-5 w-5" strokeWidth={2.5} />

            <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#07090D] bg-lime-400" />
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight">
              <span className="text-lime-400">PREDICT XI</span>
            </div>

            <div className="text-[9px] font-medium tracking-[0.2em] text-gray-600">
              AI CRICKET ANALYTICS
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-1.5 md:flex">
          <NavItem href="/">Overview</NavItem>
          <NavItem href="/matches">Matches</NavItem>
          <NavItem href="/team-builder">Team Builder</NavItem>
          <NavItem href="/analytics">Analytics</NavItem>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Model status */}
          <div className="hidden items-center gap-2 rounded-lg border border-lime-400/10 bg-lime-400/[0.03] px-3.5 py-2.5 text-sm font-medium text-gray-400 lg:flex">
            <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.6)]" />
            Model Online
          </div>

          {/* Builder button */}
          <Link href="/team-builder">
            <Button className="bg-lime-400 px-5 text-sm font-bold text-black hover:bg-lime-300">
              Launch Builder
            </Button>
          </Link>

          {/* Mobile menu */}
          <button
            className="rounded-lg border border-white/10 p-2.5 transition hover:border-lime-400/40 hover:text-lime-400 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        rounded-lg
        px-4
        py-2.5
        text-sm
        font-semibold
        text-gray-400
        transition-all
        duration-200

        hover:bg-lime-400/[0.08]
        hover:text-lime-400

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-lime-400/50
      "
    >
      {children}
    </Link>
  );
}
