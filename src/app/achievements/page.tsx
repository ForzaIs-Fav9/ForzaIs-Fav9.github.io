import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementList } from "@/components/achievements/AchievementList";

export const metadata: Metadata = createMetadata({
  title: "Achievements",
  description:
    "Awards, competitions, and recognitions across academics, research, and technology.",
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Achievements"
          subtitle="Awards, competitions, and milestones along the way."
        />
        <AchievementList />
      </PageWrapper>
    </Container>
  );
}
