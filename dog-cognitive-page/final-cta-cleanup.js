(function () {
  function simplifyFinalCta() {
    var section = document.querySelector('.cta-final');
    if (!section || section.dataset.compactFinalCta === 'true') return false;

    var lead = section.querySelector('.final-lead');
    var summary = section.querySelector('.final-summary');
    var button = section.querySelector('.btn-primary');
    var trust = section.querySelector('.trust-badges');

    if (!lead || !summary || !button || !trust) return false;

    lead.textContent = 'Our #1 Pick';
    summary.innerHTML = '<strong class="final-pick-name">PawPrint Protocol</strong><span class="final-pick-line">Cellular Energy · Weight-Based Liquid · 90-Day Guarantee</span>';
    button.textContent = 'Check Today’s PawPrint Offer →';
    trust.innerHTML = '<span>From $69 · 90-Day Money-Back</span>';

    if (!document.getElementById('compact-final-cta-styles')) {
      var style = document.createElement('style');
      style.id = 'compact-final-cta-styles';
      style.textContent = `
        .cta-final .final-pick-name {
          display: block;
          font-family: var(--serif);
          font-size: 30px;
          line-height: 1.15;
          margin-bottom: 7px;
        }
        .cta-final .final-pick-line {
          display: block;
        }
        .cta-final .final-summary {
          margin-bottom: 16px;
        }
        @media (max-width: 760px) {
          .cta-final .final-pick-name {
            font-size: 26px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    section.dataset.compactFinalCta = 'true';
    return true;
  }

  if (simplifyFinalCta()) return;

  var root = document.getElementById('root');
  if (!root) return;
  var observer = new MutationObserver(function () {
    if (simplifyFinalCta()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
