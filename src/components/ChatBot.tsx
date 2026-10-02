"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, RobotIcon, SendIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import styles from "./ChatBot.module.css";
import { COLOR_PRIMARY, COLOR_PRIMARY_LIGHT, COLOR_TEXT_MUTED } from "@/lib/theme";

type Message = { role: "bot" | "user"; text: string };

// Replaces antd's <Avatar icon={<RobotOutlined/>}> -- used at two sizes
// (the panel header's default ~32px, and 28px on every message bubble).
function BotAvatar({ size = 28, background }: { size?: number; background: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      <RobotIcon size={Math.round(size * 0.6)} />
    </div>
  );
}

interface QuickReply {
  question: string;
  answer: string;
}

interface ChatBotT {
  triggerTitle: string;
  triggerSubtitle: string;
  panelTitle: string;
  panelSubtitle: string;
  placeholder: string;
  welcome: string;
  followUp: string;
  fallback: string;
  quickReplies: QuickReply[];
}

interface Props {
  t?: ChatBotT;
}

const DEFAULT_T: ChatBotT = {
  triggerTitle:    "Ask Altera",
  triggerSubtitle: "Here to help",
  panelTitle:      "Altera Assistant",
  panelSubtitle:   "Ask me anything",
  placeholder:     "Ask a question…",
  welcome:         "Hi! I'm Altera's assistant. Ask me anything about the app, its nodes, or how to get started.",
  followUp:        "Here are some things I can help with:",
  fallback:        "Great question! For more details, check the Docs page or reach out to our team directly.",
  quickReplies: [
    { question: "How does PDF Converter work?",  answer: "Open your PDF, draw rectangles over the data you want to extract, optionally place column guides, then click Convert. You get a clean structured table ready for further processing." },
    { question: "What nodes are available?",   answer: "Altera includes 9 nodes: PDF Converter, Filter Builder, Column Manager, Rows Slicer, Header Promoter, Multi Shift Columns, Regex Extractor, Remove Duplicates, and Cleaner." },
    { question: "How does pricing work?",        answer: "Choose Monthly, Yearly, or Lifetime. Head to the Pricing page for full details." },
  ],
};

export default function ChatBot({ t = DEFAULT_T }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: t.welcome }]);
  const [typing, setTyping] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [input, setInput] = useState("");
  const hasAutoPlayed = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => () => { if (streamRef.current) clearInterval(streamRef.current); }, []);

  useEffect(() => {
    if (!sessionIdRef.current) {
      const stored = sessionStorage.getItem("altera_chat_sid");
      if (stored) {
        sessionIdRef.current = stored;
      } else {
        const id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        sessionStorage.setItem("altera_chat_sid", id);
        sessionIdRef.current = id;
      }
    }
  }, []);

  useEffect(() => {
    if (!open || hasAutoPlayed.current) return;
    hasAutoPlayed.current = true;
    const t1 = setTimeout(() => setTyping(true), 900);
    const t2 = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: t.followUp }]);
      setShowQuickReplies(true);
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [open, t.followUp]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (streamingText !== null) bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [streamingText]);

  const animateResponse = (text: string, onDone: () => void) => {
    if (streamRef.current) clearInterval(streamRef.current);
    let i = 0;
    setStreamingText("");
    streamRef.current = setInterval(() => {
      i++;
      setStreamingText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(streamRef.current!);
        streamRef.current = null;
        onDone();
      }
    }, 14);
  };

  const send = async (text: string) => {
    if (!text.trim() || typing || streamingText !== null) return;
    setShowQuickReplies(false);
    setInput("");

    // Capture history before updating state
    const history = messages.map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, session_id: sessionIdRef.current, user_agent: navigator.userAgent }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTyping(false);
      animateResponse(data.reply, () => {
        setStreamingText(null);
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      });
    } catch {
      setTyping(false);
      animateResponse(t.fallback, () => {
        setStreamingText(null);
        setMessages((prev) => [...prev, { role: "bot", text: t.fallback }]);
      });
    }
  };

  return (
    <div className={styles.root}>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panelWrap}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className={styles.panel}>
              <div
                className={styles.panelHeader}
                style={{ background: `linear-gradient(135deg, ${COLOR_PRIMARY} 0%, ${COLOR_PRIMARY_LIGHT} 100%)` }}
              >
                <div className={styles.cardHeader}>
                  <BotAvatar background="rgba(255,255,255,0.22)" size={32} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <span style={{ fontWeight: 600, color: "#fff", fontSize: 14, lineHeight: 1.2 }}>
                      {t.panelTitle}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.72)", fontSize: 11.5, lineHeight: 1.2 }}>
                      {t.panelSubtitle}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <CloseIcon size={14} />
                </button>
              </div>

              <div className={styles.panelBody}>
              {/* Messages */}
              <div className={styles.messages}>
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={msg.role === "user" ? styles.userRow : styles.botRow}
                    >
                      {msg.role === "bot" && <BotAvatar background={COLOR_PRIMARY} />}
                      <div className={msg.role === "user" ? styles.userBubble : styles.bubble}>
                        <span className={styles.msgText} style={{ color: msg.role === "user" ? "#fff" : "#333" }}>
                          {msg.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Streaming / typewriter response */}
                  {streamingText !== null && (
                    <motion.div
                      key="streaming"
                      className={styles.botRow}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <BotAvatar background={COLOR_PRIMARY} />
                      <div className={styles.bubble}>
                        <span className={styles.msgText} style={{ color: "#333" }}>
                          {streamingText}
                          <span className={styles.cursor} />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Typing indicator */}
                  {typing && (
                    <motion.div
                      key="typing"
                      className={styles.botRow}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <BotAvatar background={COLOR_PRIMARY} />
                      <div className={styles.bubble}>
                        <div className={styles.typingDots}>
                          <span className={styles.dot} />
                          <span className={styles.dot} />
                          <span className={styles.dot} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick reply chips */}
                  {showQuickReplies && !typing && (
                    <motion.div
                      key="chips"
                      className={styles.chips}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {t.quickReplies.map((qr) => (
                        <Button
                          key={qr.question}
                          size="small"
                          onClick={() => send(qr.question)}
                          style={{ borderRadius: 4, fontSize: 12, height: "auto", padding: "5px 12px", whiteSpace: "normal", textAlign: "left" }}
                        >
                          {qr.question}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className={styles.inputArea}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send(input);
                  }}
                  placeholder={t.placeholder}
                  className={styles.inputField}
                  style={{ flex: 1, fontSize: 16 }}
                />
                <Button
                  type="primary"
                  icon={<SendIcon size={14} />}
                  size="small"
                  onClick={() => send(input)}
                  style={{ background: COLOR_PRIMARY, border: "none", borderRadius: 4, padding: "0 10px" }}
                />
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.triggerIconWrap}>
          <div className={styles.triggerPulse} />
          <RobotIcon className={styles.triggerIcon} size={26} />
        </div>
        <div className={styles.triggerText}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#111", lineHeight: 1.2 }}>{t.triggerTitle}</span>
          <span style={{ fontSize: 11.5, color: COLOR_TEXT_MUTED, lineHeight: 1.2 }}>{t.triggerSubtitle}</span>
        </div>
      </motion.button>
    </div>
  );
}
