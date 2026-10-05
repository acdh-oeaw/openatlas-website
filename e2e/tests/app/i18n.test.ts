/* oxlint-disable playwright/no-skipped-test */
import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "~/e2e/lib/test";

const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test.describe("i18n", () => {
	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "en" });

		test.skip("with default locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "de" });

		test.skip("with supported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/de");
		});
	});

	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "fr" });

		test.skip("with unsupported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test.skip("should display not-found page for unknown locale", async ({ createI18n, page }) => {
		const i18n = await createI18n("en");
		const response = await page.goto("/unknown");
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: i18n.t("NotFoundPage.title") })).toBeVisible();
	});

	// oxlint-disable-next-line playwright/no-commented-out-tests
	// test("should display localised not-found page for unknown pathname", async ({
	// 	createI18n,
	// 	page,
	// }) => {
	// 	const i18n = await createI18n("de");
	// 	const response = await page.goto("/de/unknown");
	// 	expect(response?.status()).toBe(404);
	// 	await expect(page.getByRole("heading", { name: i18n.t("NotFoundPage.title") })).toBeVisible();
	// });

	// oxlint-disable-next-line playwright/no-commented-out-tests
	// test("should support switching locale", async ({ createImprintPage, createI18n, page }) => {
	// 	const { imprintPage, i18n: i18nDe } = await createImprintPage("de");
	// 	await imprintPage.goto();

	// 	await expect(page).toHaveURL("/de/imprint");
	// 	await expect(page.getByRole("heading", { name: i18nDe.t("ImprintPage.title") })).toBeVisible();
	// 	await expect(page).toHaveTitle(
	// 		[i18nDe.t("ImprintPage.meta.title"), i18nDe.t("DefaultLayout.meta.title")].join(" | "),
	// 	);

	// 	await page
	// 		.getByRole("link", { name: i18nDe.t("LocaleSwitcher.switch-locale", { locale: "Englisch" }) })
	// 		.click();

	// 	const i18nEn = await createI18n("en");

	// 	await expect(page).toHaveURL("/en/imprint");
	// 	await expect(page.getByRole("heading", { name: i18nEn.t("ImprintPage.title") })).toBeVisible();
	// 	await expect(page).toHaveTitle(
	// 		[i18nEn.t("ImprintPage.meta.title"), i18nEn.t("DefaultLayout.meta.title")].join(" | "),
	// 	);
	// });

	test.skip("should set alternate links in link tags", async ({ page }) => {
		function createAbsoluteUrl(pathname: string) {
			return String(createUrl({ baseUrl, pathname }));
		}

		const pathnames = ["", "/imprint"];

		for (const pathname of pathnames) {
			for (const locale of locales) {
				await page.goto(`/${locale}${pathname}`);

				// oxlint-disable-next-line playwright/no-raw-locators
				const links = await page.locator('link[rel="alternate"]').evaluateAll((elements) => {
					return elements.map((element) => {
						return [element.getAttribute("hreflang"), element.getAttribute("href")];
					});
				});

				expect(links).toStrictEqual(
					expect.arrayContaining([
						["de", createAbsoluteUrl(`/de${pathname}`)],
						["en", createAbsoluteUrl(`/en${pathname}`)],
						["x-default", createAbsoluteUrl(`/en${pathname}`)],
					]),
				);
			}
		}
	});
});
