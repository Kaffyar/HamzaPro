import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("gsap") || id.includes("split-type") || id.includes("lenis")) {
            return "motion-engine";
          }
          if (id.includes("lucide-react")) {
            return "icon-pack";
          }
          return "vendor";
        },
      },
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
