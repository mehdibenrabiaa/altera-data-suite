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
        body: "Each highlighted area gets a color. In downstream nodes like Filter Builder, you can use these colors to work with specific sections of the extracted data independently.",
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

  {
    id: "filter_builder",
    name: "Filter Builder",
    icon: "🔽",
    svgIcon: "filter.svg",
    tagline:
      "Compose multi-condition row filters through a visual logic builder — no formulas, no code, no syntax errors.",
    description:
      "Lets you define complex row-filtering logic through a structured, point-and-click interface. Conditions are grouped, and groups are combined using AND logic at the top level. Within each group, conditions can use either AND or OR. Think of it as the filter step in Power Query — but built into your workflow.",
    useCases: [
      "Removing known bad rows such as nulls, test entries, or outliers from raw data",
      "Splitting a dataset into segments for parallel analysis",
      "Applying business rules (e.g. Revenue > 1,000 AND Status = Active) as a reusable step",
      "Quickly checking what proportion of rows match a condition without writing any formulas",
      "Isolating annotated sections by color — if your PDF Converter output contains rows from multiple highlighted areas (e.g. a blue table and a red table), use Filter Builder to keep only the section you want",
    ],
    steps: [
      {
        title: "Connect a data table",
        detail:
          "Connect any upstream node's output to the Filter Builder input. The column list populates automatically.",
      },
      {
        title: "Add your first group",
        detail:
          "Click 'Add Group'. A new condition group appears with an AND/OR toggle at the top. One group is enough for simple filters.",
      },
      {
        title: "Add conditions inside the group",
        detail:
          "Click 'Add Condition'. Select a column — the list of available operators adjusts to match that column's type. Fill in the value. For categorical columns, choose from the auto-populated dropdown.",
      },
      {
        title: "Switch the group connector to OR if needed",
        detail:
          "The group defaults to AND — all conditions must be true. Switch it to OR if you want rows that match any of the conditions, for example Country = France OR Country = Germany.",
      },
      {
        title: "Add more groups for compound logic",
        detail:
          "Each additional group is combined with the others using AND. This lets you express logic like: (Country = France OR Germany) AND (Revenue > 10,000). Groups are evaluated in order.",
      },
      {
        title: "Check the live row count",
        detail:
          "The footer shows how many rows pass your current filter in real time. Use this to verify your logic before connecting the output to downstream nodes.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Column list populates automatically from the connected table",
      "Categorical columns show a value dropdown instead of a free-text field",
      "If no table is connected, the node shows a placeholder and does not produce output",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns as input — only the row set changes. Rows that do not match the filter are removed.",
      "Live row count is shown in the node footer as you build conditions",
      "Your filter settings are saved with the workflow",
      "If no conditions are defined, all rows pass through unchanged",
    ],
    tips: [
      {
        type: "info",
        title: "Categorical value picker",
        body: "For categorical columns, the value field shows all unique values from the connected data — no need to type anything. Just pick from the list.",
      },
      {
        type: "info",
        title: "Empty filter passes everything through",
        body: "If you add a group but leave condition values empty, those conditions match all rows and nothing is filtered. Useful for setting up the structure before filling in values.",
      },
      {
        type: "warning",
        title: "Unfilled condition rows are not filters",
        body: "A condition row with no value entered matches everything. Either fill it in or delete it to avoid accidentally letting all rows through.",
      },
      {
        type: "warning",
        title: "Column changes upstream can break saved conditions",
        body: "If an upstream node changes column names or types, conditions targeting those columns may stop working. Re-open the node and review your conditions after any upstream change.",
      },
    ],
  },

  {
    id: "column_manager",
    name: "Column Manager",
    icon: "⚙️",
    svgIcon: "column_manager.svg",
    tagline:
      "Reorder, rename, and hide columns through a drag-and-drop interface with a live data preview.",
    description:
      "A schema management step for your data tables. Instead of writing code to rename columns or reorder them, you interact with a drag-and-drop list alongside a live data preview. All changes are non-destructive — original names are always tracked and can be restored with Reset at any time.",
    useCases: [
      "Cleaning up cryptic auto-generated column names from exports",
      "Reordering columns before sending data to a report or export file",
      "Hiding irrelevant columns to simplify downstream steps",
    ],
    steps: [
      {
        title: "Reorder columns by drag and drop",
        detail:
          "Grab the handle on the left side of any row and drag it to its new position. The output table reflects this order immediately.",
      },
      {
        title: "Rename a column — fast tab-based method",
        detail:
          "Click any column name in the list to enter edit mode. Type the new name, then press Tab to save and move to the next column. You can rename an entire table without touching the mouse again after the first click.",
      },
      {
        title: "Use the data preview as a reference",
        detail:
          "The right-side panel shows the first few rows of actual data. Use it to read real values while deciding on column names — especially useful for columns with generic names like col_3. The preview is read-only.",
      },
      {
        title: "Disable columns you don't need",
        detail:
          "Toggle the checkbox on the right of any row to exclude that column from the output. Disabled columns are not deleted — re-enable them at any time. Use 'Deselect All' to strip down to only what you need.",
      },
      {
        title: "Reset if needed",
        detail:
          "Click Reset to restore all original column names and order exactly as they arrived from the upstream node. Use this to start over without disconnecting the node.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported",
      "The first few rows of each column are shown in the live data preview panel on the right",
      "New columns added upstream appear at the bottom of the list — existing settings for other columns are preserved",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same data, but with columns reordered, renamed, and/or removed according to your settings",
      "Disabled columns are excluded from the output entirely",
      "Column order in the output matches the order in the node list",
      "Original column names are always recoverable via Reset",
    ],
    tips: [
      {
        type: "info",
        title: "Tab key makes renaming fast",
        body: "Click the first column name, type it, then Tab through all the rest. No mouse clicks needed between columns. A 30-column export can be renamed in under a minute.",
      },
      {
        type: "info",
        title: "Rename while seeing real values",
        body: "Keep an eye on the right-side preview while renaming — it shows actual data values so you can make informed naming decisions without leaving the node.",
      },
      {
        type: "warning",
        title: "Removed upstream columns disappear silently",
        body: "If a column is removed by an upstream node, its settings in Column Manager are dropped without warning. You will simply notice it is gone from the list.",
      },
    ],
  },

  {
    id: "header_promoter",
    name: "Header Promoter",
    icon: "⬆️",
    svgIcon: "header_promoter.svg",
    tagline:
      "When your real column headers are sitting in the first data row, one click moves them to where they belong.",
    description:
      "Solves a common import problem: the file reader assigns generic column names — Column 1, Column 2, col_0 — while the actual headers are sitting in the first row of data. Header Promoter moves that row up to become the column header row, then removes it from the data.",
    useCases: [
      "CSV or PDF imports where the first row is the real header but was read as data",
      "Excel exports with merged header cells that caused the importer to misread the headers",
      "Tables where only the second header row is meaningful and the first should be ignored",
      "Any import with generic column names that need real labels before further processing",
    ],
    steps: [
      {
        title: "Identify the header row",
        detail:
          "Connect your raw table and review it in a Data Table node. Find the row number that contains the real column labels. Usually this is row 1, but it may be row 2 if there is a title row above.",
      },
      {
        title: "Connect to Header Promoter",
        detail:
          "Pass the raw table into Header Promoter's input.",
      },
      {
        title: "Set the row number",
        detail:
          "The default is 1 — the first data row. If your real header is in row 2, change the selector to 2. The before/after column name preview updates instantly.",
      },
      {
        title: "Apply and verify",
        detail:
          "Connect the output to a Data Table node. Confirm the column names now match your expected headers and that the promoted row is no longer present in the data.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The node uses the specified row to replace the existing column names",
      "All column types are supported — values in the promoted row become the new column names",
      "Numeric values in the promoted row are converted to text for use as column names",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same data as input, minus the promoted row, with column names replaced by that row's values",
      "The promoted row is removed from the data and will no longer appear as a record",
      "If two columns share the same promoted name, a number suffix is added to make them unique",
      "Blank cells in the promoted row become placeholder column names",
    ],
    tips: [
      {
        type: "info",
        title: "Use before Column Manager",
        body: "Header Promoter followed by Column Manager is the natural sequence: promote real names first, then rename, retype, and reorder. This gives Column Manager meaningful names to work with.",
      },
      {
        type: "info",
        title: "Duplicate names get a suffix",
        body: "If the header row contains repeated values — common in grouped table exports — the second occurrence gets a _2 suffix, the third _3, and so on. Clean these up in Column Manager afterward.",
      },
      {
        type: "warning",
        title: "Row numbering starts at 1",
        body: "Row 1 refers to the first data row in the table — not row 0. If you are thinking in zero-based terms, add 1 when setting the row selector.",
      },
      {
        type: "warning",
        title: "Blank header cells become placeholder names",
        body: "If the promoted row has empty cells — common in Excel exports with merged headers — those columns receive auto-generated placeholder names. Use Column Manager to rename or hide them.",
      },
    ],
  },

  {
    id: "multi_shift_columns",
    name: "Multi Shift Columns",
    icon: "↕️",
    svgIcon: "multishift.svg",
    tagline:
      "Shift the row values of selected columns up or down by any number of steps — in one operation across multiple columns.",
    description:
      "Moves the row values inside selected columns up or down by a number of steps you define. You choose which columns to shift, how many steps, and in which direction. Multiple columns can be shifted independently in the same operation — each with its own step count and direction. Cells that fall outside the original row range after shifting are left empty.",
    useCases: [
      "Creating lag or lead columns for time series comparisons — e.g. putting last month's value next to this month's",
      "Aligning datasets where one column's values need to line up with a different row in another column",
      "Building period-over-period difference calculations by shifting a value column and subtracting",
      "Correcting row offsets introduced during extraction where some columns are systematically one or more rows out of step",
    ],
    steps: [
      {
        title: "Connect your table",
        detail:
          "Pass any data table into the node's input. The column list populates automatically.",
      },
      {
        title: "Select a column to shift",
        detail:
          "Pick the column whose row values you want to move. You can add multiple columns, each with its own settings.",
      },
      {
        title: "Set the number of steps",
        detail:
          "Enter how many rows you want to shift by. A step of 1 moves each value one row in the chosen direction; a step of 3 moves it three rows.",
      },
      {
        title: "Choose the direction",
        detail:
          "Select Up or Down. Shifting down moves values toward higher row numbers — the first rows become empty. Shifting up moves values toward lower row numbers — the last rows become empty.",
      },
      {
        title: "Add more columns if needed",
        detail:
          "Add additional column entries with their own step counts and directions. All shifts are applied in a single pass.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported",
      "Columns not included in any shift entry pass through unchanged",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same number of rows and columns as the input — shifted cells that fall outside the original range are left empty",
      "Columns not selected for shifting are passed through unchanged",
      "All shifts are applied simultaneously",
    ],
    tips: [
      {
        type: "info",
        title: "Shifting down creates empty rows at the top",
        body: "When you shift a column down by N steps, the first N rows of that column will be empty in the output. The opposite applies when shifting up.",
      },
      {
        type: "info",
        title: "Useful for period comparisons",
        body: "Shift a value column down by 1 to place the previous row's value alongside the current row. Then subtract the two columns downstream to get a row-by-row difference.",
      },
      {
        type: "warning",
        title: "Large step counts produce many empty cells",
        body: "Shifting by more steps than there are rows will result in the entire column being empty. Double-check your step count before connecting to downstream nodes.",
      },
    ],
  },

  {
    id: "regex_extractor",
    name: "Regex Extractor",
    icon: "🔍",
    svgIcon: "regex.svg",
    tagline:
      "Pull structured values out of messy text columns using pattern matching — with three extraction modes and a built-in AI assistant.",
    description:
      "Applies a pattern to a text column and extracts matching content into new columns. Supports three extraction modes for different needs: First Match for one value per row, Precision Capture for extracting multiple named parts, and Collect All for pulling every occurrence. A built-in AI assistant can generate the pattern for you from a plain-language description.",
    useCases: [
      "Extracting dates, amounts, reference numbers, or codes from freeform text",
      "Splitting concatenated fields into separate structured columns",
      "Collecting all occurrences of a pattern from a long text field",
      "Isolating the structured part of a cell and discarding surrounding noise",
    ],
    steps: [
      {
        title: "Connect a table with text data",
        detail:
          "Pass any table with a text column into the node.",
      },
      {
        title: "Select the source column",
        detail:
          "Choose the column containing the text you want to extract from.",
      },
      {
        title: "Define your pattern — manually or with AI",
        detail:
          "Type a pattern directly into the pattern field, or use the AI assistant: describe what you want to extract in plain language and click Generate. The assistant fills in the pattern and recommended settings automatically.",
      },
      {
        title: "Choose an extraction mode",
        detail:
          "First Match extracts one value per row. Precision Capture extracts multiple defined parts into separate columns. Collect All captures every occurrence in the cell — useful when the number of matches varies by row.",
      },
      {
        title: "Name the output column",
        detail:
          "Enter a name for the new column. In Collect All mode, output columns are named with a numbered suffix — Name_1, Name_2, and so on.",
      },
      {
        title: "Apply and verify",
        detail:
          "The new columns appear in the output table. Connect to a Data Table to review results. Rows with no match will have a blank value in the output column.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "The pattern is applied to a single text or categorical column you select",
      "Numeric columns cannot be used directly — convert them to text first if needed",
    ],
    outputType: "Data Table",
    outputNotes: [
      "The input table is returned with one or more new columns appended",
      "First Match: one new column with the first match per row",
      "Precision Capture: one column per defined capture group",
      "Collect All: one column per occurrence — the number of columns is determined by the row with the most matches",
      "Rows with no match receive a blank value in the output column",
    ],
    tips: [
      {
        type: "info",
        title: "Let the AI write the pattern",
        body: "For common patterns like dates, currency values, reference codes, or email addresses, the AI assistant produces accurate patterns from a plain description and includes examples you can use to verify.",
      },
      {
        type: "info",
        title: "Case-insensitive matching",
        body: "If your data has inconsistent capitalization, enable the case-insensitive option. The AI assistant typically sets this automatically when relevant.",
      },
      {
        type: "warning",
        title: "Collect All output width depends on your data",
        body: "The number of output columns is set by the row with the most matches. A row with no matches gets blank cells across all of them. If most rows have 1–2 matches but one has 10, you will get 10 output columns.",
      },
      {
        type: "warning",
        title: "Use Precision Capture for structured multi-part extraction",
        body: "If you need to extract several named parts from a structured string — for example, a name and an email from a single field — use Precision Capture rather than Collect All for predictable, labelled output columns.",
      },
    ],
  },

  {
    id: "remove_duplicates",
    name: "Remove Duplicates",
    icon: "🧹",
    svgIcon: "edit_column.svg",
    tagline:
      "Drop duplicate rows from your table based on a set of key columns — keeping the first occurrence or the most recent one.",
    description:
      "A targeted deduplication step. You choose exactly which columns define what counts as a duplicate — useful when the full row is not identical but the meaningful identifier, such as an invoice number or client ID, is repeated.",
    useCases: [
      "Removing duplicate invoice or transaction rows from repeated exports",
      "Deduplicating customer records where the same person appears multiple times",
      "Cleaning imports that include summary rows duplicating line-item data",
      "Creating a unique reference list from a flat table",
    ],
    steps: [
      {
        title: "Connect your table",
        detail:
          "Pass your table into Remove Duplicates. The column list populates automatically.",
      },
      {
        title: "Select key columns",
        detail:
          "Choose which columns define uniqueness. For invoice data, you might select only Invoice Number. For customer data, you might combine First Name, Last Name, and Email as a composite key.",
      },
      {
        title: "Choose Keep First or Keep Last",
        detail:
          "Keep First retains the earliest row in each duplicate group. Keep Last retains the most recent — useful when later rows contain corrected or updated values.",
      },
      {
        title: "Review the footer stats",
        detail:
          "The footer shows how many rows were removed and how many remain. If zero rows were removed, either the data has no duplicates on the selected columns, or the key selection is too broad.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "All column types are supported as key columns",
      "Composite keys are supported — a row is only a duplicate if all selected key columns match",
      "If no columns are selected, the node compares entire rows for deduplication",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns as input — only duplicate rows are removed",
      "The first or last occurrence of each duplicate group is kept, based on your setting",
      "Row order of kept rows is preserved",
      "The footer shows a live count of removed rows and remaining rows",
    ],
    tips: [
      {
        type: "info",
        title: "Composite keys give you precise control",
        body: "Selecting multiple columns as the key means a row is only flagged as a duplicate when all of those columns match another row. This avoids accidentally collapsing rows that share one value but differ in others.",
      },
      {
        type: "info",
        title: "Keep Last for corrected records",
        body: "If your export includes both an original and a corrected version of the same record, use Keep Last to retain the correction and discard the original.",
      },
      {
        type: "warning",
        title: "Too few key columns can collapse real data",
        body: "Selecting only a date column as the key, for example, would collapse every row from the same date into one — almost certainly not what you want. Check the removed row count against your expectations.",
      },
      {
        type: "warning",
        title: "Full-row comparison is strict",
        body: "If no key columns are selected, every cell in a row must match exactly for it to count as a duplicate. A single extra space in any cell will prevent deduplication. Run the Cleaner node first if your data has inconsistent formatting.",
      },
    ],
  },

  {
    id: "cleaner",
    name: "Cleaner",
    icon: "✨",
    svgIcon: "cleaner.svg",
    tagline:
      "Strip whitespace, fix encoding issues, normalize casing, and standardize formatting across your columns before any serious work begins.",
    description:
      "A multi-operation text normalization step. Applies a configurable set of cleaning transformations to selected columns — all at once or per-column with individual settings. Designed to be the first step in any data preparation workflow where raw data arrives from imports, exports, or document conversions with known formatting inconsistencies.",
    useCases: [
      "Removing leading and trailing whitespace that silently breaks filters and joins",
      "Fixing garbled characters introduced during PDF export or copy-paste",
      "Standardizing number formats before converting a column to a numeric type",
      "Normalizing inconsistent capitalization in category columns before analysis",
    ],
    steps: [
      {
        title: "Place Cleaner early in your workflow",
        detail:
          "Connect Cleaner immediately after your import step. Cleaning before any other transformation prevents silent failures in filters, deduplication, and header detection downstream.",
      },
      {
        title: "Select the columns to clean",
        detail:
          "Use 'Apply to All Text Columns' to clean everything at once, or select specific columns for fine-grained control. Numeric and date columns are not listed — they are not affected by text cleaning.",
      },
      {
        title: "Enable Strip Whitespace first",
        detail:
          "This is the most impactful operation. Invisible leading or trailing spaces cause filters, deduplication key matching, and header detection to fail without any visible error message.",
      },
      {
        title: "Enable Fix Encoding for imported data",
        detail:
          "If your data came from a PDF or an older system, enable this option to fix garbled characters that are invisible in most viewers but break text matching and display.",
      },
      {
        title: "Apply Normalize Numbers before type conversion",
        detail:
          "If numeric values are formatted as text — for example with currency symbols, thousand separators, or European decimal formatting — apply this operation here. Then use Column Manager to convert the cleaned column to a numeric type.",
      },
      {
        title: "Connect downstream and spot-check",
        detail:
          "Pipe the output to a Data Table and review a few cells from each cleaned column. Confirm there are no remaining formatting issues before continuing.",
      },
    ],
    inputType: "Data Table",
    inputNotes: [
      "Text and categorical columns can be cleaned",
      "Numeric and date columns are not modified",
      "Different cleaning operations can be applied to different columns independently",
    ],
    outputType: "Data Table",
    outputNotes: [
      "Same columns and same number of rows — only cell values are modified",
      "Columns not selected for cleaning pass through unchanged",
      "Blank and missing values are left as-is — they are not converted to empty text",
    ],
    tips: [
      {
        type: "info",
        title: "Whitespace is the most common silent issue",
        body: "Trailing spaces are invisible in most table views but break exact-match filters, deduplication, and header promotion. Running Strip Whitespace on every import takes seconds and prevents hours of troubleshooting.",
      },
      {
        type: "info",
        title: "Fix Encoding catches invisible character problems",
        body: "Documents converted from PDFs or older systems often contain garbled characters that look fine on screen but cause text matching to fail. The Fix Encoding operation corrects the most common patterns automatically.",
      },
      {
        type: "warning",
        title: "Normalize Numbers outputs text",
        body: "After applying Normalize Numbers, the column is still a text column — it has just been cleaned of formatting characters. Use Column Manager afterward to convert it to a numeric type.",
      },
      {
        type: "warning",
        title: "Case changes are permanent",
        body: "Uppercase and Lowercase operations cannot be reversed downstream — the original casing is gone. If you need to preserve original values for display or reference, keep a copy of the original column before applying case changes.",
      },
    ],
  },
];
