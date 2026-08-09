import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title={proj.title}
          subtitle="Research Notes"
        />

        <ResearchNav
          projectId={project}
          pages={proj.pages}
          logCount={proj.logEntries.length}
        />

        <article className="prose-journal mt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: noteData.content,
            }}
          />
        </article>
      </PageWrapper>
    </Container>
  );
}