import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { personal } from "@/lib/content";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${personal.name} — open to collaborations, research, and interesting conversations.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-24">
      <PageWrapper>
        <SectionHeading
          title="Contact"
          subtitle="I'm always open to interesting conversations, collaborations, and new ideas."
        />

        <div className="prose-custom max-w-xl">
          <p>
            Whether you want to discuss research, collaborate on a project,
            explore a startup idea, or just say hello — I&apos;d love to hear from
            you.
          </p>
          <p>
            I&apos;m particularly interested in connecting with people working on
            quantum computing, AI safety, or interdisciplinary ventures.
          </p>
        </div>

        <ContactLinks />
      </PageWrapper>
    </Container>
  );
}
