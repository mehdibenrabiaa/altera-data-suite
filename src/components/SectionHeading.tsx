import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  heading: string;
  subtitle: string;
  subtitleMaxWidth?: string | number;
  className?: string;
}

export default function SectionHeading({
  heading,
  subtitle,
  subtitleMaxWidth,
  className,
}: SectionHeadingProps) {
  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      <h2 className={styles.heading}>{heading}</h2>
      <p
        className={styles.subtitle}
        style={subtitleMaxWidth ? { maxWidth: subtitleMaxWidth } : undefined}
      >
        {subtitle}
      </p>
    </div>
  );
}
