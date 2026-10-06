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
    const bottomBar = section.querySelector<HTMLElement>(`.${styles.bottom}`);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!videoLayer || !wordmark || !media) return;

    if (reducedMotion) {
      videoLayer.style.opacity = "1";
      section.dataset.heroIntro = "complete";
      gsap.set(supportingCopy, { autoAlpha: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let visible = false;
    let revealStarted = false;
    let mediaFailed = false;
    let introComplete = false;
    let disposed = false;
    let scrollMotion: gsap.core.Timeline | undefined;
    let copyScroll: gsap.core.Timeline | undefined;
    let resizeFrame = 0;
    let playbackFallback = 0;
    const completeIntro = () => {
      if (introComplete) return;
      introComplete = true;
      window.clearTimeout(playbackFallback);
      section.dataset.heroIntro = "complete";
      gsap.set(supportingCopy, { y: 0, autoAlpha: 1 });
      if (!topStatement || !bottomBar) return;
      copyScroll = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        })
        .to(
          topStatement,
          { y: -28, autoAlpha: 0, duration: 0.28, ease: "power1.in" },
          0,
        )
        .to(
          bottomBar,
          { y: 22, autoAlpha: 0, duration: 0.32, ease: "power1.in" },
          0,
        );
      ScrollTrigger.refresh();
    };
    const syncPlayback = () => {
      if (visible && revealStarted && !mediaFailed && !document.hidden) {
        media.play().catch((error: unknown) => {
          if (disposed) return;
          if (error instanceof DOMException && error.name === "AbortError")
            return;
          mediaFailed = true;
          completeIntro();
        });
      } else {
        media.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible && revealStarted && window.scrollY > section.offsetTop) {
          completeIntro();
        }
        syncPlayback();
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    const onVideoPlaying = () => completeIntro();
    // Restart manually because the native loop attribute suppresses "ended".
    const onVideoEnd = () => {
      completeIntro();
      media.currentTime = 0;
      syncPlayback();
    };
    const onVideoError = () => {
      mediaFailed = true;
      if (revealStarted) completeIntro();
    };
    media.addEventListener("playing", onVideoPlaying);
    media.addEventListener("ended", onVideoEnd);
    media.addEventListener("error", onVideoError);

    const createScrollMotion = () => {
      const stage = section.querySelector<HTMLElement>("[data-hero-stage]");
      const letterStage = section.querySelector<HTMLElement>(
        "[data-letter-stage]",
      );
      if (!stage || !letterStage || !topStatement || !bottomBar) return;
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
      const compactWidth = window.innerWidth <= 680 ? 85 : 120;
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
            if (mediaFailed) {
              completeIntro();
            } else {
              syncPlayback();
              playbackFallback = window.setTimeout(() => {
                if (visible && !document.hidden && media.currentTime < 0.1) {
                  mediaFailed = true;
                  completeIntro();
                }
              }, 8000);
            }
          },
        },
        ">+0.2",
      )
      .call(createScrollMotion);

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      media.removeEventListener("playing", onVideoPlaying);
      media.removeEventListener("ended", onVideoEnd);
      media.removeEventListener("error", onVideoError);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeFrame);
      window.clearTimeout(playbackFallback);
      media.pause();
      entrance.kill();
      scrollMotion?.scrollTrigger?.kill();
      scrollMotion?.kill();
      copyScroll?.scrollTrigger?.kill();
      copyScroll?.kill();
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
      data-hero-intro="pending"
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
        <div className={styles.bottom} data-hero-copy>
          <p>
            Careers are not a straight line.
            <br />
            DCC helps you navigate what comes next.
          </p>
          <span>THE CAREER ECOSYSTEM / {site.year}</span>
          {/* Plain anchor: Next.js Link suppresses same-page fragment
              scrolling, which left this scroll cue dead. */}
          <a href="#impact" aria-label="Scroll to DCC statistics">
            ↓
          </a>
        </div>
      </div>
    </section>
  );
}
