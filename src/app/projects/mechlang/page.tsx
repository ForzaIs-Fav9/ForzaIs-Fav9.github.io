import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectJournal } from "@/components/journal/ProjectJournal";
import { getJournalEntries } from "@/lib/journal";

export const metadata: Metadata = createMetadata({
  title: "MechLang — Project Journal",
  description: "Development journal for MechLang.",
  path: "/projects/mechlang",
});

export default function MechLangPage() {
  const entries = getJournalEntries("mechlang");

  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="MechLang"
          subtitle="Project journal"
        />
        <ProjectJournal entries={entries} />
      </PageWrapper>
    </Container>
  );
}
