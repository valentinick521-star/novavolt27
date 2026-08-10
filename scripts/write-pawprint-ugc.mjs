import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "assets");
const outputDir = path.join(root, "dist", "spa", "assets");
const outputPath = path.join(outputDir, "pawprint-ugc.webp");

const EXPECTED_BYTES = 58998;
const EXPECTED_SHA256 = "54de82e13c3eedd04a138cc8b523477af8f01711e4de72fa262c21e4b2dd36da";

const encoded = [1, 2, 3, 4]
  .map((part) =>
    fs.readFileSync(path.join(sourceDir, `pawprint-ugc.b64.part${part}`), "utf8").trim(),
  )
  .join("");

const image = Buffer.from(encoded, "base64");
if (image.length !== EXPECTED_BYTES) {
  throw new Error(
    `Decoded PawPrint UGC image has the wrong size: ${image.length} bytes; expected ${EXPECTED_BYTES}`,
  );
}
if (
  image.subarray(0, 4).toString("ascii") !== "RIFF" ||
  image.subarray(8, 12).toString("ascii") !== "WEBP"
) {
  throw new Error("Decoded PawPrint UGC asset is not a valid WebP container");
}

const sha256 = crypto.createHash("sha256").update(image).digest("hex");
if (sha256 !== EXPECTED_SHA256) {
  throw new Error(
    `Decoded PawPrint UGC image checksum mismatch: ${sha256}; expected ${EXPECTED_SHA256}`,
  );
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, image);
console.log(
  `Wrote verified ${outputPath} (${image.length} bytes, sha256 ${sha256})`,
);