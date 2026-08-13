import { useEffect } from "react";
import PawprintCta from "@/components/dog-cognitive/PawprintCta";

const UPDATED_LABEL = "Updated August 12, 2026";
const UPDATED_ISO = "2026-08-12";

const RANKINGS = [
  {
    rank: 1,
    id: "pawprint",
    name: "PawPrint Protocol",
    score: "9.4",
    approach: "Cellular energy · NAD+",
    format: "Liquid dropper",
    ingredients: "NMN · NAD+ · CoQ10 · Resveratrol",
    verdict: "★ Best Overall",
    verdictHref: "#top-pick",
    winner: true,
  },
  {
    rank: 2,
    id: "senilife",
    name: "Senilife",
    score: "8.8",
    approach: "Phosphatidylserine + antioxidants",
    format: "Softgel capsule",
    ingredients: "PS · Ginkgo · B6 · Vitamin E · Resveratrol",
    verdict: "Best-Known PS Formula",
    verdictHref: "#senilife",
  },
  {
    rank: 3,
    id: "aktivait",
    name: "Aktivait",
    score: "8.5",
    approach: "Antioxidant + omega-3 + mitochondrial",
    format: "Capsule / tablet",
    ingredients: "PS · DHA/EPA · L-carnitine · CoQ10 · ALA",
    verdict: "Broadest Nutrient Stack",
    verdictHref: "#aktivait",
  },
  {
    rank: 4,
    id: "others",
    name: "CogniCaps",
    score: "8.1",
    approach: "SAMe + botanical blend",
    format: "Capsule, twice daily",
    ingredients: "SAMe · Curcumin · Polygala · PS · CoQ10",
    verdict: "Vet-Neurologist Formulated",
    verdictHref: "#others",
  },
  {
    rank: 5,
    id: "others",
    name: "Novifit",
    score: "7.6",
    approach: "SAMe only",
    format: "Tablet",
    ingredients: "SAMe (tosylate)",
    verdict: "Availability Varies",
    verdictHref: "#others",
    cautionBadge: true,
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the best supplement for senior-dog cognitive support?",
    a: "There is no single answer that holds for every dog. The products in this category are built on genuinely different ingredient strategies, and none of them has been shown to outperform the others in a head-to-head trial. PawPrint Protocol finished first under our criteria for its differentiated NAD+/NMN-centered formula, its weight-based liquid dosing and its 90-day guarantee. If your priority is the longest-standing ingredient evidence rather than a newer approach, a phosphatidylserine or SAMe product may suit you better. It is worth deciding with the veterinarian who knows your dog.",
  },
  {
    q: "How does PawPrint compare with Senilife?",
    a: "They start from different premises. Senilife is a softgel capsule with a short, fully quantified list — phosphatidylserine, ginkgo biloba extract, vitamin B6, vitamin E and resveratrol — and it can be given whole or cut open and squeezed onto food. PawPrint is a liquid dropper centered on NMN and NAD+ with CoQ10 and resveratrol alongside, dosed by body weight. Senilife's anchor ingredient has more dog-specific cognitive research behind it; PawPrint offers a different formulation strategy and a format that is harder for a reluctant dog to work around. Neither is proven superior to the other.",
  },
  {
    q: "How does PawPrint compare with Aktivait?",
    a: "Aktivait's capsule formulation is the broadest in this comparison — phosphatidylserine with DHA and EPA, L-carnitine and acetyl-L-carnitine, coenzyme Q10, alpha-lipoic acid, N-acetylcysteine, vitamins C and E and selenium — and larger dogs take several units a day. PawPrint is narrower, centered on cellular-energy ingredients, and given as a single weight-based liquid dose. Aktivait's labeling also varies by market and version, so check the specific pack you are buying. A longer ingredient list is a different approach, not automatically a better one.",
  },
  {
    q: "What ingredients are commonly found in cognitive supplements for dogs?",
    a: "The recurring ones are phosphatidylserine, SAMe, omega-3 fatty acids (DHA and EPA), antioxidants such as vitamin E, vitamin C, alpha-lipoic acid and N-acetylcysteine, botanicals such as ginkgo biloba, curcumin and resveratrol, and mitochondrial cofactors such as L-carnitine, acetyl-L-carnitine and coenzyme Q10. Newer formulas add NMN and NAD+. Medium-chain triglycerides usually reach a dog through a complete senior diet rather than through a supplement.",
  },
  {
    q: "What are NAD+ and NMN supplements for dogs?",
    a: "NMN is a precursor the body uses in producing NAD+, a coenzyme involved in cellular energy metabolism. Formulas built around them are the newest group in this category and are positioned around cellular health and healthy aging rather than around the membrane phospholipid or methylation pathways that older products target. Dog-specific cognitive research on this approach is considerably less developed than the research on phosphatidylserine or SAMe, so it is best understood as a differentiated strategy rather than an established one.",
  },
  {
    q: "Are liquid cognitive supplements better than chews?",
    a: "Not medically. There is no basis for claiming a liquid works better inside the body than a chew, capsule or powder. The advantage is practical. A dropper dose cannot be located and spat out the way a capsule hidden in cheese can, it does not need to be broken up, and it does not change the texture of a bowl of food. For a senior dog with an unreliable appetite or a habit of eating around supplements, that difference decides whether the product is actually taken. For a dog that happily eats a chew, it may not matter at all.",
  },
  {
    q: "Can supplements be used alongside selegiline?",
    a: "That is a question for your veterinarian rather than a comparison page. Selegiline is a prescription medication used for canine cognitive dysfunction and it has known interactions, so anything added alongside it should be cleared by the vet who prescribed it. Bring the actual label to that conversation — the full ingredient list, not just the brand name. Do not stop or change a prescribed medication in order to try a supplement.",
  },
  {
    q: "How long should an owner evaluate a cognitive supplement?",
    a: "Manufacturers in this category commonly suggest one to two months before judging, and the published studies referenced here measured at 30 and 60 days. That is a good reason to weigh the return window: 90 days leaves room to observe across a realistic period, 30 days is tighter. Keeping short dated notes on the specific behaviors that concerned you is more reliable than memory, because day-to-day variation in senior dogs is large enough to mislead anyone watching casually.",
  },
];

export default function DogCognitiveSupplements() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "Top 5 Best Cognitive Supplements for Senior Dogs in 2026 | Independent Comparison";

    const description =
      "We compared five cognitive supplements for senior dogs on formulation strategy, label transparency, daily usability, price and guarantee. See how PawPrint Protocol, Senilife, Aktivait, CogniCaps and Novifit actually differ.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href =
      "https://nationalconsumerreview.com/best-dog-cognitive-supplements/";

    return () => {
      document.title = previousTitle;
      if (meta) {
        if (previousDescription === null) meta.remove();
        else meta.content = previousDescription;
      }
      if (canonical) {
        if (previousCanonical === null) canonical.remove();
        else canonical.href = previousCanonical;
      }
    };
  }, []);
  useEffect(() => {
    const sticky = document.querySelector<HTMLElement>(".sticky-cta");
    const rankings = document.getElementById("rankings");
    const hero = document.querySelector<HTMLElement>(".hero");
    const topbar = document.querySelector<HTMLElement>(".topbar");

    const update = () => {
      if (!sticky) return;
      let visible = false;
      if (window.innerWidth <= 760 && rankings) {
        visible = rankings.getBoundingClientRect().top <= window.innerHeight;
      } else if (hero) {
        const offset = (topbar?.offsetHeight ?? 0) + 10;
        visible = hero.getBoundingClientRect().bottom <= offset;
      }
      sticky.classList.toggle("is-visible", visible);
      document.querySelector(".dog-cognitive-page-root")?.classList.toggle("sticky-cta-visible", visible);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.querySelector(".dog-cognitive-page-root")?.classList.remove("sticky-cta-visible");
    };
  }, []);

  return (
    <>
      <main className="page-wrap" id="top">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid">
            <div>
              <h1>
                Senior Dog Cognitive Support: SAMe, Senilife, Aktivait &amp; More
                — What Helps
              </h1>
              <div className="hero-title-sub">
                We looked at the top supplements for older dogs to find which ones
                may help bring back more of the dog you remember. Most took the
                same basic approach. But one stood out because it worked in a very
                different way.
              </div>

              <div className="hero-meta hero-meta--date-only">
                <time className="hero-updated" dateTime={UPDATED_ISO}>
                  {UPDATED_LABEL}
                </time>
              </div>

              <div className="hero-body">
                <p>
                  You're here because you want to support your older dog's brain
                  and keep more of the dog you remember. That's exactly why we
                  made this comparison.
                </p>
                <p>
                  At first, most cognitive supplements look very similar. They
                  all talk about brain health, memory, and healthy aging.
                </p>
                <p>
                  But when we looked at what was actually inside them, we found
                  something important:
                </p>
                <p>
                  <strong>
                    They are not all built to support the aging brain in the same
                    way.
                  </strong>
                </p>
                <p>
                  Some are built around phosphatidylserine. Others use SAMe,
                  antioxidants, omega-3s, or a mix of several nutrients.
                </p>
                <p>
                  But one formula we reviewed started with a very different idea
                  — <strong>supporting the energy used inside the cells themselves.</strong>
                </p>
                <p>
                  That difference caught our attention and changed what we looked
                  for in the rest of our comparison.
                </p>
              </div>
            </div>

            <aside
              className="hero-side hero-pick-card card"
              aria-label="Number one pick summary"
            >
              <p className="hero-pick-eyebrow">#1 Pick · Best Overall</p>
              <p className="hero-pick-name">PawPrint Protocol</p>
              <div className="hero-pick-media">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F274eb223542840a882b8acfbca08781d?format=webp&width=600"
                  alt="PawPrint Protocol"
                  loading="lazy"
                />
              </div>
              <p className="hero-pick-best">
                Our highest-scoring option on formulation strategy and daily
                usability. A weight-based liquid dropper built around NMN and
                NAD+ with CoQ10 and resveratrol — a cellular-support stack
                rather than the phosphatidylserine and SAMe formulas that
                dominate the category — backed by a 90-day money-back guarantee.
              </p>
              <div
                className="hero-pick-score"
                aria-label="Editor score 9.4 out of 10"
              >
                <strong>9.4</strong>
                <span>Editor Score</span>
              </div>
              <div className="hero-pick-rating">
                <span className="stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="sr-only">
                  Highest editorial rating in this comparison.
                </span>
              </div>
              <PawprintCta location="hero" className="btn-card">
                See Today's Offer →
              </PawprintCta>
              {/* VERIFY CURRENT PAWPRINT PRICE BEFORE PUBLISHING */}
              <div className="hero-pick-note">
                From $69 · Reg. $89 · 90-Day Money-Back
              </div>
            </aside>
          </div>
        </section>

        {/* ── QUICK RANKINGS ── */}
        <section className="section" id="rankings">
          <h2 className="section-title">Quick Rankings</h2>
          <div className="rankings-shell card">
            <div className="table-scroll" aria-label="Scrollable comparison table">
              <table className="rankings-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Product</th>
                    <th>Score</th>
                    <th className="hide-mobile">Approach</th>
                    <th className="hide-mobile">Format</th>
                    <th className="hide-mobile">Notable Ingredients</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {RANKINGS.map((row) => (
                    <tr
                      key={row.rank}
                      className={row.winner ? "winner" : undefined}
                    >
                      <td className="rank-num">{row.rank}</td>
                      <td>
                        <a className="product-link" href={`#${row.id}`}>
                          {row.name}
                        </a>
                      </td>
                      <td>
                        <div className="score-wrap">
                          <span className="score">{row.score}</span>
                        </div>
                      </td>
                      <td className="hide-mobile">{row.approach}</td>
                      <td className="hide-mobile">{row.format}</td>
                      <td className="hide-mobile">{row.ingredients}</td>
                      <td>
                        <a
                          className={`verdict-badge${row.cautionBadge ? " caution" : ""}`}
                          href={row.verdictHref}
                        >
                          {row.verdict}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-swipe-hint">
              Swipe horizontally to compare all columns.
            </div>
            <div className="table-note">
              Ingredient details reflect publicly available manufacturer
              labeling at the time of writing; formulations, pack sizes and
              regional versions change, so confirm the current label before
              buying. <strong>Editorial scores</strong> reflect our evaluation of
              formulation, transparency, usability, value and buyer protection.
              They do not represent clinical effectiveness.
            </div>
          </div>
        </section>

        {/* ── FULL COMPARISON ── */}
        <section className="section" id="comparison">
          <h2 className="section-title">Full Comparison</h2>
          <span className="nav-anchor" id="top-pick" aria-hidden="true" />
          <div className="comparison-stack">
            {/* #1 PAWPRINT PROTOCOL */}
            <article
              className="product-card winner editorial-card"
              id="pawprint"
            >
              <div className="editorial-card-inner">
                <div className="editorial-card-grid">
                  <div className="product-identity">
                    <div className="identity-copy">
                      <span className="rank-text">#1 Best Overall</span>
                      <h3>PawPrint Protocol</h3>
                    </div>
                  </div>

                  <div className="decision-copy">
                    <p className="best-for">
                      <strong>Best for:</strong> Owners looking for a different
                      cellular-support ingredient strategy and a liquid
                      alternative to traditional capsules or chews.
                    </p>
                    <ul className="decision-points">
                      <li className="positive">
                        <span>
                          <strong>
                            A cellular-support stack rather than a traditional
                            cognitive blend.
                          </strong>{" "}
                          PawPrint is built around NMN and NAD+. That is a
                          different starting assumption from the
                          phosphatidylserine and SAMe formulas that make up most
                          of this category — which is worth knowing whether or
                          not it is what you want.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            CoQ10 and resveratrol carry over from the
                            antioxidant side of the category.
                          </strong>{" "}
                          Both also appear in traditional canine cognitive
                          formulas, so the stack is not wholly unfamiliar — it
                          is the NAD+/NMN emphasis that sets it apart.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            A liquid dropper instead of a capsule, tablet, chew
                            or powder.
                          </strong>{" "}
                          Nothing to hide in cheese, nothing to break up, and no
                          powder texture altering a bowl of food that a fussy
                          senior dog is already picking at.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            Administration scales with the dog's weight.
                          </strong>{" "}
                          Dosing by size rather than by fixed unit matters when
                          the same bottle has to serve a 12 lb terrier and an 80
                          lb retriever.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>90-day money-back guarantee.</strong> The
                          longest evaluation window of anything in this
                          comparison — which counts in a category where
                          owner-observed change over weeks is the only feedback
                          most people ever get.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            Currently offered around $69 against a $89 regular
                            price, with subscription savings advertised.
                          </strong>{" "}
                          Confirm the live price and terms on the official offer
                          page before ordering.
                        </span>
                      </li>
                      <li className="caution">
                        <span>
                          <strong>
                            It costs more than several traditional options, and
                            the evidence base is younger.
                          </strong>{" "}
                          NAD+/NMN-centered canine cognitive research is far
                          less established than the phosphatidylserine and SAMe
                          literature. A newer ingredient strategy is a point of
                          difference, not proof of a better result.
                        </span>
                      </li>
                    </ul>
                    <p className="verdict-line">
                      <strong>Bottom line:</strong> PawPrint finished first on
                      our criteria because it combines the most clearly
                      differentiated formulation in the group with the format
                      least likely to be defeated by a reluctant senior dog,
                      plus the longest return window if it turns out not to
                      suit. That is a verdict about formulation strategy,
                      usability and buyer protection — not a claim that it
                      outperforms the alternatives clinically.
                    </p>
                  </div>

                  <aside className="score-panel">
                    <div className="score-number">9.4</div>
                    <div className="score-label">Editor Score</div>
                    <div className="score-rating">
                      <span aria-hidden="true" className="stars">
                        ★★★★★
                      </span>
                      <span className="sr-only">
                        Highest editorial rating in this comparison
                      </span>
                    </div>
                    <PawprintCta
                      location="top_pick"
                      className="editorial-cta primary"
                    >
                      See Today's Offer →
                    </PawprintCta>
                    <div className="cta-discount">From $69 · Reg. $89</div>
                    <div className="offer-note">
                      90-day money-back · Liquid dropper
                    </div>
                  </aside>
                </div>
              </div>
            </article>

            {/* #2 SENILIFE */}
            <article
              className="product-card secondary editorial-card"
              id="senilife"
            >
              <div className="editorial-card-inner">
                <div className="editorial-card-grid">
                  <div className="product-identity">
                    <div className="identity-copy">
                      <span className="rank-text">
                        #2 Best-Known PS Formula
                      </span>
                      <h3>Senilife</h3>
                    </div>
                  </div>

                  <div className="decision-copy">
                    <p className="best-for">
                      <strong>Best for:</strong> Owners who want the
                      long-established phosphatidylserine formula from a
                      mainstream veterinary brand, in a softgel that can be
                      squeezed onto food.
                    </p>
                    <ul className="decision-points">
                      <li className="positive">
                        <span>
                          <strong>
                            A short, fully disclosed ingredient list.
                          </strong>{" "}
                          Each regular capsule, intended for dogs under 50 lb,
                          lists phosphatidylserine 25 mg, ginkgo biloba extract
                          10 mg, vitamin B6 20.5 mg, vitamin E 33.5 mg and
                          resveratrol from grape extract 5 mg. You can see
                          exactly what you are paying for.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            A size-matched XL version for larger dogs.
                          </strong>{" "}
                          The XL capsule scales the same actives up rather than
                          asking owners of big dogs to double up on a small one.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>Two ways to give it.</strong> The softgel goes
                          in whole, or the top can be cut off and the contents
                          squeezed onto food — a real advantage over a hard
                          tablet, and made by Ceva, so it is widely stocked
                          through veterinary and pet pharmacies.
                        </span>
                      </li>
                      <li className="caution">
                        <span>
                          <strong>The base is oil-heavy.</strong> Capsule
                          contents sit on cod liver oil and seed oils, so a dog
                          that objects to a fishy smell in the bowl may still
                          find a way around it.
                        </span>
                      </li>
                      <li className="caution">
                        <span>
                          <strong>
                            Contraindicated in pets receiving anticoagulant
                            medication.
                          </strong>{" "}
                          That is on the manufacturer's own labeling, and it is
                          a conversation to have with your veterinarian before
                          starting rather than after.
                        </span>
                      </li>
                    </ul>
                    <div className="vs-winner">
                      <strong>vs #1:</strong> Senilife is the traditional
                      phosphatidylserine-and-antioxidant approach with the
                      clearest, shortest label in this comparison; PawPrint is a
                      cellular-energy stack in a liquid dropper. If your dog
                      takes capsules without argument and you want the
                      longest-established ingredient category, Senilife is a
                      sensible first choice. Neither product's ingredient list
                      proves a better outcome than the other's.
                    </div>
                  </div>

                  <aside className="score-panel">
                    <div className="score-number">8.8</div>
                    <div className="score-label">Editor Score</div>
                    <div className="score-rating">
                      <span aria-hidden="true" className="stars">
                        ★★★★☆
                      </span>
                      <span className="sr-only">
                        Four out of five editorial rating
                      </span>
                    </div>
                    {/* Retailer / affiliate destination for Senilife would go here. */}
                    <a className="editorial-cta secondary" href="#review">
                      Compare With #1 →
                    </a>
                    <div className="offer-note">
                      Softgel capsule · Two capsule sizes
                    </div>
                  </aside>
                </div>
              </div>
            </article>

            {/* #3 AKTIVAIT */}
            <article
              className="product-card secondary editorial-card"
              id="aktivait"
            >
              <div className="editorial-card-inner">
                <div className="editorial-card-grid">
                  <div className="product-identity">
                    <div className="identity-copy">
                      <span className="rank-text">
                        #3 Broadest Nutrient Stack
                      </span>
                      <h3>Aktivait</h3>
                    </div>
                  </div>

                  <div className="decision-copy">
                    <p className="best-for">
                      <strong>Best for:</strong> Owners who want the widest
                      single-dose combination of antioxidants, omega-3s and
                      mitochondrial cofactors rather than a short, focused
                      ingredient list.
                    </p>
                    <ul className="decision-points">
                      <li className="positive">
                        <span>
                          <strong>
                            The broadest nutrient list in this comparison.
                          </strong>{" "}
                          The capsule formulation combines phosphatidylserine
                          with DHA and EPA, L-carnitine and acetyl-L-carnitine,
                          coenzyme Q10, alpha-lipoic acid, N-acetylcysteine,
                          vitamins C and E, and selenium.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            Mitochondrial cofactors alongside the antioxidants.
                          </strong>{" "}
                          L-carnitine, acetyl-L-carnitine and CoQ10 put Aktivait
                          closest to a cellular-energy angle among the
                          traditional formulas — the nearest conventional
                          comparison to what PawPrint is doing.
                        </span>
                      </li>
                      <li className="positive">
                        <span>
                          <strong>
                            Separate small-breed and medium/large-breed
                            strengths, dosed by body weight,
                          </strong>{" "}
                          typically supplied in packs of 60 by VetPlus, so the
                          dose is matched to the dog rather than improvised.
                        </span>
                      </li>
                      <li className="caution">
                        <span>
                          <strong>
                            Labeling varies by market and by version.
                          </strong>{" "}
                          Some current packs are tablets built around DHA,
                          lecithin, Curcuma longa, vitamins B6 and B12, folic
                          acid, vitamin E, vitamin D3 and selenomethionine
                          rather than the older capsule blend. Read the pack you
                          are actually being sold.
                        </span>
                      </li>
                      <li className="caution">
                        <span>
                          <strong>
                            Larger dogs need multiple units a day,
                          </strong>{" "}
                          which multiplies whatever administration problem you
                          already have if your dog dislikes capsules or tablets.
                        </span>
                      </li>
                    </ul>
                    <div className="vs-winner">
                      <strong>vs #1:</strong> Aktivait spreads across many
                      traditional cognitive-support nutrients; PawPrint
                      concentrates on a narrower NAD+/NMN-centered stack in
                      liquid form. Aktivait also asks a large dog to take
                      several capsules or tablets a day where PawPrint asks for
                      one weight-based dropper dose. Breadth of ingredient list
                      is not, on its own, evidence of a better result.
                    </div>
                  </div>

                  <aside className="score-panel">
                    <div className="score-number">8.5</div>
                    <div className="score-label">Editor Score</div>
                    <div className="score-rating">
                      <span aria-hidden="true" className="stars">
                        ★★★★☆
                      </span>
                      <span className="sr-only">
                        Four out of five editorial rating
                      </span>
                    </div>
                    {/* Retailer / affiliate destination for Aktivait would go here. */}
                    <a className="editorial-cta secondary" href="#review">
                      Compare With #1 →
                    </a>
                    <div className="offer-note">
                      Capsule or tablet · Two breed sizes
                    </div>
                  </aside>
                </div>
              </div>
            </article>

            {/* #4 / #5 */}
            <div className="also-considered-block" id="others">
              <div className="also-considered-head">
                <h3>Other Options Worth Considering</h3>
              </div>
              <div className="also-considered-list">
                <div className="also-considered-row">
                  <div className="also-rank">#4 Vet-Neurologist Formulated</div>
                  <div className="also-copy">
                    <p>
                      <strong>CogniCaps</strong> — Formulated by veterinary
                      neurologist Dr. Curtis Dewey with Dr. Fossum's Pet Care
                      around SAMe, curcumin, zinc, salvia, polygala,
                      phosphatidylserine, coenzyme Q10, vitamin E and a
                      proprietary botanical blend. Capsules are given twice
                      daily, with the count scaling by body weight. A published
                      open-label trial in ten dogs over nine years old reported
                      cognitive-questionnaire scores improving 38% at 30 days
                      and 41% at 60 days — the authors themselves flag the small
                      sample, the absence of a control group and the reliance on
                      owner-reported scoring, so it is supporting context rather
                      than proof. Backed by a 30-day money-back guarantee.
                    </p>
                  </div>
                </div>
                <div className="also-considered-row">
                  <div className="also-rank">#5 Availability Varies</div>
                  <div className="also-copy">
                    <p>
                      <strong>Novifit</strong> — Virbac's SAMe tosylate tablet,
                      sized small, medium and large by body weight, and the only
                      single-active product in this comparison. A
                      placebo-controlled European trial of 36 dogs over eight
                      years of age reported owner-rated improvements in activity
                      and awareness after two months of daily tablets. It is the
                      most focused choice here if SAMe on its own is
                      specifically what you or your vet want, but regional
                      availability has been inconsistent — confirm it is
                      currently stocked where you live before planning a long
                      course around it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY #1 WON ── */}
        <section className="section long-review" id="review">
          <div className="section-kicker">Why #1 Won</div>
          <h2>The Formulas Split Into Camps Long Before You Reach the Price</h2>

          <h3>The formula difference shows up immediately.</h3>
          <p>
            Line the five labels up and they stop looking like competitors.
            Senilife is a short phosphatidylserine-and-antioxidant list, every
            active quantified. Aktivait is a wide sweep of antioxidants,
            omega-3s and mitochondrial cofactors. CogniCaps and Novifit both
            build on SAMe — one inside a botanical blend, one on its own.
            PawPrint starts somewhere else entirely, with NMN and NAD+ as the
            center of gravity and CoQ10 and resveratrol around them. An owner
            comparing front panels sees five products for the same problem. An
            owner comparing ingredient panels sees four distinct theories about
            what an aging brain needs.
          </p>

          <h3>The daily administration problem.</h3>
          <p>
            This is the part product pages tend to skip. A cognitive supplement
            does nothing at all unless the dog takes it, every day, for weeks.
            Senior dogs are often the hardest population to dose: appetite gets
            less reliable, many have already learned to eat around a pill, and
            dental or swallowing problems are common at that age. Capsules get
            hidden in cheese until the dog starts leaving the cheese. Chews get
            chewed around. Powders change the smell of a bowl that was already
            being picked at. A liquid dropper does not solve every case, but it
            removes the specific failure mode where a solid unit is found and
            rejected. That is an argument about daily compliance — not about
            absorption, and not about the supplement working better once it is
            inside the dog.
          </p>

          <h3>Where the traditional options are strong.</h3>
          <p>
            This matters, and leaving it out would be dishonest. Both
            phosphatidylserine and SAMe have more dog-specific cognitive
            literature behind them than NAD+ and NMN currently do. Senilife's
            label is arguably the clearest in the group — five actives, each
            named and quantified. Aktivait carries the widest nutrient coverage
            per dose. CogniCaps is the only product here formulated by a
            veterinary neurologist and the only one with a published trial of
            the finished product, small and uncontrolled though that trial was.
            Novifit is the cleanest way to give SAMe by itself, which is exactly
            what some owners and some vets want. If your priority is the
            longest-standing ingredient evidence in this category, our top pick
            is not automatically the right answer for you.
          </p>

          <h3>Why PawPrint finished first under our criteria.</h3>
          <p>
            Our scoring rewards formulation strategy and differentiation, label
            transparency, realistic daily usability, value, buyer protection and
            senior-dog relevance. PawPrint scored highest on the combination: it
            is the most clearly differentiated formula in the group, its dropper
            is the format least likely to be defeated by a fussy senior dog, its
            administration scales with body weight, and its 90-day guarantee is
            the longest window here in which to decide whether anything has
            changed. It did not finish first because we demonstrated better
            health outcomes. Nobody in this comparison has demonstrated that
            against the others, and any page telling you otherwise is
            overselling what is known.
          </p>
        </section>

        {/* ── REPEATED #1 RECOMMENDATION ── */}
        <div className="cta-block" id="deal">
          <div className="cta-label">★ #1 Best Overall</div>
          <div className="cta-product">PawPrint Protocol</div>
          <div className="cta-offer">
            Cellular-Support Approach · Liquid Format · 90-Day Guarantee
          </div>
          <div className="cta-specs">
            NMN · NAD+ · CoQ10 · Resveratrol · Weight-Based Liquid Dropper ·
            90-Day Money-Back Guarantee
          </div>
          <PawprintCta location="repeated_pick" className="btn-primary">
            See Today's PawPrint Offer →
          </PawprintCta>
          {/* VERIFY CURRENT PAWPRINT PRICE BEFORE PUBLISHING */}
          <div className="cta-trust">
            From $69 · Reg. $89 · 90-Day Money-Back
          </div>
        </div>

        {/* ── RED FLAGS + METHODOLOGY ── */}
        <section className="section split-compact" id="warnings">
          <div className="compact-card compact-section">
            <div className="section-kicker">Buying Red Flags</div>
            <h2>What Disqualifies a Cognitive Supplement</h2>

            <div className="warning-compact">
              <strong>No clear ingredient disclosure.</strong>
              <span>
                If a label lists a "proprietary blend" without naming the
                actives or their amounts, you cannot compare it to anything —
                and you cannot tell your veterinarian what your dog is actually
                taking.
              </span>
            </div>
            <div className="warning-compact">
              <strong>Medical promises from a dietary supplement.</strong>
              <span>
                Language about treating, curing, preventing or reversing
                dementia is a claim a supplement is not in a position to make.
                Support-and-maintenance wording is the honest version of the
                same sentence.
              </span>
            </div>
            <div className="warning-compact">
              <strong>A format your dog consistently refuses.</strong>
              <span>
                The best formula on paper scores zero if it goes in the bin
                every evening. Buy for the dog you actually have, not for the
                one who swallows tablets.
              </span>
            </div>
            <div className="warning-compact">
              <strong>No manufacturer transparency.</strong>
              <span>
                No named company, no manufacturing information and no way to
                reach anyone about the batch in your hand is reason enough to
                move on.
              </span>
            </div>
            <div className="warning-compact">
              <strong>No clear return policy.</strong>
              <span>
                Cognitive change is slow and subjective. A window too short to
                observe anything meaningful is not much of a guarantee.
              </span>
            </div>
            <div className="warning-compact">
              <strong>Unsupported "clinically proven" language.</strong>
              <span>
                Ask what was tested, in how many dogs, for how long, and whether
                there was a control group. Small open-label studies are useful
                context; they are not proof.
              </span>
            </div>
            <div className="section-note">
              None of these are accusations aimed at a particular brand — they
              are the questions we asked of every product on this page.
            </div>
          </div>

          <div className="compact-card compact-section">
            <div className="section-kicker">How We Compared</div>
            <h2>The Factors That Decided the Ranking</h2>

            <div className="method-compact">
              <strong>
                Formula strategy and differentiation.
              </strong>
              <span>
                What the formula is actually built around, and whether it offers
                something meaningfully different from the rest of the shelf.
              </span>
            </div>
            <div className="method-compact">
              <strong>
                Formula transparency.
              </strong>
              <span>
                Whether actives are named and quantified, and how easy it is to
                find current labeling for the exact pack being sold.
              </span>
            </div>
            <div className="method-compact">
              <strong>
                Daily usability.
              </strong>
              <span>
                Format, dosing frequency, whether administration scales with
                body weight, and how likely the routine is to survive a
                reluctant senior dog.
              </span>
            </div>
            <div className="method-compact">
              <strong>
                Price and overall value.
              </strong>
              <span>
                Cost per day at the dose a real dog would need, rather than the
                headline price on the pack.
              </span>
            </div>
            <div className="method-compact">
              <strong>
                Guarantee and buyer protection.
              </strong>
              <span>
                Length and clarity of the return window relative to how long it
                takes to observe anything at all.
              </span>
            </div>
            <div className="method-compact">
              <strong>
                Senior-dog relevance.
              </strong>
              <span>
                Whether the product is formulated and dosed specifically for
                aging dogs rather than adapted from a general or human product.
              </span>
            </div>
            <div className="section-note">
              We reviewed published product information, ingredient labels,
              administration format, pricing, return policies, and relevant
              research context. We did not conduct a clinical trial or measure
              treatment outcomes. Editorial independence: rankings reflect this
              evaluation, not commercial relationships. Full disclosure in the
              footer.
            </div>
          </div>
        </section>

        {/* ── BUYER EDUCATION + VETERINARY SAFETY ── */}
        <section className="section split-compact" id="guide">
          <div className="compact-card compact-section">
            <div className="section-kicker">Buyer Education</div>
            <h2>What the Different Approaches Actually Are</h2>

            <div className="guide-list">
              <div className="guide-compact">
                <strong>Phosphatidylserine-based support</strong>
                <span>
                  A phospholipid found in cell membranes and the most common
                  single anchor ingredient in this category, usually paired with
                  antioxidants such as vitamin E, ginkgo or resveratrol.
                </span>
              </div>
              <div className="guide-compact">
                <strong>SAMe-based products</strong>
                <span>
                  S-adenosylmethionine is involved in methylation and in
                  maintaining glutathione. It is sold on its own and inside
                  broader blends, and it has a longer track record in senior-pet
                  cognitive products than most newer ingredients.
                </span>
              </div>
              <div className="guide-compact">
                <strong>Omega-3 and antioxidant combinations</strong>
                <span>
                  DHA and EPA alongside vitamins C and E, alpha-lipoic acid,
                  N-acetylcysteine or selenium. These formulas tend to be the
                  broadest, aimed at oxidative stress generally rather than one
                  pathway.
                </span>
              </div>
              <div className="guide-compact">
                <strong>MCT-enriched nutritional approaches</strong>
                <span>
                  Medium-chain triglycerides usually arrive through a complete
                  senior diet rather than a capsule or dropper. Because that is
                  a food change rather than an add-on, it is a different
                  decision with different practical trade-offs — which is why it
                  is not ranked among the products above.
                </span>
              </div>
              <div className="guide-compact">
                <strong>Cellular-energy / NAD+ and NMN-centered formulas</strong>
                <span>
                  The newest group, including our top pick. The focus is
                  cellular energy metabolism rather than membrane phospholipids
                  or methylation. It is also the least established of these
                  approaches in dog-specific cognitive research.
                </span>
              </div>
              <div className="guide-compact">
                <strong>Melatonin for sleep-wake timing</strong>
                <span>
                  Frequently discussed alongside cognitive supplements because
                  night-time restlessness is often what finally sends an owner
                  searching. Melatonin is used for sleep-wake timing — it is not
                  a memory or cognition supplement and should not be bought as
                  one. Discuss dosing with your veterinarian first.
                </span>
              </div>
            </div>
            <div className="section-note">
              These approaches are not interchangeable and they do not all carry
              the same weight of evidence. Choosing between them is a
              conversation worth having with the veterinarian who knows your
              dog.
            </div>
          </div>

          <div className="compact-card compact-section" id="vet">
            <div className="section-kicker">Veterinary Safety</div>
            <h2>When to Talk to Your Veterinarian</h2>

            <p className="compact-lead">
              New confusion, pacing, night waking or house-soiling in an older
              dog is not automatically cognitive decline. Pain, vision or
              hearing loss, endocrine disease, kidney disease, urinary tract
              infection and medication side effects can all produce similar
              behavior — and several of those are treatable. A supplement bought
              before that has been ruled out can delay a diagnosis that matters.
            </p>

            <ul className="decision-points">
              <li className="neutral">
                <span>
                  Your dog takes any prescription medication, including{" "}
                  <strong>selegiline</strong>, which is prescribed specifically
                  for canine cognitive dysfunction.
                </span>
              </li>
              <li className="neutral">
                <span>
                  Your dog has a chronic condition such as kidney, liver, heart
                  or endocrine disease.
                </span>
              </li>
              <li className="neutral">
                <span>
                  Your dog is on anticoagulant medication — at least one product
                  in this category is contraindicated alongside it.
                </span>
              </li>
              <li className="neutral">
                <span>
                  You are combining more than one supplement, where overlapping
                  ingredients can stack up without anyone noticing.
                </span>
              </li>
              <li className="neutral">
                <span>
                  Symptoms appeared suddenly or are worsening quickly, which
                  points away from gradual age-related change.
                </span>
              </li>
            </ul>
            <div className="section-note">
              This page is consumer product research, not veterinary advice, and
              nothing on it is specific to your dog. Supplements do not replace
              veterinary evaluation.
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section compact-section" id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQS.map((faq) => (
              <details className="faq-compact" key={faq.q}>
                <summary>{faq.q}</summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── FINAL RECOMMENDATION ── */}
        <section className="cta-final">
          <div className="final-lead">Final Recommendation</div>
          <div className="final-summary">
            After comparing the formulas, administration formats, label
            transparency, pricing and guarantees of the products in this guide,{" "}
            <strong>
              PawPrint Protocol finished first under our editorial criteria.
            </strong>{" "}
            It offers the most clearly differentiated ingredient strategy in the
            group, the format least likely to be defeated by a senior dog that
            has started refusing capsules and chews, dosing that scales with
            body weight, and the longest money-back window here in which to
            decide whether it is worth continuing. That is a verdict about
            formulation, usability and buyer protection — not a claim of proven
            superior results. Talk to your veterinarian before starting anything
            new, particularly if your dog already takes medication.
          </div>
          <PawprintCta location="final_recommendation" className="btn-primary">
            Check PawPrint Availability →
          </PawprintCta>
          <div className="trust-badges">
            <span>From $69</span>
            <span>90-Day Money-Back</span>
            <span>Liquid Dropper</span>
          </div>
        </section>

        {/* ── EDITORIAL STANDARDS ── */}
        <section className="author-block">
          <div className="author-bio">
            Our comparison guides evaluate product formulation, publicly
            available ingredient information, administration format, pricing,
            guarantees and research context to help consumers understand
            meaningful differences before purchasing. We do not conduct clinical
            trials, we do not test products on animals, and we do not provide
            veterinary advice. Where a product's labeling varies by market or
            has been reformulated, we say so rather than presenting one version
            as definitive.
          </div>
        </section>
      </main>

      {/* ── STICKY CTA ── */}
      <div className="sticky-cta">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-media">
            <img
              className="sticky-cta-thumb"
              src="https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F274eb223542840a882b8acfbca08781d?format=webp&width=200"
              alt="PawPrint Protocol"
              loading="lazy"
            />
            <div className="sticky-cta-text">
              <div className="sticky-cta-kicker">★ #1 Best Overall</div>
              <div className="sticky-cta-title-row">
                <strong>PawPrint Protocol</strong>
              </div>
              <span>From $69 · 90-Day Guarantee</span>
            </div>
          </div>
          <PawprintCta location="sticky_cta" className="btn-sm">
            See Offer →
          </PawprintCta>
        </div>
      </div>
    </>
  );
}