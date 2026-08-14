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
for (const [bad, good] of replacements) {
  if (source.includes(bad)) {
    source = source.split(bad).join(good);
    replacementCount += 1;
  }
}

// This script may run against either of two valid states:
// 1) the original malformed source, where all 7 groups need repair; or
// 2) an already-repaired source, where there is nothing left to change.
// A partial repair (1-6 groups) is still treated as an unknown state.
if (replacementCount !== 0 && replacementCount !== replacements.length) {
  throw new Error(
    `Expected either 0 repairs (already fixed) or ${replacements.length} repairs (legacy state), repaired ${replacementCount}. Refusing to continue with a partially repaired script.`,
  );
}

if (replacementCount === 0) {
  console.log("Legal-page regex patterns are already repaired; no changes needed.");
} else {
  fs.writeFileSync(targetPath, source);
  console.log(`Repaired ${replacementCount} malformed regex pattern groups in build-legal-pages.mjs`);
}
