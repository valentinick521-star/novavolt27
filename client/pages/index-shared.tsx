export const PRODUCT2_URL = "https://amzn.to/4u1GioM";
export const PRODUCT3_URL = "https://amzn.to/4tPQBvI";

export const MARK_ELLISON_IMAGE_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fe53fc148d3da4bac9ad2e9d6adbd4ff5?format=webp&width=96&height=96";

export const NOVAVOLT_IMAGE_BASE =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fa0a04f36a36549f99819b3175f0967da?format=webp";
export const NOVAVOLT_IMAGE_URL = `${NOVAVOLT_IMAGE_BASE}&width=640`;
export const NOVAVOLT_IMAGE_SRCSET = `${NOVAVOLT_IMAGE_BASE}&width=320 320w, ${NOVAVOLT_IMAGE_BASE}&width=480 480w, ${NOVAVOLT_IMAGE_BASE}&width=640 640w`;
export const PRODUCT2_IMAGE_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2F18d4b83cb92845978197c2d34bbefce7?format=webp&width=700&height=700";
export const PRODUCT3_IMAGE_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2F99ced7a8ff6a46088e6c11daef90f4cc?format=webp&width=700&height=700";

type Ranking = {
  rank: number;
  name: string;
  score: string;
  coverage: string;
  lure: string;
  weather: string;
  nightlyConsistency: string;
  effortRequired: string;
  bestFor: string;
  verdict: string;
  quickSummary: string;
  productHref?: string;
  imageUrl?: string;
  winner?: boolean;
  avoid?: boolean;
};

export const RANKINGS: Ranking[] = [
  {
    rank: 1,
    name: "NovaVolt Solar",
    score: "5.0",
    coverage: "Full 1 acre",
    lure: "365nm UV + 4,500V grid",
    weather: "Waterproof outdoor design",
    nightlyConsistency: "Best — solar charges by day and runs at night",
    effortRequired: "Lowest — no sprays, refills, cords, or daily setup",
    bestFor: "Set-and-forget nightly defense",
    verdict: "Best Automatic Nightly Defense",
    quickSummary: "Solar powered · Auto-on nightly · No refills",
    imageUrl: NOVAVOLT_IMAGE_URL,
    winner: true,
  },
  {
    rank: 2,
    name: "Nexholt Bug Zapper",
    score: "4.4",
    coverage: "0.55 acres",
    lure: "365–395nm UV + 4,500V grid",
    weather: "Outdoor-rated",
    nightlyConsistency: "Good, but less convincing for larger yards",
    effortRequired: "Moderate — placement and runtime matter more",
    bestFor: "Smaller patios that still need strong UV draw",
    verdict: "Capable runner-up, weaker overall value",
    quickSummary: "Good coverage · Less compelling automatic profile",
    productHref: PRODUCT2_URL,
    imageUrl: PRODUCT2_IMAGE_URL,
  },
  {
    rank: 3,
    name: "SolarMax 10W",
    score: "4.2",
    coverage: "870 sq. ft.",
    lure: "Basic UV / lower output",
    weather: "Light rain only",
    nightlyConsistency: "Fair — more dependent on conditions",
    effortRequired: "Moderate — works best when monitored",
    bestFor: "Budget-minded shoppers with a compact area",
    verdict: "Useful for small spaces, not the cleanest nightly layer",
    quickSummary: "Budget option · Less durable",
    productHref: PRODUCT3_URL,
    imageUrl: PRODUCT3_IMAGE_URL,
  },
  {
    rank: 4,
    name: "BudgetBeam Solar",
    score: "3.9",
    coverage: "500 sq. ft.",
    lure: "Basic UV",
    weather: "Light rain only",
    nightlyConsistency: "Inconsistent — weakest once conditions change",
    effortRequired: "Higher — more babysitting and repositioning",
    bestFor: "Tiny areas where price matters most",
    verdict: "Low upfront price, more effort required",
    quickSummary: "Cheap starter · Weak coverage",
    avoid: true,
  },
  {
    rank: 5,
    name: "EcoLite Solar",
    score: "3.6",
    coverage: "175 sq. ft.",
    lure: "Weak UV",
    weather: "Poor after rain",
    nightlyConsistency: "Weak — smallest practical defense zone",
    effortRequired: "Highest — easy to outgrow or replace",
    bestFor: "Very small corners only",
    verdict: "Too limited for most backyards",
    quickSummary: "Small-area only · Poor rain confidence",
    avoid: true,
  },
];

export const FAQS = [
  {
    q: "Why not just use spray?",
    a: "Sprays can help temporarily, but they depend on reapplication and timing. NovaVolt ranked first because it does not depend on remembering to spray before every evening outside.",
  },
  {
    q: "Is NovaVolt Solar meant to replace every mosquito control method?",
    a: "No single product can guarantee a mosquito-free yard. NovaVolt is best understood as an automatic nightly defense layer: it keeps working without sprays, refills, cords, or daily setup.",
  },
  {
    q: "Does the solar charging really matter?",
    a: "Yes. A solar zapper only helps if it still has power when mosquitoes are active. That is why runtime and charge consistency were major parts of the ranking.",
  },
  {
    q: "Where should I place it?",
    a: "Place it away from the seating area, ideally 15–20 feet from where people gather, so bugs are drawn away from the patio or deck instead of toward people.",
  },
  {
    q: "Is it safe around kids and pets?",
    a: "It is chemical-free and the grid is enclosed, but it should still be placed out of reach and used according to the manufacturer’s safety instructions.",
  },
  {
    q: "Why buy from the official offer page?",
    a: "The official page is where current pricing, bundle discounts, shipping, and return-policy details are shown. Always confirm final terms before ordering.",
  },
  {
    q: "What made NovaVolt the winner?",
    a: "It had the best combination of automatic use, solar-powered nightly runtime, no refills, outdoor durability, coverage, and value.",
  },
];

export function Stars({ filled, label }: { filled: number; label?: string }) {
  return (
    <div className="flex items-center justify-center gap-0.5 text-[20px] leading-none text-star">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden="true">
          {i <= filled ? "★" : "☆"}
        </span>
      ))}
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

export function SectionTitle({
  kicker,
  children,
  deck,
  centered,
}: {
  kicker?: string;
  children: React.ReactNode;
  deck?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker && (
        <div className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.11em] text-brand">
          {kicker}
        </div>
      )}
      <h2 className="font-serif text-[clamp(27px,3.2vw,38px)] font-extrabold leading-tight text-navy">
        {children}
      </h2>
      {deck && <p className="mt-3 text-[18px] leading-relaxed text-subtle">{deck}</p>}
    </div>
  );
}

export function Bullet({
  type,
  children,
}: {
  type: "good" | "bad";
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white ${
          type === "good" ? "bg-good" : "bg-bad"
        }`}
      >
        {type === "good" ? "✓" : "✕"}
      </span>
      <span className="text-[17px] leading-relaxed text-ink">{children}</span>
    </li>
  );
}

export function ScorePanel({
  score,
  stars,
  cta,
  ctaHref,
  ctaPrimary,
  pill,
  note,
}: {
  score: string;
  stars: number;
  cta: string;
  ctaHref: string;
  ctaPrimary?: boolean;
  pill?: string;
  note: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-line bg-pagebg-soft/60 p-5 text-center">
      <div className="font-serif text-[46px] font-extrabold leading-none text-navy">
        {score}
      </div>
      <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-faint">
        Editor Score
      </div>
      <Stars filled={stars} label={`${score} out of 5 editorial rating`} />
      <a
        href={ctaHref}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={`mt-2 w-full rounded-md px-4 py-3 text-[17px] font-bold text-white shadow-site-blue transition-opacity hover:opacity-90 ${
          ctaPrimary
            ? "bg-gradient-to-b from-cta to-cta-hover"
            : "bg-gradient-to-b from-brand to-brand-hover"
        }`}
      >
        {cta}
      </a>
      {pill && (
        <div className="rounded-full bg-cta-soft px-3 py-1 text-[14px] font-bold text-cta-hover">
          {pill}
        </div>
      )}
      <div className="text-[14px] text-subtle">{note}</div>
    </div>
  );
}
