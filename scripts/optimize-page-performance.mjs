import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const heroUrl =
  "https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg";

const nadAgingSourcePath = path.join(
  root,
  "assets",
  "pawprint-nad-aging-20260812.webp",
);
const nadAgingOutputDir = path.join(root, "dist", "spa", "assets");
const nadAgingOutputPath = path.join(
  nadAgingOutputDir,
  "pawprint-nad-aging-20260812.webp",
);
const nadAgingUrl = "/assets/pawprint-nad-aging-20260812.webp";
const nadAgingTarget =
  "<p>But as dogs age, <strong>levels of NAD+ drop sharply.</strong></p>";
const nadAgingFigure = `<figure class="editorial-image pawprint-nad-aging-image" style="margin:24px 0 28px;">
<img alt="Illustration of a dog shown at three stages of aging" decoding="async" loading="lazy" width="1200" height="675" src="${nadAgingUrl}" style="display:block;width:100%;height:auto;"/>
</figure>`;

if (!fs.existsSync(filePath)) {
  console.log("Performance hints skipped: built index.html was not found");
  process.exit(0);
}

if (!fs.existsSync(nadAgingSourcePath)) {
  throw new Error(
    `NAD+ aging illustration source was not found: ${nadAgingSourcePath}`,
  );
}

fs.mkdirSync(nadAgingOutputDir, { recursive: true });
fs.copyFileSync(nadAgingSourcePath, nadAgingOutputPath);

let html = fs.readFileSync(filePath, "utf8");

if (!html.includes(nadAgingUrl)) {
  if (!html.includes(nadAgingTarget)) {
    throw new Error(
      "Could not find the NAD+ decline paragraph for image placement",
    );
  }

  html = html.replace(
    nadAgingTarget,
    `${nadAgingTarget}\n${nadAgingFigure}`,
  );
  fs.writeFileSync(filePath, html);
  console.log(
    `Inserted NAD+ aging illustration directly below the decline paragraph: ${nadAgingUrl}`,
  );
} else {
  console.log("NAD+ aging illustration is already present");
}

if (!html.includes(heroUrl)) {
  console.log("Performance hints skipped: expected hero image URL was not found");
  process.exit(0);
}

if (!html.includes("data-ncr-hero-performance-hints")) {
  const hints = `<link data-ncr-hero-performance-hints rel="preconnect" href="https://img.theepochtimes.com">
<link rel="dns-prefetch" href="//img.theepochtimes.com">
<link rel="preload" as="image" href="${heroUrl}" fetchpriority="high">`;

  const nextHtml = html.replace("</head>", `${hints}\n</head>`);
  if (nextHtml !== html) {
    html = nextHtml;
    fs.writeFileSync(filePath, html);
    console.log("Added safe preconnect and preload hints for the LCP hero image");
  } else {
    console.log("Performance hints skipped: closing head tag was not found");
  }
} else {
  console.log("Performance hints already present; no change needed");
}
