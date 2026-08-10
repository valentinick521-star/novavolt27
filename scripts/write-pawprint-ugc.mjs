import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "assets");
const outputDir = path.join(root, "dist", "spa", "assets");
const outputPath = path.join(outputDir, "pawprint-ugc.webp");

const encoded = [1, 2, 3, 4]
  .map((part) =>
    fs.readFileSync(path.join(sourceDir, `pawprint-ugc.b64.part${part}`), "utf8").trim(),
  )
  .join("");

const image = Buffer.from(encoded, "base64");
if (image.length < 10000) {
  throw new Error(`Decoded PawPrint UGC image is unexpectedly small: ${image.length} bytes`);
}
if (image.subarray(0, 4).toString("ascii") !== "RIFF" || image.subarray(8, 12).toString("ascii") !== "WEBP") {
  throw new Error("Decoded PawPrint UGC asset is not a valid WebP container");
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, image);
console.log(`Wrote ${outputPath} (${image.length} bytes)`);
