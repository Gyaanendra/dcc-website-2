"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Slides its content up into view (animation type 5) the first time it
 * enters the viewport, using the shared [data-reveal] CSS primitive.
 */
export default function RevealOnView({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={`reveal-slow ${className}`}>
      {children}
    </div>
  );
}
