import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

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
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
    },
  },
});
