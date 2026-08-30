<script lang="ts">
	import CleanNav from '$lib/components/clean/CleanNav.svelte';
	import VisitorCounter from '$lib/components/clean/VisitorCounter.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';

	let { children } = $props();
	let isLight = $derived(colorModeStore.current === 'light');
</script>

<div
	class="min-h-screen font-sans flex flex-col justify-between selection:bg-[#89b4fa] selection:text-[#11111b] transition-colors duration-300"
	class:bg-[#09090b]={!isLight}
	class:text-[#f4f4f5]={!isLight}
	class:bg-[#eaedf2]={isLight}
	class:text-[#0f172a]={isLight}
>
	<CleanNav />

	<div class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		{@render children()}
	</div>

	<footer
		class="w-full border-t py-8 text-xs font-mono transition-colors duration-300"
		class:border-[#27272a]={!isLight}
		class:bg-[#09090b]={!isLight}
		class:text-[#a6adc8]={!isLight}
		class:border-slate-300={isLight}
		class:bg-[#ffffff]={isLight}
		class:text-slate-600={isLight}
	>
		<div
			class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
		>
			<div class="flex items-center gap-3">
				<span>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}.</span>
				<VisitorCounter />
			</div>

			<div class="flex items-center gap-4">
				<a
					href="/"
					onclick={() => audioManager.play('warp')}
					class="transition-colors flex items-center gap-1.5"
					class:hover:text-white={!isLight}
					class:hover:text-blue-600={isLight}
				>
					<span class="nf text-xs text-[#89b4fa]">{'\uf14e'}</span>
					<span>{localeStore.dict.common.backToPortal}</span>
				</a>
				<span>&bull;</span>
				<span>Clean Modern Theme</span>
			</div>
		</div>
	</footer>
</div>
