"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

interface PageTransitionContextValue {
  animKey: string;
  replay: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  animKey: "",
  replay: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  const replay = useCallback(() => {
    window.scrollTo(0, 0);
    setCount((c) => c + 1);
  }, []);

  return (
    <PageTransitionContext.Provider value={{ animKey: `${pathname}-${count}`, replay }}>
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
