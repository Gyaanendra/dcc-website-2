import AlphabetAvatar from "./AlphabetAvatar";
import type { SubMember } from "./types";

/**
 * Directory row — 80px square photo badge on the left, stacked uppercase
 * name + muted serif role on the right. Photos sit grayscale and gain full
 * colour on hover.
 */
export default function SubMemberItem({ member }: { member: SubMember }) {
  return (
    <div className="group flex items-center gap-2 bg-transparent px-2 py-3 transition-colors duration-300 hover:bg-[#555555]/[0.05] md:gap-4 md:px-4 md:py-4">
      <AlphabetAvatar
        name={member.name}
        initials={member.initials}
        src={member.imageUrl}
        variant="square"
      />
      <div className="min-w-0">
        <p className="truncate text-[10.5px] font-bold tracking-[0.10em] uppercase text-[#111111] md:text-[12.5px] md:tracking-[0.12em]">
          {member.name}
        </p>
        <p className="mt-0.5 truncate font-serif text-xs text-[#666666] italic transition-colors duration-300 group-hover:text-[#555555] md:mt-1 md:text-sm">
          {member.role}
        </p>
      </div>
    </div>
  );
}
