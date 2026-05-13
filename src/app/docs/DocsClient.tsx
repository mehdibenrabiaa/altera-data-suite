"use client";

import { useState } from "react";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  Alert,
  Card,
  Divider,
  Flex,
  Input,
  Menu,
  Radio,
  Steps,
  Tag,
  Typography,
} from "antd";
import styles from "./docs.module.css";
import { WIDGET_DOCS } from "@/data/widgetDocs";

const { Title, Text, Paragraph } = Typography;

export default function DocsClient() {
  const [activeId, setActiveId] = useState(WIDGET_DOCS[0].id);
  const active = WIDGET_DOCS.find((w) => w.id === activeId)!;
  const activeIndex = WIDGET_DOCS.findIndex((w) => w.id === activeId);
  const prevWidget = activeIndex > 0 ? WIDGET_DOCS[activeIndex - 1] : null;
  const nextWidget =
    activeIndex < WIDGET_DOCS.length - 1 ? WIDGET_DOCS[activeIndex + 1] : null;

  const navigateTo = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = WIDGET_DOCS.map((w) => ({
    key: w.id,
    icon: w.svgIcon ? (
      <Image
        src={`/widgets_icons/${w.svgIcon}`}
        alt=""
        width={18}
        height={18}
        style={{ display: "block" }}
      />
    ) : (
      <span style={{ fontSize: 16 }}>{w.icon}</span>
    ),
    label: w.name,
  }));

  const stepItems = active.steps.map((step) => ({
    title: (
      <Flex align="center" gap={7}>
        {step.icon && (
          <Image
            src={`/widgets_icons/${step.icon}`}
            alt=""
            width={18}
            height={18}
            style={{ display: "block", flexShrink: 0 }}
          />
        )}
        <Text strong style={{ fontSize: 14.5 }}>
          {step.title}
        </Text>
      </Flex>
    ),
    content: (
      <Text style={{ fontSize: 13.5, color: "#666" }}>{step.detail}</Text>
    ),
  }));

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Menu
          mode="inline"
          selectedKeys={[activeId]}
          items={menuItems}
          onClick={({ key }) => setActiveId(key)}
          style={{ background: "transparent", border: "none" }}
        />
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
              <div className={styles.widgetIconWrap}>
                {active.svgIcon ? (
                  <Image
                    src={`/widgets_icons/${active.svgIcon}`}
                    alt={active.name}
                    width={56}
                    height={56}
                  />
                ) : (
                  <span style={{ fontSize: 36 }}>{active.icon}</span>
                )}
              </div>
              <div className={styles.widgetMeta}>
                <Title
                  level={2}
                  style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}
                >
                  {active.name}
                </Title>
                <Text style={{ fontSize: 15, color: "#666" }}>
                  {active.tagline}
                </Text>
              </div>
            </div>

            <Divider />

            <div className={styles.sections}>
              {/* Overview */}
              <Card
                title="Overview"
                variant="borderless"
                className={styles.card}
              >
                <Paragraph
                  style={{
                    fontSize: 14.5,
                    color: "#444",
                    lineHeight: 1.78,
                    margin: 0,
                  }}
                >
                  {active.description}
                </Paragraph>
              </Card>

              {/* Best For */}
              <Card
                title="Best For"
                variant="borderless"
                className={styles.card}
              >
                <Flex vertical gap={12}>
                  {active.useCases.map((uc) => (
                    <Text key={uc} style={{ fontSize: 14.5, color: "#444" }}>
                      {uc}
                    </Text>
                  ))}
                </Flex>
              </Card>

              {/* How to Use */}
              <Card
                title="How to Use"
                variant="borderless"
                className={styles.card}
              >
                <Steps orientation="vertical" current={-1} items={stepItems} />
              </Card>

              {/* Input */}
              <Card
                title={
                  <Flex align="center" gap={8}>
                    Input
                    <Tag color="default">{active.inputType}</Tag>
                  </Flex>
                }
                variant="borderless"
                className={styles.card}
              >
                <Flex vertical gap={10}>
                  {active.inputNotes.map((note, i) => (
                    <Text key={i} style={{ fontSize: 14, color: "#555" }}>
                      {note}
                    </Text>
                  ))}
                </Flex>
              </Card>

              {/* Output */}
              <Card
                title={
                  <Flex align="center" gap={8}>
                    Output
                    <Tag color="default">{active.outputType}</Tag>
                  </Flex>
                }
                variant="borderless"
                className={styles.card}
              >
                <Flex vertical gap={10}>
                  {active.outputNotes.map((note, i) => (
                    <Text key={i} style={{ fontSize: 14, color: "#555" }}>
                      {note}
                    </Text>
                  ))}
                </Flex>
              </Card>

              {/* Toolbar Reference & Keyboard Shortcuts — PDF Converter only */}
              {active.id === "pdf_converter" && (
                <>
                  <Card
                    title="Toolbar Reference"
                    variant="borderless"
                    className={styles.card}
                  >
                    <Flex vertical gap={0}>
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
                        <Flex vertical gap={3}>
                          <Text strong style={{ fontSize: 14 }}>
                            Hand Tool
                          </Text>
                          <Text style={{ fontSize: 13.5, color: "#666" }}>
                            When toggled — click and drag anywhere on the canvas
                            to pan across the document.
                          </Text>
                        </Flex>
                      </div>

                      <Divider style={{ margin: "12px 0" }} />

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
                        <Flex vertical gap={3}>
                          <Text strong style={{ fontSize: 14 }}>
                            Selection Tool
                          </Text>
                          <Text style={{ fontSize: 13.5, color: "#666" }}>
                            Click an existing annotation to select, reposition,
                            or resize it.
                          </Text>
                        </Flex>
                      </div>

                      <Divider style={{ margin: "12px 0" }} />

                      {/* Page Navigation */}
                      <div className={styles.toolRow}>
                        <Flex align="center" gap={6} style={{ flexShrink: 0 }}>
                          <div className={styles.navBtn}>
                            <Image
                              src="/widgets_icons/previous-page.svg"
                              alt="Previous page"
                              width={18}
                              height={18}
                            />
                          </div>
                          <Input
                            readOnly
                            value="1 / 229"
                            style={{
                              width: 82,
                              textAlign: "center",
                              borderRadius: 8,
                              fontVariantNumeric: "tabular-nums",
                              cursor: "default",
                              fontSize: 13,
                            }}
                          />
                          <div className={styles.navBtn}>
                            <Image
                              src="/widgets_icons/next-page.svg"
                              alt="Next page"
                              width={18}
                              height={18}
                            />
                          </div>
                        </Flex>
                        <Flex vertical gap={3}>
                          <Text strong style={{ fontSize: 14 }}>
                            Page Navigation
                          </Text>
                          <Text style={{ fontSize: 13.5, color: "#666" }}>
                            Step through pages. The input shows your current
                            page out of the total — you can also type a page
                            number directly.
                          </Text>
                        </Flex>
                      </div>
                    </Flex>
                  </Card>

                  {/* Keyboard Shortcuts */}
                  <Card
                    title="Keyboard Shortcuts"
                    variant="borderless"
                    className={styles.card}
                  >
                    <div className={styles.shortcutsGrid}>
                      {[
                        { keys: ["H"], desc: "Toggle Hand tool" },
                        { keys: ["V"], desc: "Toggle Selection tool" },
                        {
                          keys: ["G"],
                          desc: "Toggle Guide tool (column delimiter)",
                        },
                        { keys: ["Ctrl", "↵ Enter"], desc: "Convert" },
                        { keys: ["Ctrl", "O"], desc: "Open PDF" },
                        { keys: ["Ctrl", "+"], desc: "Zoom in" },
                        { keys: ["Ctrl", "−"], desc: "Zoom out" },
                        { keys: ["Ctrl", "0"], desc: "Fit page to window" },
                        { keys: ["Ctrl", "Scroll ↑"], desc: "Zoom in" },
                        { keys: ["Ctrl", "Scroll ↓"], desc: "Zoom out" },
                      ].map(({ keys, desc }, i) => (
                        <div key={i} className={styles.shortcutRow}>
                          <Flex align="center" gap={4}>
                            {keys.map((k, i) => (
                              <span key={i} className={styles.kbd}>
                                {k}
                              </span>
                            ))}
                          </Flex>
                          <Text style={{ fontSize: 13.5, color: "#555" }}>
                            {desc}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}

              {/* Tips */}
              <Card
                title="Tips &amp; Notes"
                variant="borderless"
                className={styles.card}
              >
                <Flex vertical gap={10}>
                  {active.tips.map((tip, i) => (
                    <Alert
                      key={i}
                      type={tip.type === "warning" ? "warning" : "info"}
                      showIcon
                      title={
                        <Text strong style={{ fontSize: 13.5 }}>
                          {tip.title}
                        </Text>
                      }
                      description={
                        <Text style={{ fontSize: 13.5 }}>{tip.body}</Text>
                      }
                    />
                  ))}
                </Flex>
              </Card>
            </div>

            {/* Prev / Next navigation */}
            {(prevWidget || nextWidget) && (
              <Flex
                justify="center"
                style={{
                  marginTop: 40,
                  paddingTop: 24,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Radio.Group size="large" value="" onChange={(e) => navigateTo(e.target.value)} className={styles.widgetNav}>
                  {prevWidget && (
                    <Radio.Button value={prevWidget.id}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <LeftOutlined />
                        {prevWidget.svgIcon ? (
                          <Image src={`/widgets_icons/${prevWidget.svgIcon}`} alt="" width={26} height={26} style={{ display: "block", flexShrink: 0 }} />
                        ) : (
                          <span>{prevWidget.icon}</span>
                        )}
                        {prevWidget.name}
                      </span>
                    </Radio.Button>
                  )}
                  {nextWidget && (
                    <Radio.Button value={nextWidget.id}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        {nextWidget.name}
                        {nextWidget.svgIcon ? (
                          <Image src={`/widgets_icons/${nextWidget.svgIcon}`} alt="" width={26} height={26} style={{ display: "block", flexShrink: 0 }} />
                        ) : (
                          <span>{nextWidget.icon}</span>
                        )}
                        <RightOutlined />
                      </span>
                    </Radio.Button>
                  )}
                </Radio.Group>
              </Flex>
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
        <Flex vertical gap={2}>
          <Text strong style={{ fontSize: 13, color: "#111", lineHeight: 1.4 }}>
            Watch Video Tutorials
          </Text>
          <Text style={{ fontSize: 11.5, color: "#999" }}>
            View playlist on YouTube
          </Text>
        </Flex>
      </motion.a>
    </div>
  );
}
