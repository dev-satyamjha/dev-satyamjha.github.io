<script lang="ts">
	import { onMount } from 'svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { goto } from '$app/navigation';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';

	let stardate = $state('');
	let isWarpMenuOpen = $state(false);

	onMount(() => {
		function updateStardate() {
			const now = new Date();
			const year = now.getFullYear();
			const dayOfYear = Math.floor(
				(now.getTime() - new Date(year, 0, 0).getTime()) / 1000 / 60 / 60 / 24
			);
			const fraction = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
			stardate = `${year}${(dayOfYear + fraction).toFixed(1)}`;
		}
		updateStardate();
		const interval = setInterval(updateStardate, 1000);
		return () => clearInterval(interval);
	});

	function warpTo(route: string) {
		audioManager.play('warp');
		isWarpMenuOpen = false;
		goto(route);
	}
</script>

<header
	class="w-full bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 flex items-center justify-between font-mono text-xs text-cyan-300 z-30 select-none"
>
	<div class="flex items-center gap-3 sm:gap-6">
		<div class="flex items-center gap-2 font-bold text-white tracking-widest uppercase">
			<span class="nf text-cyan-400 text-sm">{'\uf135'}</span>
			<span class="hidden sm:inline">USS-SATYAM // DEEP SPACE HUD</span>
			<span class="sm:hidden text-xs text-cyan-400">USS-SATYAM</span>
		</div>

		<div
			class="hidden md:flex items-center gap-4 text-[10px] text-cyan-400/70 border-l border-cyan-500/20 pl-4"
		>
			<div><span class="text-white/50">COORDINATES:</span> RA 18h 36m &bull; DEC +38° 47'</div>
			<div>
				<span class="text-white/50">REACTOR:</span>
				<span class="text-emerald-400">98.6% NOMINAL</span>
			</div>
			<div><span class="text-white/50">SHIELDS:</span> <span class="text-cyan-300">100%</span></div>
		</div>
	</div>

	<div class="flex items-center gap-3 sm:gap-4 text-xs">
		<div
			class="hidden sm:block text-[11px] text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg"
		>
			<span class="text-white/50">SD:</span>
			{stardate}
		</div>

		<div class="relative">
			<button
				type="button"
				onclick={() => (isWarpMenuOpen = !isWarpMenuOpen)}
				class="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
			>
				<span class="nf text-xs">{'\uf018'}</span>
				<span>Warp Core</span>
			</button>

			{#if isWarpMenuOpen}
				<div
					class="absolute top-9 right-0 w-60 rounded-2xl bg-[#030712]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl p-2 space-y-1 text-xs text-cyan-300 animate-in fade-in duration-100 z-50"
				>
					<div class="px-2.5 py-1 text-[10px] text-white/40 uppercase tracking-widest font-bold">
						Warp Coordinates
					</div>
					<button
						type="button"
						onclick={() => warpTo('/clean')}
						class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>Dimension: Clean Modern</span>
						<span class="nf text-xs">{'\uf108'}</span>
					</button>
					<button
						type="button"
						onclick={() => warpTo('/linux')}
						class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>Dimension: Linux Hyprland</span>
						<span class="nf text-xs">{'\uf303'}</span>
					</button>
					<button
						type="button"
						onclick={() => warpTo('/macos')}
						class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>Dimension: macOS Sonoma</span>
						<span class="nf text-xs">{'\uf179'}</span>
					</button>
					<button
						type="button"
						onclick={() => warpTo('/gaming')}
						class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>Dimension: Arcade Realm</span>
						<span class="nf text-xs">{'\uf11b'}</span>
					</button>
					<div class="h-px bg-cyan-500/20 my-1"></div>
					<button
						type="button"
						onclick={() => warpTo('/')}
						class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>Gateway Portal</span>
						<span class="nf text-xs">{'\uf14e'}</span>
					</button>
				</div>
			{/if}
		</div>

		<LanguageToggle variant="compact" />
		<AudioToggle variant="compact" />
	</div>
</header>
