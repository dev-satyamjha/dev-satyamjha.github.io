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

	let { children } = $props();

	$effect(() => {
		const pathname = page.url.pathname;
		const currentTheme = themeStore.getThemeFromPath(pathname);
		themeStore.setTheme(currentTheme);
	});

	onMount(() => {
		document.documentElement.lang = localeStore.current;
	});
</script>

<SEOHead pathname={page.url.pathname} />
<SkipLink />

{@render children()}

<div class="fixed bottom-4 right-4 z-40 flex items-center gap-2">
	<ThemeSwitcher />
	<LanguageToggle variant="compact" />
	<AudioToggle variant="compact" />
</div>
