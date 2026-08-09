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

html = html.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/, "");

const newDek = `If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably looking for something that can help bring back more of the dog you remember.`;
if (!/<p class="dek">[\s\S]*?<\/p>/.test(html)) {
  throw new Error("Could not find the article subheadline");
}
html = html.replace(/<p class="dek">[\s\S]*?<\/p>/, `<p class="dek">${newDek}</p>`);

const css = `<style data-balanced-headline>
  .article-shell h1.balanced-headline {
    font-size: 45px;
    line-height: 1.1;
    font-weight: 900;
    -webkit-text-stroke: .2px currentColor;
  }

  .balanced-headline span {
    display: block;
    white-space: nowrap;
  }

  @media (max-width: 820px) {
    .article-shell h1.balanced-headline {
      font-size: clamp(36px, 7vw, 45px);
    }

    .balanced-headline span {
      display: inline;
      white-space: normal;
    }

    .balanced-headline span:not(:last-child)::after {
      content: " ";
    }
  }
</style>`;

html = html.replace("</head>", `${css}\n</head>`);

for (const marker of [
  'data-balanced-headline',
  'Helping Senior Dogs With Dementia',
  'help fund our independent journalism and research',
  'bring back more of the dog you remember',
]) {
  if (!html.includes(marker)) throw new Error(`Missing expected marker: ${marker}`);
}
if (html.includes('Cognitive Aging') || html.includes('Advertorial</div>')) {
  throw new Error("Breadcrumb remained");
}

fs.writeFileSync(filePath, html);
console.log("Balanced headline and refined advertorial disclosure and intro copy");
