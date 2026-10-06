import { redirect } from "next/navigation";

// The real page lives at /[lang]/use-cases (the proxy already sends
// un-prefixed paths there) -- this just guards the bare route.
export default function UseCasesPage() {
  redirect("/en/use-cases");
}
