<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import type { Skill } from '$lib/types/portfolio';

	const categories: { id: Skill['category']; label: string; designation: string; color: string }[] =
		[
			{
				id: 'language',
				label: 'Primary Core // Languages',
				designation: 'PL-CORE-01',
				color: 'from-cyan-400 to-blue-500'
			},
			{
				id: 'framework',
				label: 'Secondary Core // Frameworks',
				designation: 'PL-CORE-02',
				color: 'from-emerald-400 to-teal-500'
			},
			{
				id: 'devops',
				label: 'Defense Grid // DevOps & Cloud',
				designation: 'PL-CORE-03',
				color: 'from-amber-400 to-yellow-500'
			},
			{
				id: 'database',
				label: 'Sub-Space Bank // Databases',
				designation: 'PL-CORE-04',
				color: 'from-purple-400 to-pink-500'
			}
		];

	function getSkills(cat: Skill['category']): Skill[] {
		return PORTFOLIO_DATA.skills.filter((s) => s.category === cat);
	}
</script>

<div
	class="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 font-mono text-xs text-cyan-300 select-text"
>
	<div
		class="p-4 rounded-2xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between"
	>
		<div class="flex items-center gap-2">
			<span class="nf text-lg text-cyan-400">{'\uf0e4'}</span>
			<div>
				<h2 class="font-bold text-sm text-white uppercase tracking-wider">
					Reactor Core // Sector 03
				</h2>
				<div class="text-[10px] text-cyan-400/60">
					Plasma Output: 100% Online &bull; 24 Power Conduits
				</div>
			</div>
		</div>

		<div
			class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-widest"
		>
			Cores Stable
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each categories as cat}
			<div
				class="p-5 rounded-3xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/40 shadow-xl space-y-4"
			>
				<div class="flex items-center justify-between border-b border-cyan-500/20 pb-2">
					<div>
						<h3 class="font-bold text-sm text-white uppercase tracking-wider">{cat.label}</h3>
						<div class="text-[9px] text-cyan-400/50">{cat.designation}</div>
					</div>
					<span
						class="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[9px] text-cyan-300 font-mono"
					>
						{getSkills(cat.id).length} Units
					</span>
				</div>

				<div class="space-y-3">
					{#each getSkills(cat.id) as skill}
						<div class="space-y-1">
							<div class="flex items-center justify-between text-xs">
								<span class="text-white font-medium">{skill.name}</span>
								<span class="text-cyan-400 font-mono font-bold">{skill.proficiency}% MW</span>
							</div>
							<div
								class="w-full h-2 rounded-full bg-cyan-950/80 border border-cyan-500/30 overflow-hidden"
							>
								<div
									class={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
									style={`width: ${skill.proficiency}%;`}
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
