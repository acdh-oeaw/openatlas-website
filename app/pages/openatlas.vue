<script setup lang="ts">
const t = useTranslations();

usePageMetadata({
	title: t("OpenAtlasPage.meta.title"),
});

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
	<MainContent class="grid content-start pb-8">
		<template v-if="content != null">
			<div class="container">
				<ContentRenderer v-if="content.body" :value="content.body" />
			</div>
		</template>
	</MainContent>
</template>
