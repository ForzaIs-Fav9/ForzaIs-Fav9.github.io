import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LabContent } from "@/components/lab/LabContent";

export const metadata: Metadata = createMetadata({
  title: "Lab",
  description: "Experiments, future ideas, research notes, and speculative questions.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Lab"
          subtitle="Where half-formed ideas live."
        />
        <LabContent />
      </PageWrapper>
    </Container>
  );
}
