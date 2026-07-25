import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  version?: string;
  summary: string;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "projects");

export function getJournalEntries(projectSlug: string): JournalEntry[] {
  const journalDir = path.join(CONTENT_ROOT, projectSlug, "journal");

  if (!fs.existsSync(journalDir)) {
    return [];
  }

  const files = fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(journalDir, file), "utf-8");
      const { data, content } = matter(raw);

      if (!data.title || data.title === "TODO") return null;

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        version: data.version || undefined,
        summary: data.summary,
        content: marked.parse(content.trim(), { async: false }) as string,
      };
    })
    .filter(Boolean) as JournalEntry[];
}
