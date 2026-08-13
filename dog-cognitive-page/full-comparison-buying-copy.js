(function () {
  function field(label, text) {
    return '<div class="comparison-field"><div class="comparison-field-label">' + label + '</div><p>' + text + '</p></div>';
  }

  function setCopy(card, items) {
    var copy = card && card.querySelector('.decision-copy');
    if (!copy) return false;
    copy.innerHTML = items.map(function (item) {
      return field(item[0], item[1]);
    }).join('');
    return true;
  }

  function compareLink() {
    return '<a class="editorial-cta secondary" href="#pawprint-full-comparison">Compare With #1 →</a>';
  }

  function makeDrBillsCard() {
    var card = document.createElement('article');
    card.className = 'product-card secondary editorial-card';
    card.id = 'dr-bills';
    card.innerHTML =
      '<div class="editorial-card-inner">' +
        '<div class="editorial-card-grid">' +
          '<div class="product-identity">' +
            '<div class="identity-copy">' +
              '<span class="rank-text">#4 Broad Brain Nutrition</span>' +
              '<h3>Dr. Bill’s Canine Cognitive Support</h3>' +
            '</div>' +
          '</div>' +
          '<div class="decision-copy"></div>' +
          '<aside class="score-panel">' +
            '<div class="score-number">8.1</div>' +
            '<div class="score-label">Editor Score</div>' +
            '<div class="score-rating"><span aria-hidden="true" class="stars">★★★★☆</span></div>' +
            compareLink() +
            '<div class="offer-note">Powder · Weight-based directions</div>' +
          '</aside>' +
        '</div>' +
      '</div>';
    return card;
  }

  function makeNovifitCard() {
    var card = document.createElement('article');
    card.className = 'product-card secondary editorial-card';
    card.id = 'others';
    card.innerHTML =
      '<div class="editorial-card-inner">' +
        '<div class="editorial-card-grid">' +
          '<div class="product-identity">' +
            '<div class="identity-copy">' +
              '<span class="rank-text">#5 SAMe Focus</span>' +
              '<h3>Novifit</h3>' +
            '</div>' +
          '</div>' +
          '<div class="decision-copy"></div>' +
          '<aside class="score-panel">' +
            '<div class="score-number">7.6</div>' +
            '<div class="score-label">Editor Score</div>' +
            '<div class="score-rating"><span aria-hidden="true" class="stars">★★★★☆</span></div>' +
            compareLink() +
            '<div class="offer-note">Tablet · Size-based directions</div>' +
          '</aside>' +
        '</div>' +
      '</div>';
    return card;
  }

  function ensureComparisonCards(comparison) {
    var drBills = comparison.querySelector('#dr-bills');
    var novifit = comparison.querySelector('#others');

    if (!drBills && novifit && novifit.classList.contains('also-considered-block')) {
      drBills = makeDrBillsCard();
      var newNovifit = makeNovifitCard();
      novifit.replaceWith(drBills, newNovifit);
      novifit = newNovifit;
    }

    return {
      drBills: comparison.querySelector('#dr-bills'),
      novifit: comparison.querySelector('#others')
    };
  }

  function ensurePawprintAnchor(comparison, pawprint) {
    var anchor = comparison.querySelector('#pawprint-full-comparison');
    if (!anchor) {
      anchor = document.createElement('span');
      anchor.id = 'pawprint-full-comparison';
      anchor.className = 'nav-anchor';
      anchor.setAttribute('aria-hidden', 'true');
      pawprint.parentNode.insertBefore(anchor, pawprint);
    }
    return anchor;
  }

  function wireCompareLinks(comparison) {
    comparison.querySelectorAll('a.editorial-cta.secondary').forEach(function (link) {
      link.setAttribute('href', '#pawprint-full-comparison');
    });

    if (comparison.dataset.compareScrollWired === 'true') return;
    comparison.dataset.compareScrollWired = 'true';

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

  function updateFullComparison() {
    var comparison = document.getElementById('comparison');
    if (!comparison || comparison.dataset.buyingCopyRewrite === 'true') return false;

    var pawprint = comparison.querySelector('#pawprint');
    var senilife = comparison.querySelector('#senilife');
    var aktivait = comparison.querySelector('#aktivait');
    var cards = ensureComparisonCards(comparison);
    var drBills = cards.drBills;
    var novifit = cards.novifit;

    if (!pawprint || !senilife || !aktivait || !drBills || !novifit) return false;

    ensurePawprintAnchor(comparison, pawprint);

    setCopy(pawprint, [
      ['Built Around', '<strong>NMN + NAD+.</strong> NMN and NAD+ are at the center of the formula, with CoQ10 and resveratrol alongside them.'],
      ['Main Approach', 'Cellular-energy support is the main distinction from the other formulas on this page.'],
      ['Daily Use', 'Liquid format with directions based on the dog’s weight.'],
      ['Buyer Protection', '90-day money-back guarantee.'],
      ['How It Differs', 'A focused cellular-energy strategy rather than a phosphatidylserine, SAMe, or broad multi-nutrient approach. This is a different strategy, not proof of superior results.']
    ]);

    setCopy(senilife, [
      ['Built Around', '<strong>Phosphatidylserine</strong> with antioxidants and other supporting nutrients.'],
      ['Main Approach', 'Primarily positioned around supporting brain-cell structure and normal function.'],
      ['Daily Use', 'Softgel that can be given whole or opened onto food.'],
      ['How It Differs From #1', 'Senilife centers the formula on phosphatidylserine. PawPrint centers its formula on NMN, NAD+, and cellular-energy support.'],
      ['Best Fit', 'Owners who prefer a focused phosphatidylserine-based approach.']
    ]);

    setCopy(aktivait, [
      ['Built Around', '<strong>Broad multi-ingredient support.</strong> The formula includes phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients.'],
      ['Main Approach', 'Supports several nutritional areas rather than putting one system at the center of the formula.'],
      ['Daily Use', 'Tablet format; follow the directions on the current product label.'],
      ['How It Differs From #1', 'Aktivait spreads support across several areas. PawPrint uses a more focused cellular-energy strategy centered on NMN and NAD+.'],
      ['Best Fit', 'Owners who prefer a broad, multi-ingredient nutritional approach.']
    ]);

    setCopy(drBills, [
      ['Built Around', '<strong>Broad 36-ingredient formula.</strong>'],
      ['Main Approach', 'Designed to provide nutritional support for the aging brain from many different directions.'],
      ['Daily Use', 'Powder added to food with directions based on the dog’s size.'],
      ['How It Differs From #1', 'Dr. Bill’s uses broad nutritional coverage. PawPrint puts NMN and NAD+ at the center of a more focused cellular-energy strategy.'],
      ['Best Fit', 'Owners who prefer a very broad multi-nutrient formula.']
    ]);

    setCopy(novifit, [
      ['Built Around', '<strong>SAMe.</strong>'],
      ['Main Approach', 'Centered around supporting normal chemical processes happening inside cells.'],
      ['Daily Use', 'Tablet with size and directions based on the dog.'],
      ['How It Differs From #1', 'Novifit is a focused SAMe approach. PawPrint centers its formula on NMN, NAD+, and cellular-energy support.'],
      ['Best Fit', 'Owners specifically looking for a SAMe-focused option.']
    ]);

    var aktivaitRank = aktivait.querySelector('.rank-text');
    if (aktivaitRank) aktivaitRank.textContent = '#3 Broad Multi-Nutrient Formula';
    var aktivaitOffer = aktivait.querySelector('.offer-note');
    if (aktivaitOffer) aktivaitOffer.textContent = 'Tablet · Follow current label';

    wireCompareLinks(comparison);
    comparison.dataset.buyingCopyRewrite = 'true';
    return true;
  }

  if (updateFullComparison()) return;

  var root = document.getElementById('root');
  if (!root) return;
  var observer = new MutationObserver(function () {
    if (updateFullComparison()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
