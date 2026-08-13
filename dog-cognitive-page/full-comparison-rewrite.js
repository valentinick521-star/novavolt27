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
          "Built Around",
          "<strong>Cellular Energy · NAD+ + NMN.</strong> NMN and NAD+ sit at the center of the formula, with CoQ10 and resveratrol alongside them."
        ) +
        comparisonField(
          "Why It Stood Out",
          "PawPrint was the clearest product in this comparison built around the cellular-energy idea we just explained. Rather than making phosphatidylserine, SAMe, or a large nutrient blend the center of the formula, it starts with NMN and NAD+."
        ) +
        comparisonField(
          "Why That Matters",
          "That gives PawPrint a different starting point from the traditional cognitive formulas in this comparison. It does not prove better results, but it makes the formula meaningfully different from the others."
        ) +
        comparisonField(
          "Daily Use",
          "Weight-based liquid dropper. The amount changes with the dog’s size."
        ) +
        comparisonField(
          "Main Tradeoff",
          "The NAD+/NMN approach has less dog-specific cognitive research behind it than older ingredients such as phosphatidylserine and SAMe."
        ) +
        comparisonField(
          "Best Fit",
          "Owners interested in the cellular-energy approach who also want a liquid instead of another capsule, tablet, chew, or powder."
        );
    }

    var senilifeCopy = senilife.querySelector(".decision-copy");
    var senilifeRank = senilife.querySelector(".rank-text");
    if (senilifeRank) senilifeRank.textContent = "#2 Phosphatidylserine Focus";
    if (senilifeCopy) {
      senilifeCopy.innerHTML =
        comparisonField(
          "Built Around",
          "<strong>Phosphatidylserine + Antioxidants.</strong> Phosphatidylserine is the main idea, with ginkgo, vitamin B6, vitamin E, and resveratrol around it."
        ) +
        comparisonField(
          "Why People Choose It",
          "It uses a focused, more established phosphatidylserine approach and keeps the formula fairly simple compared with broad multi-ingredient products."
        ) +
        comparisonField(
          "How It Differs From #1",
          "Senilife starts with phosphatidylserine, a substance found in cell membranes. PawPrint starts with NAD+/NMN and cellular energy. Neither approach has been proven superior to the other."
        ) +
        comparisonField(
          "Daily Use",
          "Softgel capsule. It can be given whole or opened so the contents can go onto food."
        ) +
        comparisonField(
          "Main Tradeoff",
          "It still requires the owner to consistently give a capsule or its contents."
        ) +
        comparisonField(
          "Best Fit",
          "Owners who prefer the more established phosphatidylserine approach over the newer NAD+/NMN strategy."
        );
    }

    var aktivaitCopy = aktivait.querySelector(".decision-copy");
    var aktivaitRank = aktivait.querySelector(".rank-text");
    if (aktivaitRank) aktivaitRank.textContent = "#3 Broad Nutrient Support";
    if (aktivaitCopy) {
      aktivaitCopy.innerHTML =
        comparisonField(
          "Built Around",
          "<strong>Broad Nutrient Support.</strong> Depending on the version, Aktivait may combine phosphatidylserine, omega-3s, antioxidants, carnitines, CoQ10, and other nutrients."
        ) +
        comparisonField(
          "Why People Choose It",
          "Aktivait tries to support the aging brain from several nutritional directions at once instead of putting nearly all the focus on one ingredient."
        ) +
        comparisonField(
          "How It Differs From #1",
          "Some versions include ingredients tied to normal energy use, but NAD+ and NMN are not the center of the formula. Aktivait uses a broader nutrient strategy, while PawPrint uses a narrower cellular-energy strategy."
        ) +
        comparisonField(
          "Daily Use",
          "Capsule or tablet, depending on the version. Larger dogs may need multiple units."
        ) +
        comparisonField(
          "Main Tradeoff",
          "The wide ingredient list may appeal to some owners, but a longer list does not automatically mean a better result."
        ) +
        comparisonField(
          "Best Fit",
          "Owners who prefer a broad, ‘cover many bases’ nutritional approach."
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
              "Built Around",
              "<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong> The manufacturer describes it as a 36-ingredient powder with a large mix of nutrients for normal brain and nervous-system support."
            )}
            ${comparisonField(
              "Why People Choose It",
              "It takes one of the broadest approaches here. Listed ingredients include phosphatidylcholine, DHA, ginkgo, bacopa, glutathione, amino acids, turmeric, and B vitamins, so the goal is to cover many parts of brain nutrition at once."
            )}
            ${comparisonField(
              "How It Differs From #1",
              "Dr. Bill’s uses broad nutritional coverage. PawPrint uses a more focused cellular-energy strategy built around NAD+ and NMN. One covers many nutritional angles; the other makes one biological system the center of the formula. Fewer ingredients do not automatically mean better."
            )}
            ${comparisonField(
              "Daily Use",
              "Powder with weight-based scoop amounts. It can be sprinkled onto food, mixed in, or moistened. The daily amount can be given once or split into two servings."
            )}
            ${comparisonField(
              "Main Tradeoff",
              "The 36-ingredient approach gives broad coverage, but it is less focused around one clear central mechanism. It is also a powder that needs to be added to food."
            )}
            ${comparisonField(
              "Best Fit",
              "Owners who prefer a broad, multi-nutrient brain-support formula rather than one centered mainly on a single biological system."
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
              "Built Around",
              "<strong>SAMe.</strong> Novifit is the simplest and most focused SAMe option in this comparison."
            )}
            ${comparisonField(
              "Why People Choose It",
              "It gives owners and veterinarians a straightforward way to choose a SAMe-focused product without a large mix of extra ingredients."
            )}
            ${comparisonField(
              "How It Differs From #1",
              "Novifit centers on one traditional active ingredient. PawPrint combines several ingredients around the broader cellular-energy idea."
            )}
            ${comparisonField(
              "Daily Use",
              "Tablet with size and dose based on the dog."
            )}
            ${comparisonField(
              "Main Tradeoff",
              "Availability may vary by region or seller."
            )}
            ${comparisonField(
              "Best Fit",
              "Owners or veterinarians specifically looking for a SAMe-focused option rather than a broader blend."
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
