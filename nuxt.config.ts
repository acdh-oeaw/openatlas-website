import { fileURLToPath } from "node:url";

import { assert, isNonEmptyString } from "@acdh-oeaw/lib";
import tailwindcss from "@tailwindcss/vite";

import { defaultLocale, files, locales } from "./app/config/i18n.config";
import oxlintGlobals from "./modules/oxlint-globals";

const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL;

assert(
	isNonEmptyString(baseUrl),
	"Missing `NUXT_PUBLIC_APP_BASE_URL` environment variable.\nYou may have forgotten to `cp .env.local.example .env.local`.",
);

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./app/", import.meta.url)),
		"~": fileURLToPath(new URL("./", import.meta.url)),
	},
	app: {
		layoutTransition: false,
		pageTransition: false,
	},
	compatibilityDate: "2026-05-01",
	components: [{ extensions: [".vue"], path: "components", pathPrefix: false }],
	content: {
		experimental: { sqliteConnector: "native" },
		build: {
			markdown: {
				remarkPlugins: {
					"remark-breaks": {},
				},
				toc: {
					depth: 5,
				},
			},
		},
	},
	css: [
		"@fontsource-variable/inter/standard.css",
		"@fontsource-variable/inter/standard-italic.css",
		"@fontsource/poppins",
		"@fontsource/poppins/500.css",
		"@fontsource/poppins/600.css",
		"@fontsource/poppins/700.css",
		"@/styles/index.css",
	],
	devtools: {
		enabled: false,
	},
	experimental: {
		defaults: {
			useAsyncData: {
				deep: false,
			},
			useFetch: {
				timeout: 250,
			},
		},
		inlineRouteRules: true,
	},
	future: {
		compatibilityVersion: 5,
	},
	i18n: {
		baseUrl,
		defaultLocale,
		detectBrowserLanguage: {
			redirectOn: "root",
		},
		experimental: {
			typedOptionsAndMessages: "default",
		},
		langDir: "messages",
		locales: files,
		strategy: "no_prefix",
	},
	imports: {
		dirs: ["@/config/"],
	},
	modules: [
		oxlintGlobals,
		"@nuxt/fonts",
		"@nuxt/hints",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxtjs/i18n",
		"@vueuse/nuxt",
		"@nuxt/content",
		"nuxt-studio",
		"@nuxt/ui",
	],
	nitro: {
		compressPublicAssets: true,
		prerender: {
			routes: [
				"/manifest.webmanifest",
				"/robots.txt",
				"/sitemap.xml",
				...locales.map((locale) => `/${locale}/opengraph-image.png`),
			],
			crawlLinks: true,
		},
	},
	runtimeConfig: {
		public: {
			app: {
				baseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
				bots: process.env.NUXT_PUBLIC_APP_BOTS,
				googleSiteVerification: process.env.NUXT_PUBLIC_APP_GOOGLE_SITE_VERIFICATION,
				imprintCustomConfig: process.env.NUXT_PUBLIC_APP_IMPRINT_CUSTOM_CONFIG,
				imprintServiceBaseUrl: process.env.NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL,
				matomoBaseUrl: process.env.NUXT_PUBLIC_APP_MATOMO_BASE_URL,
				matomoId: process.env.NUXT_PUBLIC_APP_MATOMO_ID,
				serviceId: process.env.NUXT_PUBLIC_APP_SERVICE_ID,
			},
		},
	},
	studio: {
		repository: {
			provider: "github",
			owner: "acdh-oeaw",
			repo: "openatlas-website",
			branch: "main",
			rootDir: "content",
		},
		route: "/admin",
		dev: true,
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				paths: {
					"@/*": ["./app/*"],
					"~/*": ["./*"],
				},
			},
			include: [
				"../*.config.ts",
				"../i18n/*.config.ts",
				"../e2e/**/*.ts",
				"../scripts/**/*.ts",
				"../server/**/*.ts",
			],
		},
	},
	ui: {
		colorMode: false,
	},
	vite: {
		build: {
			cssMinify: "lightningcss",
		},
		plugins: [tailwindcss()],
	},
});
