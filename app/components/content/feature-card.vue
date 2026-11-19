<script setup lang="ts">
const props = defineProps<{
	tags?: Array<string>;
	image?: string;
	color: boolean;
}>();
</script>

<template>
	<section class="group relative w-full py-4 sm:pt-4 lg:pt-8">
		<div
			class="h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
			:class="props.color ? 'bg-primary/20' : 'bg-white'"
		>
			<div v-if="props.image" class="relative aspect-[16/9] sm:aspect-4/3 overflow-hidden">
				<NuxtImg
					:src="props.image"
					:alt="props.image"
					class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				/>

				<div
					v-if="props.tags?.length"
					class="absolute bottom-2 left-2 z-10 flex flex-wrap gap-1.5 sm:bottom-3 sm:left-3"
				>
					<span
						v-for="tag in props.tags"
						:key="tag"
						class="rounded-full bg-white/90 px-2 py-1 text-[10px] sm:text-xs text-black backdrop-blur-sm"
					>
						{{ tag }}
					</span>
				</div>
			</div>

			<div class="px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:pb-10">
				<div
					class="text-sm sm:text-base [&_h2]:mt-0 [&_h2]:mb-2 [&_h2]:text-lg sm:[&_h2]:text-xl lg:[&_h2]:text-2xl [&_h2]:text-black"
				>
					<slot />
				</div>
			</div>
		</div>
	</section>
</template>
