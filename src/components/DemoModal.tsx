"use client";

import { Modal } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="min(900px, 92vw)"
      centered
      destroyOnHidden
      style={{ padding: 0, borderRadius: 16, overflow: "hidden" }}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ height: 506, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      </div>
    </Modal>
  );
}
