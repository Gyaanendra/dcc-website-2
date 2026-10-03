"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { site } from "@/content/site";
import styles from "./LandingHero.module.css";

export function LandingHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const section = root.current;
    const media = video.current;
    const videoLayer = section.querySelector<HTMLElement>("[data-video]");
    const wordmark = section.querySelector<HTMLElement>("[data-wordmark]");
    const characters = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-letter]"),
    );
    const supportingCopy = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-hero-copy]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!videoLayer || !wordmark || !media) return;

    if (reducedMotion) {
      videoLayer.style.opacity = "1";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let visible = false;
    let revealStarted = false;
    let scrollMotion: gsap.core.Timeline | undefined;
    let resizeFrame = 0;
    const syncPlayback = () => {
      if (visible && revealStarted && !document.hidden) {
        media.play().catch(() => {});
      } else {
        media.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);

    const createScrollMotion = () => {
      const stage = section.querySelector<HTMLElement>("[data-hero-stage]");
      const letterStage = section.querySelector<HTMLElement>(
        "[data-letter-stage]",
      );
      if (!stage || !letterStage) return;
      scrollMotion?.scrollTrigger?.kill();
      scrollMotion?.kill();
      gsap.set(wordmark, { clearProps: "transform" });
      const stageBounds = stage.getBoundingClientRect();
      const bounds = letterStage.getBoundingClientRect();
      const compactWidth = window.innerWidth <= 680 ? 106 : 150;
      const compactLeft = window.innerWidth <= 680 ? 20 : 28;
      const compactTop = window.innerWidth <= 680 ? 22 : 24;
      scrollMotion = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
          },
        })
        .to(
          wordmark,
          {
            x: compactLeft - (bounds.left - stageBounds.left),
            y: compactTop - (bounds.top - stageBounds.top),
            scale: compactWidth / bounds.width,
            transformOrigin: "top left",
            ease: "none",
          },
          0,
        )
        .to(supportingCopy, { autoAlpha: 0, duration: 0.16, ease: "none" }, 0)
        .to(videoLayer, { yPercent: 7, ease: "none" }, 0);
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (!scrollMotion) return;
        createScrollMotion();
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("resize", onResize);

    const initialPositions = characters.map((character) =>
      character.getBoundingClientRect(),
    );
    const mobile = window.innerWidth <= 680;
    const groupStart = mobile ? -70 : -Math.min(window.innerWidth * 0.1, 135);
    const groupStep = mobile ? 110 : Math.min(window.innerWidth * 0.18, 250);
    gsap.set(characters, {
      x: (index) =>
        groupStart + index * groupStep - initialPositions[index].left,
    });
    gsap.set(videoLayer, { opacity: 0 });
    const entrance = gsap
      .timeline({ delay: 0.3 })
      .to(characters, {
        x: 0,
        duration: 1.95,
        stagger: 0.1,
        ease: "power2.inOut",
      })
      .call(createScrollMotion)
      .to(
        videoLayer,
        {
          opacity: 1,
          duration: 1.25,
          ease: "power2.out",
          onStart: () => {
            revealStarted = true;
            syncPlayback();
          },
        },
        ">+0.25",
      );

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeFrame);
      media.pause();
      entrance.kill();
      scrollMotion?.scrollTrigger?.kill();
      scrollMotion?.kill();
      gsap.set([...characters, wordmark, videoLayer, ...supportingCopy], {
        clearProps: "all",
      });
    };
  }, []);

  return (
    <section
      className={styles.hero}
      ref={root}
      aria-label="Dean Career Cloud introduction"
    >
      <div className={styles.stage} data-hero-stage>
        <div className={styles.topStatement} data-hero-copy>
          A BETTER WAY
          <br />
          TO FIND YOUR DIRECTION
        </div>
        <div className={styles.videoBackdrop} data-video aria-hidden="true">
          <video
            ref={video}
            src="/media/dcc-event-reel.mp4"
            poster="/media/dcc-event-reel-poster.png"
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
        </div>
        <div className={styles.letterStage} data-letter-stage>
          <h1
            className={styles.letters}
            data-wordmark
            aria-label="DCC — Dean Career Cloud"
          >
            <span data-letter>D</span>
            <span data-letter>C</span>
            <span data-letter>C</span>
          </h1>
        </div>
        <div className={styles.descriptor} data-hero-copy>
          DEAN CAREER CLOUD
          <br />
          BENNETT UNIVERSITY / {site.school}
        </div>
        <div className={styles.bottom} data-hero-copy>
          <p>
            Careers are not a straight line.
            <br />
            DCC helps you navigate what comes next.
          </p>
          <span>THE CAREER ECOSYSTEM / {site.year}</span>
          <Link href="#thinking" aria-label="Scroll to DCC philosophy">
            ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
