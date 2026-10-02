"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import styles from "./Shared.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const light = pathname === "/" && !open;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a, button"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${light ? styles.headerLight : ""}`}>
      <div className={styles.headerInner}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Dean Career Cloud home"
          onClick={() => setOpen(false)}
        >
          <Image
            src={light ? "/media/dcc-black.png" : "/media/dcc-white.png"}
            alt=""
            width={72}
            height={50}
            priority
          />
          <span>
            DEAN
            <br />
            CAREER CLOUD
          </span>
        </Link>
        <span className={styles.headerContext}>
          {site.institution} <i>/</i> {site.school}
        </span>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          ref={triggerRef}
          className={styles.menuTrigger}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "CLOSE" : "MENU"}</span>
          <span className={styles.menuGlyph} aria-hidden="true">
            {open ? "×" : "+"}
          </span>
        </button>
      </div>
      {open && (
        <div
          className={styles.menuOverlay}
          id="site-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className={styles.menuTopline}>
            <span>DCC / NAVIGATION</span>
            <span>{site.year}</span>
          </div>
          <nav aria-label="Full navigation" className={styles.menuNav}>
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuIndex}>0{index + 1}</span>
                <span>{item.label}</span>
                <span className={styles.menuArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
          <div className={styles.menuBottom}>
            PREPARE <span>→</span> CONNECT <span>→</span> MOVE
          </div>
        </div>
      )}
    </header>
  );
}
