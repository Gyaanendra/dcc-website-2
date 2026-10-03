"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { verticals } from "@/content/verticals";
import styles from "./Home.module.css";

export function VerticalStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      !root.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 800px)").matches
    )
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-vertical-card]");
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card, {
          scale: 0.965,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section className={styles.verticalSection} id="verticals" ref={root}>
      <div className={styles.verticalIntro}>
        <div className={styles.sectionIndex}>03 / THE SYSTEM</div>
        <h2>
          SEVEN WAYS
          <br />
          TO MOVE <em>FORWARD.</em>
        </h2>
        <p>
          Distinct focus areas. One connected view of what a career can become.
        </p>
      </div>
      <div className={styles.verticalCards}>
        {verticals.map((item, index) => (
          <article
            data-vertical-card
            className={styles.verticalCard}
            key={item.id}
          >
            <div className={styles.cardIndex}>
              DCC / 0{index + 1} <span>—</span> 07
            </div>
            <div className={styles.cardBody}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className={styles.cardBottom}>
              <span>{item.focus.join(" / ")}</span>
              <span className={styles.cardArrow} aria-hidden="true">
                ↗
              </span>
            </div>
            <div className={styles.cardOrbit} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
