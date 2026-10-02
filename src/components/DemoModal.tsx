"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons";
import styles from "./DemoModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Replaces antd's <Modal> with the native <dialog> element -- showModal()
// gives ESC-to-close, a focus trap, and focus restoration to whatever
// triggered it, all natively, matching antd's own defaults (keyboard and
// maskClosable both true) without hand-rolling any of that.
export default function DemoModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.modal}
      onClose={onClose}
      onClick={(e) => {
        // Backdrop click -- the dialog element itself fills the viewport
        // when shown via showModal(), so a click landing directly on it
        // (not on a child) means it hit the backdrop area.
        if (e.target === ref.current) onClose();
      }}
    >
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <CloseIcon size={16} />
      </button>
      <div className={styles.body} />
    </dialog>
  );
}
