import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchNav } from "@/components/research/ResearchNav";
import { researchProjects } from "@/lib/content";
import { getResearchPage } from "@/lib/research";

type Props = { params: Promise<{ project: string }> };

export function generateStaticParams() {
  return researchProjects.map((p) => ({ project: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) return {};
  return createMetadata({
    title: `${proj.title} — Research`,
    description: proj.summary,
    path: `/research/${project}`,
  });
}

export default async function ResearchProjectPage({ params }: Props) {
  const { project } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) notFound();

  const page = getResearchPage(project, "overview");

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading title={proj.title} subtitle={proj.field} />
        <ResearchNav projectId={project} pages={proj.pages} logCount={proj.logEntries.length} />
        {page && (
          <div
            className="prose-journal mt-8"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </PageWrapper>
    </Container>
  );
}
