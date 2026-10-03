import type { CoreMember, Department, FAQItem, SubMember } from "./types";

/**
 * Labeled dummy dataset. Swap `imageUrl` in once real member photos exist —
 * the components fall back to the editorial alphabet placeholder without
 * any markup change.
 */

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const DEPARTMENT_CODES: Record<Department, string> = {
  All: "ALL",
  Executive: "EXEC",
  Technical: "TECH",
  "Design & Creative": "DESI",
  "Operations & Logistics": "OPER",
  "Research & Content": "RESE",
};

export const DEPARTMENT_FILTERS: Department[] = [
  "All",
  "Technical",
  "Design & Creative",
  "Operations & Logistics",
  "Research & Content",
];

export const FILTER_LABELS: Record<Department, string> = {
  All: "ALL",
  Executive: "EXECUTIVE",
  Technical: "TECHNICAL",
  "Design & Creative": "DESIGN",
  "Operations & Logistics": "OPERATIONS",
  "Research & Content": "RESEARCH",
};

export const coreMembers: CoreMember[] = [
  {
    id: "core-01",
    name: "Aarav Sharma",
    role: "Club President",
    leadRole: "PRESIDENT",
    department: "Executive",
    initials: initialsOf("Aarav Sharma"),
    order: 1,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-02",
    name: "Ananya Verma",
    role: "Vice President · Operations",
    leadRole: "VP · OPERATIONS",
    department: "Operations & Logistics",
    initials: initialsOf("Ananya Verma"),
    order: 2,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-03",
    name: "Aditya Agrawal",
    role: "Technical Secretary · Lead Architect",
    leadRole: "TECHNICAL SECRETARY",
    department: "Technical",
    initials: initialsOf("Aditya Agrawal"),
    order: 3,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-04",
    name: "Ishaan Kapoor",
    role: "Research & AI Lead",
    leadRole: "RESEARCH & AI",
    department: "Research & Content",
    initials: initialsOf("Ishaan Kapoor"),
    order: 4,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-05",
    name: "Diya Mehta",
    role: "Design & Creative Director",
    leadRole: "DESIGN DIRECTOR",
    department: "Design & Creative",
    initials: initialsOf("Diya Mehta"),
    order: 5,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-06",
    name: "Rohan Malhotra",
    role: "Full-Stack Systems Lead",
    leadRole: "SYSTEMS LEAD",
    department: "Technical",
    initials: initialsOf("Rohan Malhotra"),
    order: 6,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-07",
    name: "Kabir Singh",
    role: "Competitive Programming Lead",
    leadRole: "CP LEAD",
    department: "Technical",
    initials: initialsOf("Kabir Singh"),
    order: 7,
    tenure: "2025 — PRESENT",
  },
  {
    id: "core-08",
    name: "Sanya Iyer",
    role: "Events & Community Lead",
    leadRole: "EVENTS LEAD",
    department: "Operations & Logistics",
    initials: initialsOf("Sanya Iyer"),
    order: 8,
    tenure: "2025 — PRESENT",
  },
];

export const subMembers: SubMember[] = [
  {
    id: "sub-01",
    name: "Arjun Nair",
    role: "Frontend Core",
    teamSubgroup: "Frontend Core",
    department: "Technical",
    initials: initialsOf("Arjun Nair"),
    order: 1,
  },
  {
    id: "sub-02",
    name: "Vivaan Gupta",
    role: "Backend Core",
    teamSubgroup: "Backend Core",
    department: "Technical",
    initials: initialsOf("Vivaan Gupta"),
    order: 2,
  },
  {
    id: "sub-03",
    name: "Kartik Joshi",
    role: "DevOps & Infra",
    teamSubgroup: "Infrastructure",
    department: "Technical",
    initials: initialsOf("Kartik Joshi"),
    order: 3,
  },
  {
    id: "sub-04",
    name: "Ritika Bansal",
    role: "App Developer",
    teamSubgroup: "Mobile",
    department: "Technical",
    initials: initialsOf("Ritika Bansal"),
    order: 4,
  },
  {
    id: "sub-05",
    name: "Pranav Desai",
    role: "Systems Engineer",
    teamSubgroup: "Systems",
    department: "Technical",
    initials: initialsOf("Pranav Desai"),
    order: 5,
  },
  {
    id: "sub-06",
    name: "Nisha Kulkarni",
    role: "QA Engineer",
    teamSubgroup: "Quality Assurance",
    department: "Technical",
    initials: initialsOf("Nisha Kulkarni"),
    order: 6,
  },
  {
    id: "sub-07",
    name: "Aisha Khan",
    role: "UI/UX Designer",
    teamSubgroup: "UI/UX",
    department: "Design & Creative",
    initials: initialsOf("Aisha Khan"),
    order: 7,
  },
  {
    id: "sub-08",
    name: "Tanvi Rathore",
    role: "Brand & Visuals",
    teamSubgroup: "Brand",
    department: "Design & Creative",
    initials: initialsOf("Tanvi Rathore"),
    order: 8,
  },
  {
    id: "sub-09",
    name: "Yash Chaudhary",
    role: "Motion Designer",
    teamSubgroup: "Motion",
    department: "Design & Creative",
    initials: initialsOf("Yash Chaudhary"),
    order: 9,
  },
  {
    id: "sub-10",
    name: "Meghna Pillai",
    role: "Graphic Designer",
    teamSubgroup: "Graphics",
    department: "Design & Creative",
    initials: initialsOf("Meghna Pillai"),
    order: 10,
  },
  {
    id: "sub-11",
    name: "Devansh Reddy",
    role: "Event Coordinator",
    teamSubgroup: "Events",
    department: "Operations & Logistics",
    initials: initialsOf("Devansh Reddy"),
    order: 11,
  },
  {
    id: "sub-12",
    name: "Shreya Bose",
    role: "Logistics Manager",
    teamSubgroup: "Logistics",
    department: "Operations & Logistics",
    initials: initialsOf("Shreya Bose"),
    order: 12,
  },
  {
    id: "sub-13",
    name: "Aditi Chauhan",
    role: "Sponsorship Lead",
    teamSubgroup: "Sponsorships",
    department: "Operations & Logistics",
    initials: initialsOf("Aditi Chauhan"),
    order: 13,
  },
  {
    id: "sub-14",
    name: "Nikhil Menon",
    role: "Research Associate",
    teamSubgroup: "Research",
    department: "Research & Content",
    initials: initialsOf("Nikhil Menon"),
    order: 14,
  },
  {
    id: "sub-15",
    name: "Pooja Bhatt",
    role: "Content Strategist",
    teamSubgroup: "Content",
    department: "Research & Content",
    initials: initialsOf("Pooja Bhatt"),
    order: 15,
  },
  {
    id: "sub-16",
    name: "Harsh Vardhan",
    role: "Technical Writer",
    teamSubgroup: "Documentation",
    department: "Research & Content",
    initials: initialsOf("Harsh Vardhan"),
    order: 16,
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-01",
    question: "When does DCC recruit new members?",
    answer:
      "Recruitment opens at the beginning of every academic semester. Watch the notice boards and the club portal for the application window — a short task, then a conversation with the core team.",
    category: "RECRUITMENT",
  },
  {
    id: "faq-02",
    question: "Who is eligible to join the club?",
    answer:
      "Every enrolled student of Bennett University, from first year onward. We look for curiosity and consistency — branch and CGPA are never the deciding factors.",
    category: "ELIGIBILITY",
  },
  {
    id: "faq-03",
    question: "What does the technical team actually build?",
    answer:
      "Full-stack products, internal tooling, and cloud infrastructure for campus events. Members ship real software in small squads, reviewed by the technical secretary.",
    category: "TECHNICAL",
  },
  {
    id: "faq-04",
    question: "I have an idea — can DCC incubate it?",
    answer:
      "Yes. Pitch it during the ideation round; if it clears review, the club assigns a mentor, a small team, and cloud credits to take it from concept to demo day.",
    category: "INCUBATION",
  },
];
