import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputHtml = path.join(root, "dist", "spa", "index.html");
const assetDir = path.join(root, "dist", "spa", "assets");
const chunkDir = path.join(root, "content", "pawprint-dementia", "clean-v3");

function readCleanWebp(prefix, expectedMinBytes) {
  const b64 = ["00", "01", "02"]
    .map((part) => fs.readFileSync(path.join(chunkDir, `${prefix}-${part}.b64`), "utf8").trim())
    .join("");

  const buffer = Buffer.from(b64, "base64");
  const isWebp =
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";

  if (!isWebp || buffer.length < expectedMinBytes) {
    throw new Error(`Clean ${prefix} image failed WebP validation (${buffer.length} bytes)`);
  }

  return buffer;
}

fs.mkdirSync(assetDir, { recursive: true });

const lifestyle = readCleanWebp("lifestyle", 85000);
const ugc = readCleanWebp("ugc", 80000);

const lifestyleFile = "pawprint-lifestyle-clean.webp";
const ugcFile = "pawprint-ugc-clean.webp";

fs.writeFileSync(path.join(assetDir, lifestyleFile), lifestyle);
fs.writeFileSync(path.join(assetDir, ugcFile), ugc);

let html = fs.readFileSync(outputHtml, "utf8");

html = html.replaceAll("/assets/pawprint-lifestyle.jpg", `/assets/${lifestyleFile}`);
html = html.replaceAll("/assets/pawprint-ugc.jpg", `/assets/${ugcFile}`);

for (const expected of [`/assets/${lifestyleFile}`, `/assets/${ugcFile}`]) {
  if (!html.includes(expected)) {
    throw new Error(`Clean PawPrint image reference missing: ${expected}`);
  }
}

if (html.includes("/assets/pawprint-lifestyle.jpg") || html.includes("/assets/pawprint-ugc.jpg")) {
  throw new Error("Old corrupted PawPrint image references remain in final HTML");
}

fs.writeFileSync(outputHtml, html);

console.log(
  `Replaced corrupted PawPrint photos with clean WebP assets (${lifestyle.length} / ${ugc.length} bytes)`,
);
