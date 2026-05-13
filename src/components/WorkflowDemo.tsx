"use client";

import "@xyflow/react/dist/style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  getBezierPath,
  type NodeTypes,
  type EdgeTypes,
  type EdgeProps,
} from "@xyflow/react";

function OrangeEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return (
    <g>
      {/* shadow layer */}
      <path d={path} fill="none" stroke="#c8c8c8" strokeWidth={5} strokeLinecap="round" />
      {/* main line */}
      <path id={id} d={path} fill="none" stroke="#a0a0a0" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

const edgeTypes: EdgeTypes = { orangeEdge: OrangeEdge };
import { Typography } from "antd";

const ICONS: Record<string, string> = {
  "PDF Converter":       "pdf_converter.svg",
  "Filter Builder":      "filter.svg",
  "Merge Data":          "Transform-Merge Data.png",
  "Column Manager":      "column_manager.svg",
  "Data Table":          "data_table.png",
  "Group by":            "Transform-Group by.png",
  "Regular Expressions": "regex.svg",
  "Horizontal Stack":    "hstack.svg",
};

const ACCENT_WIDGETS = ["Merge Data", "Group by"];
const CIRCLE_SIZE = 80;

function OrangeWidget({ data }: { data: Record<string, string> }) {
  const isAccent = ACCENT_WIDGETS.includes(data.name);
  const isPdf    = data.name === "PDF Converter";
  const bgColor  = isAccent ? "#ffa76e" : "#e0e0e0";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "transparent", userSelect: "none", cursor: "default" }}>
      {!isPdf && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#999", width: 9, height: 9, border: "2px solid #fff", top: CIRCLE_SIZE / 2 }}
        />
      )}

      <div
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: "50%",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          flexShrink: 0,
        }}
      >
        <Image
          src={`/widgets_icons/${ICONS[data.name]}`}
          alt={data.name}
          width={48}
          height={48}
          style={{ objectFit: "contain" }}
          onError={(e) => (e.currentTarget.style.opacity = "0")}
        />
      </div>

      <div style={{ fontSize: 10, color: "#444", fontWeight: 500, lineHeight: 1.3, textAlign: "center", maxWidth: 84, wordBreak: "break-word" }}>
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#999", width: 9, height: 9, border: "2px solid #fff", top: CIRCLE_SIZE / 2 }}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = { orangeWidget: OrangeWidget };

// Original horizontal positions from Orange XML
const desktopNodes = [
  { id: "0",  type: "orangeWidget", position: { x: 172,  y: 207 }, data: { label: "Payroll File",            name: "PDF Converter" } },
  { id: "1",  type: "orangeWidget", position: { x: 333,  y: 204 }, data: { label: "Employee Name",           name: "Filter Builder" } },
  { id: "2",  type: "orangeWidget", position: { x: 337,  y: 309 }, data: { label: "Earnings",                name: "Filter Builder" } },
  { id: "3",  type: "orangeWidget", position: { x: 939,  y: 296 }, data: { label: "Merge Data",              name: "Merge Data" } },
  { id: "4",  type: "orangeWidget", position: { x: 1085, y: 296 }, data: { label: "Arranging columns",       name: "Column Manager" } },
  { id: "5",  type: "orangeWidget", position: { x: 1236, y: 296 }, data: { label: "Result",                  name: "Data Table" } },
  { id: "6",  type: "orangeWidget", position: { x: 330,  y: 100 }, data: { label: "Pay date",                name: "Filter Builder" } },
  { id: "7",  type: "orangeWidget", position: { x: 561,  y: 204 }, data: { label: "Get first row",           name: "Group by" } },
  { id: "8",  type: "orangeWidget", position: { x: 439,  y: 99  }, data: { label: "Extract date",            name: "Regular Expressions" } },
  { id: "9",  type: "orangeWidget", position: { x: 561,  y: 98  }, data: { label: "Keep dates only",         name: "Filter Builder" } },
  { id: "10", type: "orangeWidget", position: { x: 691,  y: 151 }, data: { label: "Join both tables",        name: "Horizontal Stack" } },
  { id: "11", type: "orangeWidget", position: { x: 809,  y: 151 }, data: { label: "Rename and Arrange cols", name: "Column Manager" } },
];

// Vertical layout for mobile: swap & scale x/y
const MIN_X = 172, MIN_Y = 98;
const mobileNodes = desktopNodes.map(n => ({
  ...n,
  position: {
    x: (n.position.y - MIN_Y) * 1.4,
    y: (n.position.x - MIN_X) * 0.65,
  },
}));

const edges = [
  { id: "e0-1",   source: "0",  target: "1",  type: "orangeEdge" },
  { id: "e0-2",   source: "0",  target: "2",  type: "orangeEdge" },
  { id: "e0-6",   source: "0",  target: "6",  type: "orangeEdge" },
  { id: "e1-7",   source: "1",  target: "7",  type: "orangeEdge" },
  { id: "e2-3",   source: "2",  target: "3",  type: "orangeEdge" },
  { id: "e3-4",   source: "3",  target: "4",  type: "orangeEdge" },
  { id: "e4-5",   source: "4",  target: "5",  type: "orangeEdge" },
  { id: "e6-8",   source: "6",  target: "8",  type: "orangeEdge" },
  { id: "e7-10",  source: "7",  target: "10", type: "orangeEdge" },
  { id: "e8-9",   source: "8",  target: "9",  type: "orangeEdge" },
  { id: "e9-10",  source: "9",  target: "10", type: "orangeEdge" },
  { id: "e10-11", source: "10", target: "11", type: "orangeEdge" },
  { id: "e11-3",  source: "11", target: "3",  type: "orangeEdge" },
];

export default function WorkflowDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ padding: isMobile ? "48px 16px" : "80px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Typography.Title level={2} style={{ fontWeight: 600, color: "#333", margin: 0 }}>
          See it in action
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 16, color: "#888", marginTop: 8, marginBottom: 0 }}>
          A real payroll parsing workflow built with Altera Data Suite in Orange
        </Typography.Paragraph>
      </div>

      <div
        style={{
          height: isMobile ? 700 : 480,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e8e8e8",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}
      >
        <ReactFlow
          nodes={isMobile ? mobileNodes : desktopNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          style={{ background: "#fafafa" }}
        >
          <Background color="#ddd" gap={24} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </section>
  );
}
