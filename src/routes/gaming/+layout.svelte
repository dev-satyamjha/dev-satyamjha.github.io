<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { goto } from '$app/navigation';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';

	let { children } = $props();

	function warpTo(route: string) {
		audioManager.play('warp');
		goto(route);
	}
</script>

<div class="fixed inset-0 overflow-y-auto flex flex-col font-mono bg-[#09090b] text-white selection:bg-rose-500 selection:text-white">
	<div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(192,132,252,0.08),transparent_60%)] pointer-events-none"></div>

	<header class="relative z-30 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-rose-500/30 px-3 sm:px-6 py-3 flex items-center justify-between text-xs select-none">
		<div class="flex items-center gap-3">
			<a
				href="/"
				onclick={() => audioManager.play('warp')}
				class="flex items-center gap-2 hover:opacity-80 transition-opacity"
			>
				<span class="nf text-rose-400 text-lg">{'\uf11b'}</span>
				<span class="font-bold tracking-widest uppercase text-white hidden sm:inline">ARCADE REALM</span>
			</a>
		</div>

		<div class="flex items-center gap-3 text-xs">
			<button
				type="button"
				onclick={() => warpTo('/clean')}
				class="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
			>
				<span class="nf text-xs text-blue-400">{'\uf108'}</span>
				<span>Clean Modern</span>
			</button>

			<button
				type="button"
				onclick={() => warpTo('/linux')}
				class="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-purple-500 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
			>
				<span class="nf text-xs text-purple-400">{'\uf303'}</span>
				<span>Linux Hyprland</span>
			</button>

			<button
				type="button"
				onclick={() => warpTo('/macos')}
				class="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
			>
				<span class="nf text-xs text-amber-400">{'\uf179'}</span>
				<span>macOS Sonoma</span>
			</button>

			<LanguageToggle variant="compact" />
			<AudioToggle variant="compact" />

			<a
				href="/"
				onclick={() => audioManager.play('warp')}
				class="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold text-[11px] hover:bg-rose-900 transition-colors flex items-center gap-1 cursor-pointer"
			>
				<span class="nf text-xs">{'\uf14e'}</span>
				<span class="hidden sm:inline">Portal</span>
			</a>
		</div>
	</header>

	<div class="relative z-20 flex-1 w-full p-3 sm:p-6 flex flex-col items-center justify-start">
		{@render children()}
	</div>
</div>
