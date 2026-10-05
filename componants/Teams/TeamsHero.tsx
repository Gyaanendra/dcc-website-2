import SplitTextHeader from "./SplitTextHeader";

const MANTRAS = [
  "Built to innovate",
  "Ideas into impact",
  "Engineering what's next",
  "One team. Shared ambition.",
];

const SUBHEAD =
  "\u201CMeet the people building ideas, exploring technology, and creating opportunities at DCC.\u201D";

/**
 * Cinematic hero: bracketed team tag, split-text headline (animation type 4),
 * serif-italic subhead, and the club mantras along a hairline rule.
 */
export default function TeamsHero() {
  return (
    <section className="border-b border-black/10 px-6 pt-28 pb-24 sm:px-8">
      <p className="inline-block border border-black/25 px-3.5 py-2 font-mono text-xs tracking-[0.22em] uppercase text-[#555555]">
        [ TEAM <span className="text-[#C04F2E]">{"//"}</span> 2026&mdash;2027 ]
      </p>
      <h1 className="mt-10 text-[clamp(38px,6.5vw,84px)] leading-[0.98] font-extrabold tracking-[-0.02em] uppercase text-[#111111]">
        <SplitTextHeader text="BUILT BY MINDS." startIndex={0} />
        <br />
        <SplitTextHeader text="UNITED BY CODE." startIndex={3} dimLastWord />
      </h1>
      <p className="mt-9 max-w-[560px] font-serif text-xl leading-relaxed text-[#555555] italic sm:text-2xl">
        {SUBHEAD}
      </p>
      <ul className="mt-16 flex flex-wrap items-center gap-y-2 border-t border-black/10 pt-4">
        {MANTRAS.map((mantra, index) => (
          <li
            key={mantra}
            className="flex items-center font-mono text-[11px] tracking-[0.16em] uppercase text-[#777777]"
          >
            {index > 0 ? (
              <span aria-hidden className="px-5 text-[#C04F2E]">
                &middot;
              </span>
            ) : null}
            {mantra}
          </li>
        ))}
      </ul>
    </section>
  );
}
