import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pageDir = path.join(root, "dist", "spa", "best-dog-cognitive-supplements");
const htmlPath = path.join(pageDir, "index.html");
const serverEntry = path.join(root, "dist", "dog-cognitive-prerender", "entry-server.js");

if (!fs.existsSync(htmlPath)) {
  throw new Error(`Dog cognitive HTML was not found: ${htmlPath}`);
}

if (!fs.existsSync(serverEntry)) {
  throw new Error(`Dog cognitive SSR entry was not found: ${serverEntry}`);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const marker = '<div id="root"></div>';
let html = fs.readFileSync(htmlPath, "utf8");

if (!html.includes(marker)) {
  throw new Error(`Could not find ${marker} in the comparison page HTML`);
}

let appHtml = render("/best-dog-cognitive-supplements/");

// Keep the first viewport identical to the final runtime copy so the browser can
// paint useful content before the React bundle loads without a visible flash.
appHtml = appHtml.replace(
  /<div class="hero-body">[\s\S]*?<\/div>(?=<\/div><aside)/,
  `<div class="hero-body"><p>At first, most cognitive supplements look very similar. They all talk about brain health, memory, and healthy aging.</p><p>But when we looked at what was actually inside them, we found something important:</p><p><strong>They are not all built to support the aging brain in the same way.</strong></p><p>Some are built around SAMe, antioxidants, omega-3s, or a mix of several nutrients.</p><p>But one formula we reviewed started with a very different idea — <strong>supporting the energy used inside the cells themselves.</strong></p><p>That difference caught our attention and changed what we looked for in the rest of our comparison.</p></div>`,
);

appHtml = appHtml.replace(
  /<p class="hero-pick-best">[\s\S]*?<\/p>/,
  `<p class="hero-pick-best"><strong>Why it stood out:</strong> As dogs age, the cellular-energy systems their brain cells rely on can become less efficient. PawPrint is built around NMN and NAD+ to support that system at the source.</p>`,
);

appHtml = appHtml
  .replace(/aria-label="Editor score 9\.4 out of 10"/, 'aria-label="Editor score 9.8 out of 10"')
  .replace(/<strong>9\.4<\/strong><span>Editor Score<\/span>/, '<strong>9.8</strong><span>Editor Score</span>')
  .replace(/<h2 class="section-title">Quick Rankings<\/h2>/, '<h2 class="section-title">Quick Comparison</h2>');

html = html.replace(marker, `<div id="root">${appHtml}</div>`);
fs.writeFileSync(htmlPath, html);
console.log("Prerendered the dog cognitive comparison page into static HTML");
