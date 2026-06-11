import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spaDir = path.resolve(root, "dist/spa");

const criticalCss = `
<style data-ncr-critical-css>
*,::before,::after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f7f9fc;color:#1f2d3d;font-family:DM Sans,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;-webkit-font-smoothing:antialiased}[hidden]{display:none!important}img{display:block;max-width:100%;height:auto}a{color:inherit;text-decoration:inherit}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
</style>`;

const staticUiScript = `
<script data-ncr-static-ui>
(function(){
  var menuButton=document.querySelector('[data-menu-toggle]');
  var menu=document.querySelector('[data-mobile-nav]');
  var menuIcon=document.querySelector('[data-menu-icon]');
  if(menuButton&&menu){
    menuButton.addEventListener('click',function(){
      var expanded=menuButton.getAttribute('aria-expanded')==='true';
      menuButton.setAttribute('aria-expanded',String(!expanded));
      menu.hidden=expanded;
      if(menuIcon) menuIcon.textContent=expanded?'☰':'✕';
    });
    menu.addEventListener('click',function(event){
      if(event.target&&event.target.closest&&event.target.closest('a')){
        menu.hidden=true;
        menuButton.setAttribute('aria-expanded','false');
        if(menuIcon) menuIcon.textContent='☰';
      }
    });
  }
  var sticky=document.querySelector('[data-sticky-cta]');
  var back=document.querySelector('[data-back-to-top]');
  var footer=document.getElementById('site-footer');
  var ticking=false;
  function footerInView(){
    if(!footer) return false;
    return footer.getBoundingClientRect().top < (window.innerHeight - 40);
  }
  function update(){
    ticking=false;
    var show=window.scrollY>700 && !footerInView();
    if(sticky){ sticky.classList.toggle('translate-y-full',!show); }
    if(back){
      back.classList.toggle('pointer-events-none',!show);
      back.classList.toggle('translate-y-2',!show);
      back.classList.toggle('opacity-0',!show);
    }
  }
  function requestUpdate(){
    if(!ticking){ ticking=true; window.requestAnimationFrame(update); }
  }
  if(sticky||back){
    update();
    window.addEventListener('scroll',requestUpdate,{passive:true});
    window.addEventListener('resize',requestUpdate,{passive:true});
  }
  if(back){
    back.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }
})();
</script>`;

function walkHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) out.push(fullPath);
  }
  return out;
}

function optimizeHtml(html) {
  // Remove the production React bundle from prerendered pages. The pages are
  // fully static after prerendering; small inline scripts below handle the only
  // interactions needed for the header menu, sticky CTA, back-to-top, and tracking.
  html = html.replace(/\s*<script type="module" crossorigin src="[^"]*\/assets\/index-[^"]+\.js"><\/script>/, "");
  html = html.replace(/\s*<link rel="modulepreload" crossorigin href="[^"]+">/g, "");

  // Keep the production stylesheet as a normal blocking stylesheet.
  // The previous delayed-CSS optimization used fragile #top critical selectors
  // that could override Tailwind after a redesign and collapse the desktop hero.

  if (!html.includes("data-ncr-critical-css")) {
    html = html.replace("</head>", `${criticalCss}\n  </head>`);
  }

  if (!html.includes("data-ncr-static-ui")) {
    html = html.replace("</body>", `${staticUiScript}\n  </body>`);
  }

  return html;
}

for (const filePath of walkHtmlFiles(spaDir)) {
  const original = fs.readFileSync(filePath, "utf8");
  const optimized = optimizeHtml(original);
  fs.writeFileSync(filePath, optimized);
  console.log(`optimized ${path.relative(spaDir, filePath)}`);
}
