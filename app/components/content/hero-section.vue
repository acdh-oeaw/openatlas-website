<script setup lang="ts">
const props = defineProps<{
	buttonLinks?: Array<{ title: string; link: string; icon?: string }> | null;
	newsDate?: string | null;
	currentVersion?: string | null;
	images: Array<{ src: string; alt?: string | undefined }> | null;
	logo?: string;
	textCentered?: boolean;
}>();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-8 md:py-10 lg:py-0">
		<div
			:class="[
				'flex min-w-0 flex-col gap-2 [&_h1]:mb-0 [&_h1]:border-none [&_h1]:pb-0 [&_h1]:font-heading [&_h1]:text-[2rem]/10 [&_h1]:font-medium [&_h1]:text-black md:[&_h1]:text-[2.5rem]/12',
				{ 'justify-center': props.textCentered },
			]"
		>
			<div v-if="props.logo">
				<NuxtImg class="block w-36 max-w-full md:w-44" preload :src="props.logo" />
			</div>
			<slot />
			<div
				v-if="props.buttonLinks?.length"
				class="flex flex-col gap-3 flex-row sm:flex-wrap sm:gap-4"
			>
				<UButton
					v-for="(button, index) in props.buttonLinks"
					:key="button.title"
					:leading-icon="button.icon"
					color="neutral"
					class="border uppercase"
					:variant="index % 2 === 0 ? 'outline' : 'solid'"
					size="xl"
					:to="button.link"
					target="_blank"
				>
					{{ button.title }}
				</UButton>
			</div>

			<NuxtImg
				v-if="props.images && props.images.length > 1"
				:alt="props.images[1]?.alt"
				class="my-5 block w-full max-w-full object-contain md:my-7"
				preload
				:src="props.images[1]?.src"
			/>

			<div v-if="props.newsDate != null && props.currentVersion != null" class="mt-2">
				<div class="mb-2 flex flex-row items-center gap-2">
					<UBadge size="xl" class="bg-primary"> News </UBadge>
					<span>{{ props.newsDate }}</span>
				</div>
				<div class="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 md:pb-8">
					<span>OpenAtlas version</span> <span>{{ props.currentVersion }}</span>
					<NuxtLink
						class="text-sm font-semibold text-primary opacity-80 transition hover:opacity-100"
						href="/news"
						target="_blank"
					>
						read more
					</NuxtLink>
				</div>
			</div>
		</div>

		<div class="min-w-0">
			<NuxtImg
				v-if="props.images?.length"
				:alt="props.images[0]?.alt"
				class="block aspect-square w-full max-w-full object-contain"
				preload
				:src="props.images[0]?.src"
			/>
		</div>
	</div>
</template>
