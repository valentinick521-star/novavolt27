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

  function addTransition(comparison) {
    if (comparison.querySelector('.full-comparison-transition')) return;
    var heading = comparison.querySelector('.section-title');
    if (!heading) return;
    var transition = document.createElement('p');
    transition.className = 'full-comparison-transition';
    transition.textContent = 'Now that we’ve looked at how these formulas approach cognitive support differently, here’s how the five options ranked overall.';
    transition.style.maxWidth = '760px';
    transition.style.margin = '-2px 0 18px';
    transition.style.fontSize = '15px';
    transition.style.lineHeight = '1.6';
    transition.style.color = 'var(--muted)';
    heading.insertAdjacentElement('afterend', transition);
  }

  function updateFullComparison() {
    var comparison = document.getElementById('comparison');
    if (!comparison || comparison.dataset.buyingCopyRewrite === 'true') return false;

    var pawprint = comparison.querySelector('#pawprint');
    var senilife = comparison.querySelector('#senilife');
    var aktivait = comparison.querySelector('#aktivait');
    var drBills = comparison.querySelector('#dr-bills');
    var novifit = comparison.querySelector('#others');
    var stack = comparison.querySelector('.comparison-stack');
    if (!pawprint || !senilife || !aktivait || !drBills || !novifit || !stack) return false;

    addTransition(comparison);

    setCopy(pawprint, [
      ['Built Around', '<strong>Cellular Energy · NAD+ + NMN.</strong> NMN and NAD+ sit at the center of the formula, with CoQ10 and resveratrol alongside them.'],
      ['Why It Ranked #1', 'PawPrint combines the clearest cellular-energy focus in this comparison with a practical weight-based liquid format and a 90-day money-back guarantee.'],
      ['How It Differs', 'Most of the other products we reviewed center on phosphatidylserine, SAMe, antioxidants, or a broad mix of nutrients. PawPrint takes a different approach by starting with the cellular-energy system.'],
      ['Daily Use', 'Weight-based liquid dropper with directions based on the dog’s size.'],
      ['Main Tradeoff', 'Its cellular-energy strategy is a different approach, not proof that it will work better for every dog.'],
      ['Best Fit', 'Owners interested in cellular-energy support who also prefer a liquid formula.']
    ]);

    setCopy(senilife, [
      ['Built Around', '<strong>Phosphatidylserine + Antioxidants.</strong> Phosphatidylserine is the main focus, with antioxidants and other nutrients alongside it.'],
      ['Why Someone Might Choose It', 'It offers a focused phosphatidylserine approach in a softgel format that can be given whole or opened onto food.'],
      ['How It Differs', 'Senilife centers on phosphatidylserine rather than an NMN/NAD+-centered cellular-energy strategy.'],
      ['Daily Use', 'Softgel that can be given whole or opened onto food.'],
      ['Main Tradeoff', 'It still requires consistently giving a capsule or its contents.'],
      ['Best Fit', 'Owners who prefer a focused phosphatidylserine formula.']
    ]);

    setCopy(aktivait, [
      ['Built Around', '<strong>Broad Multi-Nutrient Support.</strong> Aktivait combines phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients.'],
      ['Why Someone Might Choose It', 'It spreads support across several nutritional areas instead of centering the formula on one main ingredient strategy.'],
      ['How It Differs', 'Aktivait uses a broad multi-ingredient approach, while PawPrint is more narrowly centered on cellular-energy ingredients.'],
      ['Daily Use', 'Tablet. Larger dogs may need more than one tablet per day.'],
      ['Main Tradeoff', 'Its broad formula is less focused around one simple strategy.'],
      ['Best Fit', 'Owners who prefer a broad, cover-several-areas-at-once formula.']
    ]);

    setCopy(novifit, [
      ['Built Around', '<strong>SAMe.</strong> Novifit uses a focused SAMe formula rather than a broad nutrient blend.'],
      ['Why Someone Might Choose It', 'It is a straightforward option for owners specifically looking for a SAMe-centered product.'],
      ['How It Differs', 'Novifit centers on SAMe, while PawPrint centers on NMN, NAD+, and cellular-energy support.'],
      ['Daily Use', 'Tablet with size and dosing based on the dog.'],
      ['Main Tradeoff', 'Availability may vary by region or seller.'],
      ['Best Fit', 'Owners specifically looking for a SAMe-focused product.']
    ]);

    setCopy(drBills, [
      ['Built Around', '<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong>'],
      ['Why Someone Might Choose It', 'It takes the broadest ingredient approach in this comparison, combining many nutrients in one powder formula.'],
      ['How It Differs', 'Dr. Bill’s uses broad nutritional coverage rather than centering the formula on one main strategy.'],
      ['Daily Use', 'Weight-based powder added to food.'],
      ['Main Tradeoff', 'The 36-ingredient approach is broad, but less focused around one simple strategy.'],
      ['Best Fit', 'Owners who prefer a very broad multi-nutrient formula.']
    ]);

    var pawprintRank = pawprint.querySelector('.rank-text');
    var senilifeRank = senilife.querySelector('.rank-text');
    var aktivaitRank = aktivait.querySelector('.rank-text');
    var novifitRank = novifit.querySelector('.rank-text');
    var drBillsRank = drBills.querySelector('.rank-text');
    if (pawprintRank) pawprintRank.textContent = '#1 Best Overall';
    if (senilifeRank) senilifeRank.textContent = '#2 Phosphatidylserine Focus';
    if (aktivaitRank) aktivaitRank.textContent = '#3 Broad Multi-Nutrient Formula';
    if (novifitRank) novifitRank.textContent = '#4 SAMe Focus';
    if (drBillsRank) drBillsRank.textContent = '#5 Broad Brain Nutrition';

    stack.appendChild(novifit);
    stack.appendChild(drBills);

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
