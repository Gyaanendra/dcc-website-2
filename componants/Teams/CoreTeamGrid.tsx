"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import CoreMemberCard from "./CoreMemberCard";
import type { CoreMember } from "./types";

/**
 * 3-card editorial row for the core leads: a hairline matrix on small
 * screens, separated cards with a small gap from md up. Panels reveal with
 * a staggered fade-up (animation type 5) driven by IntersectionObserver.
 */
export default function CoreTeamGrid({ members }: { members: CoreMember[] }) {
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
      { threshold: 0.12 },
    );
    targets.forEach((target) => {
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div
        ref={gridRef}
        className="grid grid-cols-1 border-l border-black/10 md:grid-cols-3 md:gap-4 md:border-l-0"
      >
        {members.map((member, index) => (
          <div
            key={member.id}
            data-reveal
            className="relative border-r border-b border-black/10 hover:z-10 md:border-r-0 md:border-b-0"
            style={{ "--stagger-index": index } as CSSProperties}
          >
            <CoreMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
