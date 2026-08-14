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
  plugins: [react(), dogCognitiveAccuracyHtml()],
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
