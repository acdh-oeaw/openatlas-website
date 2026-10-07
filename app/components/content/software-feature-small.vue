<script setup lang="ts">
const props = defineProps<{
	image?: string;
	ascpectVideo?: boolean;
	video?: string;
	buttonLinks?: Array<{ title: string; link: string }>;
	reverse?: boolean;
	color?: boolean;
	shadow?: boolean;
}>();
</script>

<template>
	<div :class="props.color ? 'pt-8' : ''">
		<section
			class="group relative isolate before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:-z-10"
			:class="
				(props.color ? 'before:bg-primary/20' : '') || (props.ascpectVideo ? 'py-0 pb-3' : 'py-8 ')
			"
		>
			<div
				class="grid items-center gap-2 lg:grid-cols-2 lg:gap-15 z-20"
				:class="{ 'lg:[&>*:first-child]:order-2': reverse }"
			>
				<div
					class="rounded-2xl scale-100 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
					:class="props.ascpectVideo ? 'aspect-video' : 'h-full'"
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
						:class="props.shadow ? 'shadow-xl/20' : ''"
					/>
				</div>

				<div class="max-w-xl">
					<div class="[&_h2]:mt-0 [&_h2]:text-4xl pt-2 [&_h2]:text-black">
						<slot />
					</div>

					<div
						v-if="props.buttonLinks != null && props.buttonLinks.length > 0"
						class="flex flex-row gap-4 pt-4"
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
	</div>
</template>
