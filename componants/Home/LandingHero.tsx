"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    const topStatement = section.querySelector<HTMLElement>(
      `.${styles.topStatement}`,
    );
    const descriptor = section.querySelector<HTMLElement>(
      `.${styles.descriptor}`,
    );
    const bottomBar = section.querySelector<HTMLElement>(`.${styles.bottom}`);
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
    let disposed = false;
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
      if (!stage || !letterStage || !topStatement || !descriptor || !bottomBar)
        return;
      scrollMotion?.scrollTrigger?.kill();
      scrollMotion?.kill();
      gsap.set(wordmark, { clearProps: "transform" });
      const stageBounds = stage.getBoundingClientRect();
      const bounds = letterStage.getBoundingClientRect();
      const pagePad = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--page-pad",
        ),
      );
      const compactWidth = window.innerWidth <= 680 ? 106 : 150;
      const compactLeft = Number.isNaN(pagePad)
        ? window.innerWidth <= 680
          ? 20
          : 28
        : pagePad;
      const compactTop = window.innerWidth <= 680 ? 22 : 24;
      scrollMotion = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        })
        .to(
          wordmark,
          {
            x: compactLeft - (bounds.left - stageBounds.left),
            y: compactTop - (bounds.top - stageBounds.top),
            scale: compactWidth / bounds.width,
            transformOrigin: "top left",
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          topStatement,
          { y: -28, autoAlpha: 0, duration: 0.28, ease: "power1.in" },
          0,
        )
        .to(
          descriptor,
          { scale: 0.95, autoAlpha: 0, duration: 0.22, ease: "power1.in" },
          0,
        )
        .to(
          bottomBar,
          { y: 22, autoAlpha: 0, duration: 0.32, ease: "power1.in" },
          0,
        )
        .to(videoLayer, { yPercent: 6, ease: "none" }, 0);
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
    // Re-measure once webfonts settle so the scrub bounds stay exact.
    document.fonts?.ready
      .then(() => {
        if (disposed || !scrollMotion) return;
        createScrollMotion();
        ScrollTrigger.refresh();
      })
      .catch(() => {});

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
    gsap.set(supportingCopy, { y: 12, autoAlpha: 0 });
    const entrance = gsap
      .timeline({ delay: 0.15 })
      .to(characters, {
        x: 0,
        duration: 1.35,
        stagger: 0.08,
        ease: "power3.out",
      })
      .to(
        videoLayer,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            revealStarted = true;
            syncPlayback();
          },
        },
        ">+0.2",
      )
      .to(
        supportingCopy,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
        "<+0.1",
      )
      .call(createScrollMotion);

    return () => {
      disposed = true;
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
            disablePictureInPicture
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
          {/* Plain anchor: Next.js Link suppresses same-page fragment
              scrolling, which left this scroll cue dead. */}
          <a href="#thinking" aria-label="Scroll to DCC philosophy">
            ↓
          </a>
        </div>
      </div>
    </section>
  );
}
