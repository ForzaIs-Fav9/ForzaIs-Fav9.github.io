import personalData from "@/content/personal.json";
import achievementsData from "@/content/achievements.json";
import projectsData from "@/content/projects.json";
import writingData from "@/content/writing.json";
import timelineData from "@/content/timeline.json";
import exploringData from "@/content/exploring.json";
import navigationData from "@/content/navigation.json";
import booksData from "@/content/books.json";
import ideasData from "@/content/ideas.json";
import quotesData from "@/content/quotes.json";
import nowData from "@/content/now.json";
import labData from "@/content/lab.json";

export type Interest = {
  label: string;
  icon: string;
  description: string;
};

export type Social = {
  email: string;
  github: string;
  substack: string;
  linkedin: string;
  twitter: string;
};

export type PersonalData = {
  name: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  philosophy: string;
  interests: Interest[];
  socials: Social;
  profileImage: string;
};

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  link: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  status: string;
  links: Record<string, string>;
  featured: boolean;
  image: string;
  date: string;
  hasPage?: boolean;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  date: string;
  platform: string;
  url: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
};

export type Milestone = {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
};

export type FutureMilestone = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export type ExploringTopic = {
  id: string;
  topic: string;
  description: string;
  resources: { title: string; url: string; type: string }[];
  startedDate: string;
  status: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  note: string;
  link: string;
};

export type CurrentlyReading = {
  id: string;
  title: string;
  author: string;
  progress: number;
};

export type Idea = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
};

export type Quote = {
  text: string;
  author: string;
};

export type NowSection = {
  title: string;
  items: string[];
};

export type NowData = {
  lastUpdated: string;
  location: string;
  focus: string;
  sections: NowSection[];
};

export type LabItem = {
  title: string;
  description: string;
  status: string;
};

export type LabSection = {
  title: string;
  items: LabItem[];
};

export type LabData = {
  intro: string;
  sections: LabSection[];
};

export const personal = personalData as unknown as PersonalData;
export const achievements = achievementsData.achievements as unknown as Achievement[];
export const projects = projectsData.projects as unknown as Project[];
export const articles = writingData.articles as unknown as Article[];
export const milestones = timelineData.milestones as unknown as Milestone[];
export const futureMilestones = (timelineData as unknown as { futureMilestones: FutureMilestone[] }).futureMilestones;
export const exploringTopics = exploringData.currentInterests as unknown as ExploringTopic[];
export const exploringLastUpdated = exploringData.lastUpdated;
export const navLinks = navigationData.links as unknown as NavLink[];
export const favoriteBooks = booksData.favorites as unknown as Book[];
export const currentlyReading = booksData.currentlyReading as unknown as CurrentlyReading[];
export const ideas = ideasData.ideas as unknown as Idea[];
export const quotes = quotesData.quotes as unknown as Quote[];
export const nowPage = nowData as unknown as NowData;
export const labPage = labData as unknown as LabData;
