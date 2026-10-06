// English fallback copy of dictionaries/en.json's allFaqs -- keep in sync.
export const allFaqItems = [
  {
    key: "1",
    label: "What types of PDFs does Altera support?",
    children: "Any PDF with selectable text — payslips, invoices, bank statements, reports, and more. If you can select the text in your PDF viewer, Altera can extract it. Scanned, image-only PDFs need OCR first (see below).",
  },
  {
    key: "2",
    label: "How accurate is the extraction?",
    children: "Altera reads the text that's already inside the PDF, so values come out exactly as they appear — nothing is guessed or retyped. You control what gets extracted by highlighting the areas you need, and you can add column guides where columns sit close together.",
  },
  {
    key: "3",
    label: "Do I need to install anything?",
    children: "Yes, Altera is a desktop app. Download the installer for Windows and you're ready to go — no other software required. macOS and Linux versions are coming soon.",
  },
  {
    key: "4",
    label: "Can I process multiple PDFs at once?",
    children: "Altera works on one PDF at a time, and that PDF can have hundreds of pages. Save your workflow once, then open the next file and run the same steps again — your highlights and settings are kept.",
  },
  {
    key: "5",
    label: "Is my data secure?",
    children: "Yes. Altera runs on your own computer: your PDFs are processed locally and never uploaded to our servers or anyone else's. The app only goes online to check your license.",
  },
  {
    key: "6",
    label: "Can I try it before paying?",
    children: "Yes — every plan comes with a 7-day free trial with all features included, and no credit card is required.",
  },
  {
    key: "7",
    label: "Do I need programming knowledge to use Altera?",
    children: "Not at all. You highlight data on the PDF, then build your workflow by connecting nodes and setting their options — no code or formulas required.",
  },
  {
    key: "8",
    label: "Can Altera handle scanned or image-based PDFs?",
    children: "Altera reads the text layer inside a PDF and doesn't do OCR itself. A scan that's only an image has no text layer, so run it through OCR software first — then Altera can extract it like any other PDF.",
  },
  {
    key: "9",
    label: "What output format does the extracted data come in?",
    children: "Your data comes out as a clean table inside the app. From there you can keep transforming it with nodes, or save it to Excel (.xlsx) or CSV with the Export node.",
  },
  {
    key: "10",
    label: "What are nodes, and how do they work together?",
    children: "Nodes are the building blocks of a workflow. Each one does a single job on your data — clean text, filter rows, merge tables, total a column, and more. Connect them from left to right to turn the table extracted from your PDF into exactly the result you need.",
  },
  {
    key: "11",
    label: "What if the extraction misses a field or gets it wrong?",
    children: "Adjust your highlight or add a column guide, and convert again. To fix the data itself, use nodes like Cleaner, Text Parser, or Regular Expressions. If your documents need something no node covers, we also build custom nodes.",
  },
  {
    key: "12",
    label: "Is there a file size limit?",
    children: "There's no fixed limit. Large or very long documents simply take a little longer to open and convert — the PDF Converter loads one page at a time.",
  },
  {
    key: "13",
    label: "What languages are supported?",
    children: "Altera reads the text that's embedded in your PDF rather than recognizing characters, so it isn't tied to a particular document language. The app's interface is currently in English.",
  },
  {
    key: "14",
    label: "How do I get support if something goes wrong?",
    children: "You can reach us directly at support@alteradatasuite.com. We're a small team so you'll always get a real response — not a bot.",
  },
  {
    key: "15",
    label: "What file formats can I export to?",
    children: "Excel (.xlsx) and CSV, using the Export node. You can also bring Excel and CSV files into a workflow with the Input Data node — for example, to match a statement against your ledger.",
  },
  {
    key: "16",
    label: "Does Altera work offline?",
    children: "Yes. Everything runs on your computer, so you can work without an internet connection. The app only needs to go online at least once every 7 days to renew your license.",
  },
  {
    key: "17",
    label: "Can I reuse a workflow every month?",
    children: "Yes. Save your workflow and everything is kept — including the areas you highlighted on the PDF. When next month's file arrives, swap it in and run the same steps again.",
  },
];

export const essentialFaqItems = allFaqItems.slice(0, 6);
