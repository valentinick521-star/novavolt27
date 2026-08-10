import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");
const oldSrc = "/assets/pawprint-ugc.webp";
const newSrc = "/assets/pawprint-ugc-20260810.webp";

if (!html.includes(oldSrc)) {
  throw new Error(`Could not find ${oldSrc} in rendered HTML`);
}

html = html.split(oldSrc).join(newSrc);

if (!html.includes(newSrc) || html.includes(oldSrc)) {
  throw new Error("Failed to replace the PawPrint UGC asset URL");
}

fs.writeFileSync(filePath, html);
console.log(`Updated rendered PawPrint UGC image URL to ${newSrc}`);
