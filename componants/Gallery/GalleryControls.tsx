"use client";

import styles from "./Gallery.module.css";

interface GalleryControlsProps {
  activeIndex: number;
  totalCount: number;
}

export function GalleryControls({
  activeIndex,
  totalCount,
}: GalleryControlsProps) {
  const currentFormatted = String(activeIndex + 1).padStart(2, "0");
  const totalFormatted = String(totalCount).padStart(2, "0");

  return (
    <nav className={styles.controlsBar} aria-label="Gallery controls">
      <span className={styles.hintText} aria-hidden="true">
        {"CLICK A CARD TO INSPECT // DRAG SIDEWAYS TO SCRUB ↔"}
      </span>

      <span className={styles.counter}>
        {currentFormatted} <i>/</i> {totalFormatted}
      </span>
    </nav>
  );
}
