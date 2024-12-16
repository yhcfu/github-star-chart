import type { Config } from "@react-router/dev/config";

export default {
	// for SPA mode
	ssr: false,
	basename: process.env.BASE_URL || "/",
} satisfies Config;
