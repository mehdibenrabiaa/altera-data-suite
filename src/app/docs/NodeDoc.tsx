import Image from "next/image";
import SamePageLink from "@/components/SamePageLink";
import { LeftIcon, RightIcon, InfoIcon, WarningIcon } from "@/components/icons";
import {
  WIDGET_DOCS,
  CATEGORY_META,
  getNodeCategory,
  type WidgetDoc,
} from "@/data/widgetDocs";
import type { DocsT } from "./docsText";
import NodeIcon from "./NodeIcon";
import VideoCta from "./VideoCta";
import styles from "./docs.module.css";

interface Props {
  node: WidgetDoc;
  lang: string;
  t: DocsT;
}

// Layout modeled on KNIME Hub's node pages: breadcrumb, icon + name +
// "Node / <category>" header, long-form description, configuration
// options, then the node's ports -- here in a sticky side column.
export default function NodeDoc({ node, lang, t }: Props) {
  const categoryKey = getNodeCategory(node.id);
  const category = CATEGORY_META[categoryKey];
  const index = WIDGET_DOCS.findIndex((w) => w.id === node.id);
  const prev = index > 0 ? WIDGET_DOCS[index - 1] : null;
  const next = index < WIDGET_DOCS.length - 1 ? WIDGET_DOCS[index + 1] : null;
  const siblings = WIDGET_DOCS.filter(
    (w) => w.id !== node.id && getNodeCategory(w.id) === categoryKey,
  );
  const hasInput = !/^none/i.test(node.inputType);
  const hasTableOutput = !/no table output/i.test(node.outputType);

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <SamePageLink href={`/${lang}/docs`}>{t.docsHome}</SamePageLink>
          <span aria-hidden>/</span>
          <span>{category.label}</span>
          <span aria-hidden>/</span>
          <span className={styles.breadcrumbCurrent}>{node.name}</span>
        </nav>

        <header className={styles.nodeHeader}>
          <NodeIcon node={node} size={72} />
          <div className={styles.nodeHeaderText}>
            <h1 className={styles.nodeTitle}>{node.name}</h1>
            <div className={styles.nodeKind}>
              {t.nodeLabel} <span aria-hidden>/</span> {category.label}
            </div>
            <div className={styles.nodeTags}>
              <span className={styles.categoryTag} style={{ borderColor: category.color }}>
                <span className={styles.categoryDot} style={{ background: category.color }} />
                {category.label}
              </span>
              <span className={styles.tag}>{node.inputType}</span>
              <span className={styles.tag}>→ {node.outputType}</span>
            </div>
          </div>
        </header>

        <div className={styles.nodeBody}>
          <div className={styles.nodeMain}>
            <p className={styles.lede}>{node.tagline}</p>

            <section className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>{t.description}</h2>
              <p className={styles.prose}>{node.description}</p>
            </section>

            <section className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>{t.bestFor}</h2>
              <ul className={styles.bulletList}>
                {node.useCases.map((uc) => (
                  <li key={uc}>{uc}</li>
                ))}
              </ul>
            </section>

            <section className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>{t.howToUse}</h2>
              <dl className={styles.optionList}>
                {node.steps.map((step, i) => (
                  <div key={i} className={styles.option}>
                    <dt className={styles.optionName}>
                      <span className={styles.optionIndex}>{i + 1}</span>
                      {step.icon && (
                        <Image src={`/widgets_icons/${step.icon}`} alt="" width={18} height={18} />
                      )}
                      {step.title}
                    </dt>
                    <dd className={styles.optionDesc}>{step.detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {node.id === "pdf_converter" && <PdfToolbarReference t={t} />}

            {node.tips.length > 0 && (
              <section className={styles.docSection}>
                <h2 className={styles.docSectionTitle}>{t.tipsNotes}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {node.tips.map((tip, i) => (
                    <div
                      key={i}
                      className={`${styles.alertBox} ${tip.type === "warning" ? styles.alertWarning : styles.alertInfo}`}
                    >
                      <span className={styles.alertIcon}>
                        {tip.type === "warning" ? <WarningIcon size={15} /> : <InfoIcon size={15} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tip.title}</div>
                        <div style={{ fontSize: 13.5 }}>{tip.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.nodeAside}>
            <section className={styles.portPanel}>
              <h2 className={styles.portPanelTitle}>{t.inputPorts}</h2>
              {hasInput ? (
                <Port type={node.inputType} notes={node.inputNotes} isTable={/table/i.test(node.inputType)} t={t} />
              ) : (
                <p className={styles.portNone}>{t.noPorts}</p>
              )}
            </section>

            <section className={styles.portPanel}>
              <h2 className={styles.portPanelTitle}>{t.outputPorts}</h2>
              <Port type={node.outputType} notes={node.outputNotes} isTable={hasTableOutput} t={t} />
            </section>

            {siblings.length > 0 && (
              <section className={styles.portPanel}>
                <h2 className={styles.portPanelTitle}>
                  {t.moreInCategory.replace("{category}", category.label)}
                </h2>
                <ul className={styles.relatedList}>
                  {siblings.map((w) => (
                    <li key={w.id}>
                      <SamePageLink href={`/${lang}/docs/${w.id}`} className={styles.relatedLink}>
                        <NodeIcon node={w} size={20} />
                        {w.name}
                      </SamePageLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {(prev || next) && (
          <nav className={styles.pager} aria-label="Previous and next node">
            {prev ? (
              <SamePageLink href={`/${lang}/docs/${prev.id}`} className={styles.widgetNavBtn}>
                <LeftIcon />
                <NodeIcon node={prev} size={26} />
                {prev.name}
              </SamePageLink>
            ) : (
              <span />
            )}
            {next && (
              <SamePageLink href={`/${lang}/docs/${next.id}`} className={styles.widgetNavBtn}>
                {next.name}
                <NodeIcon node={next} size={26} />
                <RightIcon />
              </SamePageLink>
            )}
          </nav>
        )}
      </div>

      <VideoCta title={t.watchTutorials} subtitle={t.viewPlaylist} />
    </div>
  );
}

function Port({ type, notes, isTable, t }: { type: string; notes: string[]; isTable: boolean; t: DocsT }) {
  return (
    <div className={styles.port}>
      <div className={styles.portHead}>
        {/* KNIME-style port glyph: filled triangle for a table, square for a file */}
        <span className={isTable ? styles.portGlyphTable : styles.portGlyphFile} aria-hidden />
        <span>
          <span className={styles.portTypeLabel}>{t.portType}:</span> {type}
        </span>
      </div>
      {notes.length > 0 && (
        <ul className={styles.portNotes}>
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PdfToolbarReference({ t }: { t: DocsT }) {
  const shortcutRows = [
    { keys: ["H"], desc: t.shortcuts.toggleHand },
    { keys: ["V"], desc: t.shortcuts.toggleSelection },
    { keys: ["G"], desc: t.shortcuts.toggleGuide },
    { keys: ["Ctrl", "↵ Enter"], desc: t.shortcuts.convert },
    { keys: ["Ctrl", "O"], desc: t.shortcuts.openPdf },
    { keys: ["Ctrl", "+"], desc: t.shortcuts.zoomIn },
    { keys: ["Ctrl", "−"], desc: t.shortcuts.zoomOut },
    { keys: ["Ctrl", "0"], desc: t.shortcuts.fitPage },
    { keys: ["Ctrl", "Scroll ↑"], desc: t.shortcuts.scrollZoomIn },
    { keys: ["Ctrl", "Scroll ↓"], desc: t.shortcuts.scrollZoomOut },
  ];
  const tools = [
    { icon: "hand.svg", name: t.handTool, desc: t.handToolDesc },
    { icon: "selection-tool.svg", name: t.selectionTool, desc: t.selectionToolDesc },
  ];

  return (
    <>
      <section className={styles.docSection}>
        <h2 className={styles.docSectionTitle}>{t.toolbarRef}</h2>
        <dl className={styles.optionList}>
          {tools.map((tool) => (
            <div key={tool.icon} className={`${styles.option} ${styles.toolRow}`}>
              <div className={styles.toolIconWrap}>
                <Image src={`/widgets_icons/${tool.icon}`} alt="" width={20} height={20} />
              </div>
              <div>
                <dt className={styles.optionName}>{tool.name}</dt>
                <dd className={styles.optionDesc}>{tool.desc}</dd>
              </div>
            </div>
          ))}
          <div className={`${styles.option} ${styles.toolRow}`}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div className={styles.navBtn}>
                <Image src="/widgets_icons/previous-page.svg" alt="Previous page" width={18} height={18} />
              </div>
              <input readOnly value="1 / 229" className={styles.pageInput} aria-label="Page" />
              <div className={styles.navBtn}>
                <Image src="/widgets_icons/next-page.svg" alt="Next page" width={18} height={18} />
              </div>
            </div>
            <div>
              <dt className={styles.optionName}>{t.pageNav}</dt>
              <dd className={styles.optionDesc}>{t.pageNavDesc}</dd>
            </div>
          </div>
        </dl>
      </section>

      <section className={styles.docSection}>
        <h2 className={styles.docSectionTitle}>{t.keyboardShortcuts}</h2>
        <div className={styles.shortcutsGrid}>
          {shortcutRows.map(({ keys, desc }, i) => (
            <div key={i} className={styles.shortcutRow}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {keys.map((k, j) => (
                  <span key={j} className={styles.kbd}>{k}</span>
                ))}
              </div>
              <span style={{ fontSize: 13.5, color: "#555" }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
