import "@/styles/dog-cognitive-1.css";
import "@/styles/dog-cognitive-2.css";
import "@/styles/dog-cognitive-3.css";
import "@/styles/dog-cognitive-4.css";
import "@/styles/dog-cognitive-5.css";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SiteLayoutClean({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="dog-cognitive-page-root sdi">
      <SiteHeader />
      {children}
      <button
        type="button"
        aria-label="Back to top"
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span aria-hidden="true">↑</span>
      </button>
      <SiteFooter />
    </div>
  );
}
