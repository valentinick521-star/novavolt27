import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "dist", "spa", "assets");

const HERO_ORIGINAL =
  "https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg";
const HERO_ENCODED = encodeURIComponent(HERO_ORIGINAL);
const widths = [384, 640, 828];

fs.mkdirSync(outputDir, { recursive: true });

for (const width of widths) {
  const sourceUrl =
    `https://www.theepochtimes.com/_next/image?url=${HERO_ENCODED}&w=${width}&q=60`;
  const response = await fetch(sourceUrl, {
    headers: {
      Accept: "image/webp,image/*;q=0.8,*/*;q=0.5",
      "User-Agent": "Mozilla/5.0 NationalConsumerReview build optimizer",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Could not fetch optimized PawPrint hero ${width}px: ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const image = Buffer.from(await response.arrayBuffer());
  if (!contentType.toLowerCase().includes("image/") || image.length < 1000) {
    throw new Error(
      `Optimized PawPrint hero ${width}px returned an unexpected payload (${contentType}, ${image.length} bytes)`,
    );
  }

  const outputPath = path.join(
    outputDir,
    `pawprint-hero-${width}-20260813.webp`,
  );
  fs.writeFileSync(outputPath, image);
  console.log(
    `Wrote optimized PawPrint hero ${width}px to ${outputPath} (${image.length} bytes, ${contentType})`,
  );
}
