"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./Home.module.css";

const lines = [
  "Careers are rarely linear.",
  "Preparation changes direction.",
  "People open doors.",
  "Opportunity changes the trajectory.",
];

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      !root.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-manifesto-line]");
      gsap.fromTo(
        elements,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section
      className={styles.manifesto}
      ref={root}
      aria-label="DCC philosophy"
    >
      <div className={styles.manifestoSticky}>
        <div className={styles.sectionIndex}>01 / THE THINKING</div>
        <p className={styles.manifestoText}>
          {lines.map((line) => (
            <span key={line} data-manifesto-line>
              {line}
            </span>
          ))}
        </p>
        <div className={styles.manifestoBottom}>
          <span>THERE IS NO SINGLE ROUTE.</span>
          <span>THERE IS A BETTER WAY TO NAVIGATE.</span>
        </div>
      </div>
    </section>
  );
}
