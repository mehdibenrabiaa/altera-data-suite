"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseOutlined, RobotOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Input, Typography } from "antd";
import styles from "./ChatBot.module.css";
import { COLOR_PRIMARY, COLOR_PRIMARY_LIGHT, COLOR_TEXT_MUTED } from "@/lib/theme";

const { Text } = Typography;

type Message = { role: "bot" | "user"; text: string };

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
  triggerSubtitle: "AI-powered assistant",
  panelTitle:      "Altera Assistant",
  panelSubtitle:   "Ask me anything",
  placeholder:     "Ask a question…",
  welcome:         "Hi! I'm Altera's assistant. Ask me anything about the app, its widgets, or how to get started.",
  followUp:        "Here are some things I can help with:",
  fallback:        "Great question! For more details, check the Docs page or reach out to our team directly.",
  quickReplies: [
    { question: "How does PDF Converter work?",  answer: "Open your PDF, draw rectangles over the data you want to extract, optionally place column guides, then click Convert. You get a clean structured table ready for further processing." },
    { question: "What widgets are available?",   answer: "Altera includes 9 widgets: PDF Converter, Filter Builder, Column Manager, Rows Slicer, Header Promoter, Multi Shift Columns, Regex Extractor, Remove Duplicates, and Cleaner." },
    { question: "Is there a free trial?",        answer: "Yes! You can get started for free. Head to the Pricing page to see what's included in each plan." },
  ],
};

export default function ChatBot({ t = DEFAULT_T }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: t.welcome }]);
  const [typing, setTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [input, setInput] = useState("");
  const hasAutoPlayed = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
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
        body: JSON.stringify({ message: text, history }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: t.fallback }]);
    } finally {
      setTyping(false);
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
            <Card
              variant="borderless"
              className={styles.panel}
              title={
                <div className={styles.cardHeader}>
                  <Avatar
                    icon={<RobotOutlined />}
                    style={{ background: "rgba(255,255,255,0.22)", flexShrink: 0 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Text strong style={{ color: "#fff", fontSize: 14, lineHeight: 1.2 }}>
                      {t.panelTitle}
                    </Text>
                    <Text style={{ color: "rgba(255,255,255,0.72)", fontSize: 11.5, lineHeight: 1.2 }}>
                      {t.panelSubtitle}
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
                  background: `linear-gradient(135deg, ${COLOR_PRIMARY} 0%, ${COLOR_PRIMARY_LIGHT} 100%)`,
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
                        <Avatar size={28} icon={<RobotOutlined />} style={{ background: COLOR_PRIMARY, flexShrink: 0 }} />
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
                      <Avatar size={28} icon={<RobotOutlined />} style={{ background: COLOR_PRIMARY, flexShrink: 0 }} />
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
                          style={{ borderRadius: 999, fontSize: 12, height: "auto", padding: "5px 12px", whiteSpace: "normal", textAlign: "left" }}
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
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPressEnter={() => send(input)}
                  placeholder={t.placeholder}
                  variant="borderless"
                  style={{ flex: 1, fontSize: 13.5 }}
                  suffix={
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      size="small"
                      onClick={() => send(input)}
                      style={{ background: COLOR_PRIMARY, border: "none", borderRadius: 6 }}
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
          <RobotOutlined className={styles.triggerIcon} style={{ fontSize: 26 }} />
        </div>
        <div className={styles.triggerText}>
          <Text strong style={{ fontSize: 13, color: "#111", lineHeight: 1.2 }}>{t.triggerTitle}</Text>
          <Text style={{ fontSize: 11.5, color: COLOR_TEXT_MUTED, lineHeight: 1.2 }}>{t.triggerSubtitle}</Text>
        </div>
      </motion.button>
    </div>
  );
}
