<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';
</script>

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
				<div class="text-[10px] text-cyan-400/60 uppercase tracking-widest">COMMANDING OFFICER</div>
				<h2 class="text-lg font-bold text-white tracking-wide">{PORTFOLIO_DATA.profile.name}</h2>
				<div class="text-xs text-cyan-300 font-medium">{PORTFOLIO_DATA.profile.title}</div>
			</div>

			<div
				class="pt-3 border-t border-cyan-500/20 text-[11px] space-y-1 text-left text-cyan-200/80"
			>
				<div class="flex justify-between">
					<span class="text-white/40">STATION:</span>
					<span>BIT Mesra Node</span>
				</div>
				<div class="flex justify-between">
					<span class="text-white/40">SECTOR:</span>
					<span>Earth &bull; IN</span>
				</div>
				<div class="flex justify-between">
					<span class="text-white/40">STATUS:</span>
					<span class="text-emerald-400 font-bold">FLIGHT ACTIVE</span>
				</div>
			</div>
		</div>

		<div class="md:col-span-8 space-y-6">
			<div
				class="p-6 rounded-3xl bg-[#0b1329]/80 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl space-y-4 relative"
			>
				<div class="flex items-center justify-between border-b border-cyan-500/30 pb-3">
					<div class="flex items-center gap-2">
						<span class="nf text-base text-cyan-400">{'\uf135'}</span>
						<span class="font-bold text-sm text-white tracking-wider uppercase"
							>Captain's Log // Overview</span
						>
					</div>
					<span
						class="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-cyan-300"
					>
						SEC-01 ACTIVE
					</span>
				</div>

				<div class="space-y-3 font-sans text-xs leading-relaxed text-cyan-100/90">
					{#each PORTFOLIO_DATA.profile.bio as para}
						<p>{para}</p>
					{/each}
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
					<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
						<div class="text-xl font-bold text-cyan-300 font-mono">400+</div>
						<div class="text-[10px] text-white/50 tracking-wider">CREW & USERS</div>
					</div>
					<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
						<div class="text-xl font-bold text-emerald-400 font-mono">50+</div>
						<div class="text-[10px] text-white/50 tracking-wider">STARSHIPS</div>
					</div>
					<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
						<div class="text-xl font-bold text-amber-300 font-mono">8.1</div>
						<div class="text-[10px] text-white/50 tracking-wider">BIT CGPA</div>
					</div>
					<div class="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center">
						<div class="text-xl font-bold text-purple-400 font-mono">24+</div>
						<div class="text-[10px] text-white/50 tracking-wider">WARP MODULES</div>
					</div>
				</div>

				<div class="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
					<div class="text-[10px] text-white/50">Sub-Space Clearance: Level 5</div>

					<a
						href={PORTFOLIO_DATA.profile.resumeUrl}
						target="_blank"
						onclick={() => audioManager.play('click')}
						class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2"
					>
						<span class="nf text-xs">{'\uf15c'}</span>
						<span>Download Flight Dossier</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
