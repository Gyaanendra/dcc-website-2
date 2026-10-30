/**
 * Search publication is deliberately opt-in. A route may be approved only
 * after its visible copy, people, media, claims, and destinations are verified.
 */
export type SeoPath =
  | "/"
  | "/about"
  | "/teams"
  | "/alumni"
  | "/past-events"
  | "/gallery";

type SeoRoute = {
  title: string;
  description: string;
  draftDescription?: string;
  lastModified?: string;
} & (
  | { status: "draft" }
  | {
      status: "approved";
      reviewedBy: string;
      reviewedAt: string;
      lastModified: string;
    }
);

export const seoRoutes: Record<SeoPath, SeoRoute> = {
  "/": {
    status: "draft",
    title: "Dean Career Cloud",
    description:
      "Dean Career Cloud at Bennett University connects career preparation, exposure, and direction for students.",
    draftDescription:
      "A preview of the Dean Career Cloud website at Bennett University. Some statistics and profiles are illustrative.",
  },
  "/about": {
    status: "draft",
    title: "About",
    description:
      "Learn about the mission and connected career-preparation model of Dean Career Cloud at Bennett University.",
  },
  "/teams": {
    status: "draft",
    title: "Teams",
    description:
      "Meet the people and teams behind Dean Career Cloud at Bennett University.",
    draftDescription:
      "A demonstration Team page for Dean Career Cloud; the current roster is not verified.",
  },
  "/alumni": {
    status: "draft",
    title: "Alumni",
    description:
      "Explore alumni stories from Dean Career Cloud at Bennett University.",
    draftDescription:
      "A demonstration alumni directory for Dean Career Cloud. The current profiles are fictional.",
  },
  "/past-events": {
    status: "draft",
    title: "Past Events",
    description:
      "Explore past Dean Career Cloud events and student career activities at Bennett University.",
    draftDescription:
      "A demonstration past-events archive for Dean Career Cloud. Current entries are sample content.",
  },
  "/gallery": {
    status: "draft",
    title: "Gallery",
    description:
      "Explore verified moments from Dean Career Cloud at Bennett University.",
    draftDescription:
      "A demonstration gallery layout for Dean Career Cloud with unverified stock imagery.",
  },
};
