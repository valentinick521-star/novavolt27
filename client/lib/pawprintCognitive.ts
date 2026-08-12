// REPLACE WITH PAWPRINT AFFILIATE URL
export const PAWPRINT_URL = "#";

const FORWARDED_PARAMS = [
  "gclid",
  "wbraid",
  "gbraid",
  "msclkid",
  "fbclid",
  "ttclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "adgroupid",
  "campaignid",
  "creative",
  "keyword",
  "matchtype",
  "device",
  "network",
  "placement",
  "sub_id",
  "subid",
  "aff_sub",
  "click_id",
];

export type CtaLocation =
  | "hero"
  | "top_pick"
  | "rankings"
  | "full_review"
  | "why_number_one"
  | "repeated_pick"
  | "final_recommendation"
  | "sticky_cta";

export function buildPawprintUrl(): string {
  if (typeof window === "undefined" || PAWPRINT_URL === "#") return PAWPRINT_URL;

  const incoming = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();
  for (const key of FORWARDED_PARAMS) {
    const value = incoming.get(key);
    if (value) forwarded.set(key, value);
  }
  if (![...forwarded].length) return PAWPRINT_URL;

  try {
    const url = new URL(PAWPRINT_URL, window.location.href);
    forwarded.forEach((value, key) => url.searchParams.set(key, value));
    return url.toString();
  } catch {
    return PAWPRINT_URL;
  }
}

export function trackOutboundClick(location: CtaLocation) {
  if (typeof window === "undefined") return;

  const payload = {
    event: "pawprint_outbound_click",
    cta_location: location,
    product: "PawPrint Protocol",
    page_path: window.location.pathname,
  };

  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
  w.gtag?.("event", "pawprint_outbound_click", {
    cta_location: location,
    product: "PawPrint Protocol",
  });
}
