"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Shared.module.css";

export function SiteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname === "/") {
      try {
        sessionStorage.setItem("dcc-intro-seen", "1");
      } catch {}
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    try {
      if (reduced || sessionStorage.getItem("dcc-intro-seen")) return;
      sessionStorage.setItem("dcc-intro-seen", "1");
    } catch {
      if (reduced) return;
    }

    let frame = 0;
    const start = performance.now();
    const show = window.setTimeout(() => setVisible(true), 0);
    function tick(now: number) {
      const elapsed = now - start;
      setProgress(Math.min(100, Math.round((elapsed / 520) * 100)));
      if (elapsed < 520) frame = requestAnimationFrame(tick);
      else setComplete(true);
    }
    frame = requestAnimationFrame(tick);
    const cleanup = window.setTimeout(() => setVisible(false), 850);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(cleanup);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (!visible || pathname === "/") return null;
  return (
    <div
      className={`${styles.loader} ${complete ? styles.loaderComplete : ""}`}
      aria-hidden="true"
    >
      <div className={styles.loaderTop}>
        <span>DCC / INTRO</span>
        <span>BENNETT UNIVERSITY</span>
      </div>
      <div className={styles.loaderCenter}>
        DCC<span>.</span>
      </div>
      <div className={styles.loaderBottom}>
        <span>YOUR NEXT MOVE</span>
        <span>{String(progress).padStart(2, "0")} / 100</span>
      </div>
    </div>
  );
}
