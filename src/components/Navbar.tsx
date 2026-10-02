"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/icons";
import SamePageLink from "./SamePageLink";
import Image from "next/image";
import styles from "./Navbar.module.css";

interface NavDict {
  docs: string;
  pricing: string;
  download: string;
  about: string;
  faqs: string;
  startFree: string;
}

interface Props {
  t: NavDict;
  lang: string;
}

function Navbar({ t, lang }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navLinks = [
    { label: t.docs, href: `/${lang}/docs` },
    { label: t.pricing, href: `/${lang}/pricing` },
    { label: t.download, href: `/${lang}/download` },
    { label: t.about, href: `/${lang}/about` },
    { label: t.faqs, href: `/${lang}/faqs` },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 64) setHidden(y > lastY.current);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Replaces antd Drawer's own keyboard(ESC-to-close)/body-scroll-lock
  // defaults -- only wired up while the drawer is actually open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen]);

  return (
    <>
      <div style={{ height: 64, flexShrink: 0 }} />

      <header
        className={styles.header}
        style={{
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
          borderBottom: scrolled
            ? "1px solid transparent"
            : "1px solid rgba(0,0,0,0.07)",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Logo */}
        <SamePageLink href={`/${lang}`} className={styles.logo}>
          <Image
            src="/Altera_logo.svg"
            alt="Altera Data Suite"
            width={32}
            height={32}
            style={{ height: 32, width: "auto" }}
            priority
            unoptimized
          />
        </SamePageLink>

        {/* Nav links */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <SamePageLink href={href} className={styles.navLink}>
                  {label}
                </SamePageLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className={styles.desktopCta}>
          <Button
            type="primary"
            size="large"
            href={`/${lang}/pricing`}
            style={{ fontWeight: 600, borderRadius: 0 }}
          >
            {t.startFree}
          </Button>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon size={22} />
        </button>
      </header>

      {/* Mobile drawer -- replaces antd's Drawer. ESC-to-close and the
          body-scroll-lock are wired up in the effect above; this handles
          backdrop-click-to-close and the slide transition. */}
      <div
        className={`${styles.drawerBackdrop} ${drawerOpen ? styles.drawerBackdropOpen : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />
      <div
        className={`${styles.drawerPanel} ${drawerOpen ? styles.drawerPanelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className={styles.drawerClose}
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          <CloseIcon size={18} />
        </button>
        {navLinks.map(({ label, href }) => (
          <SamePageLink
            key={href}
            href={href}
            onClick={() => setDrawerOpen(false)}
            style={{
              color: "#444",
              fontSize: 16,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {label}
          </SamePageLink>
        ))}
        <Button
          type="primary"
          size="large"
          href={`/${lang}/pricing`}
          style={{ fontWeight: 600, borderRadius: 0 }}
        >
          {t.startFree}
        </Button>
      </div>
    </>
  );
}

export default Navbar;
