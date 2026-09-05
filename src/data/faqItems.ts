export const allFaqItems = [
  {
    key: "1",
    label: "What types of PDFs does Altera support?",
    children: "Altera works with any PDF — payslips, invoices, bank statements, reports, and more. If it has structured data, Altera can extract it.",
  },
  {
    key: "2",
    label: "How accurate is the extraction?",
    children: "Altera extracts data with high accuracy. You can define custom rules to ensure every field maps exactly where you need it.",
  },
  {
    key: "3",
    label: "Do I need to install anything?",
    children: "Altera is a standalone desktop app. Download the installer for Windows or macOS and you're ready to start extracting in seconds — no other software required.",
  },
  {
    key: "4",
    label: "Can I process multiple PDFs at once?",
    children: "Yes. Altera supports batch processing so you can drop in hundreds of PDFs and get all the data structured in one go.",
  },
  {
    key: "5",
    label: "Is my data secure?",
    children: "Your files are processed securely and never stored beyond the active session. We don't share or retain your data.",
  },
  {
    key: "6",
    label: "Can I try it before paying?",
    children: "Absolutely — you can start for free and explore the core features before committing to a plan.",
  },
  {
    key: "7",
    label: "Do I need programming knowledge to use Altera?",
    children: "Not at all. Altera is designed to be used entirely visually — you drag, drop, and configure — no code required.",
  },
  {
    key: "8",
    label: "Can Altera handle scanned or image-based PDFs?",
    children: "Altera works best with digitally generated PDFs. Scanned documents with OCR-readable text are also supported, though accuracy may vary depending on scan quality.",
  },
  {
    key: "9",
    label: "What output format does the extracted data come in?",
    children: "Altera outputs clean, structured tables directly in the app — ready to analyse, export, or feed into your next workflow step.",
  },
  {
    key: "10",
    label: "Can I use different nodes for different document types?",
    children: "Yes. Each node is purpose-built for a specific extraction task. You can mix and match nodes in the same workflow to handle different document types in one pass.",
  },
  {
    key: "11",
    label: "What if the extraction misses a field or gets it wrong?",
    children: "You can define custom extraction rules to handle edge cases. If a specific document structure isn't covered out of the box, we also offer custom node development.",
  },
  {
    key: "12",
    label: "Is there a file size limit?",
    children: "Altera handles standard business documents without issue. Very large files or unusually complex layouts may affect processing time, but there is no hard cap.",
  },
  {
    key: "13",
    label: "What languages are supported?",
    children: "Altera primarily supports English and French documents. Support for additional languages is being added as the suite grows.",
  },
  {
    key: "14",
    label: "How do I get support if something goes wrong?",
    children: "You can reach us directly at support@alteradatasuite.com. We're a small team so you'll always get a real response — not a bot.",
  },
];

export const essentialFaqItems = allFaqItems.slice(0, 6);
