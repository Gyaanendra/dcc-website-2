import AlphabetAvatar from "./AlphabetAvatar";
import type { SubMember } from "./types";

/**
 * Compact directory row — 44px square letter badge on the left, stacked
 * uppercase name + muted serif role on the right.
 */
export default function SubMemberItem({ member }: { member: SubMember }) {
  return (
    <div className="group flex items-center gap-3.5 bg-transparent px-4 py-3.5 transition-colors duration-300 hover:bg-[#C04F2E]/[0.05]">
      <AlphabetAvatar
        name={member.name}
        initials={member.initials}
        src={member.imageUrl}
        variant="square"
      />
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-bold tracking-[0.12em] uppercase text-[#111111]">
          {member.name}
        </p>
        <p className="mt-0.5 truncate font-serif text-[13px] text-[#8A8A8A] italic transition-colors duration-300 group-hover:text-[#C04F2E]">
          {member.role}
        </p>
      </div>
    </div>
  );
}
