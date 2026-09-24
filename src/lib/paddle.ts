"use client";

// Paddle Billing checkout, loaded on demand (only once a pricing CTA is
// actually clicked -- not on every page load) via the official
// @paddle/paddle-js package, which handles script injection + init + the
// window.Paddle global's typing for us.

import { initializePaddle, type Paddle, type PaddleEventData } from "@paddle/paddle-js";

let paddleInstance: Paddle | undefined;
let initPromise: Promise<Paddle | undefined> | null = null;
let currentEventHandler: ((event: PaddleEventData) => void) | null = null;

async function ensurePaddleInitialized(): Promise<Paddle | undefined> {
  if (paddleInstance) return paddleInstance;

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!token) {
    console.warn(
      "[paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not set -- checkout is disabled."
    );
    return undefined;
  }

  if (!initPromise) {
    initPromise = initializePaddle({
      token,
      // Single stable callback registered once with Paddle; individual
      // checkout calls swap out `currentEventHandler` so each CTA click
      // gets its own completion callback without re-initializing.
      eventCallback: (event) => currentEventHandler?.(event),
    });
  }

  try {
    paddleInstance = await initPromise;
  } catch (err) {
    console.error("[paddle]", err);
  }

  return paddleInstance;
}

/**
 * Opens Paddle's overlay checkout for a single price. Returns false (and
 * logs why) if Paddle couldn't be initialized or no price id was given --
 * callers should show their own "checkout unavailable" state in that case.
 */
export async function openPaddleCheckout(
  priceId: string | undefined,
  onEvent?: (event: PaddleEventData) => void
): Promise<boolean> {
  if (!priceId) {
    console.warn("[paddle] no Paddle price id configured for this plan.");
    return false;
  }

  const paddle = await ensurePaddleInitialized();
  if (!paddle) return false;

  currentEventHandler = onEvent ?? null;

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    settings: { displayMode: "overlay" },
  });

  return true;
}
