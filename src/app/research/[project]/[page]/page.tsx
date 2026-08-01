import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchNav } from "@/components/research/ResearchNav";
import { researchProjects } from "@/lib/content";
import { getResearchPage } from "@/lib/research";

type Props = { params: Promise<{ project: string; page: string }> };

export function generateStaticParams() {
  const params: { project: string; page: string }[] = [];
  for (const proj of researchProjects) {
    for (const page of proj.pages) {
      if (page === "overview") continue;
      params.push({ project: proj.id, page });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, page } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  const pageData = getResearchPage(project, page);
  if (!proj || !pageData) return {};
  return createMetadata({
    title: `${pageData.title} — ${proj.title}`,
    description: proj.summary,
    path: `/research/${project}/${page}`,
  });
}

export default async function ResearchContentPage({ params }: Props) {
  const { project, page } = await params;
  const proj = researchProjects.find((p) => p.id === project);
  if (!proj) notFound();

  const pageData = getResearchPage(project, page);
  if (!pageData) notFound();

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading title={proj.title} subtitle={proj.field} />
        <ResearchNav projectId={project} pages={proj.pages} logCount={proj.logEntries.length} />
        <div
          className="prose-journal mt-8"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
      </PageWrapper>
    </Container>
  );
}
