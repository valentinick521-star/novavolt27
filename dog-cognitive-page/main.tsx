import { useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DogCognitiveLayout from "@/components/dog-cognitive/SiteLayout";
import DogCognitiveSupplements from "@/pages/DogCognitiveSupplements";

const QUICK_RANKINGS = [
  {
    name: "PawPrint Protocol",
    approach: "Cellular Energy · NAD+ + NMN",
    format: "Liquid dropper",
    why: "Only option here centered on NAD+ and NMN",
  },
  {
    name: "Senilife",
    approach: "Cell Membranes · Phosphatidylserine",
    format: "Softgel capsule",
    why: "Established phosphatidylserine approach",
  },
  {
    name: "Aktivait",
    approach: "Broad Multi-Nutrient Support",
    format: "Tablet",
    why: "Broad brain-support nutrient blend",
  },
  {
    name: "Dr. Bill’s Canine Cognitive Support",
    approach: "Broad Brain Nutrition · 36-Ingredient Blend",
    format: "Powder",
    why: "36-ingredient powder built for broad brain support",
    verdict: "Broadest Ingredient Blend",
  },
  {
    name: "Novifit",
    approach: "SAMe-Focused Support",
    format: "Tablet",
    why: "Simple SAMe-focused approach",
  },
];

function comparisonField(label: string, copy: string) {
  return (
    '<div class="comparison-field">' +
    '<div class="comparison-field-label">' +
    label +
    "</div>" +
    "<p>" +
    copy +
    "</p>" +
    "</div>"
  );
}

function ensurePageStyles() {
  if (document.getElementById("cognitive-final-runtime-styles")) return;

  const style = document.createElement("style");
  style.id = "cognitive-final-runtime-styles";
  style.textContent = `
    #rankings .ranking-approach {
      display: block;
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 600;
      color: #6f8194;
      white-space: normal;
    }
    #rankings .rankings-table tbody tr.winner .ranking-approach {
      color: #53677d;
    }
    #rankings .ranking-product-static {
      font-weight: 800;
      color: inherit;
    }
    #comparison .comparison-field {
      padding: 0 0 14px;
      margin: 0 0 14px;
      border-bottom: 1px solid var(--line-light);
    }
    #comparison .comparison-field:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: 0;
    }
    #comparison .comparison-field-label {
      margin-bottom: 4px;
      font-size: 10.5px;
      line-height: 1.2;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #315da8;
    }
    #comparison .comparison-field p {
      margin: 0;
      font-size: 15px;
      line-height: 1.62;
      color: var(--muted);
    }
    #comparison .comparison-field p strong {
      color: var(--navy);
    }
    .cta-final .final-pick-name {
      display: block;
      font-family: var(--serif);
      font-size: 30px;
      line-height: 1.15;
      margin-bottom: 7px;
    }
    .cta-final .final-pick-line {
      display: block;
    }
    .cta-final .final-summary {
      margin-bottom: 16px;
    }
    @media (max-width: 760px) {
      .cta-final .final-pick-name {
        font-size: 26px;
      }
    }
  `;
  document.head.appendChild(style);
}

function updateMetaAndHero() {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (meta) {
    meta.content =
      "We compared five cognitive supplements for senior dogs on formulation strategy, daily usability and buyer protection. See how PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support and Novifit differ.";
  }

  const subheadline = document.querySelector<HTMLElement>(".hero-title-sub");
  if (subheadline) {
    subheadline.textContent =
      "We looked at the top supplements for older dogs to find which ones may help bring back more of the dog you remember. Most took the same basic approach. But one stood out because it was built around a very different approach.";
  }

  const heroBody = document.querySelector<HTMLElement>(".hero-body");
  if (heroBody) {
    heroBody.innerHTML = `
      <p>At first, most cognitive supplements look very similar. They all talk about brain health, memory, and healthy aging.</p>
      <p>But when we looked at what was actually inside them, we found something important:</p>
      <p><strong>They are not all built to support the aging brain in the same way.</strong></p>
      <p>Some are built around phosphatidylserine. Others use SAMe, antioxidants, omega-3s, or a mix of several nutrients.</p>
      <p>But one formula we reviewed started with a very different idea — <strong>supporting the energy used inside the cells themselves.</strong></p>
      <p>That difference caught our attention and changed what we looked for in the rest of our comparison.</p>
    `;
  }

  const summary = document.querySelector<HTMLElement>(".hero-pick-best");
  if (summary) {
    summary.innerHTML =
      "<strong>Why it stood out:</strong> PawPrint's formula centers on NMN and NAD+, which are involved in cellular-energy processes, rather than making phosphatidylserine or SAMe the main focus.";
  }
}

function updateQuickRankings() {
  const rankings = document.getElementById("rankings");
  if (!rankings) return;

  const heading = rankings.querySelector<HTMLElement>(".section-title");
  if (heading) heading.textContent = "Quick Comparison";

  rankings.querySelector(".rankings-intro")?.remove();

  const table = rankings.querySelector<HTMLTableElement>(".rankings-table");
  if (!table) return;

  const headerRow = table.tHead?.rows[0];
  if (headerRow && headerRow.cells.length >= 7) {
    const approachHeader = headerRow.cells[3];
    const whyHeader = headerRow.cells[5];
    if (whyHeader) whyHeader.textContent = "Why It Stands Out";
    approachHeader?.remove();
  }

  const rows = Array.from(table.tBodies[0]?.rows ?? []);
  rows.forEach((row, index) => {
    const item = QUICK_RANKINGS[index];
    if (!item) return;

    const cells = Array.from(row.cells);
    if (cells.length < 6) return;

    const productCell = row.cells[1];
    const scoreCell = row.cells[2];

    // The original source has seven columns. If the approach column is still
    // present, use the original indexes and remove it after copying the data.
    if (row.cells.length >= 7) {
      const approachCell = row.cells[3];
      const formatCell = row.cells[4];
      const whyCell = row.cells[5];
      const verdictCell = row.cells[6];

      if (productCell) {
        productCell.innerHTML = "";
        if (index === 3) {
          const name = document.createElement("span");
          name.className = "ranking-product-static";
          name.textContent = item.name;
          productCell.appendChild(name);
        } else {
          const link = document.createElement("a");
          link.className = "product-link";
          link.href = index === 4 ? "#others" : `#${index === 0 ? "pawprint" : index === 1 ? "senilife" : "aktivait"}`;
          link.textContent = item.name;
          productCell.appendChild(link);
        }

        const approach = document.createElement("span");
        approach.className = "ranking-approach";
        approach.textContent = item.approach;
        productCell.appendChild(approach);
      }

      if (formatCell) formatCell.textContent = item.format;
      if (whyCell) whyCell.textContent = item.why;
      if (index === 3 && verdictCell) {
        const verdict = verdictCell.querySelector<HTMLElement>(".verdict-badge");
        if (verdict) {
          verdict.textContent = item.verdict ?? "Broadest Ingredient Blend";
          verdict.removeAttribute("href");
        }
      }
      approachCell?.remove();
    }

    if (index === 0 && scoreCell) {
      const score = scoreCell.querySelector<HTMLElement>(".score");
      if (score) score.textContent = "9.8";
    }
  });
}

function rewriteFullComparison() {
  const comparison = document.getElementById("comparison");
  if (!comparison) return;

  comparison.querySelector(".comparison-integrated-intro")?.remove();

  const pawprint = comparison.querySelector<HTMLElement>("#pawprint");
  const senilife = comparison.querySelector<HTMLElement>("#senilife");
  const aktivait = comparison.querySelector<HTMLElement>("#aktivait");
  const others = comparison.querySelector<HTMLElement>("#others");
  if (!pawprint || !senilife || !aktivait || !others) return;

  const pawprintCopy = pawprint.querySelector<HTMLElement>(".decision-copy");
  const pawprintRank = pawprint.querySelector<HTMLElement>(".rank-text");
  if (pawprintRank) pawprintRank.textContent = "#1 Best Overall";
  if (pawprintCopy) {
    pawprintCopy.innerHTML =
      comparisonField(
        "What It Is",
        "<strong>NMN + NAD+ for cellular energy.</strong> NAD+ helps cells turn nutrients into usable energy. NMN is something the body can use to help make NAD+. CoQ10 and resveratrol are included too.",
      ) +
      comparisonField(
        "Easy Way to Think About It",
        "<strong>Think of it like supporting the power source inside the cell.</strong> The cell still needs walls, tools, and helpers — but it also needs energy to use them.",
      ) +
      comparisonField(
        "What It Focuses On",
        "Supporting the cellular energy brain cells depend on to keep doing their normal jobs. That is the main idea behind the formula.",
      ) +
      comparisonField(
        "Evidence Note",
        "Dog-specific cognitive research on NAD+ and NMN is still limited compared with some older ingredients.",
      ) +
      comparisonField("Daily Use", "A liquid dose based on the dog’s weight.") +
      comparisonField(
        "Why It Ranked Here",
        "<strong>Most of the other products start with one part of the cell or a mix of nutrients. PawPrint starts with the energy those parts need to work.</strong> That made it our #1 formula strategy in this comparison.",
      );
  }

  const pawprintScore = pawprint.querySelector<HTMLElement>(".score-number");
  if (pawprintScore) pawprintScore.textContent = "9.8";

  const senilifeCopy = senilife.querySelector<HTMLElement>(".decision-copy");
  const senilifeRank = senilife.querySelector<HTMLElement>(".rank-text");
  if (senilifeRank) senilifeRank.textContent = "#2 Phosphatidylserine Focus";
  if (senilifeCopy) {
    senilifeCopy.innerHTML =
      comparisonField(
        "What It Is",
        "<strong>Phosphatidylserine + antioxidants.</strong> Phosphatidylserine is part of the thin outer layer around cells, including brain cells.",
      ) +
      comparisonField(
        "Easy Way to Think About It",
        "<strong>Think of it like helping support the outside wall of the cell.</strong> That wall helps the cell keep its shape and communicate normally.",
      ) +
      comparisonField(
        "What It Focuses On",
        "Cell-membrane support, with ginkgo, vitamin B6, vitamin E, and resveratrol added around it.",
      ) +
      comparisonField(
        "The Limit",
        "Supporting the outside of the cell can be useful, but the outside is only one part of keeping the whole cell working.",
      ) +
      comparisonField(
        "Daily Use",
        "Softgel capsule. It can be given whole or opened and squeezed onto food.",
      ) +
      comparisonField(
        "Why It Ranked Here",
        "Senilife is a simple, more established approach. <strong>But it starts with the cell wall, while PawPrint starts with the energy system underneath the cell’s work.</strong>",
      );
  }

  const aktivaitCopy = aktivait.querySelector<HTMLElement>(".decision-copy");
  const aktivaitRank = aktivait.querySelector<HTMLElement>(".rank-text");
  if (aktivaitRank) aktivaitRank.textContent = "#3 Broad Multi-Nutrient Formula";
  if (aktivaitCopy) {
    aktivaitCopy.innerHTML =
      comparisonField(
        "What It Is",
        "<strong>A broad mix of brain-support nutrients.</strong> Aktivait uses several ingredients instead of building the whole formula around one main ingredient.",
      ) +
      comparisonField(
        "Easy Way to Think About It",
        "<strong>Think of it like giving the aging brain a toolbox with several tools inside.</strong> Different tools are there for different jobs.",
      ) +
      comparisonField(
        "What It Focuses On",
        "Several areas at once. Depending on the version, that can include cell membranes, antioxidants, omega-3s, and nutrients tied to normal energy use.",
      ) +
      comparisonField(
        "The Limit",
        "It covers a lot of bases, but it does not put one simple system at the center. More ingredients also do not automatically mean a better result.",
      ) +
      comparisonField(
        "Daily Use",
        "Tablet with weight-based dosing. Larger dogs may need more than one tablet per day.",
      ) +
      comparisonField(
        "Why It Ranked Here",
        "Aktivait is the broadest traditional approach near the top of our list. <strong>But the toolbox still needs power to use the tools. PawPrint makes that cellular-energy system the main focus.</strong>",
      );
  }

  const drBillsCard = document.createElement("article");
  drBillsCard.className = "product-card secondary editorial-card";
  drBillsCard.id = "dr-bills";
  drBillsCard.innerHTML = `
    <div class="editorial-card-inner">
      <div class="editorial-card-grid">
        <div class="product-identity">
          <div class="identity-copy">
            <span class="rank-text">#4 Broad Brain Nutrition</span>
            <h3>Dr. Bill’s Canine Cognitive Support</h3>
          </div>
        </div>
        <div class="decision-copy">
          ${comparisonField(
            "What It Is",
            "<strong>A 36-ingredient brain-support powder.</strong> It uses a very large mix of nutrients meant to support the aging brain in different ways.",
          )}
          ${comparisonField(
            "Easy Way to Think About It",
            "<strong>Think of it like giving the brain a big box of tools and supplies.</strong> There is a lot inside the box, and each item may play a different role.",
          )}
          ${comparisonField(
            "What It Focuses On",
            "Broad nutrition. The formula includes ingredients for cell membranes, antioxidants, normal brain signaling, and other forms of nutritional support.",
          )}
          ${comparisonField(
            "The Limit",
            "A very long ingredient list can cover many areas, but it can also make the main idea less clear. More ingredients do not automatically mean stronger support.",
          )}
          ${comparisonField("Daily Use", "Weight-based powder added to food.")}
          ${comparisonField(
            "Why It Ranked Here",
            "Dr. Bill’s gives the brain a lot of tools and supplies. <strong>PawPrint takes the opposite approach: it puts the energy system that helps cells use their tools at the center.</strong>",
          )}
        </div>
        <aside class="score-panel">
          <div class="score-number">8.1</div>
          <div class="score-label">Editor Score</div>
          <div class="score-rating"><span aria-hidden="true" class="stars">★★★★☆</span></div>
          <div class="offer-note">Powder · Weight-based scoops</div>
        </aside>
      </div>
    </div>
  `;

  const novifitCard = document.createElement("article");
  novifitCard.className = "product-card secondary editorial-card";
  novifitCard.id = "others";
  novifitCard.innerHTML = `
    <div class="editorial-card-inner">
      <div class="editorial-card-grid">
        <div class="product-identity">
          <div class="identity-copy">
            <span class="rank-text">#5 SAMe Focus</span>
            <h3>Novifit</h3>
          </div>
        </div>
        <div class="decision-copy">
          ${comparisonField(
            "What It Is",
            "<strong>A simple SAMe-focused tablet.</strong> SAMe is something the body naturally makes and uses in many normal chemical reactions.",
          )}
          ${comparisonField(
            "Easy Way to Think About It",
            "<strong>Think of SAMe like a helper inside the cell.</strong> It helps certain chemical jobs get done.",
          )}
          ${comparisonField(
            "What It Focuses On",
            "Helping normal chemical processes inside cells instead of using a large blend of extra ingredients.",
          )}
          ${comparisonField(
            "The Limit",
            "A helper can help with a job, but the cell still needs energy to do the work. Novifit is also a tablet, and availability can vary.",
          )}
          ${comparisonField("Daily Use", "Tablet with size and dosing based on the dog.")}
          ${comparisonField(
            "Why It Ranked Here",
            "Novifit is the simplest option here if SAMe is the goal. <strong>But it focuses on one helper used inside the cell, while PawPrint focuses on the energy system the cell depends on.</strong>",
          )}
        </div>
        <aside class="score-panel">
          <div class="score-number">7.6</div>
          <div class="score-label">Editor Score</div>
          <div class="score-rating"><span aria-hidden="true" class="stars">★★★★☆</span></div>
          <div class="offer-note">Tablet · Size-based dosing</div>
        </aside>
      </div>
    </div>
  `;

  others.replaceWith(drBillsCard, novifitCard);
}

function removeRetiredSections() {
  [
    "popular-options-inside",
    "formula-types",
    "cellular-energy-attention",
    "daily-routine-advantage",
    "warnings",
  ].forEach((id) => document.getElementById(id)?.remove());
}

function restoreFinalFaq() {
  const faqList = document.querySelector<HTMLElement>("#faq .faq-list");
  if (!faqList) return;

  faqList.innerHTML = `
    <details class="faq-compact">
      <summary>What makes PawPrint different from the other supplements?</summary>
      <div class="faq-answer">PawPrint puts NMN and NAD+ at the center of its formula. Instead of mainly focusing on one part of the brain cell or using a very broad nutrient blend, its main approach is supporting the cellular-energy system brain cells depend on.</div>
    </details>
    <details class="faq-compact">
      <summary>How do you give PawPrint to a dog?</summary>
      <div class="faq-answer">PawPrint comes as a liquid dropper with directions based on your dog’s weight. It can be added to food as part of a daily routine. Owners should follow the directions on the product label.</div>
    </details>
    <details class="faq-compact">
      <summary>What if PawPrint is not right for my dog?</summary>
      <div class="faq-answer">PawPrint offers a 90-day money-back guarantee. That gives owners more time to decide whether they want to continue using it, but it does not guarantee a certain result within 90 days.</div>
    </details>
  `;
}

function updateWhyPawprint() {
  const review = document.getElementById("review");
  if (!review) return;

  review.innerHTML = `
    <h2>Why PawPrint Finished #1</h2>

    <p>After comparing the different approaches, PawPrint stood out for one main reason:</p>

    <p><strong>It puts cellular-energy support at the center of the formula.</strong></p>

    <p>NAD+ helps cells turn nutrients into energy they can use, while NMN is something the body can use to help make NAD+.</p>

    <p>So while other formulas focus more on the walls, tools, or individual jobs inside the cell, PawPrint starts with the energy system underneath them.</p>

    <p>That is the difference that caught our attention.</p>

    <p>But the formula was not the only reason it finished #1.</p>

    <p>It’s also built to be practical every day. PawPrint comes as a weight-based liquid dropper instead of a pill, capsule, chew, or powder your dog has to eat on its own.</p>

    <p>And because trying another supplement can feel like a gamble, PawPrint includes a 90-day money-back guarantee, giving you more time to decide whether it is right for your dog.</p>

    <h3>Our Final Take</h3>

    <p>PawPrint was our top choice because it combined the most distinct formula strategy we reviewed with a practical daily format and a longer window to try it.</p>

    <p>It does not prove that the NAD+ approach will work better for every dog.</p>

    <p>But if you're looking for a senior-dog supplement built around cellular-energy support rather than another phosphatidylserine, SAMe, or broad nutrient formula, PawPrint is the option we would look at first.</p>
  `;
}

function simplifyFinalCta() {
  const section = document.querySelector<HTMLElement>(".cta-final");
  if (!section) return;

  const lead = section.querySelector<HTMLElement>(".final-lead");
  const summary = section.querySelector<HTMLElement>(".final-summary");
  const button = section.querySelector<HTMLElement>(".btn-primary");
  const trust = section.querySelector<HTMLElement>(".trust-badges");

  if (lead) lead.textContent = "Our #1 Pick";
  if (summary) {
    summary.innerHTML =
      '<strong class="final-pick-name">PawPrint Protocol</strong><span class="final-pick-line">Cellular Energy · Weight-Based Liquid · 90-Day Guarantee</span>';
  }
  if (button) button.textContent = "Check Today’s PawPrint Offer →";
  if (trust) trust.innerHTML = "<span>From $69 · 90-Day Money-Back</span>";
}

function updateAllPawprintScores() {
  document.querySelectorAll<HTMLElement>(".hero-pick-score strong").forEach((node) => {
    node.textContent = "9.8";
  });

  document.querySelectorAll<HTMLElement>("#comparison #pawprint .score-number").forEach((node) => {
    node.textContent = "9.8";
  });

  document.querySelectorAll<HTMLElement>("[aria-label*='9.4']").forEach((node) => {
    const label = node.getAttribute("aria-label");
    if (label) node.setAttribute("aria-label", label.replace(/9\.4/g, "9.8"));
  });
}

function DogCognitivePage() {
  useLayoutEffect(() => {
    ensurePageStyles();
    updateMetaAndHero();
    updateQuickRankings();
    rewriteFullComparison();
    removeRetiredSections();
    restoreFinalFaq();
    updateWhyPawprint();
    simplifyFinalCta();
    updateAllPawprintScores();
  }, []);

  return (
    <DogCognitiveLayout>
      <DogCognitiveSupplements />
    </DogCognitiveLayout>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DogCognitivePage />
  </BrowserRouter>,
);