import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchNav } from "@/components/research/ResearchNav";
import { ResearchJournalList } from "@/components/research/ResearchJournalList";
import { researchProjects } from "@/lib/content";

type Props = { params: Promise<{ project: string }> };

export function generateStaticParams() {
  return researchProjects.map((p) => ({ project: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) return {};
  return createMetadata({
    title: `Research Log — ${proj.title}`,
    description: `Chronological research log for ${proj.title}.`,
    path: `/research/${project}/log`,
  });
}

export default async function ResearchJournalPage({ params }: Props) {
  const { project } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) notFound();

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading title={proj.title} subtitle="Research Log" />
        <ResearchNav projectId={project} pages={proj.pages} logCount={proj.logEntries.length} />
        <ResearchJournalList projectId={project} entries={proj.logEntries} />
      </PageWrapper>
    </Container>
  );
}
