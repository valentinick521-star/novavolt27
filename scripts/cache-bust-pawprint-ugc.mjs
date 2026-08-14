import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");
const oldSrc = "/assets/pawprint-ugc.webp";
const newSrc = "/assets/pawprint-ugc-20260810.webp";

if (!html.includes(oldSrc)) {
  throw new Error(`Could not find ${oldSrc} in rendered HTML`);
}

// Replace the cache-busted UGC source and give the browser responsive,
// same-origin Netlify Image CDN candidates. The image is below the fold, but
// Chrome may still preload it on mobile when it falls within the lazy-load
// distance threshold, so avoid making that request larger than necessary.
const ugcPattern = /<img\s+alt=["']Senior dog with PawPrint Lab daily liquid supplement["'][^>]*>/i;
if (!ugcPattern.test(html)) {
  throw new Error("Could not find the PawPrint UGC image tag");
}

const ugcUrl = (width) =>
  `/.netlify/images?url=${newSrc}&w=${width}&q=65`.replace(/&/g, "&amp;");
const UGC_384 = ugcUrl(384);
const UGC_480 = ugcUrl(480);
const UGC_640 = ugcUrl(640);
const UGC_780 = ugcUrl(780);
const UGC_SRCSET = `${UGC_384} 384w, ${UGC_480} 480w, ${UGC_640} 640w, ${UGC_780} 780w`;
const UGC_SIZES = "(max-width: 780px) calc(100vw - 48px), 780px";

const optimizedUgc = `<img alt="Senior dog with PawPrint Lab daily liquid supplement"
  decoding="async"
  loading="lazy"
  fetchpriority="low"
  width="1080"
  height="921"
  src="${UGC_640}"
  srcset="${UGC_SRCSET}"
  sizes="${UGC_SIZES}"/>`;

html = html.replace(ugcPattern, optimizedUgc);

if (!html.includes(newSrc) || html.includes(oldSrc)) {
  throw new Error("Failed to replace and optimize the PawPrint UGC asset URL");
}
if (!html.includes("/.netlify/images?url=/assets/pawprint-ugc-20260810.webp")) {
  throw new Error("Netlify Image CDN was not added to the PawPrint UGC image");
}

fs.writeFileSync(filePath, html);
console.log(
  `Updated ${newSrc} with responsive Netlify Image CDN delivery`,
);
