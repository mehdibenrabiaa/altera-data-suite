"use client";

import { ConfigProvider } from "antd";
import { COLOR_PRIMARY } from "@/lib/theme";

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLOR_PRIMARY,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
