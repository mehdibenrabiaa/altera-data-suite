"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleFilledIcon, LockIcon } from "@/components/icons";
import SamePageLink from "./SamePageLink";
import { openInlineCheckout } from "@/lib/paddle";
import { PLANS, getPlan } from "@/lib/plans";
import { COLOR_TEXT_MUTED } from "@/lib/theme";
import { CHECKOUT_EMAIL_KEY } from "@/app/thank-you/SentToLine";
import styles from "./CheckoutClient.module.css";

const FRAME_ID = "paddle-checkout-frame";

interface Props {
  lang: string;
  planKey?: string;
}

type Status = "loading" | "ready" | "completed" | "unavailable";

export default function CheckoutClient({ lang, planKey }: Props) {
  // Defaults to Yearly (the plan the pricing cards badge as POPULAR) if no
  // ?plan= is given or it doesn't match a known key, rather than a blank page.
  const [selectedKey, setSelectedKey] = useState(() => getPlan(planKey)?.key ?? "yearly");
  const plan = getPlan(selectedKey) ?? getPlan("yearly")!;
  const [status, setStatus] = useState<Status>("loading");
  const initedFor = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (initedFor.current === plan.key) return;
    initedFor.current = plan.key;
    setStatus("loading");

    let cancelled = false;
    openInlineCheckout(plan.priceId, FRAME_ID, (event) => {
      if (cancelled) return;
      // The webhook (altera-license-server /webhooks/paddle) is what
      // actually issues and emails the license key -- here we just send
      // the buyer to the thank-you page. Their email goes through
      // sessionStorage (not the URL) so the page can say where the key went.
      if (event.name === "checkout.completed") {
        setStatus("completed");
        const email = (event.data as { customer?: { email?: string } } | undefined)?.customer?.email;
        try {
          if (email) sessionStorage.setItem(CHECKOUT_EMAIL_KEY, email);
        } catch {
          // Storage blocked (private mode etc.) -- the page shows a generic line
        }
        router.push(`/${lang}/thank-you?plan=${plan.key}`);
      }
    }).then((opened) => {
      if (!cancelled) setStatus(opened ? "ready" : "unavailable");
    });

    return () => {
      cancelled = true;
    };
  }, [plan.key, plan.priceId, lang, router]);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.formPanel}>
          {status === "completed" ? (
            <div className={styles.successState}>
              <div className={styles.successIcon} style={{ background: `${plan.color}1f`, color: plan.color }}>
                <CheckCircleFilledIcon size={20} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "20px 0 6px" }}>
                Your license is on its way!
              </h3>
              <span style={{ color: COLOR_TEXT_MUTED, maxWidth: 300, display: "block" }}>
                We&apos;ve emailed your license key — check your inbox (and spam folder) over the next
                few minutes.
              </span>
              <SamePageLink href={`/${lang}`} className={styles.primaryBtn} style={{ background: plan.color }}>
                Got It
              </SamePageLink>
              <SamePageLink href={`/${lang}/pricing`} className={styles.secondaryLink}>
                Back to Pricing
              </SamePageLink>
            </div>
          ) : (
            <>
              <div className={styles.planSwitcher} role="tablist" aria-label="Choose a plan">
                {PLANS.map((p) => {
                  const active = p.key === plan.key;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={styles.planTab}
                      style={active ? { borderColor: p.color, color: p.color, background: "#fff" } : undefined}
                      onClick={() => setSelectedKey(p.key)}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>

              <div className={styles.frameWrap}>
                {status === "loading" && (
                  <div className={styles.loadingOverlay}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={styles.skeletonRow} />
                    ))}
                  </div>
                )}
                {status === "unavailable" ? (
                  <div className={styles.stateBox}>
                    <h4 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>
                      Checkout isn&apos;t available right now
                    </h4>
                    <span style={{ color: COLOR_TEXT_MUTED }}>
                      Please try again in a moment or contact support@alteradatasuite.com.
                    </span>
                  </div>
                ) : (
                  <div className={`${FRAME_ID} ${styles.frame}`} />
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.summaryPanel}>
          <span style={{ fontSize: 15, fontWeight: 600, display: "block", marginBottom: 22 }}>
            Order Summary
          </span>

          <div className={styles.summaryRow}>
            <span style={{ color: COLOR_TEXT_MUTED, fontSize: 13 }}>Plan</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{plan.name}</span>
          </div>
          <div className={styles.summaryRow}>
            <span style={{ color: COLOR_TEXT_MUTED, fontSize: 13 }}>Billing</span>
            <span style={{ fontSize: 13, fontWeight: 600, textAlign: "right", maxWidth: 180 }}>
              {plan.subtitle}
            </span>
          </div>

          <div className={styles.divider} />

          <ul className={styles.featureList}>
            {plan.features.map((f) => (
              <li key={f}>
                <CheckCircleFilledIcon size={12} style={{ color: plan.color }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span style={{ fontSize: 13, color: COLOR_TEXT_MUTED }}>
              {plan.period === "one-time" ? "Total due" : "Total due today"}
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "2px 0 0", color: plan.color }}>
              ${plan.price}
              <span style={{ fontSize: 14, fontWeight: 500, color: COLOR_TEXT_MUTED }}> {plan.period}</span>
            </h3>
          </div>

          <span style={{ display: "block", marginTop: 20, fontSize: 11.5, color: COLOR_TEXT_MUTED }}>
            <LockIcon size={11} style={{ marginRight: 4 }} />
            Secured by Paddle. Your license key is emailed automatically once payment completes.
          </span>
        </div>
      </div>
    </section>
  );
}
