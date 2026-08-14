(function () {
  function comparisonField(label, copy) {
    return (
      '<div class="comparison-field">' +
      '<div class="comparison-field-label">' + label + '</div>' +
      '<p>' + copy + '</p>' +
      '</div>'
    );
  }

  function rewriteFullComparison() {
    var comparison = document.getElementById("comparison");
    if (!comparison || comparison.dataset.approachRewrite === "true") return false;

    var pawprint = comparison.querySelector("#pawprint");
    var senilife = comparison.querySelector("#senilife");
    var aktivait = comparison.querySelector("#aktivait");
    var others = comparison.querySelector("#others");
    if (!pawprint || !senilife || !aktivait || !others) return false;

    comparison.dataset.approachRewrite = "true";

    if (!document.getElementById("full-comparison-approach-styles")) {
      var style = document.createElement("style");
      style.id = "full-comparison-approach-styles";
      style.textContent = `
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
        #comparison .comparison-stack-extension {
          display: contents;
        }
      `;
      document.head.appendChild(style);
    }

    var pawprintCopy = pawprint.querySelector(".decision-copy");
    var pawprintRank = pawprint.querySelector(".rank-text");
    if (pawprintRank) pawprintRank.textContent = "#1 Best Overall";
    if (pawprintCopy) {
      pawprintCopy.innerHTML =
        comparisonField(
          "What It Is",
          "<strong>NMN + NAD+ for cellular energy.</strong> NAD+ helps cells turn nutrients into usable energy. NMN is something the body can use to help make NAD+. CoQ10 and resveratrol are included too."
        ) +
        comparisonField(
          "Easy Way to Think About It",
          "<strong>Think of it like supporting the power source inside the cell.</strong> The cell still needs walls, tools, and helpers — but it also needs energy to use them."
        ) +
        comparisonField(
          "What It Focuses On",
          "The energy system brain cells depend on to keep doing their normal jobs. That is the main idea behind the formula."
        ) +
        comparisonField(
          "The Limit",
          "This is a newer approach in dog cognitive supplements. Dog-specific cognitive research on NAD+ and NMN is less established than research on some older ingredients."
        ) +
        comparisonField(
          "Daily Use",
          "A liquid dose based on the dog’s weight."
        ) +
        comparisonField(
          "Why It Ranked Here",
          "<strong>Most of the other products start with one part of the cell or a mix of nutrients. PawPrint starts with the energy those parts need to work.</strong> That made it our #1 formula strategy in this comparison. It is not proof that it will produce better clinical results."
        );
    }

    var senilifeCopy = senilife.querySelector(".decision-copy");
    var senilifeRank = senilife.querySelector(".rank-text");
    if (senilifeRank) senilifeRank.textContent = "#2 Phosphatidylserine Focus";
    if (senilifeCopy) {
      senilifeCopy.innerHTML =
        comparisonField(
          "What It Is",
          "<strong>Phosphatidylserine + antioxidants.</strong> Phosphatidylserine is part of the thin outer layer around cells, including brain cells."
        ) +
        comparisonField(
          "Easy Way to Think About It",
          "<strong>Think of it like helping support the outside wall of the cell.</strong> That wall helps the cell keep its shape and communicate normally."
        ) +
        comparisonField(
          "What It Focuses On",
          "Cell-membrane support, with ginkgo, vitamin B6, vitamin E, and resveratrol added around it."
        ) +
        comparisonField(
          "The Limit",
          "Supporting the outside of the cell can be useful, but the outside is only one part of keeping the whole cell working."
        ) +
        comparisonField(
          "Daily Use",
          "Softgel capsule. It can be given whole or opened and squeezed onto food."
        ) +
        comparisonField(
          "Why It Ranked Here",
          "Senilife is a simple, more established approach. <strong>But it starts with the cell wall, while PawPrint starts with the energy system underneath the cell’s work.</strong>"
        );
    }

    var aktivaitCopy = aktivait.querySelector(".decision-copy");
    var aktivaitRank = aktivait.querySelector(".rank-text");
    if (aktivaitRank) aktivaitRank.textContent = "#3 Broad Multi-Nutrient Formula";
    if (aktivaitCopy) {
      aktivaitCopy.innerHTML =
        comparisonField(
          "What It Is",
          "<strong>A broad mix of brain-support nutrients.</strong> Aktivait uses several ingredients instead of building the whole formula around one main ingredient."
        ) +
        comparisonField(
          "Easy Way to Think About It",
          "<strong>Think of it like giving the aging brain a toolbox with several tools inside.</strong> Different tools are there for different jobs."
        ) +
        comparisonField(
          "What It Focuses On",
          "Several areas at once. Depending on the version, that can include cell membranes, antioxidants, omega-3s, and nutrients tied to normal energy use."
        ) +
        comparisonField(
          "The Limit",
          "It covers a lot of bases, but it does not put one simple system at the center. More ingredients also do not automatically mean a better result."
        ) +
        comparisonField(
          "Daily Use",
          "Tablet with weight-based dosing. Larger dogs may need more than one tablet per day."
        ) +
        comparisonField(
          "Why It Ranked Here",
          "Aktivait is the broadest traditional approach near the top of our list. <strong>But the toolbox still needs power to use the tools. PawPrint makes that cellular-energy system the main focus.</strong>"
        );
    }

    var drBillsCard = document.createElement("article");
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
              "<strong>A 36-ingredient brain-support powder.</strong> It uses a very large mix of nutrients meant to support the aging brain in different ways."
            )}
            ${comparisonField(
              "Easy Way to Think About It",
              "<strong>Think of it like giving the brain a big box of tools and supplies.</strong> There is a lot inside the box, and each item may play a different role."
            )}
            ${comparisonField(
              "What It Focuses On",
              "Broad nutrition. The formula includes ingredients for cell membranes, antioxidants, normal brain signaling, and other forms of nutritional support."
            )}
            ${comparisonField(
              "The Limit",
              "A very long ingredient list can cover many areas, but it can also make the main idea less clear. More ingredients do not automatically mean stronger support."
            )}
            ${comparisonField(
              "Daily Use",
              "Weight-based powder added to food."
            )}
            ${comparisonField(
              "Why It Ranked Here",
              "Dr. Bill’s gives the brain a lot of tools and supplies. <strong>PawPrint takes the opposite approach: it puts the energy system that helps cells use their tools at the center.</strong>"
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

    var novifitCard = document.createElement("article");
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
              "<strong>A simple SAMe-focused tablet.</strong> SAMe is something the body naturally makes and uses in many normal chemical reactions."
            )}
            ${comparisonField(
              "Easy Way to Think About It",
              "<strong>Think of SAMe like a helper inside the cell.</strong> It helps certain chemical jobs get done."
            )}
            ${comparisonField(
              "What It Focuses On",
              "Helping normal chemical processes inside cells instead of using a large blend of extra ingredients."
            )}
            ${comparisonField(
              "The Limit",
              "A helper can help with a job, but the cell still needs energy to do the work. Novifit is also a tablet, and availability can vary."
            )}
            ${comparisonField(
              "Daily Use",
              "Tablet with size and dosing based on the dog."
            )}
            ${comparisonField(
              "Why It Ranked Here",
              "Novifit is the simplest option here if SAMe is the goal. <strong>But it focuses on one helper used inside the cell, while PawPrint focuses on the energy system the cell depends on.</strong>"
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
    return true;
  }

  if (rewriteFullComparison()) return;

  var root = document.getElementById("root");
  if (!root) return;
  var observer = new MutationObserver(function () {
    if (rewriteFullComparison()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
