"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

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
