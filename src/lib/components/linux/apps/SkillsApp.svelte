<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import type { Skill } from '$lib/types/portfolio';

	const categories: { id: Skill['category']; label: string; color: string }[] = [
		{ id: 'language', label: 'CPU // Languages', color: 'from-[#89b4fa] to-[#cba6f7]' },
		{ id: 'framework', label: 'MEM // Frameworks', color: 'from-[#a6e3a1] to-[#94e2d5]' },
		{ id: 'devops', label: 'NET // DevOps & Cloud', color: 'from-[#f9e2af] to-[#fab387]' },
		{ id: 'database', label: 'DISK // Storage & DB', color: 'from-[#f38ba8] to-[#eba0ac]' }
	];

	function getSkills(cat: Skill['category']): Skill[] {
		return PORTFOLIO_DATA.skills.filter((s) => s.category === cat);
	}
</script>

<div class="w-full h-full p-4 font-mono text-xs text-[#cdd6f4] bg-[#11111b] overflow-y-auto space-y-4 select-text">
	<div class="flex items-center justify-between border-b border-[#313244] pb-2 text-[11px] text-[#a6adc8]">
		<div class="flex items-center gap-2">
			<span class="nf text-sm text-[#cba6f7]">{'\uf0e4'}</span>
			<span class="font-bold text-white">btop — Technical Resource & Arsenal Monitor</span>
		</div>
		<div>Total Skills: {PORTFOLIO_DATA.skills.length} Loaded</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each categories as cat}
			<div class="p-3.5 rounded-2xl bg-[#181825] border border-[#313244] space-y-3">
				<div class="flex items-center justify-between border-b border-[#313244] pb-1.5 text-xs font-bold text-white">
					<span>{cat.label}</span>
					<span class="text-[#89b4fa] text-[10px]">{getSkills(cat.id).length} units</span>
				</div>

				<div class="space-y-2">
					{#each getSkills(cat.id) as skill}
						<div class="space-y-1">
							<div class="flex items-center justify-between text-[11px]">
								<span class="text-[#cdd6f4]">{skill.name}</span>
								<span class="text-[#a6adc8]">{skill.proficiency}%</span>
							</div>
							<div class="w-full h-2 rounded-full bg-[#11111b] overflow-hidden">
								<div
									class={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
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
