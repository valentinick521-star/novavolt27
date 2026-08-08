import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");

const NCR_LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fbadcc4098d254fadb81b2c01ff7bb98c?format=webp&width=360";

// Replace the text masthead with the same National Consumer Review logo used
// on the earlier NovaVolt pages.
html = html.replace(
  '<div class="brand" aria-label="Pet Wellness Report">Pet Wellness <span>Report</span></div>',
  `<a class="site-logo-link" href="/" aria-label="National Consumer Review home"><img class="site-logo" src="${NCR_LOGO_URL}" alt="National Consumer Review" width="420" height="67" decoding="async" /></a>`,
);

// Make the category labels real in-page navigation links.
html = html.replace(
  `<div class="site-nav-inner">
        <span>Senior Dogs</span>
        <span>Nutrition</span>
        <span>Mobility</span>
        <span>Wellness</span>
        <span>Research</span>
      </div>`,
  `<div class="site-nav-inner">
        <a href="#short-version">Senior Dogs</a>
        <a href="#nutrition">Nutrition</a>
        <a href="#mobility">Mobility</a>
        <a href="#wellness">Wellness</a>
        <a href="#sources">Research</a>
      </div>`,
);

// Add semantic anchor targets to existing sections without changing the copy.
html = html.replace(
  '<section class="section">\n        <hr class="section-rule" />\n        <h2>Not All “Dog Dementia Supplements” Are Trying to Do the Same Thing</h2>',
  '<section class="section" id="nutrition">\n        <hr class="section-rule" />\n        <h2>Not All “Dog Dementia Supplements” Are Trying to Do the Same Thing</h2>',
);

html = html.replace(
  '<section class="section">\n        <hr class="section-rule" />\n        <h2>The Newer Approach: Looking at Cellular Energy</h2>',
  '<section class="section" id="mobility">\n        <hr class="section-rule" />\n        <h2>The Newer Approach: Looking at Cellular Energy</h2>',
);

html = html.replace(
  '<section class="section">\n        <hr class="section-rule" />\n        <h2>Who This Approach May Make the Most Sense For</h2>',
  '<section class="section" id="wellness">\n        <hr class="section-rule" />\n        <h2>Who This Approach May Make the Most Sense For</h2>',
);

// Add logo sizing and convert the old span nav styling to link styling with a
// visible underline on hover/focus.
html = html.replace(
  `.brand span { color: var(--publication-accent); }
    .header-tagline`,
  `.brand span { color: var(--publication-accent); }
    .site-logo-link { display: inline-flex; align-items: center; flex: 0 0 auto; text-decoration: none; }
    .site-logo { display: block; width: 205px; max-width: 48vw; height: auto; }
    .header-tagline`,
);

html = html.replace(
  `.site-nav span {
      color: #353535;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.045em;
    }`,
  `.site-nav a {
      color: #353535;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.045em;
      text-decoration: none;
      text-underline-offset: 5px;
      text-decoration-thickness: 2px;
    }

    .site-nav a:hover,
    .site-nav a:focus-visible {
      color: var(--publication-accent);
      text-decoration: underline;
    }`,
);

html = html.replace(
  `.site-nav span { font-size: 11px; }`,
  `.site-nav a { font-size: 11px; }\n      .site-logo { width: 165px; max-width: 62vw; }`,
);

fs.writeFileSync(filePath, html);
console.log("Patched Pawprint prelander with NCR masthead and section navigation");
