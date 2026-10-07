<script setup lang="ts">
export type ButtonContent = {
	title: string;
	link: string;
	outline: boolean;
};

const props = defineProps<{
	image?: string;
	imageSide?: "left" | "right";
	variant?: "default" | "dark";
	shadow?: boolean;
	buttons?: Array<ButtonContent>;
}>();
</script>
<template>
	<section
		:class="[
			variant === 'dark' && 'relative left-1/2 -translate-x-1/2 w-screen bg-black/90 text-white',
		]"
	>
		<div
			:class="[
				'grid lg:grid-cols-2 md:gap-12 gap-4 items-center py-4',
				variant === 'dark' && 'container px-8 grid md:grid-cols-[1fr_auto] my-10',
			]"
		>
			<!-- Left image -->
			<NuxtImg
				v-if="imageSide === 'left'"
				:src="image"
				class="order-2 md:order-1"
				:class="props.shadow ? 'shadow-xl/20 rounded-lg aspect-4/3' : 'aspect-[4/3]'"
			/>
			<!-- Text -->
			<div class="order-1" :class="imageSide === 'right' ? 'md:order-1' : 'md:order-2'">
				<slot />
				<div v-if="props.buttons && props.buttons.length > 0">
					<div class="flex flex-row flex-wrap md:flex-nowrap gap-4 lg:pt-4 pt-6">
						<LazyUButton
							v-for="button in props.buttons"
							:key="button.title"
							:class="[
								'font-heading text-white',
								button.outline ? 'border' : 'bg-white text-black',
							]"
							:variant="button.outline ? 'outline' : 'solid'"
							size="xl"
							:to="button.link"
							target="_blank"
						>
							{{ button.title }}
						</LazyUButton>
					</div>
				</div>
			</div>
			<!-- Right image -->
			<NuxtImg
				v-if="imageSide === 'right'"
				:src="image"
				class="order-2 md:order-2"
				:class="
					props.shadow
						? 'shadow-xl/20 rounded-lg w-700 aspect-4/3 object-contain'
						: 'aspect-4/3 object-contain mx-auto'
				"
			/>
		</div>
	</section>
</template>
