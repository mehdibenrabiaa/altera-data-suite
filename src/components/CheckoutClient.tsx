"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton, Typography } from "antd";
import { CheckCircleFilled, LockOutlined } from "@ant-design/icons";
import SamePageLink from "./SamePageLink";
import { openInlineCheckout } from "@/lib/paddle";
import { PLANS, getPlan } from "@/lib/plans";
import { COLOR_TEXT_MUTED } from "@/lib/theme";
import styles from "./CheckoutClient.module.css";

const { Text, Title } = Typography;

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

  useEffect(() => {
    if (initedFor.current === plan.key) return;
    initedFor.current = plan.key;
    setStatus("loading");

    let cancelled = false;
    openInlineCheckout(plan.priceId, FRAME_ID, (event) => {
      if (cancelled) return;
      // The webhook (altera-license-server /webhooks/paddle) is what
      // actually issues and emails the license key -- this is just a
      // lightweight UI acknowledgment that the purchase went through.
      if (event.name === "checkout.completed") setStatus("completed");
    }).then((opened) => {
      if (!cancelled) setStatus(opened ? "ready" : "unavailable");
    });

    return () => {
      cancelled = true;
    };
  }, [plan.key, plan.priceId]);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.formPanel}>
          {status === "completed" ? (
            <div className={styles.successState}>
              <div className={styles.successIcon} style={{ background: `${plan.color}1f`, color: plan.color }}>
                <CheckCircleFilled />
              </div>
              <Title level={3} style={{ margin: "20px 0 6px" }}>
                Your license is on its way!
              </Title>
              <Text style={{ color: COLOR_TEXT_MUTED, maxWidth: 300, display: "block" }}>
                We&apos;ve emailed your license key — check your inbox (and spam folder) over the next
                few minutes.
              </Text>
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
                    <Skeleton active paragraph={{ rows: 6 }} />
                  </div>
                )}
                {status === "unavailable" ? (
                  <div className={styles.stateBox}>
                    <Title level={4} style={{ margin: "0 0 4px" }}>
                      Checkout isn&apos;t available right now
                    </Title>
                    <Text style={{ color: COLOR_TEXT_MUTED }}>
                      Please try again in a moment or contact support@alteradatasuite.com.
                    </Text>
                  </div>
                ) : (
                  <div id={FRAME_ID} className={styles.frame} />
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.summaryPanel}>
          <Text strong style={{ fontSize: 15, display: "block", marginBottom: 22 }}>
            Order Summary
          </Text>

          <div className={styles.summaryRow}>
            <Text style={{ color: COLOR_TEXT_MUTED, fontSize: 13 }}>Plan</Text>
            <Text style={{ fontSize: 13, fontWeight: 600 }}>{plan.name}</Text>
          </div>
          <div className={styles.summaryRow}>
            <Text style={{ color: COLOR_TEXT_MUTED, fontSize: 13 }}>Billing</Text>
            <Text style={{ fontSize: 13, fontWeight: 600, textAlign: "right", maxWidth: 180 }}>
              {plan.subtitle}
            </Text>
          </div>

          <div className={styles.divider} />

          <ul className={styles.featureList}>
            {plan.features.map((f) => (
              <li key={f}>
                <CheckCircleFilled style={{ color: plan.color, fontSize: 12 }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <Text style={{ fontSize: 13, color: COLOR_TEXT_MUTED }}>
              {plan.period === "one-time" ? "Total due" : "Total due today"}
            </Text>
            <Title level={3} style={{ margin: "2px 0 0", color: plan.color }}>
              ${plan.price}
              <span style={{ fontSize: 14, fontWeight: 500, color: COLOR_TEXT_MUTED }}> {plan.period}</span>
            </Title>
          </div>

          <Text style={{ display: "block", marginTop: 20, fontSize: 11.5, color: COLOR_TEXT_MUTED }}>
            <LockOutlined style={{ marginRight: 4 }} />
            Secured by Paddle. Your license key is emailed automatically once payment completes.
          </Text>
        </div>
      </div>
    </section>
  );
}
