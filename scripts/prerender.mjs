import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spaDir = path.resolve(root, "dist/spa");

// Routes to prerender to static HTML.
const routes = [
  { url: "/", out: "index.html" },
  { url: "/privacy-policy", out: "privacy-policy/index.html" },
  { url: "/terms-of-use", out: "terms-of-use/index.html" },
  { url: "/affiliate-disclosure", out: "affiliate-disclosure/index.html" },
];

const template = fs.readFileSync(path.join(spaDir, "index.html"), "utf-8");

const { render } = await import(
  pathToFileURL(path.resolve(root, "dist/prerender/entry-prerender.js")).href
);

const marker = '<div id="root"></div>';

for (const route of routes) {
  const appHtml = render(route.url);
  if (!template.includes(marker)) {
    throw new Error(`Could not find "${marker}" in index.html template`);
  }
  const html = template.replace(marker, `<div id="root">${appHtml}</div>`);
  const outPath = path.join(spaDir, route.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route.url} -> dist/spa/${route.out}`);
}
