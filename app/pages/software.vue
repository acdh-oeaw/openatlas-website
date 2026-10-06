<script setup lang="ts">
import SoftwareCard from "@/components/software-card.vue";

const t = useTranslations();

usePageMetadata({
	title: t("SoftwarePage.meta.title"),
});
const route = useRoute();

const contentPath = computed(() => {
	if (route.path === "/") {
		return "/";
	}

	return route.path;
});

const { data: software } = await useAsyncData(
	() => `content-${contentPath.value}`,
	() => queryCollection("software").all(),
);
</script>
<template>
	<MainContent class="container grid content-start py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">Software</h1>
		<div class="font-heading py-8">
			OpenAtlas uses solely open source technology. It is and always will be free of charge and open
			source to guarantee continued usage. The code is freely available on
			<NuxtLink
				class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
				href="https://github.com/craws/OpenAtlas"
				target="_blank"
				>GitHub</NuxtLink
			>. Have a look at the list below for an overview of used technologies.
		</div>
		<div v-if="software != null && software.length > 0">
			<SoftwareCard
				v-for="item in software"
				:software="item"
				:key="item.id"
				class="mb-7"
			></SoftwareCard>
		</div>
	</MainContent>
</template>
