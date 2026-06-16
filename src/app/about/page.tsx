import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Interests } from "@/components/about/Interests";
import { personal } from "@/lib/content";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: `Learn more about ${personal.name} — interests, philosophy, and background.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="About Me"
          subtitle="Who I am, what drives me, and where I'm headed."
        />

        <div className="prose-custom space-y-6">
          {personal.fullBio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
            Philosophy
          </h2>
          <blockquote className="mt-4 border-l-2 border-accent pl-6 text-lg italic text-text-secondary">
            {personal.philosophy}
          </blockquote>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 font-serif text-heading-2 font-semibold text-text-primary">
            Interests
          </h2>
          <Interests interests={personal.interests} />
        </div>
      </PageWrapper>
    </Container>
  );
}
