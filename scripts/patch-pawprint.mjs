import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
const articleDir = path.join(root, "content", "pawprint-dementia");
let html = fs.readFileSync(filePath, "utf8");
const NEW_ARTICLE = [1,2,3,4,5].map(n => fs.readFileSync(path.join(articleDir, `part${n}.html`), "utf8")).join("");
const PATCH_CSS = "\n.site-logo-link{display:inline-flex;align-items:center;flex:0 0 auto;text-decoration:none}\n.site-logo{display:block;width:178px;max-width:42vw;height:auto}\n.site-nav-inner a{color:#353535;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.045em;text-decoration:none;text-underline-offset:5px;text-decoration-thickness:2px;cursor:pointer}\n.site-nav-inner a:hover,.site-nav-inner a:focus-visible{color:var(--publication-accent);text-decoration:underline}\n.article-shell blockquote{margin:24px 0;border-left:4px solid var(--publication-accent);background:#f6f9f8;padding:18px 20px;font-size:18px;line-height:1.55;color:#39413e;font-style:italic}\n.article-shell blockquote p:last-child{margin-bottom:0}\n.article-shell ul.copy-list{margin:16px 0 24px;padding-left:24px}\n.article-shell ul.copy-list li{margin:7px 0;padding-left:4px}\n.editorial-image img{width:100%;height:auto;display:block}\n.section[id]{scroll-margin-top:24px}\n.approach-detail{display:block;color:#626a67;font-size:14px;line-height:1.5;margin-top:4px}.approach-detail p{margin:0 0 9px}.approach-detail p:last-child{margin-bottom:0}.approach-detail .copy-list{margin:8px 0 10px;padding-left:20px}.formula-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:20px 0 26px}\n.formula-card{border:1px solid var(--border-color);border-radius:7px;background:#fff;padding:16px}\n.formula-card h3{font-size:18px;margin:0 0 6px;letter-spacing:-.015em}\n.formula-card p{font-size:14px;line-height:1.5;margin:0;color:#5d625f}\n@media(max-width:760px){.site-logo{width:145px;max-width:54vw}.site-nav-inner a{font-size:11px}.approach-detail{display:block;color:#626a67;font-size:14px;line-height:1.5;margin-top:4px}.approach-detail p{margin:0 0 9px}.approach-detail p:last-child{margin-bottom:0}.approach-detail .copy-list{margin:8px 0 10px;padding-left:20px}.formula-grid{grid-template-columns:1fr}}\n";

function mustReplace(pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Could not patch ${label}`);
  html = html.replace(pattern, replacement);
}

const logo = '<a class="site-logo-link" href="/" aria-label="National Consumer Review home"><img class="site-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fbadcc4098d254fadb81b2c01ff7bb98c?format=webp&width=360" alt="National Consumer Review" width="420" height="67" decoding="async" /></a>';
const nav = `<div class="site-nav-inner">
<a href="#senior-dogs">Senior Dogs</a>
<a href="#approaches">Nutrition</a>
<a href="#cellular-energy">Mobility</a>
<a href="#ninety-day">Wellness</a>
<a href="#evidence">Research</a>
</div>`;
const favicon = '<link rel="icon" type="image/webp" href="https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fe1efdedf37544e5982cb5ee6c0980a0e?format=webp&width=64&height=64" />';

const gtm = `<script data-preserved-gtm>
(function(w,d,s,l,i){w[l]=w[l]||[];var loaded=false,timer=0,events=["pointerdown","touchstart","click","keydown","scroll"];
function cleanup(){if(timer)w.clearTimeout(timer);events.forEach(function(e){w.removeEventListener(e,loadGTM);});}
function loadGTM(){if(loaded)return;loaded=true;cleanup();w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);}
events.forEach(function(e){w.addEventListener(e,loadGTM,{passive:true,once:true});});})(window,document,"script","dataLayer","GTM-5PZ88WLJ");
</script>`;
const gtmNoScript = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PZ88WLJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';

const affiliateTracking = `<script data-preserved-affiliate-tracking>
(function(){
function clean(value){return(value||"").trim().replace(/\\+$/g,"");}
function getTrackingData(){const p=new URLSearchParams(window.location.search);const click=clean(p.get("sub2"))||clean(p.get("gclid"))||clean(p.get("gbraid"))||clean(p.get("wbraid"));const keyword=clean(p.get("sub4"))||clean(p.get("utm_term"));const data={source_id:"google",sub1:clean(p.get("utm_campaign")),sub2:click,sub3:clean(p.get("adgroupid")),sub4:keyword,sub5:"top1_novavolt"};if(clean(p.get("gclid")))data.gclid=clean(p.get("gclid"));if(clean(p.get("gbraid")))data.gbraid=clean(p.get("gbraid"));if(clean(p.get("wbraid")))data.wbraid=clean(p.get("wbraid"));return data;}
function append(link){try{const data=getTrackingData(),url=new URL(link.href);Object.keys(data).forEach(k=>{if(data[k])url.searchParams.set(k,data[k]);});link.href=url.toString();}catch(e){console.log("Tracking append error:",e);}}
document.addEventListener("click",e=>{const a=e.target.closest?e.target.closest('a[href*="unbindgear.com/novavoltsolar"]'):null;if(a)append(a);},true);
document.addEventListener("auxclick",e=>{const a=e.target.closest?e.target.closest('a[href*="unbindgear.com/novavoltsolar"]'):null;if(a)append(a);},true);
})();
</script>`;

html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Your Dog’s Dementia Isn’t Just “Old Age.” Here’s What Most Cognitive Supplements Miss | National Consumer Review</title>');
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="A practical advertorial for senior-dog owners comparing traditional cognitive support with a cellular-energy approach to healthy aging." />');
mustReplace(/<div class="brand" aria-label="Pet Wellness Report">[\s\S]*?<\/div>/, logo, "logo");
mustReplace(/<div class="site-nav-inner">\s*<span>Senior Dogs<\/span>\s*<span>Nutrition<\/span>\s*<span>Mobility<\/span>\s*<span>Wellness<\/span>\s*<span>Research<\/span>\s*<\/div>/, nav, "navigation");
mustReplace(/<article class="article-shell">[\s\S]*?<\/article>/, NEW_ARTICLE, "article");

html = html.replace('<div class="footer-brand">Pet Wellness Report</div>', '<div class="footer-brand">National Consumer Review</div>');
html = html.replace(/<div class="copyright">[\s\S]*?<\/div>\s*<\/footer>/, '<div class="copyright">© 2026 NationalConsumerReview.com. All rights reserved. This page is an advertorial and general educational content, not veterinary advice.</div>\n</footer>');
html = html.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/gi, "");
html = html.replace("</head>", `${favicon}\n<style data-ncr-advertorial-patch>${PATCH_CSS}</style>\n${gtm}\n</head>`);
html = html.replace("<body>", `<body>\n${gtmNoScript}`);
html = html.replace("</body>", `${affiliateTracking}\n</body>`);

for (const marker of ['Your Dog’s Dementia Isn’t Just “Old Age.”','id="senior-dogs"','id="approaches"','id="cellular-energy"','id="ninety-day"','class="site-logo"','data-preserved-gtm','CHECK PAWPRINT PROTOCOL AVAILABILITY']) {
  if (!html.includes(marker)) throw new Error(`Missing expected marker: ${marker}`);
}
if (html.includes("A Fair Comparison of the Three Main Approaches")) throw new Error("Old buyer-guide copy remained");

fs.writeFileSync(filePath, html);
console.log("Built PawPrint dementia advertorial in the existing National Consumer Review template");
