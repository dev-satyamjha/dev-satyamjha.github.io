<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import type { Skill } from '$lib/types/portfolio';

	const categories: { id: Skill['category']; label: string }[] = [
		{ id: 'language', label: 'Languages' },
		{ id: 'framework', label: 'Frameworks & Engines' },
		{ id: 'devops', label: 'DevOps & Systems' },
		{ id: 'database', label: 'Databases & Storage' }
	];

	function getSkillsByCategory(category: Skill['category']): Skill[] {
		return PORTFOLIO_DATA.skills.filter((s) => s.category === category);
	}

	const SKILL_GLYPHS: Record<string, string> = {
		Python: '\ue73c',
		JavaScript: '\ue74e',
		'C/C++': '\ue61d',
		'C#': '\uf031b',
		Go: '\ue627',
		PHP: '\ue73d',
		SQL: '\uf1c0',
		Bash: '\uf120',
		PowerShell: '\ue795',
		Lua: '\ue620',
		'.NET': '\ue77f',
		SvelteKit: '\ue697',
		React: '\ue7ba',
		Laravel: '\ue73f',
		FastAPI: '\ue73c',
		"Ren'Py": '\uf11b',
		Docker: '\ue7b0',
		Azure: '\ue7bb',
		Git: '\ue702',
		Linux: '\uf303',
		'CI/CD': '\uf021',
		MySQL: '\ue704',
		'Azure SQL': '\uf1c0',
		IndexedDB: '\uf0a0'
	};
</script>

<section id="skills" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-10">
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs text-[#89b4fa]">04.</span>
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{localeStore.dict.sections.skillsHeading}
			</h2>
			<div class="flex-1 h-px bg-[#27272a]"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each categories as cat}
				<div class="rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 sm:p-7 space-y-5">
					<div class="flex items-center justify-between border-b border-[#27272a] pb-3">
						<h3 class="text-base font-bold text-white font-mono">{cat.label}</h3>
						<span class="text-xs font-mono text-[#89b4fa]">
							{getSkillsByCategory(cat.id).length} skills
						</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
						{#each getSkillsByCategory(cat.id) as skill}
							<div class="p-3 rounded-2xl bg-[#11111b] border border-[#313244] space-y-2">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<span class="nf text-sm text-[#89b4fa]">
											{SKILL_GLYPHS[skill.name] ?? '\uf121'}
										</span>
										<span class="text-xs font-mono font-medium text-[#cdd6f4]">
											{skill.name}
										</span>
									</div>
									<span class="text-[10px] font-mono text-[#a6adc8]">
										{skill.proficiency}%
									</span>
								</div>

								<div class="w-full h-1.5 rounded-full bg-[#181825] overflow-hidden">
									<div
										class="h-full rounded-full bg-gradient-to-r from-[#89b4fa] to-[#cba6f7]"
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
</section>
