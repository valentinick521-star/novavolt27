import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const copyPath = path.join(root, "content", "pawprint-dementia", "final-copy.md");

let html = fs.readFileSync(filePath, "utf8");

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

const headline =
  "This Breakthrough Formula Is Helping Senior Dogs With Cognitive Decline Feel Like Themselves Again";
const subheadline =
  "If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.";
const AFFILIATE_URL =
  "https://pawprintlab.com/products/pawprint-lab/?lpid=1160&source_id=DL&utm_source=34379&utm_medium=&utm_term=1160&aff_id=34379&sub_id=&req_id=&oid=1160&device_type=&country_name=&_ef_transaction_id=&oid=1160&affid=34379";
const AFFILIATE_HREF = AFFILIATE_URL.replace(/&/g, "&amp;");
const GIDDYUP_SRC = "https://js.giddyup.io/gulinkfixup.js";
const GA4_ID = "G-JKY9VNJSWP";
const GA4_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;

const HERO_IMAGE = `<figure class="editorial-image">
<img alt="Senior dog" decoding="async" fetchpriority="high" src="https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg"/>
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
    (match) =>
      `<a class="pawprint-inline-link" href="${AFFILIATE_HREF}" target="_blank" rel="sponsored noopener noreferrer">${match}</a>`,
  );
}

function inlineMarkup(value) {
  const rendered = escapeHtml(value).replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>",
  );
  return linkPawprintMentions(rendered);
}

function plainHeading(value) {
  return value.replace(/\*\*/g, "").trim();
}

function headingId(text) {
  if (text === "What Makes Pawprint Protocol Different") return "approaches";
  if (text === "What Could the Next 90 Days Look Like?") return "evidence";
  if (text === "Made for Owners Who Aren’t Ready to Just Accept the Decline")
    return "cellular-energy";
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
          `<a class="cta-button offer-link" href="${AFFILIATE_HREF}" target="_blank" rel="sponsored noopener noreferrer">TRY PAWPRINT PROTOCOL RISK-FREE</a>` +
          "</div>",
      );
      continue;
    }

    if (raw.startsWith("### ")) {
      out.push(
        `<h3 class="article-timeline-heading">${inlineMarkup(raw.slice(4))}</h3>`,
      );
      continue;
    }

    if (raw.startsWith("## ")) {
      const source = raw.slice(3);
      const id = headingId(plainHeading(source));
      out.push(
        `<h2${id ? ` id="${id}"` : ""} class="article-section-heading">${inlineMarkup(source)}</h2>`,
      );
      continue;
    }

    if (raw.startsWith("- ")) {
      const items = [];
      let cursor = i;
      while (cursor < lines.length && lines[cursor].trim().startsWith("- ")) {
        items.push(
          `<li>${inlineMarkup(lines[cursor].trim().slice(2))}</li>`,
        );
        cursor += 1;
      }
      out.push(`<ul class="copy-list">${items.join("")}</ul>`);
      i = cursor - 1;
      continue;
    }

    out.push(`<p>${inlineMarkup(raw)}</p>`);
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

html = html.replace(
  /<article class="article-shell">[\s\S]*?<\/article>/,
  article,
);
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${headline}</title>`);
html = html.replace(
  /<meta name="description" content="[^"]*"\s*\/>/,
  `<meta name="description" content="${subheadline}" />`,
);

html = html.replace(
  /const OFFER_URL = ["'][^"']*["'];/,
  `const OFFER_URL = ${JSON.stringify(AFFILIATE_URL)};`,
);

html = html.replace(
  /<style data-ncr-skim-format>[\s\S]*?<\/style>\s*/g,
  "",
);
html = html.replace(
  "</head>",
  `<style data-ncr-skim-format>${SKIM_CSS}</style>\n</head>`,
);

html = html.replace(/\s*<!-- Google tag \(gtag\.js\) -->\s*/gi, "");
html = html.replace(
  /\s*<script[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-JKY9VNJSWP["'][^>]*><\/script>/gi,
  "",
);
html = html.replace(
  /\s*<script>\s*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\];[\s\S]*?gtag\(['"]config['"],\s*['"]G-JKY9VNJSWP['"]\);\s*<\/script>/gi,
  "",
);
const GA4_TAG = `<!-- Google tag (gtag.js) -->
<script async fetchpriority="low" src="${GA4_SRC}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4_ID}');
</script>`;
html = html.replace("</head>", `${GA4_TAG}\n</head>`);

html = html.replace(
  /\s*<script[^>]*src=["']https:\/\/js\.giddyup\.io\/gulinkfixup\.js["'][^>]*><\/script>/gi,
  "",
);
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
  GA4_ID,
  GA4_SRC,
];
for (const marker of requiredText) {
  if (!html.includes(marker)) {
    throw new Error(`Missing expected replacement copy/formatting: ${marker}`);
  }
}

const giddyupCount =
  (html.match(/https:\/\/js\.giddyup\.io\/gulinkfixup\.js/g) || []).length;
if (giddyupCount !== 1) {
  throw new Error(`Expected exactly one GiddyUp script, found ${giddyupCount}`);
}

const ga4LoaderCount =
  (
    html.match(
      /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-JKY9VNJSWP/g,
    ) || []
  ).length;
const ga4ConfigCount =
  (html.match(/gtag\(['"]config['"],\s*['"]G-JKY9VNJSWP['"]\)/g) || [])
    .length;
if (ga4LoaderCount !== 1 || ga4ConfigCount !== 1) {
  throw new Error(
    `Expected exactly one GA4 tag/config, found loader=${ga4LoaderCount}, config=${ga4ConfigCount}`,
  );
}

const renderedArticle =
  html.match(/<article class="article-shell">[\s\S]*?<\/article>/)?.[0] || "";

for (const markdownMarker of ["## ", "### ", "**"]) {
  if (renderedArticle.includes(markdownMarker)) {
    throw new Error(
      `Markdown marker leaked into rendered article: ${markdownMarker}`,
    );
  }
}

const articleImages = renderedArticle.match(/<img\b/gi) || [];
if (articleImages.length !== 1) {
  throw new Error(
    `Expected exactly one article image (the hero), found ${articleImages.length}`,
  );
}
if (
  !/fetchpriority=["']high["']/i.test(renderedArticle) ||
  !/alt=["']Senior dog["']/i.test(renderedArticle)
) {
  throw new Error("The remaining article image is not the intended top hero");
}

fs.writeFileSync(filePath, html);
console.log(
  "Completed PawPrint build with hero image only, plus GA4, GiddyUp, and affiliate links",
);
