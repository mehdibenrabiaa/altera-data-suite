"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Flex } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SamePageLink from "./SamePageLink";
import Image from "next/image";
import styles from "./Navbar.module.css";

interface NavDict {
  docs: string;
  pricing: string;
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
            style={{ fontWeight: 600 }}
          >
            {t.startFree}
          </Button>
        </div>

        {/* Hamburger */}
        <Button
          className={styles.hamburger}
          type="text"
          icon={<MenuOutlined style={{ fontSize: 22 }} />}
          onClick={() => setDrawerOpen(true)}
          size="large"
        />
      </header>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        size="default"
        styles={{ header: { display: "none" }, body: { padding: "32px 24px" } }}
      >
        <Flex vertical gap={24}>
          <Button
            type="text"
            icon={<span style={{ fontSize: 20, lineHeight: 1 }}>✕</span>}
            onClick={() => setDrawerOpen(false)}
            style={{ alignSelf: "flex-end", color: "#444" }}
          />
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
            style={{ fontWeight: 600 }}
          >
            {t.startFree}
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}

export default Navbar;
