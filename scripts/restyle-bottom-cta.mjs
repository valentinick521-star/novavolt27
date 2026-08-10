import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");

const articleMatch = html.match(/<article class="article-shell">[\s\S]*?<\/article>/);
if (!articleMatch) {
  throw new Error("Could not find advertorial article");
}

let article = articleMatch[0];

// Match only the final CTA generated from the markdown marker. Preserve the
// existing affiliate URL and tracking-related link attributes exactly.
const ctaPattern = /<div class="cta-block" style="margin-bottom:0;">\s*<a class="cta-button offer-link" href="([^"]+)" target="_blank" rel="sponsored noopener noreferrer">TRY PAWPRINT PROTOCOL RISK-FREE<\/a>\s*<\/div>/i;
const ctaMatch = article.match(ctaPattern);
if (!ctaMatch) {
  throw new Error("Could not find the final PawPrint CTA block");
}

const affiliateHref = ctaMatch[1];

const redesignedCta = `<div class="healthinsider-bottom-cta">
  <div class="healthinsider-bottom-cta__headline">Continue to PawPrint Protocol’s Official Website</div>
  <div class="healthinsider-bottom-cta__subcopy">You’ll be taken directly to pawprintlab.com, the official website for PawPrint Protocol.</div>
  <a class="healthinsider-bottom-cta__button offer-link" href="${affiliateHref}" target="_blank" rel="sponsored noopener noreferrer">
    <span>VISIT THE OFFICIAL PAWPRINT WEBSITE</span>
    <span class="healthinsider-bottom-cta__arrow" aria-hidden="true">→</span>
  </a>
  <div class="healthinsider-bottom-cta__note">pawprintlab.com · 90-day money-back guarantee</div>
</div>`;

article = article.replace(ctaPattern, redesignedCta);
html = html.replace(articleMatch[0], article);

const CTA_CSS = `
.healthinsider-bottom-cta{
  width:100%;
  max-width:none;
  margin:34px 0 6px;
  padding:27px 26px 28px;
  border:1px solid #e2e2e2;
  border-radius:4px;
  background:#f3f3f3;
  text-align:center;
}
.healthinsider-bottom-cta__headline{
  max-width:620px;
  margin:0 auto 8px;
  color:#171717;
  font-size:24px;
  font-weight:800;
  line-height:1.28;
  letter-spacing:-.018em;
}
.healthinsider-bottom-cta__subcopy{
  max-width:610px;
  margin:0 auto 18px;
  color:#555;
  font-size:15px;
  line-height:1.5;
}
.healthinsider-bottom-cta__button,
.healthinsider-bottom-cta__button:visited{
  width:100%;
  min-height:62px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:13px;
  padding:17px 24px;
  border:1px solid #087744;
  border-radius:5px;
  background:#109b59;
  box-shadow:0 4px 0 #087744,0 8px 18px rgba(16,155,89,.16);
  color:#fff !important;
  text-decoration:none !important;
  text-transform:uppercase;
  font-size:18px;
  font-weight:900;
  line-height:1.2;
  letter-spacing:.012em;
  transition:transform .12s ease,background-color .12s ease,box-shadow .12s ease;
}
.healthinsider-bottom-cta__button:hover,
.healthinsider-bottom-cta__button:focus-visible{
  background:#0c8d50;
  transform:translateY(-1px);
  box-shadow:0 5px 0 #076b3d,0 10px 22px rgba(16,155,89,.2);
}
.healthinsider-bottom-cta__button:active{
  transform:translateY(2px);
  box-shadow:0 2px 0 #087744,0 5px 12px rgba(16,155,89,.14);
}
.healthinsider-bottom-cta__arrow{
  flex:0 0 auto;
  font-size:23px;
  line-height:1;
  transform:translateY(-1px);
}
.healthinsider-bottom-cta__note{
  margin-top:12px;
  color:#777;
  font-size:12px;
  line-height:1.4;
}
@media(max-width:600px){
  .healthinsider-bottom-cta{
    margin-top:28px;
    padding:23px 16px 24px;
  }
  .healthinsider-bottom-cta__headline{
    font-size:21px;
    line-height:1.3;
    margin-bottom:7px;
  }
  .healthinsider-bottom-cta__subcopy{
    font-size:14px;
    line-height:1.45;
    margin-bottom:16px;
  }
  .healthinsider-bottom-cta__button,
  .healthinsider-bottom-cta__button:visited{
    min-height:60px;
    padding:16px 14px;
    gap:9px;
    font-size:16px;
    letter-spacing:0;
  }
  .healthinsider-bottom-cta__arrow{font-size:21px;}
}
`;

html = html.replace(/\s*<style data-ncr-bottom-cta>[\s\S]*?<\/style>/gi, "");
html = html.replace("</head>", `<style data-ncr-bottom-cta>${CTA_CSS}</style>\n</head>`);

for (const marker of [
  "healthinsider-bottom-cta",
  "Continue to PawPrint Protocol’s Official Website",
  "You’ll be taken directly to pawprintlab.com, the official website for PawPrint Protocol.",
  "VISIT THE OFFICIAL PAWPRINT WEBSITE",
  "pawprintlab.com · 90-day money-back guarantee",
]) {
  if (!html.includes(marker)) {
    throw new Error(`Missing expected redesigned CTA marker: ${marker}`);
  }
}

if ((html.match(/healthinsider-bottom-cta__button/g) || []).length < 1) {
  throw new Error("Redesigned CTA button was not created");
}

fs.writeFileSync(filePath, html);
console.log("Restyled final PawPrint CTA with official-site reassurance and gray panel");
