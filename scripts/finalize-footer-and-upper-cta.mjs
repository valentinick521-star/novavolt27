import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist", "spa");
const indexPath = path.join(distDir, "index.html");

function stripFooterContact(html) {
  return html.replace(
    /<footer\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\s\S]*?<\/footer>/gi,
    (footer) => {
      let nextFooter = footer.replace(
        /\s*<a\b[^>]*>\s*Contact\s*<\/a>\s*/gi,
        "",
      );

      // The current footer only has a Contact link, but remove any footer form
      // too so a future source-template change cannot reintroduce one.
      nextFooter = nextFooter.replace(
        /\s*<form\b[^>]*>[\s\S]*?<\/form>\s*/gi,
        "",
      );

      return nextFooter;
    },
  );
}

function addUpperCta(html) {
  if (html.includes("data-ncr-upper-pawprint-cta")) {
    return html;
  }

  const ctaPattern = /<div class="healthinsider-bottom-cta">[\s\S]*?<div class="healthinsider-bottom-cta__note">[\s\S]*?<\/div>\s*<\/div>/i;
  const ctaMatch = html.match(ctaPattern);
  if (!ctaMatch) {
    throw new Error("Could not find the existing redesigned PawPrint CTA");
  }

  let upperCta = ctaMatch[0]
    .replace(
      '<div class="healthinsider-bottom-cta">',
      '<div class="healthinsider-bottom-cta" data-ncr-upper-pawprint-cta>',
    )
    .replace(
      "Continue to PawPrint Protocol’s Official Website",
      "See PawPrint Protocol on the Official Website",
    )
    .replace(
      "You’ll be taken directly to pawprintlab.com, the official website for PawPrint Protocol.",
      "Continue directly to pawprintlab.com, the official website for PawPrint Protocol.",
    );

  const proofMarker = '<figure class="editorial-image pawprint-bottom-proof"';
  if (!html.includes(proofMarker)) {
    throw new Error("Could not find the bottom PawPrint proof image");
  }

  return html.replace(proofMarker, `${upperCta}\n${proofMarker}`);
}

if (!fs.existsSync(indexPath)) {
  throw new Error("Built home page does not exist");
}

let indexHtml = fs.readFileSync(indexPath, "utf8");
indexHtml = addUpperCta(indexHtml);
indexHtml = stripFooterContact(indexHtml);
fs.writeFileSync(indexPath, indexHtml);

// Legal pages are generated immediately before this script. Keep their shared
// footer consistent with the home page without removing contact information
// that belongs inside the legal-page body itself.
for (const dirent of fs.readdirSync(distDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const pagePath = path.join(distDir, dirent.name, "index.html");
  if (!fs.existsSync(pagePath)) continue;
  const pageHtml = fs.readFileSync(pagePath, "utf8");
  fs.writeFileSync(pagePath, stripFooterContact(pageHtml));
}

const finalHome = fs.readFileSync(indexPath, "utf8");
const upperCtaCount = (finalHome.match(/data-ncr-upper-pawprint-cta/g) || []).length;
const ctaButtonCount = (finalHome.match(/healthinsider-bottom-cta__button/g) || []).length;

if (upperCtaCount !== 1) {
  throw new Error(`Expected one upper PawPrint CTA, found ${upperCtaCount}`);
}
if (ctaButtonCount < 2) {
  throw new Error(`Expected at least two redesigned CTA buttons, found ${ctaButtonCount}`);
}
if (/site-footer[\s\S]*?<a\b[^>]*>\s*Contact\s*<\/a>[\s\S]*?<\/footer>/i.test(finalHome)) {
  throw new Error("Footer Contact link still exists");
}
if (/site-footer[\s\S]*?<form\b[\s\S]*?<\/footer>/i.test(finalHome)) {
  throw new Error("Footer form still exists");
}
if (!finalHome.includes("See PawPrint Protocol on the Official Website")) {
  throw new Error("Upper CTA official-site reassurance is missing");
}

console.log("Added upper PawPrint CTA and removed footer Contact link/form from built pages");
