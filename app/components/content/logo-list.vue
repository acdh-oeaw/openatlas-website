<script setup lang="ts">
type Logo = {
	image?: string;
	href?: string;
};
const props = defineProps<{
	logos: Array<Logo>;
}>();
</script>

<template>
	<div class="w-full justify-center flex text-center text-neutral-500 pb-2">
		<slot />
	</div>
	<div class="relative flex flex-row flex-wrap justify-center lg:flex-nowrap gap-6 mt-6 mb-4">
		<div
			v-for="logo in props.logos"
			:key="logo.image"
			class="lg:h-10 flex items-center justify-center rounded bg-white"
		>
			<NuxtLink
				v-if="logo.href"
				:href="logo.href"
				target="_blank"
				rel="noopener noreferrer"
				class="flex h-10 lg:h-20 items-center justify-center"
			>
				<NuxtImg
					:src="logo.image"
					alt=""
					class="max-w-full opacity-full max-h-full object-contain hover:opacity-80 transition duration-200"
				/>
			</NuxtLink>
		</div>
	</div>
</template>
