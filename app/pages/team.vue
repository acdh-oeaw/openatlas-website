<script setup lang="ts">
import TeamMember from "@/components/team-member.vue";
const t = useTranslations();

usePageMetadata({
	title: t("TeamPage.meta.title"),
});
const route = useRoute();

const contentPath = computed(() => {
	if (route.path === "/") {
		return "/";
	}

	return route.path;
});

const { data: members } = await useAsyncData(
	() => `content-${contentPath.value}`,
	() => queryCollection("team").order("order", "ASC").all(),
);

const { data: support } = await useAsyncData(
	() => `content-${contentPath.value}-2`,
	() => queryCollection("support").order("order", "ASC").all(),
);

const { data: contributors } = await useAsyncData(
	() => `content-${contentPath.value}-3`,
	() => queryCollection("contributors").all(),
);

const sortedContributors = computed(() =>
	[...(contributors.value?.[0]?.contributors ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
);
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">Team</h1>
		<div v-if="members != null && members.length > 0">
			<TeamMember v-for="member in members" :member="member" :key="member.id"></TeamMember>
		</div>
		<h2 class="font-heading text-2xl font-medium pb-5 border-b border-neutral-300">
			Additional Support
		</h2>
		<div v-if="support != null && support.length > 0">
			<TeamMember v-for="member in support" :member="member" :key="member.id"></TeamMember>
		</div>
		<h2 class="font-heading text-2xl font-medium pb-5 border-b border-neutral-300">Contributors</h2>
		<div class="font-heading">
			These people supported us in many ways. Our thanks go to all of them.
		</div>
		<div v-if="sortedContributors != null" class="columns-1 md:columns-4 gap-8">
			<div
				v-for="contributor in sortedContributors"
				:key="contributor.name"
				class="break-inside-avoid"
			>
				{{ contributor.name }}
			</div>
		</div>
	</MainContent>
</template>
