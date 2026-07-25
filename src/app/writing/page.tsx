import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleList } from "@/components/writing/ArticleList";
import { Button } from "@/components/ui/Button";
import { personal } from "@/lib/content";

export const metadata: Metadata = createMetadata({
  title: "Writing",
  description:
    "Essays and articles on quantum physics, AI, entrepreneurship, and interdisciplinary thinking.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Writing"
          subtitle="Essays on physics, AI, building, and the ideas between disciplines."
        />

        <div className="mb-10">
          <Button href={personal.socials.substack} variant="secondary" external>
            Subscribe on Substack &rarr;
          </Button>
        </div>

        <ArticleList />
      </PageWrapper>
    </Container>
  );
}
