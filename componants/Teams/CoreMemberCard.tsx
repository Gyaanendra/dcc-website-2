import AlphabetAvatar from "./AlphabetAvatar";
import { DEPARTMENT_CODES } from "./team-data";
import type { CoreMember } from "./types";

function refCode(order: number): string {
  return `DCC-${String(order).padStart(2, "0")}`;
}

/**
 * Heroic 3:4 portrait panel with a hairline-separated metadata row:
 * uppercase sans name, muted serif designation, mono cap bar.
 */
export default function CoreMemberCard({ member }: { member: CoreMember }) {
  return (
    <article className="group flex h-full flex-col bg-transparent transition-colors duration-300 hover:bg-[#C04F2E]/[0.04]">
      <AlphabetAvatar
        name={member.name}
        initials={member.initials}
        src={member.imageUrl}
        variant="portrait"
        refCode={refCode(member.order)}
        deptCode={DEPARTMENT_CODES[member.department]}
        tenure={member.tenure}
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-bold tracking-[0.12em] uppercase text-[#111111]">
          {member.name}
        </h3>
        <p className="mt-0.5 font-serif text-sm text-[#666666] italic transition-colors duration-300 group-hover:text-[#C04F2E]">
          {member.role}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3 font-mono text-[9.5px] tracking-[0.14em] uppercase text-[#8A8A8A]">
          <span>{member.leadRole}</span>
          <span>{refCode(member.order)}</span>
        </div>
      </div>
    </article>
  );
}
