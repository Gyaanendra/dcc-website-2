# Dean Career Cloud (DCC)

An architectural, editorial web experience for the **Dean Career Cloud** at **Bennett University** (School of Computer Science Engineering and Technology).

Designed with a high-contrast monochromatic aesthetic, kinetic typographic choreography, and responsive layouts inspired by contemporary editorial and brutalist publications.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Routes & Pages](#routes--pages)
- [Content Management](#content-management)
- [Pre-Publication Checklist](#pre-publication-checklist)
- [Media & Assets](#media--assets)

---

## Overview

Dean Career Cloud (DCC) bridges students with industry exposure, mentorship, and career acceleration. This website serves as the club's public digital platform, providing an overview of its mission, departmental teams, events archive, alumni trajectories, and curated visual gallery.

---

## Key Features

- **Kinetic Typographic Hero**: Scrub-driven landing stage powered by GSAP and ScrollTrigger with fluid letter transitions and video backdrop choreography.
- **Editorial Navigation Panel**: Fullscreen navigation overlay with staggered reveals, keyboard focus traps, and smooth navbar fade transitions.
- **Horizontal Runway Gallery**: Drag- and scrub-enabled showcase of club events and milestones with modal view and detail cards.
- **Structured Team Directory**: Comprehensive roster featuring core members, departmental divisions (Tech, Design, PR, Operations), and alphabetical sub-member indices.
- **Editorial Design System**: Custom typography pairing Geist Sans, Geist Mono, Instrument Serif, and Space Grotesk, built on CSS variables and responsive `clamp()` scaling.
- **Accessibility & Motion Safety**: Built-in support for `prefers-reduced-motion`, semantic landmarks, skip links, and ARIA modal controls.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Core Libraries** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Animation** | [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger) |
| **Styling** | CSS Modules, [Tailwind CSS 4](https://tailwindcss.com/) (scoped utilities), custom CSS tokens |
| **Typography** | `next/font/google` (Geist Sans, Geist Mono, Instrument Serif, Space Grotesk) |
| **Tooling & Quality** | [Biome](https://biomejs.dev/) (linter & formatter), TypeScript strict checking |

---

## Project Structure

```text
├── app/                        # Next.js App Router
│   ├── globals.css             # Global design tokens, theme layers, and resets
│   ├── layout.tsx              # Root layout, font definitions, and site chrome
│   ├── page.tsx                # Homepage (Landing)
│   ├── about/                  # About page
│   ├── teams/                  # Teams directory & departmental structure
│   ├── alumni/                 # Alumni network and trajectory directory
│   ├── past-events/            # Historical events archive
│   └── gallery/                # Horizontal runway gallery
├── componants/                 # Feature-based modular UI components
│   ├── Home/                   # Hero stage, manifesto, impact metrics, verticals
│   ├── About/                  # Philosophy, mission, and institutional blocks
│   ├── Teams/                  # Team hero, core cards, member directory, avatars
│   ├── Alumni/                 # Alumni directory and trajectory layouts
│   ├── PastEvents/             # Past events previews and timeline cards
│   ├── Gallery/                # Runway container, controls, cards, detail modal
│   └── Shared/                 # Global Header, SiteLoader, Footer, overlays
├── content/                    # Centralized, type-safe data and editable copy
│   ├── site.ts                 # Metadata, institutional info, navigation links
│   ├── records.ts              # Teams, alumni, events, and impact datasets
│   └── verticals.ts            # Club departments and domain definitions
├── public/                     # Static media and assets
│   └── media/                  # Optimized logos, photography, and video reels
├── types/                      # Shared TypeScript definitions
│   └── content.ts              # Schema models for site records and content
├── biome.json                  # Biome code quality and linting configuration
└── tsconfig.json               # TypeScript compiler options
```

---

## Getting Started

### Prerequisites

- Node.js `18.18+` or `20+`
- npm `9+` (or pnpm / yarn)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Gyaanendra/dcc-website-2.git
cd dcc-website-2
npm ci
```

### Development Server

Start the local development server with Turbopack:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Verification

Before committing changes, verify types, linting, and production builds:

```bash
# Typecheck TypeScript files
npm run typecheck

# Check code formatting and lint rules
npm run lint

# Automatically format files with Biome
npm run format

# Create a production build
npm run build
npm run start
# In another terminal:
SEO_BASE_URL=http://localhost:3000 npm run seo:check
```

---

## Routes & Pages

| Route | Purpose | Key Components |
| :--- | :--- | :--- |
| `/` | Flagship landing page with kinetic hero, impact metrics, and verticals | `LandingHero`, `Manifesto`, `Impact`, `VerticalStack` |
| `/about` | Mission, institutional affiliation, and organizational philosophy | `About` sections, strategic pillars |
| `/teams` | Leadership roster, departmental directories, and member index | `TeamsPage`, `CoreTeamGrid`, `TeamDirectory`, `SubMembersDirectory` |
| `/alumni` | Alumni network, historical graduating cohorts, and industry paths | `AlumniDirectory`, `AlumniPreview` |
| `/past-events` | Chronological archive of past workshops, hackathons, and talks | `PastEventsPreview`, archive cards |
| `/gallery` | Interactive horizontal runway showcasing club moments and visual records | `GalleryRunway`, `GalleryControls`, `GalleryDetailModal` |

---

## Content Management

Site copy and record entries are separated from view components for straightforward editing:

- **Site Metadata & Navigation** (`content/site.ts`): Edit institution name, department, academic year, social links, and main menu routes.
- **Team, Alumni & Events Data** (`content/records.ts`): Update member rosters, roles, LinkedIn URLs, event dates, and impact statistics.
- **Club Verticals** (`content/verticals.ts`): Define core departments, descriptions, and operational focus areas.
- **TypeScript Schemas** (`types/content.ts`): Provides compile-time checking for all content models.

---

## Pre-Publication Checklist

The presentation uses black, white, and neutral grays with `#FF6D1F` as its highlight color. Small accent text on light surfaces uses a darker companion token for legibility. Existing photos and the hero video are displayed in grayscale. The former “04 / Life in Motion” homepage section has been removed; the separate Gallery route remains available from navigation.

The Past Events route and homepage preview currently use four expressly labeled demonstration entries in `content/records.ts`. Their titles, dates, and descriptions are fictional layout samples, not an account of DCC events. The homepage's four-card preview uses one decorative still from the DCC video as a shared background; it does not depict the sample events. Replace or remove every sample entry before publication. The shared footer contains only live internal routes while contact links remain unverified.

Before deploying the website to production:

1. **Verify Records**: Replace demo records in `content/records.ts` (events, team rosters, and alumni data) with verified entries.
2. **Impact Metrics**: Review the illustrative numbers on the homepage and update with verified club statistics and data sources.
3. **Photography**: Verify the portraits in `public/images/team/` and their attribution before publication.
4. **Social & Contact**: Add active LinkedIn, Instagram, and email addresses in `content/site.ts`.
5. **SEO & Indexing**: Configure the production domain, then approve routes individually in `content/seo.ts` and verify canonical tags and the sitemap.
6. **Favicon**: Replace temporary favicon assets in `app/icon.png` with final high-resolution brand assets if required.

---

## Media & Assets

- **Logos**: High-resolution dark and light vectors (`/media/dcc-black.png`, `/media/dcc-white.png`).
- **Hero Video**: Optimized reel (`/media/dcc-event-reel.mp4`) with poster fallback (`/media/dcc-event-reel-poster.png`).
- **Photography**: Monochromatic and graded imagery preserving brand contrast across dark and light surfaces.
