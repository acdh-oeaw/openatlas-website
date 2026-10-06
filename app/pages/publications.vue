<script setup lang="ts">
const route = useRoute();

const contentPath = computed(() => {
	if (route.path === "/") {
		return "/";
	}

	return route.path;
});

const { data: content } = await useAsyncData(
	() => `content-${contentPath.value}`,
	() => queryCollection("pages").path(`${contentPath.value}`).first(),
);
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<h1 class="font-heading text-4xl font-medium pb-5 border-b border-neutral-300">
			{{ content?.title }}
		</h1>
		<div class="prose-publications">
			<ContentRenderer v-if="content?.body" :value="content.body"> </ContentRenderer>
		</div>
	</MainContent>
</template>
