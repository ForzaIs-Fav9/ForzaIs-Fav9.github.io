"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_LABELS: Record<string, string> = {
  overview: "Overview",
  "current-status": "Current Status",
  literature: "Literature",
  "mathematical-notes": "Mathematical Notes",
  timeline: "Timeline",
};

const PAGE_ORDER = ["overview", "current-status", "literature", "mathematical-notes", "timeline"];

interface ResearchNavProps {
  projectId: string;
  pages: string[];
  logCount: number;
}

export function ResearchNav({ projectId, pages, logCount }: ResearchNavProps) {
  const pathname = usePathname();
  const base = `/research/${projectId}`;

  const ordered = PAGE_ORDER.filter((p) => pages.includes(p));
  const extra = pages
    .filter((p) => !PAGE_ORDER.includes(p))
    .sort();
  const sortedPages = [...ordered, ...extra];

  const navItems = [
    ...sortedPages
      .map((p) => ({
        href: p === "overview" ? base : `${base}/${p}`,
        label: PAGE_LABELS[p] || p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      })),
    { href: `${base}/log`, label: `Research Log (${logCount})` },
  ];

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          pathname === `${item.href}/`;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-accent-muted/50 text-accent font-medium"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
