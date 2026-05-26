"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Card, Divider, Flex, Tag, Typography } from "antd";
import { COLOR_PRIMARY, COLOR_TEXT_MUTED } from "@/lib/theme";
import styles from "./PricingCard.module.css";
import {
  CheckCircleFilled,
  StarFilled,
  RightOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface PricingCardProps {
  title: string;
  price?: number;
  period?: string;
  subtitle?: string;
  features: string[];
  btnLabel?: string;
  badge?: string;
  color?: string;
  letsTalk?: string;
  freeLabel?: string;
  includesLabel?: string;
  href?: string;
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
  letsTalk = "Let's Talk",
  freeLabel = "Free",
  includesLabel = "Includes",
  href,
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article style={{ width: 300, display: "flex", flexDirection: "column" }}>
      <Card
        variant="borderless"
        styles={{ body: { display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" } }}
        style={{
          width: "100%",
          borderRadius: 25,
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 0px 8px",
          position: "relative",
          zIndex: 2,
          marginBottom: -20,
          flex: 1,
        }}
      >
        {/* top section grows to push the divider to the same level across all cards */}
        <div style={{ flex: 1 }}>
          <Flex align="center" justify="space-between">
            <span style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#000" }}>
              {title}
            </span>

            {badge && (
              <Tag
                style={{
                  borderRadius: 9,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "transparent",
                  color: "#c44400",
                  borderColor: "#d9d9d9",
                  boxShadow: "none",
                  padding: "2px 10px",
                }}
              >
                <StarFilled style={{ fontSize: 11, color }} /> {badge}
              </Tag>
            )}
          </Flex>

          <Flex align="flex-end" style={{ padding: "15px 0", paddingBottom: 0, overflow: "hidden" }}>
            {price !== undefined ? (
              price === 0 ? (
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 600,
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
                      fontWeight: 600,
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
                    <Text strong>{period}</Text>
                  </motion.span>
                </AnimatePresence>
              </>
              )
            ) : (
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: "#000",
                }}
              >
                {letsTalk}
              </span>
            )}
          </Flex>

          {subtitle && (
            <Text style={{ fontSize: 12, fontWeight: 500, color: COLOR_TEXT_MUTED }}>
              {subtitle}
            </Text>
          )}
        </div>

        <Divider style={{ margin: "20px 0" }} />

        <Text strong style={{ display: "block", marginBottom: 10 }}>
          {includesLabel}
        </Text>
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
              <Flex align="center" gap={8}>
                <CheckCircleFilled style={{ fontSize: 13, color }} />
                <Text style={{ fontSize: 14, color: COLOR_TEXT_MUTED }}>{item}</Text>
              </Flex>
            </li>
          ))}
        </ul>
      </Card>

      <Button
        block
        href={href}
        className={styles.btn}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: color,
          color: "#fff",
          height: 68,
          paddingTop: 20,
          borderRadius: "0 0 25px 25px",
          border: "none",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "none",
          position: "relative",
          zIndex: 1,
          opacity: hovered ? 0.85 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {btnLabel} <RightOutlined />
      </Button>
    </article>
  );
}
