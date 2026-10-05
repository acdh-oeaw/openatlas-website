import type { Locator, Page } from "@playwright/test";

export class IndexPage {
	readonly page: Page;
	readonly url: string;
	readonly mainContent: Locator;
	readonly title: Locator;
	readonly skipLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.url = "/";
		this.mainContent = page.getByRole("main");
		this.title = page.getByRole("heading", { level: 1 });
		this.skipLink = page.getByRole("link", { name: "Skip to main content" });
	}

	goto() {
		return this.page.goto(this.url);
	}
}
