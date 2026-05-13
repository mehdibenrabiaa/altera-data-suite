"use client";

import { Button } from "antd";

export default function NotFoundButton() {
  return (
    <Button type="primary" size="large" href="/" style={{ fontWeight: 600 }}>
      Back to home
    </Button>
  );
}
