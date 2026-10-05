// TODO(content): Review editorial copy and institutional wording before publication.
export const site = {
  name: "Dean Career Cloud",
  shortName: "DCC",
  institution: "Bennett University",
  school: "SCSET",
  year: "2026–27",
  description:
    "Dean Career Cloud connects career preparation, exposure, and direction at Bennett University.",
  email: null as string | null,
  social: { linkedin: null as string | null, instagram: null as string | null },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Teams", href: "/teams" },
  { label: "Gallery", href: "/gallery" },
] as const;
