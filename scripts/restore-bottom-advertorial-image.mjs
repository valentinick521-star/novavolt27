import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");

const BESTSELLER_BASE =
  "https://pawprintlab.com/cdn/shop/files/PawPrint_carousel_12_1x1_51956652-502d-4b17-9fcc-e7b94a15c8bf.jpg?v=1771763505";

const BOTTOM_BESTSELLER_IMAGE = `<figure class="editorial-image pawprint-bottom-proof" style="margin:28px 0 24px;">
<img alt="PawPrint Protocol best-seller, over 100,000 units sold, 90-day guarantee"
  decoding="async"
  loading="lazy"
  fetchpriority="low"
  width="1000"
  height="1000"
  src="${BESTSELLER_BASE}&width=780"
  srcset="${BESTSELLER_BASE}&width=480 480w, ${BESTSELLER_BASE}&width=780 780w, ${BESTSELLER_BASE}&width=1000 1000w"
  sizes="(max-width: 780px) calc(100vw - 48px), 780px"/>
</figure>`;

const articleMatch = html.match(/<article class="article-shell">[\s\S]*?<\/article>/);
if (!articleMatch) {
  throw new Error("Could not find the advertorial article");
}

let article = articleMatch[0];

// The previous build step intentionally leaves only the top hero image.
// Add back the original bottom proof image immediately before the final CTA.
const ctaMarker = '<div class="cta-block" style="margin-bottom:0;">';
if (!article.includes(ctaMarker)) {
  throw new Error("Could not find the final CTA block");
}

if (!article.includes("pawprint-bottom-proof")) {
  article = article.replace(ctaMarker, `${BOTTOM_BESTSELLER_IMAGE}\n${ctaMarker}`);
}

const articleImages = article.match(/<img\b/gi) || [];
if (articleImages.length !== 2) {
  throw new Error(
    `Expected exactly two article images (top and bottom), found ${articleImages.length}`,
  );
}

if (!/fetchpriority=["']high["']/i.test(article) || !/alt=["']Senior dog["']/i.test(article)) {
  throw new Error("The top hero image changed unexpectedly");
}

if (!article.includes("pawprint-bottom-proof") || !article.includes(BESTSELLER_BASE)) {
  throw new Error("The original bottom best-seller image is missing");
}

if (/pawprint-lifestyle-image|pawprint-ugc-image/.test(article)) {
  throw new Error("A middle advertorial image is still present");
}

html = html.replace(articleMatch[0], article);

// The GiddyUp script is created by the preceding advertorial build step.
// Keep the existing single tag in <head>, but defer execution so it does not
// block HTML parsing or rendering.
const giddyupScriptMatch = html.match(
  /<script[^>]*src=["'][^"']*gulinkfixup\.js["'][^>]*><\/script>/i,
);
if (!giddyupScriptMatch) {
  throw new Error("Could not find the existing GiddyUp click-ID script");
}

html = html.replace(giddyupScriptMatch[0], "");
const deferredGiddyupScript = /\bdefer\b/i.test(giddyupScriptMatch[0])
  ? giddyupScriptMatch[0]
  : giddyupScriptMatch[0].replace("<script", "<script defer");
html = html.replace("</head>", `${deferredGiddyupScript}\n</head>`);

const giddyupScripts =
  html.match(/<script[^>]*src=["'][^"']*gulinkfixup\.js["'][^>]*><\/script>/gi) || [];
if (giddyupScripts.length !== 1) {
  throw new Error(
    `Expected exactly one GiddyUp click-ID script, found ${giddyupScripts.length}`,
  );
}

if (!/<head>[\s\S]*<script[^>]*\bdefer\b[^>]*gulinkfixup\.js[\s\S]*<\/head>/i.test(html)) {
  throw new Error("GiddyUp click-ID script was not deferred in <head>");
}

// Mobile performance patch: the original hero is a 6000x3376 JPEG (~567 KiB)
// even though it renders at roughly article width. Route it through the same
// responsive Next.js image endpoint used by the source publisher, give the
// browser explicit intrinsic dimensions, and preload the responsive candidate.
const HERO_ORIGINAL =
  "https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg";
const HERO_ENCODED = encodeURIComponent(HERO_ORIGINAL);
const heroUrl = (width) =>
  `https://www.theepochtimes.com/_next/image?url=${HERO_ENCODED}&w=${width}&q=75`;
const HERO_640 = heroUrl(640).replace(/&/g, "&amp;");
const HERO_828 = heroUrl(828).replace(/&/g, "&amp;");
const HERO_1080 = heroUrl(1080).replace(/&/g, "&amp;");
const HERO_SRCSET = `${HERO_640} 640w, ${HERO_828} 828w, ${HERO_1080} 1080w`;
const HERO_SIZES = "(max-width: 780px) calc(100vw - 48px), 780px";

const optimizedHero = `<img alt="Senior dog"
  width="6000"
  height="3376"
  loading="eager"
  decoding="async"
  fetchpriority="high"
  src="${HERO_828}"
  srcset="${HERO_SRCSET}"
  sizes="${HERO_SIZES}"/>`;

const heroPattern = /<img\s+alt=["']Senior dog["'][^>]*>/i;
if (!heroPattern.test(html)) {
  throw new Error("Could not find the top hero image for performance optimization");
}
html = html.replace(heroPattern, optimizedHero);

// Remove the old high-priority logo preload so it does not compete with the
// actual LCP image on a constrained mobile connection.
html = html.replace(
  /\s*<link\s+rel=["']preload["']\s+as=["']image["']\s+href=["'][^"']*badcc4098d254fadb81b2c01ff7bb98c[^"']*["'][^>]*>/gi,
  "",
);

// Ensure only one responsive hero preload/preconnect is present.
html = html.replace(/\s*<link[^>]+data-ncr-hero-preload[^>]*>/gi, "");
html = html.replace(/\s*<link[^>]+data-ncr-epoch-preconnect[^>]*>/gi, "");

const HERO_PRELOAD = `<link data-ncr-epoch-preconnect rel="preconnect" href="https://www.theepochtimes.com" crossorigin />
<link data-ncr-hero-preload rel="preload" as="image"
  href="${HERO_828}"
  imagesrcset="${HERO_SRCSET}"
  imagesizes="${HERO_SIZES}"
  fetchpriority="high" />`;
html = html.replace("</head>", `${HERO_PRELOAD}\n</head>`);

if (!html.includes('width="6000"') || !html.includes('height="3376"')) {
  throw new Error("Hero intrinsic dimensions were not added");
}
if (!html.includes("/_next/image?url=") || !html.includes("imagesrcset=")) {
  throw new Error("Responsive hero delivery/preload was not added");
}
if (/badcc4098d254fadb81b2c01ff7bb98c[^>]*fetchpriority=["']high["']/i.test(html)) {
  throw new Error("Old high-priority logo preload remained");
}

fs.writeFileSync(filePath, html);

console.log(
  "Kept top/bottom advertorial images, optimized responsive image delivery and LCP, and deferred GiddyUp without changing tracking logic",
);
