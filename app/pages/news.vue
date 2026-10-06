<script setup lang="ts">
const t = useTranslations();

usePageMetadata({
	title: t("NewsPage.meta.title"),
});

const { data: news } = await useAsyncData("news", () =>
	queryCollection("news").order("date", "DESC").all(),
);

const newsByYear = computed(() => {
	const groups: Record<string, NonNullable<typeof news.value>> = {};

	for (const entry of news.value ?? []) {
		const year = entry.date.slice(0, 4);
		(groups[year] ??= []).push(entry);
	}

	return Object.entries(groups)
		.sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
		.map(([year, entries]) => ({
			label: year,
			value: year,
			entries,
		}));
});

const currentYear = new Date().getFullYear().toString();

const currentYearNews = computed(
	() => newsByYear.value.find((year) => year.value === currentYear)?.entries ?? [],
);

const previousYears = computed(() => newsByYear.value.filter((year) => year.value !== currentYear));
</script>

<template>
	<MainContent class="container grid content-start py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">News</h1>

		<section v-if="currentYearNews.length" class="pt-8">
			<div>
				<article v-for="entry in currentYearNews" :key="entry.id" class="pb-2">
					<p class="text-sm text-neutral-500">
						{{ entry.date }}
					</p>

					<h3 class="font-heading text-lg font-medium -mb-2">
						{{ entry.title }}
					</h3>

					<ContentRenderer :value="entry" class="prose text-sm" />
				</article>
			</div>
		</section>

		<UAccordion
			v-if="previousYears.length"
			:items="previousYears"
			:ui="{
				label: 'text-lg font-heading font-medium',
			}"
		>
			<template #body="{ item }">
				<div>
					<article v-for="entry in item.entries" :key="entry.id" class="prose-events pb-2">
						<p class="text-sm text-neutral-500">
							{{ entry.date }}
						</p>

						<h3 class="font-heading text-lg font-medium -mb-2">
							{{ entry.title }}
						</h3>

						<ContentRenderer :value="entry" class="text-sm" />
					</article>
				</div>
			</template>
		</UAccordion>
	</MainContent>
</template>
