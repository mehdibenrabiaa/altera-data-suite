"use client";

import { motion } from "framer-motion";
import styles from "./docs.module.css";

export default function VideoCta({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.a
      href="https://youtube.com/playlist?list=YOUR_PLAYLIST_ID"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.videoCta}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.videoPulseWrap}>
        <div className={styles.videoPulse} />
        <svg className={styles.videoIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: "#111", lineHeight: 1.4 }}>{title}</span>
        <span style={{ fontSize: 11.5, color: "#999" }}>{subtitle}</span>
      </div>
    </motion.a>
  );
}
