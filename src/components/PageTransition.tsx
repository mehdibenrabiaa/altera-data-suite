"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

type ProgressState = "idle" | "loading" | "completing" | "done";

interface PageTransitionContextValue {
  animKey: string;
  replay: () => void;
  startProgress: () => void;
  progressWidth: number;
  progressVisible: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  animKey: "",
  replay: () => {},
  startProgress: () => {},
  progressWidth: 0,
  progressVisible: false,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [progressState, setProgressState] = useState<ProgressState>("idle");
  const [progressWidth, setProgressWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname = useRef(pathname);

  const replay = useCallback(() => {
    window.scrollTo(0, 0);
    setCount((c) => c + 1);
  }, []);

  const startProgress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setProgressWidth(0);
    setProgressState("loading");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgressWidth(72);
      });
    });
  }, []);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    setProgressWidth(100);
    setProgressState("completing");
    timerRef.current = setTimeout(() => {
      setProgressState("done");
      timerRef.current = setTimeout(() => {
        setProgressWidth(0);
        setProgressState("idle");
      }, 300);
    }, 250);
  }, [pathname]);

  const progressVisible = progressState === "loading" || progressState === "completing";

  return (
    <PageTransitionContext.Provider
      value={{ animKey: `${pathname}-${count}`, replay, startProgress, progressWidth, progressVisible }}
    >
      {/* Top-of-page loading bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 99999,
        pointerEvents: "none",
        opacity: progressVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <div style={{
          height: "100%",
          width: `${progressWidth}%`,
          background: "linear-gradient(90deg, #FE4D41, #FB766E)",
          boxShadow: "0 0 8px rgba(254, 77, 65, 0.55)",
          transition: progressWidth === 100
            ? "width 0.25s ease"
            : progressWidth === 72
            ? "width 0.8s cubic-bezier(0.1, 0.5, 0.5, 1)"
            : "none",
        }} />
      </div>
      {children}
    </PageTransitionContext.Provider>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { animKey } = usePageTransition();

  return (
    <motion.div
      key={animKey}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
