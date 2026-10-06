"use client";

import { useEffect, useRef, useState } from "react";
import { demoImpactStats, impactStats } from "@/content/records";
import styles from "./Home.module.css";

function Count({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number | null;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (value === null || !element.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / 900);
          setDisplay(Math.round((value as number) * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  if (value === null) return <span>—</span>;
  return (
    <>
      <span className={styles.screenReaderOnly}>
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
      <span ref={element} aria-hidden="true">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
    </>
  );
}

export function Impact() {
  const verified = impactStats.filter(
    (stat) => stat.value !== null && stat.source,
  );
  const illustrative = verified.length === 0;
  const records = illustrative ? demoImpactStats : verified;

  return (
    <section
      className={styles.impact}
      id="impact"
      aria-labelledby="impact-heading"
    >
      <div className={styles.sectionIndex}>01 / AT A GLANCE</div>
      <div className={styles.impactHeading}>
        <h2 id="impact-heading">
          THE WORK,
          <br />
          <em>IN NUMBERS.</em>
        </h2>
        <div className={styles.impactContext}>
          <p>
            A clearer view of the people, preparation, and connections that
            shape a career journey.
          </p>
          {illustrative && (
            <strong>
              SAMPLE DATA ONLY — THESE ARE NOT VERIFIED DCC RESULTS.
            </strong>
          )}
        </div>
      </div>
      <ul className={styles.impactGrid}>
        {records.map((stat, index) => (
          <li key={stat.id}>
            <span className={styles.impactIndex}>
              0{index + 1} / 0{records.length}
            </span>
            <div className={styles.impactValue}>
              <Count
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <p>{stat.label}</p>
            <small>
              {illustrative
                ? "ILLUSTRATIVE VALUE"
                : `${stat.source}${stat.updatedAt ? ` / ${stat.updatedAt}` : ""}`}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
