(function () {
  var META_DESCRIPTION =
    "We compared five cognitive supplements for senior dogs on formulation strategy, label transparency, daily usability, price and guarantee. See how PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support and Novifit actually differ.";

  function setText(node, text) {
    if (node && node.textContent !== text) node.textContent = text;
  }

  function setHtml(node, html) {
    if (node && node.innerHTML !== html) node.innerHTML = html;
  }

  function setField(card, label, html) {
    if (!card) return;
    var fields = card.querySelectorAll(".comparison-field");
    fields.forEach(function (field) {
      var fieldLabel = field.querySelector(".comparison-field-label");
      var copy = field.querySelector("p");
      if (!fieldLabel || !copy) return;
      if (fieldLabel.textContent.trim().toLowerCase() === label.toLowerCase()) {
        setHtml(copy, html);
      }
    });
  }

  function fixMeta() {
    var meta = document.querySelector('meta[name="description"]');
    if (meta && meta.getAttribute("content") !== META_DESCRIPTION) {
      meta.setAttribute("content", META_DESCRIPTION);
    }
  }

  function fixHero() {
    var sub = document.querySelector(".hero-title-sub");
    if (!sub) return;
    var oldText =
      "We looked at the top supplements for older dogs to find which ones may help bring back more of the dog you remember. Most took the same basic approach. But one stood out because it worked in a very different way.";
    var newText =
      "We looked at the top supplements for older dogs to find which ones may help bring back more of the dog you remember. Most took the same basic approach. But one stood out because it was built around a very different approach.";
    if (sub.textContent.replace(/\s+/g, " ").trim() === oldText) setText(sub, newText);
  }

  function fixRankings() {
    var rows = document.querySelectorAll("#rankings tbody tr");
    if (rows.length < 5) return;

    var aktivait = rows[2];
    var approach = aktivait.querySelector(".ranking-approach");
    setText(approach, "Broad Multi-Nutrient Support");

    Array.from(aktivait.cells).forEach(function (cell) {
      var text = cell.textContent.trim();
      if (text === "Capsule / tablet" || text === "Capsule or tablet") {
        setText(cell, "Tablet");
      }
      if (text === "Broad mix of cognitive-support nutrients") {
        setText(cell, "Broad brain-support nutrient blend");
      }
      var badge = cell.querySelector(".verdict-badge");
      if (badge && badge.textContent.trim() === "Broadest Nutrient Stack") {
        setText(badge, "Broad Multi-Nutrient Formula");
      }
    });

    var drBills = rows[3];
    var productCell = drBills.cells[1];
    if (productCell && /CogniCaps/i.test(productCell.textContent)) {
      productCell.innerHTML = '<span class="ranking-product-static">Dr. Bill’s Canine Cognitive Support</span><span class="ranking-approach">Broad Brain Nutrition · 36-Ingredient Blend</span>';
    }
    Array.from(drBills.cells).forEach(function (cell) {
      if (cell.textContent.trim() === "Capsule, twice daily") setText(cell, "Powder");
      if (/Vet-Neurologist Formulated/.test(cell.textContent)) setText(cell, "Broadest Ingredient Blend");
    });
  }

  function fixPopularOptions() {
    var section = document.getElementById("popular-options-inside");
    if (!section) return;
    section.querySelectorAll(".popular-option").forEach(function (item) {
      var heading = item.querySelector("h3");
      var copy = item.querySelector("p");
      if (!heading || !copy) return;

      if (heading.textContent.trim() === "Senilife") {
        setText(
          copy,
          "Senilife is mainly built around phosphatidylserine, along with ginkgo, vitamin B6, vitamin E, and resveratrol. Phosphatidylserine is a fat-like substance that is part of cell membranes, including brain-cell membranes. The basic idea behind a phosphatidylserine formula is to support the structure and normal function of brain-cell membranes, with antioxidants and other nutrients added around it."
        );
      }

      if (heading.textContent.trim() === "Aktivait") {
        setText(
          copy,
          "Aktivait takes a broad approach, combining several nutrients intended to support normal brain function rather than building the whole formula around one single ingredient. The current U.S. product is a tablet, and larger dogs may need more than one tablet per day. Instead of focusing on one system, Aktivait tries to support the aging brain from several nutritional directions at once."
        );
      }
    });
  }

  function fixCellularEnergySection() {
    var section = document.getElementById("cellular-energy-attention");
    if (!section) return;
    section.querySelectorAll("p").forEach(function (p) {
      var text = p.textContent.trim();
      if (text.indexOf("Dog-specific cognitive research on NAD+ and NMN") !== -1) {
        setText(
          p,
          "That idea is different, but it is not proof that an NAD+ formula will work better than every traditional option."
        );
      }
    });
  }

  function fixFullComparison() {
    var aktivait = document.querySelector("#comparison #aktivait");
    if (aktivait) {
      var rank = aktivait.querySelector(".rank-text");
      setText(rank, "#3 Broad Multi-Nutrient Formula");
      setField(aktivait, "Built Around", "<strong>Broad Multi-Nutrient Support.</strong>");
      setField(
        aktivait,
        "Why People Choose It",
        "Aktivait takes a broad approach, combining several nutrients intended to support normal brain function rather than building the whole formula around one single ingredient."
      );
      setField(
        aktivait,
        "How It Differs From #1",
        "Aktivait spreads support across several nutritional areas. PawPrint uses a more focused cellular-energy strategy centered on NAD+ and NMN."
      );
      setField(aktivait, "Daily Use", "Tablet. Larger dogs may need more than one tablet per day.");
      setField(
        aktivait,
        "Main Tradeoff",
        "A broad multi-nutrient formula is less centered around one simple mechanism."
      );
      setField(aktivait, "Best Fit", "Owners who like the idea of covering several nutritional areas at once.");
      var offer = aktivait.querySelector(".offer-note");
      setText(offer, "Tablet · Weight-based dosing");
    }

    var pawprint = document.querySelector("#comparison #pawprint");
    if (pawprint) {
      setField(pawprint, "Daily Use", "A daily liquid dose based on body weight.");
      setField(
        pawprint,
        "Main Tradeoff",
        "The cellular-energy approach should be viewed as a different strategy rather than proof of a better result."
      );
    }

    var senilife = document.querySelector("#comparison #senilife");
    if (senilife) {
      setField(
        senilife,
        "How It Differs From #1",
        "Senilife starts mainly with cell-membrane support. PawPrint starts mainly with cellular-energy support."
      );
    }
  }

  function fixFaq() {
    document.querySelectorAll("#faq details").forEach(function (item) {
      var summary = item.querySelector("summary");
      var answer = item.querySelector(".faq-answer");
      if (!summary || !answer) return;
      if (summary.textContent.trim() === "How does PawPrint compare with Aktivait?") {
        setText(
          answer,
          "Aktivait uses a broad blend of brain-supportive nutrients and the current U.S. product comes as a tablet. PawPrint uses a more focused formula centered on NAD+ and NMN. They are different strategies, not proof that one is automatically better."
        );
      }
    });
  }

  function fixResidualPhrases() {
    var root = document.querySelector(".dog-cognitive-page-root");
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    var replacements = [
      ["one weight-based dropper dose", "a daily liquid dose based on body weight"],
      ["a single weight-based liquid dose", "daily liquid dosing based on body weight"],
      ["Broadest Nutrient Stack", "Broad Multi-Nutrient Formula"]
    ];
    while ((node = walker.nextNode())) {
      var value = node.nodeValue || "";
      var next = value;
      replacements.forEach(function (pair) {
        next = next.split(pair[0]).join(pair[1]);
      });
      if (next !== value) node.nodeValue = next;
    }
  }

  function applyAccuracyCleanup() {
    fixMeta();
    fixHero();
    fixRankings();
    fixPopularOptions();
    fixCellularEnergySection();
    fixFullComparison();
    fixFaq();
    fixResidualPhrases();
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      applyAccuracyCleanup();
    });
  }

  applyAccuracyCleanup();

  var root = document.getElementById("root");
  if (root) {
    new MutationObserver(schedule).observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  new MutationObserver(schedule).observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["content"],
  });
})();
