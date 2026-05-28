"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransition";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function SamePageLink({ href, className, style, onClick, children }: Props) {
  const pathname = usePathname();
  const { replay, startProgress } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    onClick?.();
    if (pathname === href) {
      e.preventDefault();
      replay();
    } else {
      startProgress();
    }
  };

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
