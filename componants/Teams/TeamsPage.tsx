import CoreTeamGrid from "./CoreTeamGrid";
import RevealOnView from "./RevealOnView";
import SubMembersDirectory from "./SubMembersDirectory";
import TeamsHero from "./TeamsHero";
import { advisorMembers, coreMembers, subMembers } from "./team-data";

// Core page shows the top three leads (President, Vice President,
// General Secretary); every other member renders in the directory below.
const coreTeam = coreMembers.slice(0, 3);

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="px-6 py-7 sm:px-8">
      <RevealOnView>
        <h2 className="text-xl font-bold tracking-[0.08em] uppercase text-[#111111] sm:text-2xl">
          {title}
        </h2>
      </RevealOnView>
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
      <header className="flex items-center px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#666666] sm:px-8">
        <p className="font-semibold text-[#111111]">
          DCC CLUB <span className="text-[#555555]">·</span> DEAN CAREER CLOUD
        </p>
      </header>

      <main>
        <TeamsHero />

        <section aria-label="Core leadership">
          <SectionHeader title="Core Leadership" />
          <CoreTeamGrid members={coreTeam} columns={3} />
        </section>

        <section aria-label="Advisors">
          <SectionHeader title="Advisors" />
          <CoreTeamGrid members={advisorMembers} columns={4} />
        </section>

        <section aria-label="Sub-members directory">
          <SectionHeader title="Directory — Sub-Members" />
          <SubMembersDirectory members={subMembers} />
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-3 px-6 py-7 font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#666666] sm:px-8">
        <p className="text-[#666666]">
          DCC CLUB — DEAN CAREER CLOUD &copy; 2026 BENNETT UNIVERSITY
        </p>
      </footer>
    </div>
  );
}
