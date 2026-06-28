import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NowContent } from "@/components/now/NowContent";
import { nowPage } from "@/lib/content";

export const metadata: Metadata = createMetadata({
  title: "Now",
  description: "What I'm focused on right now — goals, projects, reading, and research.",
  path: "/now",
});

export default function NowPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Now"
          subtitle={nowPage.focus.startsWith("TODO") ? "What I'm focused on right now." : nowPage.focus}
        />
        <p className="mb-2 text-sm text-text-tertiary">
          Last updated:{" "}
          {new Date(nowPage.lastUpdated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mb-10 text-sm text-text-tertiary">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            /now page
          </a>
          . It tells you what I&apos;m focused on at this point in my life.
        </p>
        <NowContent />
      </PageWrapper>
    </Container>
  );
}
