"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import styles from "./Gallery.module.css";
import { GalleryControls } from "./GalleryControls";
import { GalleryDetailModal } from "./GalleryDetailModal";
import { GalleryRunway } from "./GalleryRunway";
import { galleryImages } from "./gallery-data";
import type { GalleryImage } from "./types";

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Card elements registered by the runway, used for the shared-element
  // detail transition and to restore focus on close.
  const cardElements = useRef(new Map<string, HTMLElement>());
  const handleRegisterCard = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) cardElements.current.set(id, element);
      else cardElements.current.delete(id);
    },
    [],
  );
  const getTriggerElement = useCallback(
    (id: string) => cardElements.current.get(id) ?? null,
    [],
  );

  const selectedIndex = selectedImage
    ? galleryImages.findIndex((img) => img.id === selectedImage.id)
    : activeIndex;

  const handleNext = useCallback(() => {
    setSelectedImage((current) => {
      const nextIdx = galleryImages.findIndex((img) => img.id === current?.id);
      return galleryImages[(nextIdx + 1) % galleryImages.length];
    });
    setActiveIndex((i) => (i + 1) % galleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedImage((current) => {
      const prevIdx = galleryImages.findIndex((img) => img.id === current?.id);
      const target =
        (prevIdx - 1 + galleryImages.length) % galleryImages.length;
      return galleryImages[target];
    });
    setActiveIndex(
      (i) => (i - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  const selectedPointRef = useRef<{ x: number; y: number } | null>(null);

  const selectImage = useCallback(
    (image: GalleryImage, rect: DOMRect | null = null) => {
      // Keep the card's centre so the detail sheet can grow out of exactly
      // where the click happened.
      selectedPointRef.current = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : null;
      setSelectedImage(image);
      setActiveIndex(galleryImages.findIndex((img) => img.id === image.id));
    },
    [],
  );

  return (
    <main className={styles.galleryPage} id="main">
      <section className={styles.galleryHero}>
        <div className={styles.heroTopline}>
          <span>{"DCC // ARCHIVE // VISUAL ATLAS"}</span>
          <span>
            {site.institution} / {site.school}
          </span>
        </div>

        <div className={styles.heroHeading}>
          <h1 className={styles.heroTitle}>
            <span className={styles.revealLine}>
              <span>FORMS IN</span>
            </span>
            <span className={styles.revealLine}>
              <em>TRAJECTORY.</em>
            </span>
          </h1>
          <p className={styles.heroCopy}>
            An editorial study in organic geometry, geological structures, and
            natural momentum—captured through a continuous horizontal runway.
          </p>
        </div>
      </section>

      <GalleryControls
        activeIndex={activeIndex}
        totalCount={galleryImages.length}
      />

      <div className={styles.viewPanel}>
        <GalleryRunway
          images={galleryImages}
          onSelectImage={selectImage}
          onActiveIndexChange={setActiveIndex}
          registerCard={handleRegisterCard}
        />
      </div>

      <GalleryDetailModal
        image={selectedImage}
        originPoint={selectedPointRef.current}
        getTriggerElement={getTriggerElement}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={selectedIndex}
        totalCount={galleryImages.length}
      />
    </main>
  );
}
