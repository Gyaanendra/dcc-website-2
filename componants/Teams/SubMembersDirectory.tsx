"use client";

import React, {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import SubMemberItem from "./SubMemberItem";
import { DEPARTMENT_FILTERS, FILTER_LABELS } from "./team-data";
import type { Department, SubMember } from "./types";

const BATCH_SIZE = 18;

function LazyGrid({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const childArray = React.Children.toArray(children);
  const total = childArray.length;
  const [shown, setShown] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShown(BATCH_SIZE);
  }, [total]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown((prev) => Math.min(prev + BATCH_SIZE, total));
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [total, shown]);

  return (
    <div className={className}>
      {childArray.slice(0, shown)}
      {shown < total && (
        <div
          ref={sentinelRef}
          aria-hidden
          className="col-span-full h-px"
        />
      )}
    </div>
  );
}

export default function SubMembersDirectory({
  members,
}: {
  members: SubMember[];
}) {
  const [activeDepartment, setActiveDepartment] = useState<Department>(
    DEPARTMENT_FILTERS[0],
  );

  const filteredMembers = members.filter(
    (member) => member.department === activeDepartment,
  );

  return (
    <div>
      <div className="border-b border-black/10 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="scrollbar-none flex min-w-0 flex-1 gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">
            {DEPARTMENT_FILTERS.map((department) => {
              const isActive = department === activeDepartment;
              return (
                <button
                  key={department}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveDepartment(department)}
                  className={`flex-none border px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "border-[#111111] bg-[#111111] text-[#f4f4f4]"
                      : "border-black/20 text-[#666666] hover:border-[#111111] hover:bg-black/[0.03] hover:text-[#111111]"
                  }`}
                >
                  {FILTER_LABELS[department]}
                </button>
              );
            })}
          </div>
          <p className="flex-none font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#666666]">
            COUNT: {String(filteredMembers.length).padStart(2, "0")}
          </p>
        </div>
      </div>
      <LazyGrid
        key={activeDepartment}
        className="grid grid-cols-2 border-l border-black/10 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="border-r border-b border-black/10"
          >
            <SubMemberItem member={member} />
          </div>
        ))}
      </LazyGrid>
    </div>
  );
}
