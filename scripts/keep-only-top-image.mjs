import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");
const articlePattern = /<article class="article-shell">[\s\S]*?<\/article>/;
const articleMatch = html.match(articlePattern);

if (!articleMatch) {
  throw new Error("Could not find advertorial article while pruning images");
}

const figurePattern = /<figure\b[^>]*class=["'][^"']*\beditorial-image\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi;
let imageFigureCount = 0;

const prunedArticle = articleMatch[0].replace(figurePattern, (figure) => {
  imageFigureCount += 1;
  return imageFigureCount === 1 ? figure : "";
});

if (imageFigureCount < 1) {
  throw new Error("Expected at least one editorial image in the advertorial");
}

const remainingImages = prunedArticle.match(/<img\b/gi) || [];
if (remainingImages.length !== 1) {
  throw new Error(`Expected exactly one article image after pruning, found ${remainingImages.length}`);
}

if (!/fetchpriority=["']high["']/i.test(prunedArticle) || !/alt=["']Senior dog["']/i.test(prunedArticle)) {
  throw new Error("The remaining article image is not the top hero image");
}

html = html.replace(articlePattern, prunedArticle);
fs.writeFileSync(filePath, html);

console.log(`Kept the top hero image and removed ${imageFigureCount - 1} lower article images`);
