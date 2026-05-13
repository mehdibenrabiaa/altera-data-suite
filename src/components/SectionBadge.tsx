import styles from "./SectionBadge.module.css";

interface SectionBadgeProps {
  label: string;
  text: string;
  className?: string;
}

export default function SectionBadge({
  label,
  text,
  className,
}: SectionBadgeProps) {
  return (
    <div className={`${styles.badge}${className ? ` ${className}` : ""}`}>
      <div className={styles.pill}>
        <span className={styles.label}>{label}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}
