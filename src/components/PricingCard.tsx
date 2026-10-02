"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COLOR_PRIMARY, COLOR_TEXT_MUTED } from "@/lib/theme";
import styles from "./PricingCard.module.css";
import { CheckCircleFilledIcon, StarFilledIcon, RightIcon } from "@/components/icons";

interface PricingCardProps {
  title: string;
  price?: number;
  period?: string;
  subtitle?: string;
  features: string[];
  btnLabel?: string;
  badge?: string;
  color?: string;
  freeLabel?: string;
  includesLabel?: string;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
}

export default function PricingCard({
  title,
  price,
  period = "/year",
  subtitle,
  features,
  btnLabel = "Subscribe Now",
  badge,
  color = COLOR_PRIMARY,
  freeLabel = "Free",
  includesLabel = "Includes",
  href,
  onClick,
  loading = false,
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article style={{ flex: "1 1 220px", maxWidth: 300, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          // Matches the app's own flat button/card radius (App.css's
          // .filter-builder-btn-primary etc.) -- was 25px, wildly out of
          // step with the rest of the site's now-flattened chrome. Bottom
          // corners flattened to 0 so the card sits flush against the
          // Button below it (which has square top corners already) instead
          // of showing a rounded nub poking out above the button's flat top.
          borderRadius: "4px 4px 0 0",
          border: "1px solid #d2d2d2",
          background: "#fff",
          padding: 24,
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 0px 8px",
          position: "relative",
          zIndex: 2,
          marginBottom: -20,
          flex: 1,
        }}
      >
        {/* top section grows to push the divider to the same level across all cards */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#000" }}>
              {title}
            </span>

            {badge && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "transparent",
                  color,
                  border: "1px solid #d9d9d9",
                  padding: "2px 10px",
                }}
              >
                <StarFilledIcon size={11} /> {badge}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", padding: "15px 0", paddingBottom: 0, overflow: "hidden" }}>
            {price !== undefined ? (
              price === 0 ? (
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "#000",
                  }}
                >
                  {freeLabel}
                </span>
              ) : (
              <>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      fontSize: 40,
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "#000",
                      display: "inline-block",
                    }}
                  >
                    ${price}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={period}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ display: "inline-block" }}
                  >
                    <span style={{ fontWeight: 600 }}>{period}</span>
                  </motion.span>
                </AnimatePresence>
              </>
              )
            ) : null}
          </div>

          {subtitle && (
            <span style={{ display: "block", marginTop: 10, fontSize: 12, fontWeight: 500, color: COLOR_TEXT_MUTED }}>
              {subtitle}
            </span>
          )}
        </div>

        <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #e8e8e8" }} />

        <span style={{ display: "block", marginBottom: 10, fontWeight: 600 }}>
          {includesLabel}
        </span>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {features.map((item) => (
            <li key={item}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircleFilledIcon size={13} style={{ color }} />
                <span style={{ fontSize: 14, color: COLOR_TEXT_MUTED }}>{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {(() => {
        const btnStyle: React.CSSProperties = {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          background: color,
          color: "#fff",
          height: 68,
          paddingTop: 20,
          // Flat top (flush against the card above), matching the card's
          // own new radius on the bottom corners.
          borderRadius: "0 0 4px 4px",
          border: "none",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          opacity: hovered ? 0.85 : 1,
          transition: "opacity 0.2s",
        };
        const hoverHandlers = {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        };
        // Matches antd Button's own href+disabled behavior: an href'd
        // button that's actually disabled (loading) renders as a plain
        // <button> instead, since an <a> has no real disabled state.
        if (href && !loading) {
          return (
            <a href={href} className={styles.btn} style={btnStyle} {...hoverHandlers}>
              {btnLabel} <RightIcon />
            </a>
          );
        }
        return (
          <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className={styles.btn}
            style={btnStyle}
            {...hoverHandlers}
          >
            {loading ? "Opening checkout…" : <>{btnLabel} <RightIcon /></>}
          </button>
        );
      })()}
    </article>
  );
}
