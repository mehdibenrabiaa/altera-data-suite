"use client";

import "@xyflow/react/dist/style.css";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Handle,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { getWidgetDoc, isLightColor } from "@/data/widgetDocs";
import styles from "./WorkflowCanvas.module.css";

// A React Flow canvas drawn with the same UI as Altera Studio's own Workflow
// canvas (altera-data-suite-standalone/src/panels/SchemaView.tsx + App.css):
// 42px category-colored icon tiles with triangle ports (plus the square
// "Extra Data" port on Filter/Merge), the node name with an italic
// description, red/amber/green status lights, and the extracted-table card
// a PDF workflow starts from.

export type RunState = "idle" | "running" | "done";

export interface CanvasTable {
  id: string;
  name: string;
  rowsLabel: string;
  columns: string[];
  color: string;
  x: number;
  y: number;
}

export interface CanvasNode {
  id: string;
  docId: string;
  description: string;
  x: number;
  y: number;
}

/** [source, target] or [source, target, "extra"] for the Extra Data port */
export type CanvasEdge = [string, string] | [string, string, "extra"];

// Port layout per node, mirroring the app's catalog (nodeCatalog.ts):
// hasInput: false / hasOutput: false / hasExtraInput: true
const NO_INPUT = new Set(["input_data"]);
const NO_OUTPUT = new Set(["export", "browse", "summary", "page_filter"]);
const EXTRA_INPUT = new Set(["filter", "merge"]);

// Same idea as the app's ProcessorNodeRunContext: status changes flow
// through context instead of rebuilding every node's data.
const RunContext = createContext<Record<string, RunState>>({});

type ProcessorData = { docId: string; description: string };
type TableData = { name: string; rowsLabel: string; columns: string[]; color: string };

function ProcessorNode({ id, data }: NodeProps<Node<ProcessorData>>) {
  const state = useContext(RunContext)[id] ?? "done";
  const doc = getWidgetDoc(data.docId);
  if (!doc) return null;
  return (
    <div className={styles.processor}>
      <div className={styles.core}>
        {!NO_INPUT.has(doc.id) && (
          <Handle type="target" position={Position.Left} className={`${styles.port} ${styles.portIn}`} />
        )}
        {EXTRA_INPUT.has(doc.id) && (
          <Handle type="target" position={Position.Left} id="extra" className={styles.portSquare} title="Extra Data" />
        )}
        <div className={styles.tile} style={{ background: doc.color }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- draggable={false} matters on a canvas node, same as the app */}
          <img
            src={`/widgets_icons/${doc.svgIcon}`}
            alt=""
            draggable={false}
            className={isLightColor(doc.color) ? styles.iconDark : styles.icon}
          />
        </div>
        {!NO_OUTPUT.has(doc.id) && (
          <Handle type="source" position={Position.Right} className={`${styles.port} ${styles.portOut}`} />
        )}
      </div>
      <div className={styles.lights} aria-hidden>
        <span className={`${styles.light} ${state === "idle" ? styles.lightRed : ""}`} />
        <span className={`${styles.light} ${state === "running" ? styles.lightAmber : ""}`} />
        <span className={`${styles.light} ${state === "done" ? styles.lightGreen : ""}`} />
      </div>
      <div className={styles.labels}>
        <span className={styles.name}>{doc.name}</span>
        {data.description && <p className={styles.description}>{data.description}</p>}
      </div>
    </div>
  );
}

function TableNode({ data }: NodeProps<Node<TableData>>) {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeader} style={{ borderLeftColor: data.color }}>
        <span className={styles.tableDot} style={{ background: data.color }} />
        <span className={styles.tableName}>{data.name}</span>
      </div>
      <div className={styles.tableMeta}>{data.rowsLabel}</div>
      <div>
        {data.columns.map((c) => (
          <div key={c} className={styles.tableRow}>{c}</div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} className={`${styles.port} ${styles.portOut}`} />
    </div>
  );
}

const nodeTypes = { processorNode: ProcessorNode, tableNode: TableNode };

interface Props {
  tables?: CanvasTable[];
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  /** Per-node run state; nodes not listed show as executed (green) */
  status?: Record<string, RunState>;
  height?: number;
  /** Phones start at a readable zoom from the left instead of fitting everything */
  readableOnPhones?: boolean;
  className?: string;
}

export default function WorkflowCanvas({
  tables = [],
  nodes,
  edges,
  status = {},
  height = 400,
  readableOnPhones = true,
  className,
}: Props) {
  const flowNodes = useMemo<Node[]>(
    () => [
      ...tables.map((t) => ({
        id: t.id,
        type: "tableNode",
        position: { x: t.x, y: t.y },
        data: { name: t.name, rowsLabel: t.rowsLabel, columns: t.columns, color: t.color },
      })),
      ...nodes.map((n) => ({
        id: n.id,
        type: "processorNode",
        position: { x: n.x, y: n.y },
        data: { docId: n.docId, description: n.description },
      })),
    ],
    [tables, nodes],
  );
  const flowEdges = useMemo<Edge[]>(
    () =>
      edges.map(([source, target, targetHandle]) => ({
        id: `${source}-${target}-${targetHandle ?? "in"}`,
        source,
        target,
        targetHandle,
      })),
    [edges],
  );
  // Remount whenever the graph itself changes so fitView re-runs
  const graphKey = useMemo(() => flowNodes.map((n) => n.id).join("|"), [flowNodes]);

  // Measure before mounting React Flow; re-mount when the width changes a
  // lot (e.g. rotating a phone) so the view is re-fitted.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth((w) => (Math.abs(el.clientWidth - w) > 40 ? el.clientWidth : w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const narrow = readableOnPhones && width > 0 && width < 640;

  return (
    <RunContext.Provider value={status}>
      <div
        ref={wrapperRef}
        className={`${styles.canvas}${className ? ` ${className}` : ""}`}
        style={{ height }}
      >
        {width > 0 && (
          <ReactFlow
            key={`${graphKey}-${width}`}
            defaultNodes={flowNodes}
            defaultEdges={flowEdges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ style: { strokeWidth: 1.5, stroke: "#4b5563" }, selectable: false }}
            colorMode="light"
            fitView={!narrow}
            fitViewOptions={{ padding: 0.12, maxZoom: 1.25 }}
            defaultViewport={{ x: 16, y: 40, zoom: 0.62 }}
            minZoom={0.4}
            maxZoom={1.6}
            nodesConnectable={false}
            // Let the page keep scrolling over the canvas; pinch/controls zoom
            zoomOnScroll={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
          >
            <Controls showInteractive={false} position="bottom-right" />
          </ReactFlow>
        )}
      </div>
    </RunContext.Provider>
  );
}
