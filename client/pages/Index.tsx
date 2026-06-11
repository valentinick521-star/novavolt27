import { MARK_ELLISON_IMAGE_URL } from "./index-shared";
import IndexBelowFold from "./IndexBelowFold";

const evidencePoints = [
  "5 common backyard mosquito options compared",
  "Nightly consistency used as the primary buying criterion",
  "Focus on real-world ease of use, runtime, and outdoor practicality",
];

const issueNotes = [
  "Sprays fade and require timing",
  "Candles and torches stop when the flame does",
  "Plug-ins only work where the outlet problem is already solved",
  "Cheap solar units often lose the night before mosquitoes do",
];

export default function Index() {
  return (
    <>
      <section id="top" className="border-b border-line-light bg-white">
        <div className="mx-auto max-w-site px-5 pb-10 pt-6 sm:px-7 sm:pb-12 sm:pt-8 lg:pb-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:gap-10 xl:grid-cols-[minmax(0,1.15fr)_390px]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">
                <span className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5">
                  NCR Field Review
                </span>
                <span className="text-faint">Backyard Pest Control / June 2026</span>
              </div>

              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(40px,5.9vw,72px)] font-extrabold leading-[0.98] tracking-[-0.035em] text-navy">
                Most Bug Zappers Fail for One Simple Reason.
              </h1>

              <p className="mt-5 max-w-3xl text-[18px] leading-[1.75] text-ink sm:text-[19px]">
                Most people compare bug zappers by surface specs — voltage, price,
                or whatever looks strongest in a listing. Our review reached a
                different conclusion: the options that disappoint most often are the
                ones that require too much human effort to keep working night after
                night.
              </p>

              <div className="mt-7 grid gap-4 border-y border-line-light py-4 sm:grid-cols-[auto_1fr] sm:items-center">
                <span className="block h-[52px] w-[52px] overflow-hidden rounded-full border border-line bg-white">
                  <img
                    src={MARK_ELLISON_IMAGE_URL}
                    alt="Mark Ellison, Senior Reviewer"
                    width={104}
                    height={104}
                    decoding="async"
                    className="h-full w-full scale-125 object-cover object-top"
                  />
                </span>
                <div>
                  <div className="text-[18px] font-semibold leading-tight text-ink">
                    By Mark Ellison · Senior Reviewer
                  </div>
                  <div className="mt-1 text-[13px] font-extrabold uppercase tracking-[0.1em] text-faint">
                    Outdoor &amp; Home Comfort · Updated June 2026
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-5">
                <div className="rounded-md border border-line bg-pagebg-soft/55 p-5 shadow-site">
                  <div className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-brand">
                    The thesis of this review
                  </div>
                  <p className="mt-3 font-serif text-[24px] font-bold leading-[1.35] text-navy sm:text-[28px]">
                    Mosquitoes show up automatically. The best defense has to show
                    up automatically too.
                  </p>
                  <p className="mt-3 text-[17px] leading-[1.75] text-subtle">
                    That became the center of our comparison. We looked at which
                    options keep working without asking you to reapply, relight,
                    refill, re-place, or remember one more thing every evening.
                  </p>
                </div>

                <div className="rounded-md border border-line bg-white p-5 shadow-site">
                  <div className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-brand">
                    Why this matters
                  </div>
                  <ul className="mt-3 space-y-3">
                    {issueNotes.map((item) => (
                      <li key={item} className="border-l-2 border-bad/20 pl-3 text-[15px] leading-[1.55] text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="min-w-0 lg:pt-1">
              <div className="overflow-hidden rounded-md border border-line bg-[#fbfcfe] shadow-site-md">
                <div className="border-b border-line-light bg-navy px-5 py-4 text-white sm:px-6">
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#bfd1ee]">
                    Inside this investigation
                  </div>
                  <div className="mt-2 font-serif text-[28px] font-extrabold leading-tight">
                    What we actually compared before picking a winner
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-faint">
                      Review framework
                    </div>
                    <ul className="mt-3 space-y-3">
                      {evidencePoints.map((item, index) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[13px] font-extrabold text-brand">
                            {index + 1}
                          </span>
                          <span className="text-[16px] leading-[1.6] text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border border-brand/20 bg-brand-soft px-4 py-4">
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-brand">
                      Key finding
                    </div>
                    <p className="mt-2 text-[16px] leading-[1.65] text-ink">
                      The biggest separator was not a headline spec. It was whether
                      the product could function like a dependable nightly layer of
                      protection instead of another backyard chore.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    <div className="rounded-md border border-line bg-white p-4">
                      <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-faint">
                        Compared
                      </div>
                      <div className="mt-1 font-serif text-[34px] font-extrabold leading-none text-navy">
                        5
                      </div>
                      <div className="mt-1 text-[14px] leading-relaxed text-subtle">
                        major solution types
                      </div>
                    </div>
                    <div className="rounded-md border border-line bg-white p-4">
                      <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-faint">
                        Main criterion
                      </div>
                      <div className="mt-1 font-serif text-[22px] font-extrabold leading-tight text-navy">
                        Nightly consistency
                      </div>
                    </div>
                    <div className="rounded-md border border-line bg-white p-4">
                      <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-faint">
                        Conclusion
                      </div>
                      <div className="mt-1 text-[15px] font-bold leading-[1.45] text-ink">
                        The best option removed the effort gap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <IndexBelowFold />
    </>
  );
}
