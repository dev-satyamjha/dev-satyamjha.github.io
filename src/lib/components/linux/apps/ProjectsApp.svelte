<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';
	import type { Project } from '$lib/types/portfolio';

	let selectedIndex = $state(0);
	const projects = PORTFOLIO_DATA.projects;
	let currentProject = $derived<Project>(projects[selectedIndex] ?? projects[0]);

	function selectProject(index: number) {
		audioManager.play('click');
		selectedIndex = index;
	}

	const CATEGORY_GLYPHS: Record<string, string> = {
		desktop: '\uf17a',
		game: '\uf11b',
		ai: '\uf544',
		web: '\uf0ac',
		cli: '\uf120'
	};
</script>

<div class="w-full h-full font-mono text-xs text-[#cdd6f4] bg-[#11111b] flex flex-col select-none">
	<div class="h-8 bg-[#181825] border-b border-[#313244] px-3 flex items-center justify-between text-[11px] text-[#a6adc8]">
		<div class="flex items-center gap-1.5 text-[#89b4fa]">
			<span class="nf text-xs">{'\uf07c'}</span>
			<span>ranger: ~/projects/</span>
			<span class="text-white font-bold">{currentProject.id}</span>
		</div>
		<div>{selectedIndex + 1}/{projects.length} entries</div>
	</div>

	<div class="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
		<div class="hidden sm:block md:col-span-3 border-r border-[#313244] bg-[#181825]/50 p-3 space-y-1 overflow-y-auto">
			<div class="text-[10px] uppercase tracking-wider text-[#a6adc8] px-2 py-1 font-bold">Bookmarks</div>
			<div class="px-2 py-1.5 rounded-lg bg-[#313244] text-[#cba6f7] flex items-center gap-2">
				<span class="nf">{'\uf07c'}</span>
				<span>projects/</span>
			</div>
			<div class="px-2 py-1.5 rounded-lg text-[#a6adc8] hover:text-white flex items-center gap-2">
				<span class="nf">{'\uf07c'}</span>
				<span>blog/</span>
			</div>
			<div class="px-2 py-1.5 rounded-lg text-[#a6adc8] hover:text-white flex items-center gap-2">
				<span class="nf">{'\uf07c'}</span>
				<span>config/</span>
			</div>
			<div class="px-2 py-1.5 rounded-lg text-[#a6adc8] hover:text-white flex items-center gap-2">
				<span class="nf">{'\uf07c'}</span>
				<span>notes/</span>
			</div>
		</div>

		<div class="md:col-span-4 border-r border-[#313244] p-2 space-y-1 overflow-y-auto bg-[#11111b]">
			{#each projects as project, index}
				<button
					type="button"
					onclick={() => selectProject(index)}
					class={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer ${
						selectedIndex === index
							? 'bg-[#cba6f7] text-[#11111b] font-bold shadow'
							: 'text-[#cdd6f4] hover:bg-[#181825] hover:text-white'
					}`}
				>
					<div class="flex items-center gap-2 truncate">
						<span class="nf text-xs">
							{CATEGORY_GLYPHS[project.category] ?? '\uf15b'}
						</span>
						<span class="truncate text-xs">{project.name}</span>
					</div>
					<span class="text-[10px] opacity-75 shrink-0 uppercase">[{project.category}]</span>
				</button>
			{/each}
		</div>

		<div class="md:col-span-5 p-4 overflow-y-auto bg-[#181825]/90 space-y-4 select-text">
			<div class="border-b border-[#313244] pb-3 space-y-1">
				<div class="flex items-center justify-between">
					<h3 class="text-base font-bold text-white">{currentProject.name}</h3>
					<span class="px-2 py-0.5 rounded bg-[#11111b] border border-[#313244] text-[10px] text-[#89b4fa] uppercase">
						{currentProject.category}
					</span>
				</div>
				<div class="text-xs text-[#89b4fa] font-medium">{currentProject.tagline}</div>
			</div>

			<p class="text-xs text-[#cdd6f4] leading-relaxed font-sans">
				{currentProject.description}
			</p>

			<div class="space-y-1.5">
				<div class="text-[10px] uppercase text-[#a6adc8] font-bold">Tech Stack</div>
				<div class="flex flex-wrap gap-1.5">
					{#each currentProject.technologies as tech}
						<span class="px-2 py-0.5 rounded-md bg-[#11111b] border border-[#313244] text-[10px] text-[#a6e3a1]">
							{tech}
						</span>
					{/each}
				</div>
			</div>

			<div class="pt-2 border-t border-[#313244] flex flex-wrap gap-2">
				{#each currentProject.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => audioManager.play('click')}
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#313244] hover:bg-[#cba6f7] hover:text-[#11111b] text-white text-xs font-bold transition-colors cursor-pointer"
					>
						<span class="nf text-xs">{'\uf08e'}</span>
						<span>{link.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
