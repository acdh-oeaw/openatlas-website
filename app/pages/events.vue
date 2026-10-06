<script setup lang="ts">
const t = useTranslations();

usePageMetadata({
	title: t("EventPage.meta.title"),
});

const { data: events } = await useAsyncData("events", () =>
	queryCollection("events").order("date", "DESC").all(),
);

const today = new Date().toISOString().slice(0, 10);
const currentYear = new Date().getFullYear().toString();

const upcomingEvents = computed(() =>
	(events.value ?? [])
		.filter((entry) => entry.date >= today)
		.sort((a, b) => a.date.localeCompare(b.date)),
);

const eventsByYear = computed(() => {
	const groups: Record<string, NonNullable<typeof events.value>> = {};

	for (const entry of events.value ?? []) {
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

const currentYearEvents = computed(() =>
	(eventsByYear.value.find((year) => year.value === currentYear)?.entries ?? []).filter(
		(entry) => entry.date < today,
	),
);

const previousYears = computed(() =>
	eventsByYear.value.filter((year) => year.value !== currentYear),
);
</script>

<template>
	<MainContent class="container grid content-start py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">Events</h1>

		<div v-if="upcomingEvents.length || currentYearEvents.length" class="pt-8">
			<h2 class="font-heading text-2xl font-medium pb-5 border-b border-neutral-300">
				{{ currentYear }}
			</h2>

			<div v-if="upcomingEvents.length" class="pt-8">
				<p class="text-lg font-medium uppercase tracking-wide pb-4">Upcoming</p>
				<EventCards :events="upcomingEvents" />
			</div>

			<div class="border-b p-3 border-neutral-300"></div>
			<div v-if="currentYearEvents.length" class="py-6">
				<EventCards :events="currentYearEvents" />
			</div>
		</div>

		<UAccordion
			v-if="previousYears.length"
			:items="previousYears"
			:ui="{
				label: 'text-lg font-heading font-medium',
			}"
		>
			<template #body="{ item }">
				<div class="py-2">
					<EventCards :events="item.entries" />
				</div>
			</template>
		</UAccordion>
	</MainContent>
</template>
