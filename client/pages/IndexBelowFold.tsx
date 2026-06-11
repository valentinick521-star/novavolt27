import { OFFER_URL } from "@/components/SiteLayout";
import {
  Bullet,
  FAQS,
  MARK_ELLISON_IMAGE_URL,
  NOVAVOLT_IMAGE_SRCSET,
  NOVAVOLT_IMAGE_URL,
  PRODUCT2_URL,
  PRODUCT3_URL,
  RANKINGS,
  ScorePanel,
  SectionTitle,
  Stars,
} from "./index-shared";

const manualItems = [
  "Require reapplying, relighting, or remembering before you go outside",
  "Often depend on refills, fuel, smoke, cords, or the right outlet",
  "Create dead nights whenever you forget or do not feel like managing them",
  "Work only while you are actively participating in the defense",
];

const automaticItems = [
  "Charges during the day and activates when mosquitoes get active",
  "Runs as an outdoor layer without turning into another evening task",
  "Avoids sprays, cartridges, smoke, and repeated setup",
  "Keeps showing up even when your attention is somewhere else",
];

const categoryRows = [
  {
    option: "Sprays",
    dailyEffort: "High",
    refills: "Yes",
    automatic: "No",
    practicality: "Best as a temporary layer",
    verdict: "Easy to skip; timing matters too much",
  },
  {
    option: "Candles / torches",
    dailyEffort: "High",
    refills: "Yes",
    automatic: "No",
    practicality: "Only works during active burn time",
    verdict: "More manual than most buyers expect",
  },
  {
    option: "Plug-in zappers",
    dailyEffort: "Medium",
    refills: "Needs outlet/cord",
    automatic: "Partly",
    practicality: "Limited by placement",
    verdict: "Can work, but only if the setup works",
  },
  {
    option: "Cheap solar zappers",
    dailyEffort: "Medium",
    refills: "No refills, but weaker hardware",
    automatic: "Sometimes",
    practicality: "Runtime is often the weak point",
    verdict: "Good idea, unreliable execution",
  },
  {
    option: "NovaVolt Solar",
    dailyEffort: "Low",
    refills: "No",
    automatic: "Yes",
    practicality: "Designed for outdoor nightly use",
    verdict: "Best set-and-forget profile overall",
    winner: true,
  },
];

const checklist = [
  "Can it run without daily setup?",
  "Does it avoid sprays, refills, smoke, or open flame?",
  "Can it stay outside in real backyard conditions?",
  "Does it have enough draw and coverage for a real yard or patio?",
  "Does it still make sense after price, warranty, and maintenance are considered?",
];

const whyNovaVoltWon = [
  {
    title: "It removed the nightly setup problem",
    body:
      "NovaVolt charges during the day and runs at night, so the protection layer does not depend on you remembering to spray, light, refill, or plug in something every evening.",
  },
  {
    title: "It made more sense for real backyards",
    body:
      "Outdoor mosquito control has to survive weather, placement issues, and repeated use. A product designed to stay outside and keep working matters more than many buyers realize.",
  },
  {
    title: "It had the strongest overall value",
    body:
      "When coverage, convenience, lack of refill costs, bundle pricing, and the 90-day guarantee were considered together, NovaVolt became the most complete pick.",
  },
  {
    title: "It gave the cleanest next step",
    body:
      "The official offer page is where the current pricing, availability, and bundle discounts are shown. That made it the most straightforward recommendation to verify and purchase.",
  },
];

const redFlags = [
  "Big coverage claims paired with unclear runtime or weak nightly endurance",
  "Solar panels that only perform well in ideal sunshine but not in normal use",
  "Cheap units that have to be moved, dried, or brought inside constantly",
  "Products that only help while you are actively managing them",
  "Very low upfront pricing that gets offset by refill, cartridge, or replacement costs",
];

function SectionShell({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`anchor-offset border-b border-line-light ${className}`}>
      <div className="mx-auto max-w-site px-5 py-12 sm:px-7 sm:py-14">{children}</div>
    </section>
  );
}

function TableCell({ children, winner = false }: { children: React.ReactNode; winner?: boolean }) {
  return (
    <td className={`px-4 py-4 align-top text-[15px] leading-[1.55] ${winner ? "text-navy" : "text-ink"}`}>
      {children}
    </td>
  );
}

export default function IndexBelowFold() {
  return (
    <>
      <SectionShell id="problem" className="bg-pagebg-soft/45">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <SectionTitle
              kicker="The Problem"
              deck="The hardest part of mosquito control is not finding a product. It is finding one that still works after human inconsistency enters the picture."
            >
              The Problem Isn’t Just Mosquitoes. It’s Having to Fight Them Manually Every Night.
            </SectionTitle>
            <div className="mt-6 space-y-4 text-[17px] leading-[1.78] text-ink">
              <p>
                Many mosquito products can help in short bursts. The problem is
                that most of them work only when the user remembers the routine:
                spray before sitting down, relight a candle, refill a torch,
                reposition a device, or make sure the outlet setup still makes
                sense.
              </p>
              <p>
                That is why seemingly “good” products still underperform in real
                life. The weak point is not always the product. Often it is the
                amount of effort the product demands to keep doing its job.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-bad/20 bg-white p-5 shadow-site">
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-bad">
                Manual defenses
              </div>
              <h3 className="mt-2 font-serif text-[28px] font-extrabold leading-tight text-navy">
                They stop when you stop.
              </h3>
              <ul className="mt-4 space-y-3">
                {manualItems.map((item) => (
                  <Bullet key={item} type="bad">
                    {item}
                  </Bullet>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-good/25 bg-[#f7fbf8] p-5 shadow-site-md ring-1 ring-good/10">
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-good">
                Automatic defense
              </div>
              <h3 className="mt-2 font-serif text-[28px] font-extrabold leading-tight text-navy">
                It keeps working while you relax.
              </h3>
              <ul className="mt-4 space-y-3">
                {automaticItems.map((item) => (
                  <Bullet key={item} type="good">
                    {item}
                  </Bullet>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="effort-gap" className="bg-white">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_360px] lg:items-start lg:gap-10">
          <div>
            <SectionTitle
              kicker="The Mechanism"
              deck="Mosquito pressure is consistent. Human attention is not. That mismatch is where most mosquito purchases break down."
            >
              The Effort Gap: Why Mosquitoes Usually Win
            </SectionTitle>
            <div className="mt-6 space-y-4 text-[17px] leading-[1.78] text-ink">
              <p>
                Any defense that depends on you remembering, refilling,
                reapplying, relighting, or moving something around will
                eventually create a gap. That gap is when mosquitoes come back.
              </p>
              <p>
                The smarter buying question is not “Which product has the most
                exciting claim?” It is “Which option keeps showing up night after
                night with the least effort from me?”
              </p>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {[
                ["1", "Daytime", "Device charges / user does nothing"],
                ["2", "Dusk", "Mosquito activity begins"],
                ["3", "Night", "Automatic defense keeps running"],
              ].map(([num, title, body]) => (
                <div key={num} className="rounded-md border border-line bg-pagebg-soft/55 p-5 shadow-site">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[14px] font-extrabold text-white">
                    {num}
                  </div>
                  <div className="mt-4 font-serif text-[24px] font-extrabold text-navy">{title}</div>
                  <p className="mt-2 text-[16px] leading-[1.65] text-subtle">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-md border border-line bg-navy p-6 text-white shadow-site-md">
            <div className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#bfd1ee]">
              The real contrast
            </div>
            <div className="mt-3 font-serif text-[30px] font-extrabold leading-tight">
              Manual defense breaks when the user stops. Automatic defense keeps
              working when the user forgets.
            </div>
            <p className="mt-4 text-[16px] leading-[1.75] text-[#d5deea]">
              That was the lens we used for the rest of the comparison — and it
              made the eventual winner much easier to identify.
            </p>
          </aside>
        </div>
      </SectionShell>

      <SectionShell id="comparison" className="bg-pagebg-soft/45">
        <SectionTitle
          kicker="Comparison"
          deck="Before looking at brand names, we compared the solution categories themselves. That made the strengths and weaknesses much easier to see."
        >
          We Compared the Most Common Backyard Mosquito Options
        </SectionTitle>

        <div className="mt-8 overflow-hidden rounded-md border border-line bg-white shadow-site-md">
          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full border-collapse text-left">
              <thead className="bg-navy text-white">
                <tr>
                  {[
                    "Option",
                    "Requires daily effort?",
                    "Needs refills / cords?",
                    "Works when you are not thinking about it?",
                    "Outdoor practicality",
                    "Verdict",
                  ].map((head) => (
                    <th key={head} className="px-4 py-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#dce6f7]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryRows.map((row, idx) => (
                  <tr key={row.option} className={idx % 2 === 0 ? "bg-white" : "bg-pagebg-soft/35"}>
                    <TableCell winner={!!row.winner}>
                      <span className={`font-bold ${row.winner ? "text-brand" : "text-navy"}`}>{row.option}</span>
                    </TableCell>
                    <TableCell winner={!!row.winner}>{row.dailyEffort}</TableCell>
                    <TableCell winner={!!row.winner}>{row.refills}</TableCell>
                    <TableCell winner={!!row.winner}>{row.automatic}</TableCell>
                    <TableCell winner={!!row.winner}>{row.practicality}</TableCell>
                    <TableCell winner={!!row.winner}>
                      <span className={row.winner ? "font-bold text-good" : "text-ink"}>{row.verdict}</span>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-brand/20 bg-brand-soft p-5 shadow-site">
          <p className="text-[17px] leading-[1.75] text-ink">
            Once the comparison was framed around <strong className="text-navy">set-and-forget nightly consistency</strong>, the most convincing category was clear: a stronger solar outdoor zapper that could charge during the day, switch on at night, and keep working without adding another task to the evening.
          </p>
        </div>
      </SectionShell>

      <SectionShell id="checklist" className="bg-white">
        <SectionTitle
          kicker="Buying Guide"
          deck="These were the five questions that mattered most once we stopped judging products by surface-level marketing alone."
        >
          The 5-Question Test We Used Before Picking a Winner
        </SectionTitle>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {checklist.map((item, index) => (
            <div key={item} className="rounded-md border border-line bg-pagebg-soft/55 p-5 shadow-site">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[15px] font-extrabold text-white">
                {index + 1}
              </div>
              <div className="mt-4 text-[17px] font-bold leading-[1.5] text-navy">{item}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[17px] leading-[1.75] text-subtle">
          Once every option was judged by these five questions, the winner became much easier to see.
        </p>
      </SectionShell>

      <SectionShell id="winner" className="bg-pagebg-soft/45">
        <div className="max-w-3xl">
          <SectionTitle
            kicker="Winner Reveal"
            deck="After comparing the categories first and then applying the checklist, one product stood out as the strongest answer to the effort-gap problem."
          >
            The Winner: NovaVolt Solar
          </SectionTitle>
        </div>

        <div className="mt-8 overflow-hidden rounded-md border border-brand/25 bg-white shadow-site-md">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,340px)]">
            <div className="p-6 sm:p-7 lg:p-8">
              <div className="inline-flex items-center rounded-full bg-[#ebf4ee] px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.08em] text-good">
                Best Automatic Nightly Defense
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
                <a href={OFFER_URL} target="_blank" rel="nofollow sponsored noopener" className="rounded-md border border-line bg-pagebg-soft/40 p-4">
                  <img
                    src={NOVAVOLT_IMAGE_URL}
                    srcSet={NOVAVOLT_IMAGE_SRCSET}
                    sizes="(min-width: 768px) 240px, 80vw"
                    alt="NovaVolt Solar outdoor bug zapper"
                    width={640}
                    height={640}
                    className="mx-auto h-52 w-full object-contain sm:h-56"
                    decoding="async"
                  />
                </a>

                <div>
                  <h3 className="font-serif text-[38px] font-extrabold leading-tight text-navy">
                    NovaVolt Solar
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <Stars filled={5} label="Five star editorial rating" />
                    <span className="text-[15px] font-bold text-subtle">Editor score: 5.0</span>
                  </div>
                  <p className="mt-4 text-[17px] leading-[1.75] text-ink">
                    NovaVolt Solar won because it solved the problem most mosquito
                    products ignore: consistency. It turns backyard mosquito
                    defense into something that can run automatically instead of
                    another chore you have to remember.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Charges during the day and runs at night",
                      "No sprays, refills, or cords",
                      "365nm UV attraction + 4,500V grid",
                      "Rated for up to 1 acre of coverage",
                      "Weatherproof outdoor design",
                      "Strong bundle value and 90-day money-back guarantee",
                    ].map((item) => (
                      <Bullet key={item} type="good">
                        {item}
                      </Bullet>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-line bg-[#fbfcfe] p-6 lg:border-l lg:border-t-0 lg:p-8">
              <ScorePanel
                score="5.0"
                stars={5}
                cta="Check Today’s NovaVolt Offer →"
                ctaHref={OFFER_URL}
                ctaPrimary
                pill="From $59.40 · Express shipping"
                note="90-day money-back guarantee"
              />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="product-table" className="bg-white">
        <SectionTitle
          kicker="Product Table"
          deck="We kept the broader ranking for credibility, but the recommendation path heavily favored the product with the best automatic nightly profile."
        >
          Side-by-Side Product Table
        </SectionTitle>

        <div className="mt-8 overflow-hidden rounded-md border border-line bg-white shadow-site-md">
          <div className="overflow-x-auto">
            <table className="min-w-[1040px] w-full border-collapse text-left">
              <thead className="bg-navy text-white">
                <tr>
                  {[
                    "Rank",
                    "Product",
                    "Nightly consistency",
                    "Effort required",
                    "Coverage",
                    "Weather confidence",
                    "Best for",
                    "Verdict",
                  ].map((head) => (
                    <th key={head} className="px-4 py-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#dce6f7]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RANKINGS.map((item, idx) => (
                  <tr
                    key={item.name}
                    className={item.winner ? "bg-brand-soft/55" : idx % 2 === 0 ? "bg-white" : "bg-pagebg-soft/30"}
                  >
                    <TableCell winner={!!item.winner}>
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-extrabold ${item.winner ? "bg-brand text-white" : "bg-pagebg-soft text-navy"}`}>
                        {item.rank}
                      </span>
                    </TableCell>
                    <TableCell winner={!!item.winner}>
                      <div className="font-bold text-navy">{item.name}</div>
                      <div className="mt-1 text-[13px] font-semibold text-subtle">Score {item.score}</div>
                    </TableCell>
                    <TableCell winner={!!item.winner}>{item.nightlyConsistency}</TableCell>
                    <TableCell winner={!!item.winner}>{item.effortRequired}</TableCell>
                    <TableCell winner={!!item.winner}>{item.coverage}</TableCell>
                    <TableCell winner={!!item.winner}>{item.weather}</TableCell>
                    <TableCell winner={!!item.winner}>{item.bestFor}</TableCell>
                    <TableCell winner={!!item.winner}>
                      <div className={item.winner ? "font-bold text-good" : item.avoid ? "font-semibold text-bad" : "text-ink"}>
                        {item.verdict}
                      </div>
                      {item.productHref && !item.winner && (
                        <a
                          href={item.productHref}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="mt-2 inline-flex rounded-md border border-line px-3 py-2 text-[13px] font-bold text-brand hover:bg-brand-soft"
                        >
                          View comparison option
                        </a>
                      )}
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="why-it-won" className="bg-pagebg-soft/45">
        <SectionTitle
          kicker="Why NovaVolt Won"
          deck="The winner was not just the strongest spec sheet. It was the most complete answer to the buying problem."
        >
          Why NovaVolt Pulled Ahead
        </SectionTitle>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {whyNovaVoltWon.map((item) => (
            <div key={item.title} className="rounded-md border border-line bg-white p-5 shadow-site">
              <h3 className="font-serif text-[28px] font-extrabold leading-tight text-navy">{item.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.75] text-subtle">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-md bg-gradient-to-r from-[#112744] via-[#16345e] to-[#1c4580] p-[1px] shadow-site-md">
          <div className="rounded-md bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.00))] px-6 py-7 text-white sm:px-8">
            <div className="text-[13px] font-extrabold uppercase tracking-[0.11em] text-[#c8d8ef]">
              Editor’s Pick
            </div>
            <h3 className="mt-2 font-serif text-[36px] font-extrabold leading-tight">NovaVolt Solar</h3>
            <p className="mt-3 max-w-2xl text-[17px] leading-[1.75] text-[#dbe5f2]">
              Automatic nightly mosquito defense without sprays, refills, cords, or daily setup.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={OFFER_URL}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="rounded-md bg-gradient-to-b from-cta to-cta-hover px-5 py-3 text-[17px] font-bold text-white shadow-site-blue transition-opacity hover:opacity-90"
              >
                See Today’s NovaVolt Offer →
              </a>
              <div className="text-[15px] font-semibold text-[#c8d8ef]">
                From $59.40 · Express shipping · 90-day money-back
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="red-flags" className="bg-white">
        <SectionTitle
          kicker="Red Flags"
          deck="Any product that creates more work will usually create another gap mosquitoes can exploit."
        >
          Before Buying Any Bug Zapper, Watch for These Red Flags
        </SectionTitle>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {redFlags.map((flag) => (
            <div key={flag} className="rounded-md border border-bad/20 bg-[#fff9f8] p-5 shadow-site">
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-bad">
                Warning sign
              </div>
              <p className="mt-3 text-[16px] leading-[1.65] text-ink">{flag}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="faq" className="bg-pagebg-soft/45">
        <SectionTitle
          kicker="FAQ"
          deck="The most common questions came back to the same theme: convenience only matters if it helps the product stay in use consistently."
        >
          Frequently Asked Questions
        </SectionTitle>

        <div className="mt-8 grid gap-4">
          {FAQS.map((item) => (
            <article key={item.q} className="rounded-md border border-line bg-white p-5 shadow-site">
              <h3 className="font-serif text-[27px] font-extrabold leading-tight text-navy">{item.q}</h3>
              <p className="mt-3 text-[17px] leading-[1.75] text-subtle">{item.a}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="final" className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div>
            <SectionTitle
              kicker="Final Recommendation"
              deck="The right choice depends on the real problem you are trying to solve, not just the lowest upfront price."
            >
              Our Recommendation
            </SectionTitle>
            <div className="mt-6 space-y-4 text-[17px] leading-[1.78] text-ink">
              <p>
                If you only want the cheapest possible bug zapper for a tiny area,
                a budget unit may be enough. But if the goal is to stop managing
                mosquito defense manually every night, NovaVolt Solar is the best
                pick we found.
              </p>
              <p>
                It won because it turns mosquito control from another backyard
                chore into an automatic nightly layer of defense.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "From $59.40",
                "Express shipping",
                "90-day money-back",
                "No subscription",
                "No sprays or refills",
              ].map((item) => (
                <span key={item} className="rounded-full border border-line bg-pagebg-soft px-3 py-1.5 text-[14px] font-bold text-navy">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={OFFER_URL}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-7 inline-flex rounded-md bg-gradient-to-b from-cta to-cta-hover px-6 py-3.5 text-[17px] font-bold text-white shadow-site-blue transition-opacity hover:opacity-90"
            >
              Check NovaVolt Availability →
            </a>
          </div>

          <aside className="rounded-md border border-line bg-pagebg-soft/55 p-5 shadow-site">
            <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-brand">
              Bottom line
            </div>
            <div className="mt-3 font-serif text-[29px] font-extrabold leading-tight text-navy">
              The best bug zapper is the one that keeps showing up every night with the least effort.
            </div>
            <p className="mt-4 text-[16px] leading-[1.7] text-subtle">
              That is why our top recommendation was not simply the cheapest or
              flashiest option. It was the product with the strongest automatic
              nightly defense profile.
            </p>
          </aside>
        </div>

        <div className="mt-10 rounded-md border border-line bg-pagebg-soft/35 p-5 shadow-site sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="block h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-line bg-white">
              <img
                src={MARK_ELLISON_IMAGE_URL}
                alt="Mark Ellison, Senior Reviewer"
                width={144}
                height={144}
                decoding="async"
                className="h-full w-full scale-125 object-cover object-top"
              />
            </span>
            <div>
              <div className="font-serif text-[28px] font-extrabold text-navy">Mark Ellison</div>
              <div className="text-[14px] font-extrabold uppercase tracking-[0.1em] text-faint">
                Senior Reviewer · Outdoor &amp; Home Comfort
              </div>
              <p className="mt-2 text-[16px] leading-[1.7] text-subtle">
                Mark covers practical outdoor and seasonal-use products with a focus on real-world usability, maintenance burden, and long-term value.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
