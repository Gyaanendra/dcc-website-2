import type {
  GalleryItem,
  ImpactStat,
  Initiative,
  Opportunity,
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

export const impactStats: ImpactStat[] = [
  { id: "students", label: "Students supported", value: null },
  { id: "sessions", label: "Sessions", value: null },
  { id: "opportunities", label: "Opportunities shared", value: null },
  { id: "interactions", label: "Industry interactions", value: null },
];
