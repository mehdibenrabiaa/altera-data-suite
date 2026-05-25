import { redirect } from "next/navigation";

// Proxy handles locale detection and redirects before this runs.
// This is a safety fallback.
export default function RootPage() {
  redirect("/en");
}
