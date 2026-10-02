"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { PlayCircleIcon } from "@/components/icons";
import DemoModal from "./DemoModal";

interface Props {
  label: string;
  btnType?: "default" | "primary" | "text";
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
        icon={<PlayCircleIcon />}
        onClick={() => setOpen(true)}
        style={style}
      >
        {label}
      </Button>
      <DemoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
