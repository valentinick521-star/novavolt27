import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const GA4_ID = "G-JKY9VNJSWP";
const GA4_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;

let html = fs.readFileSync(filePath, "utf8");

// Keep the tiny dataLayer/gtag queue and config in place so events can be
// recorded immediately. Only move the heavy external gtag library out of the
// LCP/main-thread critical window.
const externalLoaderPattern =
  /\s*<script[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-JKY9VNJSWP["'][^>]*><\/script>\s*/gi;

if (!externalLoaderPattern.test(html)) {
  throw new Error("Could not find the existing GA4 external loader");
}
html = html.replace(externalLoaderPattern, "\n");

// Remove a prior delayed-loader block if this script is ever run twice.
html = html.replace(
  /\s*<script\s+data-ncr-ga4-delayed>[\s\S]*?<\/script>\s*/gi,
  "\n",
);

const delayedLoader = `<script data-ncr-ga4-delayed>
(function(w,d){
  function loadGA4(){
    if(d.querySelector('script[data-ncr-ga4-loader]')) return;
    var s=d.createElement('script');
    s.async=true;
    s.fetchPriority='low';
    s.src='${GA4_SRC}';
    s.setAttribute('data-ncr-ga4-loader','');
    d.head.appendChild(s);
  }
  function scheduleGA4(){w.setTimeout(loadGA4,1250);}
  if(d.readyState==='complete') scheduleGA4();
  else w.addEventListener('load',scheduleGA4,{once:true});
})(window,document);
</script>`;

if (!html.includes("</head>")) {
  throw new Error("Could not find </head> for delayed GA4 loader");
}
html = html.replace("</head>", `${delayedLoader}\n</head>`);

const ga4UrlCount =
  (html.match(/https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-JKY9VNJSWP/g) || []).length;
const ga4ConfigCount =
  (html.match(/gtag\(['"]config['"],\s*['"]G-JKY9VNJSWP['"]\)/g) || []).length;

if (ga4UrlCount !== 1 || ga4ConfigCount !== 1) {
  throw new Error(
    `Expected one queued GA4 config and one delayed loader, found loader=${ga4UrlCount}, config=${ga4ConfigCount}`,
  );
}
if (!html.includes("data-ncr-ga4-delayed") || !html.includes("data-ncr-ga4-loader")) {
  throw new Error("GA4 delayed-loader markers are missing");
}

fs.writeFileSync(filePath, html);
console.log("Kept GA4 event queue immediate and delayed the external gtag library until after page load");
