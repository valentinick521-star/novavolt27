(function () {
  function setField(card, label, html) {
    if (!card) return;
    card.querySelectorAll('.comparison-field').forEach(function (field) {
      var name = field.querySelector('.comparison-field-label');
      var copy = field.querySelector('p');
      if (!name || !copy || name.textContent.trim() !== label) return;
      if (copy.innerHTML !== html) copy.innerHTML = html;
    });
  }

  function ensureCompareLink(card) {
    if (!card) return;
    var panel = card.querySelector('.score-panel');
    if (!panel) return;
    var link = panel.querySelector('a.editorial-cta.secondary');
    if (!link) {
      link = document.createElement('a');
      link.className = 'editorial-cta secondary';
      link.textContent = 'Compare With #1 →';
      var note = panel.querySelector('.offer-note');
      if (note) panel.insertBefore(link, note);
      else panel.appendChild(link);
    }
    link.setAttribute('href', '#pawprint-full-comparison');
  }

  function apply() {
    var comparison = document.getElementById('comparison');
    if (!comparison || comparison.dataset.buyingCopyRewrite !== 'true') return false;

    var pawprint = comparison.querySelector('#pawprint');
    var senilife = comparison.querySelector('#senilife');
    var aktivait = comparison.querySelector('#aktivait');
    var drBills = comparison.querySelector('#dr-bills');
    var novifit = comparison.querySelector('#others');
    if (!pawprint || !senilife || !aktivait || !drBills || !novifit) return false;

    var anchor = comparison.querySelector('#pawprint-full-comparison');
    if (!anchor) {
      anchor = document.createElement('span');
      anchor.id = 'pawprint-full-comparison';
      anchor.className = 'nav-anchor';
      anchor.setAttribute('aria-hidden', 'true');
      pawprint.parentNode.insertBefore(anchor, pawprint);
    }

    setField(pawprint, 'Built Around', '<strong>Cellular Energy · NAD+ + NMN.</strong> NMN and NAD+ are at the center of the formula, with CoQ10 and resveratrol alongside them.');
    setField(pawprint, 'Why People Choose It', 'Its main point of difference is a formula centered on cellular-energy support rather than phosphatidylserine, SAMe, or a very broad nutrient blend.');
    setField(pawprint, 'How It Differs', 'PawPrint starts with NMN and NAD+ as the central strategy. That makes it different from the other approaches here, but it is not proof of clinically superior results.');
    setField(pawprint, 'Daily Use', 'Weight-based liquid dropper with directions that change with the dog’s size.');
    setField(pawprint, 'Best Fit', 'Owners interested in cellular-energy support who also prefer a liquid format.');

    setField(senilife, 'Built Around', '<strong>Phosphatidylserine + Antioxidants.</strong> Phosphatidylserine sits at the center of the formula, with antioxidants and other nutrients alongside it.');
    setField(senilife, 'Why People Choose It', 'The formula is mainly positioned around supporting brain-cell structure and normal function.');
    setField(senilife, 'How It Differs From #1', 'Senilife centers on phosphatidylserine and brain-cell structure. PawPrint centers on NMN, NAD+, and cellular-energy support.');

    setField(aktivait, 'Built Around', '<strong>Broad Multi-Nutrient Support.</strong> Aktivait includes phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients.');
    setField(aktivait, 'Why People Choose It', 'It spreads support across several nutritional areas rather than putting one system at the center of the formula.');
    setField(aktivait, 'How It Differs From #1', 'Aktivait uses a broad multi-ingredient strategy. PawPrint uses a more focused cellular-energy strategy centered on NMN and NAD+.');

    setField(drBills, 'Built Around', '<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong>');
    setField(drBills, 'Why People Choose It', 'The formula is designed to provide nutritional support for the aging brain from many different directions.');
    setField(drBills, 'How It Differs From #1', 'Dr. Bill’s uses broad nutritional coverage. PawPrint uses a more focused cellular-energy strategy built around NMN and NAD+.');

    setField(novifit, 'Built Around', '<strong>SAMe.</strong>');
    setField(novifit, 'Why People Choose It', 'Novifit uses a focused SAMe approach centered around supporting normal chemical processes happening inside cells.');
    setField(novifit, 'How It Differs From #1', 'Novifit centers on SAMe. PawPrint centers on NMN, NAD+, and the cellular-energy system.');

    ensureCompareLink(senilife);
    ensureCompareLink(aktivait);
    ensureCompareLink(drBills);
    ensureCompareLink(novifit);

    if (comparison.dataset.pawprintScrollWired !== 'true') {
      comparison.dataset.pawprintScrollWired = 'true';
      comparison.addEventListener('click', function (event) {
        var link = event.target.closest('a[href="#pawprint-full-comparison"]');
        if (!link || !comparison.contains(link)) return;
        var target = document.getElementById('pawprint-full-comparison');
        if (!target) return;
        event.preventDefault();
        var topbar = document.querySelector('.topbar');
        var offset = (topbar ? topbar.offsetHeight : 58) + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        if (history.replaceState) history.replaceState(null, '', '#pawprint-full-comparison');
      });
    }

    comparison.dataset.comparisonCorrectionsApplied = 'true';
    return true;
  }

  if (apply()) return;
  var root = document.getElementById('root');
  if (!root) return;
  var observer = new MutationObserver(function () {
    if (apply()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true, attributes: true });
})();
