"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import SubMemberItem from "./SubMemberItem";
import { DEPARTMENT_FILTERS, FILTER_LABELS } from "./team-data";
import type { Department, SubMember } from "./types";

/**
 * Grid wrapper owning the staggered reveal (animation type 5). Remounted via
 * `key` on every filter change so the IntersectionObserver re-binds to the
 * fresh rows and the entrance stagger replays.
 */
function RevealGrid({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) {
      return;
    }
    const targets = gridElement.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    targets.forEach((target) => {
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}

/**
 * High-density 4-column sub-member directory with department filtering.
 */
export default function SubMembersDirectory({
  members,
}: {
  members: SubMember[];
}) {
  const [activeDepartment, setActiveDepartment] = useState<Department>("All");

  const filteredMembers =
    activeDepartment === "All"
      ? members
      : members.filter((member) => member.department === activeDepartment);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-black/10 px-6 py-5 sm:px-8">
        {DEPARTMENT_FILTERS.map((department) => {
          const isActive = department === activeDepartment;
          return (
            <button
              key={department}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveDepartment(department)}
              className={`border px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                isActive
                  ? "border-[#111111] bg-[#111111] text-[#f4f4f4]"
                  : "border-black/20 text-[#666666] hover:border-[#111111] hover:bg-black/[0.03] hover:text-[#111111]"
              }`}
            >
              {FILTER_LABELS[department]}
            </button>
          );
        })}
        <p className="ml-auto self-center font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#666666]">
          COUNT: {String(filteredMembers.length).padStart(2, "0")}
        </p>
      </div>
      <RevealGrid
        key={activeDepartment}
        className="grid grid-cols-1 border-l border-black/10 md:grid-cols-2 lg:grid-cols-4"
      >
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            data-reveal
            className="border-r border-b border-black/10"
            style={{ "--stagger-index": index } as CSSProperties}
          >
            <SubMemberItem member={member} />
          </div>
        ))}
      </RevealGrid>
    </div>
  );
}
