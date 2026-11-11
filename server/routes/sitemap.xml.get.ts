import { createUrl } from "@acdh-oeaw/lib";
import * as v from "valibot";

import { locales, defaultLocale } from "@/config/i18n.config";

const baseUrl = v.parse(v.pipe(v.string(), v.url()), process.env.NUXT_PUBLIC_APP_BASE_URL);

const routePaths = [
	"/",
	"/cooperations",
	"/events",
	"/imprint",
	"/mission-statement",
	"/news",
	"/openatlas",
	"/openatlas-discovery",
	"/publications",
	"/software",
	"/team",
	"/work-with-us",
] as const;

export default defineLazyEventHandler(async () => {
	const entries: Array<{ url: string; lastModified?: Date }> = locales.flatMap((locale) => {
		return routePaths.map((pathname) => {
			const resolvedPath = locale === defaultLocale ? pathname : "/" + locale + pathname;

			return {
				url: String(
					createUrl({
						baseUrl,
						pathname: resolvedPath,
					}),
				),
			};
		});
	});

	const sitemap = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...entries.flatMap((entry) => {
			const elements = ["<url>", `<loc>${entry.url}</loc>`];
			if (entry.lastModified != null) {
				elements.push(`<lastmod>${entry.lastModified.toISOString()}</lastmod>`);
			}
			elements.push("</url>");
			return elements;
		}),
		"</urlset>",
	].join("\n");

	return defineEventHandler((event) => {
		defaultContentType(event, "application/xml");
		return sitemap;
	});
});
