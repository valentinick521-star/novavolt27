import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetPath = path.join(__dirname, "build-legal-pages.mjs");

let source = fs.readFileSync(targetPath, "utf8");

const replacements = [
  [String.raw`/\\bhref\\s*=/`, String.raw`/\bhref\s*=/`],
  [
    String.raw`/\\bhref\\s*=\\s*["'][^"']*["']/i`,
    String.raw`/\bhref\s*=\s*["'][^"']*["']/i`,
  ],
  [
    String.raw`/<footer\\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\\s\\S]*?<\\/footer>/i`,
    String.raw`/<footer\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\s\S]*?<\/footer>/i`,
  ],
  [
    String.raw`/<header\\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>[\\s\\S]*?<\\/header>/i`,
    String.raw`/<header\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>[\s\S]*?<\/header>/i`,
  ],
  [String.raw`/<head>[\\s\\S]*?<\\/head>/i`, String.raw`/<head>[\s\S]*?<\/head>/i`],
  [
    String.raw`/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi`,
    String.raw`/<style\b[^>]*>[\s\S]*?<\/style>/gi`,
  ],
  [
    String.raw`/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi`,
    String.raw`/<script\b[^>]*>[\s\S]*?<\/script>/gi`,
  ],
];

let replacementCount = 0;
let alreadyHealthyCount = 0;
const missing = [];

for (const [bad, good] of replacements) {
  if (source.includes(bad)) {
    source = source.split(bad).join(good);
    replacementCount += 1;
  } else if (source.includes(good)) {
    // Already in the repaired state — nothing to do for this pattern.
    alreadyHealthyCount += 1;
  } else {
    missing.push(good);
  }
}

if (missing.length > 0) {
  throw new Error(
    `Expected every regex pattern in build-legal-pages.mjs to be either malformed or already repaired, but ${missing.length} could not be found in any form:\n${missing
      .map((pattern) => `  - ${pattern}`)
      .join(
        "\n",
      )}\nRefusing to continue with an unknown script state.`,
  );
}

if (replacementCount > 0) {
  fs.writeFileSync(targetPath, source);
  console.log(
    `Repaired ${replacementCount} malformed regex pattern groups in build-legal-pages.mjs (${alreadyHealthyCount} already correct)`,
  );
} else {
  console.log(
    `All ${alreadyHealthyCount} regex pattern groups in build-legal-pages.mjs are already correct; nothing to repair`,
  );
}
