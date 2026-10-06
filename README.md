# Dean Career Cloud

An editorial website for Dean Career Cloud at Bennett University / SCSET. The current routes include Home, About, Teams, Gallery, and Past Events. It uses the repository's existing Next.js App Router, `componants/` grouping, and Biome configuration.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. To verify a release candidate:

```bash
npm run typecheck
npm run lint
npm run build
```

## Structure

- `app/` — routes, root layout, and global design tokens
- `componants/Home`, `componants/About`, `componants/Teams`, `componants/PastEvents` — page sections and local styles
- `componants/Shared` — navigation, footer, and intro
- `content/` — editable site copy and records
- `types/content.ts` — shared content shapes
- `public/media/` — approved logo, photo, and video from the media repository

## Content intake before publication

The site is deliberately `noindex` until official copy, roster, contact links, and statistics are approved. The current site copy outside names and institutional identifiers is editorial draft based on the supplied brief. Review `content/site.ts` and `content/verticals.ts` before launch.

Fill `content/records.ts` with approved team members, initiatives, and source-backed impact values. The homepage now shows six clearly marked illustrative statistics in place of the former “The Thinking” and “What DCC Does” sections; these are layout samples, not DCC outcomes. Replace them with approved numeric values and sources before publication. Initiatives stay hidden while empty. Team filters and profile expansion activate when members are added; the Team page currently shows an explicit empty state. Add portraits to `public/team/` and update the record paths and alt text.

The presentation uses only black, white, and neutral grays throughout the routes. Existing photos and the hero video are displayed in grayscale. The former “04 / Life in Motion” homepage section has been removed; the separate Gallery route remains available from navigation.

The Past Events route and homepage preview currently use four expressly labeled demonstration entries in `content/records.ts`. Their titles, dates, and descriptions are fictional layout samples, not an account of DCC events. Replace or remove every entry before publication; no sample event is paired with a real DCC photograph. The shared footer contains only live internal routes while contact links remain unverified.

The Resources and Opportunities types are ready in `types/content.ts`; their routes are outside this delivery. Do not add live listings without verified sources and destinations. Add a canonical URL and replace the temporary favicon treatment when a production domain and final brand package are supplied, then remove `robots: { index: false }` from `app/layout.tsx`.

## Media provenance

The DCC white and black logos, badging ceremony photo, and event video were copied from the user-specified [`dcc-wesbite/public`](https://github.com/Gyaanendra/dcc-wesbite/tree/main/public) repository on 2026-10-02. The linked `Video-74056.mp4` is the landing hero background; the poster is a thumbnail of that video. The source repository's `building.jpg` was not used because its relation to DCC or Bennett University could not be verified visually.

The oversized DCC letter composition is an original adaptation of the user's [AIR reference](https://aircenter.space/), with the supplied DCC footage behind it. The visible letters begin grouped at the left edge and travel outward across a plain hero. The footage then fades in; the navigation and supporting hero copy appear after its first complete play, while the video continues looping. Scrolling gathers the wordmark into the top-left corner. This entrance replaces the separate first-session loader on Home. Motion is skipped when reduced motion is requested; playback pauses offscreen or when the tab is hidden, and video errors or an intentional scroll past the intro reveal the content so navigation is not trapped. Reference code, imagery, and copy are not used here.
