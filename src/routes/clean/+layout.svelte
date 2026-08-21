<script lang="ts">
	import CleanNav from '$lib/components/clean/CleanNav.svelte';
	import VisitorCounter from '$lib/components/clean/VisitorCounter.svelte';
	import CleanThemeToggle from '$lib/components/clean/CleanThemeToggle.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans flex flex-col justify-between selection:bg-[#89b4fa] selection:text-[#11111b]">
	<CleanNav />

	<div class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		{@render children()}
	</div>

	<footer class="w-full border-t border-[#27272a] bg-[#09090b] py-8 text-xs font-mono text-[#a6adc8]">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<span>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}.</span>
				<VisitorCounter />
			</div>

			<div class="flex items-center gap-4">
				<CleanThemeToggle />
				<a
					href="/"
					onclick={() => audioManager.play('warp')}
					class="hover:text-white transition-colors flex items-center gap-1.5"
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
