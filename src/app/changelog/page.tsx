import { redirect } from "next/navigation";

// The real changelog lives at /[lang]/changelog (the proxy already sends
// un-prefixed paths there) -- this just guards the bare route.
export default function ChangelogPage() {
  redirect("/en/changelog");
}
