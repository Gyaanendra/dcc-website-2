export type Department =
  | "All"
  | "Executive"
  | "Technical"
  | "Placement Turnaround"
  | "Corporate & Alumni Relations"
  | "Training & Preparation"
  | "Operations"
  | "Media Team"
  | "Design Team"
  | "Research & Higher Studies"
  | "Strategic Intelligence"
  | "PR & Outreach";

export interface BaseMember {
  id: string;
  name: string;
  role: string;
  department: Department;
  /** Optional real image path; falls back to the AlphabetAvatar placeholder. */
  imageUrl?: string;
  initials: string;
  order: number;
}

export interface CoreMember extends BaseMember {
  /** Short uppercase cap, e.g. "PRESIDENT", "SYSTEMS LEAD". */
  leadRole: string;
  /** e.g. "2025 — PRESENT" */
  tenure?: string;
  bioSnippet?: string;
}

export interface SubMember extends BaseMember {
  /** e.g. "Frontend Core", "UI/UX", "Backend" */
  teamSubgroup?: string;
}
