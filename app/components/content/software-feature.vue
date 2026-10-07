<script setup lang="ts">
const props = defineProps<{
	logo?: string;
	image?: string;
	video?: string;
	buttonLinks?: Array<{ title: string; link: string }>;
	reverse?: boolean;
}>();
</script>

<template>
	<section
		class="pt-8 md:py-16 group relative isolate before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:-z-10 even:before:bg-primary/20"
	>
		<div class="grid items-center gap-2 md:grid-cols-2 md:gap-15 z-20">
			<div
				:class="[
					'my-10 order-2 aspect-4/3 overflow-hidden rounded-2xl scale-100 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]',
					reverse ? 'md:order-2' : 'md:order-1',
				]"
			>
				<video
					v-if="props.video"
					:src="props.video"
					autoplay
					muted
					loop
					playsinline
					class="absolute inset-0 z-50 size-full object-cover rounded-3xl"
				/>

				<NuxtImg
					v-else-if="props.image"
					:src="props.image"
					:alt="props.image"
					preload
					class="absolute inset-0 z-50 object-cover size-full rounded-3xl bg-white"
				/>
			</div>

			<div :class="['order-1 max-w-xl pt-8', reverse ? 'md:order-1' : 'md:order-2']">
				<NuxtImg v-if="props.logo" :src="props.logo" alt="" class="w-44" />

				<div class="[&_h2]:mt-0 [&_h2]:text-4xl pt-2 [&_h2]:text-black">
					<slot />
				</div>

				<div
					v-if="props.buttonLinks != null && props.buttonLinks.length > 0"
					class="flex flex-row flex-wrap lg:flex-nowrap gap-4 md:pt-4 pt-6"
				>
					<div v-for="(button, index) in buttonLinks" :key="button.title">
						<UButton
							color="neutral"
							class="border uppercase"
							:variant="index % 2 === 0 ? 'outline' : 'solid'"
							size="xl"
							:to="button.link"
							target="_blank"
							:class="[index % 2 === 0 ? 'bg-none' : '']"
							>{{ button.title }}
						</UButton>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
