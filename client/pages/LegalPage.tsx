import { useEffect } from "react";

interface Section {
  heading: string;
  body: React.ReactNode;
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: Section[];
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-7 sm:py-16">
      <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-brand">
        National Consumer Review
      </div>
      <h1 className="mt-2 font-serif text-[34px] font-extrabold leading-tight text-navy sm:text-[40px]">
        {title}
      </h1>
      <div className="mt-2 text-[14px] font-semibold uppercase tracking-[0.04em] text-faint">
        Last updated: {updated}
      </div>

      <div className="mt-6 text-[17px] leading-relaxed text-ink">{intro}</div>

      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mb-2 font-serif text-[22px] font-extrabold text-navy">
              {s.heading}
            </h2>
            <div className="space-y-3 text-[17px] leading-relaxed text-ink">
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
