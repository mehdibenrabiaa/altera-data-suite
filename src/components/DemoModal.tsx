"use client";

import { Modal } from "antd";

const DEMO_VIDEO_ID = "dQw4w9WgXcQ"; // replace with real YouTube video ID

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
      styles={{ body: { padding: 0, lineHeight: 0 } }}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
        <iframe
          src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
          title="Product demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </Modal>
  );
}
