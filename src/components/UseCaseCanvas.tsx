"use client";

import { getUseCase } from "@/data/useCases";
import WorkflowCanvas from "./WorkflowCanvas";

// Client wrapper: turns a use case's layout (src/data/useCases.ts) plus its
// translated labels into the live app-style canvas.

interface CanvasT {
  tables: Record<string, { name: string; rowsLabel: string; columns: string[] }>;
  descriptions: Record<string, string>;
}

export default function UseCaseCanvas({ slug, canvas }: { slug: string; canvas: CanvasT }) {
  const layout = getUseCase(slug);
  if (!layout) return null;
  return (
    <WorkflowCanvas
      tables={layout.tables.map((t) => ({ ...t, ...canvas.tables[t.id] }))}
      nodes={layout.nodes.map((n) => ({ ...n, description: canvas.descriptions[n.id] ?? "" }))}
      edges={layout.edges}
      height={380}
    />
  );
}
