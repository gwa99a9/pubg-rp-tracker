import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// The standalone build is a classic script rather than an ES module, so the
// inlined single file also works when opened straight off disk (file://,
// where browsers refuse to load modules).
const standalone = process.env.BUILD_STANDALONE === "1";

export default defineConfig({
  // Relative base, so the same build works on GitHub Pages, in a subfolder,
  // or from the filesystem.
  base: "./",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: standalone
    ? {
        outDir: "dist-standalone",
        modulePreload: { polyfill: false },
        rollupOptions: {
          output: {
            format: "iife",
            inlineDynamicImports: true,
            entryFileNames: "assets/app.js",
            assetFileNames: "assets/app[extname]",
          },
        },
      }
    : {},
});
