"use client";

import Image from "next/image";
import { useState } from "react";

interface AlphabetAvatarProps {
  name: string;
  initials: string;
  src?: string;
  variant?: "portrait" | "square";
  /** Corner metadata marker, e.g. "DCC-01". */
  refCode?: string;
  /** Department code shown top-right, e.g. "TECH". */
  deptCode?: string;
  /** Tenure shown bottom-left, e.g. "2025 — PRESENT". */
  tenure?: string;
}

/**
 * Editorial typography placeholder — a dark matte canvas with a huge
 * background monogram watermark and a hairline initials badge. Renders a
 * grayscale Next.js image when `src` is provided and falls back to the
 * placeholder if the image fails, without layout shift.
 */
export default function AlphabetAvatar({
  name,
  initials,
  src,
  variant = "portrait",
  refCode,
  deptCode,
  tenure,
}: AlphabetAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (variant === "square") {
    return (
      <div
        role="img"
        aria-label={`${name} — ${initials}`}
        className="group-hover:border-[#C04F2E] flex h-11 w-11 flex-none items-center justify-center border border-black/15 bg-[linear-gradient(160deg,#ECE9E3_0%,#E0DDD6_100%)] font-mono text-[13px] font-medium tracking-[0.12em] text-[#111111] transition-colors duration-300"
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Editorial portrait — ${name}`}
      className="portrait-veil relative aspect-[4/5] overflow-hidden bg-[linear-gradient(160deg,#ECE9E3_0%,#E4E1DA_58%,#DAD7D0_100%)]"
    >
      {src && !imageFailed ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover grayscale contrast-125"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-6 select-none font-mono text-[7.5rem] leading-none font-semibold text-[#111111] opacity-[0.05] sm:text-[9rem]"
          >
            {name.charAt(0)}
          </span>
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black/25 bg-white/60 px-4 py-3 font-mono text-lg font-medium tracking-[0.3em] indent-[0.3em] text-[#111111] transition-colors duration-300 group-hover:border-[#C04F2E]"
          >
            {initials}
          </span>
          {refCode ? (
            <span
              aria-hidden
              className="absolute top-3 left-3.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8A8A8A]"
            >
              REF. {refCode}
            </span>
          ) : null}
          {deptCode ? (
            <span
              aria-hidden
              className="absolute top-3 right-3.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8A8A8A]"
            >
              DEPT: {deptCode}
            </span>
          ) : null}
          {tenure ? (
            <span
              aria-hidden
              className="absolute bottom-3 left-3.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8A8A8A]"
            >
              {tenure}
            </span>
          ) : null}
          <span
            aria-hidden
            className="absolute right-3.5 bottom-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#B5B2AC]"
          >
            {"35MM // B&W"}
          </span>
        </>
      )}
    </div>
  );
}
