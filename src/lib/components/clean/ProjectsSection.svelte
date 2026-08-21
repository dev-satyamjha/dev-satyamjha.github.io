<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import ProjectCard from './ProjectCard.svelte';

	let selectedCategory = $state<'all' | 'desktop' | 'ai' | 'game' | 'web' | 'cli'>('all');

	const categories = [
		{ id: 'all' as const, label: 'All Projects' },
		{ id: 'desktop' as const, label: 'Desktop & System' },
		{ id: 'ai' as const, label: 'AI & Automation' },
		{ id: 'game' as const, label: 'Games & Narrative' },
		{ id: 'web' as const, label: 'Full Stack Web' },
		{ id: 'cli' as const, label: 'CLI & Tools' }
	];

	let filteredProjects = $derived(
		selectedCategory === 'all'
			? PORTFOLIO_DATA.projects
			: PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory)
	);

	function setCategory(cat: 'all' | 'desktop' | 'ai' | 'game' | 'web' | 'cli') {
		audioManager.play('click');
		selectedCategory = cat;
	}
</script>

<section id="projects" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-8">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<span class="font-mono text-xs text-[#89b4fa]">02.</span>
				<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
					{localeStore.dict.sections.projectsHeading}
				</h2>
				<div class="hidden sm:block w-24 h-px bg-[#27272a]"></div>
			</div>

			<div class="flex flex-wrap items-center gap-1.5 font-mono text-xs">
				{#each categories as cat}
					<button
						type="button"
						onclick={() => setCategory(cat.id)}
						class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
							selectedCategory === cat.id
								? 'border-[#89b4fa] bg-[#89b4fa]/15 text-[#89b4fa] font-bold'
								: 'border-[#313244] bg-[#181825] text-[#a6adc8] hover:text-white hover:border-[#45475a]'
						}`}
					>
						{cat.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each filteredProjects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
