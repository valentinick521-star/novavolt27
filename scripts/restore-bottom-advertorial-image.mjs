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
  src="${BESTSELLER_BASE}&width=1445"
  srcset="${BESTSELLER_BASE}&width=850 850w, ${BESTSELLER_BASE}&width=1445 1445w"
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
fs.writeFileSync(filePath, html);

console.log("Kept the top and bottom advertorial images; middle two remain removed");
