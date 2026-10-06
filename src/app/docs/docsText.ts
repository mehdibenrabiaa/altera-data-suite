export interface DocsShortcuts {
  toggleHand: string;
  toggleSelection: string;
  toggleGuide: string;
  convert: string;
  openPdf: string;
  zoomIn: string;
  zoomOut: string;
  fitPage: string;
  scrollZoomIn: string;
  scrollZoomOut: string;
}

export interface DocsT {
  overview: string;
  bestFor: string;
  howToUse: string;
  input: string;
  output: string;
  tipsNotes: string;
  toolbarRef: string;
  keyboardShortcuts: string;
  watchTutorials: string;
  viewPlaylist: string;
  handTool: string;
  handToolDesc: string;
  selectionTool: string;
  selectionToolDesc: string;
  pageNav: string;
  pageNavDesc: string;
  shortcuts: DocsShortcuts;
  // Per-node pages and the node catalog
  docsHome: string;
  catalogTitle: string;
  catalogIntro: string;
  searchPlaceholder: string;
  noResults: string;
  nodeLabel: string;
  description: string;
  inputPorts: string;
  outputPorts: string;
  portType: string;
  noPorts: string;
  moreInCategory: string;
  nodesCount: string;
}

export const DEFAULT_T: DocsT = {
  overview: "Overview",
  bestFor: "Best For",
  howToUse: "How to Use",
  input: "Input",
  output: "Output",
  tipsNotes: "Tips & Notes",
  toolbarRef: "Toolbar Reference",
  keyboardShortcuts: "Keyboard Shortcuts",
  watchTutorials: "Watch Video Tutorials",
  viewPlaylist: "View playlist on YouTube",
  handTool: "Hand Tool",
  handToolDesc: "When toggled — click and drag anywhere on the canvas to pan across the document.",
  selectionTool: "Selection Tool",
  selectionToolDesc: "Click an existing annotation to select, reposition, or resize it.",
  pageNav: "Page Navigation",
  pageNavDesc: "Step through pages. The input shows your current page out of the total — you can also type a page number directly.",
  shortcuts: {
    toggleHand: "Toggle Hand tool",
    toggleSelection: "Toggle Selection tool",
    toggleGuide: "Toggle Guide tool (column delimiter)",
    convert: "Convert",
    openPdf: "Open PDF",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fitPage: "Fit page to window",
    scrollZoomIn: "Zoom in",
    scrollZoomOut: "Zoom out",
  },
  docsHome: "Docs",
  catalogTitle: "Node Documentation",
  catalogIntro: "Every Altera node has its own reference page — what it does, how to configure it, and what goes in and comes out.",
  searchPlaceholder: "Search nodes…",
  noResults: "No nodes match your search.",
  nodeLabel: "Node",
  description: "Description",
  inputPorts: "Input Ports",
  outputPorts: "Output Ports",
  portType: "Type",
  noPorts: "None",
  moreInCategory: "More {category} nodes",
  nodesCount: "{count} nodes",
};

/** Dictionaries may predate newer keys -- fill any gaps from the English defaults. */
export function withDefaults(t?: Partial<DocsT>): DocsT {
  return { ...DEFAULT_T, ...t, shortcuts: { ...DEFAULT_T.shortcuts, ...t?.shortcuts } };
}
