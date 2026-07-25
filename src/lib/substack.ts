export type SubstackPost = {
  title: string;
  description: string;
  url: string;
  date: string;
  tags: string[];
};

import personalData from "@/content/personal.json";

const SUBSTACK_FEED_URL = `${personalData.socials.substack}/feed`;

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  let lastError: Error | null = null;

  for (const proxyFn of CORS_PROXIES) {
    try {
      const proxyUrl = proxyFn(SUBSTACK_FEED_URL);
      const res = await fetch(proxyUrl, { cache: "no-store" });
      if (!res.ok) continue;

      const xml = await res.text();
      if (!xml.includes("<item>") && !xml.includes("<item ")) continue;

      return parseRssFeed(xml);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  throw lastError || new Error("All proxies failed");
}

function parseRssFeed(xml: string): SubstackPost[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");

  const posts: SubstackPost[] = [];

  items.forEach((item) => {
    const title = getTextContent(item, "title");
    const link = getTextContent(item, "link");
    const pubDate = getTextContent(item, "pubDate");
    const description = extractDescription(item);
    const categories = item.querySelectorAll("category");
    const tags: string[] = [];
    categories.forEach((cat) => {
      const text = cat.textContent?.trim();
      if (text) tags.push(text);
    });

    if (title && link) {
      posts.push({
        title,
        description,
        url: link,
        date: pubDate ? new Date(pubDate).toISOString() : "",
        tags,
      });
    }
  });

  return posts;
}

function getTextContent(parent: Element, tagName: string): string {
  const el = parent.querySelector(tagName);
  if (!el) return "";
  return el.textContent?.trim() || "";
}

function extractDescription(item: Element): string {
  const desc = getTextContent(item, "description");
  const text = desc.replace(/<[^>]*>/g, "").trim();
  if (text.length > 200) {
    return text.slice(0, 200).replace(/\s\S*$/, "") + "...";
  }
  return text;
}
