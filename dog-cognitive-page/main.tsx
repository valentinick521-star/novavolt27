import { useEffect } from "react";
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
    approach: "Broad Nutrient Support · PS + Omega-3s",
    format: "Capsule / tablet",
    why: "Broad mix of cognitive-support nutrients",
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

function updateQuickRankings() {
  const rankings = document.getElementById("rankings");
  if (!rankings) return;

  const heading = rankings.querySelector<HTMLElement>(".section-title");
  if (heading) {
    heading.textContent = "How the Top Cognitive Supplements Compare";
  }

  if (!rankings.querySelector(".rankings-intro")) {
    const intro = document.createElement("p");
    intro.className = "rankings-intro";
    intro.textContent =
      "The biggest difference wasn’t how many ingredients they had. It was what each formula was actually built around.";
    heading?.insertAdjacentElement("afterend", intro);
  }

  if (!document.getElementById("quick-rankings-focus-styles")) {
    const style = document.createElement("style");
    style.id = "quick-rankings-focus-styles";
    style.textContent = `
      #rankings .rankings-intro {
        max-width: 760px;
        margin: -2px 0 14px;
        font-size: 15px;
        line-height: 1.6;
        color: var(--muted);
      }
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
    `;
    document.head.appendChild(style);
  }

  const table = rankings.querySelector<HTMLTableElement>(".rankings-table");
  if (!table) return;

  const headerRow = table.tHead?.rows[0];
  if (headerRow) {
    const approachHeader = headerRow.cells[3];
    const whyHeader = headerRow.cells[5];
    if (whyHeader) {
      whyHeader.textContent = "Why It Stands Out";
    }
    approachHeader?.remove();
  }

  const rows = Array.from(table.tBodies[0]?.rows ?? []);
  rows.forEach((row, index) => {
    const item = QUICK_RANKINGS[index];
    if (!item) return;

    const productCell = row.cells[1];
    const approachCell = row.cells[3];
    const formatCell = row.cells[4];
    const whyCell = row.cells[5];
    const verdictCell = row.cells[6];

    if (productCell) {
      const existingLink = productCell.querySelector<HTMLAnchorElement>(".product-link");
      if (index === 3) {
        productCell.innerHTML = "";
        const name = document.createElement("span");
        name.className = "ranking-product-static";
        name.textContent = item.name;
        productCell.appendChild(name);
      } else if (existingLink) {
        existingLink.textContent = item.name;
      }

      const approach = document.createElement("span");
      approach.className = "ranking-approach";
      approach.textContent = item.approach;
      productCell.appendChild(approach);
    }

    if (formatCell) formatCell.textContent = item.format;
    if (whyCell) whyCell.textContent = item.why;

    if (index === 3 && verdictCell && item.verdict) {
      const verdict = verdictCell.querySelector<HTMLElement>(".verdict-badge");
      if (verdict) {
        verdict.textContent = item.verdict;
        verdict.removeAttribute("href");
      }
    }

    approachCell?.remove();
  });
}

function addPopularOptionsSection() {
  const rankings = document.getElementById("rankings");
  if (!rankings || document.getElementById("popular-options-inside")) return;

  if (!document.getElementById("popular-options-inside-styles")) {
    const style = document.createElement("style");
    style.id = "popular-options-inside-styles";
    style.textContent = `
      #popular-options-inside {
        max-width: 860px;
      }
      #popular-options-inside .popular-option {
        margin-top: 26px;
      }
      #popular-options-inside h3 {
        font-family: var(--serif);
        font-size: 21px;
        line-height: 1.25;
        font-weight: 800;
        color: var(--navy);
        margin: 0 0 7px;
      }
      #popular-options-inside p {
        max-width: 72ch;
        margin: 0;
        font-size: 16px;
        line-height: 1.7;
        color: var(--muted);
      }
      #popular-options-inside .popular-options-transition {
        margin-top: 30px;
        padding-top: 18px;
        border-top: 1px solid var(--line-light);
        color: var(--navy);
      }
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement("section");
  section.className = "section";
  section.id = "popular-options-inside";
  section.innerHTML = `
    <h2 class="section-title">What’s Actually Inside the Popular Options?</h2>

    <div class="popular-option">
      <h3>Senilife</h3>
      <p>Senilife is mainly built around phosphatidylserine, along with ginkgo, vitamin B6, vitamin E, and resveratrol. Phosphatidylserine is a fat-like substance that makes up part of the outer membrane around cells, including brain cells. So the Senilife approach starts with supporting the structure around brain cells, with antioxidants and other nutrients added around it.</p>
    </div>

    <div class="popular-option">
      <h3>Aktivait</h3>
      <p>Aktivait takes a broader approach. Depending on the current version, it may combine phosphatidylserine, omega-3s, antioxidants, carnitines, CoQ10, and other nutrients. Omega-3s are important parts of cell membranes. Antioxidants help protect cells from everyday oxidative stress. Ingredients like carnitine and CoQ10 are involved in the way cells make and use energy. Instead of focusing on one system, Aktivait tries to support the aging brain from several directions at once.</p>
    </div>

    <div class="popular-option">
      <h3>Novifit and Other SAMe Products</h3>
      <p>Novifit and other SAMe products are built mainly around SAMe. SAMe is a substance the body naturally makes and uses to carry out many normal chemical jobs inside cells. Instead of starting with the cell membrane, SAMe products focus more on supporting the normal chemical processes happening inside cells.</p>
    </div>

    <div class="popular-option">
      <h3>Dr. Bill’s Canine Cognitive Support</h3>
      <p>Dr. Bill’s takes one of the broadest approaches. The manufacturer describes it as a 36-ingredient powder with nutrients such as phosphatidylcholine, DHA, ginkgo, bacopa, glutathione, amino acids, and B vitamins. Some ingredients support cell membranes. Some act as antioxidants. Some are involved in normal brain signaling or energy use. Instead of choosing one main pathway, Dr. Bill’s tries to cover many different parts of brain nutrition at the same time.</p>
    </div>

    <div class="popular-option">
      <h3>PawPrint Protocol</h3>
      <p>PawPrint starts somewhere different. Its formula centers on NMN and NAD+, with CoQ10 and resveratrol alongside them. NAD+ is a substance cells use during the process of turning nutrients into usable energy. NMN is one of the building blocks the body can use to make NAD+. So instead of starting with the cell membrane, one chemical pathway, or a huge mix of nutrients, PawPrint starts with the energy system used inside the cells themselves.</p>
    </div>

    <p class="popular-options-transition"><strong>That was the biggest difference we found.</strong><br><br>Most of the products above start by asking what nutrients the aging brain may need. PawPrint starts with a different question:<br><br><strong>What about the energy those brain cells need to do their jobs?</strong><br><br>That is what we looked at next.</p>
  `;

  rankings.insertAdjacentElement("afterend", section);
}

function addFormulaTypeSection() {
  const rankings = document.getElementById("rankings");
  const comparison = document.getElementById("comparison");
  if (!rankings || !comparison || document.getElementById("formula-types")) return;

  if (!document.getElementById("formula-type-section-styles")) {
    const style = document.createElement("style");
    style.id = "formula-type-section-styles";
    style.textContent = `
      #formula-types .formula-types-card {
        max-width: 860px;
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: var(--r);
        box-shadow: var(--shadow);
        padding: 22px 24px;
      }
      #formula-types .formula-types-card p {
        margin: 0 0 12px;
        font-size: 16px;
        line-height: 1.65;
        color: var(--muted);
      }
      #formula-types .formula-types-card p:last-child {
        margin-bottom: 0;
      }
      #formula-types .formula-types-close {
        padding-top: 12px;
        border-top: 1px solid var(--line-light);
        color: var(--navy);
      }
      @media (max-width: 760px) {
        #formula-types .formula-types-card {
          padding: 18px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement("section");
  section.className = "section formula-types-section";
  section.id = "formula-types";
  section.innerHTML = `
    <h2 class="section-title">Why the Type of Formula Matters</h2>
    <div class="formula-types-card">
      <p>Two products can both say “cognitive support” and still be built in very different ways. That is why it helps to look past the front label and ask what the formula starts with.</p>
      <p><strong>Phosphatidylserine-based formulas.</strong> These start with phosphatidylserine, a substance found in cell membranes. Senilife is the clearest example on this page.</p>
      <p><strong>SAMe-based formulas.</strong> These start with SAMe, a substance the body uses in several normal processes. Novifit is the clearest example.</p>
      <p><strong>Broad nutrient formulas.</strong> These try to support the aging brain from many directions at once. They may mix omega-3s, antioxidants, vitamins, phospholipids, amino acids, botanicals, and other nutrients. Aktivait and Dr. Bill’s are examples of this broader approach.</p>
      <p>The point is not that one style is always better. It is that products made for the same goal can start from very different ideas.</p>
      <p class="formula-types-close"><strong>And then there is a newer approach: cellular energy.</strong><br><br>Instead of starting with one traditional brain ingredient or combining many nutrients at once, these formulas start with the energy system every brain cell depends on.<br><br>That was the difference we wanted to look at more closely.</p>
    </div>
  `;

  comparison.parentNode?.insertBefore(section, comparison);
}

function DogCognitivePage() {
  useEffect(() => {
    const summary = document.querySelector<HTMLElement>(".hero-pick-best");
    if (summary) {
      summary.innerHTML =
        "<strong>Why it stood out:</strong> PawPrint takes a different approach from most products we reviewed. Its formula centers on NMN and NAD+, which are involved in normal cellular-energy processes, rather than making phosphatidylserine or SAMe the main focus.";
    }

    updateQuickRankings();
    addFormulaTypeSection();
    addPopularOptionsSection();
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
