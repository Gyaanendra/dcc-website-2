export type VerticalId =
  | "placement-turnaround"
  | "corporate-alumni"
  | "training-preparation"
  | "operations"
  | "media-content"
  | "research-higher-studies"
  | "strategic-intelligence";

export type Vertical = {
  id: VerticalId;
  title: string;
  shortTitle: string;
  description: string;
  focus: string[];
};
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  vertical: VerticalId;
  portrait: string;
  portraitAlt: string;
  bio?: string;
  linkedin?: string;
  order: number;
};
export type ImpactStat = {
  id: string;
  label: string;
  value: number | null;
  prefix?: string;
  suffix?: string;
  source?: string;
  updatedAt?: string;
};
export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  year?: string;
  width: number;
  height: number;
};
export type PastEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  isSample: true;
};
export type AlumniProfile = {
  id: string;
  name: string;
  cohort: string;
  discipline: string;
  direction: string;
  location: string;
  isSample: true;
};
export type Initiative = {
  id: string;
  title: string;
  category: string;
  summary: string;
  href?: string;
  image?: string;
  imageAlt?: string;
};
export type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  date?: string;
  tags: string[];
};
export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  type: string;
  deadline?: string;
  eligibility?: string;
  location?: string;
  url: string;
  source: string;
  publishedAt: string;
};
