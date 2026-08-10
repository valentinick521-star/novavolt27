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
let linkCount = 0;
const linkedOccurrences = new Set([1, 3, 6]);

article = article.replace(
  /<a class="pawprint-inline-link"[^>]*>(PawPrint Protocol)<\/a>/gi,
  (full, text) => {
    linkCount += 1;
    return linkedOccurrences.has(linkCount) ? full : text;
  },
);

if (linkCount < 6) {
  throw new Error(`Expected at least 6 PawPrint Protocol mentions, found ${linkCount}`);
}

html = html.replace(articleMatch[0], article);
fs.writeFileSync(filePath, html);
console.log(`Reduced PawPrint inline links from ${linkCount} to ${linkedOccurrences.size}`);
