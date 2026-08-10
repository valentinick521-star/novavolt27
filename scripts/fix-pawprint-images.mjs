import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputHtml = path.join(root, "dist", "spa", "index.html");
const assetDir = path.join(root, "dist", "spa", "assets");
const lifestyleChunkDir = path.join(root, "content", "pawprint-dementia", "clean-v3");
const ugcChunkDir = path.join(root, "content", "pawprint-dementia", "clean-v6");

const IMAGE_SOURCES = {
  lifestyle: {
    dir: lifestyleChunkDir,
    parts: ["00", "01", "02"],
    expectedBytes: 40880,
    expectedSha256: "f5d8504ca88ba6b282081ab33f4e5ee98f9bedc7d3ecf820496d4292b8e0fbe4",
  },
  ugc: {
    dir: ugcChunkDir,
    parts: ["00", "01", "02", "03", "04", "05"],
    expectedBytes: 37816,
    expectedSha256: "5b9261a1a193bc4f3188df04c41d14f4c27b8726575ada0693c776b21f632fb7",
  },
};

function readCleanWebp(prefix) {
  const source = IMAGE_SOURCES[prefix];
  if (!source) throw new Error(`Unknown clean image source: ${prefix}`);

  const chunkPaths = source.parts.map((part) =>
    path.join(source.dir, `${prefix}-${part}.b64`),
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

  const declaredSize = buffer.readUInt32LE(4) + 8;
  if (declaredSize !== buffer.length) {
    throw new Error(
      `Clean ${prefix} image is truncated or malformed (declared ${declaredSize} bytes, decoded ${buffer.length} bytes)`,
    );
  }

  const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
  if (buffer.length !== source.expectedBytes || sha256 !== source.expectedSha256) {
    throw new Error(
      `Clean ${prefix} image integrity mismatch (bytes ${buffer.length}/${source.expectedBytes}, sha256 ${sha256}/${source.expectedSha256})`,
    );
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
  `Replaced corrupted PawPrint photos with verified clean WebP assets (${lifestyle.length} / ${ugc.length} bytes)`,
);
