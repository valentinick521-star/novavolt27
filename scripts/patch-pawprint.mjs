import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");

const NCR_LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fbadcc4098d254fadb81b2c01ff7bb98c?format=webp&width=360";

// Replace the Pawprint text masthead with the National Consumer Review logo.
html = html.replace(
  /<div class="brand" aria-label="Pet Wellness Report">[\s\S]*?<\/div>/,
  `<a class="site-logo-link" href="/" aria-label="National Consumer Review home"><img class="site-logo" src="${NCR_LOGO_URL}" alt="National Consumer Review" width="420" height="67" decoding="async" /></a>`,
);

// Replace the five category labels with real in-page links. Regex is used so
// this still works when the source HTML is minified or reformatted.
html = html.replace(
  /<div class="site-nav-inner">\s*<span>Senior Dogs<\/span>\s*<span>Nutrition<\/span>\s*<span>Mobility<\/span>\s*<span>Wellness<\/span>\s*<span>Research<\/span>\s*<\/div>/,
  `<div class="site-nav-inner">
<a href="#short-version">Senior Dogs</a>
<a href="#nutrition">Nutrition</a>
<a href="#mobility">Mobility</a>
<a href="#wellness">Wellness</a>
<a href="#sources">Research</a>
</div>`,
);

// Add stable anchor IDs to matching sections while preserving all copy.
html = html.replace(
  /<section class="section">(\s*<hr class="section-rule" \/>\s*<h2>Not All “Dog Dementia Supplements” Are Trying to Do the Same Thing<\/h2>)/,
  '<section class="section" id="nutrition">$1',
);

html = html.replace(
  /<section class="section">(\s*<hr class="section-rule" \/>\s*<h2>The Newer Approach: Looking at Cellular Energy<\/h2>)/,
  '<section class="section" id="mobility">$1',
);

html = html.replace(
  /<section class="section">(\s*<hr class="section-rule" \/>\s*<h2>Who This Approach May Make the Most Sense For<\/h2>)/,
  '<section class="section" id="wellness">$1',
);

// Inject overrides instead of trying to rewrite minified source CSS.
// This guarantees the logo is compact and the navigation links are styled.
const patchCss = `
<style data-ncr-pawprint-patch>
  .site-logo-link {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    text-decoration: none;
  }

  .site-logo {
    display: block;
    width: 178px;
    max-width: 42vw;
    height: auto;
  }

  .site-nav-inner a {
    position: relative;
    color: #353535;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.045em;
    text-decoration: none;
    text-underline-offset: 5px;
    text-decoration-thickness: 2px;
    cursor: pointer;
  }

  .site-nav-inner a:hover,
  .site-nav-inner a:focus-visible {
    color: var(--publication-accent);
    text-decoration: underline;
  }

  #short-version,
  #nutrition,
  #mobility,
  #wellness,
  #sources {
    scroll-margin-top: 24px;
  }

  @media (max-width: 760px) {
    .site-logo { width: 145px; max-width: 54vw; }
    .site-nav-inner a { font-size: 11px; }
  }
</style>`;

html = html.replace("</head>", `${patchCss}\n</head>`);

fs.writeFileSync(filePath, html);
console.log("Patched Pawprint prelander with compact NCR logo and working section navigation");
