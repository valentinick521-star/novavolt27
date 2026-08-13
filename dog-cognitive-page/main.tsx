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

function DogCognitivePage() {
  useEffect(() => {
    const summary = document.querySelector<HTMLElement>(".hero-pick-best");
    if (summary) {
      summary.innerHTML =
        "<strong>Why it stood out:</strong> PawPrint takes a different approach from most products we reviewed. Its formula centers on NMN and NAD+, which are involved in normal cellular-energy processes, rather than making phosphatidylserine or SAMe the main focus.";
    }

    updateQuickRankings();
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
