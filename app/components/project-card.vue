<script setup lang="ts">
import type { ProjectsCollectionItem } from "@nuxt/content";
import { unknown } from "valibot";

const props = defineProps<{
	project: ProjectsCollectionItem | undefined;
	selectedDomains: Array<string>;
	selectedStatus: Array<string>;
}>();
</script>

<template>
	<section v-if="props.project">
		<div class="grid gap-6 md:gap-20 md:grid-cols-[auto_1fr] py-8">
			<div class="mb-5 flex flex-col lg:items-center">
				<NuxtImg
					v-if="props.project.image"
					:src="props.project.image"
					:alt="props.project.title"
					class="w-60 object-cover"
				/>
				<div class="text-xs text-gray-400 mt-2 max-w-60 text-center break-words">
					{{ props.project.credit }}
				</div>
			</div>

			<div class="flex flex-col gap-2 leading-[1.75]">
				<div class="pb-2">
					<h2 class="text-lg font-semibold mt-0.5">
						{{ props.project.title }}
					</h2>
					<div class="mb-5">
						<p class="text-gray-500 text-pretty">
							{{ props.project.yearStart }} - {{ props.project.yearEnd }}
						</p>
						<p class="text-gray-500 text-pretty">
							Principal Investigator (PI): {{ props.project.pi }}
						</p>
						<p v-if="props.project.presentationSite">
							Resulting project data can be explored at the
							<NuxtLink
								class="text-primary border-b border-transparent hover:border-primary font-medium rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary transition-colors [&>code]:transition-colors"
								:href="props.project.presentationSite"
								target="_blank"
								>presentation site.</NuxtLink
							>
						</p>
					</div>
					<p class="text-gray-700 text-pretty">
						{{ props.project.description }}
					</p>

					<div
						v-if="props.project.logos && props.project.logos.length > 0"
						class="relative flex flex-wrap md:flex-row gap-6 mt-8"
					>
						<div
							v-for="logo in props.project.logos"
							:key="logo.imageSource"
							class="h-10 flex items-center md:justify-center rounded bg-white"
						>
							<NuxtImg
								:src="logo.imageSource"
								alt=""
								class="max-w-full max-h-full object-contain"
							/>
						</div>
					</div>

					<div class="flex flex-wrap gap-2 mt-8">
						<div
							v-for="tag in project?.statusTags"
							:key="tag"
							type="button"
							class="rounded-full border px-2.5 py-1 text-xs uppercase transition cursor-default"
							:class="
								selectedStatus.includes(tag)
									? 'border-neutral-600 bg-neutral-600 text-white'
									: 'border-neutral-500 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
							"
						>
							{{ tag }}
						</div>

						<div
							v-for="tag in project?.domainTags"
							:key="tag"
							type="button"
							class="rounded-full border px-2.5 py-1 text-xs uppercase transition cursor-default"
							:class="
								selectedDomains.includes(tag)
									? 'border-neutral-600 bg-neutral-600 text-white'
									: 'border-neutral-500 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
							"
						>
							{{ tag }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
