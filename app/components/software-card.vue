<script setup lang="ts">
import type { SoftwareCollectionItem } from "@nuxt/content";

const props = defineProps<{
	software: SoftwareCollectionItem | undefined;
}>();
</script>

<template>
	<section v-if="props.software" class="py-2">
		<div class="grid gap-6 md:grid-cols-[auto_1fr]">
			<div class="mb-5">
				<NuxtImg
					v-if="props.software.image"
					:src="props.software.image"
					:alt="props.software.name"
					class="w-40 h-fit object-contain"
				/>
			</div>

			<div class="flex flex-col gap-2 leading-[1.75]">
				<div class="pb-2">
					<div class="flex flex-row gap-1">
						<h2 class="text-lg font-semibold mt-0.5">
							{{ props.software.name }}
						</h2>
						<p class="text-gray-700 text-pretty">
							{{ props.software.description }}
						</p>
					</div>
					<div class="flex flex-row gap-1">
						<span>Website: </span>
						<a
							target="_blank"
							:href="props.software.link"
							class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
						>
							{{ props.software.link }}
						</a>
					</div>
					<div class="flex flex-row gap-1">
						<span>License: </span>
						<a v-if="props.software.license">
							{{ props.software.license }}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
