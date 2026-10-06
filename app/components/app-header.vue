<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

const t = useTranslations();

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

			<nav :aria-label="t('AppHeader.navigation-main')">
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
						<NuxtLink target="_blank" href="https://github.com/craws/OpenAtlas">
							<NuxtImg
								alt=""
								preload
								class="size-7"
								src="/assets/images/GitHub_Invertocat_Black.png"
							/>
							<span class="sr-only">Link to Github</span>
						</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
