<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		size?: number;
	}>(),
	{
		size: 40,
	},
);
</script>

<template>
	<div :style="{ height: `${props.size}px` }" aria-hidden="true" />
</template>
