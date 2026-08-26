<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';
	import ResumeViewerModal from '$lib/components/shared/ResumeViewerModal.svelte';

	let isDossierOpen = $state(false);

	function openDossier() {
		audioManager.play('click');
		isDossierOpen = true;
	}
</script>

<ResumeViewerModal
	isOpen={isDossierOpen}
	onclose={() => (isDossierOpen = false)}
	themeStyle="space"
/>

<div
	class="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 select-text font-mono text-xs text-cyan-300"
>
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
		<div
			class="md:col-span-4 p-5 rounded-3xl bg-[#0b1329]/80 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 space-y-4 text-center relative overflow-hidden"
		>
			<div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
			<div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
			<div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
			<div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

			<div
				class="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/20"
			>
				<img
					src={PORTFOLIO_DATA.profile.avatar}
					alt={PORTFOLIO_DATA.profile.name}
					width="144"
					height="144"
					class="w-full h-full object-cover filter contrast-105"
				/>
				<div class="absolute inset-0 bg-cyan-500/10 pointer-events-none"></div>
			</div>

			<div class="space-y-1">
				<div class="text-lg font-bold text-white tracking-wider font-mono">
					{PORTFOLIO_DATA.profile.name}
				</div>
				<div class="text-xs text-cyan-400 font-mono tracking-widest uppercase">
					COMMANDER // PILOT
				</div>
				<div class="text-[10px] text-white/60">SECTOR 04 &bull; EARTH PRIME</div>
			</div>

			<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left space-y-1.5">
				<div class="flex items-center justify-between text-[11px]">
					<span class="text-cyan-400">STATUS:</span>
					<span class="text-emerald-400 font-bold">ONLINE (ORBITAL)</span>
				</div>
				<div class="flex items-center justify-between text-[11px]">
					<span class="text-cyan-400">CALLSIGN:</span>
					<span class="text-white">DEV-SATYAMJHA</span>
				</div>
				<div class="flex items-center justify-between text-[11px]">
					<span class="text-cyan-400">SECURITY:</span>
					<span class="text-purple-400">LEVEL 5 CLEARANCE</span>
				</div>
			</div>
		</div>

		<div
			class="md:col-span-8 p-6 rounded-3xl bg-[#0b1329]/80 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 space-y-5 relative overflow-hidden"
		>
			<div class="border-b border-cyan-500/30 pb-3 flex items-center justify-between">
				<div>
					<h2 class="text-lg font-bold text-white tracking-wider uppercase font-mono">
						FLIGHT COMMAND TELEMETRY
					</h2>
					<div class="text-[11px] text-cyan-400 mt-0.5">{PORTFOLIO_DATA.profile.title}</div>
				</div>
				<span
					class="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] tracking-widest uppercase animate-pulse font-mono"
				>
					STATION ACTIVE
				</span>
			</div>

			<div class="space-y-3 text-xs leading-relaxed text-slate-300 font-sans">
				{#each PORTFOLIO_DATA.profile.bio as para}
					<p>{para}</p>
				{/each}
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
				<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
					<div class="text-xl font-bold text-cyan-400 font-mono">400+</div>
					<div class="text-[10px] text-white/50 tracking-wider">VESSEL CREW</div>
				</div>
				<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
					<div class="text-xl font-bold text-emerald-400 font-mono">50+</div>
					<div class="text-[10px] text-white/50 tracking-wider">MISSIONS</div>
				</div>
				<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
					<div class="text-xl font-bold text-amber-400 font-mono">8.1</div>
					<div class="text-[10px] text-white/50 tracking-wider">BIT CGPA</div>
				</div>
				<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
					<div class="text-xl font-bold text-purple-400 font-mono">24+</div>
					<div class="text-[10px] text-white/50 tracking-wider">WARP MODULES</div>
				</div>
			</div>

			<div class="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
				<div class="text-[10px] text-white/50">Sub-Space Clearance: Level 5</div>

				<button
					type="button"
					onclick={openDossier}
					class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 border-0"
				>
					<span class="nf text-xs">{'\uf15c'}</span>
					<span>View Flight Dossier</span>
				</button>
			</div>
		</div>
	</div>
</div>
