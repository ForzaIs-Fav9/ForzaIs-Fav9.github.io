import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExploringList } from "@/components/exploring/ExploringList";
import { exploringLastUpdated } from "@/lib/content";

export const metadata: Metadata = createMetadata({
  title: "What I'm Exploring",
  description:
    "Current interests, learning projects, and intellectual rabbit holes I'm diving into.",
  path: "/exploring",
});

export default function ExploringPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="What I'm Exploring"
          subtitle="Current rabbit holes, learning projects, and intellectual pursuits."
        />
        <p className="mb-10 text-sm text-text-tertiary">
          Last updated:{" "}
          {new Date(exploringLastUpdated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <ExploringList />
      </PageWrapper>
    </Container>
  );
}
