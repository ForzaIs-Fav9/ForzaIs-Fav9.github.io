"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { researchProjects } from "@/lib/content";

const PAGE_LABELS: Record<string, string> = {
  overview: "Overview",
  "current-status": "Current Status",
  literature: "Literature",
  "mathematical-notes": "Mathematical Notes",
  timeline: "Timeline",
};

const PAGE_ORDER = [
  "overview",
  "current-status",
  "literature",
  "mathematical-notes",
  "timeline",
];

interface ResearchNavProps {
  projectId: string;
  pages: string[];
  logCount: number;
}

export function ResearchNav({
  projectId,
  pages,
  logCount,
}: ResearchNavProps) {
  const pathname = usePathname();
  const base = `/research/${projectId}`;

  const project = researchProjects.find(
    (p) => p.id === projectId
  );

  const ordered = PAGE_ORDER.filter((p) =>
    pages.includes(p)
  );

  const extra = pages
    .filter((p) => !PAGE_ORDER.includes(p))
    .sort();

  const sortedPages = [...ordered, ...extra];

  const navItems = [
    ...sortedPages.map((p) => ({
      href:
        p === "overview"
          ? base
          : `${base}/${p}`,
      label:
        PAGE_LABELS[p] ||
        p
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
    ...(project?.researchNotes?.length
      ? [
          {
            href: `${base}/research-notes`,
            label: `Research Notes (${project.researchNotes.length})`,
          },
        ]
      : []),
    {
      href: `${base}/log`,
      label: `Research Log (${logCount})`,
    },
  ];

  return (
    <nav className="flex flex-wrap items-center gap-1.5">
      {navItems.map((item) => {
        const isActive =
			pathname === item.href ||
			(item.href !== base &&
			pathname.startsWith(`${item.href}/`));

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