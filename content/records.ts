import type {
  AlumniProfile,
  GalleryItem,
  ImpactStat,
  Initiative,
  Opportunity,
  PastEvent,
  Resource,
  TeamMember,
} from "@/types/content";

// TODO(content): Add only approved records. Place portraits under public/team/ and gallery images under public/images/gallery/.
export const teamMembers: TeamMember[] = [];
export const gallery: GalleryItem[] = [
  {
    id: "badging",
    src: "/media/dcc-badging.jpg",
    alt: "Group photograph at the Dean Career Cloud badging ceremony",
    title: "Badging ceremony",
    category: "DCC / PEOPLE",
    width: 1170,
    height: 1170,
  },
];
export const initiatives: Initiative[] = [];
export const resources: Resource[] = [];
export const opportunities: Opportunity[] = [];

// Fictional layout examples. None of these names or paths represents a DCC alumnus.
// Replace the entire set with consented, verified profiles before publication.
export const alumniProfiles: AlumniProfile[] = [
  {
    id: "sample-01",
    name: "Aarav Mehta",
    cohort: "2022",
    discipline: "Technology",
    direction: "Product design",
    location: "New Delhi",
    isSample: true,
  },
  {
    id: "sample-02",
    name: "Mira Kapoor",
    cohort: "2023",
    discipline: "Business",
    direction: "Brand strategy",
    location: "Mumbai",
    isSample: true,
  },
  {
    id: "sample-03",
    name: "Ishaan Sen",
    cohort: "2021",
    discipline: "Technology",
    direction: "Research",
    location: "Bengaluru",
    isSample: true,
  },
  {
    id: "sample-04",
    name: "Tara Nair",
    cohort: "2024",
    discipline: "Media",
    direction: "Visual storytelling",
    location: "Pune",
    isSample: true,
  },
  {
    id: "sample-05",
    name: "Rohan Sethi",
    cohort: "2022",
    discipline: "Business",
    direction: "Entrepreneurship",
    location: "Gurugram",
    isSample: true,
  },
];

// Demonstration-only archive. These are not records of actual DCC events.
// Replace or remove each item when approved event details are available.
export const pastEvents: PastEvent[] = [
  {
    id: "sample-career-conversations",
    title: "Career Conversations",
    category: "Dialogue",
    date: "2025-09-18",
    description:
      "A sample roundtable format for candid questions about early career choices.",
    isSample: true,
  },
  {
    id: "sample-portfolio-lab",
    title: "Portfolio Lab",
    category: "Workshop",
    date: "2025-08-22",
    description:
      "A sample hands-on session for turning project work into a clearer story.",
    isSample: true,
  },
  {
    id: "sample-industry-exchange",
    title: "Industry Exchange",
    category: "Conversation",
    date: "2025-07-17",
    description:
      "A sample forum for exploring how teams, roles, and opportunities connect.",
    isSample: true,
  },
  {
    id: "sample-alumni-pathways",
    title: "Alumni Pathways",
    category: "Panel",
    date: "2025-06-12",
    description:
      "A sample panel concept focused on the many routes from campus to work.",
    isSample: true,
  },
];

export const impactStats: ImpactStat[] = [
  { id: "students", label: "Students supported", value: null },
  { id: "sessions", label: "Sessions", value: null },
  { id: "opportunities", label: "Opportunities shared", value: null },
  { id: "interactions", label: "Industry interactions", value: null },
];

// Presentation-only values. Never describe these as DCC outcomes or publish them
// without replacing them with approved, source-backed impactStats above.
export const demoImpactStats: ImpactStat[] = [
  { id: "demo-students", label: "Students reached", value: 1200, suffix: "+" },
  { id: "demo-sessions", label: "Career sessions", value: 48 },
  {
    id: "demo-opportunities",
    label: "Opportunities shared",
    value: 120,
    suffix: "+",
  },
  { id: "demo-conversations", label: "Industry conversations", value: 35 },
  { id: "demo-alumni", label: "Alumni-led events", value: 18 },
  { id: "demo-verticals", label: "Focus areas", value: 7 },
];
