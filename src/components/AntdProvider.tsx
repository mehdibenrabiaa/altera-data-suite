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
          // Matches Altera Studio's own button radius exactly (App.css's
          // .filter-builder-btn-primary/-secondary, used on every Configure
          // window's Apply/Cancel across the app) -- antd's own default
          // (~6px) read as a generic, rounder "SaaS button" than the app's
          // own flat, barely-rounded one.
          borderRadius: 3,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
