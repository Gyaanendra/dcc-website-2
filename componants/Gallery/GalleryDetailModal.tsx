"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";
import type { GalleryImage } from "./types";

interface GalleryDetailModalProps {
  image: GalleryImage | null;
  /** Centre point of the card that opened this view (grow-out origin). */
  originPoint: { x: number; y: number } | null;
  /** Live element of that same card, re-read when closing (focus + origin). */
  getTriggerElement: (id: string) => HTMLElement | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
}

const CLOSE_MS = 420;

export function GalleryDetailModal({
  image,
  originPoint,
  getTriggerElement,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: GalleryDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  // Close: play the reverse animation, restore focus to the card, then
  // let the parent unmount this view.
  const requestClose = () => {
    if (!image || closing) return;
    const trigger = getTriggerElement(image.id);
    const dialog = dialogRef.current;
    if (trigger && dialog) {
      const rect = dialog.getBoundingClientRect();
      dialog.style.setProperty(
        "--from-x",
        `${trigger.getBoundingClientRect().left + trigger.getBoundingClientRect().width / 2 - (rect.left + rect.width / 2)}px`,
      );
      dialog.style.setProperty(
        "--from-y",
        `${trigger.getBoundingClientRect().top + trigger.getBoundingClientRect().height / 2 - (rect.top + rect.height / 2)}px`,
      );
    }
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      if (trigger) {
        // Restore focus to the triggering card after unmount.
        requestAnimationFrame(() => trigger.focus());
      }
    }, CLOSE_MS);
  };

  useEffect(() => {
    if (!image) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!image) return null;

  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCount).padStart(2, "0");

  return (
    <div
      className={`${styles.modalBackdrop} ${closing ? styles.isClosing : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") requestClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed inspection: ${image.title}`}
    >
      <div
        ref={dialogRef}
        className={styles.modalDialog}
        style={
          originPoint
            ? ({
                "--from-x": `${originPoint.x}px`,
                "--from-y": `${originPoint.y}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={requestClose}
          aria-label="Close detail inspection"
        >
          ×
        </button>

        <div className={styles.modalImageArea}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            priority
          />
        </div>

        <div className={styles.modalInfoArea}>
          <div className={styles.modalTopline}>
            <span>{image.category}</span>
            <span>
              {formattedIndex} / {formattedTotal}
            </span>
          </div>

          <div className={styles.modalBody}>
            <h2>{image.title}</h2>
            <p>{image.caption}</p>

            <div className={styles.modalSpecs}>
              <span>LOCATION</span>
              <span>{image.location}</span>

              <span>YEAR</span>
              <span>{image.year}</span>

              {image.cameraMeta && (
                <>
                  <span>CAMERA / EXIF</span>
                  <span>{image.cameraMeta}</span>
                </>
              )}

              <span>RATIO</span>
              <span>{image.aspectRatio}</span>
            </div>
          </div>

          <div className={styles.modalNavRow}>
            <button
              type="button"
              className={styles.modalNavBtn}
              onClick={onPrev}
              aria-label="Previous gallery image"
            >
              ← PREVIOUS
            </button>
            <button
              type="button"
              className={styles.modalNavBtn}
              onClick={onNext}
              aria-label="Next gallery image"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
