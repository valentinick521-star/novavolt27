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
      ['Built Around', '<strong>Cellular Energy · NAD+ + NMN.</strong> NMN and NAD+ are at the center of the formula, with CoQ10 and resveratrol alongside them.'],
      ['Why People Choose It', 'PawPrint makes NMN and NAD+ the main focus instead of building the formula around phosphatidylserine, SAMe, or a large nutrient blend.'],
      ['How It Differs', 'It is the clearest option here built around cellular energy rather than making a traditional brain ingredient or broad nutrient blend the main focus.'],
      ['Daily Use', 'A daily liquid dose based on body weight.'],
      ['Main Tradeoff', 'The cellular-energy approach should be viewed as a different strategy rather than proof of a better result.'],
      ['Best Fit', 'Owners interested in cellular-energy support who also prefer a liquid format.']
    ]);

    setCopy(senilife, [
      ['Built Around', '<strong>Phosphatidylserine + Antioxidants.</strong>'],
      ['Why People Choose It', 'A focused formula built around phosphatidylserine with supporting nutrients around it.'],
      ['How It Differs From #1', 'Senilife starts mainly with cell-membrane support. PawPrint starts mainly with cellular-energy support.'],
      ['Daily Use', 'Softgel that can be given whole or opened onto food.'],
      ['Main Tradeoff', 'It still requires consistently giving a capsule or its contents.'],
      ['Best Fit', 'Owners who prefer a focused phosphatidylserine formula.']
    ]);

    setCopy(aktivait, [
      ['Built Around', '<strong>Broad Multi-Nutrient Support.</strong>'],
      ['Why People Choose It', 'Aktivait takes a broad approach, combining several nutrients intended to support normal brain function rather than building the whole formula around one single ingredient.'],
      ['How It Differs From #1', 'Aktivait spreads support across several nutritional areas. PawPrint uses a more focused cellular-energy strategy centered on NAD+ and NMN.'],
      ['Daily Use', 'Tablet. Larger dogs may need more than one tablet per day.'],
      ['Main Tradeoff', 'A broad multi-nutrient formula is less centered around one simple mechanism.'],
      ['Best Fit', 'Owners who like the idea of covering several nutritional areas at once.']
    ]);

    var aktivaitRank = aktivait.querySelector('.rank-text');
    if (aktivaitRank) aktivaitRank.textContent = '#3 Broad Multi-Nutrient Formula';
    var aktivaitOffer = aktivait.querySelector('.offer-note');
    if (aktivaitOffer) aktivaitOffer.textContent = 'Tablet · Weight-based dosing';

    setCopy(drBills, [
      ['Built Around', '<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong>'],
      ['Why People Choose It', 'One of the widest formulas in the comparison, using many different nutrients intended to support normal brain and nervous-system function.'],
      ['How It Differs From #1', 'Dr. Bill’s starts with the idea of supporting the brain from many directions. PawPrint starts with cellular energy, centering the formula on NAD+ and NMN.'],
      ['Daily Use', 'A weight-based powder added to food.'],
      ['Main Tradeoff', 'Its broad 36-ingredient formula is less centered around one simple mechanism.'],
      ['Best Fit', 'Owners who prefer a very broad multi-nutrient formula.']
    ]);

    setCopy(novifit, [
      ['Built Around', '<strong>SAMe.</strong>'],
      ['Why People Choose It', 'A simple, focused SAMe formula.'],
      ['How It Differs From #1', 'Novifit centers on one traditional active ingredient. PawPrint combines several ingredients around the cellular-energy idea.'],
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
