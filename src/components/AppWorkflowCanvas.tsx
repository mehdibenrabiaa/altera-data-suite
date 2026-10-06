"use client";

import WorkflowCanvas, { type CanvasEdge, type CanvasNode } from "./WorkflowCanvas";
import styles from "./AppWorkflowCanvas.module.css";

export interface WorkflowCanvasT {
  tableName: string;
  rowsLabel: string;
  columns: string[];
  descriptions: Record<string, string>;
  hint: string;
}

// A real payroll job: split the extracted table into employee rows and pay
// dates, clean each side, join them back together, tidy, and export.
const FLOW: Omit<CanvasNode, "description">[] = [
  { id: "employees", docId: "filter",              x: 320, y: 40 },
  { id: "first",     docId: "group_by",            x: 470, y: 40 },
  { id: "regex",     docId: "regular_expressions", x: 320, y: 200 },
  { id: "dates",     docId: "filter",              x: 470, y: 200 },
  { id: "stack",     docId: "horizontal_stack",    x: 620, y: 120 },
  { id: "columns",   docId: "column_manager",      x: 770, y: 120 },
  { id: "export",    docId: "export",              x: 920, y: 120 },
];

const EDGES: CanvasEdge[] = [
  ["table", "employees"], ["employees", "first"], ["table", "regex"], ["regex", "dates"],
  ["first", "stack"], ["dates", "stack"], ["stack", "columns"], ["columns", "export"],
];

export default function AppWorkflowCanvas({ t }: { t: WorkflowCanvasT }) {
  return (
    <div className={styles.frame}>
      <WorkflowCanvas
        tables={[{ id: "table", name: t.tableName, rowsLabel: t.rowsLabel, columns: t.columns, color: "#FE4D41", x: 0, y: 70 }]}
        nodes={FLOW.map((n) => ({ ...n, description: t.descriptions[n.id] ?? "" }))}
        edges={EDGES}
      />
      <p className={styles.hint}>{t.hint}</p>
    </div>
  );
}
