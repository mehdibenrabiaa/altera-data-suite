import Image from "next/image";
import { isLightColor, type WidgetDoc } from "@/data/widgetDocs";
import styles from "./docs.module.css";

// Same colored-tile look as the app's own .node-icon-tile -- category
// color behind, icon forced white on top (see .nodeIconTile img) -- or
// black on light colors, like the app's .node-icon-dark.
export default function NodeIcon({ node, size }: { node: WidgetDoc; size: number }) {
  const iconSize = Math.round(size * 0.6);
  return (
    <span
      className={`${styles.nodeIconTile} ${isLightColor(node.color) ? styles.nodeIconDark : ""}`}
      style={{ width: size, height: size, background: node.color, borderRadius: size >= 48 ? 10 : 5 }}
    >
      {node.svgIcon ? (
        <Image src={`/widgets_icons/${node.svgIcon}`} alt="" width={iconSize} height={iconSize} unoptimized />
      ) : (
        <span style={{ fontSize: iconSize }}>{node.icon}</span>
      )}
    </span>
  );
}
