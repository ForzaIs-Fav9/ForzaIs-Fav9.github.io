import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EasterEggGuide } from "@/components/ui/EasterEggGuide";

export const metadata: Metadata = createMetadata({
  title: "Secrets",
  description: "A guide to the hidden easter eggs on this site.",
  path: "/secrets",
});

export default function SecretsPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Easter Egg Guide"
          subtitle="You found the hidden page. Here's what else is waiting to be discovered."
        />
        <EasterEggGuide />
      </PageWrapper>
    </Container>
  );
}
