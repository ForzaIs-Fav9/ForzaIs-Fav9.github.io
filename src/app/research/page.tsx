import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchGrid } from "@/components/research/ResearchGrid";

export const metadata: Metadata = createMetadata({
  title: "Research",
  description:
    "Independent research projects spanning physics, mathematics, and chemistry.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Research"
          subtitle="Independent investigations driven by curiosity."
        />
        <ResearchGrid />
      </PageWrapper>
    </Container>
  );
}
