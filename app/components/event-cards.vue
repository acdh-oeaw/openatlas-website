<script setup lang="ts">
import type { EventsCollectionItem } from "@nuxt/content";

const props = defineProps<{
	events: Array<EventsCollectionItem>;
}>();
</script>

<template>
	<article v-for="entry in props.events" :key="entry.id" class="py-4">
		<p class="text-sm text-neutral-500">
			{{ entry.date }}
		</p>

		<h3 class="text-base font-medium">
			<NuxtLink
				v-if="entry.eventLink"
				class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
				:href="entry.eventLink"
				target="_blank"
				rel="noopener noreferrer"
			>
				{{ entry.event }}
			</NuxtLink>

			<template v-else>
				{{ entry.event }}
			</template>
		</h3>
		<div class="text-sm">
			<p v-if="entry.eventTitle" class="font-semibold">
				{{ entry.eventTitle }}
			</p>

			<ul v-if="entry.titles?.length">
				<li v-for="title in entry.titles" :key="title">
					{{ title }}
				</li>
			</ul>

			<p v-if="entry.country || entry.city || entry.institution">
				<span v-if="entry.country">{{ entry.country }}</span>
				<span v-if="entry.city">, {{ entry.city }}</span>
				<span v-if="entry.institution">, {{ entry.institution }}</span>
			</p>

			<div v-if="entry.documents?.length" class="flex flex-row gap-1">
				<span>Documents: </span>

				<span v-for="(document, index) in entry.documents" :key="document.url">
					<NuxtLink
						:href="document.url"
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
					>
						{{ document.label }}{{ index === entry.documents.length - 1 ? "" : "," }}
					</NuxtLink>
				</span>
			</div>
		</div>
	</article>
</template>
