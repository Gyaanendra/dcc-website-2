import CoreTeamGrid from "./CoreTeamGrid";
import RevealOnView from "./RevealOnView";
import SubMembersDirectory from "./SubMembersDirectory";
import TeamsHero from "./TeamsHero";
import { coreMembers, subMembers } from "./team-data";

interface SectionHeaderProps {
  index: string;
  title: string;
  metaTop: string;
  metaBottom?: string;
}

function SectionHeader({
  index,
  title,
  metaTop,
  metaBottom,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-black/10 px-6 py-7 sm:px-8">
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#555555]">
          [ {index} ]
        </p>
        <RevealOnView>
          <h2 className="mt-2 text-xl font-bold tracking-[0.08em] uppercase text-[#111111] sm:text-2xl">
            {title}
          </h2>
        </RevealOnView>
      </div>
      <p className="text-right font-mono text-[10px] leading-relaxed tracking-[0.18em] whitespace-nowrap uppercase text-[#666666]">
        {metaTop}
        {metaBottom ? (
          <>
            <br />
            {metaBottom}
          </>
        ) : null}
      </p>
    </div>
  );
}

/**
 * Top-level composition for the DCC Club team page: branding bar, hero,
 * core leadership matrix, sub-members directory, sequential FAQ, colophon.
 */
export default function TeamsPage() {
  return (
    <div className="teams-page min-h-screen bg-[#f4f4f4] pt-[92px] font-sans text-[#111111] max-[680px]:pt-[76px]">
      <header className="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#666666] sm:px-8">
        <p className="font-semibold text-[#111111]">
          DCC CLUB <span className="text-[#555555]">{"//"}</span> DEAN CAREER
          CLOUD
        </p>
        <p className="hidden md:block">BENNETT UNIVERSITY</p>
        <p>[ TEAM INDEX ]</p>
      </header>

      <main>
        <TeamsHero />

        <section aria-label="Core leadership">
          <SectionHeader
            index="01"
            title="Core Leadership"
            metaTop="// CORE LEADERSHIP"
            metaBottom={`COUNT: ${String(coreMembers.length).padStart(2, "0")}`}
          />
          <CoreTeamGrid members={coreMembers} />
        </section>

        <section aria-label="Sub-members directory">
          <SectionHeader
            index="02"
            title="Directory — Sub-Members"
            metaTop="// DIRECTORY"
            metaBottom={`COUNT: ${String(subMembers.length).padStart(2, "0")}`}
          />
          <SubMembersDirectory members={subMembers} />
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 px-6 py-7 font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#666666] sm:px-8">
        <p className="text-[#666666]">
          DCC CLUB — DEAN CAREER CLOUD &copy; 2026 BENNETT UNIVERSITY
        </p>
        <p>[ BUILT BY MINDS. UNITED BY CODE. ]</p>
      </footer>
    </div>
  );
}
