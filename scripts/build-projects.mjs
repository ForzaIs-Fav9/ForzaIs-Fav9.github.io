import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const OUTPUT_FILE = path.join(process.cwd(), "src", "content", "projects.json");

function discoverProjects() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const dirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const projects = [];

  for (const dir of dirs) {
    const metaPath = path.join(CONTENT_DIR, dir.name, "project.json");
    if (!fs.existsSync(metaPath)) continue;

    const raw = fs.readFileSync(metaPath, "utf-8");
    const data = JSON.parse(raw);
    projects.push(data);
  }

  return projects.sort((a, b) => b.date.localeCompare(a.date));
}

const projects = discoverProjects();
const output = JSON.stringify({ projects }, null, 2) + "\n";

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Built projects.json (${projects.length} projects discovered)`);
