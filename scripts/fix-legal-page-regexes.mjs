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

if (replacementCount < replacements.length) {
  throw new Error(
    `Expected to repair ${replacements.length} malformed regex patterns, repaired ${replacementCount}. Refusing to continue with an unknown script state.`,
  );
}

fs.writeFileSync(targetPath, source);
console.log(`Repaired ${replacementCount} malformed regex pattern groups in build-legal-pages.mjs`);
