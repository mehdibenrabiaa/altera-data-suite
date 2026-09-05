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

// Matches Altera Studio's own edge style exactly (devkit/altera-studio/src/
// panels/SchemaView.tsx's defaultEdgeOptions: stroke #414959, width 1.5) --
// a single line, not the old shadow+line double-stroke trick.
function WorkflowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return <path id={id} d={path} fill="none" stroke="#414959" strokeWidth={1.5} />;
}

const edgeTypes: EdgeTypes = { workflowEdge: WorkflowEdge };
import { Typography } from "antd";

// Each node's real Altera Studio catalog equivalent -- both the icon file
// (copied verbatim from devkit/altera-studio/public/node-icons/) and its
// real category color (nodeCatalog.ts's CATEGORY_META), so this demo reads
// as the actual app's Workflow canvas, not a recolor of the old fake-Orange
// chrome it replaced. "PDF Converter" and "Data Table" have no literal
// catalog node (PDF loading is the app itself, not a node) -- both get the
// io category's teal, the closest real equivalent (source/preview steps).
const CATEGORY_COLOR: Record<string, string> = {
  io: "#019B8A",
  preparation: "#155F98",
  transform: "#E0A526",
  join: "#7753A0",
  parse: "#E86F53",
};
const WIDGET_META: Record<string, { icon: string; category: keyof typeof CATEGORY_COLOR }> = {
  "PDF Converter":       { icon: "pdf_converter.svg",   category: "io" },
  "Filter Builder":      { icon: "filter.svg",          category: "preparation" },
  "Merge Data":          { icon: "merge.svg",           category: "join" },
  "Column Manager":      { icon: "column_manager.svg",  category: "preparation" },
  "Data Table":          { icon: "browse.svg",          category: "io" },
  "Group by":            { icon: "aggregate.svg",       category: "transform" },
  "Regular Expressions": { icon: "regex.svg",           category: "parse" },
  "Horizontal Stack":    { icon: "horizontal_stack.svg", category: "join" },
};

// Scaled up well beyond the real app's own tiny on-canvas node size (this
// is a marketing demo, legibility matters more than 1:1 fidelity) --
// what's being matched is the tile's shape/color/icon treatment, not its
// literal pixel size.
const CIRCLE_SIZE = 64;

function WorkflowNode({ data }: { data: Record<string, string> }) {
  const meta = WIDGET_META[data.name];
  const isPdf = data.name === "PDF Converter";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "transparent", userSelect: "none", cursor: "default" }}>
      {!isPdf && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#999", width: 9, height: 9, border: "2px solid #fff", top: CIRCLE_SIZE / 2 }}
        />
      )}

      {/* Altera Studio's own node-icon-tile look (App.css): a rounded-
          square tile in the node's real category color, icon rendered
          white on top via the same brightness(0) invert(1) trick the app
          itself uses, rather than sourcing separate white-icon assets. */}
      <div
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: 5,
          border: "1px solid #c8c8c8",
          background: CATEGORY_COLOR[meta.category],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <Image
          src={`/widgets_icons/${meta.icon}`}
          alt={data.name}
          width={36}
          height={36}
          style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
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

const nodeTypes: NodeTypes = { workflowNode: WorkflowNode };

// Original horizontal positions from the source workflow
const desktopNodes = [
  { id: "0",  type: "workflowNode", position: { x: 172,  y: 207 }, data: { label: "Payroll File",            name: "PDF Converter" } },
  { id: "1",  type: "workflowNode", position: { x: 333,  y: 204 }, data: { label: "Employee Name",           name: "Filter Builder" } },
  { id: "2",  type: "workflowNode", position: { x: 337,  y: 309 }, data: { label: "Earnings",                name: "Filter Builder" } },
  { id: "3",  type: "workflowNode", position: { x: 939,  y: 296 }, data: { label: "Merge Data",              name: "Merge Data" } },
  { id: "4",  type: "workflowNode", position: { x: 1085, y: 296 }, data: { label: "Arranging columns",       name: "Column Manager" } },
  { id: "5",  type: "workflowNode", position: { x: 1236, y: 296 }, data: { label: "Result",                  name: "Data Table" } },
  { id: "6",  type: "workflowNode", position: { x: 330,  y: 100 }, data: { label: "Pay date",                name: "Filter Builder" } },
  { id: "7",  type: "workflowNode", position: { x: 561,  y: 204 }, data: { label: "Get first row",           name: "Group by" } },
  { id: "8",  type: "workflowNode", position: { x: 439,  y: 99  }, data: { label: "Extract date",            name: "Regular Expressions" } },
  { id: "9",  type: "workflowNode", position: { x: 561,  y: 98  }, data: { label: "Keep dates only",         name: "Filter Builder" } },
  { id: "10", type: "workflowNode", position: { x: 691,  y: 151 }, data: { label: "Join both tables",        name: "Horizontal Stack" } },
  { id: "11", type: "workflowNode", position: { x: 809,  y: 151 }, data: { label: "Rename and Arrange cols", name: "Column Manager" } },
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
  { id: "e0-1",   source: "0",  target: "1",  type: "workflowEdge" },
  { id: "e0-2",   source: "0",  target: "2",  type: "workflowEdge" },
  { id: "e0-6",   source: "0",  target: "6",  type: "workflowEdge" },
  { id: "e1-7",   source: "1",  target: "7",  type: "workflowEdge" },
  { id: "e2-3",   source: "2",  target: "3",  type: "workflowEdge" },
  { id: "e3-4",   source: "3",  target: "4",  type: "workflowEdge" },
  { id: "e4-5",   source: "4",  target: "5",  type: "workflowEdge" },
  { id: "e6-8",   source: "6",  target: "8",  type: "workflowEdge" },
  { id: "e7-10",  source: "7",  target: "10", type: "workflowEdge" },
  { id: "e8-9",   source: "8",  target: "9",  type: "workflowEdge" },
  { id: "e9-10",  source: "9",  target: "10", type: "workflowEdge" },
  { id: "e10-11", source: "10", target: "11", type: "workflowEdge" },
  { id: "e11-3",  source: "11", target: "3",  type: "workflowEdge" },
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
          A real payroll parsing workflow built with Altera Data Suite
        </Typography.Paragraph>
      </div>

      <div
        style={{
          height: isMobile ? 700 : 480,
          borderRadius: 10,
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
