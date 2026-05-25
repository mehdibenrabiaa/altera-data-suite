import styles from "./LegalPage.module.css";

export interface LegalSection {
  heading: string;
  body?: string;
  items?: string[];
  note?: string;
}

export interface LegalGroup {
  title: string;
  sections: LegalSection[];
}

interface Props {
  title: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  badge: string;
  groups: LegalGroup[];
}

export default function LegalPage({ title, lastUpdated, lastUpdatedLabel, badge, groups }: Props) {
  return (
    <main>
      <div className={styles.hero}>
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroDate}>{lastUpdatedLabel}: {lastUpdated}</p>
      </div>

      <div className={styles.body}>
        {groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <hr className={styles.groupDivider} />}
            <h2 className={styles.groupTitle}>{group.title}</h2>
            {group.sections.map((sec, si) => (
              <div key={si} className={styles.section}>
                <h3 className={styles.sectionHeading}>{sec.heading}</h3>
                {sec.body && <p className={styles.paragraph}>{sec.body}</p>}
                {sec.items && (
                  <ul className={styles.list}>
                    {sec.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
                {sec.note && <p className={styles.note}>{sec.note}</p>}
              </div>
            ))}
          </div>
        ))}
        <p className={styles.copyright}>© 2026 Altera Data Suite. All Rights Reserved.</p>
      </div>
    </main>
  );
}
