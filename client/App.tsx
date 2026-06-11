import "./global.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";

// Prevent mobile browsers from restoring the last scroll position after refresh.
// This keeps normal hash/anchor links working for Google sitelinks.
if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const resetScrollToTop = () => {
    if (window.location.hash) return;

    window.scrollTo(0, 0);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
    window.setTimeout(() => window.scrollTo(0, 0), 75);
  };

  resetScrollToTop();
  window.addEventListener("pageshow", resetScrollToTop);
  window.addEventListener("load", resetScrollToTop);
  window.addEventListener("beforeunload", resetScrollToTop);
}

const container = document.getElementById("root")!;

const app = (
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <AppShell />
  </BrowserRouter>
);

const w = window as typeof window & {
  __appRoot?: ReturnType<typeof createRoot> | ReturnType<typeof hydrateRoot>;
};

if (w.__appRoot) {
  w.__appRoot.render(app);
} else if (import.meta.env.PROD && container.hasChildNodes()) {
  w.__appRoot = hydrateRoot(container, app);
} else {
  w.__appRoot = createRoot(container);
  w.__appRoot.render(app);
}
