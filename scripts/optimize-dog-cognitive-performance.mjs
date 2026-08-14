import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spaRoot = path.join(root, "dist", "spa");
const pageDir = path.join(spaRoot, "best-dog-cognitive-supplements");
const htmlPath = path.join(pageDir, "index.html");
const pageBase = "/best-dog-cognitive-supplements/";

if (!fs.existsSync(htmlPath)) {
  console.log(
    "Dog cognitive performance pass skipped: built comparison page was not found",
  );
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, "utf8");
let inlinedCount = 0;
let deferredApp = false;

html = html.replace(/<link\b[^>]*>/gi, (tag) => {
  if (/\brel=["']modulepreload["']/i.test(tag)) {
    const hrefMatch = tag.match(/\bhref=["']([^"']+)["']/i);
    if (hrefMatch?.[1]?.startsWith(pageBase)) return "";
  }

  if (!/\brel=["']stylesheet["']/i.test(tag)) return tag;

  const hrefMatch = tag.match(/\bhref=["']([^"']+\.css)["']/i);
  if (!hrefMatch) return tag;

  const href = hrefMatch[1];
  if (!href.startsWith(pageBase)) return tag;

  const cssPath = path.join(spaRoot, href.replace(/^\//, ""));
  if (!fs.existsSync(cssPath)) {
    console.log(`Dog cognitive CSS inline skipped: ${href} was not found`);
    return tag;
  }

  let css = fs.readFileSync(cssPath, "utf8");

  // Fonts are loaded asynchronously by dog-cognitive-page/index.html. Remove
  // the duplicate Google Fonts @import so it cannot recreate a blocking chain.
  css = css
    .replace(
      /@import\s+url\((["'])https:\/\/fonts\.googleapis\.com.*?\1\);\s*/gi,
      "",
    )
    .replace(
      /@import\s*(["'])https:\/\/fonts\.googleapis\.com.*?\1;\s*/gi,
      "",
    );

  inlinedCount += 1;
  return `<style data-ncr-inline-critical-css>${css}</style>`;
});

// The page is now prerendered, so React is an enhancement rather than a first-
// paint dependency. Delay the 60+ KiB app bundle until the browser is idle or
// the visitor interacts. Links and the article itself remain usable immediately.
html = html.replace(/<script\b[^>]*><\/script>/gi, (tag) => {
  if (!/\btype=["']module["']/i.test(tag)) return tag;
  const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i);
  const src = srcMatch?.[1];
  if (!src || !src.startsWith(`${pageBase}assets/`) || !/\.js(?:\?|$)/i.test(src)) {
    return tag;
  }

  deferredApp = true;
  return `<script data-ncr-deferred-app-loader>
(function(w,u){
  var started=false;
  var events=["pointerdown","touchstart","keydown","scroll"];
  function cleanup(){events.forEach(function(e){w.removeEventListener(e,start);});}
  function start(){
    if(started)return;
    started=true;
    cleanup();
    import(u).catch(function(err){console.error("Deferred app load failed",err);});
  }
  events.forEach(function(e){
    w.addEventListener(e,start,{once:true,passive:e!=="keydown"});
  });
  w.addEventListener("load",function(){
    if("requestIdleCallback" in w){
      w.requestIdleCallback(start,{timeout:1200});
    }else{
      w.setTimeout(start,800);
    }
  },{once:true});
})(window,${JSON.stringify(src)});
</script>`;
});

// Skip layout/paint work for the long sections that start below the first
// viewport. The browser lays each section out normally as it approaches view.
const belowFoldCss = `<style data-ncr-below-fold-rendering>
@supports (content-visibility: auto) {
  .dog-cognitive-page-root #comparison,
  .dog-cognitive-page-root #review,
  .dog-cognitive-page-root #deal,
  .dog-cognitive-page-root #warnings,
  .dog-cognitive-page-root #guide,
  .dog-cognitive-page-root #faq,
  .dog-cognitive-page-root .cta-final,
  .dog-cognitive-page-root .author-block {
    content-visibility: auto;
    contain-intrinsic-size: auto 900px;
  }
}
</style>`;

if (!html.includes("data-ncr-below-fold-rendering")) {
  html = html.replace("</head>", `${belowFoldCss}\n</head>`);
}

fs.writeFileSync(htmlPath, html);

if (inlinedCount > 0) {
  console.log(
    `Inlined ${inlinedCount} dog cognitive stylesheet${inlinedCount === 1 ? "" : "s"} to remove render-blocking CSS requests`,
  );
} else {
  console.log(
    "Dog cognitive performance pass completed without a local stylesheet to inline",
  );
}

if (deferredApp) {
  console.log("Deferred the comparison React bundle until idle/interaction");
} else {
  console.log("Comparison React bundle was not found for deferred loading");
}
