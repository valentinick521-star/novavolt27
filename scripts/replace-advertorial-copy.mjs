import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const copyPath = path.join(root, "content", "pawprint-dementia", "final-copy.md");
const lifestyleImagePath = path.join(root, "content", "pawprint-dementia", "lifestyle-image.txt");
const ugcImagePath = path.join(root, "content", "pawprint-dementia", "ugc-image.txt");
const assetDir = path.join(root, "dist", "spa", "assets");

let html = fs.readFileSync(filePath, "utf8");
const lifestyleImageData = fs.readFileSync(lifestyleImagePath, "utf8").trim();
const ugcImageData = fs.readFileSync(ugcImagePath, "utf8").trim();

const finalCopy = fs
  .readFileSync(copyPath, "utf8")
  .trim()
  .replace("Over 15,000 dog owners", "Over 100,000 dog owners")
  .replace(
    "But the problem with them is they only mask the symptoms on the surface, while the underlying structure keeps degrading.",
    "But the problem with most supplements is they only address symptoms on the surface, while the underlying structure keeps degrading.",
  )
  .replace(
    "More moments where you look at them and think:\n\n**“There you are.”**\n\nBecause that’s what you really want.\n\n**More of the dog you remember.**",
    "More moments where you look at them and think:\n\n**\"That's the dog I remember.\"**",
  );

const headline = "This Breakthrough Formula Is Helping Senior Dogs With Cognitive Decline Feel Like Themselves Again";
const subheadline = "If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.";
const AFFILIATE_URL = "https://pawprintlab.com/products/pawprint-lab/?lpid=1160&source_id=DL&utm_source=34379&utm_medium=&utm_term=1160&aff_id=34379&sub_id=&req_id=&oid=1160&device_type=&country_name=&_ef_transaction_id=&oid=1160&affid=34379";
const AFFILIATE_HREF = AFFILIATE_URL.replace(/&/g, "&amp;");
const GIDDYUP_SRC = "https://js.giddyup.io/gulinkfixup.js";
const BESTSELLER_BASE = "https://pawprintlab.com/cdn/shop/files/PawPrint_carousel_12_1x1_51956652-502d-4b17-9fcc-e7b94a15c8bf.jpg?v=1771763505";

function materializeDataUri(dataUri, filename) {
  const match = dataUri.match(/^data:image\/(?:jpeg|jpg|png|webp);base64,(.+)$/s);
  if (!match) throw new Error(`Invalid image data URI for ${filename}`);

  fs.mkdirSync(assetDir, { recursive: true });
  const outputPath = path.join(assetDir, filename);
  fs.writeFileSync(outputPath, Buffer.from(match[1], "base64"));

  const size = fs.statSync(outputPath).size;
  if (size < 20000) throw new Error(`Generated image asset is unexpectedly small: ${filename} (${size} bytes)`);
  return `/assets/${filename}`;
}

// Turn uploaded image data into normal static image files instead of huge inline data URLs.
// This is more reliable in browsers and avoids the rendering issues we saw with embedded images.
const LIFESTYLE_ASSET = materializeDataUri(lifestyleImageData, "pawprint-lifestyle.jpg");
const UGC_ASSET = materializeDataUri(ugcImageData, "pawprint-ugc.jpg");

const HERO_IMAGE = '<figure class="editorial-image">\n<img alt="Senior dog" decoding="async" fetchpriority="high" src="https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg"/>\n</figure>';

const LIFESTYLE_IMAGE = `<figure class="editorial-image pawprint-lifestyle-image" style="margin-top:28px;">
<img alt="Pawprint Lab liquid supplement beside a dog’s paw" decoding="async" loading="lazy" src="${LIFESTYLE_ASSET}"/>
</figure>`;

const UGC_IMAGE = `<figure class="editorial-image pawprint-ugc-image" style="margin-top:28px;">
<img alt="Dog beside a bottle of Pawprint Lab liquid supplement" decoding="async" loading="lazy" src="${UGC_ASSET}"/>
</figure>`;

const BOTTOM_BESTSELLER_IMAGE = `<figure class="editorial-image pawprint-bottom-proof" style="margin:28px 0 24px;">
<img alt="PawPrint Protocol best-seller, over 100,000 units sold, 90-day guarantee"
  decoding="async"
  loading="lazy"
  src="${BESTSELLER_BASE}&width=1445"
  srcset="${BESTSELLER_BASE}&width=850 850w, ${BESTSELLER_BASE}&width=1445 1445w"
  sizes="(max-width: 780px) calc(100vw - 48px), 780px"/>
</figure>`;

const SKIM_CSS = `
.article-shell .article-copy h2.article-section-heading{
  color:var(--headline-color);
  font-family:inherit;
  font-size:1.26em;
  font-weight:800;
  line-height:1.25;
  letter-spacing:-.015em;
  margin:34px 0 13px;
}
.article-shell .article-copy h3.article-timeline-heading{
  color:var(--headline-color);
  font-family:inherit;
  font-size:1.12em;
  font-weight:800;
  line-height:1.3;
  letter-spacing:-.01em;
  margin:25px 0 10px;
}
.article-shell .article-copy h2.article-section-heading + p,
.article-shell .article-copy h3.article-timeline-heading + p{margin-top:0;}
.article-shell .article-copy .cta-block{margin-top:0;}
.article-shell .article-copy a.pawprint-inline-link,
.article-shell .article-copy a.pawprint-inline-link:visited{
  color:#1456b8 !important;
  text-decoration:underline !important;
  text-decoration-thickness:1px !important;
  text-underline-offset:2px;
}
.article-shell .article-copy a.pawprint-inline-link:hover,
.article-shell .article-copy a.pawprint-inline-link:focus-visible{color:#0b3f91 !important;}
.article-shell .pawprint-lifestyle-image{
  max-width:700px;
  margin-left:auto;
  margin-right:auto;
}
.article-shell .pawprint-lifestyle-image img,
.article-shell .pawprint-ugc-image img,
.article-shell .pawprint-bottom-proof img{
  width:100%;
  height:auto;
  display:block;
  image-rendering:auto;
}
`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function linkPawprintMentions(value) {
  return value.replace(
    /Pawprint Protocol/gi,
    (match) => `<a class="pawprint-inline-link" href="${AFFILIATE_HREF}" target="_blank" rel="sponsored noopener noreferrer">${match}</a>`,
  );
}

function inlineMarkup(value) {
  const rendered = escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return linkPawprintMentions(rendered);
}

function plainHeading(value) {
  return value.replace(/\*\*/g, "").trim();
}

function headingId(text) {
  if (text === "What Makes Pawprint Protocol Different") return "approaches";
  if (text === "What Could the Next 90 Days Look Like?") return "evidence";
  if (text === "Made for Owners Who Aren’t Ready to Just Accept the Decline") return "cellular-energy";
  if (text === "That’s Why You Get 90 Days to Try It") return "ninety-day";
  return "";
}

function renderCopy(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let lifestyleInserted = false;
  let ugcInserted = false;
  let bottomProofInserted = false;

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i].trim();
    if (!raw) continue;

    if (raw === "**[TRY PAWPRINT PROTOCOL RISK-FREE]**") {
      if (!bottomProofInserted) {
        out.push(BOTTOM_BESTSELLER_IMAGE);
        bottomProofInserted = true;
      }
      out.push(
        '<div class="cta-block" style="margin-bottom:0;">' +
          `<a class="cta-button offer-link" href="${AFFILIATE_HREF}" target="_blank" rel="sponsored noopener noreferrer">TRY PAWPRINT PROTOCOL RISK-FREE</a>` +
        "</div>",
      );
      continue;
    }

    if (raw.startsWith("### ")) {
      const source = raw.slice(4);
      out.push(`<h3 class="article-timeline-heading">${inlineMarkup(source)}</h3>`);
      continue;
    }

    if (raw.startsWith("## ")) {
      const source = raw.slice(3);
      const text = plainHeading(source);

      if (text === "What Could the Next 90 Days Look Like?" && !lifestyleInserted) {
        out.push(LIFESTYLE_IMAGE);
        lifestyleInserted = true;
      }
      if (text === "That’s Why You Get 90 Days to Try It" && !ugcInserted) {
        out.push(UGC_IMAGE);
        ugcInserted = true;
      }

      const id = headingId(text);
      out.push(`<h2${id ? ` id="${id}"` : ""} class="article-section-heading">${inlineMarkup(source)}</h2>`);
      continue;
    }

    if (raw.startsWith("- ")) {
      const items = [];
      let cursor = i;
      while (cursor < lines.length && lines[cursor].trim().startsWith("- ")) {
        items.push(`<li>${inlineMarkup(lines[cursor].trim().slice(2))}</li>`);
        cursor += 1;
      }
      out.push(`<ul class="copy-list">${items.join("")}</ul>`);
      i = cursor - 1;
      continue;
    }

    out.push(`<p>${inlineMarkup(raw)}</p>`);
  }

  if (!lifestyleInserted) throw new Error("Could not place lifestyle image before the 90-day timeline");
  if (!ugcInserted) throw new Error("Could not place UGC image before the 90-day guarantee section");
  if (!bottomProofInserted) throw new Error("Could not place bottom best-seller image before the CTA");

  return out.join("\n");
}

const article = `<article class="article-shell">
<h1 class="balanced-headline">${headline}</h1>
<p class="dek">${subheadline}</p>

${HERO_IMAGE}

<div class="article-intro article-copy" id="senior-dogs">
${renderCopy(finalCopy)}
</div>
</article>`;

if (!/<article class="article-shell">[\s\S]*?<\/article>/.test(html)) {
  throw new Error("Could not find the existing advertorial article");
}

html = html.replace(/<article class="article-shell">[\s\S]*?<\/article>/, article);
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${headline}</title>`);
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${subheadline}" />`);

html = html.replace(
  /const OFFER_URL = ["'][^"']*["'];/,
  `const OFFER_URL = ${JSON.stringify(AFFILIATE_URL)};`,
);

html = html.replace(/<style data-ncr-skim-format>[\s\S]*?<\/style>\s*/g, "");
html = html.replace("</head>", `<style data-ncr-skim-format>${SKIM_CSS}</style>\n</head>`);

// Install GiddyUp exactly once near the end of body.
html = html.replace(/\s*<script[^>]*src=["']https:\/\/js\.giddyup\.io\/gulinkfixup\.js["'][^>]*><\/script>/gi, "");
html = html.replace(
  "</body>",
  `<script type="text/javascript" src="${GIDDYUP_SRC}"></script>\n</body>`,
);

const requiredText = [
  headline,
  "Over 100,000 dog owners",
  "But the problem with most supplements is they only address symptoms on the surface, while the underlying structure keeps degrading.",
  "That's the dog I remember.",
  "TRY PAWPRINT PROTOCOL RISK-FREE",
  'target="_blank"',
  'id="senior-dogs"',
  'id="approaches"',
  'id="cellular-energy"',
  'id="ninety-day"',
  'id="evidence"',
  "aff_id=34379",
  GIDDYUP_SRC,
  LIFESTYLE_ASSET,
  UGC_ASSET,
];
for (const marker of requiredText) {
  if (!html.includes(marker)) throw new Error(`Missing expected replacement copy/formatting: ${marker}`);
}

const classTokens = new Set(
  [...html.matchAll(/class=["']([^"']+)["']/g)]
    .flatMap((match) => match[1].trim().split(/\s+/)),
);
for (const className of [
  "pawprint-inline-link",
  "pawprint-lifestyle-image",
  "pawprint-ugc-image",
  "pawprint-bottom-proof",
  "article-section-heading",
  "article-timeline-heading",
]) {
  if (!classTokens.has(className)) throw new Error(`Missing expected class token: ${className}`);
}

// The old formula-adjacent product proof image is intentionally removed.
if (classTokens.has("pawprint-product-proof")) {
  throw new Error("Formula-adjacent product proof image should have been removed");
}

for (const oldCopy of [
  "Over 15,000 dog owners",
  "But the problem with them is they only mask the symptoms on the surface, while the underlying structure keeps degrading.",
  "There you are.",
  "Because that’s what you really want.",
]) {
  if (html.includes(oldCopy)) throw new Error(`Old advertorial copy remained: ${oldCopy}`);
}

const giddyupCount = (html.match(/https:\/\/js\.giddyup\.io\/gulinkfixup\.js/g) || []).length;
if (giddyupCount !== 1) throw new Error(`Expected exactly one GiddyUp script, found ${giddyupCount}`);

for (const assetName of ["pawprint-lifestyle.jpg", "pawprint-ugc.jpg"]) {
  const generatedPath = path.join(assetDir, assetName);
  if (!fs.existsSync(generatedPath)) throw new Error(`Missing generated image asset: ${assetName}`);
}

const renderedArticle = html.match(/<article class="article-shell">[\s\S]*?<\/article>/)?.[0] || "";
for (const markdownMarker of ["## ", "### ", "**"]) {
  if (renderedArticle.includes(markdownMarker)) {
    throw new Error(`Markdown marker leaked into rendered article: ${markdownMarker}`);
  }
}

// Confirm there is NO inserted image between the formula paragraph and the next section heading.
const formulaIndex = renderedArticle.indexOf("The formula contains NAD+");
const whatMakesIndex = renderedArticle.indexOf("What Makes");
const betweenFormulaAndHeading = renderedArticle.slice(formulaIndex, whatMakesIndex);
if (formulaIndex < 0 || whatMakesIndex < 0 || /<figure\b/i.test(betweenFormulaAndHeading)) {
  throw new Error("An image still appears between the formula paragraph and What Makes Pawprint Protocol Different");
}

const finalMemoryIndex = renderedArticle.lastIndexOf("More of the dog you remember.");
const bottomProofIndex = renderedArticle.indexOf("pawprint-bottom-proof");
const ctaIndex = renderedArticle.indexOf("TRY PAWPRINT PROTOCOL RISK-FREE");
if (!(finalMemoryIndex >= 0 && bottomProofIndex > finalMemoryIndex && ctaIndex > bottomProofIndex)) {
  throw new Error("Bottom best-seller image is not positioned between the final memory line and CTA");
}

fs.writeFileSync(filePath, html);
console.log("Completed PawPrint image cleanup: removed formula proof image, materialized uploaded images as static assets, preserved affiliate links and tracking");
