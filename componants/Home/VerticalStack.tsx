"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { verticals } from "@/content/verticals";
import styles from "./Home.module.css";

export function VerticalStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add(
      "(min-width: 801px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          root.current?.querySelectorAll("[data-vertical-card]") ?? [],
        );
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { yPercent: 8 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 72%",
                scrub: 0.85,
                invalidateOnRefresh: true,
              },
            },
          );
          if (index === cards.length - 1) return;
          gsap.to(card, {
            y: -14,
            scale: 0.965,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 34%",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });
        });
      },
    );
    return () => motion.revert();
  }, []);

  return (
    <section className={styles.verticalSection} id="verticals" ref={root}>
      <div className={styles.verticalIntro}>
        <div className={styles.sectionIndex}>04 / THE SYSTEM</div>
        <h2>
          EIGHT WAYS
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
              DCC / {String(index + 1).padStart(2, "0")} <span>—</span>{" "}
              {String(verticals.length).padStart(2, "0")}
            </div>
            <div className={styles.cardBody}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className={styles.cardBottom}>
              <span>{item.focus.join(" / ")}</span>
            </div>
            <div className={styles.cardNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
