import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const copyPath = path.join(root, "content", "pawprint-dementia", "final-copy.md");
const lifestyleImagePath = path.join(root, "content", "pawprint-dementia", "lifestyle-image.txt");
let html = fs.readFileSync(filePath, "utf8");
const finalCopy = fs
  .readFileSync(copyPath, "utf8")
  .trim()
  .replace("Over 15,000 dog owners", "Over 100,000 dog owners");
const lifestyleImageData = fs.readFileSync(lifestyleImagePath, "utf8").trim();

const headline = "This Breakthrough Formula Is Helping Senior Dogs With Cognitive Decline Feel Like Themselves Again";
const subheadline = "If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.";
const AFFILIATE_URL = "https://pawprintlab.com/products/pawprint-lab/?lpid=1160&source_id=DL&utm_source=34379&utm_medium=&utm_term=1160&aff_id=34379&sub_id=&req_id=&oid=1160&device_type=&country_name=&_ef_transaction_id=&oid=1160&affid=34379";
const AFFILIATE_HREF = AFFILIATE_URL.replace(/&/g, "&amp;");

const HERO_IMAGE = '<figure class="editorial-image">\n<img alt="Senior dog" decoding="async" fetchpriority="high" src="https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg"/>\n</figure>';
const PRODUCT_IMAGE = '<figure class="editorial-image" style="margin-top:28px;">\n<img alt="PawPrint Protocol liquid formula" decoding="async" loading="lazy" src="https://pawprintlab.com/cdn/shop/files/PawPrint_carousel_12_1x1_51956652-502d-4b17-9fcc-e7b94a15c8bf.jpg?v=1771763505"/>\n</figure>';
const LIFESTYLE_IMAGE = `<figure class="editorial-image pawprint-lifestyle-image" style="margin-top:28px;">
<img alt="Pawprint Lab liquid supplement beside a dog’s paw" decoding="async" loading="lazy" src="${lifestyleImageData}"/>
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
.article-shell .article-copy h3.article-timeline-heading + p{
  margin-top:0;
}
.article-shell .article-copy .cta-block{
  margin-top:30px;
}
.article-shell .article-copy a.pawprint-inline-link,
.article-shell .article-copy a.pawprint-inline-link:visited{
  color:#1456b8 !important;
  text-decoration:underline !important;
  text-decoration-thickness:1px !important;
  text-underline-offset:2px;
}
.article-shell .article-copy a.pawprint-inline-link:hover,
.article-shell .article-copy a.pawprint-inline-link:focus-visible{
  color:#0b3f91 !important;
}
.article-shell .pawprint-lifestyle-image img{
  width:100%;
  height:auto;
  display:block;
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
    (match) => `<a class="pawprint-inline-link" href="${AFFILIATE_HREF}" rel="sponsored">${match}</a>`,
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

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i].trim();
    if (!raw) continue;

    if (raw === "**[TRY PAWPRINT PROTOCOL RISK-FREE]**") {
      out.push(
        '<div class="cta-block" style="margin-bottom:0;">' +
          `<a class="cta-button offer-link" href="${AFFILIATE_HREF}" rel="sponsored">TRY PAWPRINT PROTOCOL RISK-FREE</a>` +
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

    if (raw === "**Over 100,000 dog owners** have started using it to support their dogs as they age.") {
      out.push(PRODUCT_IMAGE);
    }

    if (raw === "Just a simple liquid formula that can become part of your dog’s normal routine.") {
      out.push(LIFESTYLE_IMAGE);
    }
  }

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
  /const OFFER_URL = ["']PASTE_AFFILIATE_URL_HERE["'];/,
  `const OFFER_URL = ${JSON.stringify(AFFILIATE_URL)};`,
);
html = html.replace(/<style data-ncr-skim-format>[\s\S]*?<\/style>\s*/g, "");
html = html.replace("</head>", `<style data-ncr-skim-format>${SKIM_CSS}</style>\n</head>`);

for (const marker of [
  headline,
  "Over 100,000 dog owners",
  "they’re physically still there, but some days they just don’t seem as present as they used to.",
  "the problem with aging starts at a cellular level.",
  "Weeks 4–8: Look for More Good Moments",
  "Made for Owners Who Aren’t Ready to Just Accept the Decline",
  "90-day money-back guarantee.",
  "The point is what those next 90 days could mean for you and your dog.",
  "TRY PAWPRINT PROTOCOL RISK-FREE",
  'class="pawprint-inline-link"',
  "pawprint-lifestyle-image",
  'class="article-section-heading"',
  'class="article-timeline-heading"',
  'data-ncr-skim-format',
  'id="senior-dogs"',
  'id="approaches"',
  'id="cellular-energy"',
  'id="ninety-day"',
  'id="evidence"',
  'const OFFER_URL = "https://pawprintlab.com/products/pawprint-lab/?lpid=1160',
  "aff_id=34379",
]) {
  if (!html.includes(marker)) throw new Error(`Missing expected replacement copy/formatting: ${marker}`);
}

for (const oldCopy of [
  "Over 15,000 dog owners",
  "Many owners try to address the problem with painkillers and steroids.",
  "They can even cost you more of the time you would have had with your dog.",
  "It’s delivered in a nanoliposomal liquid",
  "It supports the deeper cellular processes that affects how your dog feels and moves as they age.",
  "You only have to decide whether this approach makes enough sense for your dog.</p>",
]) {
  if (html.includes(oldCopy)) throw new Error(`Old advertorial copy remained: ${oldCopy}`);
}

const renderedArticle = html.match(/<article class="article-shell">[\s\S]*?<\/article>/)?.[0] || "";
for (const markdownMarker of ["## ", "### ", "**"]) {
  if (renderedArticle.includes(markdownMarker)) {
    throw new Error(`Markdown marker leaked into rendered article: ${markdownMarker}`);
  }
}

fs.writeFileSync(filePath, html);
console.log("Updated PawPrint proof, lifestyle image, affiliate links, and skim formatting while preserving the existing presentation layer");
