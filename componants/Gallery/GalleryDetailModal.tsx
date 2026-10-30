"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Counter, Tag } from "@/componants/Shared/Separators";
import { resolveMediaUrl } from "@/lib/cloudinary";
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

  const requestClose = useCallback(() => {
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
        requestAnimationFrame(() => trigger.focus());
      }
    }, CLOSE_MS);
  }, [image, closing, getTriggerElement, onClose]);

  const handlersRef = useRef({ requestClose, onNext, onPrev });
  handlersRef.current = { requestClose, onNext, onPrev };

  useEffect(() => {
    if (!image) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const handlers = handlersRef.current;
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.requestClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handlers.onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlers.onPrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [image]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!image || !dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length) focusable[0].focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", trap);
    return () => dialog.removeEventListener("keydown", trap);
  }, [image]);

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
            src={resolveMediaUrl(image.src)}
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
              <Counter current={formattedIndex} total={formattedTotal} />
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
                  <span>
                    <Tag category="CAMERA" label="EXIF" />
                  </span>
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
