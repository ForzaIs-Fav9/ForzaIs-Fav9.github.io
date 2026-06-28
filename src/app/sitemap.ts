import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/writing", priority: 0.8 },
    { path: "/now", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/timeline", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
