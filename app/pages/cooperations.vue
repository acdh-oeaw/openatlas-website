<script setup lang="ts">
import ProjectCard from "@/components/project-card.vue";
const t = useTranslations();

usePageMetadata({
	title: t("CooperationsPage.meta.title"),
});

const route = useRoute();

const contentPath = computed(() => {
	if (route.path === "/") {
		return "/";
	}

	return route.path;
});

const { data: projects } = await useAsyncData(
	() => `content-${contentPath.value}`,
	() => queryCollection("projects").all(),
);

const selectedStatus = ref<string[]>([]);
const selectedDomains = ref<string[]>([]);

const statusTags = computed(() => {
	if (!projects.value) return [];

	return [...new Set(projects.value.flatMap((project) => project.statusTags ?? []))].sort();
});

const domainTags = computed(() => {
	if (!projects.value) return [];

	return [...new Set(projects.value.flatMap((project) => project.domainTags ?? []))].sort();
});

const filteredProjects = computed(() => {
	if (!projects.value) return [];

	return projects.value
		.filter((project) => {
			const statusMatch =
				selectedStatus.value.length === 0 ||
				selectedStatus.value.every((tag) => project.statusTags?.includes(tag));

			const domainMatch =
				selectedDomains.value.length === 0 ||
				selectedDomains.value.every((tag) => project.domainTags?.includes(tag));

			return statusMatch && domainMatch;
		})
		.sort((a, b) => {
			const aOngoing = a.yearEnd === "ongoing";
			const bOngoing = b.yearEnd === "ongoing";

			if (aOngoing && !bOngoing) return -1;
			if (!aOngoing && bOngoing) return 1;

			if (aOngoing && bOngoing) {
				return Number(b.yearStart) - Number(a.yearStart);
			}

			return Number(b.yearEnd) - Number(a.yearEnd);
		});
});

function toggleStatus(tag: string) {
	const index = selectedStatus.value.indexOf(tag);

	if (index === -1) {
		selectedStatus.value.push(tag);
	} else {
		selectedStatus.value.splice(index, 1);
	}
}

function toggleDomain(tag: string) {
	const index = selectedDomains.value.indexOf(tag);

	if (index === -1) {
		selectedDomains.value.push(tag);
	} else {
		selectedDomains.value.splice(index, 1);
	}
}

function clearFilters() {
	selectedStatus.value = [];
	selectedDomains.value = [];
}

const filterCount = computed(() => selectedStatus.value.length + selectedDomains.value.length);
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">
			Cooperations & Projects
		</h1>
		<div class="font-heading">
			Listed below you can find projects from different fields of the humanities that used or are
			currently using OpenAtlas for their research. These projects cooperate closely with the
			OpenAtlas team. Their requirements and requested features were and are implemented within the
			main development of the software.
		</div>

		<div>
			<button type="button" class="flex w-full items-center justify-between py-4 text-left">
				<div class="flex items-center gap-3">
					<span class="font-heading text-sm font-semibold"> Filter projects </span>
					<span v-if="filterCount > 0" class="text-xs text-neutral-500">
						{{ filterCount }} active
					</span>
				</div>
				<div class="flex items-center gap-3">
					<button
						v-if="filterCount > 0"
						type="button"
						class="text-xs font-medium text-neutral-400 transition hover:text-neutral-800"
						@click.stop="clearFilters"
					>
						Clear
					</button>
				</div>
			</button>
			<div class="border-t border-neutral-200 pt-4">
				<div class="flex flex-col gap-3 sm:flex-row sm:items-start">
					<div
						class="w-20 shrink-0 pt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400"
					>
						Status
					</div>
					<div class="flex flex-wrap gap-1.5">
						<button
							v-for="tag in statusTags"
							:key="tag"
							type="button"
							class="rounded-full border px-2.5 py-1 text-xs uppercase transition"
							:class="
								selectedStatus.includes(tag)
									? 'border-primary bg-primary text-white'
									: 'border-neutral-500 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
							"
							@click="toggleStatus(tag)"
						>
							{{ tag }}
						</button>
					</div>
				</div>

				<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
					<div
						class="w-20 shrink-0 pt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400"
					>
						Domain
					</div>
					<div class="flex flex-wrap gap-1.5">
						<button
							v-for="tag in domainTags"
							:key="tag"
							type="button"
							class="rounded-full border px-2.5 py-1 text-xs uppercase transition"
							:class="
								selectedDomains.includes(tag)
									? 'border-primary bg-primary text-white'
									: 'border-neutral-500 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
							"
							@click="toggleDomain(tag)"
						>
							{{ tag }}
						</button>
					</div>
				</div>

				<div class="border-b border-neutral-200 pb-5"></div>
			</div>
		</div>

		<div class="text-lg">
			Projects <span class="text-neutral-400">({{ filteredProjects.length }})</span>
			<div class="border-b border-neutral-200 pb-5"></div>
		</div>

		<div v-if="projects != null && projects.length > 0">
			<ProjectCard
				v-for="item in filteredProjects"
				:project="item"
				:selected-status="selectedStatus"
				:selected-domains="selectedDomains"
				:key="item.id"
				class="mb-7"
			></ProjectCard>
		</div>
	</MainContent>
</template>
