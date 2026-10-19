<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Team page conventions (`componants/Teams/`)

- The core grid shows exactly three members — President, Vice President, General Secretary (`coreMembers` in `team-data.ts`). `TeamsPage.tsx` slices `coreMembers.slice(0, 3)`; keep that slice in sync if core data changes.
- Every other member (including Treasurer and year Coordinators, listed as `executiveSubMembers`) renders in the Sub-Members directory. Do not move them back into the core grid.
- Member data (names, roles, tenure, photos) is hand-maintained — never regenerate or reorder it.
- Sub-member photos sit grayscale and gain full colour on hover (`AlphabetAvatar.tsx`, `transition-[filter] … group-hover:grayscale-0`); core portraits do the same. The core card uses a thin `border-black/15` rule between portrait and metadata.
- The sub-members directory grid is 3 columns on `lg` (`SubMembersDirectory.tsx`).
- Team photos live in `public/images/team/` and are referenced from `team-data.ts` by path.
- `dcc-website-2/` is a mirror of this site; any change under `componants/Teams/` must be copied there too.
