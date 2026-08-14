import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spaRoot = path.join(root, "dist", "spa");
const pageDir = path.join(spaRoot, "best-dog-cognitive-supplements");
const htmlPath = path.join(pageDir, "index.html");

if (!fs.existsSync(htmlPath)) {
  console.log(
    "Dog cognitive performance pass skipped: built comparison page was not found",
  );
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, "utf8");
let inlinedCount = 0;

html = html.replace(/<link\b[^>]*>/gi, (tag) => {
  if (!/\brel=["']stylesheet["']/i.test(tag)) return tag;

  const hrefMatch = tag.match(/\bhref=["']([^"']+\.css)["']/i);
  if (!hrefMatch) return tag;

  const href = hrefMatch[1];
  if (!href.startsWith("/best-dog-cognitive-supplements/")) return tag;

  const cssPath = path.join(spaRoot, href.replace(/^\//, ""));
  if (!fs.existsSync(cssPath)) {
    console.log(`Dog cognitive CSS inline skipped: ${href} was not found`);
    return tag;
  }

  let css = fs.readFileSync(cssPath, "utf8");

  // Fonts are loaded asynchronously by dog-cognitive-page/index.html. Remove
  // the duplicate Google Fonts @import so it cannot recreate a blocking chain.
  css = css
    .replace(
      /@import\s+url\((["'])https:\/\/fonts\.googleapis\.com.*?\1\);\s*/gi,
      "",
    )
    .replace(
      /@import\s*(["'])https:\/\/fonts\.googleapis\.com.*?\1;\s*/gi,
      "",
    );

  inlinedCount += 1;
  return `<style data-ncr-inline-critical-css>${css}</style>`;
});

fs.writeFileSync(htmlPath, html);

if (inlinedCount > 0) {
  console.log(
    `Inlined ${inlinedCount} dog cognitive stylesheet${inlinedCount === 1 ? "" : "s"} to remove render-blocking CSS requests`,
  );
} else {
  console.log(
    "Dog cognitive performance pass completed without a local stylesheet to inline",
  );
}
