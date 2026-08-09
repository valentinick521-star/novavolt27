import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "dist", "spa", "index.html");
let html = fs.readFileSync(filePath, "utf8");

const headline = "This Breakthrough Formula Is Helping Senior Dogs With Cognitive Decline Feel Like Themselves Again";
const subheadline = "If your senior dog is getting lost in familiar rooms, pacing at night, staring into space, or simply seeming less present, you’re probably searching for one thing: a way to bring back more of the dog you remember.";

const article = `<article class="article-shell">
<h1 class="balanced-headline">${headline}</h1>
<p class="dek">${subheadline}</p>

<figure class="editorial-image">
<img alt="Senior dog" decoding="async" fetchpriority="high" src="https://img.theepochtimes.com/assets/uploads/2026/04/02/id6007372-PawPrint-Protocol-2.jpg"/>
</figure>

<div class="article-intro">
<p>You’ve already seen the changes.</p>
<p>Maybe they hesitate in a room they’ve walked through thousands of times.</p>
<p>Maybe bedtime has become pacing time.</p>
<p>Maybe they stare at nothing for minutes at a time.</p>
<p>Or maybe the hardest part is more subtle: <strong>they’re physically still there, but some days they just don’t seem as present as they used to.</strong></p>
<p>Which is why most owners start looking for ways to help their senior-dog’s brain.</p>
<p>And there are plenty of options.</p>
<p>But the problem with them is they only mask the symptoms on the surface, while the underlying structure keeps degrading.</p>
<p>You see the brain, muscles and all other tissues in the body are made up of cells.</p>
<p>Inside every cell, a molecule called NAD+ is responsible for generating energy needed to repair damage throughout the brain and body.</p>
<p>But as dogs age, levels of NAD+ drop sharply.</p>
<p>This is what leads to the heartbreaking signs you’re seeing — the confusion, the pacing, the distant look in their eyes.</p>
<p>If left unaddressed, the decline continues. Your dog can become more frail, more withdrawn, and less like the companion you’ve always known.</p>
<p>That’s why supporting aging at the cellular level matters so much. When cells have the energy they need, the whole dog benefits — including the brain.</p>
<p>Think of it like a car. When the tank is full, it runs smoothly and with plenty of power. But as the gas starts to run low, the engine begins to sputter… until eventually it dies.</p>
<p>That’s what’s happening inside your dog’s cells. The power fades, and the brain is one of the first things to feel it.</p>
<p>Researchers have been studying this for years. And what they’ve found is clear: the problem with aging starts at a cellular level.</p>
<p>This is why simply adding surface-level nutrients isn’t enough. If the cells themselves don’t have the energy they need, the degrading continues.</p>
<p>Many owners try to address the problem with painkillers and steroids. And while these may help in the short term they can weaken immunity, cause dangerous weight gain, and blunt the spark in your dogs eyes.</p>
<p>They can even cost you more of the time you would have had with your dog.</p>
<p>That’s why over 15,000 dog owners have started using a product called Pawprint Protocol.</p>

<figure class="editorial-image" style="margin-top:28px;">
<img alt="PawPrint Protocol liquid formula" decoding="async" loading="lazy" src="https://pawprintlab.com/cdn/shop/files/PawPrint_carousel_12_1x1_51956652-502d-4b17-9fcc-e7b94a15c8bf.jpg?v=1771763505"/>
</figure>

<p>The formula contains NAD+, and a few other key ingredients made to support cellular energy, help protect cells, and promote healthier aging. It’s delivered in a nanoliposomal liquid, which helps the body absorb more of what it needs instead of wasting most of it.</p>
<p>Many owners report seeing brighter eyes, better mobility, and more playful energy — with some noticing changes within a few weeks, and stronger results over 90 days.</p>
<p>Pawprint Protocol was developed for dog owners who didn’t want to just accept that “getting older” meant watching their best friend slowly fade.</p>
<p>Instead of only covering up the symptoms of aging, it was built to support the cellular energy decline that happens as dogs get older. It supports the deeper cellular processes that affects how your dog feels and moves as they age.</p>
<p>PawPrint Protocol comes with a <strong>90-day money-back guarantee.</strong> So you don’t have to know with absolute certainty before trying it.</p>
<p>You only have to decide whether this approach makes enough sense for your dog.</p>
</div>
</article>`;

if (!/<article class="article-shell">[\s\S]*?<\/article>/.test(html)) {
  throw new Error("Could not find the existing advertorial article");
}

html = html.replace(/<article class="article-shell">[\s\S]*?<\/article>/, article);
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${headline}</title>`);
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${subheadline}" />`);

for (const marker of [
  headline,
  "start looking for ways to help their senior-dog’s brain",
  "The power fades",
  "Many owners try to address the problem",
  "90-day money-back guarantee",
  "You only have to decide whether this approach makes enough sense for your dog.",
]) {
  if (!html.includes(marker)) throw new Error(`Missing expected replacement copy: ${marker}`);
}

for (const oldCopy of [
  "Sources &amp; References",
  "What is the formula actually trying to do?",
  "Why PawPrint Uses a 90-Day Window",
  "The Bottom Line",
  "These options only mask the problem.",
  "NMN (a direct building block for NAD+)",
  "This isn’t just another senior dog supplement that only works on the surface.",
]) {
  if (html.includes(oldCopy)) throw new Error(`Old advertorial copy remained: ${oldCopy}`);
}

fs.writeFileSync(filePath, html);
console.log("Replaced advertorial article copy while preserving the existing presentation layer");
