import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");

let html = fs.readFileSync(filePath, "utf8");

const CLARITY_ID = "y08j0wvw36";
const CLARITY_TAG = `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");
</script>`;

const GIDDYUP_TAG =
  '<script type="text/javascript" src="https://js.giddyup.io/gulinkfixup.js"></script>';

if (!html.includes("</head>")) {
  throw new Error("Could not find </head> for tracking installation");
}

// Remove any prior copy of this exact Clarity project snippet so the build
// always publishes one installation only.
html = html.replace(
  /\s*<script\s+type=["']text\/javascript["']>\s*\(function\(c,l,a,r,i,t,y\)\{[\s\S]*?y08j0wvw36[\s\S]*?<\/script>\s*/gi,
  "\n",
);

// Remove any existing GiddyUp link-fixup loader so we never publish duplicates.
html = html.replace(
  /\s*<script\s+[^>]*src=["']https:\/\/js\.giddyup\.io\/gulinkfixup\.js["'][^>]*><\/script>\s*/gi,
  "\n",
);

html = html.replace(
  "</head>",
  `${GIDDYUP_TAG}\n${CLARITY_TAG}\n</head>`,
);

const idCount = (html.match(/y08j0wvw36/g) || []).length;
const clarityTagCount = (html.match(/https:\/\/www\.clarity\.ms\/tag\//g) || []).length;
const giddyupTagCount = (html.match(/https:\/\/js\.giddyup\.io\/gulinkfixup\.js/g) || []).length;

if (idCount !== 1 || clarityTagCount !== 1) {
  throw new Error(
    `Expected exactly one Microsoft Clarity install, found id=${idCount}, tag=${clarityTagCount}`,
  );
}

if (giddyupTagCount !== 1) {
  throw new Error(
    `Expected exactly one GiddyUp link-fixup install, found ${giddyupTagCount}`,
  );
}

fs.writeFileSync(filePath, html);
console.log(
  `Installed GiddyUp link fixup and Microsoft Clarity project ${CLARITY_ID} in <head>`,
);
