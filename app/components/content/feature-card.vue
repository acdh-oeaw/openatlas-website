<script setup lang="ts">
const props = defineProps<{
	tags: Array<string>;
	image?: string;
	color: boolean;
}>();
</script>

<template>
	<section class="pt-8 group relative w-full">
		<div
			class="overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
			:class="props.color ? 'bg-primary/20' : 'bg-white'"
		>
			<div v-if="props.image" class="relative aspect-[4/3] overflow-hidden">
				<NuxtImg
					:src="props.image"
					:alt="props.image"
					preload
					class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				/>

				<!-- Tags over image -->
				<div v-if="props.tags?.length" class="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
					<span
						v-for="tag in props.tags"
						:key="tag"
						class="rounded-full bg-white/90 px-2 py-1 text-xs text-black backdrop-blur-sm"
					>
						{{ tag }}
					</span>
				</div>
			</div>
			<div class="px-10 pb-10">
				<div class="[&_h2]:mt-0 [&_h2]:text-2xl [&_h2]:text-black text-sm">
					<slot />
				</div>
			</div>

			<!--Tags in the card-->
			<!-- <div class="px-5 pb-5">
				<div class="[&_h2]:mt-0 [&_h2]:text-2xl [&_h2]:text-black text-sm">
					<slot />
				</div>

				<div v-if="props.tags?.length" class="mt-4 flex flex-wrap gap-2">
					<span
						v-for="tag in props.tags"
						:key="tag"
						class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
					>
						{{ tag }}
					</span>
				</div>
			</div> -->
		</div>
	</section>
</template>
