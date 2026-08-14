import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

function dogCognitiveImageSizing() {
  const pawprintImage =
    "https://cdn.builder.io/api/v1/image/assets%2Ff12907698ec44301a20b66b5fc338f8f%2F274eb223542840a882b8acfbca08781d";

  return {
    name: "dog-cognitive-image-sizing-ssr",
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

export default defineConfig({
  root: path.resolve(__dirname, "dog-cognitive-page"),
  plugins: [dogCognitiveImageSizing(), react()],
  build: {
    ssr: path.resolve(__dirname, "dog-cognitive-page/entry-server.tsx"),
    outDir: path.resolve(__dirname, "dist/dog-cognitive-prerender"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js",
      },
    },
  },
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
