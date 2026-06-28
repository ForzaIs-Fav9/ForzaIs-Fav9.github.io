import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-serif text-display font-bold text-text-primary">
        404
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        This page doesn&apos;t exist yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </Container>
  );
}
