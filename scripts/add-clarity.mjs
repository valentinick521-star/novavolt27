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
        function loadClarity(){
            if(l.querySelector('script[data-ncr-clarity-loader]')) return;
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            t.setAttribute('data-ncr-clarity-loader','');
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        }
        function scheduleClarity(){c.setTimeout(loadClarity,2500);}
        if(l.readyState==='complete') scheduleClarity();
        else c.addEventListener('load',scheduleClarity,{once:true});
    })(window, document, "clarity", "script", "${CLARITY_ID}");
</script>`;

// GiddyUp is needed for affiliate click-ID/link handling, but it does not need
// to block HTML parsing or first paint. `defer` preserves execution after the
// document has been parsed while keeping it out of the render-critical path.
const GIDDYUP_TAG =
  '<script defer type="text/javascript" src="https://js.giddyup.io/gulinkfixup.js"></script>';

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

if (!html.includes("data-ncr-clarity-loader")) {
  throw new Error("Microsoft Clarity loader was not configured for delayed loading");
}

if (giddyupTagCount !== 1) {
  throw new Error(
    `Expected exactly one GiddyUp link-fixup install, found ${giddyupTagCount}`,
  );
}

if (!/<script[^>]*\bdefer\b[^>]*src=["']https:\/\/js\.giddyup\.io\/gulinkfixup\.js["'][^>]*><\/script>/i.test(html)) {
  throw new Error("GiddyUp link-fixup loader is present but not deferred");
}

fs.writeFileSync(filePath, html);
console.log(
  `Installed deferred GiddyUp link fixup and delayed Microsoft Clarity project ${CLARITY_ID} in <head>`,
);
