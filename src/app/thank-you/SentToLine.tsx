"use client";

import { useSyncExternalStore } from "react";

// The checkout stores the buyer's email in sessionStorage right before
// redirecting here (never in the URL, so it can't leak into analytics or
// browser history). Read client-side only: the server render shows the
// generic line, then the personalized one replaces it after hydration.
export const CHECKOUT_EMAIL_KEY = "altera:checkoutEmail";

function readEmail(): string | null {
  try {
    return sessionStorage.getItem(CHECKOUT_EMAIL_KEY);
  } catch {
    return null;
  }
}
const noopSubscribe = () => () => {};
const serverSnapshot = () => null;

export default function SentToLine({
  sentTo,
  sentGeneric,
  className,
}: {
  sentTo: string;
  sentGeneric: string;
  className?: string;
}) {
  const email = useSyncExternalStore(noopSubscribe, readEmail, serverSnapshot);
  if (!email) return <p className={className}>{sentGeneric}</p>;
  const [before, after] = sentTo.split("{email}");
  return (
    <p className={className}>
      {before}
      <strong>{email}</strong>
      {after}
    </p>
  );
}
