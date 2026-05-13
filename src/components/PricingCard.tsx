"use client";

import { useState } from "react";
import { Button, Card, Divider, Flex, Tag, Typography } from "antd";
import {
  CheckCircleFilled,
  StarFilled,
  RightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface PricingCardProps {
  title: string;
  price?: number;
  period?: string;
  subtitle?: string;
  features: string[];
  btnLabel?: string;
  badge?: string;
  color?: string;
}

export default function PricingCard({
  title,
  price,
  period = "/year",
  subtitle,
  features,
  btnLabel = "Subscribe Now",
  badge,
  color = "#ff5d02",
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article style={{ width: 300 }}>
      <Card
        variant="borderless"
        style={{
          width: "100%",
          borderRadius: 25,
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 0px 8px",
          position: "relative",
          zIndex: 2,
          marginBottom: -20,
        }}
      >
        <Flex align="center" justify="space-between">
          <Title
            level={5}
            style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#000" }}
          >
            {title}
          </Title>

          {badge && (
            <Tag
              style={{
                borderRadius: 9,
                fontSize: 11,
                background: "transparent",
                color: color,
                borderColor: "#d9d9d9",
                boxShadow: "none",
                padding: "2px 10px",
              }}
            >
              <StarFilled style={{ fontSize: 11, color }} /> {badge}
            </Tag>
          )}
        </Flex>

        <Flex align="flex-end" style={{ padding: "15px 0", paddingBottom: 0 }}>
          {price !== undefined ? (
            <>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: "#000",
                }}
              >
                ${price}
              </span>
              <Text strong>{period}</Text>
            </>
          ) : (
            <span
              style={{
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1,
                color: "#000",
              }}
            >
              Let's Talk
            </span>
          )}
        </Flex>

        {subtitle && (
          <Text type="secondary" style={{ fontSize: 12, fontWeight: 500 }}>
            {subtitle}
          </Text>
        )}

        <Divider style={{ margin: "20px 0" }} />

        <Text strong style={{ display: "block", marginBottom: 10 }}>
          Includes
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
                <Text style={{ fontSize: 14, color: "#8c8c8c" }}>{item}</Text>
              </Flex>
            </li>
          ))}
        </ul>
      </Card>

      <Button
        block
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
