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

if (!html.includes('data-balanced-headline') || !html.includes('Helping Senior Dogs With Dementia')) {
  throw new Error("Balanced headline patch failed");
}

fs.writeFileSync(filePath, html);
console.log("Balanced advertorial headline into three desktop lines");
