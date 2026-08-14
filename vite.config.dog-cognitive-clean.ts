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

function dogCognitiveImageSizing() {
  const pawprintImage =
    "https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F274eb223542840a882b8acfbca08781d";

  return {
    name: "dog-cognitive-image-sizing",
    transform(code: string, id: string) {
      if (!id.replace(/\\/g, "/").endsWith("/client/pages/DogCognitiveSupplements.tsx")) {
        return null;
      }

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

function dogCognitiveMainThreadPerformance() {
  const originalImport = 'import { useLayoutEffect } from "react";';
  const optimizedImport = 'import { useEffect, useLayoutEffect } from "react";';

  const originalEffect = `  useLayoutEffect(() => {
    ensurePageStyles();
    updateMetaAndHero();
    updateQuickRankings();
    rewriteFullComparison();
    removeRetiredSections();
    restoreFinalFaq();
    updateWhyPawprint();
    simplifyFinalCta();
    updateAllPawprintScores();
  }, []);`;

  const optimizedEffects = `  useLayoutEffect(() => {
    // Keep only the above-the-fold copy synchronized before the first paint.
    updateMetaAndHero();
    updateAllPawprintScores();
  }, []);

  useEffect(() => {
    // The rest of these rewrites are below the first mobile viewport. Running
    // them after paint avoids holding FCP/LCP behind a large synchronous DOM pass.
    ensurePageStyles();
    updateQuickRankings();
    rewriteFullComparison();
    removeRetiredSections();
    restoreFinalFaq();
    updateWhyPawprint();
    simplifyFinalCta();
    updateAllPawprintScores();
  }, []);`;

  return {
    name: "dog-cognitive-main-thread-performance",
    transform(code: string, id: string) {
      if (!id.replace(/\\/g, "/").endsWith("/dog-cognitive-page/main.tsx")) {
        return null;
      }

      const nextCode = code
        .replace(originalImport, optimizedImport)
        .replace(originalEffect, optimizedEffects);

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
    dogCognitiveMainThreadPerformance(),
    dogCognitiveImageSizing(),
    react(),
    dogCognitiveAccuracyHtml(),
  ],
  resolve: {
    alias: [
      {
        find: "react-router-dom",
        replacement: path.resolve(__dirname, "dog-cognitive-page/router-lite.tsx"),
      },
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
