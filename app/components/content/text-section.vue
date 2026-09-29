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
				'grid md:grid-cols-2 gap-12 items-center p-4',
				variant === 'dark' && 'container grid md:grid-cols-[1fr_auto] my-10',
			]"
		>
			<NuxtImg
				v-if="imageSide === 'left'"
				:src="image"
				:class="props.shadow ? 'shadow-xl/20 rounded-lg aspect-[4/3]' : 'aspect-[4/3]'"
			/>

			<div>
				<slot />

				<div v-if="props.buttons && props.buttons.length > 0">
					<div class="flex flex-row gap-4 pt-4">
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

			<NuxtImg
				v-if="imageSide === 'right'"
				:src="image"
				:class="props.shadow ? 'shadow-xl/20 rounded-lg w-700 aspect-[4/3]' : 'aspect-[4/3]'"
			/>
		</div>
	</section>
</template>
