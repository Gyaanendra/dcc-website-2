"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FAQItem } from "./types";

const STEP_MS = 700;
const INITIAL_DELAY_MS = 400;

/**
 * Chat-style sequenced FAQ (animation type 2): inquiry rows transmit in
 * mono on the left, the DCC desk answers in serif on the right. The
 * sequence auto-plays once when scrolled into view; the replay control
 * re-runs it on demand.
 */
export default function SequentialFAQ({ items }: { items: FAQItem[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasPlayedRef = useRef(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const totalRows = items.length * 2;

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) {
      clearTimeout(timer);
    }
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setRevealedCount(0);
    for (let index = 0; index < totalRows; index += 1) {
      timersRef.current.push(
        setTimeout(
          () => setRevealedCount(index + 1),
          INITIAL_DELAY_MS + index * STEP_MS,
        ),
      );
    }
  }, [clearTimers, totalRows]);

  useEffect(() => {
    const wrapElement = wrapRef.current;
    if (!wrapElement) {
      return;
    }
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (prefersReducedMotion) {
            setRevealedCount(totalRows);
          } else if (!hasPlayedRef.current) {
            hasPlayedRef.current = true;
            play();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(wrapElement);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [clearTimers, play, totalRows]);

  return (
    <div className="mx-auto max-w-[880px] px-6 pt-2 pb-6 sm:px-8">
      <div ref={wrapRef} aria-live="polite">
        {items.flatMap((item, itemIndex) => {
          const questionIndex = itemIndex * 2;
          const answerIndex = questionIndex + 1;
          const questionNumber = String(itemIndex + 1).padStart(2, "0");
          return [
            <div
              key={`${item.id}-q`}
              className={`flex justify-start chat-row${questionIndex < revealedCount ? " is-in" : ""}`}
            >
              <div className="max-w-[78%] border border-black/15 bg-white px-5 py-4">
                <p className="mb-2 font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#8A8A8A]">
                  [ Q.{questionNumber} ]{" "}
                  <span className="text-[#C04F2E]">{"//"}</span> {item.category}
                </p>
                <p className="font-mono text-[13px] leading-relaxed tracking-[0.02em] text-[#111111]">
                  &gt; {item.question}
                </p>
              </div>
            </div>,
            <div
              key={`${item.id}-a`}
              className={`flex justify-end chat-row${answerIndex < revealedCount ? " is-in" : ""}`}
            >
              <div className="max-w-[78%] border border-black/15 bg-[#ECEAE3] px-5 py-4">
                <p className="mb-2 font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#8A8A8A]">
                  [ A.{questionNumber} ]{" "}
                  <span className="text-[#C04F2E]">{"//"}</span> DCC DESK
                </p>
                <p className="font-serif text-[17px] leading-relaxed text-[#555555] italic">
                  {item.answer}
                </p>
              </div>
            </div>,
          ];
        })}
      </div>
      <p className="pt-2 pb-10 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-[#A8A5A0]">
        — END OF TRANSMISSION ·{" "}
        <button
          type="button"
          onClick={play}
          className="text-[#777777] underline decoration-black/30 underline-offset-4 transition-colors duration-300 hover:text-[#C04F2E] hover:decoration-[#C04F2E]/60"
        >
          REPLAY
        </button>{" "}
        —
      </p>
    </div>
  );
}
