import { reactRouter } from "@react-router/dev/vite";
import { safeRoutes } from "safe-routes/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	base: process.env.BASE_URL || "/",
	server: {
		port: 3000,
	},
	plugins: [reactRouter(), safeRoutes(), tsconfigPaths()],
});