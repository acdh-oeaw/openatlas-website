<script setup lang="ts">
import type { TeamCollectionItem } from "@nuxt/content";

const props = defineProps<{
	member: TeamCollectionItem | undefined;
}>();
</script>

<template>
	<section v-if="props.member">
		<div class="grid gap-4 md:gap-6 md:grid-cols-[auto_1fr] py-8 lg:py-0">
			<div class="md:mb-5">
				<NuxtImg
					v-if="props.member.image"
					:src="props.member.image"
					:alt="props.member.name"
					class="w-40 object-cover"
				/>
				<div class="text-xs text-gray-400 mt-2">{{ props.member.credit }}</div>
			</div>

			<div class="flex flex-col gap-2 leading-[1.75]">
				<div class="md:pb-2">
					<h2 class="text-lg font-semibold">
						{{ props.member.name }}
					</h2>
					<p class="text-gray-500">
						{{ props.member.role }}
					</p>
					<a
						v-if="props.member.email"
						:href="`mailto:${props.member.email}`"
						class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
					>
						{{ props.member.email }}
					</a>
				</div>

				<ContentRenderer :value="props.member" />
			</div>
		</div>
	</section>
</template>
