import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "rankings", label: "Rankings" },
  { id: "top-pick", label: "Top Pick" },
  { id: "review", label: "Full Review" },
  { id: "faq", label: "FAQ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onArticle = pathname === "/best-dog-cognitive-supplements" || pathname === "/best-dog-cognitive-supplements/";

  useEffect(() => {
    if (!open) return;
    const onResize = () => window.innerWidth > 860 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="logo" to="/" aria-label="National Consumer Review home">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F6e07a1b8bd4c41b7b6b7bc44ee60c192?format=webp&width=300&quality=70"
            alt="National Consumer Review"
            decoding="async"
          />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-controls="mobile-sections-nav"
          aria-expanded={open}
          aria-label="Open section navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`anchor-nav${open ? " open" : ""}`}
          id="mobile-sections-nav"
        >
          {SECTIONS.map((section) =>
            onArticle ? (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
              >
                {section.label}
              </a>
            ) : (
              <Link
                key={section.id}
                to={{ pathname: "/best-dog-cognitive-supplements", hash: `#${section.id}` }}
                onClick={() => setOpen(false)}
              >
                {section.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
