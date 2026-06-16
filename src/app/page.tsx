import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { RotatingQuote } from "@/components/home/RotatingQuote";
import { SelectedIdeas } from "@/components/home/SelectedIdeas";
import { FavoriteBooks } from "@/components/home/FavoriteBooks";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <Container>
      <JsonLd />
      <Hero />
      <RotatingQuote />
      <FeaturedWork />
      <SelectedIdeas />
      <FavoriteBooks />
    </Container>
  );
}
