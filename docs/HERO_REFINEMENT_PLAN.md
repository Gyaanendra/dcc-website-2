# DCC HERO SECTION REFINEMENT & IMPLEMENTATION PLAN (REVISED V2.1 — AUDITED)
**Project:** DCC Club (Dean Career Cloud) Official Website
**Institution:** Bennett University (SCSET)
**Working Directory:** `C:\Users\user\Desktop\DCC\dcc-website-2\componants\Home`
**Target Files:** `LandingHero.tsx` & `LandingHero.module.css`
**Reference Benchmark:** Cominvi, DVO, By Monolog, Aircenter, Lando Norris, Hubtown
**Document Status:** Locally implemented — pending owner approval for deployment (not committed/pushed)

---

## 1. Executive Summary & Architectural Philosophy

### 1.1 Objective
Transform the existing Hero Section of the DCC Bennett University website into a world-class, art-directed editorial experience. The design elevates the existing interface into an architectural, minimalist composition characterized by:
- **Restrained Editorial Rigor (DVO & Hubtown):** Crisp optical alignments, balanced negative space, and refined typography hierarchy.
- **Cinematic Atmospheric Texture (By Monolog):** A carefully graded background video reel (`dcc-event-reel.mp4`) that provides subtle ambient movement beneath razor-sharp monochrome typography.
- **Fluid Kinetic Scrubbing (Cominvi):** Buttery, multi-layered scroll interactions where typography drifts and morphs seamlessly along the scroll axis rather than vanishing abruptly.
- **Flawless Zero-Flicker Entry (Aircenter):** Choreographed layer arrival that ensures zero layout shift (CLS = 0) and graceful initialization.

### 1.2 Non-Negotiable Preservation Guarantees
In strict accordance with project rules:
1. **Zero Redesign / Zero Restructuring:** The existing component model (`LandingHero.tsx` + `LandingHero.module.css`) is retained in full. No new components, frameworks, or libraries are introduced.
2. **100% Content & Field Preservation:** Every line of text, brand string, institution name, academic year, dynamic variable (`site.school`, `site.year`), aria label, link (`#thinking`), and video source remains identical.
3. **Palette & Color Grading Preservation:** The existing warm paper-and-ink visual identity (`#f7f7f5`, `#080a09`, `#303431`, `var(--ink)`, `var(--paper-light)`) and rust accent (`var(--accent)`) are preserved without arbitrary hue changes.
4. **Scope Isolation:** Changes are 100% localized to `LandingHero.tsx` and `LandingHero.module.css` inside `componants/Home/`. All other sections, layouts, and pages remain untouched.

---

## 2. In-Depth Technical Audit of the Existing Hero Section (AUDITED)

### 2.1 DOM Node Hierarchy (`LandingHero.tsx`)
```html
<section class="styles.hero" ref={root} aria-label="Dean Career Cloud introduction">
  <div class="styles.stage" data-hero-stage>
    <div class="styles.topStatement" data-hero-copy> A BETTER WAY<br />TO FIND YOUR DIRECTION </div>
    <div class="styles.videoBackdrop" data-video aria-hidden="true">
      <video ref={video} src="/media/dcc-event-reel.mp4" poster="/media/dcc-event-reel-poster.png" muted loop playsInline preload="metadata" tabIndex={-1} />
    </div>
    <div class="styles.letterStage" data-letter-stage>
      <h1 class="styles.letters" data-wordmark aria-label="DCC — Dean Career Cloud">
        <span data-letter>D</span><span data-letter>C</span><span data-letter>C</span>
      </h1>
    </div>
    <div class="styles.descriptor" data-hero-copy> DEAN CAREER CLOUD<br />BENNETT UNIVERSITY / {site.school} </div>
    <div class="styles.bottom" data-hero-copy>
      <p>Careers are not a straight line.<br />DCC helps you navigate what comes next.</p>
      <span>THE CAREER ECOSYSTEM / {site.year}</span>
      <Link href="#thinking" aria-label="Scroll to DCC philosophy">↓</Link>
    </div>
  </div>
</section>
```
All data attributes, text nodes, and the video element are preserved character-for-character in the refinement.

### 2.2 Scroll & Sticky Mechanic (audited values)
- Outer `.hero` height: `165svh` (155svh ≤900px / ≤680px → refined to tiered 165/160/155/150/150svh).
- Inner `.stage`: `position: sticky; top: 0; height: 100svh; overflow: hidden;`
- Scroll travel: `65svh`. GSAP `ScrollTrigger` scrubs the `D C C` wordmark from centered to the upper-left corner (`compactTop 22–24px`, `compactLeft 20–28px`, `scale: compactWidth / bounds.width`).
- **Current defect:** supporting copy exits with one abrupt `autoAlpha: 0, duration: 0.16` — a visible "pop-out"; scrub easing is `none`; scrub lag `0.55`.

### 2.3 Integration with the Global Site Header (`Header.tsx`)
- The global `<Header />` is `position: absolute; inset: 0 0 auto; z-index: 50; height: 92px` (76px ≤680px).
- It scrolls offscreen while the pinned `.stage` remains; the compact wordmark arrives at `top: 24px, left: 28px`, taking the brand mark's place.
- **Coordination Requirement:** `compactLeft` now derives from `var(--page-pad)` (computed px) instead of a hardcoded 28px, so the compact wordmark aligns exactly with the header brand logo margin at every viewport.

---

## 3. Design Reference Synthesis & Translation

| Reference Benchmark | Core Aesthetic Quality | Precise Implementation in DCC Hero |
| :--- | :--- | :--- |
| **Cominvi** | Kinetic typographic scroll movement & fluid easing | **Multi-track staggered scrub:** each copy layer follows an independent trajectory instead of one abrupt fade — `topStatement` drifts up (`y: -28`) fading over 0–0.28; `descriptor` contracts (`scale: 0.95`) fading over 0–0.22; `bottom` drifts down (`y: 22`) fading over 0–0.32; wordmark eases `power1.inOut` with `scrub: 0.65`. |
| **DVO** | Architectural composition & spatial hierarchy | **Optical alignment & badge refinement:** `.descriptor` replaced loose `top: 61%` with `top: calc(48% + clamp(110px, 13.5vw, 205px))` — safe clearance under the wordmark baseline at every aspect ratio; frosted pill (`blur(12px)`, hairline `rgba(17,22,19,0.08)`, radius 2px). |
| **By Monolog** | Minimalist art direction & cinematic stillness | **Atmospheric video grading & dual scrim:** video `filter: grayscale(1) contrast(0.85) brightness(1.28)`, `opacity: 0.52`; base tint `rgba(247,247,245,0.48)`; feathered vertical vignette (`0.94 → 0.2 → 0.2 → 0.92`) for AA contrast over moving footage. |
| **Aircenter** | Smooth loading choreography | **Coordinated entrance:** delay `0.15s`; letters glide in `power3.out`, duration 1.35s, stagger 0.08s; video blooms 1.0s; supporting copy micro-rises (`y: 12 → 0`, `autoAlpha 0 → 1`, `power3.out`, stagger 0.08s); the scroll-scrub timeline is created **after** the entrance resolves so tween start-values are recorded cleanly (no mid-entrance scrub pop). |
| **Lando Norris** | Athletic precision & bold framing | **Kerning:** letters `clamp(160px, 24vw, 370px) / 0.82`, `letter-spacing: -0.11em` (from -0.14em) — monolithic silhouette without glyph clipping. |
| **Hubtown** | Refined interactions & restrained luxury | **Tactile scroll anchor:** 48×48px target, `border: 1px solid var(--ink)`, hover fill inversion, `transition: background 0.3s var(--ease-editorial), color 0.3s var(--ease-editorial)`. |

---

## 4. Controlled Refinements: File-by-File Specification

### 4.1 `LandingHero.tsx`
| Current | Refined |
| :--- | :--- |
| Abrupt copy exit: `.to(supportingCopy, { autoAlpha: 0, duration: 0.16 })` | Decoupled multi-track exits: `topStatement → y:-28, autoAlpha:0, 0.28, power1.in`; `descriptor → scale:0.95, autoAlpha:0, 0.22, power1.in`; `bottom → y:22, autoAlpha:0, 0.32, power1.in`; `videoLayer → yPercent:6, ease:none`. Layers selected via existing CSS-module classes (DOM untouched). |
| Wordmark scrub `ease: "none"`, `scrub: 0.55` | `ease: "power1.inOut"`, `scrub: 0.65` (buttery catch-up). |
| Compact coords hardcoded (`28/20`, `24/22`) | `compactLeft` derived from computed `--page-pad` token (fallback preserved); `compactWidth` 150/106 kept. |
| Entrance: delay 0.3, letters `power2.inOut` 1.95s stagger 0.1 | Entrance: delay 0.15, letters `power3.out` 1.35s stagger 0.08; video bloom 1.0s `power2.out`; copy micro-rise (`y:12→0`, 0.7s, stagger 0.08, `power3.out`); `createScrollMotion()` invoked at the end of the entrance so scrub start-values are recorded post-arrival. |
| Reduced motion: video shown, timelines skipped | Unchanged (verified). |
| Video `IntersectionObserver` play/pause + visibility sync | Unchanged (verified). |
| Resize: rAF-throttled re-creation + `ScrollTrigger.refresh()` | Unchanged (verified). |

### 4.2 `LandingHero.module.css`
1. **Video grading & dual scrim:**
   ```css
   .videoBackdrop video { filter: grayscale(1) contrast(0.85) brightness(1.28); opacity: 0.52; }
   .videoBackdrop::after { background: rgba(247, 247, 245, 0.48); }
   .stage::after { background: linear-gradient(180deg,
     rgba(247,247,245,0.94) 0%, rgba(247,247,245,0.2) 20%,
     rgba(247,247,245,0.2) 75%, rgba(247,247,245,0.92) 100%); }
   ```
2. **Typography & spacing:**
   - `.topStatement`: `font: 500 clamp(14px, 1.4vw, 22px)/1.12 var(--font-body)`, `letter-spacing: -0.02em`, `top: clamp(118px, 14vh, 150px)` (mobile 109px kept).
   - `.letters`: `font: 400 clamp(160px, 24vw, 370px)/0.82 var(--font-body)`, `letter-spacing: -0.11em`.
   - `.descriptor`: `font: 500 clamp(10px, 0.95vw, 13px)/1.25 var(--font-data)`, `letter-spacing: 0.04em`, frosted capsule (`rgba(247,247,245,0.86)` + `blur(12px)` + hairline + radius 2px + `padding: 8px 14px`), `top: calc(48% + clamp(110px, 13.5vw, 205px))`.
   - `.bottom`: `grid-template-columns: minmax(280px, 420px) 1fr 48px`; anchor 48×48px, `border: 1px solid var(--ink)`, hover inversion, `0.3s var(--ease-editorial)` transitions.
3. **Responsive tiers:**
   | Viewport | Letters clamp | Hero height | Bottom layout |
   | :--- | :--- | :--- | :--- |
   | ≥1200 (base) | clamp(160px, 24vw, 370px) | 165svh | 3-col |
   | ≤1199 | clamp(140px, 26vw, 300px) | 160svh | 3-col |
   | ≤900 | clamp(110px, 28vw, 230px) | 155svh | 3-col |
   | ≤680 | clamp(96px, 30vw, 160px) | 150svh | 2-col (48px touch target), `bottom: calc(24px + env(safe-area-inset-bottom))` |
   | ≤380 | clamp(84px, 31vw, 135px) | 150svh | 2-col tight |

---

## 5. Content & Field Preservation Verification Matrix — VERIFIED ✅
All fields audited in code and guaranteed unchanged: top statement, video source + poster, three wordmark letters with `data-letter`, aria label, `DEAN CAREER CLOUD`, `BENNETT UNIVERSITY / {site.school}`, careers paragraph, `THE CAREER ECOSYSTEM / {site.year}`, `#thinking` anchor, every `data-*` hook, and the reduced-motion path.

## 6. Verification (executed locally)
- [x] Biome lint — 0 errors · [x] `tsc --noEmit` — 0 errors · [x] `next build` — passes
- [x] Visual before/after captured at rest / mid-scrub / compact (desktop 1440)
- [x] Scroll-scrub recording captured for review
- [ ] **Owner approval → commit & push (triggers Vercel deploy)** ← awaiting command
