import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputHtml = path.join(root, "dist", "spa", "index.html");
const assetDir = path.join(root, "dist", "spa", "assets");
const chunkDir = path.join(root, "content", "pawprint-dementia", "clean-v3");

function readCleanWebp(prefix) {
  const chunkPaths = ["00", "01", "02"].map((part) =>
    path.join(chunkDir, `${prefix}-${part}.b64`),
  );

  for (const chunkPath of chunkPaths) {
    if (!fs.existsSync(chunkPath)) {
      throw new Error(`Missing clean ${prefix} image chunk: ${chunkPath}`);
    }
  }

  const b64 = chunkPaths
    .map((chunkPath) => fs.readFileSync(chunkPath, "utf8").replace(/\s+/g, ""))
    .join("");

  if (!b64 || b64.length < 1000) {
    throw new Error(`Clean ${prefix} image base64 is empty or unexpectedly short`);
  }

  const buffer = Buffer.from(b64, "base64");

  const riff = buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF";
  const webp = buffer.length >= 12 && buffer.toString("ascii", 8, 12) === "WEBP";
  const chunkType = buffer.length >= 16 ? buffer.toString("ascii", 12, 16) : "";
  const validChunkType = ["VP8 ", "VP8L", "VP8X"].includes(chunkType);

  if (!riff || !webp || !validChunkType) {
    const headerHex = buffer.subarray(0, 16).toString("hex");
    throw new Error(
      `Clean ${prefix} image is not a valid WebP container (${buffer.length} bytes, header=${headerHex}, chunk=${JSON.stringify(chunkType)})`,
    );
  }

  // RIFF stores the file size minus the first 8 bytes at offset 4.
  const declaredSize = buffer.readUInt32LE(4) + 8;
  if (declaredSize !== buffer.length) {
    throw new Error(
      `Clean ${prefix} image is truncated or malformed (declared ${declaredSize} bytes, decoded ${buffer.length} bytes)`,
    );
  }

  // File size is not a quality or validity signal for WebP. A highly compressed,
  // perfectly valid image can be well below an arbitrary 80–85 KB threshold.
  if (buffer.length < 1024) {
    throw new Error(`Clean ${prefix} image is implausibly small (${buffer.length} bytes)`);
  }

  return buffer;
}

fs.mkdirSync(assetDir, { recursive: true });

const lifestyle = readCleanWebp("lifestyle");
const ugc = readCleanWebp("ugc");

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
  `Replaced corrupted PawPrint photos with validated clean WebP assets (${lifestyle.length} / ${ugc.length} bytes)`,
);
