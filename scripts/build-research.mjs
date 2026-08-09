import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "research");
const OUTPUT_FILE = path.join(
  process.cwd(),
  "src",
  "content",
  "research.json"
);

function discoverResearchProjects() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const dirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const projects = [];

  for (const dir of dirs) {
    const overviewPath = path.join(
      CONTENT_DIR,
      dir.name,
      "overview.md"
    );

    if (!fs.existsSync(overviewPath)) continue;

    const raw = fs.readFileSync(overviewPath, "utf-8");
    const { data } = matter(raw);

    const projectDir = path.join(CONTENT_DIR, dir.name);
    const logDir = path.join(projectDir, "log");
    const researchNotesDir = path.join(
      projectDir,
      "research-notes"
    );

    const pages = fs
      .readdirSync(projectDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));

    const researchNotes = fs.existsSync(researchNotesDir)
      ? fs
          .readdirSync(researchNotesDir)
          .filter((f) => f.endsWith(".md"))
          .sort()
          .map((f) => {
            const notePath = path.join(researchNotesDir, f);
            const noteRaw = fs.readFileSync(notePath, "utf-8");
            const { data: noteData } = matter(noteRaw);

            return {
              slug: f.replace(/\.md$/, ""),
              title:
                noteData.title ||
                f.replace(/\.md$/, ""),
              date: noteData.date || "",
              version: noteData.version || "",
              summary: noteData.summary || "",
            };
          })
      : [];

    const logEntries = fs.existsSync(logDir)
      ? fs
          .readdirSync(logDir)
          .filter((f) => f.endsWith(".md"))
          .sort()
          .map((f) => {
            const entryRaw = fs.readFileSync(
              path.join(logDir, f),
              "utf-8"
            );

            const { data: entryData } = matter(entryRaw);

            return {
              slug: f.replace(/\.md$/, ""),
              title:
                entryData.title ||
                f.replace(/\.md$/, ""),
              date: entryData.date || "",
              phase: entryData.phase || "",
              summary: entryData.summary || "",
            };
          })
      : [];

    const { content: overviewContent } = matter(raw);

    const h1Match = overviewContent.match(
      /^#\s+(.+)$/m
    );

    const projectTitle = h1Match
      ? h1Match[1]
      : dir.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

    projects.push({
      id: dir.name,
      title: projectTitle,
      status: data.status || "unknown",
      started: data.started || "",
      field: data.field || "",
      summary: data.summary || "",
      pages,
      researchNotes,
      logEntries,
    });
  }

  return projects.sort((a, b) =>
    a.id.localeCompare(b.id)
  );
}

const projects = discoverResearchProjects();

const output =
  JSON.stringify({ projects }, null, 2) + "\n";

fs.writeFileSync(OUTPUT_FILE, output);

console.log(
  `Built research.json (${projects.length} research projects discovered)`
);