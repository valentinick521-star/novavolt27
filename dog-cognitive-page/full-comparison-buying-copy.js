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
    link.setAttribute('href', '#pawprint');
  }

  function addMechanismGuide(comparison, stack) {
    if (comparison.querySelector('.full-comparison-mechanism-guide')) return;

    if (!document.getElementById('full-comparison-mechanism-styles')) {
      var style = document.createElement('style');
      style.id = 'full-comparison-mechanism-styles';
      style.textContent = `
        #comparison .full-comparison-mechanism-guide {
          max-width: 860px;
          margin: 0 0 28px;
        }
        #comparison .full-comparison-mechanism-guide > h3 {
          font-family: var(--serif);
          font-size: 21px;
          line-height: 1.3;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 10px;
        }
        #comparison .mechanism-intro,
        #comparison .mechanism-item p,
        #comparison .full-comparison-ranking-transition {
          max-width: 72ch;
          font-size: 17px;
          line-height: 1.7;
          color: var(--muted);
        }
        #comparison .mechanism-intro {
          margin: 0 0 22px;
        }
        #comparison .mechanism-item {
          margin-top: 24px;
        }
        #comparison .mechanism-item h4 {
          font-family: var(--serif);
          font-size: 19px;
          line-height: 1.3;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 7px;
        }
        #comparison .mechanism-item p {
          margin: 0;
        }
        #comparison .mechanism-pawprint {
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid var(--line-light);
        }
        #comparison .full-comparison-ranking-transition {
          margin: 28px 0 18px;
          color: var(--navy);
        }
        @media (max-width: 760px) {
          #comparison .full-comparison-mechanism-guide > h3 {
            font-size: 20px;
          }
          #comparison .mechanism-item h4 {
            font-size: 18px;
          }
          #comparison .mechanism-intro,
          #comparison .mechanism-item p,
          #comparison .full-comparison-ranking-transition {
            font-size: 16.5px;
            line-height: 1.66;
          }
        }
      `;
      document.head.appendChild(style);
    }

    var guide = document.createElement('div');
    guide.className = 'full-comparison-mechanism-guide';
    guide.innerHTML = `
      <h3>First, Here’s What Each Approach Is Trying to Support</h3>
      <p class="mechanism-intro">These products are all made for cognitive support, but they do not all start in the same place.</p>

      <div class="mechanism-item">
        <h4>Senilife</h4>
        <p>Senilife is built around phosphatidylserine, with antioxidants and other nutrients around it. Phosphatidylserine is part of the thin outer layer around brain cells. <strong>Think of it like helping support the outside wall of the cell so it can keep its normal shape and communicate properly.</strong> Supporting the outside can be useful, but that is only one part of keeping the whole cell working.</p>
      </div>

      <div class="mechanism-item">
        <h4>Aktivait</h4>
        <p>Aktivait combines phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients. <strong>Think of it like giving the aging brain a toolbox with several different tools inside.</strong> Some support cell membranes. Some help protect cells from everyday stress. Some are connected to how cells make and use energy. It covers a lot of bases, but it spreads support across several areas instead of putting one system at the center.</p>
      </div>

      <div class="mechanism-item">
        <h4>Novifit / SAMe</h4>
        <p>Novifit centers on SAMe, something a dog’s body naturally makes and uses in many normal chemical reactions. <strong>Think of SAMe like a helper inside the cell that helps certain jobs get done.</strong> Helping those jobs can be useful. <strong>But the cell still needs energy to actually do the work.</strong></p>
      </div>

      <div class="mechanism-item">
        <h4>Dr. Bill’s Canine Cognitive Support</h4>
        <p>Dr. Bill’s takes a very broad approach, with many ingredients meant to support the aging brain in different nutritional ways. <strong>Think of it like giving the brain a big box filled with tools and supplies.</strong> That gives the formula several different ways to provide nutritional support. Having many tools is different from putting the system that helps power those tools at the center of the formula.</p>
      </div>

      <div class="mechanism-item mechanism-pawprint">
        <h4>PawPrint Protocol</h4>
        <p><strong>PawPrint starts one step deeper.</strong> NAD+ is naturally present inside cells and is involved in the process cells use to make usable energy. NAD+ levels tend to decline with age, and NMN is something the body can use to help make NAD+. Other formulas may focus more on the <strong>walls, tools, or jobs inside the cell.</strong> PawPrint puts <strong>NMN and NAD+ at the center of its formula</strong> to support the energy system underneath them. <strong>Think of it like supporting the power source of the cell itself.</strong> That difference is what made PawPrint stand out to us.</p>
      </div>

      <p class="full-comparison-ranking-transition"><strong>With those differences in mind, here’s how the five products ranked overall.</strong></p>
    `;

    stack.parentNode.insertBefore(guide, stack);
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

    var oldTransition = comparison.querySelector('.full-comparison-transition');
    if (oldTransition) oldTransition.remove();

    addMechanismGuide(comparison, stack);

    setCopy(pawprint, [
      ['Built Around', '<strong>Cellular Energy · NAD+ + NMN.</strong> NMN and NAD+ sit at the center of the formula, with CoQ10 and resveratrol alongside them.'],
      ['Why It Ranked #1', 'PawPrint combines the clearest cellular-energy focus in this comparison with a practical weight-based liquid format and a 90-day money-back guarantee.'],
      ['Daily Use', 'Weight-based liquid dropper with directions based on the dog’s size.'],
      ['Main Tradeoff', 'Its cellular-energy strategy is a different approach, not proof that it will work better for every dog.'],
      ['Best Fit', 'Owners interested in cellular-energy support who also prefer a liquid formula.']
    ]);

    setCopy(senilife, [
      ['Built Around', '<strong>Phosphatidylserine + Antioxidants.</strong> A focused formula with phosphatidylserine at the center.'],
      ['Why It Ranked Here', 'Senilife ranked #2 because it offers a focused phosphatidylserine approach in a softgel that can be given whole or opened onto food.'],
      ['Daily Use', 'Softgel that can be given whole or opened onto food.'],
      ['Main Tradeoff', 'It still requires consistently giving a capsule or its contents.'],
      ['Best Fit', 'Owners who prefer a focused phosphatidylserine formula.']
    ]);

    setCopy(aktivait, [
      ['Built Around', '<strong>Broad Multi-Nutrient Support.</strong> A mix of phosphatidylserine, omega-3s, antioxidants, L-carnitine, CoQ10, and other nutrients.'],
      ['Why It Ranked Here', 'Aktivait ranked #3 because it offers broad nutritional coverage across several ingredient types in one formula.'],
      ['Daily Use', 'Tablet. Larger dogs may need more than one tablet per day.'],
      ['Main Tradeoff', 'Its broad approach is less centered on one clear strategy.'],
      ['Best Fit', 'Owners who prefer a broad formula that covers several nutritional areas at once.']
    ]);

    setCopy(novifit, [
      ['Built Around', '<strong>SAMe.</strong> A focused SAMe formula rather than a broad nutrient blend.'],
      ['Why It Ranked Here', 'Novifit ranked #4 because it gives owners a straightforward SAMe-centered option without a large mix of extra ingredients.'],
      ['Daily Use', 'Tablet with size and dosing based on the dog.'],
      ['Main Tradeoff', 'Availability may vary by region or seller.'],
      ['Best Fit', 'Owners specifically looking for a SAMe-focused product.']
    ]);

    setCopy(drBills, [
      ['Built Around', '<strong>Broad Brain Nutrition · 36-Ingredient Blend.</strong>'],
      ['Why It Ranked Here', 'Dr. Bill’s ranked #5 because it offers the broadest ingredient mix in this comparison, with many nutrients combined in one powder formula.'],
      ['Daily Use', 'Weight-based powder added to food.'],
      ['Main Tradeoff', 'The 36-ingredient approach is broad, but less centered on one simple strategy.'],
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

    stack.appendChild(pawprint);
    stack.appendChild(senilife);
    stack.appendChild(aktivait);
    stack.appendChild(novifit);
    stack.appendChild(drBills);

    ensureCompareLink(senilife);
    ensureCompareLink(aktivait);
    ensureCompareLink(novifit);
    ensureCompareLink(drBills);

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
