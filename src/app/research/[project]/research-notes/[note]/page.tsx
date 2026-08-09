import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ResearchNav } from "@/components/research/ResearchNav";
import { researchProjects } from "@/lib/content";
import { getResearchNote } from "@/lib/research";

type Props = {
  params: Promise<{
    project: string;
    note: string;
  }>;
};

export function generateStaticParams() {
  const params: {
    project: string;
    note: string;
  }[] = [];

  for (const proj of researchProjects) {
    for (const note of proj.researchNotes || []) {
      params.push({
        project: proj.id,
        note: note.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { project, note } = await params;

  const proj = researchProjects.find(
    (p) => p.id === project
  );

  const noteData = getResearchNote(
    project,
    note
  );

  if (!proj || !noteData) return {};

  return createMetadata({
    title: `${noteData.title} — ${proj.title}`,
    description:
      (noteData.frontmatter.summary as string) ||
      proj.summary,
    path: `/research/${project}/research-notes/${note}`,
  });
}

export default async function ResearchNotePage({
  params,
}: Props) {
  const { project, note } = await params;

  const proj = researchProjects.find(
    (p) => p.id === project
  );

  if (!proj) notFound();

  const noteData = getResearchNote(
    project,
    note
  );

  if (!noteData) notFound();

  const date = noteData.frontmatter.date as
    | string
    | undefined;

  const version = noteData.frontmatter.version as
    | string
    | undefined;

  return (
    <Container className="py-24">
      <PageWrapper>
        <ResearchNav
          projectId={project}
          pages={proj.pages}
          logCount={proj.logEntries.length}
        />

        <article className="mt-10">
          <header className="border-b border-border pb-5">
            <p className="text-sm font-medium text-accent">
              {noteData.slug.toUpperCase()}
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {noteData.title}
            </h1>

            {(version || date) && (
              <p className="mt-3 text-sm text-text-secondary">
                {[version, date]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </header>

          <div
            className="prose-journal mt-8"
            dangerouslySetInnerHTML={{
              __html: noteData.content,
            }}
          />
        </article>
      </PageWrapper>
    </Container>
  );
}