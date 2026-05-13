"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Avatar, Button, Card, Input, Typography } from "antd";
import styles from "./ChatBot.module.css";

const { Text } = Typography;

type Message = { role: "bot" | "user"; text: string };

const WELCOME = "Hi! I'm Altera's assistant. Ask me anything about the app, its widgets, or how to get started.";
const FOLLOW_UP = "Here are some things I can help with:";

const QUICK_REPLIES = [
  "How does PDF Converter work?",
  "What widgets are available?",
  "Is there a free trial?",
];

const RESPONSES: Record<string, string> = {
  "How does PDF Converter work?":
    "Open your PDF, draw rectangles over the data you want to extract, optionally place column guides, then click Convert. You get a clean structured table ready for further processing.",
  "What widgets are available?":
    "Altera includes 9 widgets: PDF Converter, Filter Builder, Column Manager, Rows Slicer, Header Promoter, Multi Shift Columns, Regex Extractor, Remove Duplicates, and Cleaner.",
  "Is there a free trial?":
    "Yes! You can get started for free. Head to the Pricing page to see what's included in each plan.",
};

const FALLBACK = "Great question! For more details, check the Docs page or reach out to our team directly.";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: WELCOME }]);
  const [typing, setTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [input, setInput] = useState("");
  const hasAutoPlayed = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* Auto-play once on first open */
  useEffect(() => {
    if (!open || hasAutoPlayed.current) return;
    hasAutoPlayed.current = true;
    const t1 = setTimeout(() => setTyping(true), 900);
    const t2 = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: FOLLOW_UP }]);
      setShowQuickReplies(true);
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [open]);

  /* Scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setShowQuickReplies(false);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: RESPONSES[text] ?? FALLBACK }]);
    }, 1400);
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
            <Card
              variant="borderless"
              className={styles.panel}
              title={
                <div className={styles.cardHeader}>
                  <Avatar
                    src="/SVG/digibot.svg"
                    style={{ background: "rgba(255,255,255,0.22)", flexShrink: 0 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Text strong style={{ color: "#fff", fontSize: 14, lineHeight: 1.2 }}>
                      Altera Assistant
                    </Text>
                    <Text style={{ color: "rgba(255,255,255,0.72)", fontSize: 11.5, lineHeight: 1.2 }}>
                      Ask me anything
                    </Text>
                  </div>
                </div>
              }
              extra={
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setOpen(false)}
                  style={{ color: "rgba(255,255,255,0.85)" }}
                />
              }
              styles={{
                header: {
                  background: "linear-gradient(135deg, #ff5d02 0%, #ff7a30 100%)",
                  borderBottom: "none",
                  padding: "14px 16px",
                },
                body: { padding: 0, display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" },
              }}
            >
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
                      {msg.role === "bot" && (
                        <Avatar size={28} src="/SVG/digibot.svg" style={{ background: "#ff5d02", flexShrink: 0 }} />
                      )}
                      <div className={msg.role === "user" ? styles.userBubble : styles.bubble}>
                        <Text style={{ fontSize: 13.5, color: msg.role === "user" ? "#fff" : "#333" }}>
                          {msg.text}
                        </Text>
                      </div>
                    </motion.div>
                  ))}

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
                      <Avatar size={28} src="/SVG/digibot.svg" style={{ background: "#ff5d02", flexShrink: 0 }} />
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
                      {QUICK_REPLIES.map((q) => (
                        <Button
                          key={q}
                          size="small"
                          onClick={() => send(q)}
                          style={{ borderRadius: 999, fontSize: 12, height: "auto", padding: "5px 12px", whiteSpace: "normal", textAlign: "left" }}
                        >
                          {q}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className={styles.inputArea}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPressEnter={() => send(input)}
                  placeholder="Ask a question…"
                  variant="borderless"
                  style={{ flex: 1, fontSize: 13.5 }}
                  suffix={
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      size="small"
                      onClick={() => send(input)}
                      style={{ background: "#ff5d02", border: "none", borderRadius: 6 }}
                    />
                  }
                />
              </div>
            </Card>
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
          <Image src="/SVG/digibot.svg" alt="bot" width={28} height={28} className={styles.triggerIcon} />
        </div>
        <div className={styles.triggerText}>
          <Text strong style={{ fontSize: 13, color: "#111", lineHeight: 1.2 }}>Ask Altera</Text>
          <Text style={{ fontSize: 11.5, color: "#999", lineHeight: 1.2 }}>AI-powered assistant</Text>
        </div>
      </motion.button>
    </div>
  );
}
