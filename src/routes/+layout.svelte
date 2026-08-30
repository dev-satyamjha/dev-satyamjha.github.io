<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import SkipLink from '$lib/components/shared/SkipLink.svelte';
	import ThemeSwitcher from '$lib/components/shared/ThemeSwitcher.svelte';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';
	import DiaryButton from '$lib/components/shared/DiaryButton.svelte';
	import ColorModeToggle from '$lib/components/shared/ColorModeToggle.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';

	let { children } = $props();

	$effect(() => {
		const pathname = page.url.pathname;
		const currentTheme = themeStore.getThemeFromPath(pathname);
		themeStore.setTheme(currentTheme);
	});

	onMount(() => {
		document.documentElement.lang = localeStore.current;
		colorModeStore.apply();
	});
</script>

<SEOHead pathname={page.url.pathname} />
<SkipLink />

{@render children()}

<DiaryButton />

<div class="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:gap-3">
	<ThemeSwitcher />
	<ColorModeToggle variant="compact" />
	<LanguageToggle variant="compact" />
	<AudioToggle variant="compact" />
</div>
