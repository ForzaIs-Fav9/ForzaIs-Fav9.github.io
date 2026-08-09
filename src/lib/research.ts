import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import katex from "katex";

export type ResearchPageData = {
  slug: string;
  title: string;
  frontmatter: Record<string, unknown>;
  content: string;
};

const CONTENT_ROOT = path.join(
  process.cwd(),
  "content",
  "research"
);

function renderMath(
  src: string,
  displayMode: boolean
): string {
  try {
    return katex.renderToString(src, {
      displayMode,
      throwOnError: false,
    });
  } catch {
    return src;
  }
}

function renderMarkdown(raw: string): string {
  let text = raw.trim();

  text = text.replace(
    /\$\$([\s\S]*?)\$\$/g,
    (_match, math) => {
      const placeholder = `<div class="katex-display">${renderMath(
        math.trim(),
        true
      )}</div>`;

      return placeholder;
    }
  );

  text = text.replace(
    /(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g,
    (_match, math) => {
      return renderMath(math, false);
    }
  );

  return marked.parse(text, {
    async: false,
  }) as string;
}

export function getResearchPage(
  projectSlug: string,
  pageSlug: string
): ResearchPageData | null {
  const filePath = path.join(
    CONTENT_ROOT,
    projectSlug,
    `${pageSlug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(
    filePath,
    "utf-8"
  );

  const { data, content } = matter(raw);

  return {
    slug: pageSlug,
    title: data.title || pageSlug,
    frontmatter: data,
    content: renderMarkdown(content),
  };
}

export function getResearchLogEntry(
  projectSlug: string,
  entrySlug: string
): ResearchPageData | null {
  const filePath = path.join(
    CONTENT_ROOT,
    projectSlug,
    "log",
    `${entrySlug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(
    filePath,
    "utf-8"
  );

  const { data, content } = matter(raw);

  return {
    slug: entrySlug,
    title: data.title || entrySlug,
    frontmatter: data,
    content: renderMarkdown(content),
  };
}

export function getResearchLogEntries(
  projectSlug: string
): ResearchPageData[] {
  const logDir = path.join(
    CONTENT_ROOT,
    projectSlug,
    "log"
  );

  if (!fs.existsSync(logDir)) {
    return [];
  }

  const files = fs
    .readdirSync(logDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map((file) => {
      const raw = fs.readFileSync(
        path.join(logDir, file),
        "utf-8"
      );

      const { data, content } = matter(raw);

      if (!data.title || data.title === "TODO") {
        return null;
      }

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        frontmatter: data,
        content: renderMarkdown(content),
      };
    })
    .filter(Boolean) as ResearchPageData[];
}

export function getResearchNote(
  projectSlug: string,
  noteSlug: string
): ResearchPageData | null {
  const filePath = path.join(
    CONTENT_ROOT,
    projectSlug,
    "research-notes",
    `${noteSlug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(
    filePath,
    "utf-8"
  );

  const { data, content } = matter(raw);

  return {
    slug: noteSlug,
    title: data.title || noteSlug,
    frontmatter: data,
    content: renderMarkdown(content),
  };
}

export function getResearchNotes(
  projectSlug: string
): ResearchPageData[] {
  const notesDir = path.join(
    CONTENT_ROOT,
    projectSlug,
    "research-notes"
  );

  if (!fs.existsSync(notesDir)) {
    return [];
  }

  const files = fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map((file) => {
      const raw = fs.readFileSync(
        path.join(notesDir, file),
        "utf-8"
      );

      const { data, content } = matter(raw);

      if (!data.title || data.title === "TODO") {
        return null;
      }

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        frontmatter: data,
        content: renderMarkdown(content),
      };
    })
    .filter(Boolean) as ResearchPageData[];
}