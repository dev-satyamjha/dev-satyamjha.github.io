<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
</script>

<div class="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 font-mono text-xs text-cyan-300 select-text">
	<div class="p-4 rounded-2xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span class="nf text-lg text-cyan-400">{'\uf080'}</span>
			<div>
				<h2 class="font-bold text-sm text-white uppercase tracking-wider">Mission Logs // Sector 04</h2>
				<div class="text-[10px] text-cyan-400/60">Career Timeline & Deep Space Internships</div>
			</div>
		</div>
		<span class="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-cyan-300">
			2 Missions Recorded
		</span>
	</div>

	<div class="space-y-4">
		{#each PORTFOLIO_DATA.experience as mission, index}
			<div class="p-6 rounded-3xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/40 shadow-xl space-y-3 relative">
				<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-cyan-500/20 pb-3">
					<div>
						<div class="text-[10px] text-cyan-400/60 uppercase tracking-widest">MISSION 0{index + 1} // {mission.duration}</div>
						<h3 class="text-base font-bold text-white tracking-wide">
							{mission.role} <span class="text-cyan-400 font-normal">@ {mission.company}</span>
						</h3>
					</div>
					<span class="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-emerald-300 font-bold uppercase self-start sm:self-auto">
						{mission.mode}
					</span>
				</div>

				<ul class="space-y-1.5 font-sans text-xs text-cyan-100/90 list-disc list-inside leading-relaxed">
					{#each mission.highlights as h}
						<li>{h}</li>
					{/each}
				</ul>

				<div class="pt-2 flex flex-wrap gap-1.5">
					{#each mission.technologies as tech}
						<span class="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
							{tech}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
