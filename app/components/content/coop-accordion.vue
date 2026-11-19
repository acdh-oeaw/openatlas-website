<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();

const items = [
	{
		label: props.label || "Additional information",
		icon: "i-lucide-info",
		slot: "information",
	},
];
</script>

<template>
	<div class="py-4">
		<UAccordion
			:items="items"
			:ui="{
				label: 'ml-2 font-heading group-hover:border-b',
				root: 'rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors px-4',
				trigger: 'py-4 text-base font-semibold',
				trailingIcon: 'text-neutral-500',
				content: 'pb-4 text-neutral-700',
			}"
		>
			<template #information>
				<slot />
			</template>
		</UAccordion>
	</div>
</template>
