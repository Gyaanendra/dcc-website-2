import AlphabetAvatar from "./AlphabetAvatar";
import type { SubMember } from "./types";

/**
 * Directory row — 80px square photo badge on the left, stacked uppercase
 * name + muted serif role on the right. Photos sit grayscale and gain full
 * colour on hover.
 */
export default function SubMemberItem({ member }: { member: SubMember }) {
  return (
    <div className="group flex items-center gap-4 bg-transparent px-4 py-4 transition-colors duration-300 hover:bg-[#555555]/[0.05]">
      <AlphabetAvatar
        name={member.name}
        initials={member.initials}
        src={member.imageUrl}
        variant="square"
      />
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-bold tracking-[0.12em] uppercase text-[#111111]">
          {member.name}
        </p>
        <p className="mt-1 truncate font-serif text-sm text-[#666666] italic transition-colors duration-300 group-hover:text-[#555555]">
          {member.role}
        </p>
      </div>
    </div>
  );
}
