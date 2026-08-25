<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { THEME_REGISTRY, themeStore } from '$lib/stores/theme.svelte';
	import type { ThemeConfig, ThemeKey } from '$lib/types/theme';
	import { animateEntrance } from '$lib/utils/animations';
	import PortalDoor from './PortalDoor.svelte';
	import PortalTransition from './PortalTransition.svelte';

	interface Props {
		onselect?: (key: ThemeKey) => void;
	}

	let { onselect }: Props = $props();

	let container: HTMLDivElement | null = $state(null);
	let isTransitioning = $state(false);
	let targetTheme = $state<ThemeConfig | null>(null);

	const PORTAL_THEMES: ThemeConfig[] = [
		THEME_REGISTRY.clean,
		THEME_REGISTRY.linux,
		THEME_REGISTRY.gaming,
		THEME_REGISTRY.space,
		THEME_REGISTRY.macos
	];

	onMount(() => {
		if (container) {
			const cards = container.querySelectorAll<HTMLElement>('.door-card');
			animateEntrance(cards, 0.08);
		}
	});

	function handleThemeSelect(key: ThemeKey) {
		const selectedTheme = THEME_REGISTRY[key];
		targetTheme = selectedTheme;
		isTransitioning = true;
		themeStore.setTheme(key);

		if (onselect) {
			onselect(key);
			return;
		}

		setTimeout(() => {
			goto(selectedTheme.route);
		}, 450);
	}
</script>

<div bind:this={container} class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-4 lg:gap-6"
	>
		{#each PORTAL_THEMES as theme, index (theme.key)}
			<PortalDoor {theme} {index} onselect={handleThemeSelect} />
		{/each}
	</div>
</div>

<PortalTransition activeTheme={targetTheme} {isTransitioning} />
