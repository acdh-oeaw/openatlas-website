<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

const t = useTranslations();
const mobileMenuOpen = ref(false);

const links = computed(() => {
	return {
		cooperations: {
			href: { path: "/cooperations" },
			label: t("AppHeader.links.cooperations"),
		},
		"work with us": {
			href: { path: "/work-with-us" },
			label: t("AppHeader.links.work"),
		},
		team: {
			href: { path: "/team" },
			label: t("AppHeader.links.team"),
		},
		events: {
			href: { path: "/events" },
			label: t("AppHeader.links.events"),
		},
		news: {
			href: { path: "/news" },
			label: t("AppFooter.links.news"),
		},
		publications: {
			href: { path: "/publications" },
			label: t("AppHeader.links.publications"),
		},
	} satisfies Record<string, { href: NuxtLinkProps["href"]; label: string }>;
});

const aboutItems = computed(() => [
	{
		label: "OpenAtlas",
		to: "/openatlas",
	},
	{
		label: "OpenAtlas Discovery",
		to: "/openatlas-discovery",
	},
]);

const githubItems = computed(() => [
	{
		label: "OpenAtlas",
		to: "https://github.com/craws/OpenAtlas",
		target: "_blank",
	},
	{
		label: "OpenAtlas Discovery",
		to: "https://github.com/acdh-oeaw/openatlas-discovery",
		target: "_blank",
	},
]);

const closeMobileMenu = () => {
	mobileMenuOpen.value = false;
};
</script>

<template>
	<header>
		<div class="container flex items-center justify-between gap-4 py-4">
			<NuxtLink href="/">
				<NuxtImg
					alt=""
					class="block object-contain max-w-15"
					preload
					src="/assets/images/logo-without-text.png"
				/>
				<span class="sr-only">{{ t("AppHeader.links.home") }}</span>
			</NuxtLink>

			<nav :aria-label="t('AppHeader.navigation-main')" class="hidden md:block">
				<ul class="flex items-center gap-4" role="list">
					<li>
						<UDropdownMenu :items="aboutItems" class="inline-flex" size="lg" :arrow="true">
							<button
								class="cursor-pointer m-0 inline-block p-0 font-heading leading-normal opacity-80 transition-opacity hover:opacity-100"
							>
								About
							</button>
						</UDropdownMenu>
					</li>

					<li v-for="(link, key) of links" :key="key">
						<NuxtLinkLocale
							class="font-heading opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 aria-[current]:opacity-100"
							:href="link.href"
						>
							{{ link.label }}
						</NuxtLinkLocale>
					</li>

					<li>
						<UDropdownMenu :items="githubItems" class="inline-flex" size="lg" :arrow="true">
							<NuxtImg
								alt=""
								preload
								class="size-7 cursor-pointer m-0 inline-block p-0 font-heading leading-normal opacity-80 transition-opacity hover:opacity-100"
								src="/assets/images/GitHub_Invertocat_Black.png"
							/>
							<span class="sr-only">Link to Github</span>
						</UDropdownMenu>
					</li>
				</ul>
			</nav>
			<!-- Mobile menu button -->
			<button
				type="button"
				class="inline-flex size-10 items-center justify-center md:hidden"
				aria-label="Toggle navigation"
				:aria-expanded="mobileMenuOpen"
				@click="mobileMenuOpen = !mobileMenuOpen"
			>
				<UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
			</button>
		</div>
		<!-- Mobile side sheet -->
		<div
			class="grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
			:class="mobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
		>
			<div class="overflow-hidden">
				<nav
					:aria-label="t('AppHeader.navigation-main')"
					class="container border-t border-b border-black/10 px-4 py-6"
				>
					<ul class="flex flex-col gap-5" role="list">
						<li>
							<div class="font-heading text-sm opacity-50 mb-3">About</div>
							<ul class="flex flex-col gap-3 pl-3">
								<li v-for="item in aboutItems" :key="item.to">
									<NuxtLinkLocale
										:href="item.to"
										class="font-heading text-lg"
										@click="mobileMenuOpen = false"
									>
										{{ item.label }}
									</NuxtLinkLocale>
								</li>
							</ul>
						</li>

						<div class="container border-t border-black/10"></div>
						<li v-for="(link, key) of links" :key="key">
							<NuxtLinkLocale
								class="font-heading text-lg"
								:href="link.href"
								@click="mobileMenuOpen = false"
							>
								{{ link.label }}
							</NuxtLinkLocale>
						</li>

						<li>
							<div class="font-heading text-sm opacity-50 mb-3">GitHub</div>
							<ul class="flex flex-col gap-3 pl-3">
								<li v-for="item in githubItems" :key="item.to">
									<a
										:href="item.to"
										target="_blank"
										rel="noopener noreferrer"
										class="font-heading text-lg"
										@click="mobileMenuOpen = false"
									>
										{{ item.label }}
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>
