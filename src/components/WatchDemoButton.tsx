"use client";

import { useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import DemoModal from "./DemoModal";

interface Props {
  label: string;
  btnType?: "default" | "primary" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  style?: React.CSSProperties;
}

export default function WatchDemoButton({
  label,
  btnType = "default",
  size = "large",
  style,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type={btnType}
        size={size}
        icon={<PlayCircleOutlined />}
        onClick={() => setOpen(true)}
        style={style}
      >
        {label}
      </Button>
      <DemoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
