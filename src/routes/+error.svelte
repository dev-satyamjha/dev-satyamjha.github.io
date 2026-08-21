<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { audioManager } from '$lib/stores/audio.svelte';
	import SEOHead from '$lib/components/shared/SEOHead.svelte';

	const status = $derived(page.status || 404);
	const message = $derived(
		page.error?.message || 'The requested dimension has collapsed into the cosmic void.'
	);

	function warpTo(route: string) {
		audioManager.play('warp');
		goto(route);
	}
</script>

<SEOHead
	title="Dimension Lost | 404 Void"
	description="The coordinates you requested lead to an uncharted sector of the void."
/>

<div class="fixed inset-0 bg-[#05050f] flex flex-col items-center justify-center p-4 sm:p-8 font-mono text-cyan-300 selection:bg-rose-500 selection:text-white select-none overflow-y-auto">
	<div class="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none"></div>
	<div class="fixed inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

	<div class="relative z-10 max-w-2xl w-full p-6 sm:p-10 rounded-3xl bg-[#0b1329]/80 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.15)] space-y-6 text-center">
		<div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs tracking-widest uppercase animate-pulse">
			<span class="nf text-sm">{'\uf071'}</span>
			<span>QUANTUM ANOMALY DETECTED</span>
		</div>

		<div class="space-y-2">
			<h1 class="text-6xl sm:text-7xl font-bold text-white tracking-widest font-mono drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
				{status}
			</h1>
			<div class="text-base sm:text-lg font-bold text-cyan-300 uppercase tracking-wider">
				DIMENSION COLLAPSE // VOID COORDINATES
			</div>
			<p class="text-xs sm:text-sm text-cyan-100/70 font-sans leading-relaxed max-w-lg mx-auto">
				{message}
			</p>
		</div>

		<div class="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left text-xs space-y-2">
			<div class="text-[10px] text-white/50 uppercase tracking-widest font-bold">Emergency Telemetry</div>
			<div class="flex justify-between text-[11px]">
				<span class="text-white/40">ANOMALOUS ROUTE:</span>
				<span class="text-rose-400 font-bold">{page.url.pathname}</span>
			</div>
			<div class="flex justify-between text-[11px]">
				<span class="text-white/40">SYSTEM RECOVERY:</span>
				<span class="text-emerald-400 font-bold">STABLE PORTALS ONLINE</span>
			</div>
		</div>

		<div class="space-y-3 pt-2">
			<div class="text-[10px] text-white/40 uppercase tracking-widest font-bold">Select Rescue Destination</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
				<button
					type="button"
					onclick={() => warpTo('/')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf14e'}</span>
					<span>Gateway</span>
				</button>
				<button
					type="button"
					onclick={() => warpTo('/clean')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-blue-500 hover:text-black border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf108'}</span>
					<span>Clean</span>
				</button>
				<button
					type="button"
					onclick={() => warpTo('/linux')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-purple-500 hover:text-black border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf303'}</span>
					<span>Linux</span>
				</button>
				<button
					type="button"
					onclick={() => warpTo('/macos')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-amber-500 hover:text-black border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf179'}</span>
					<span>macOS</span>
				</button>
				<button
					type="button"
					onclick={() => warpTo('/space')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-400 hover:text-black border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf135'}</span>
					<span>Space</span>
				</button>
				<button
					type="button"
					onclick={() => warpTo('/gaming')}
					class="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-rose-500 hover:text-white border border-cyan-500/30 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
				>
					<span class="nf text-sm">{'\uf11b'}</span>
					<span>Arcade</span>
				</button>
			</div>
		</div>
	</div>
</div>
