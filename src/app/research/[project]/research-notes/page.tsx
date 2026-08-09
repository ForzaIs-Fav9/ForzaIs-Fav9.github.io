import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchNav } from "@/components/research/ResearchNav";
import { researchProjects } from "@/lib/content";

type Props = {
  params: Promise<{ project: string }>;
};

export function generateStaticParams() {
  return researchProjects
    .filter((proj) => proj.researchNotes?.length)
    .map((proj) => ({
      project: proj.id,
    }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { project } = await params;

  const proj = researchProjects.find(
    (p) => p.id === project
  );

  if (!proj) return {};

  return createMetadata({
    title: `Research Notes — ${proj.title}`,
    description: `Formal research notes for ${proj.title}.`,
    path: `/research/${project}/research-notes`,
  });
}

export default async function ResearchNotesPage({
  params,
}: Props) {
  const { project } = await params;

  const proj = researchProjects.find(
    (p) => p.id === project
  );

  if (!proj) notFound();

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

        <div className="mt-8 space-y-4">
          {proj.researchNotes.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-text-secondary">
                Research notes coming soon.
              </p>
            </div>
          ) : (
            proj.researchNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/research/${project}/research-notes/${note.slug}`}
                className="block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-serif text-xl text-text-primary">
                    {note.title}
                  </h2>

                  {note.version && (
                    <span className="rounded-md bg-accent-muted/40 px-2 py-1 text-xs text-accent">
                      {note.version}
                    </span>
                  )}
                </div>

                {note.date && (
                  <p className="mt-2 text-sm text-text-tertiary">
                    {note.date}
                  </p>
                )}

                {note.summary && (
                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {note.summary}
                  </p>
                )}
              </Link>
            ))
          )}
        </div>
      </PageWrapper>
    </Container>
  );
}