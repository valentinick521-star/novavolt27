(function () {
  function cleanupLowerPage() {
    var guide = document.getElementById("guide");
    var warnings = document.getElementById("warnings");
    var faq = document.getElementById("faq");
    var finalSection = document.querySelector(".cta-final");
    if (!guide || !warnings || !faq || !finalSection) return false;
    if (guide.dataset.lowerCleanup === "true") return true;
    guide.dataset.lowerCleanup = "true";

    var buyerGuide = guide.querySelector(".compact-card:not(#vet)");
    if (buyerGuide) buyerGuide.remove();

    var vet = document.getElementById("vet");
    if (vet) vet.style.gridColumn = "1 / -1";

    var trustCards = warnings.querySelectorAll(".compact-card");
    var redFlags = trustCards[0];
    var methodology = trustCards[1];

    if (redFlags) {
      redFlags.innerHTML = `
        <div class="section-kicker">Buying Red Flags</div>
        <h2>What to Watch For</h2>

        <div class="warning-compact">
          <strong>No clear ingredient disclosure.</strong>
          <span>If you cannot tell what is actually in the formula, it is hard to compare products or discuss it clearly with your veterinarian.</span>
        </div>
        <div class="warning-compact">
          <strong>Medical promises that sound too good to be true.</strong>
          <span>Be cautious with supplement claims about curing, reversing, or treating serious cognitive problems.</span>
        </div>
        <div class="warning-compact">
          <strong>A format your dog will not consistently take.</strong>
          <span>A formula only matters if it can realistically become part of the daily routine.</span>
        </div>
        <div class="warning-compact">
          <strong>No clear return policy or company information.</strong>
          <span>You should be able to tell who makes the product, how to contact them, and what happens if the product is not a good fit.</span>
        </div>
      `;
    }

    if (methodology) {
      methodology.innerHTML = `
        <div class="section-kicker">How We Compared</div>
        <h2>The Four Factors We Used</h2>

        <div class="method-compact">
          <strong>Formula Strategy.</strong>
          <span>What is the product actually built around?</span>
        </div>
        <div class="method-compact">
          <strong>Daily Usability.</strong>
          <span>How realistic are the format and dosing for everyday use?</span>
        </div>
        <div class="method-compact">
          <strong>Transparency.</strong>
          <span>Are the ingredients, directions, and product information clear?</span>
        </div>
        <div class="method-compact">
          <strong>Value &amp; Buyer Protection.</strong>
          <span>We considered price, dosing needs, and the return or guarantee policy.</span>
        </div>
        <div class="section-note">These scores are editorial rankings based on the factors above. They do not represent proven clinical effectiveness.</div>
      `;
    }

    if (vet) {
      var vetLead = vet.querySelector(".compact-lead");
      if (vetLead) {
        vetLead.textContent =
          "New confusion, pacing, sleep changes, or other behavior changes in an older dog can have more than one cause. A veterinarian can help rule out other problems before you assume the change is normal cognitive aging.";
      }

      var vetPoints = vet.querySelector(".decision-points");
      if (vetPoints) {
        vetPoints.innerHTML = `
          <li class="neutral"><span>Your dog takes prescription medication.</span></li>
          <li class="neutral"><span>Your dog has a chronic health condition.</span></li>
          <li class="neutral"><span>Symptoms appeared suddenly or are getting worse quickly.</span></li>
          <li class="neutral"><span>You are combining more than one supplement.</span></li>
        `;
      }

      var vetNote = vet.querySelector(".section-note");
      if (vetNote) {
        vetNote.textContent =
          "Bring the current ingredient label to your veterinarian so they can see exactly what you are considering.";
      }
    }

    var faqList = faq.querySelector(".faq-list");
    if (faqList) {
      faqList.innerHTML = `
        <details class="faq-compact">
          <summary>Which five products are in this comparison?</summary>
          <div class="faq-answer">PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support, and Novifit. They use different formula strategies, so the best fit depends on what type of approach and daily format you prefer.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Senilife?</summary>
          <div class="faq-answer">Senilife is built mainly around phosphatidylserine and antioxidants and comes as a softgel. PawPrint is centered on NAD+ and NMN cellular-energy support and comes as a liquid dropper. They are different approaches, and neither has been proven superior to the other in a head-to-head trial.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Aktivait?</summary>
          <div class="faq-answer">Aktivait uses a broad mix of nutrients that may include phosphatidylserine, omega-3s, antioxidants, carnitines, and CoQ10 depending on the version. PawPrint uses a more focused formula centered on NAD+ and NMN. A broader ingredient list is a different strategy, not automatically a better one.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Dr. Bill’s Canine Cognitive Support?</summary>
          <div class="faq-answer">Dr. Bill’s uses a broad 36-ingredient powder approach designed to provide many types of nutritional support. PawPrint uses a more focused formula centered on NAD+ and NMN cellular-energy support and comes as a liquid dropper. Neither approach has been proven superior in a head-to-head trial.</div>
        </details>
        <details class="faq-compact">
          <summary>What is the difference between NAD+ and NMN?</summary>
          <div class="faq-answer">NAD+ is involved in normal cellular-energy processes. NMN is one substance the body can use to make NAD+. The earlier cellular-energy section explains why that approach stood out in this comparison.</div>
        </details>
        <details class="faq-compact">
          <summary>Are liquid supplements better than capsules, chews, or powders?</summary>
          <div class="faq-answer">Not simply because they are liquid. The difference is practical: some owners find a liquid easier to fit into a daily routine. If your dog easily takes another format, that may not matter.</div>
        </details>
        <details class="faq-compact">
          <summary>Should I talk to my veterinarian before adding a supplement?</summary>
          <div class="faq-answer">It is especially important if your dog takes prescription medication, has a chronic condition, shows sudden changes, or already uses other supplements. Bring the current ingredient label with you.</div>
        </details>
      `;
    }

    var review = document.getElementById("review");
    if (review) {
      review.innerHTML = `
        <h2>Why PawPrint Finished #1</h2>

        <h3>1. It Started With a Different Approach</h3>
        <p>PawPrint was the clearest formula we reviewed built around the cellular-energy idea. NMN and NAD+ sit at the center of the formula instead of phosphatidylserine, SAMe, or a very large nutrient blend. That is what first caught our attention. It does not mean NAD+ has been proven better.</p>

        <h3>2. It Was Built for Daily Use</h3>
        <p>PawPrint comes as a weight-based liquid dropper. That creates a different daily routine from capsules, tablets, chews, and powders. This is about how it is used each day, not a claim that liquid works better inside the body.</p>

        <h3>3. It Gives You More Room to Decide</h3>
        <p>PawPrint includes a 90-day money-back guarantee. Changes in an older dog can be hard to judge from one day to the next, so a longer return window gives owners more time to decide whether they want to continue. It does not promise that results will appear within 90 days.</p>

        <p><strong>Final verdict:</strong> PawPrint did not finish first because we proved it works better than every other formula. It finished first because it gave us the clearest point of difference, a practical daily format, weight-based directions, and a longer window to decide whether it is right for your dog.</p>
      `;
    }

    var finalLead = finalSection.querySelector(".final-lead");
    if (finalLead) finalLead.textContent = "Before You Choose";

    var finalSummary = finalSection.querySelector(".final-summary");
    if (finalSummary) {
      finalSummary.innerHTML =
        "Use the comparison above to decide which approach fits your priorities: a focused phosphatidylserine formula, a SAMe option, a broad nutrient blend, or a cellular-energy approach. Then check the current label, daily format, dose, price, and return policy. If PawPrint’s NAD+/NMN approach and liquid format match what you are looking for, you can check current availability below. If another approach fits better, use that as your starting point with your veterinarian. None of these products has been proven superior to the others in a head-to-head trial.";
    }

    return true;
  }

  if (cleanupLowerPage()) return;

  var root = document.getElementById("root");
  if (!root) return;
  var observer = new MutationObserver(function () {
    if (cleanupLowerPage()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
