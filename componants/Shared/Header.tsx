"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Affiliation, Tag } from "@/componants/Shared/Separators";
import { navigation, site } from "@/content/site";
import { resolveMediaUrl } from "@/lib/cloudinary";
import styles from "./Shared.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(pathname !== "/");
  const light =
    (pathname === "/" || pathname === "/teams" || pathname === "/gallery") &&
    !open &&
    !scrolled;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    function updateHeader() {
      const nextY = window.scrollY;
      const waitingForLetters =
        pathname === "/" &&
        !document.querySelector('[data-letter-intro="complete"]');
      const keyboardFocusInHeader =
        document.activeElement instanceof Element &&
        document.activeElement.matches(":focus-visible") &&
        document.activeElement.closest("header");
      setScrolled(nextY > 48);

      if (open || keyboardFocusInHeader) {
        setVisible(true);
      } else if (waitingForLetters) {
        setVisible(false);
      } else if (nextY <= 4) {
        setVisible(true);
      } else if (nextY < previousY) {
        setVisible(true);
      } else if (nextY > previousY) {
        setVisible(false);
      }

      previousY = nextY;
      frame = 0;
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    }

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open, pathname]);

  useEffect(() => {
    setVisible(
      window.scrollY <= 4 &&
        (pathname !== "/" ||
          Boolean(document.querySelector('[data-letter-intro="complete"]'))),
    );
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const revealAfterLetters = () => setVisible(true);
    window.addEventListener("dcc:letters-complete", revealAfterLetters);
    if (document.querySelector('[data-letter-intro="complete"]')) {
      revealAfterLetters();
    }
    return () =>
      window.removeEventListener("dcc:letters-complete", revealAfterLetters);
  }, [pathname]);

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
    <header
      className={`${styles.header} ${light ? styles.headerLight : ""} ${
        open ? styles.headerOpen : ""
      } ${scrolled ? styles.headerScrolled : ""} ${
        !visible && !open ? styles.headerHidden : ""
      }`}
      onFocusCapture={() => setVisible(true)}
    >
      <div className={styles.headerInner}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Dean Career Cloud home"
          onClick={() => setOpen(false)}
        >
          <Image
            src={
              light
                ? resolveMediaUrl("/media/dcc-black.png")
                : resolveMediaUrl("/media/dcc-white.png")
            }
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
          <Affiliation institution={site.institution} school={site.school} />
        </span>
        <nav
          className={`${styles.desktopNav} ${open ? styles.desktopNavHidden : ""}`}
          aria-label="Primary navigation"
          aria-hidden={open}
        >
          {navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              tabIndex={open ? -1 : undefined}
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
          onClick={() => {
            setVisible(true);
            setOpen((value) => !value);
          }}
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
            <span>
              <Tag category="DCC" label="NAVIGATION" />
            </span>
            <span>
              0{navigation.length} PAGES / {site.year}
            </span>
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
