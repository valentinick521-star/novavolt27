export const PAWPRINT_URL =
  "https://pawprintlab.com/products/pawprint-lab/?aff_id=34379&affid=34379&lpid=1160&oid=1160&source_id=DL&utm_source=34379&utm_term=1160";

const PASSTHROUGH_PARAMS = [
  "gclid",
  "wbraid",
  "gbraid",
  "msclkid",
  "fbclid",
  "ttclid",
  "utm_medium",
  "utm_campaign",
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
] as const;

export type CtaLocation =
  | "hero"
  | "top_pick"
  | "rankings"
  | "full_review"
  | "why_number_one"
  | "repeated_pick"
  | "final_recommendation"
  | "sticky_cta";

function clean(value: string | null): string {
  return (value || "").trim().replace(/\+$/g, "");
}

function firstParam(
  params: URLSearchParams,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = clean(params.get(key));
    if (value) return value;
  }
  return "";
}

export function buildPawprintUrl(): string {
  if (typeof window === "undefined") return PAWPRINT_URL;

  try {
    const incoming = new URLSearchParams(window.location.search);
    const url = new URL(PAWPRINT_URL);

    // Preserve the PawPrint/GiddyUp affiliate tuple on the base URL. Google
    // campaign data is carried in sub IDs and click-ID fields rather than
    // overwriting PawPrint's affiliate utm_source / offer utm_term values.
    const sub1 = firstParam(incoming, "sub1", "keyword", "utm_term");
    const sub2 = firstParam(incoming, "sub2", "campaignid", "utm_campaign");
    const sub3 = firstParam(incoming, "sub3", "adgroupid");
    const sub4 = firstParam(incoming, "sub4", "matchtype");
    const sub5 = firstParam(incoming, "sub5") || "best_dog_cognitive_supplements_v1";

    if (sub1) url.searchParams.set("sub1", sub1);
    if (sub2) url.searchParams.set("sub2", sub2);
    if (sub3) url.searchParams.set("sub3", sub3);
    if (sub4) url.searchParams.set("sub4", sub4);
    url.searchParams.set("sub5", sub5);

    for (const key of PASSTHROUGH_PARAMS) {
      const value = clean(incoming.get(key));
      if (value) url.searchParams.set(key, value);
    }

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
