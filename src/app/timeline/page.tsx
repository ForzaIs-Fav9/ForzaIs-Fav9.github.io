import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineTrack } from "@/components/timeline/TimelineTrack";

export const metadata: Metadata = createMetadata({
  title: "Timeline",
  description: "A chronological journey through milestones, projects, and achievements.",
  path: "/timeline",
});

export default function TimelinePage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Timeline"
          subtitle="Key moments in my journey — projects, achievements, and turning points."
        />
        <TimelineTrack />
      </PageWrapper>
    </Container>
  );
}
