"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import CoreMemberCard from "./CoreMemberCard";
import type { CoreMember } from "./types";

interface CoreTeamGridProps {
  members: CoreMember[];
  columns?: 3 | 4;
}

/**
 * Editorial matrix for leadership cards: framed by hairlines on small screens,
 * separated cards with gap on larger screens. Panels reveal with a
 * staggered fade-up (animation type 5) driven by IntersectionObserver.
 */
export default function CoreTeamGrid({ members, columns }: CoreTeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = columns ?? (members.length === 4 ? 4 : 3);

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
    <div className={`mx-auto ${cols === 3 ? "max-w-[880px]" : "max-w-6xl"}`}>
      <div
        ref={gridRef}
        className={`grid ${
          cols === 4
            ? "grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"
            : "grid-cols-1 sm:grid-cols-3 md:gap-4"
        }`}
      >
        {members.map((member, index) => (
          <div
            key={member.id}
            data-reveal
            className="relative hover:z-10"
            style={{ "--stagger-index": index } as CSSProperties}
          >
            <CoreMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
