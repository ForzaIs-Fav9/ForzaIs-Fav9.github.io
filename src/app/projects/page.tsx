import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Technical projects spanning AI, quantum physics, space, and entrepreneurship.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Projects"
          subtitle="Things I've built — from research tools to startup prototypes."
        />
        <ProjectGrid />
      </PageWrapper>
    </Container>
  );
}
