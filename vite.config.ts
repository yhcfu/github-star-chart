import { reactRouter } from "@react-router/dev/vite";
import { safeRoutes } from "safe-routes/vite";
import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.BASE_URL || "/",
  server: {
    port: 3000,
  },
  plugins: [reactRouter(), safeRoutes(), tsconfigPaths(), svgr()],

  // TODO: ここから下の設定理由を明確にする
  optimizeDeps: { exclude: ["fsevents"] },
  build: {
    rollupOptions: {
      external: ["fs/promises"],
      output: {
        experimentalMinChunkSize: 3500,
      },
    },
  },
});
