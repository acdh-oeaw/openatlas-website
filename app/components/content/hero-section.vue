<script setup lang="ts">
const props = defineProps<{
	buttonLinks?: Array<{ title: string; link: string }> | null;
	newsDate?: string | null;
	currentVersion?: string | null;
	images: Array<{ src: string; alt?: string | undefined }> | null;
	logo?: string;
	textCentered?: boolean;
}>();
</script>

<template>
	<div class="grid grid-cols-2 gap-5">
		<div
			:class="[
				'flex flex-col gap-2 [&_h1]:font-heading [&_h1]:text-black [&_h1]:font-medium [&_h1]:text-[2.5rem]/12 [&_h1]:border-none [&_h1]:pb-0 [&_h1]:mb-0',
				{ 'justify-center': props.textCentered },
			]"
		>
			<div v-if="props.logo">
				<NuxtImg class="block w-44" preload :src="props.logo" />
			</div>
			<slot />
			<div
				v-if="props.buttonLinks != null && props.buttonLinks.length > 0"
				class="flex flex-row gap-4"
			>
				<div
					v-if="props.buttonLinks != null && props.buttonLinks.length > 0"
					class="flex flex-row gap-4"
				>
					<div v-for="(button, index) in buttonLinks" :key="button.title">
						<UButton
							color="neutral"
							class="border uppercase"
							:variant="index % 2 === 0 ? 'outline' : 'solid'"
							size="xl"
							:to="button.link"
							target="_blank"
							>{{ button.title }}</UButton
						>
					</div>
				</div>
			</div>
			<NuxtImg
				v-if="props.images != null && props.images.length > 1"
				:alt="props.images[1]?.alt"
				class="block object-contain my-7"
				preload
				:src="props.images[1]?.src"
			/>

			<div v-if="props.newsDate != null && props.currentVersion != null">
				<div class="flex flex-row items-center gap-2 mb-2">
					<UBadge size="xl" lass="bg-secondary">News</UBadge>
					<span>{{ props.newsDate }}</span>
				</div>
				<div class="flex flex-row gap-1.5 items-end">
					<span>OpenAtlas version</span>
					<span>{{ props.currentVersion }}</span>
					<NuxtLink
						class="text-sm text-primary opacity-80 font-semibold hover:opacity-100 transition"
						href="/news"
						target="_blank"
						>read more</NuxtLink
					>
				</div>
			</div>
		</div>
		<NuxtImg
			v-if="props.images != null"
			:alt="props.images[0]?.alt"
			class="block object-contain w-600 aspect-square"
			preload
			:src="props.images[0]?.src"
		/>
	</div>
</template>
