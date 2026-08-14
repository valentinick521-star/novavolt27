(function () {
  var META_DESCRIPTION =
    "We compared five cognitive supplements for senior dogs on formulation strategy, daily usability and buyer protection. See how PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support and Novifit differ.";

  function setText(node, text) {
    if (node && node.textContent !== text) node.textContent = text;
  }

  function setHtml(node, html) {
    if (node && node.innerHTML !== html) node.innerHTML = html;
  }

  function setField(card, label, html) {
    if (!card) return;
    card.querySelectorAll('.comparison-field').forEach(function (field) {
      var fieldLabel = field.querySelector('.comparison-field-label');
      var copy = field.querySelector('p');
      if (!fieldLabel || !copy) return;
      if (fieldLabel.textContent.trim().toLowerCase() === label.toLowerCase()) {
        setHtml(copy, html);
      }
    });
  }

  function removeStandaloneExplainers() {
    ['popular-options-inside', 'formula-types', 'cellular-energy-attention'].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) section.remove();
    });
  }

  function ensureComparisonIntro() {
    var comparison = document.getElementById('comparison');
    var stack = comparison && comparison.querySelector('.comparison-stack');
    if (!comparison || !stack) return;

    var intro = comparison.querySelector('.comparison-integrated-intro');
    if (!intro) {
      intro = document.createElement('p');
      intro.className = 'comparison-integrated-intro';
      intro.textContent =
        'These products are all made for cognitive support, but they do not all start in the same place. The cards below explain what each approach is trying to support and why that mattered in our ranking.';
      stack.parentNode.insertBefore(intro, stack);
    }

    if (!document.getElementById('comparison-integrated-intro-styles')) {
      var style = document.createElement('style');
      style.id = 'comparison-integrated-intro-styles';
      style.textContent = `
        #comparison .comparison-integrated-intro {
          max-width: 72ch;
          margin: 0 0 22px;
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
        }
      `;
      document.head.appendChild(style);
    }
  }

  function fixMeta() {
    var meta = document.querySelector('meta[name="description"]');
    if (meta && meta.getAttribute('content') !== META_DESCRIPTION) {
      meta.setAttribute('content', META_DESCRIPTION);
    }
  }

  function fixQuickRankings() {
    var rows = document.querySelectorAll('#rankings tbody tr');
    if (rows.length < 5) return;

    var aktivait = rows[2];
    var aktivaitApproach = aktivait.querySelector('.ranking-approach');
    setText(aktivaitApproach, 'Broad Multi-Nutrient Support');
    Array.from(aktivait.cells).forEach(function (cell) {
      if (cell.textContent.trim() === 'Capsule / tablet') setText(cell, 'Tablet');
      if (cell.textContent.trim() === 'Broad mix of cognitive-support nutrients') {
        setText(cell, 'Broad brain-support nutrient blend');
      }
      var badge = cell.querySelector('.verdict-badge');
      if (badge && badge.textContent.trim() === 'Broadest Nutrient Stack') {
        setText(badge, 'Broad Multi-Nutrient Formula');
      }
    });

    var drBills = rows[3];
    var drBillsProduct = drBills.cells[1];
    if (drBillsProduct && !/Dr\. Bill/i.test(drBillsProduct.textContent)) {
      drBillsProduct.innerHTML =
        '<span class="ranking-product-static">Dr. Bill’s Canine Cognitive Support</span><span class="ranking-approach">Broad Brain Nutrition · 36-Ingredient Blend</span>';
    }
    Array.from(drBills.cells).forEach(function (cell) {
      if (cell.textContent.trim() === 'Capsule, twice daily') setText(cell, 'Powder');
      var badge = cell.querySelector('.verdict-badge');
      if (badge) setText(badge, 'Broadest Ingredient Blend');
    });
  }

  function updateFullComparison() {
    var comparison = document.getElementById('comparison');
    if (!comparison) return;

    var pawprint = comparison.querySelector('#pawprint');
    var senilife = comparison.querySelector('#senilife');
    var aktivait = comparison.querySelector('#aktivait');
    var drBills = comparison.querySelector('#dr-bills');
    var novifit = comparison.querySelector('#others');
    if (!pawprint || !senilife || !aktivait || !drBills || !novifit) return;

    setField(
      pawprint,
      'Built Around',
      '<strong>Cellular Energy · NAD+ + NMN.</strong> NAD+ is naturally present inside cells and is involved in the process cells use to make usable energy. NAD+ levels tend to decline with age, and NMN is something the body can use to help make NAD+.'
    );
    setField(
      pawprint,
      'Why It Stood Out',
      '<strong>PawPrint starts one step deeper.</strong> Other formulas may focus more on the walls, tools, or jobs inside the cell. PawPrint puts <strong>NMN and NAD+ at the center of its formula</strong> to support the energy system underneath them, with CoQ10 and resveratrol alongside them.'
    );
    setField(
      pawprint,
      'Why That Matters',
      '<strong>Think of it like supporting the power source of the cell itself.</strong> That is the clearest difference we found. It is a different starting point from phosphatidylserine, SAMe, or a broad nutrient blend — not proof of a better clinical result.'
    );
    setField(
      pawprint,
      'Daily Use',
      'Weight-based liquid dropper. There is no pill, capsule, or chew for the dog to find and spit out. That is a practical advantage, not evidence that liquid works better inside the body.'
    );
    setField(
      pawprint,
      'Main Tradeoff',
      'The cellular-energy strategy is newer in this category, and dog-specific cognitive research on NAD+/NMN is less established than the research behind some older ingredients such as phosphatidylserine and SAMe.'
    );
    setField(
      pawprint,
      'Best Fit',
      'Owners interested in cellular-energy support who also prefer a liquid format and value a 90-day money-back window.'
    );

    setField(
      senilife,
      'Built Around',
      '<strong>Phosphatidylserine + Antioxidants.</strong> Senilife is built around phosphatidylserine, with antioxidants and other nutrients around it. Phosphatidylserine is part of the thin outer layer around brain cells.'
    );
    setField(
      senilife,
      'Why People Choose It',
      '<strong>Think of it like helping support the outside wall of the cell so it can keep its normal shape and communicate properly.</strong> The formula stays fairly focused, with ginkgo, vitamin B6, vitamin E, and resveratrol around phosphatidylserine.'
    );
    setField(
      senilife,
      'How It Differs From #1',
      'Supporting the outside can be useful, but that is only one part of keeping the whole cell working. Senilife starts mainly with cell-membrane support; PawPrint starts mainly with the cellular-energy system underneath the work the cell has to do.'
    );
    setField(
      senilife,
      'Daily Use',
      'Softgel capsule. It can be given whole or opened so the contents can be squeezed onto food.'
    );
    setField(
      senilife,
      'Main Tradeoff',
      'It still requires a capsule-based routine, even if the contents can be added to food.'
    );
    setField(
      senilife,
      'Best Fit',
      'Owners who prefer a focused phosphatidylserine approach over a newer cellular-energy strategy.'
    );

    setField(
      aktivait,
      'Built Around',
      '<strong>Broad Multi-Nutrient Support.</strong> Aktivait combines phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients.'
    );
    setField(
      aktivait,
      'Why People Choose It',
      '<strong>Think of it like giving the aging brain a toolbox with several different tools inside.</strong> Some support cell membranes. Some help protect cells from everyday stress. Some are connected to how cells make and use energy.'
    );
    setField(
      aktivait,
      'How It Differs From #1',
      'Aktivait covers a lot of bases, but it spreads support across several areas instead of putting one system at the center. PawPrint uses a narrower strategy with NMN and NAD+ at the center.'
    );
    setField(
      aktivait,
      'Daily Use',
      'Tablet with weight-based dosing. Larger dogs may need more than one tablet per day.'
    );
    setField(
      aktivait,
      'Main Tradeoff',
      'Its broad approach is less centered on one simple mechanism, and labeling can vary by market or version, so check the exact pack you are buying.'
    );
    setField(
      aktivait,
      'Best Fit',
      'Owners who prefer a broad, cover-many-bases nutritional approach.'
    );

    setField(
      drBills,
      'Built Around',
      '<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong> Dr. Bill’s takes a very broad approach, with many ingredients meant to support the aging brain in different nutritional ways.'
    );
    setField(
      drBills,
      'Why People Choose It',
      '<strong>Think of it like giving the brain a big box filled with tools and supplies.</strong> The powder includes nutrients such as phosphatidylcholine, DHA, ginkgo, bacopa, glutathione, amino acids, and B vitamins, giving it several different ways to provide nutritional support.'
    );
    setField(
      drBills,
      'How It Differs From #1',
      'Having many tools is different from putting the system that helps power those tools at the center of the formula. Dr. Bill’s goes broad; PawPrint makes cellular energy the central strategy.'
    );
    setField(
      drBills,
      'Daily Use',
      'Weight-based powder added to food.'
    );
    setField(
      drBills,
      'Main Tradeoff',
      'The 36-ingredient approach gives broad coverage, but it is less focused around one clear central mechanism and still has to be mixed into food.'
    );
    setField(
      drBills,
      'Best Fit',
      'Owners who prefer a very broad, multi-nutrient brain-support formula.'
    );

    setField(
      novifit,
      'Built Around',
      '<strong>SAMe.</strong> Novifit centers on SAMe, something a dog’s body naturally makes and uses in many normal chemical reactions.'
    );
    setField(
      novifit,
      'Why People Choose It',
      '<strong>Think of SAMe like a helper inside the cell that helps certain jobs get done.</strong> It gives owners a straightforward SAMe-focused option without a large mix of extra ingredients.'
    );
    setField(
      novifit,
      'How It Differs From #1',
      'Helping those jobs can be useful, <strong>but the cell still needs energy to actually do the work.</strong> Novifit focuses on a helper used for jobs inside the cell; PawPrint focuses on the cellular-energy system those jobs depend on.'
    );
    setField(
      novifit,
      'Daily Use',
      'Tablet with size and dosing based on the dog.'
    );
    setField(
      novifit,
      'Main Tradeoff',
      'It still requires a tablet routine, and availability may vary by region or seller.'
    );
    setField(
      novifit,
      'Best Fit',
      'Owners or veterinarians specifically looking for a simple SAMe-focused product.'
    );
  }

  function apply() {
    removeStandaloneExplainers();
    ensureComparisonIntro();
    fixMeta();
    fixQuickRankings();
    updateFullComparison();
  }

  apply();

  var root = document.getElementById('root');
  if (root) {
    new MutationObserver(apply).observe(root, {
      childList: true,
      subtree: true,
    });
  }
})();
