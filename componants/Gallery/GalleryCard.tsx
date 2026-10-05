"use client";

import Image from "next/image";
import styles from "./Gallery.module.css";
import type { GalleryImage } from "./types";

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  total: number;
  /** Fires with the card's on-screen rectangle so the detail view can
      expand from exactly this position. */
  onClick: (rect: DOMRect | null) => void;
  cardRef?: (element: HTMLButtonElement | null) => void;
}

export function GalleryCard({
  image,
  index,
  total,
  onClick,
  cardRef,
}: GalleryCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <button
      type="button"
      className={styles.card}
      style={{ aspectRatio: image.aspectRatio }}
      onClick={(event) => onClick(event.currentTarget.getBoundingClientRect())}
      aria-label={`${image.title} — ${image.category} (${formattedIndex} of ${formattedTotal})`}
      data-gallery-card
      ref={cardRef}
    >
      <div className={styles.cardMedia}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 680px) 85vw, (max-width: 1200px) 50vw, 40vw"
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          draggable={false}
        />
      </div>

      <div className={styles.cardOverlay}>
        <span
          className={`${styles.cardCategory} ${styles.captionAnim}`}
          style={{ animationDelay: `${0.15 + index * 0.06}s` }}
        >
          {image.category}
        </span>
        <div className={styles.cardMetaRow}>
          <span
            className={`${styles.cardTitle} ${styles.captionAnim}`}
            style={{ animationDelay: `${0.22 + index * 0.06}s` }}
          >
            {image.title}
          </span>
          <span
            className={`${styles.cardIndex} ${styles.captionAnim}`}
            style={{ animationDelay: `${0.28 + index * 0.06}s` }}
          >
            {formattedIndex} / {formattedTotal}
          </span>
        </div>
      </div>
    </button>
  );
}
