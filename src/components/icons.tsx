// Small inline-SVG replacements for the @ant-design/icons this site used to
// import -- same currentColor/em-sized convention so they drop straight
// into existing style={{ fontSize, color }} usage. Lucide-style paths
// (stroke-based for the "Outlined" originals, fill-based for the "Filled"
// ones), not pixel-identical to antd's own icon set, just visually
// equivalent.
import type { CSSProperties } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

function strokeIcon(paths: React.ReactNode) {
  return function Icon({ size = 16, className, style }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "inline-block", verticalAlign: "-0.125em", ...style }}
      >
        {paths}
      </svg>
    );
  };
}

function fillIcon(paths: React.ReactNode, viewBox = "0 0 24 24") {
  return function Icon({ size = 16, className, style }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        className={className}
        style={{ display: "inline-block", verticalAlign: "-0.125em", ...style }}
      >
        {paths}
      </svg>
    );
  };
}

export const LeftIcon = strokeIcon(<path d="m15 18-6-6 6-6" />);
export const RightIcon = strokeIcon(<path d="m9 18 6-6-6-6" />);

export const CloseIcon = strokeIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
);

export const RobotIcon = strokeIcon(
  <>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </>,
);

export const SendIcon = strokeIcon(
  <>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </>,
);

export const MenuIcon = strokeIcon(
  <>
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M4 18h16" />
  </>,
);

export const LockIcon = strokeIcon(
  <>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>,
);

export const PlayCircleIcon = strokeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
  </>,
);

export const CheckCircleFilledIcon = fillIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path
      d="M8 12.5l2.5 2.5L16 9"
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>,
);

export const InfoIcon = strokeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </>,
);

export const WarningIcon = strokeIcon(
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </>,
);

export const StarFilledIcon = fillIcon(
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
);

export const ChevronDownIcon = strokeIcon(<path d="m6 9 6 6 6-6" />);

export const WindowsIcon = fillIcon(
  <path d="M3 5.5 10.5 4.4V11.4H3V5.5ZM11.5 4.26 21 3V11.4H11.5V4.26ZM3 12.4H10.5V19.4L3 18.3V12.4ZM11.5 12.4H21V20.8L11.5 19.54V12.4Z" />,
);

export const AppleIcon = fillIcon(
  <path d="M16.365 1.43c0 1.14-.47 2.11-1.21 2.86-.78.78-1.9 1.33-2.98 1.23-.14-1.1.44-2.26 1.17-2.98.76-.78 2.06-1.36 3.02-1.11Zm3.1 16.24c-.5 1.16-.74 1.67-1.38 2.7-.9 1.44-2.17 3.24-3.75 3.25-1.4.02-1.76-.92-3.66-.91-1.9.01-2.3.93-3.7.91-1.58-.02-2.78-1.63-3.68-3.07-2.52-4.01-2.78-8.71-1.23-11.22 1.1-1.78 2.84-2.83 4.47-2.83 1.66 0 2.7.92 4.08.92 1.33 0 2.14-.92 4.08-.92 1.45 0 2.99.79 4.09 2.15-3.6 1.98-3.01 7.14.68 9.02Z" />,
  "0 0 24 24",
);

// Ubuntu's own "Circle of Friends" mark, used as the generic Linux glyph --
// the ring is currentColor to match the other OS icons' monochrome tile
// style; the three dot "gaps" punch through the ring via a halo matching
// download.module.css's .iconWrap background, same trick as
// CheckCircleFilledIcon's hardcoded white check.
export const LinuxIcon = fillIcon(
  <>
    <circle cx="12" cy="12" r="8.8" fill="none" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="12" cy="3.2" r="2.9" fill="#f5f5f5" />
    <circle cx="19.62" cy="16.4" r="2.9" fill="#f5f5f5" />
    <circle cx="4.38" cy="16.4" r="2.9" fill="#f5f5f5" />
    <circle cx="12" cy="3.2" r="2" />
    <circle cx="19.62" cy="16.4" r="2" />
    <circle cx="4.38" cy="16.4" r="2" />
  </>,
);

export const MailIcon = strokeIcon(
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>,
);

export const BookIcon = strokeIcon(
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />,
);
