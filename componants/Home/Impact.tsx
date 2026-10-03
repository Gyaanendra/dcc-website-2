"use client";

import { useEffect, useRef, useState } from "react";
import { impactStats } from "@/content/records";
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
    <span ref={element}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Impact() {
  const verified = impactStats.filter(
    (stat) => stat.value !== null && stat.source,
  );
  const records = verified.length
    ? verified
    : process.env.NODE_ENV === "development"
      ? impactStats
      : [];
  if (!records.length) return null;
  return (
    <section className={styles.impact}>
      <div className={styles.sectionIndex}>04 / IMPACT</div>
      <h2>
        THE WORK,
        <br />
        IN NUMBERS.
      </h2>
      <div className={styles.impactGrid}>
        {records.map((stat) => (
          <div key={stat.id}>
            <Count
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
            <p>{stat.label}</p>
            <small>
              {stat.source
                ? `${stat.source}${stat.updatedAt ? ` / ${stat.updatedAt}` : ""}`
                : "SOURCE PENDING"}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
