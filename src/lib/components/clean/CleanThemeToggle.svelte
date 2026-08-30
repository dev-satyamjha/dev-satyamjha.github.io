<script lang="ts">
	import ColorModeToggle from '$lib/components/shared/ColorModeToggle.svelte';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
</script>

<ColorModeToggle variant="icon" class={customClass} />
