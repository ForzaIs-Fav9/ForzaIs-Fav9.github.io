import { personal } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    url: SITE_URL,
    description: personal.shortBio,
    sameAs: [
      personal.socials.github,
      personal.socials.linkedin,
      personal.socials.twitter,
      personal.socials.substack,
    ],
    knowsAbout: personal.interests.map((i) => i.label),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
