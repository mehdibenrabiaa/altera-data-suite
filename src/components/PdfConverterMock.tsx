import {
  ConvertGlyph,
  HandGlyph,
  OpenFileGlyph,
  OverlayGlyph,
  RectangleGlyph,
  RegionGlyph,
  RulerGlyph,
  SelectGlyph,
} from "./PdfToolbarGlyphs";
import styles from "./PdfConverterMock.module.css";

// A drawn (not screenshotted) PDF Converter, styled after the app's own:
// the Photoshop-style tool column (active tool in the app's orange), the
// page, translucent highlight rectangles from the app's palette
// (colorUtils.ts ARTISTIC_PALETTE: 30% fill, solid stroke), and dashed
// column guides. Each phase replays its animation when it mounts.

export type PdfPhase = "highlight" | "guides" | "convert";

interface Props {
  phase: PdfPhase;
  columns: string[]; // translated table headers, e.g. Date / Description / Amount
  tableName: string;
  height: number;
}

const ROWS = [
  ["03/09", "ACME Supplies", "-1,240.00"],
  ["05/09", "Northwind Ltd", "3,500.00"],
  ["08/09", "Card 4821", "-86.40"],
  ["12/09", "Utilities", "-312.15"],
  ["15/09", "Transfer IN-2291", "8,020.00"],
  ["19/09", "Card 4821", "-54.90"],
];

// Same buttons, order, and grouping as the app's ToolbarPanel.tsx --
// "gap" is its .toolbar-group-gap, "disabled" its coming-soon buttons.
const TOOLS: ({ key: string; glyph: () => React.ReactNode; disabled?: boolean } | "gap")[] = [
  { key: "open", glyph: OpenFileGlyph },
  { key: "convert", glyph: ConvertGlyph },
  { key: "overlay", glyph: OverlayGlyph, disabled: true },
  "gap",
  { key: "select", glyph: SelectGlyph },
  { key: "hand", glyph: HandGlyph },
  "gap",
  { key: "rect", glyph: RectangleGlyph },
  { key: "region", glyph: RegionGlyph, disabled: true },
  { key: "guide", glyph: RulerGlyph },
];

export default function PdfConverterMock({ phase, columns, tableName, height }: Props) {
  const activeTool = phase === "highlight" ? "rect" : phase === "guides" ? "guide" : "convert";
  const headers = columns.slice(0, 3);

  return (
    <div className={styles.window} style={{ height }} aria-hidden>
      <div className={styles.toolbar}>
        {TOOLS.map((t, i) =>
          t === "gap" ? (
            <span key={`gap-${i}`} className={styles.toolGap} />
          ) : (
            <span
              key={t.key}
              className={`${styles.tool} ${t.key === activeTool ? styles.toolActive : ""} ${t.disabled ? styles.toolDisabled : ""}`}
            >
              <t.glyph />
            </span>
          ),
        )}
      </div>

      <div className={styles.viewport}>
        <div key={phase} className={`${styles.page} ${phase === "convert" ? styles.pageShrink : ""}`}>
          <div className={styles.pageHeader}>
            <span className={styles.bankMark} />
            <span className={styles.lineLong} />
            <span className={styles.lineShort} />
          </div>

          <div className={styles.table}>
            <div className={`${styles.row} ${styles.headRow}`}>
              {headers.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            {ROWS.map((r, i) => (
              <div key={i} className={styles.row}>
                {r.map((c, j) => (
                  <span key={j}>{c}</span>
                ))}
              </div>
            ))}

            {/* Indigo highlight over the transaction table */}
            <span className={`${styles.highlight} ${styles.hlTable} ${phase === "highlight" ? styles.drawing : ""}`} />

            {phase !== "highlight" && (
              <>
                <span className={`${styles.guide} ${phase === "guides" ? styles.guideDrop : ""}`} style={{ left: "24%" }} />
                <span className={`${styles.guide} ${phase === "guides" ? styles.guideDrop : ""}`} style={{ left: "68%", animationDelay: "0.35s" }} />
              </>
            )}
          </div>

          <div className={styles.totals}>
            <span className={styles.lineShort} />
            <span className={styles.totalValue}>10,826.55</span>
            <span className={`${styles.highlight} ${styles.hlTotals} ${phase === "highlight" ? styles.drawingLate : ""}`} />
          </div>
        </div>

        {phase === "convert" && (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <span className={styles.resultDot} />
              {tableName}
            </div>
            <div className={`${styles.resultRow} ${styles.resultHead}`}>
              {headers.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            {ROWS.slice(0, 4).map((r, i) => (
              <div key={i} className={styles.resultRow} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                {r.map((c, j) => (
                  <span key={j}>{c}</span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
