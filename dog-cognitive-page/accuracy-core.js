(function () {
  var META_DESCRIPTION =
    "We compared five cognitive supplements for senior dogs on formulation strategy, label transparency, daily usability, price and guarantee. See how PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support and Novifit actually differ.";

  var HERO_SUBHEAD =
    "We looked at the top supplements for older dogs to find which ones may help bring back more of the dog you remember. Most took the same basic approach. But one stood out because it worked in a very different way.";

  var HERO_BODY_HTML =
    '<p>At first, most cognitive supplements look very similar. They all talk about brain health, memory, and healthy aging.</p>' +
    '<p>But when we looked at what was actually inside them, we found something important:</p>' +
    '<p><strong>They are not all built to support the aging brain in the same way.</strong></p>' +
    '<p>Some are built around phosphatidylserine. Others use SAMe, antioxidants, omega-3s, or a mix of several nutrients.</p>' +
    '<p>But one formula we reviewed started with a very different idea — <strong>supporting the energy used inside the cells themselves.</strong></p>' +
    '<p>That difference caught our attention and changed what we looked for in the rest of our comparison.</p>';

  function setText(node, text) {
    if (node && node.textContent !== text) node.textContent = text;
  }

  function fixMeta() {
    var meta = document.querySelector('meta[name="description"]');
    if (meta && meta.getAttribute("content") !== META_DESCRIPTION) {
      meta.setAttribute("content", META_DESCRIPTION);
    }
  }

  function fixHeroAccuracy() {
    var sub = document.querySelector(".hero-title-sub");
    if (sub && sub.textContent !== HERO_SUBHEAD) {
      sub.textContent = HERO_SUBHEAD;
    }

    var body = document.querySelector(".hero-body");
    if (body && body.innerHTML !== HERO_BODY_HTML) {
      body.innerHTML = HERO_BODY_HTML;
    }
  }

  function fixRankingsAccuracy() {
    var rows = document.querySelectorAll("#rankings tbody tr");
    if (rows.length < 5) return;

    var aktivait = rows[2];
    setText(aktivait.querySelector(".ranking-approach"), "Broad Multi-Nutrient Support");
    Array.from(aktivait.cells).forEach(function (cell) {
      var text = cell.textContent.trim();
      if (text === "Capsule / tablet" || text === "Capsule or tablet") setText(cell, "Tablet");
      if (text === "Broad mix of cognitive-support nutrients") {
        setText(cell, "Broad brain-support nutrient blend");
      }
      var badge = cell.querySelector(".verdict-badge");
      if (badge && badge.textContent.trim() === "Broadest Nutrient Stack") {
        setText(badge, "Broad Multi-Nutrient Formula");
      }
    });
  }

  function fixFaqAccuracy() {
    document.querySelectorAll("#faq details").forEach(function (item) {
      var summary = item.querySelector("summary");
      var answer = item.querySelector(".faq-answer");
      if (!summary || !answer) return;
      if (summary.textContent.trim() === "How does PawPrint compare with Aktivait?") {
        setText(
          answer,
          "Aktivait uses a broad blend of brain-supportive nutrients and the current U.S. product comes as a tablet. PawPrint uses a more focused formula centered on NAD+ and NMN. They are different strategies, not proof that one is automatically better."
        );
      }
    });
  }

  function fixResidualDosingLanguage() {
    var root = document.querySelector(".dog-cognitive-page-root");
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var value = node.nodeValue || "";
      var next = value
        .split("one weight-based dropper dose")
        .join("a daily liquid dose based on body weight")
        .split("a single weight-based liquid dose")
        .join("daily liquid dosing based on body weight");
      if (next !== value) node.nodeValue = next;
    }
  }

  function apply() {
    fixMeta();
    fixHeroAccuracy();
    fixRankingsAccuracy();
    fixFaqAccuracy();
    fixResidualDosingLanguage();
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      apply();
    });
  }

  apply();
  var root = document.getElementById("root");
  if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true, characterData: true });
  new MutationObserver(schedule).observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["content"] });
})();
