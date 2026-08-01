import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "research");
const OUTPUT_FILE = path.join(process.cwd(), "src", "content", "research.json");

function discoverResearchProjects() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const dirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const projects = [];

  for (const dir of dirs) {
    const overviewPath = path.join(CONTENT_DIR, dir.name, "overview.md");
    if (!fs.existsSync(overviewPath)) continue;

    const raw = fs.readFileSync(overviewPath, "utf-8");
    const { data } = matter(raw);

    const logDir = path.join(CONTENT_DIR, dir.name, "log");
    const pages = fs
      .readdirSync(path.join(CONTENT_DIR, dir.name))
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));

    const logEntries = fs.existsSync(logDir)
      ? fs
          .readdirSync(logDir)
          .filter((f) => f.endsWith(".md"))
          .sort()
          .map((f) => {
            const entryRaw = fs.readFileSync(path.join(logDir, f), "utf-8");
            const { data: entryData } = matter(entryRaw);
            return {
              slug: f.replace(/\.md$/, ""),
              title: entryData.title || f.replace(/\.md$/, ""),
              date: entryData.date || "",
              phase: entryData.phase || "",
              summary: entryData.summary || "",
            };
          })
      : [];

    const { content: overviewContent } = matter(raw);
    const h1Match = overviewContent.match(/^#\s+(.+)$/m);
    const projectTitle = h1Match
      ? h1Match[1]
      : dir.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    projects.push({
      id: dir.name,
      title: projectTitle,
      status: data.status || "unknown",
      started: data.started || "",
      field: data.field || "",
      summary: data.summary || "",
      pages,
      logEntries,
    });
  }

  return projects.sort((a, b) => a.id.localeCompare(b.id));
}

const projects = discoverResearchProjects();
const output = JSON.stringify({ projects }, null, 2) + "\n";

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Built research.json (${projects.length} research projects discovered)`);
