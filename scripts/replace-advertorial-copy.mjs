import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const copyPath = path.join(root, "content", "pawprint-dementia", "final-copy.md");
let html = fs.readFileSync(filePath, "utf8");
const finalCopy = fs.readFileSync(copyPath, "utf8").trim();

const headline = "This Breakthrough Formula Is Helping Senior Dogs With Cognitive Decline Feel Like Themselves Again";
const subheadline = "If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.";

const HERO_IMAGE = '<figure class="editorial-image">\n<img alt="Senior dog" decoding="async" fetchpriority="high" src="https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg"/>\n</figure>';
const PRODUCT_IMAGE = '<figure class="editorial-image" style="margin-top:28px;">\n<img alt="PawPrint Protocol liquid formula" decoding="async" loading="lazy" src="https://pawprintlab.com/cdn/shop/files/PawPrint_carousel_12_1x1_51956652-502d-4b17-9fcc-e7b94a15c8bf.jpg?v=1771763505"/>\n</figure>';

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
`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMarkup(value) {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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
          '<a class="cta-button offer-link" href="#" rel="sponsored">TRY PAWPRINT PROTOCOL RISK-FREE</a>' +
        "</div>",
      );
      continue;
    }

    if (raw.startsWith("### ")) {
      const source = raw.slice(4);
      const text = plainHeading(source);
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

    if (raw === "**Over 15,000 dog owners** have started using it to support their dogs as they age.") {
      out.push(PRODUCT_IMAGE);
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
html = html.replace(/<style data-ncr-skim-format>[\s\S]*?<\/style>\s*/g, "");
html = html.replace("</head>", `<style data-ncr-skim-format>${SKIM_CSS}</style>\n</head>`);

for (const marker of [
  headline,
  "they’re physically still there, but some days they just don’t seem as present as they used to.",
  "the problem with aging starts at a cellular level.",
  "What Makes Pawprint Protocol Different",
  "Weeks 4–8: Look for More Good Moments",
  "Made for Owners Who Aren’t Ready to Just Accept the Decline",
  "90-day money-back guarantee.",
  "The point is what those next 90 days could mean for you and your dog.",
  "TRY PAWPRINT PROTOCOL RISK-FREE",
  'class="article-section-heading"',
  'class="article-timeline-heading"',
  'data-ncr-skim-format',
  'id="senior-dogs"',
  'id="approaches"',
  'id="cellular-energy"',
  'id="ninety-day"',
  'id="evidence"',
]) {
  if (!html.includes(marker)) throw new Error(`Missing expected replacement copy/formatting: ${marker}`);
}

for (const oldCopy of [
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
console.log("Replaced advertorial article copy and applied scoped skimming hierarchy while preserving the existing presentation layer");
