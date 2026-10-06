<script setup lang="ts">
const route = useRoute();

const t = useTranslations();

usePageMetadata({
	title: t("StatementPage.meta.title"),
});

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
	<MainContent class="grid content-start py-8">
		<template v-if="content != null">
			<div class="container">
				<ContentRenderer v-if="content.body" :value="content.body" />
			</div>
		</template>
	</MainContent>
</template>
