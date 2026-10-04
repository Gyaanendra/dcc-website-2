"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import styles from "./Gallery.module.css";
import { GalleryCard } from "./GalleryCard";
import type { GalleryImage } from "./types";

interface GalleryRunwayProps {
  images: GalleryImage[];
  onSelectImage: (image: GalleryImage, rect: DOMRect | null) => void;
  onActiveIndexChange?: (index: number) => void;
  /** Lets the page find a card element later (detail transition). */
  registerCard?: (id: string, element: HTMLElement | null) => void;
}

const LERP = 0.08; // 0–1: how fast the track catches up to its target
const WHEEL_SPEED = 1.15;
const DRAG_SPEED = 1.18;
const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag
const MAX_SKEW = 3.5; // deg — velocity bend while moving fast
const MAX_ROTATE_Y = 26; // deg — spatial curve towards the screen edges
const MAX_DEPTH = 240; // px — how far side panels recede behind the centre
const POP_SCALE = 1.07; // centre panel pops above its resting size
const POP_FADE = 0.5; // brightness falloff for the panels at the edges

export function GalleryRunway({
  images,
  onSelectImage,
  onActiveIndexChange,
  registerCard,
}: GalleryRunwayProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Physics state lives in a ref so the animation loop never re-renders React.
  const state = useRef({
    currentX: 0,
    targetX: 0,
    startX: 0,
    dragStartX: 0,
    dragArmed: false,
    isDragging: false,
    maxScroll: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let running = false;
    // Card geometry is measured once per resize, not on every frame.
    let cards: HTMLElement[] = [];
    let centers: number[] = [];
    let lastActiveIndex = -1;

    const measure = () => {
      const trackWidth = track.scrollWidth;
      const viewWidth = container.clientWidth;
      state.current.maxScroll = Math.min(0, -(trackWidth - viewWidth + 80));
      cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-gallery-card]"),
      );
      centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
    };

    // Paints one frame: track position + spatial curve + active card.
    const render = () => {
      const s = state.current;
      track.style.transform = `translate3d(${s.currentX.toFixed(2)}px, 0, 0)`;
      const viewCenter = container.clientWidth / 2;
      if (!reducedMotion) {
        const velocity = s.targetX - s.currentX;
        const skew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocity * -0.02));
        for (let i = 0; i < cards.length; i++) {
          // One continuous curved strip: panels hinge together edge-to-edge,
          // the one nearest the centre pops forward (bigger, brighter, on
          // top) while the sides recede and bend away — no WebGL needed.
          const offset =
            (centers[i] + s.currentX - viewCenter) /
            (container.clientWidth * 0.85);
          const rotateY = offset * -MAX_ROTATE_Y;
          const translateZ = -Math.abs(offset) * MAX_DEPTH;
          const scale = Math.max(
            POP_SCALE - Math.abs(offset) * 0.3,
            POP_SCALE - 0.3,
          );
          const brightness =
            1 - Math.min(Math.abs(offset) * POP_FADE, POP_FADE);
          cards[i].style.transform =
            `translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) skewX(${skew.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          cards[i].style.filter = `brightness(${brightness.toFixed(3)})`;
          cards[i].style.zIndex = String(
            100 - Math.round(Math.abs(offset) * 60),
          );
        }
      }
      if (onActiveIndexChange && centers.length > 0) {
        let nearest = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (let i = 0; i < centers.length; i++) {
          const distance = Math.abs(centers[i] + s.currentX - viewCenter);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = i;
          }
        }
        if (nearest !== lastActiveIndex) {
          lastActiveIndex = nearest;
          onActiveIndexChange(nearest);
        }
      }
    };

    const tick = () => {
      const s = state.current;
      // Elastic pull-back when dragged or wheeled past the edges.
      if (s.targetX > 40) s.targetX += (0 - s.targetX) * 0.12;
      else if (s.targetX < s.maxScroll - 40)
        s.targetX += (s.maxScroll - s.targetX) * 0.12;
      s.currentX += (s.targetX - s.currentX) * LERP;
      render();
      // Stop the loop while the scene is idle — no permanent animation.
      if (Math.abs(s.targetX - s.currentX) < 0.05 && !s.isDragging) {
        running = false;
        s.currentX = s.targetX;
        render();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Only deliberate horizontal input (trackpad swipe / shift + wheel)
      // scrubs the runway. Vertical wheel input is left alone so normal
      // page scrolling stays smooth instead of fighting the track.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      state.current.targetX -= e.deltaX * WHEEL_SPEED;
      startLoop();
    };
    container.addEventListener("wheel", onWheel, { passive: true });

    measure();
    if (reducedMotion) {
      // Reduced motion: no JS animation — the media query below turns this
      // row into a native, keyboard-scrollable horizontal scroller instead.
      return;
    }
    render();

    const onResize = () => {
      measure();
      render();
    };
    window.addEventListener("resize", onResize);

    // Pointer drag (mouse + touch). The press is only "armed" first — the
    // pointer is captured once movement passes DRAG_THRESHOLD, so plain taps
    // and clicks still land on the card buttons.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const s = state.current;
      s.dragArmed = true;
      s.startX = e.clientX;
      s.dragStartX = s.targetX;
    };
    const onPointerMove = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragArmed) return;
      const dx = e.clientX - s.startX;
      if (!s.isDragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        s.isDragging = true;
        setIsGrabbing(true);
        container.setPointerCapture(e.pointerId);
      }
      s.targetX = s.dragStartX + dx * DRAG_SPEED;
      startLoop();
    };
    const onPointerUp = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragArmed && !s.isDragging) return;
      s.dragArmed = false;
      if (s.isDragging) {
        s.isDragging = false;
        setIsGrabbing(false);
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {}
        startLoop(); // release momentum
      }
    };
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(frame);
      running = false;
      window.removeEventListener("resize", onResize);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [onActiveIndexChange]);

  return (
    <section
      ref={containerRef}
      className={`${styles.runwayStage} ${isGrabbing ? styles.isGrabbing : ""}`}
      aria-label="Horizontal visual gallery runway"
    >
      <div ref={trackRef} className={styles.runwayTrack}>
        {images.map((image, index) => (
          <GalleryCard
            key={image.id}
            image={image}
            index={index}
            total={images.length}
            onClick={(rect) => onSelectImage(image, rect)}
            cardRef={(element) => registerCard?.(image.id, element)}
          />
        ))}
      </div>
      <div className={styles.floor} aria-hidden="true" />
      <div className={styles.chrome}>
        <span>
          FEATURED <i>/</i> {String(images.length).padStart(2, "0")}
        </span>
        <span>{site.school.toUpperCase()} / BENNETT UNIVERSITY</span>
      </div>
    </section>
  );
}
