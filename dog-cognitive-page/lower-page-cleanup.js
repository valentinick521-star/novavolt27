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
    if (buyerGuide) {
      var guideTitle = buyerGuide.querySelector("h2");
      if (guideTitle) guideTitle.textContent = "Quick Guide to the Main Ingredients";

      var guideList = buyerGuide.querySelector(".guide-list");
      if (guideList) {
        guideList.innerHTML = `
          <div class="guide-compact">
            <strong>Phosphatidylserine</strong>
            <span>A fat-like substance found in cell membranes, including brain cells. It appears in senior-dog cognitive formulas as a way to support the normal structure and function of those cells.</span>
          </div>
          <div class="guide-compact">
            <strong>SAMe</strong>
            <span>A substance the body naturally makes and uses for many normal chemical jobs inside cells. Some products use SAMe by itself, while others include it in a larger blend.</span>
          </div>
          <div class="guide-compact">
            <strong>Omega-3s + Antioxidants</strong>
            <span>Omega-3s such as DHA are important parts of cell membranes. Antioxidants help protect cells from everyday oxidative stress, so both often appear in broad cognitive-support formulas.</span>
          </div>
          <div class="guide-compact">
            <strong>NAD+ + NMN</strong>
            <span>NAD+ is involved in normal cellular-energy processes. NMN is one substance the body can use to make NAD+. Dog-specific cognitive research on this approach is newer and less developed than research on some traditional ingredients.</span>
          </div>
          <div class="guide-compact">
            <strong>CoQ10 + Carnitines</strong>
            <span>These nutrients are involved in normal cellular and mitochondrial energy processes. They often appear as supporting ingredients in broader formulas.</span>
          </div>
        `;
      }

      var guideNote = buyerGuide.querySelector(".section-note");
      if (guideNote) {
        guideNote.textContent =
          "This is a quick reference, not a ranking. The products above use these ingredients in different ways and combinations.";
      }
    }

    var warningCards = warnings.querySelectorAll(".warning-compact");
    warningCards.forEach(function (card) {
      var heading = card.querySelector("strong");
      var copy = card.querySelector("span");
      if (!heading || !copy) return;

      if (heading.textContent.indexOf("format your dog") !== -1) {
        heading.textContent = "A format that does not fit your routine.";
        copy.textContent =
          "If your dog regularly refuses the format, it is hard to use the product consistently. Choose a form you can realistically give every day.";
      }

      if (heading.textContent.indexOf("return policy") !== -1) {
        copy.textContent =
          "A clear policy matters because owners should know what happens if a product is not a good fit for their dog or routine.";
      }
    });

    var methodCards = warnings.querySelectorAll(".method-compact");
    methodCards.forEach(function (card) {
      var heading = card.querySelector("strong");
      var copy = card.querySelector("span");
      if (!heading || !copy) return;
      var label = heading.textContent.trim();

      if (label.indexOf("Daily usability") === 0) {
        copy.textContent = "Format, dose, dosing frequency, and how realistic the routine is for daily use.";
      }

      if (label.indexOf("Guarantee and buyer protection") === 0) {
        copy.textContent = "How clear the return policy is and how much time the buyer has to decide whether the product is a fit.";
      }
    });

    var vet = document.getElementById("vet");
    if (vet) {
      var vetLead = vet.querySelector(".compact-lead");
      if (vetLead) {
        vetLead.textContent =
          "New confusion, pacing, night waking, or house-soiling in an older dog can have more than one cause. A veterinarian can help rule out pain, vision or hearing problems, illness, or medication side effects before you assume the change is cognitive.";
      }
      var vetNote = vet.querySelector(".section-note");
      if (vetNote) {
        vetNote.textContent =
          "This page compares consumer products. It is not veterinary advice, and supplements do not replace an exam or treatment plan from your veterinarian.";
      }
    }

    var faqList = faq.querySelector(".faq-list");
    if (faqList) {
      faqList.innerHTML = `
        <details class="faq-compact">
          <summary>Which five products are in this comparison?</summary>
          <div class="faq-answer">The five products are PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support, and Novifit. They use different formula strategies, so the main question is not just which brand you know — it is what type of approach you want.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Senilife?</summary>
          <div class="faq-answer">Senilife is built mainly around phosphatidylserine and antioxidants and comes as a softgel. PawPrint is built around NAD+ and NMN cellular-energy support and comes as a liquid dropper. They are different approaches, and neither has been proven superior to the other in a head-to-head trial.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Aktivait?</summary>
          <div class="faq-answer">Aktivait uses a broad mix of cognitive-support nutrients, which may include phosphatidylserine, omega-3s, antioxidants, carnitines, and CoQ10 depending on the version. PawPrint uses a more focused formula built around NAD+ and NMN. A broader ingredient list is a different strategy, not automatically a better one.</div>
        </details>
        <details class="faq-compact">
          <summary>How does PawPrint compare with Dr. Bill’s Canine Cognitive Support?</summary>
          <div class="faq-answer">Dr. Bill’s uses a broad 36-ingredient powder approach designed to provide many types of nutritional support. PawPrint uses a more focused formula built around NAD+ and NMN cellular-energy support and comes as a liquid dropper. Neither approach has been proven superior to the other in a head-to-head trial.</div>
        </details>
        <details class="faq-compact">
          <summary>What ingredients are common in senior-dog cognitive supplements?</summary>
          <div class="faq-answer">Common ingredients include phosphatidylserine, SAMe, omega-3s, antioxidants, CoQ10, carnitines, vitamins, and botanicals. Newer formulas may also use NAD+ and NMN. Different products combine these ingredients in very different ways.</div>
        </details>
        <details class="faq-compact">
          <summary>What are NAD+ and NMN?</summary>
          <div class="faq-answer">NAD+ is a substance involved in normal cellular-energy processes. NMN is one substance the body can use to make NAD+. Dog-specific cognitive research on this approach is newer and less developed than research on some traditional ingredients.</div>
        </details>
        <details class="faq-compact">
          <summary>Are liquid cognitive supplements better than capsules, chews, or powders?</summary>
          <div class="faq-answer">Not because they are liquid. There is no reason to assume a liquid works better inside the body. The difference is practical: a liquid removes the specific problem of a dog finding and spitting out a solid pill or chew. For a dog that easily takes another format, that may not matter.</div>
        </details>
        <details class="faq-compact">
          <summary>Should I talk to my veterinarian before adding a supplement?</summary>
          <div class="faq-answer">It is especially important if your dog has new or fast-changing symptoms, takes prescription medication, has a chronic health condition, or already uses other supplements. Bring the current ingredient label so your veterinarian can see exactly what you are considering.</div>
        </details>
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
