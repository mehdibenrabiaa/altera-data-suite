import { NextRequest, NextResponse } from "next/server";

// electron-builder's generic "publish" provider keeps a latest.yml at the
// update server's root alongside the installer, re-uploaded by
// altera-studio's scripts/publish-update.mjs on every release -- its
// top-level `path:` field always names the current installer, so reading it
// here means this link never needs updating by hand when a new version ships.
const UPDATE_SERVER = "https://backend.alteradatasuite.com";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "en";

  try {
    const res = await fetch(`${UPDATE_SERVER}/updates/latest.yml`, { cache: "no-store" });
    if (!res.ok) throw new Error("latest.yml not available");

    const yml = await res.text();
    const match = yml.match(/^path:\s*(.+)$/m);
    const filename = match?.[1]?.trim().replace(/^["']|["']$/g, "");
    if (!filename) throw new Error("no path field in latest.yml");

    return NextResponse.redirect(`${UPDATE_SERVER}/updates/${encodeURIComponent(filename)}`, 302);
  } catch {
    return NextResponse.redirect(new URL(`/${lang}/download?unavailable=1`, request.url), 302);
  }
}
