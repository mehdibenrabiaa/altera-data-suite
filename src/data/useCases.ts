import type { CanvasEdge } from "@/components/WorkflowCanvas";

// Use cases shown as tabs on the homepage (IndustriesSection) and as their
// own pages at /[lang]/use-cases/[slug]. Layout only -- every label lives
// in the dictionaries under useCases.items[slug].
//
// Each workflow uses real Altera nodes wired the way the app allows them:
// Merge's second table goes into its square "Extra Data" port, Input Data
// has no input, Export/Summary have no output.

export interface UseCaseLayout {
  slug: string;
  tables: { id: string; color: string; x: number; y: number }[];
  nodes: { id: string; docId: string; x: number; y: number }[];
  edges: CanvasEdge[];
}

export const USE_CASES: UseCaseLayout[] = [
  {
    slug: "finance",
    tables: [{ id: "statement", color: "#FE4D41", x: 0, y: 20 }],
    nodes: [
      { id: "clean",  docId: "cleaner",     x: 300, y: 60 },
      { id: "type",   docId: "change_type", x: 450, y: 60 },
      { id: "ledger", docId: "input_data",  x: 450, y: 230 },
      { id: "merge",  docId: "merge",       x: 610, y: 140 },
      { id: "filter", docId: "filter",      x: 760, y: 140 },
      { id: "export", docId: "export",      x: 910, y: 140 },
    ],
    edges: [
      ["statement", "clean"], ["clean", "type"], ["type", "merge"],
      ["ledger", "merge", "extra"], ["merge", "filter"], ["filter", "export"],
    ],
  },
  {
    slug: "payroll",
    tables: [{ id: "payslips", color: "#019B8A", x: 0, y: 20 }],
    nodes: [
      { id: "fill",   docId: "cascade_fill", x: 300, y: 80 },
      { id: "filter", docId: "filter",       x: 450, y: 80 },
      { id: "group",  docId: "group_by",     x: 600, y: 80 },
      { id: "sort",   docId: "sort",         x: 750, y: 80 },
      { id: "export", docId: "export",       x: 900, y: 80 },
    ],
    edges: [["payslips", "fill"], ["fill", "filter"], ["filter", "group"], ["group", "sort"], ["sort", "export"]],
  },
  {
    slug: "procurement",
    tables: [{ id: "invoices", color: "#155F98", x: 0, y: 10 }],
    nodes: [
      { id: "clean",   docId: "cleaner",     x: 300, y: 80 },
      { id: "type",    docId: "change_type", x: 450, y: 80 },
      { id: "formula", docId: "formula",     x: 600, y: 80 },
      { id: "group",   docId: "group_by",    x: 750, y: 80 },
      { id: "export",  docId: "export",      x: 900, y: 80 },
    ],
    edges: [["invoices", "clean"], ["clean", "type"], ["type", "formula"], ["formula", "group"], ["group", "export"]],
  },
  {
    slug: "logistics",
    tables: [{ id: "deliveries", color: "#E86F53", x: 0, y: 10 }],
    nodes: [
      { id: "parse",  docId: "text_parser", x: 300, y: 80 },
      { id: "unique", docId: "unique",      x: 450, y: 80 },
      { id: "sort",   docId: "sort",        x: 600, y: 80 },
      { id: "export", docId: "export",      x: 750, y: 80 },
    ],
    edges: [["deliveries", "parse"], ["parse", "unique"], ["unique", "sort"], ["sort", "export"]],
  },
  {
    slug: "audit",
    tables: [{ id: "statements", color: "#7753A0", x: 0, y: 40 }],
    nodes: [
      { id: "regex",     docId: "regular_expressions", x: 300, y: 100 },
      { id: "type",      docId: "change_type",         x: 450, y: 100 },
      { id: "summary",   docId: "summary",             x: 610, y: 210 },
      { id: "aggregate", docId: "aggregate",           x: 610, y: 20 },
      { id: "export",    docId: "export",              x: 760, y: 20 },
    ],
    edges: [
      ["statements", "regex"], ["regex", "type"], ["type", "aggregate"],
      ["type", "summary"], ["aggregate", "export"],
    ],
  },
];

/** A use case's translated text (dictionaries: useCases.items[slug]) */
export interface UseCaseItemT {
  tab: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  documents: string[];
  challenge: string;
  steps: { node: string; title: string; body: string }[];
  outcomes: string[];
  canvas: {
    tables: Record<string, { name: string; rowsLabel: string; columns: string[] }>;
    descriptions: Record<string, string>;
  };
}

export function getUseCase(slug: string): UseCaseLayout | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}
