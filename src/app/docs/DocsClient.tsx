"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { LeftIcon, RightIcon, InfoIcon, WarningIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./docs.module.css";
import { WIDGET_DOCS } from "@/data/widgetDocs";

// Lets cards elsewhere on the site (e.g. the homepage's node grid) deep-link
// straight to a specific node's docs via ?node=<id> -- read the same way
// DownloadCards reads the client-only OS: null on the server (matches the
// default-tab first render, no hydration mismatch), the real id right after.
function getNodeIdFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get("node");
  return WIDGET_DOCS.some((w) => w.id === id) ? id : null;
}
const noopSubscribe = () => () => {};
const serverSnapshot = () => null;
function useUrlNodeId(): string | null {
  return useSyncExternalStore(noopSubscribe, getNodeIdFromUrl, serverSnapshot);
}

interface DocsShortcuts {
  toggleHand: string;
  toggleSelection: string;
  toggleGuide: string;
  convert: string;
  openPdf: string;
  zoomIn: string;
  zoomOut: string;
  fitPage: string;
  scrollZoomIn: string;
  scrollZoomOut: string;
}

interface DocsT {
  overview: string;
  bestFor: string;
  howToUse: string;
  input: string;
  output: string;
  tipsNotes: string;
  toolbarRef: string;
  keyboardShortcuts: string;
  watchTutorials: string;
  viewPlaylist: string;
  handTool: string;
  handToolDesc: string;
  selectionTool: string;
  selectionToolDesc: string;
  pageNav: string;
  pageNavDesc: string;
  shortcuts: DocsShortcuts;
}

interface Props {
  t?: DocsT;
}

const DEFAULT_T: DocsT = {
  overview: "Overview",
  bestFor: "Best For",
  howToUse: "How to Use",
  input: "Input",
  output: "Output",
  tipsNotes: "Tips & Notes",
  toolbarRef: "Toolbar Reference",
  keyboardShortcuts: "Keyboard Shortcuts",
  watchTutorials: "Watch Video Tutorials",
  viewPlaylist: "View playlist on YouTube",
  handTool: "Hand Tool",
  handToolDesc: "When toggled — click and drag anywhere on the canvas to pan across the document.",
  selectionTool: "Selection Tool",
  selectionToolDesc: "Click an existing annotation to select, reposition, or resize it.",
  pageNav: "Page Navigation",
  pageNavDesc: "Step through pages. The input shows your current page out of the total — you can also type a page number directly.",
  shortcuts: {
    toggleHand: "Toggle Hand tool",
    toggleSelection: "Toggle Selection tool",
    toggleGuide: "Toggle Guide tool (column delimiter)",
    convert: "Convert",
    openPdf: "Open PDF",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fitPage: "Fit page to window",
    scrollZoomIn: "Zoom in",
    scrollZoomOut: "Zoom out",
  },
};

export default function DocsClient({ t = DEFAULT_T }: Props) {
  const urlNodeId = useUrlNodeId();
  const [manualId, setManualId] = useState<string | null>(null);
  const activeId = manualId ?? urlNodeId ?? WIDGET_DOCS[0].id;
  const setActiveId = setManualId;
  const active = WIDGET_DOCS.find((w) => w.id === activeId)!;
  const activeIndex = WIDGET_DOCS.findIndex((w) => w.id === activeId);
  const prevWidget = activeIndex > 0 ? WIDGET_DOCS[activeIndex - 1] : null;
  const nextWidget =
    activeIndex < WIDGET_DOCS.length - 1 ? WIDGET_DOCS[activeIndex + 1] : null;

  const navigateTo = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SHORTCUT_ROWS = [
    { keys: ["H"],             desc: t.shortcuts.toggleHand },
    { keys: ["V"],             desc: t.shortcuts.toggleSelection },
    { keys: ["G"],             desc: t.shortcuts.toggleGuide },
    { keys: ["Ctrl", "↵ Enter"], desc: t.shortcuts.convert },
    { keys: ["Ctrl", "O"],    desc: t.shortcuts.openPdf },
    { keys: ["Ctrl", "+"],    desc: t.shortcuts.zoomIn },
    { keys: ["Ctrl", "−"],    desc: t.shortcuts.zoomOut },
    { keys: ["Ctrl", "0"],    desc: t.shortcuts.fitPage },
    { keys: ["Ctrl", "Scroll ↑"], desc: t.shortcuts.scrollZoomIn },
    { keys: ["Ctrl", "Scroll ↓"], desc: t.shortcuts.scrollZoomOut },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul className={styles.menuList}>
          {WIDGET_DOCS.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                className={`${styles.menuItem} ${activeId === w.id ? styles.menuItemActive : ""}`}
                onClick={() => setActiveId(w.id)}
              >
                {w.svgIcon ? (
                  <span
                    className={styles.nodeIconTile}
                    style={{ width: 22, height: 22, background: w.color }}
                  >
                    <Image src={`/widgets_icons/${w.svgIcon}`} alt="" width={13} height={13} />
                  </span>
                ) : (
                  <span style={{ fontSize: 16 }}>{w.icon}</span>
                )}
                {w.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Widget header */}
            <div className={styles.widgetHeader}>
              <div className={styles.widgetIconWrap} style={{ background: active.color }}>
                {active.svgIcon ? (
                  <Image
                    src={`/widgets_icons/${active.svgIcon}`}
                    alt={active.name}
                    width={44}
                    height={44}
                  />
                ) : (
                  <span style={{ fontSize: 36 }}>{active.icon}</span>
                )}
              </div>
              <div className={styles.widgetMeta}>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}>
                  {active.name}
                </h2>
                <span style={{ fontSize: 15, color: "#666" }}>
                  {active.tagline}
                </span>
              </div>
            </div>

            <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #f0f0f0" }} />

            <div className={styles.sections}>
              {/* Overview */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>{t.overview}</div>
                <p style={{ fontSize: 14.5, color: "#444", lineHeight: 1.78, margin: 0 }}>
                  {active.description}
                </p>
              </div>

              {/* Best For */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>{t.bestFor}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {active.useCases.map((uc) => (
                    <span key={uc} style={{ fontSize: 14.5, color: "#444" }}>
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>{t.howToUse}</div>
                <div className={styles.stepsList}>
                  {active.steps.map((step, i) => (
                    <div key={i} className={styles.stepItem}>
                      <span className={styles.stepDot}>{i + 1}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                        {step.icon && (
                          <Image
                            src={`/widgets_icons/${step.icon}`}
                            alt=""
                            width={18}
                            height={18}
                            style={{ display: "block", flexShrink: 0 }}
                          />
                        )}
                        <span style={{ fontWeight: 600, fontSize: 14.5 }}>{step.title}</span>
                      </div>
                      <span style={{ fontSize: 13.5, color: "#666" }}>{step.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className={styles.card}>
                <div className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {t.input}
                  <span className={styles.tag}>{active.inputType}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {active.inputNotes.map((note, i) => (
                    <span key={i} style={{ fontSize: 14, color: "#555" }}>
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Output */}
              <div className={styles.card}>
                <div className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {t.output}
                  <span className={styles.tag}>{active.outputType}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {active.outputNotes.map((note, i) => (
                    <span key={i} style={{ fontSize: 14, color: "#555" }}>
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toolbar Reference & Keyboard Shortcuts — PDF Converter only */}
              {active.id === "pdf_converter" && (
                <>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>{t.toolbarRef}</div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Hand Tool */}
                      <div className={styles.toolRow}>
                        <div className={styles.toolIconWrap}>
                          <Image
                            src="/widgets_icons/hand.svg"
                            alt="Hand tool"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>
                            {t.handTool}
                          </span>
                          <span style={{ fontSize: 13.5, color: "#666" }}>
                            {t.handToolDesc}
                          </span>
                        </div>
                      </div>

                      <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #f0f0f0" }} />

                      {/* Selection Tool */}
                      <div className={styles.toolRow}>
                        <div className={styles.toolIconWrap}>
                          <Image
                            src="/widgets_icons/selection-tool.svg"
                            alt="Selection tool"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>
                            {t.selectionTool}
                          </span>
                          <span style={{ fontSize: 13.5, color: "#666" }}>
                            {t.selectionToolDesc}
                          </span>
                        </div>
                      </div>

                      <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #f0f0f0" }} />

                      {/* Page Navigation */}
                      <div className={styles.toolRow}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                          <div className={styles.navBtn}>
                            <Image
                              src="/widgets_icons/previous-page.svg"
                              alt="Previous page"
                              width={18}
                              height={18}
                            />
                          </div>
                          <input readOnly value="1 / 229" className={styles.pageInput} />
                          <div className={styles.navBtn}>
                            <Image
                              src="/widgets_icons/next-page.svg"
                              alt="Next page"
                              width={18}
                              height={18}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>
                            {t.pageNav}
                          </span>
                          <span style={{ fontSize: 13.5, color: "#666" }}>
                            {t.pageNavDesc}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Shortcuts */}
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>{t.keyboardShortcuts}</div>
                    <div className={styles.shortcutsGrid}>
                      {SHORTCUT_ROWS.map(({ keys, desc }, i) => (
                        <div key={i} className={styles.shortcutRow}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {keys.map((k, j) => (
                              <span key={j} className={styles.kbd}>
                                {k}
                              </span>
                            ))}
                          </div>
                          <span style={{ fontSize: 13.5, color: "#555" }}>
                            {desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Tips */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>{t.tipsNotes}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {active.tips.map((tip, i) => (
                    <div
                      key={i}
                      className={`${styles.alertBox} ${tip.type === "warning" ? styles.alertWarning : styles.alertInfo}`}
                    >
                      <span className={styles.alertIcon}>
                        {tip.type === "warning" ? <WarningIcon size={15} /> : <InfoIcon size={15} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tip.title}</div>
                        <div style={{ fontSize: 13.5 }}>{tip.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prev / Next navigation */}
            {(prevWidget || nextWidget) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 40,
                  paddingTop: 24,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  {prevWidget && (
                    <button
                      type="button"
                      className={styles.widgetNavBtn}
                      onClick={() => navigateTo(prevWidget.id)}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <LeftIcon />
                        {prevWidget.svgIcon ? (
                          <span
                            className={styles.nodeIconTile}
                            style={{ width: 26, height: 26, background: prevWidget.color }}
                          >
                            <Image src={`/widgets_icons/${prevWidget.svgIcon}`} alt="" width={16} height={16} />
                          </span>
                        ) : (
                          <span>{prevWidget.icon}</span>
                        )}
                        {prevWidget.name}
                      </span>
                    </button>
                  )}
                  {nextWidget && (
                    <button
                      type="button"
                      className={styles.widgetNavBtn}
                      onClick={() => navigateTo(nextWidget.id)}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        {nextWidget.name}
                        {nextWidget.svgIcon ? (
                          <span
                            className={styles.nodeIconTile}
                            style={{ width: 26, height: 26, background: nextWidget.color }}
                          >
                            <Image src={`/widgets_icons/${nextWidget.svgIcon}`} alt="" width={16} height={16} />
                          </span>
                        ) : (
                          <span>{nextWidget.icon}</span>
                        )}
                        <RightIcon />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed video CTA */}
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
          <svg
            className={styles.videoIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#111", lineHeight: 1.4 }}>
            {t.watchTutorials}
          </span>
          <span style={{ fontSize: 11.5, color: "#999" }}>
            {t.viewPlaylist}
          </span>
        </div>
      </motion.a>
    </div>
  );
}
