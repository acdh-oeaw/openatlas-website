<template>
	<NuxtLayout>
		<UApp>
			<NuxtPage />
		</UApp>
		<NuxtLoadingIndicator class="bg-neutral-950" :color="false" />
		<TailwindIndicator />
		<NuxtRouteAnnouncer />
	</NuxtLayout>
</template>
