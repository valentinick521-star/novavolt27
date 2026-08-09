import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
let html = fs.readFileSync(filePath, "utf8");

const headline = "This Breakthrough Formula Is Helping Senior Dogs With Dementia Feel Like Themselves Again";
const sourceH1 = `<h1>${headline}</h1>`;
const balancedH1 = `<h1 class="balanced-headline"><span>This Breakthrough Formula Is</span><span>Helping Senior Dogs With Dementia</span><span>Feel Like Themselves Again</span></h1>`;

if (!html.includes(sourceH1)) {
  throw new Error("Could not find the expected advertorial headline");
}
html = html.replace(sourceH1, balancedH1);

const oldDisclosure = `<strong>Editorial disclosure:</strong> This buyer's guide contains affiliate links. If you purchase through one, the publisher may earn a commission at no added cost to you. Product selection and evidence notes are presented separately from the offer.`;
const newDisclosure = `<strong>Editorial disclosure:</strong> This page contains affiliate links. If you purchase through one, we may earn a commission at no added cost to you. These commissions help fund our independent journalism and research.`;

if (!html.includes(oldDisclosure)) {
  throw new Error("Could not find the existing editorial disclosure");
}
html = html.replace(oldDisclosure, newDisclosure);

// Remove editorial breadcrumb, category navigation, and author/meta row.
html = html.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/, "");
html = html.replace(/<nav class="site-nav"[\s\S]*?<\/nav>/, "");
html = html.replace(/<div class="byline-row">[\s\S]*?<\/div>\s*<figure class="editorial-image">/, '<figure class="editorial-image">');

const newDek = `If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.`;
if (!/<p class="dek">[\s\S]*?<\/p>/.test(html)) {
  throw new Error("Could not find the article subheadline");
}
html = html.replace(/<p class="dek">[\s\S]*?<\/p>/, `<p class="dek">${newDek}</p>`);

const css = `<style data-healthinsider-layout>
  /* Health Insider-inspired editorial rhythm without altering article copy. */
  body {
    color: #202020;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    line-height: 1.68;
  }

  .site-header {
    border-bottom: 1px solid #e7e7e7;
  }

  .header-top {
    max-width: 800px;
    padding: 18px 20px;
  }

  .disclosure-bar {
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    color: #646464;
    font-size: 12px;
    line-height: 1.5;
  }

  .disclosure-inner {
    max-width: 800px;
    padding: 9px 20px 10px;
  }

  .article-shell {
    max-width: 800px;
    padding: 38px 20px 76px;
  }

  .article-shell h1.balanced-headline {
    margin: 0 0 19px;
    color: #111;
    font-size: 45px;
    line-height: 1.08;
    letter-spacing: -0.035em;
    font-weight: 900;
    -webkit-text-stroke: .15px currentColor;
  }

  .balanced-headline span {
    display: block;
    white-space: nowrap;
  }

  .dek {
    max-width: 760px;
    margin: 0 0 27px;
    color: #444;
    font-size: 20px;
    line-height: 1.52;
    font-weight: 400;
  }

  .editorial-image,
  .image-placeholder {
    margin: 0 0 30px;
    border-radius: 0;
  }

  .image-caption {
    margin-top: 7px;
    color: #777;
    font-size: 12px;
    line-height: 1.45;
  }

  .article-intro p:first-of-type::first-letter {
    float: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
  }

  .article-shell p {
    margin: 0 0 21px;
  }

  .section {
    margin-top: 42px;
  }

  .section-rule {
    display: none;
  }

  .section h2,
  .bottom-line h2,
  .sources h2 {
    margin: 0 0 18px;
    color: #171717;
    font-size: 31px;
    line-height: 1.22;
    letter-spacing: -0.025em;
    font-weight: 800;
  }

  .section h3,
  .callout h3,
  .product-copy h3 {
    margin: 30px 0 12px;
    color: #1a1a1a;
    font-size: 23px;
    line-height: 1.3;
    letter-spacing: -0.015em;
    font-weight: 800;
  }

  .article-shell ul.copy-list {
    margin: 4px 0 25px;
    padding-left: 24px;
  }

  .article-shell ul.copy-list li {
    margin: 8px 0;
    padding-left: 2px;
  }

  .medical-note,
  .callout,
  .quick-answer,
  .cta-block,
  .mechanism-graphic,
  .guarantee-box {
    box-shadow: none;
  }

  .callout,
  .quick-answer,
  .medical-note {
    margin-top: 27px;
    margin-bottom: 29px;
  }

  .bottom-line {
    margin-top: 48px;
  }

  .sources {
    margin-top: 46px;
  }

  @media (max-width: 820px) {
    .header-top,
    .disclosure-inner,
    .article-shell {
      max-width: 100%;
    }

    .article-shell {
      padding: 30px 18px 60px;
    }

    .article-shell h1.balanced-headline {
      font-size: clamp(35px, 8.8vw, 45px);
      line-height: 1.08;
    }

    .balanced-headline span {
      display: inline;
      white-space: normal;
    }

    .balanced-headline span:not(:last-child)::after {
      content: " ";
    }

    .dek {
      margin-bottom: 24px;
      font-size: 19px;
      line-height: 1.5;
    }

    .section {
      margin-top: 37px;
    }

    .section h2,
    .bottom-line h2,
    .sources h2 {
      font-size: 28px;
    }
  }
</style>`;

html = html.replace("</head>", `${css}\n</head>`);

for (const marker of [
  'data-healthinsider-layout',
  'Helping Senior Dogs With Dementia',
  'help fund our independent journalism and research',
  'probably searching for one thing: a way to bring back more of the dog you remember',
]) {
  if (!html.includes(marker)) throw new Error(`Missing expected marker: ${marker}`);
}

for (const removed of [
  'class="site-nav"',
  'class="byline-row"',
  'Senior-dog research desk',
  '10 min read · 9 sources',
  'Cognitive Aging',
  'Advertorial</div>',
]) {
  if (html.includes(removed)) throw new Error(`Expected removed element remained: ${removed}`);
}

fs.writeFileSync(filePath, html);
console.log("Applied Health Insider-inspired typography and simplified advertorial chrome");
