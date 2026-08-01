import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchNav } from "@/components/research/ResearchNav";
import { researchProjects } from "@/lib/content";
import { getResearchLogEntry } from "@/lib/research";

type Props = { params: Promise<{ project: string; entry: string }> };

export function generateStaticParams() {
  const params: { project: string; entry: string }[] = [];
  for (const proj of researchProjects) {
    for (const entry of proj.logEntries) {
      params.push({ project: proj.id, entry: entry.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, entry } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  const entryData = getResearchLogEntry(project, entry);
  if (!proj || !entryData) return {};
  return createMetadata({
    title: `${entryData.title} — ${proj.title}`,
    description: (entryData.frontmatter.summary as string) || proj.summary,
    path: `/research/${project}/log/${entry}`,
  });
}

export default async function ResearchJournalEntryPage({ params }: Props) {
  const { project, entry } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) notFound();

  const entryData = getResearchLogEntry(project, entry);
  if (!entryData) notFound();

  const date = entryData.frontmatter.date as string | undefined;
  const phase = entryData.frontmatter.phase as string | undefined;

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading title={entryData.title} subtitle={proj.title} />
        <ResearchNav projectId={project} pages={proj.pages} logCount={proj.logEntries.length} />
        <div className="mt-6 flex items-center gap-4 text-sm text-text-tertiary">
          {date && <span>{date}</span>}
          {phase && (
            <span className="rounded-full bg-accent-muted/50 px-2.5 py-0.5 text-xs font-medium text-accent">
              {phase}
            </span>
          )}
        </div>
        <div
          className="prose-journal mt-8"
          dangerouslySetInnerHTML={{ __html: entryData.content }}
        />
      </PageWrapper>
    </Container>
  );
}
