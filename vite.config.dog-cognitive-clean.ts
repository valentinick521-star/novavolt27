import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

function dogCognitiveAccuracyHtml() {
  return {
    name: "dog-cognitive-accuracy-html",
    transformIndexHtml(html: string) {
      return html.replace(
        /See how PawPrint Protocol, Senilife, Aktivait, [^,]+ and Novifit actually differ\./,
        "See how PawPrint Protocol, Senilife, Aktivait, Dr. Bill’s Canine Cognitive Support and Novifit actually differ.",
      );
    },
  };
}

function isDogCognitivePageSource(id: string) {
  return id
    .replace(/\\/g, "/")
    .endsWith("/client/pages/DogCognitiveSupplements.tsx");
}

function dogCognitiveImageSizing() {
  const pawprintImage =
    "https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F274eb223542840a882b8acfbca08781d";

  return {
    name: "dog-cognitive-image-sizing",
    transform(code: string, id: string) {
      if (!isDogCognitivePageSource(id)) return null;

      const nextCode = code
        .replace(
          `${pawprintImage}?format=webp&width=600`,
          `${pawprintImage}?format=webp&width=420&quality=75`,
        )
        .replace(
          `${pawprintImage}?format=webp&width=200`,
          `${pawprintImage}?format=webp&width=96&quality=70`,
        );

      return nextCode === code ? null : nextCode;
    },
  };
}

function dogCognitiveRuntimePerformance() {
  const stickyEffect = /  useEffect\(\(\) => \{\n    const sticky = document\.querySelector<HTMLElement>\("\\\.sticky-cta"\);[\s\S]*?  \}, \[\]\);\n\n  return \(/;

  const replacement = `  useEffect(() => {
    const sticky = document.querySelector<HTMLElement>(".sticky-cta");
    const rankings = document.getElementById("rankings");
    const hero = document.querySelector<HTMLElement>(".hero");
    const root = document.querySelector<HTMLElement>(".dog-cognitive-page-root");
    if (!sticky || !root || (!rankings && !hero)) return;

    let visible = false;
    let observer: IntersectionObserver | null = null;
    const mobile = window.matchMedia("(max-width: 760px)");

    const setVisible = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      sticky.classList.toggle("is-visible", next);
      root.classList.toggle("sticky-cta-visible", next);
    };

    const observe = () => {
      observer?.disconnect();

      if (mobile.matches && rankings) {
        observer = new IntersectionObserver(([entry]) => {
          setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
        });
        observer.observe(rankings);
        return;
      }

      if (hero) {
        const topOffset = 68;
        observer = new IntersectionObserver(
          ([entry]) => {
            setVisible(
              !entry.isIntersecting && entry.boundingClientRect.bottom <= topOffset,
            );
          },
          { rootMargin: \`-\${topOffset}px 0px 0px 0px\` },
        );
        observer.observe(hero);
      }
    };

    observe();
    mobile.addEventListener("change", observe);

    return () => {
      observer?.disconnect();
      mobile.removeEventListener("change", observe);
      root.classList.remove("sticky-cta-visible");
    };
  }, []);

  return (`;

  return {
    name: "dog-cognitive-runtime-performance",
    transform(code: string, id: string) {
      if (!isDogCognitivePageSource(id)) return null;
      const nextCode = code.replace(stickyEffect, replacement);
      return nextCode === code ? null : nextCode;
    },
  };
}

export default defineConfig({
  root: path.resolve(__dirname, "dog-cognitive-page"),
  base: "/best-dog-cognitive-supplements/",
  build: {
    outDir: path.resolve(
      __dirname,
      "dist/spa/best-dog-cognitive-supplements",
    ),
    emptyOutDir: true,
  },
  plugins: [
    dogCognitiveImageSizing(),
    dogCognitiveRuntimePerformance(),
    react(),
    dogCognitiveAccuracyHtml(),
  ],
  resolve: {
    alias: [
      {
        find: "@/components/dog-cognitive/SiteLayout",
        replacement: path.resolve(
          __dirname,
          "client/components/dog-cognitive/SiteLayoutClean.tsx",
        ),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "client"),
      },
    ],
  },
});
