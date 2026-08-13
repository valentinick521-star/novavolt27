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

  function updateFullComparison() {
    var comparison = document.getElementById('comparison');
    if (!comparison || comparison.dataset.buyingCopyRewrite === 'true') return false;

    var pawprint = comparison.querySelector('#pawprint');
    var senilife = comparison.querySelector('#senilife');
    var aktivait = comparison.querySelector('#aktivait');
    var drBills = comparison.querySelector('#dr-bills');
    var novifit = comparison.querySelector('#others');
    if (!pawprint || !senilife || !aktivait || !drBills || !novifit) return false;

    setCopy(pawprint, [
      ['How It Works', 'PawPrint starts from a different place.<br><br>Its formula centers on NMN and NAD+, which are involved in normal cellular-energy processes, with CoQ10 and resveratrol alongside them.<br><br>So while other formulas focus more on the <strong>walls, tools, or jobs inside the cell</strong>, PawPrint puts the <strong>cellular-energy system</strong> at the center of its formula.<br><br>Think of it like focusing on the <strong>power system the cell uses</strong> rather than one of the individual jobs that power supports.<br><br>That difference is what made PawPrint stand out to us.'],
      ['Daily Use', 'Weight-based liquid dropper with directions that change with the dog’s size.'],
      ['Main Tradeoff', 'If you want the most familiar, traditional formula, PawPrint may not be your pick. It takes a less conventional route by centering on NMN and NAD+ instead of the phosphatidylserine or SAMe approaches used by many older products.'],
      ['Best Fit', 'Owners interested in cellular-energy support who also prefer a liquid format.']
    ]);

    setCopy(senilife, [
      ['How It Works', 'Senilife is built around phosphatidylserine, along with antioxidants and other nutrients.<br><br>Phosphatidylserine is a phospholipid found in cell membranes, including the membranes around brain cells. Think of it like putting more of the focus on the <strong>outer structure of the cell</strong>.<br><br>That is a different starting point from a formula centered on cellular-energy ingredients.'],
      ['Daily Use', 'Softgel that can be given whole or opened onto food.'],
      ['Main Tradeoff', 'It still requires consistently giving a capsule or its contents.'],
      ['Best Fit', 'Owners who prefer a focused phosphatidylserine formula.']
    ]);

    setCopy(aktivait, [
      ['How It Works', 'Aktivait spreads its support across several areas.<br><br>It includes phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients. Think of it like giving the aging brain a <strong>toolbox with several different tools inside</strong>.<br><br>Instead of putting one nutritional strategy at the center, it tries to cover several areas at once.'],
      ['Daily Use', 'Tablet. Larger dogs may need more than one tablet per day.'],
      ['Main Tradeoff', 'A broad multi-nutrient formula is less centered around one simple mechanism.'],
      ['Best Fit', 'Owners who like the idea of covering several nutritional areas at once.']
    ]);

    var aktivaitRank = aktivait.querySelector('.rank-text');
    if (aktivaitRank) aktivaitRank.textContent = '#3 Broad Multi-Nutrient Formula';
    var aktivaitOffer = aktivait.querySelector('.offer-note');
    if (aktivaitOffer) aktivaitOffer.textContent = 'Tablet · Weight-based dosing';

    setCopy(drBills, [
      ['How It Works', 'Dr. Bill’s goes much wider.<br><br>Its formula contains 36 ingredients intended to support the aging brain in several nutritional ways. Think of it like giving the brain a <strong>big box of tools and supplies</strong>.<br><br>It is a broad-coverage approach rather than one centered on a single nutritional strategy.'],
      ['Daily Use', 'A weight-based powder added to food.'],
      ['Main Tradeoff', 'Its broad 36-ingredient formula is less centered around one simple mechanism.'],
      ['Best Fit', 'Owners who prefer a very broad multi-nutrient formula.']
    ]);

    setCopy(novifit, [
      ['How It Works', 'Novifit takes another route.<br><br>Its main ingredient is SAMe, a substance the body naturally makes and uses in normal chemical processes inside cells. You can think of it like a <strong>helper inside the cell</strong> that participates in those processes.<br><br>That gives Novifit a focused SAMe strategy rather than a broad nutrient blend or an NMN/NAD+-centered formula.'],
      ['Daily Use', 'Tablet with size and dosing based on the dog.'],
      ['Main Tradeoff', 'Availability may vary.'],
      ['Best Fit', 'Owners specifically looking for a SAMe-focused product.']
    ]);

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
