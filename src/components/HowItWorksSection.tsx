"use client";

import { useEffect, useMemo, useState } from "react";
import SectionBadge from "./SectionBadge";
import PdfConverterMock, { type PdfPhase } from "./PdfConverterMock";
import WorkflowCanvas, { type CanvasEdge, type CanvasNode, type CanvasTable, type RunState } from "./WorkflowCanvas";
import styles from "./HowItWorksSection.module.css";

// Inspired by knime.com's homepage stepper ("This is a node." → "Connect
// nodes…" → "You decide when to run it." → examples): a Back/Next tour that
// starts in the PDF Converter (highlight, guides, Convert) and continues on
// a live canvas drawn with the app's own node UI.

interface TableT {
  name: string;
  rowsLabel: string;
  columns: string[];
}

interface HowItWorksT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  back: string;
  next: string;
  restart: string;
  stepOf: string;
  steps: { title: string; body: string }[];
  canvas: { statement: TableT; invoices: TableT; descriptions: Record<string, string> };
}

interface Scene {
  pdf?: PdfPhase; // PDF Converter steps instead of the workflow canvas
  tables: CanvasTable[];
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  idle?: boolean; // nodes not yet run (red light)
  animate?: string[]; // run these nodes one after another
}

function buildScenes(c: HowItWorksT["canvas"]): Scene[] {
  const d = c.descriptions;
  const statement = (y = 0): CanvasTable => ({ id: "statement", ...c.statement, color: "#FE4D41", x: 0, y });
  const invoices: CanvasTable = { id: "invoices", ...c.invoices, color: "#155F98", x: 0, y: 0 };
  const node = (id: string, docId: string, x: number, y: number, desc = d[id] ?? ""): CanvasNode => ({ id, docId, x, y, description: desc });

  const basic: Pick<Scene, "tables" | "nodes" | "edges"> = {
    tables: [statement()],
    nodes: [node("clean", "cleaner", 300, 50), node("filter", "filter", 450, 50), node("export", "export", 600, 50)],
    edges: [["statement", "clean"], ["clean", "filter"], ["filter", "export"]],
  };

  const pdf = (phase: PdfPhase): Scene => ({ pdf: phase, tables: [], nodes: [], edges: [] });

  return [
    // Open your PDF and highlight the data.
    pdf("highlight"),
    // Add column guides.
    pdf("guides"),
    // Click Convert.
    pdf("convert"),
    // 1. This is a node.
    { tables: [], nodes: [node("single", "filter", 0, 0)], edges: [], idle: true },
    // 2. Connect nodes into a workflow.
    { ...basic, idle: true },
    // 3. You decide when to run it.
    { ...basic, animate: ["clean", "filter", "export"] },
    // 4. Clean and filter…
    {
      tables: [statement()],
      nodes: [node("clean", "cleaner", 300, 50), node("type", "change_type", 450, 50), node("filter", "filter", 600, 50), node("export", "export", 750, 50)],
      edges: [["statement", "clean"], ["clean", "type"], ["type", "filter"], ["filter", "export"]],
    },
    // 5. …total it by group…
    {
      tables: [invoices],
      nodes: [node("group", "group_by", 300, 50), node("sort", "sort", 450, 50), node("export", "export", 600, 50)],
      edges: [["invoices", "group"], ["group", "sort"], ["sort", "export"]],
    },
    // 6. …or combine two sources.
    {
      tables: [statement()],
      nodes: [
        node("clean", "cleaner", 300, 40),
        node("ledger", "input_data", 300, 210),
        node("merge", "merge", 460, 120),
        node("unmatched", "filter", 610, 120),
        node("export", "export", 760, 120),
      ],
      edges: [["statement", "clean"], ["clean", "merge"], ["ledger", "merge", "extra"], ["merge", "unmatched"], ["unmatched", "export"]],
    },
    // 7. And it's intuitive.
    {
      tables: [invoices],
      nodes: [
        node("clean", "cleaner", 300, 50),
        node("type", "change_type", 450, 50),
        node("group", "group_by", 600, 50),
        node("sort", "sort", 750, 50),
        node("export", "export", 900, 50),
      ],
      edges: [["invoices", "clean"], ["clean", "type"], ["type", "group"], ["group", "sort"], ["sort", "export"]],
    },
  ];
}

export default function HowItWorksSection({ t }: { t: HowItWorksT }) {
  const scenes = useMemo(() => buildScenes(t.canvas), [t.canvas]);
  const total = Math.min(scenes.length, t.steps.length);
  const [step, setStep] = useState(0);
  const scene = scenes[step];

  // Step 3's run: every node starts red, then turns amber → green in order.
  const [runStatus, setRunStatus] = useState<Record<string, RunState>>({});
  useEffect(() => {
    if (!scene.animate) return;
    const order = scene.animate;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const set = (s: Record<string, RunState>) => timers.push(setTimeout(() => setRunStatus(s), 0));
    set(Object.fromEntries(order.map((id) => [id, "idle" as RunState])));
    order.forEach((id, i) => {
      timers.push(setTimeout(() => setRunStatus((s) => ({ ...s, [id]: "running" })), 600 + i * 900));
      timers.push(setTimeout(() => setRunStatus((s) => ({ ...s, [id]: "done" })), 600 + i * 900 + 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [scene]);

  const status: Record<string, RunState> = scene.animate
    ? runStatus
    : scene.idle
      ? Object.fromEntries(scene.nodes.map((n) => [n.id, "idle" as RunState]))
      : {};

  const current = t.steps[step];
  const last = step === total - 1;

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <SectionBadge label={t.badgeLabel} text={t.badgeText} />
        <h2 className={styles.heading}>{t.heading}</h2>

        <div className={styles.stage}>
          <div className={styles.text}>
            <span className={styles.counter}>
              {t.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(total))}
            </span>
            {/* aria-live so screen readers hear each new step */}
            <div aria-live="polite">
              <h3 className={styles.title}>{current.title}</h3>
              <p className={styles.body}>{current.body}</p>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                {t.back}
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => setStep((s) => (last ? 0 : s + 1))}
              >
                {last ? t.restart : t.next}
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label={t.heading}>
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={t.steps[i].title}
                  className={`${styles.dot} ${i === step ? styles.dotActive : ""}`}
                  onClick={() => setStep(i)}
                />
              ))}
            </div>
          </div>

          <div className={styles.canvasWrap}>
            {scene.pdf ? (
              <PdfConverterMock
                phase={scene.pdf}
                columns={t.canvas.statement.columns}
                tableName={t.canvas.statement.name}
                height={360}
              />
            ) : (
            <WorkflowCanvas
              tables={scene.tables}
              nodes={scene.nodes}
              edges={scene.edges}
              status={status}
              height={360}
              // Small scenes fit whole on phones; long ones start readable at the left
              readableOnPhones={scene.nodes.length + scene.tables.length > 4}
            />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
