"use client";

import type { CSSProperties, MouseEvent, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";
import styles from "./Button.module.css";

// Site pages navigate client-side (no full reload), same as the navbar's
// text links (SamePageLink). Everything else stays a plain <a>: external
// URLs, new-tab links, and /api/ routes -- e.g. /api/download/windows
// redirects to the installer file, which client navigation can't follow.
function isInternalPage(href: string, target?: string): boolean {
  return href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/") && !target;
}

interface ButtonProps {
  type?: "primary" | "default" | "text";
  size?: "large" | "middle" | "small";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "button" | "submit";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

// Replaces antd's <Button> -- the one real shared primitive in this
// antd-removal pass, since type/size/href-vs-onClick/icon/loading repeat
// near-identically across ~10 files. Every call site still supplies its
// own style={{...}} for anything custom, same as it did with antd's
// Button -- this only owns the type/size scale + loading-spinner swap.
export default function Button({
  type = "default",
  size = "middle",
  href,
  target,
  rel,
  onClick,
  icon,
  loading = false,
  disabled = false,
  htmlType = "button",
  className,
  style,
  children,
}: ButtonProps) {
  const pathname = usePathname();
  const { replay, startProgress } = usePageTransition();
  const classes = [styles.btn, styles[type], styles[size], className].filter(Boolean).join(" ");
  const isDisabled = disabled || loading;
  const content = (
    <>
      {loading ? <span className={styles.spinner} /> : icon}
      {children}
    </>
  );

  // Matches antd's own behavior: an href'd Button with disabled/loading
  // renders as a non-interactive element (no navigation), not a disabled
  // <a> (which can't actually be disabled in HTML).
  if (href && !isDisabled && isInternalPage(href, target)) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (pathname === href) {
        e.preventDefault();
        replay();
      } else {
        startProgress();
      }
    };
    return (
      <Link href={href} rel={rel} onClick={handleClick} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  if (href && !isDisabled) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      style={style}
    >
      {content}
    </button>
  );
}
