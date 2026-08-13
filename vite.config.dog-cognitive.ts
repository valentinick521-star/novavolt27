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

function dogCognitiveFocusedCleanup() {
  return {
    name: "dog-cognitive-focused-cleanup",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (id.includes("dog-cognitive-page/main.tsx")) {
        return code.replace(
          "addPopularOptionsSection();",
          'addPopularOptionsSection();\n    document.getElementById("popular-options-inside")?.style.setProperty("display", "none", "important");',
        );
      }

      if (!id.includes("client/components/dog-cognitive/SiteLayout.tsx")) return null;
      return code.replace(
        'import "../../../dog-cognitive-page/accuracy-cleanup.js";',
        'import "../../../dog-cognitive-page/accuracy-core.js";\nimport "../../../dog-cognitive-page/middle-loader.js";',
      );
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
  plugins: [dogCognitiveFocusedCleanup(), react(), dogCognitiveAccuracyHtml()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
    },
  },
});
