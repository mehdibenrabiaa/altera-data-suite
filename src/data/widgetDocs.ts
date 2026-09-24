export interface Tip {
  type: "info" | "warning";
  title: string;
  body: string;
}

export interface WidgetDoc {
  id: string;
  name: string;
  icon: string;
  svgIcon?: string;
  // Same per-category accent color as the app's own node catalog
  // (devkit/altera-studio/src/nodeCatalog.ts's CATEGORY_META) -- the icon
  // tile's background, with the icon itself forced white on top (see
  // .nodeIconTile/.nodeIconTile img in docs.module.css), same look as
  // the app's own .node-icon-tile.
  color: string;
  tagline: string;
  description: string;
  useCases: string[];
  steps: { title: string; detail: string; icon?: string }[];
  inputType: string;
  inputNotes: string[];
  outputType: string;
  outputNotes: string[];
  tips: Tip[];
}

export const WIDGET_DOCS: WidgetDoc[] = [
  {
    id: "pdf_converter",
    name: "PDF Converter",
    color: "#FE4D41",
    icon: "📄",
    svgIcon: "pdf_converter.svg",
    tagline:
      "Annotate any PDF on an interactive canvas and extract clean, structured data — without touching a line of code.",
    description:
      "Extracts any data you need from PDF documents using a visual annotation workflow. You highlight the areas of interest directly on the document, optionally place column guides, and click Convert. The node does the rest and sends a clean, structured table to your workflow.",
    useCases: [
      "PDFs exported from accounting software, ERP systems, or government portals",
      "Multi-page reports — extract any data you need from any page, whether it is a formal table or a structured layout with names, IDs, amounts, or any other fields",
      "Any document format — the app adapts to your data regardless of how it is laid out on the page",
      "Recurring reports with the same layout — annotate once, reuse every time",
    ],
    steps: [
      {
        title: "Open your PDF",
        icon: "open-file.svg",
        detail:
          "Click the Open File button in the toolbar to load your PDF. Use the page controls in the toolbar to move between pages.",
      },
      {
        title: "Highlight the data you want to extract",
        icon: "rectangle.svg",
        detail:
          "Select the Rectangle tool in the toolbar. Click and drag over any area of the document that contains the data you are interested in — this tells the node where to look. You can draw multiple areas and assign each a different color. Each color acts as a label you can use later to filter and work with specific sections independently in other nodes such as Filter Builder.",
      },
      {
        title: "Add column guides (optional)",
        icon: "ruler.svg",
        detail:
          "Select the Guide tool and click to place vertical lines where you want column boundaries to be. This is optional — if you skip it, the node estimates column positions automatically. It does this independently for each page, so it adapts even when column widths vary.",
      },
      {
        title: "Click Convert",
        icon: "convert.svg",
        detail:
          "Click the Convert button. The node processes your highlighted areas and sends a structured table to the output. Connect it to a Data Table to review your results, or pipe it directly to the next step in your workflow.",
      },
    ],
    inputType: "PDF File",
    inputNotes: [
      "Multi-page PDFs are fully supported — navigate between pages using the toolbar controls",
      "The PDF must have a text layer — documents that are purely scanned images require OCR processing before use",
      "Very large documents may take a moment to load — only the current page is rendered at a time",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Multiple highlighted areas on the same page are merged into one output table",
      "Your annotations and settings are saved with the workflow file — reopen and click Convert again without redrawing",
      "The output is available immediately after Convert — connect it to any downstream node",
    ],
    tips: [
      {
        type: "info",
        title: "Reuse your annotations",
        body: "If you receive the same report layout every month, save the workflow. Your annotations are stored — just swap the PDF file and click Convert again.",
      },
      {
        type: "info",
        title: "Use colors to filter sections later",
        body: "Each highlighted area gets a color. In downstream nodes like Filter, you can use these colors to work with specific sections of the extracted data independently.",
      },
      {
        type: "info",
        title: "Column alignment issues",
        body: "If columns appear merged in the output, try adding column guides between them. If rows are merged, your highlighted area may be too tall — trim it to cover only the rows you need.",
      },
      {
        type: "warning",
        title: "Image-only PDFs produce no output",
        body: "If you open a scanned document and get empty results, the file has no text layer. Run it through OCR software first, then open it in this node.",
      },
    ],
  },

  // ── In/Out ────────────────────────────────────────────────────────────
  {
    id: "input_data",
    name: "Input Data",
    color: "#019B8A",
    icon: "📥",
    svgIcon: "input_data.svg",
    tagline:
      "Load a local Excel or CSV file from disk and turn it into the first table in your workflow.",
    description:
      "The graph's starting point. Unlike every other node, Input Data takes no upstream connection — instead it reads a .csv, .tsv, .xlsx, or .xls file straight off disk and turns it into a table the rest of your workflow builds on. Open Configure, pick a file (and a sheet, for a multi-sheet workbook), and that data becomes your workflow's source.",
    useCases: [
      "Starting a workflow from an existing spreadsheet or CSV export",
      "Loading one specific sheet out of a multi-sheet Excel workbook",
      "Re-running the same workflow against a refreshed file each week by pointing it at a new export",
    ],
    steps: [
      {
        title: "Choose your file",
        detail:
          "Click Configure and use the native file picker to select a .csv, .tsv, .xlsx, or .xls file.",
      },
      {
        title: "Pick a sheet (Excel only)",
        detail:
          "If the workbook has more than one sheet, choose which one to load.",
      },
      {
        title: "Connect downstream",
        detail:
          "The loaded table is available on Input Data's output the moment it runs — connect it to any other node.",
      },
    ],
    inputType: "File (.csv, .tsv, .xlsx, .xls)",
    inputNotes: [
      "This is the catalog's one source node — it has no input port and needs no upstream connection",
      "Column types (number, date) are inferred automatically from the file's own data",
      "Blank or repeated header names in the source file are made unique automatically",
    ],
    outputType: "Data Table",
    outputNotes: [
      "One row per row in the source file, one column per column",
      "Re-running the node reloads the file fresh from disk, picking up any changes since the last run",
    ],
    tips: [
      {
        type: "info",
        title: "Swap files without rebuilding the workflow",
        body: "Point Configure at a new file with the same shape (same columns) and every downstream node keeps working unchanged — handy for recurring exports that land in the same format each time.",
      },
      {
        type: "warning",
        title: "One sheet at a time",
        body: "If a workbook resolves to more than one sheet, the node reports an error asking you to pick a single sheet in Configure.",
      },
    ],
  },
  {
    id: "export",
    name: "Export",
    color: "#019B8A",
    icon: "📤",
    svgIcon: "excel_exporter.svg",
    tagline:
      "Write one or more tables out to a real Excel or CSV file on disk — the end of the line for a workflow.",
    description:
      "The catalog's one sink node. Instead of handing a table on to another node, Export writes a real file directly to your filesystem when it runs. Connect any table to its input, choose a destination and format, and running the node produces the file immediately — there's no output port to chain further.",
    useCases: [
      "Delivering a cleaned, transformed table as a shareable .xlsx or .csv file",
      "Writing out the final step of a recurring extraction-and-cleanup workflow",
      "Producing a file for another tool or teammate to pick up outside Altera Studio",
    ],
    steps: [
      {
        title: "Connect your finished table",
        detail: "Pass the table you want to save into Export's input.",
      },
      {
        title: "Choose a destination",
        detail: "Pick an output file or folder using the native save dialog.",
      },
      {
        title: "Choose a format and run",
        detail:
          "Export to Excel (.xlsx) or CSV. Running the node writes the file to disk right away.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Accepts any table produced by an upstream node",
      "Column names with characters invalid in a filename are sanitized automatically",
    ],
    outputType: "File (.xlsx or .csv) — no table output",
    outputNotes: [
      "Has no output port — it's a deliberate dead end in the workflow",
      "Overwrites the destination file every time it runs",
      "Writes directly to disk since the app and its data live on the same machine",
    ],
    tips: [
      {
        type: "warning",
        title: "Every run overwrites the file",
        body: "Running Export again writes over the previous file at that path. Choose a new destination first if you need to keep both versions.",
      },
      {
        type: "info",
        title: "No further chaining",
        body: "Because Export has no output, it should be one of the last nodes in a branch — put any remaining cleanup before it, not after.",
      },
    ],
  },
  {
    id: "browse",
    name: "Browse",
    color: "#019B8A",
    icon: "👁️",
    svgIcon: "browse.svg",
    tagline:
      "Open a live, read-only preview of any table in your workflow without altering the data.",
    description:
      "A pure viewer. Connect any table to it and open the node to see its rows and columns rendered in a scrollable grid. It performs no transformation and has no output — it exists purely so you can inspect data at any point in your workflow.",
    useCases: [
      "Sanity-checking a table midway through a workflow before adding more steps",
      "Spot-checking the effect of the node you just configured",
      "Reviewing PDF Converter or Input Data output before building filters or transforms on top of it",
    ],
    steps: [
      {
        title: "Connect a table",
        detail: "Pass any upstream node's output into Browse's input.",
      },
      {
        title: "Open the node",
        detail: "Double-click, or right-click → Configure, to open the preview window.",
      },
      {
        title: "Scroll and inspect",
        detail: "Review rows and columns. The view reflects whatever data last ran through the connected node.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Accepts any table, any number of columns",
      "Column types shown are inferred for display purposes only — nothing about the data is changed",
    ],
    outputType: "None — Browse has no output port",
    outputNotes: [
      "Does not modify or forward data — it's a leaf you can drop anywhere for inspection",
      "Safe to add and remove freely; it never affects the rest of the workflow",
    ],
    tips: [
      {
        type: "info",
        title: "Cheaper than Export for checking your work",
        body: "Use Browse to confirm a step looks right before committing to an Export node — no file gets written, so there's nothing to clean up if the data isn't ready yet.",
      },
    ],
  },

  // ── Conversion ────────────────────────────────────────────────────────
  {
    id: "page_filter",
    name: "Page Filter",
    color: "#FE4D41",
    icon: "📃",
    svgIcon: "filter.svg",
    tagline:
      "Use a page-number column to tell PDF Converter which pages to actually convert.",
    description:
      "Feeds page selection into PDF conversion rather than transforming a table itself. Connect a table that has a page-number column, choose whether to keep only those pages or exclude them, and PDF Converter only processes the pages that pass — useful for skipping known-irrelevant pages in a large document before spending time annotating it.",
    useCases: [
      "Skipping cover pages, blank pages, or appendices in a long PDF",
      "Converting only the pages an earlier step flagged as relevant",
      "Limiting conversion to a known subset of pages in a very large report",
    ],
    steps: [
      {
        title: "Connect a table with page numbers",
        detail: "Pass in a table that has a column listing the page numbers you care about.",
      },
      {
        title: "Choose the action",
        detail: "Select 'Keep only pages' to convert just those pages, or 'Exclude pages' to convert everything else.",
      },
      {
        title: "Pick the page-number column",
        detail: "Choose which column in the connected table holds the page numbers.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The selected column's values are read as the page numbers to keep or exclude",
      "Only affects the PDF Converter's own conversion step — it doesn't produce a transformed table itself",
    ],
    outputType: "None — feeds page selection into PDF conversion",
    outputNotes: [
      "Has no output port of its own",
      "Pages outside the kept/excluded set are simply skipped during conversion, saving processing time",
    ],
    tips: [
      {
        type: "info",
        title: "Pair with Filter upstream",
        body: "Build a table of qualifying page numbers with Filter (or any other node), then feed it into Page Filter to drive which pages PDF Converter actually touches.",
      },
      {
        type: "warning",
        title: "Column, not page count",
        body: "The selected column must contain actual page numbers, not a row count or index — an unrelated numeric column will filter to the wrong pages.",
      },
    ],
  },

  // ── Preparation ───────────────────────────────────────────────────────
  {
    id: "column_manager",
    name: "Column Edit",
    color: "#155F98",
    icon: "🧱",
    svgIcon: "column_manager.svg",
    tagline:
      "Reorder, rename, and delete columns through a drag-and-drop list — no formulas, no code.",
    description:
      "A schema management step for your tables. Instead of writing code to rename or reorder columns, you work with a drag-and-drop list: drag a row to change column order, edit a name in place to rename it, or click the trash icon to remove a column from the output. Deleted columns move to a separate list and can be restored at any time before you close the node.",
    useCases: [
      "Cleaning up cryptic auto-generated column names from exports or PDF extraction",
      "Reordering columns before sending data to a report or export file",
      "Dropping irrelevant columns to simplify downstream steps",
    ],
    steps: [
      {
        title: "Reorder columns by drag and drop",
        detail: "Grab the handle on the left side of any row and drag it to its new position. Output column order follows the list.",
      },
      {
        title: "Rename a column",
        detail: "Click into the name field of any row and type the new name — the original column is untouched, only its outward name changes.",
      },
      {
        title: "Delete or restore a column",
        detail: "Click the trash icon to remove a column from the output; it moves to a Deleted list where it can be restored if you change your mind.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported",
      "If an upstream node starts emitting a new column, it's appended to the list automatically the next time you open Configure",
      "A previously referenced column that's no longer present upstream is dropped from the list automatically",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same data, with columns reordered, renamed, and/or removed according to your settings",
      "Deleted columns are excluded from the output entirely",
      "Column order in the output matches the order in the node's list",
    ],
    tips: [
      {
        type: "info",
        title: "Deletions are just omissions",
        body: "A column isn't erased from your data upstream — it's simply left out of this node's output. Restore it from the Deleted list any time before applying.",
      },
      {
        type: "warning",
        title: "Renames don't rename the source",
        body: "Renaming here only changes the label downstream nodes see from this point on — it doesn't rewrite the column anywhere upstream.",
      },
    ],
  },
  {
    id: "change_type",
    name: "Change Type",
    color: "#155F98",
    icon: "🔢",
    svgIcon: "change_type.svg",
    tagline:
      "Convert a column's values to a clean Number, Text, or Date form, with a fallback for values that won't convert.",
    description:
      "Coerces a column's cell values into a clean form of the type you pick — Text, Number, or Date — rather than flipping an abstract schema flag. Converting to Number tolerates thousands separators like commas; converting to Date accepts most common real-world date formats. Values that can't convert either block the run with an error naming which cells failed, or get replaced with a fallback value you choose, depending on how you configure it.",
    useCases: [
      "Turning a numeric-looking text column (e.g. \"1,234.50\") into real numbers before an Aggregate or Sort step",
      "Normalizing inconsistent date formats after a PDF extraction",
      "Confirming a column is fully clean by letting invalid values raise an error instead of silently passing through",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Change Type — every column gets its own row, pre-selected to whatever type its current values look like.",
      },
      {
        title: "Set the target type per column",
        detail: "Choose Text, Number, or Date for each column you want to convert.",
      },
      {
        title: "Decide how to handle failures",
        detail: "Leave the fallback off to have any unconvertible cell block the run with a detailed error, or turn it on and supply a fallback value to use instead.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Every value on the wire is text, so \"changing type\" means cleaning up the cell values themselves, not flipping a schema flag",
      "Number conversion strips thousands separators (commas) automatically before parsing",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Converted columns come back as clean strings in the target type's own format (e.g. dates always normalize to YYYY-MM-DD)",
      "With the fallback off, any conversion failure stops the run and names the offending columns and cell counts",
      "With the fallback on, failing cells get the fallback value and the run reports a warning with the same counts, instead of an error",
    ],
    tips: [
      {
        type: "info",
        title: "Dates always normalize to YYYY-MM-DD",
        body: "Whatever format the source date is in — MM/DD/YYYY, \"Jan 5, 2024\", etc. — converting to Date drops any time component and outputs a plain YYYY-MM-DD string.",
      },
      {
        type: "warning",
        title: "Off by default means strict",
        body: "With the fallback disabled, a single bad cell in a large column stops the whole run. Turn on the fallback if you'd rather patch bad values and keep going.",
      },
    ],
  },
  {
    id: "shift_columns",
    name: "Shift Columns",
    color: "#155F98",
    icon: "↕️",
    svgIcon: "multishift.svg",
    tagline:
      "Shift the row values of selected columns up or down by any number of steps — several columns at once, each with its own settings.",
    description:
      "Moves the values inside selected columns up or down by a number of rows you define, like pandas' own Series.shift — the column stays where it is, only the values inside it move relative to the row index. Multiple columns can be shifted in the same pass, each with its own step count and direction. Cells that fall outside the original row range after shifting are left blank.",
    useCases: [
      "Creating lag or lead columns for period-over-period comparisons",
      "Aligning one column's values with a different row in another column",
      "Correcting a systematic row offset introduced during extraction, where some columns are one or more rows out of step",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any data table into the node's input — the column list populates automatically.",
      },
      {
        title: "Select a column and its shift amount",
        detail: "Pick the column to shift, set how many rows to shift it by, and choose Up or Down.",
      },
      {
        title: "Add more columns if needed",
        detail: "Each additional column gets its own step count and direction. All shifts apply in a single pass.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported",
      "Columns not included in a shift entry pass through unchanged",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same number of rows and columns as the input — cells shifted past the original range are left blank",
      "All configured shifts are applied simultaneously in one pass",
    ],
    tips: [
      {
        type: "info",
        title: "Shifting down empties the top rows",
        body: "Shifting a column down by N steps leaves the first N rows blank. Shifting up leaves the last N rows blank instead.",
      },
      {
        type: "warning",
        title: "Large step counts can empty a whole column",
        body: "Shifting by more steps than there are rows leaves the entire column blank. Double-check your step count before connecting downstream nodes.",
      },
    ],
  },
  {
    id: "header_promoter",
    name: "Header Promoter",
    color: "#155F98",
    icon: "⬆️",
    svgIcon: "header_promoter.svg",
    tagline:
      "When your real column headers are sitting in a data row, one click moves them to where they belong.",
    description:
      "Solves a common import problem: the file reader assigns generic column names while the actual headers are sitting in a row of data — common straight out of PDF Converter or a CSV with a title row. Header Promoter moves the row you pick up to become the column header row, then either removes just that row or every row at or above it.",
    useCases: [
      "PDF Converter or CSV output where the first extracted row is really the header",
      "Tables with a title row above the real header, where everything above the header should be dropped",
      "Any import with generic column names that need real labels before further processing",
    ],
    steps: [
      {
        title: "Identify the header row",
        detail: "Connect your raw table and review it in Browse to find the row number containing the real column labels.",
      },
      {
        title: "Set the row number",
        detail: "The default is row 1 (the first data row). Change it if your real header sits further down.",
      },
      {
        title: "Choose what to remove",
        detail: "Remove just the promoted row, or everything at or above it, if there are title rows to discard too.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The chosen row's values become the new column headers",
      "Numeric values in that row are converted to text for use as column names",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same data minus the promoted row (and anything above it, if selected), with columns renamed to that row's values",
      "If two cells in the promoted row share the same value, a numeric suffix keeps the resulting column names unique",
      "A blank cell in the promoted row falls back to the column's existing name rather than becoming an empty header",
    ],
    tips: [
      {
        type: "info",
        title: "Use before Column Edit",
        body: "Header Promoter followed by Column Edit is a natural sequence: promote real names first, then rename, reorder, or drop columns with meaningful labels to work from.",
      },
      {
        type: "warning",
        title: "Row numbering starts at 1",
        body: "Row 1 means the first data row — not a zero-based index. Out-of-range row numbers raise an error naming the table's actual row count.",
      },
    ],
  },
  {
    id: "index_column",
    name: "Index Column",
    color: "#155F98",
    icon: "🔢",
    svgIcon: "index.svg",
    tagline:
      "Add a simple row-index column numbered 1 to N — no configuration needed.",
    description:
      "Prepends a plain sequential column, numbered 1 through the number of rows in the table. There's nothing to configure — connect a table and it runs automatically, the same way a couple of other very simple nodes in the catalog do.",
    useCases: [
      "Giving every row a stable reference number before splitting or filtering a table",
      "Restoring original row order after a Sort or Pivot step, by capturing it before that step runs",
      "Creating a simple unique key for a table that otherwise has none",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Index Column's input.",
      },
      {
        title: "Run",
        detail: "No further configuration is needed — the index column is added automatically.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Works with any table, any column types",
      "If a column is already literally named \"Index\", it's renamed automatically so the new column can take that name",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Adds one new column, always named \"Index\" (or a de-duplicated variant), as the first column",
      "Values run 1 to N in the table's current row order",
    ],
    tips: [
      {
        type: "info",
        title: "Place it before any row-reordering step",
        body: "Add Index Column early if you want a record of the original row order — run it before Sort, Pivot Columns, or anything else that reshuffles rows.",
      },
    ],
  },
  {
    id: "filter",
    name: "Filter",
    color: "#155F98",
    icon: "🔽",
    svgIcon: "filter.svg",
    tagline:
      "Compose multi-condition row filters through a visual logic builder — no formulas, no syntax errors.",
    description:
      "Lets you define row-filtering logic through a structured, point-and-click interface with full type preservation. Conditions are grouped, and groups combine with AND logic at the top level; within a group, conditions can use either AND or OR. An optional second Extra Data input lets a condition match against values found in a column of another table, not just literal values you type in.",
    useCases: [
      "Removing known-bad rows such as nulls, test entries, or outliers from raw data",
      "Applying business rules (e.g. Revenue > 1,000 AND Status = Active) as a reusable step",
      "Isolating annotated sections by color — if a PDF Converter output contains rows from multiple highlighted areas, filter down to just one",
      "Matching rows against a reference list connected to the Extra Data input, instead of typing values by hand",
    ],
    steps: [
      {
        title: "Connect a data table",
        detail: "Connect any upstream node's output to Filter's main input. The column list populates automatically.",
      },
      {
        title: "Add a group and its conditions",
        detail: "Click Add Group, then Add Condition. Pick a column — available operators adjust to its type — and fill in a value.",
      },
      {
        title: "Set the group's AND/OR connector",
        detail: "A group defaults to AND (every condition must match). Switch to OR for rows matching any condition inside it.",
      },
      {
        title: "Add more groups for compound logic",
        detail: "Additional groups always combine with AND, letting you express logic like (Country = France OR Germany) AND (Revenue > 10,000).",
      },
    ],
    inputType: "Data Table (plus an optional Extra Data table)",
    inputNotes: [
      "Column list populates automatically from the connected table",
      "Categorical columns show a value dropdown instead of a free-text field",
      "The square Extra Data input is optional — connect it only when a condition needs to match against another table's values",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns as input — only the row set changes",
      "If no conditions are defined, all rows pass through unchanged",
    ],
    tips: [
      {
        type: "info",
        title: "Categorical value picker",
        body: "For categorical columns, the value field lists every unique value from the connected data — no typing needed.",
      },
      {
        type: "warning",
        title: "Unfilled condition rows match everything",
        body: "A condition row with no value entered matches every row. Fill it in or delete it before relying on the filter's output.",
      },
    ],
  },
  {
    id: "unique",
    name: "Unique",
    color: "#155F98",
    icon: "🧹",
    svgIcon: "deduplicator.svg",
    tagline:
      "Remove duplicate rows based on a set of key columns you choose, keeping the first, last, or none of each group.",
    description:
      "A targeted deduplication step. You pick exactly which columns define what counts as a duplicate — useful when the full row isn't identical but a meaningful identifier, such as an invoice number, repeats. For each group of rows sharing the same key, keep the first occurrence, the last, or drop the entire group (including the first) with 'Remove all'.",
    useCases: [
      "Removing duplicate invoice or transaction rows from a repeated export",
      "Deduplicating customer records where the same person appears more than once",
      "Discarding every row of a group entirely with 'Remove all', to isolate exceptions that need manual review",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass your table into Unique — the column list populates automatically.",
      },
      {
        title: "Select key columns",
        detail: "Choose which columns define uniqueness — a single Invoice Number column, or a composite key like First Name + Last Name + Email.",
      },
      {
        title: "Choose First, Last, or Remove all",
        detail: "First keeps the earliest row in each duplicate group; Last keeps the most recent; Remove all drops every row in a duplicate group.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported as key columns",
      "A row is only flagged as a duplicate if every selected key column matches another row (composite-key matching)",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns as input — only duplicate rows are removed",
      "Row order among the rows that survive is preserved",
    ],
    tips: [
      {
        type: "info",
        title: "Composite keys avoid over-collapsing",
        body: "Selecting several columns as the key means a row only counts as a duplicate when all of them match — this avoids collapsing rows that share one value but differ in others.",
      },
      {
        type: "warning",
        title: "'Remove all' drops the originals too",
        body: "Unlike First/Last, 'Remove all' removes every row in a duplicate group, including the one you might expect to survive. Use it deliberately.",
      },
    ],
  },
  {
    id: "cascade_fill",
    name: "Cascade Fill",
    color: "#155F98",
    icon: "🌊",
    svgIcon: "cascade_fill.svg",
    tagline:
      "Fill up or down to propagate a column's last-seen value into the empty cells around it.",
    description:
      "Fills blank cells in selected columns by carrying the nearest real value forward or backward — Fill Down copies the previous non-blank value into every blank cell after it, Fill Up does the same moving upward. Blank cells (\"\"), \"?\", and any custom values you list are all treated as gaps to fill. Common right after PDF extraction, where a value that visually spans several rows is only ever captured once.",
    useCases: [
      "Filling in a merged-cell value from a PDF or Excel export that only appears once per group",
      "Propagating a category or section label down through the rows it applies to",
      "Treating placeholder text like \"N/A\" or \"—\" as blank and filling over it with custom null values",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Cascade Fill's input.",
      },
      {
        title: "Select the columns to fill",
        detail: "Choose one or more columns whose blank cells should be filled.",
      },
      {
        title: "Choose a direction",
        detail: "Fill Down propagates the previous value forward; Fill Up propagates the next value backward.",
      },
      {
        title: "Add custom null values (optional)",
        detail: "List any additional placeholder text (beyond blank and \"?\") that should also be treated as a gap to fill.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Blank cells and literal \"?\" cells are treated as gaps by default",
      "Any values you add as custom nulls are treated as gaps too, in addition to the defaults",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same shape as input — only cell values in the selected columns change",
      "Leading (Fill Down) or trailing (Fill Up) cells with nothing to propagate from are left blank",
    ],
    tips: [
      {
        type: "info",
        title: "Pairs well with PDF Converter",
        body: "A value that visually spans several rows in a source PDF is usually only captured on its first row — Cascade Fill (Down) is the standard fix.",
      },
      {
        type: "warning",
        title: "Only fills what's marked as blank",
        body: "A cell containing stray whitespace or an unlisted placeholder isn't touched unless it's genuinely empty, \"?\", or one of your custom null values — run Cleaner first if formatting is inconsistent.",
      },
    ],
  },
  {
    id: "cleaner",
    name: "Cleaner",
    color: "#155F98",
    icon: "✨",
    svgIcon: "cleaner.svg",
    tagline:
      "Build an ordered list of text-cleaning operations — trim, case, strip, replace — and apply them to any columns.",
    description:
      "A multi-operation text normalization step. You build an ordered list of operations (Find & Replace, Trim Whitespace, Remove Extra Spaces, Remove Special Characters, UPPERCASE/lowercase/Title Case, Remove/Keep Digits, Remove Punctuation, Strip Specific Characters, Remove Prefix/Suffix, Fill Blank/Null Values), each targeting one or more columns you choose, and they run in order. Designed as an early step in a workflow, right after import or extraction, before formatting inconsistencies can break a filter or deduplication step downstream.",
    useCases: [
      "Removing leading and trailing whitespace that silently breaks filters and joins",
      "Standardizing inconsistent capitalization in a category column before analysis",
      "Stripping unwanted characters (currency symbols, stray punctuation) before a Change Type conversion",
      "Filling blank cells with a placeholder value using Fill Blank/Null Values",
    ],
    steps: [
      {
        title: "Place Cleaner early in your workflow",
        detail: "Connect it right after your import or extraction step, before filters or deduplication that formatting issues could silently break.",
      },
      {
        title: "Add an operation",
        detail: "Pick an operation (e.g. Trim Whitespace), the column(s) it should apply to, and any parameters it needs (like Find & Replace's search text).",
      },
      {
        title: "Chain more operations as needed",
        detail: "Add as many operations as you need — they apply to their selected columns in the order you listed them.",
      },
      {
        title: "Verify downstream",
        detail: "Connect the output to Browse and spot-check a few cells from each cleaned column.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Every value is treated as text for the purposes of cleaning, regardless of its original type",
      "Different operations can target different sets of columns independently",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns and row count — only cell values in the columns you targeted are modified",
      "Columns untouched by any operation pass through unchanged, including their inferred type",
    ],
    tips: [
      {
        type: "info",
        title: "Trim Whitespace catches the most common silent issue",
        body: "Trailing spaces are invisible in most table views but break exact-match filters and deduplication. Running Trim Whitespace on a fresh import takes seconds.",
      },
      {
        type: "warning",
        title: "Case changes are one-way",
        body: "UPPERCASE, lowercase, and Title Case operations don't preserve the original casing anywhere — keep a duplicate column first if you need to compare against the original later.",
      },
    ],
  },
  {
    id: "formula",
    name: "Formula",
    color: "#155F98",
    icon: "🧮",
    svgIcon: "formula.svg",
    tagline:
      "Add a new column computed from a formula referencing other columns — like Power Query's Add Custom Column.",
    description:
      "Adds one new column computed from a formula you write, evaluated one row at a time. Reference other columns with square brackets, like [Amount] * [Quantity], and combine them with arithmetic operators, comparisons, and a small set of built-in functions (such as IF/AND/OR). The formula is parsed and only ever executes an allow-listed set of safe operations — never arbitrary code — so a typo produces a clear error rather than an unpredictable result.",
    useCases: [
      "Computing a derived value like Total = [Price] * [Quantity]",
      "Building a simple flag column from a comparison, e.g. [Status] == \"Active\"",
      "Combining several columns into one computed summary column",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Formula's input — the column list is available to reference in your formula.",
      },
      {
        title: "Name the new column",
        detail: "Give the output column a name.",
      },
      {
        title: "Write the formula",
        detail: "Reference existing columns with [Column Name] and combine them with operators — e.g. [Amount] - [Discount].",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Reference columns using square brackets: [Column Name]",
      "Supports standard arithmetic (+ - * / %  ^), comparisons, and a small set of built-in functions",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Every existing column keeps its exact name and value — only the new computed column is added",
      "If the chosen name collides with an existing column, a numeric suffix is added automatically",
    ],
    tips: [
      {
        type: "info",
        title: "Square brackets reference columns",
        body: "[Column Name] pulls that column's value for the current row into the formula — brackets are required, a bare column name is treated as invalid syntax.",
      },
      {
        type: "warning",
        title: "Only a safe formula subset runs",
        body: "Arbitrary code, imports, and function calls outside the built-in allow-list are rejected before any row is evaluated — you'll get an error explaining what wasn't understood, not a partial result.",
      },
    ],
  },
  {
    id: "add_column",
    name: "Add Column",
    color: "#155F98",
    icon: "🧩",
    svgIcon: "conditional_column.svg",
    tagline:
      "Add a new column based on an ordered list of conditions — like Power Query's Add Conditional Column.",
    description:
      "Adds one new column whose value depends on which of an ordered list of condition clauses a row matches first. Each clause uses the same AND/OR condition-group logic as the Filter node, paired with an output value for rows that match it. Clauses are evaluated top to bottom and the first match wins — a row already claimed by an earlier clause is never reconsidered. Any row matching no clause falls through to a required Else value. Output values can be plain text, or a formula like [Amount] using the same syntax as the Formula node.",
    useCases: [
      "Bucketing a numeric column into labeled ranges (e.g. Low / Medium / High)",
      "Flagging rows that match a business rule with a readable label instead of a raw boolean",
      "Choosing between several possible source columns' values depending on which condition a row meets",
    ],
    steps: [
      {
        title: "Connect your table and name the column",
        detail: "Pass a table into Add Column's input and give the new output column a name.",
      },
      {
        title: "Build your first clause",
        detail: "Add a condition group (same AND/OR builder as Filter) and set the value to output when it matches.",
      },
      {
        title: "Add more clauses in priority order",
        detail: "Add additional clauses below — they're checked top to bottom, and the first one that matches a row wins.",
      },
      {
        title: "Set the Else value",
        detail: "Provide a required fallback value for any row that matches none of your clauses.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Each clause's conditions use the same column-and-operator builder as the Filter node",
      "Output values can be a literal (\"High\") or a formula referencing a column, like [Amount]",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Every existing column keeps its exact name and value — only the new column is added",
      "A row is assigned by the first matching clause only; later clauses never override it",
    ],
    tips: [
      {
        type: "info",
        title: "Order matters",
        body: "Clauses are evaluated top to bottom and the first match wins — put your most specific conditions before broader, catch-all ones.",
      },
      {
        type: "warning",
        title: "Else is required",
        body: "Every row must resolve to some value, so a fallback Else value is mandatory even if you expect every row to match a clause.",
      },
    ],
  },
  {
    id: "bridge",
    name: "Bridge",
    color: "#155F98",
    icon: "🌉",
    svgIcon: "bridge.svg",
    tagline:
      "Passes its input straight through unchanged — a tidy junction point for organizing a busy workflow.",
    description:
      "A pure pass-through with no configuration and no transformation — it hands its input straight to whatever's connected downstream. Its only purpose is visual and organizational: giving a single, tidy point to route one table's output out to several downstream branches, the same role a wire junction plays in a schematic.",
    useCases: [
      "Fanning one table's output out to several downstream nodes from a single tidy point",
      "Untangling a workflow where wires would otherwise cross awkwardly on the canvas",
      "Marking a meaningful checkpoint in a long chain of transforms without changing the data",
    ],
    steps: [
      {
        title: "Connect an upstream table",
        detail: "Pass any table into Bridge's input.",
      },
      {
        title: "Connect it onward",
        detail: "Wire Bridge's output to as many downstream nodes as you like — each receives the exact same table.",
      },
    ],
    inputType: "Data Table",
    inputNotes: ["Accepts any table — nothing about it is inspected or validated"],
    outputType: "Data Table",
    outputNotes: [
      "Identical to the input — every column, row, and value passes through unchanged",
      "Can feed any number of downstream nodes",
    ],
    tips: [
      {
        type: "info",
        title: "Purely organizational",
        body: "Bridge has no effect on your data whatsoever — use it freely to keep a complex canvas readable without worrying about changing results.",
      },
    ],
  },
  {
    id: "sort",
    name: "Sort",
    color: "#155F98",
    icon: "↕️",
    svgIcon: "sort.svg",
    tagline:
      "Sort rows by one or more columns, ascending or descending — like Excel's Sort dialog.",
    description:
      "Sorts a table's rows by one or more key columns, each with its own ascending or descending direction. A column sorts numerically only when every one of its non-blank values parses as a number — otherwise it falls back to a plain text sort, so a stray label never ends up treated as smaller or larger than a real number. Blank cells always sort last, matching Excel's own behavior, regardless of the column's direction.",
    useCases: [
      "Ordering rows by date, amount, or ID before review or export",
      "Sorting by a primary column, then a secondary tie-breaker column",
      "Bringing the highest or lowest values in a column to the top for quick scanning",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Sort's input.",
      },
      {
        title: "Add a sort key",
        detail: "Choose a column and its direction (ascending or descending).",
      },
      {
        title: "Add more keys for ties",
        detail: "Add additional columns to break ties in the order they're listed.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Any column can be a sort key, numeric or text",
      "A sort key referencing a column that doesn't exist is skipped with a warning rather than failing the run",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns and rows as input, reordered",
      "Blank cells in a sort key always sort last, regardless of that key's direction",
    ],
    tips: [
      {
        type: "info",
        title: "Numeric detection is per-column",
        body: "A column sorts as numbers only if every non-blank value in it parses as one — a single text value like \"N/A\" falls the whole column back to a text sort.",
      },
    ],
  },

  // ── Transform ─────────────────────────────────────────────────────────
  {
    id: "unpivot_columns",
    name: "Unpivot Columns",
    color: "#FFD800",
    icon: "🔀",
    svgIcon: "unpivot.svg",
    tagline:
      "Turn selected columns into Attribute/Value row pairs — like Power Query's Unpivot Columns.",
    description:
      "Converts wide data to long/tidy data. Select the columns you want to unpivot; every other column is treated as an identifier and repeats across the new rows it produces. Each selected column becomes one output row per original row, with an Attribute column holding the original column name and a Value column holding its value.",
    useCases: [
      "Turning several period columns (Jan, Feb, Mar, ...) into one Month/Value pair for time-series analysis",
      "Reshaping a wide export into the long format most charting and pivot tools expect",
      "Preparing data for Pivot Columns downstream, or for a Group By step",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass a wide table into Unpivot Columns' input.",
      },
      {
        title: "Select the columns to unpivot",
        detail: "Choose the columns to convert — everything else stays as an identifier column.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Columns not selected are treated as identifiers and repeat across the new rows",
      "Any column type can be unpivoted",
    ],
    outputType: "Data Table",
    outputNotes: [
      "One output row per original row × selected column",
      "Adds an \"Attribute\" column (the original column name) and a \"Value\" column (its value); a numeric suffix is added if either name collides with an existing identifier column",
    ],
    tips: [
      {
        type: "info",
        title: "Select what to convert, not what to keep",
        body: "You choose the columns being unpivoted — everything else is automatically kept as an identifier, matching Power Query's own Unpivot Columns command.",
      },
    ],
  },
  {
    id: "pivot_columns",
    name: "Pivot Columns",
    color: "#FFD800",
    icon: "🔃",
    svgIcon: "pivot.svg",
    tagline:
      "Turn a labels column into new column headers and a values column into their contents — like Power Query's Pivot Column.",
    description:
      "The reverse of Unpivot Columns. Pick a Labels column (its unique values become new column headers) and a Values column (what lands under them); every other column is an identifier, and rows sharing the same identifier(s) combine into one output row. With no other identifier columns present — the most common case, reconstructing an Unpivot Columns output back to its original shape — rows are matched up purely by position instead.",
    useCases: [
      "Reconstructing a table back into its original wide shape after an Unpivot Columns step",
      "Turning a long Category/Value table into one column per category",
      "Building a cross-tab summary from a long transaction log",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass a long/tidy table into Pivot Columns' input.",
      },
      {
        title: "Choose the Labels column",
        detail: "Pick the column whose unique values become the new column headers.",
      },
      {
        title: "Choose the Values column",
        detail: "Pick the column whose values land in the new columns. Every remaining column is treated as an identifier.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The Labels and Values columns must be two different columns",
      "Any column that isn't the Labels or Values column is used as an identifier to group rows",
    ],
    outputType: "Data Table",
    outputNotes: [
      "New columns are ordered by the labels' first appearance in the source table, not alphabetically",
      "With no identifier columns, rows combine purely by position — each full cycle through the labels becomes one output row",
    ],
    tips: [
      {
        type: "info",
        title: "The natural undo for Unpivot Columns",
        body: "Pivot Columns is commonly used right after Unpivot Columns, using the same Attribute/Value columns Unpivot Columns produced, to get back to a wide shape after reshaping in between.",
      },
      {
        type: "warning",
        title: "Pick two different columns",
        body: "Labels and Values must be different columns — selecting the same column for both raises an error.",
      },
    ],
  },
  {
    id: "group_by",
    name: "Group By",
    color: "#FFD800",
    icon: "🗂️",
    svgIcon: "group_by.svg",
    tagline:
      "Group rows by one column, then calculate metrics for every group — one output row per group.",
    description:
      "Groups a table by exactly one column and computes one or more metrics (Sum, Average, Count, Min, Max, First value, Last value, or Nth occurrence) per group, producing one output row per distinct value in the grouping column. Unlike Aggregate, which collapses an entire table into a single row, Group By keeps groups separate — the grouping column's value becomes the identifying first column of each output row.",
    useCases: [
      "Totaling amounts per customer, category, or region",
      "Counting how many rows fall into each status or category",
      "Finding the min/max value within each group, e.g. the latest date per account",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Group By's input.",
      },
      {
        title: "Choose the grouping column",
        detail: "Select exactly one column to group rows by.",
      },
      {
        title: "Add metrics",
        detail: "Pick one or more columns and an aggregation (Sum, Average, Count, Min, Max, First, Last, or Nth occurrence) for each.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Exactly one grouping column is required",
      "At least one metric must be configured",
    ],
    outputType: "Data Table",
    outputNotes: [
      "One row per distinct value in the grouping column, plus one column per configured metric",
      "Count, Sum, Average, Min, and Max ignore blank cells in the source column",
    ],
    tips: [
      {
        type: "info",
        title: "One row per group, not one row total",
        body: "If you want the whole table collapsed into a single summary row instead, use the Aggregate node — Group By always keeps groups separate.",
      },
    ],
  },

  // ── Join ──────────────────────────────────────────────────────────────
  {
    id: "horizontal_stack",
    name: "Horizontal Stack",
    color: "#7753A0",
    icon: "↔️",
    svgIcon: "horizontal_stack.svg",
    tagline:
      "Combine two or more tables side by side, matching rows purely by position.",
    description:
      "Concatenates tables column-wise by position, not by any shared key — row 1 of every input lines up with row 1 of the output, and so on. Needs at least two connected tables. If the inputs have different row counts, the shorter one is padded with blank values by default (or the run can be made to fail instead, if you'd rather catch mismatched inputs explicitly).",
    useCases: [
      "Placing two independently-produced tables side by side when their rows are already known to correspond",
      "Combining columns extracted from two different areas of the same PDF page, in the same row order",
      "Appending a fixed set of extra columns you've computed separately onto an existing table",
    ],
    steps: [
      {
        title: "Connect two or more tables",
        detail: "Wire at least two upstream tables into Horizontal Stack's input.",
      },
      {
        title: "Decide how to handle mismatched row counts",
        detail: "Leave padding on to pad the shorter table with blanks, or turn it off to require all inputs to have the same row count.",
      },
    ],
    inputType: "Two or more Data Tables",
    inputNotes: [
      "Rows are matched purely by position — not by any shared column value",
      "Column name collisions across inputs are automatically de-duplicated with a numeric suffix",
    ],
    outputType: "Data Table",
    outputNotes: [
      "All columns from every input table, concatenated side by side",
      "If row counts differed and padding is on, a warning is reported and the shorter table's missing cells are blank",
    ],
    tips: [
      {
        type: "warning",
        title: "Position-based, not key-based",
        body: "If your tables' rows don't already correspond 1-to-1 in order, use Merge instead — it can match rows on shared column values rather than raw position.",
      },
    ],
  },
  {
    id: "merge",
    name: "Merge",
    color: "#7753A0",
    icon: "🔗",
    svgIcon: "merge.svg",
    tagline:
      "Combine two tables by matching rows on shared columns or row position, with a choice of join type.",
    description:
      "Modeled on a standard data-prep merge: pick a primary table and an Extra Data table, choose how to match rows — one or more shared column pairs (attribute matching) or plain row position — and choose a join type: Append Columns (left join — every primary row is kept, unmatched Extra Data columns are blank), Find Matching Pairs (inner join — only rows present in both survive), or Concatenate Tables (outer join — every row from both sides is kept, with blanks filling in any gaps).",
    useCases: [
      "Looking up extra columns from a reference table by a shared ID or key",
      "Keeping only the rows that exist in both of two related tables",
      "Combining two tables' full contents into one, retaining rows unique to either side",
    ],
    steps: [
      {
        title: "Connect both tables",
        detail: "Connect your primary table to Merge's main input and the second table to its Extra Data input.",
      },
      {
        title: "Choose how to match rows",
        detail: "Match by one or more shared column pairs, or by row position if the tables are already aligned.",
      },
      {
        title: "Choose the join type",
        detail: "Append Columns (left join), Find Matching Pairs (inner join), or Concatenate Tables (outer join).",
      },
    ],
    inputType: "Primary Data Table + Extra Data Table",
    inputNotes: [
      "Requires both a primary input and a connected Extra Data table",
      "When matching by attributes, at least one column pair must be selected",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Columns from both tables are combined; a name collision on the Extra Data side gets an \"_extra\" suffix",
      "Append Columns keeps every primary row even without a match; Find Matching Pairs keeps only matched rows; Concatenate Tables keeps every row from both sides",
    ],
    tips: [
      {
        type: "info",
        title: "Three join types map to familiar SQL joins",
        body: "Append Columns = left join, Find Matching Pairs = inner join, Concatenate Tables = outer join — pick based on whether unmatched rows from either side should survive.",
      },
      {
        type: "warning",
        title: "Row-position matching needs aligned tables",
        body: "Matching by row position only makes sense when both tables' rows already correspond in order — if they don't, match by shared columns instead.",
      },
    ],
  },
  {
    id: "concatenate",
    name: "Concatenate",
    color: "#7753A0",
    icon: "➕",
    svgIcon: "concatenate.svg",
    tagline:
      "Stack two or more tables' rows into one, matching columns by name.",
    description:
      "Stacks every connected table's rows into a single table, matching columns by name across however many tables are connected — the opposite axis from Horizontal Stack, which combines column-wise by position instead. A column present in only some of the input tables is left blank for rows coming from a table that didn't have it, rather than being dropped or causing an error.",
    useCases: [
      "Combining several months' worth of exports, each with the same columns, into one table",
      "Merging tables from different sources that share most but not all column names",
      "Stacking output from multiple PDF Converter or Filter branches back into one table",
    ],
    steps: [
      {
        title: "Connect two or more tables",
        detail: "Wire at least two upstream tables into Concatenate's input.",
      },
      {
        title: "Run",
        detail: "No further configuration is needed — rows from every connected table are stacked automatically, matched by column name.",
      },
    ],
    inputType: "Two or more Data Tables",
    inputNotes: [
      "Columns are matched by NAME, not position — unlike Horizontal Stack",
      "Needs at least two connected tables",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Column order follows first appearance: every column from the first table, then any new columns later tables introduce",
      "A row from a table missing a given column gets a blank value for it, rather than the column being dropped",
    ],
    tips: [
      {
        type: "info",
        title: "Column names must match exactly",
        body: "Concatenate matches purely on column name — run Column Edit first on any table with differently-named but equivalent columns so they line up.",
      },
    ],
  },

  // ── Parse ─────────────────────────────────────────────────────────────
  {
    id: "regular_expressions",
    name: "Regular Expressions",
    color: "#E86F53",
    icon: "🔍",
    svgIcon: "regex.svg",
    tagline:
      "Extract regex matches from a column into new columns, with a live match preview and three extraction modes.",
    description:
      "Applies a regular expression pattern to a text column and extracts matching content into new columns, with a live preview as you type. Three modes cover different needs: Smart Extract takes the first match per cell and, if your pattern has capture groups, also adds one column per group. Precision Capture outputs only the capture-group values (no whole-match column), packed left to right — ideal for structured multi-part extraction. Greedy Collect captures every match per cell, one column per match position, so the number of output columns is set by whichever row has the most matches.",
    useCases: [
      "Extracting dates, amounts, reference numbers, or codes from freeform text",
      "Pulling several named parts out of a structured string in one pass with Precision Capture",
      "Collecting every occurrence of a pattern from a long text field with Greedy Collect",
    ],
    steps: [
      {
        title: "Connect a table and pick the source column",
        detail: "Pass a table with a text column into the node, then choose the column to extract from.",
      },
      {
        title: "Write your pattern",
        detail: "Type a regular expression into the pattern field. The preview updates live to show what it matches.",
      },
      {
        title: "Choose an extraction mode",
        detail: "Smart Extract for a first-match column (plus one per group), Precision Capture for just the capture groups, or Greedy Collect for every match.",
      },
      {
        title: "Name the output column",
        detail: "Enter a base name for the new column(s) — in Greedy Collect mode, extra matches get a numbered suffix (Name_1, Name_2, ...).",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The pattern is applied to a single text column you select",
      "An invalid pattern is reported with the underlying regex error before anything runs",
    ],
    outputType: "Data Table",
    outputNotes: [
      "The input table is returned with new columns appended — original columns are untouched",
      "Rows with no match receive a blank value in the corresponding output column",
    ],
    tips: [
      {
        type: "info",
        title: "Smart Extract keeps the whole match, plus its groups",
        body: "If your pattern has capture groups, Smart Extract still gives you the full match in the first column and each group in its own column after it.",
      },
      {
        type: "warning",
        title: "Greedy Collect's column count depends on your data",
        body: "The number of output columns is set by the row with the most matches — if most rows have 1–2 matches but one has 10, you'll get 10 output columns, mostly blank.",
      },
    ],
  },
  {
    id: "text_parser",
    name: "Text Parser",
    color: "#E86F53",
    icon: "✂️",
    svgIcon: "text_parser.svg",
    tagline:
      "No-code text extraction and splitting — before/after/between delimiters, character ranges, and delimiter splits.",
    description:
      "Power Query's own Extract/Split Column toolset, for the common text-parsing cases that don't need a real regex pattern. Build an ordered list of operations, each reading one source column: Text Before/After/Between a delimiter, First/Last N Characters, a character-position Range, or Split by Delimiter (into one column per part). Each operation adds new column(s) rather than modifying the source column in place.",
    useCases: [
      "Splitting a concatenated \"City, State\" field into two clean columns",
      "Pulling the text before an \"@\" out of an email column",
      "Grabbing a fixed-width substring from a code or reference field",
    ],
    steps: [
      {
        title: "Connect a table with text data",
        detail: "Pass any table with a text column into Text Parser's input.",
      },
      {
        title: "Add an operation",
        detail: "Pick a source column and an operation — Text Before/After/Between, First/Last Characters, Range, or Split by Delimiter — and fill in its parameters.",
      },
      {
        title: "Name the output and chain more operations",
        detail: "Give the new column a base name. Add more operations as needed; each runs against the original source data and adds its own columns.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Each operation reads a single source column you choose",
      "Split by Delimiter can produce a variable number of columns — the row with the most parts sets the column count",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Original columns are untouched — every operation only adds new columns",
      "Split by Delimiter names its output columns with a numbered suffix (Name_1, Name_2, ...) when it produces more than one part",
    ],
    tips: [
      {
        type: "info",
        title: "No pattern required",
        body: "For simple delimiter-based extraction, Text Parser is faster to set up than Regular Expressions — reach for Regular Expressions when you need real pattern matching instead.",
      },
    ],
  },

  // ── Analysis ──────────────────────────────────────────────────────────
  {
    id: "summary",
    name: "Summary",
    color: "#9BB058",
    icon: "📊",
    svgIcon: "summary.svg",
    tagline:
      "Per-column stats, distributions, and missing-value/gap detection — a quick health check of a table.",
    description:
      "A read-only analysis view, computed instantly with no configuration. For every column it shows the count of missing values, the number of unique values, and — for columns where every non-blank value parses as a number — a min/max/mean/sum summary with a histogram. It's the fastest way to sanity-check a table's shape and spot data-quality problems without scrolling through raw rows in Browse.",
    useCases: [
      "Spotting columns with unexpectedly high missing-value counts after an extraction step",
      "Confirming a column is fully numeric before feeding it into Aggregate or Change Type",
      "Getting a quick sense of a column's value distribution before deciding how to filter or group it",
    ],
    steps: [
      {
        title: "Connect a table",
        detail: "Pass any table into Summary's input.",
      },
      {
        title: "Open the node",
        detail: "Open Summary to see per-column stats computed automatically — no configuration needed.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "A column counts as numeric only if every one of its non-blank values parses as a plain number",
      "Stats recompute automatically whenever the connected table's data changes",
    ],
    outputType: "None — Summary has no output port",
    outputNotes: [
      "Purely a viewer, like Browse — it doesn't modify or forward data",
      "Safe to attach anywhere in a workflow for inspection without affecting downstream nodes",
    ],
    tips: [
      {
        type: "info",
        title: "Use before configuring Aggregate or Change Type",
        body: "Check Summary first to confirm a column is cleanly numeric — it'll show text values mixed into a mostly-numeric column that would otherwise cause a Change Type or Aggregate warning.",
      },
    ],
  },
  {
    id: "aggregate",
    name: "Aggregate",
    color: "#9BB058",
    icon: "Σ",
    svgIcon: "aggregate.svg",
    tagline:
      "Collapse an entire table into a single row of sums, averages, counts, minimums, and maximums.",
    description:
      "Summarizes a whole table into exactly one output row, with one output column per metric you configure — no grouping column, unlike Group By. Each metric pairs a source column with an aggregation: Sum, Average, Count, Min, Max, First value, Last value, or Nth occurrence. Count, Sum, Average, Min, and Max all ignore blank cells automatically.",
    useCases: [
      "Getting a total or average for a column across an entire table",
      "Counting how many non-blank values a column has",
      "Pulling the first or last value seen in a column, or a specific Nth occurrence",
    ],
    steps: [
      {
        title: "Connect your table",
        detail: "Pass any table into Aggregate's input.",
      },
      {
        title: "Add a metric",
        detail: "Pick a column and an aggregation (Sum, Average, Count, Min, Max, First, Last, or Nth occurrence).",
      },
      {
        title: "Add more metrics",
        detail: "Add as many column/aggregation pairs as you need — each becomes its own output column.",
      },
    ],
    inputType: "Data Table",
    inputNotes: ["At least one metric must be configured before the node produces output"],
    outputType: "Data Table (single row)",
    outputNotes: [
      "Exactly one output row, with one column per configured metric",
      "A column with no numeric values leaves a numeric metric blank and reports a warning instead of erroring",
    ],
    tips: [
      {
        type: "info",
        title: "One row total, not one per group",
        body: "Aggregate always collapses the whole table into a single row. If you need one row per distinct value in some column instead, use Group By.",
      },
    ],
  },
];
