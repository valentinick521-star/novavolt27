import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const heroUrl =
  "https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg";

if (!fs.existsSync(filePath)) {
  console.log("Performance hints skipped: built index.html was not found");
  process.exit(0);
}

let html = fs.readFileSync(filePath, "utf8");

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
