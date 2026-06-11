import { Link, useLocation } from "react-router-dom";

export const OFFER_URL =
  "https://unbindgear.com/novavoltsolar/inter?uidab=382&oid=172&affid=1&uid=3953&oidab2=1051&affidab2=1168";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fbadcc4098d254fadb81b2c01ff7bb98c?format=webp&width=360";

const NAV_LINKS = [
  { label: "The Problem", href: "#problem" },
  { label: "Comparison", href: "#comparison" },
  { label: "Criteria", href: "#checklist" },
  { label: "Winner", href: "#winner" },
  { label: "FAQ", href: "#faq" },
];

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img
        src={LOGO_URL}
        alt="National Consumer Review"
        width={420}
        height={67}
        decoding="async"
        className="block h-auto w-[150px] max-w-[calc(100vw-88px)] object-contain sm:w-[150px] md:w-[180px] lg:w-[205px]"
      />
    </Link>
  );
}

function Header() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-14 max-w-site items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 md:h-[72px] md:gap-5">
        <Logo />

        {onHome ? (
          <>
            <button
              type="button"
              aria-expanded="false"
              aria-controls="mobile-section-nav"
              aria-label="Open section navigation"
              data-menu-toggle
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-navy md:hidden"
            >
              <span data-menu-icon className="text-xl leading-none">☰</span>
            </button>

            <nav className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-[15.5px] font-semibold text-ink transition-colors hover:text-brand"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </>
        ) : (
          <Link
            to="/"
            className="text-[17px] font-semibold text-brand hover:text-brand-hover"
          >
            ← Back to Review
          </Link>
        )}
      </div>

      {onHome && (
        <nav
          id="mobile-section-nav"
          hidden
          data-mobile-nav
          className="border-t border-line bg-white px-5 py-2 md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block border-b border-line-light py-3 text-[17px] font-semibold text-ink last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer id="site-footer" className="mt-11 w-full bg-[#0d1827] text-[#c2cedb]">
      <div className="mx-auto max-w-site px-5 sm:px-7">
        <div className="flex flex-col justify-between gap-7 border-b border-white/10 py-7 sm:flex-row">
          <div className="max-w-md">
            <span className="text-[19px] font-semibold tracking-tight text-white">
              National Consumer Review
            </span>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#9fb0c4]">
              Independent product testing and editorial reviews for home,
              outdoor, and seasonal comfort gear. We buy the products, run the
              tests, and publish what we find.
            </p>
          </div>
          <nav className="flex flex-col gap-2.5 text-[15.5px]">
            <Link className="hover:text-white" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white" to="/terms-of-use">
              Terms of Use
            </Link>
            <Link className="hover:text-white" to="/affiliate-disclosure">
              Affiliate Disclosure
            </Link>
          </nav>
        </div>

        <div className="py-6">
          <div className="text-[14.5px] text-[#7f93aa]">
            © 2026 NationalConsumerReview.com. All rights reserved.
          </div>
          <div className="mt-4 grid gap-3 text-[14px] leading-relaxed text-[#7f93aa] sm:grid-cols-3">
            <p>
              <strong className="text-[#aebdce]">Editorial independence.</strong>{" "}
              Rankings reflect hands-on testing only, not commercial
              relationships. We may earn a commission from links on this page.
            </p>
            <p>
              <strong className="text-[#aebdce]">Information accuracy.</strong>{" "}
              Specifications are drawn from manufacturer offer pages and may
              change. Always confirm details on the official product page.
            </p>
            <p>
              <strong className="text-[#aebdce]">Health &amp; safety notice.</strong>{" "}
              This content is informational and not a substitute for
              professional advice. Follow all manufacturer safety guidance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCta() {
  return (
    <div
      data-sticky-cta
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-[rgba(13,31,56,0.97)] backdrop-blur-md transition-transform duration-300 translate-y-full"
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-3 px-4 py-2.5 sm:px-7">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe9508f1e32b34813a11957a3abee3959%2Fa0a04f36a36549f99819b3175f0967da?format=webp&width=110&height=110"
            alt="NovaVolt Solar"
            loading="lazy"
            decoding="async"
            className="hidden h-11 w-11 shrink-0 rounded-md object-cover sm:block"
          />
          <div className="leading-tight">
            <div className="text-[13px] font-bold uppercase tracking-wide text-star">
              ★ Top Recommendation
            </div>
            <div className="text-[16px] font-bold text-white">
              NovaVolt Solar
            </div>
            <div className="hidden text-[14px] text-[#9fb0c4] sm:block">
              Our best automatic nightly defense pick
            </div>
          </div>
        </div>
        <a
          href={OFFER_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="shrink-0 rounded-md bg-gradient-to-b from-cta to-cta-hover px-4 py-2.5 text-[16px] font-bold text-white shadow-site-blue transition-opacity hover:opacity-90 sm:px-6"
        >
          See Top Pick →
        </a>
      </div>
    </div>
  );
}

function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      data-back-to-top
      className="fixed bottom-20 right-4 z-[99] flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/95 text-navy shadow-site-md transition-all pointer-events-none translate-y-2 opacity-0"
    >
      ↑
    </button>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const onHome = location.pathname === "/";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16">
        {children}
      </main>
      <Footer />
      {onHome && (
        <>
          <StickyCta />
          <BackToTop />
        </>
      )}
    </div>
  );
}
