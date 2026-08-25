<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	let activeFilter = $state<string>('all');

	const FILTERS = [
		{ id: 'all', label: 'All Vessels' },
		{ id: 'desktop', label: 'Desktop Starships' },
		{ id: 'web', label: 'Web Cruisers' },
		{ id: 'ai', label: 'AI Neural Vessels' },
		{ id: 'game', label: 'Game Shuttles' },
		{ id: 'cli', label: 'CLI Probes' }
	];

	let filteredProjects = $derived(
		PORTFOLIO_DATA.projects.filter((p) => activeFilter === 'all' || p.category === activeFilter)
	);

	function setFilter(filterId: string) {
		audioManager.play('click');
		activeFilter = filterId;
	}
</script>

<div
	class="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 font-mono text-xs text-cyan-300 select-text"
>
	<div
		class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/30"
	>
		<div class="flex items-center gap-2">
			<span class="nf text-lg text-cyan-400">{'\uf07b'}</span>
			<div>
				<h2 class="font-bold text-sm text-white uppercase tracking-wider">
					Fleet Hangar // Sector 02
				</h2>
				<div class="text-[10px] text-cyan-400/60">
					{filteredProjects.length} Starships in active dock
				</div>
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-1.5">
			{#each FILTERS as f}
				<button
					type="button"
					onclick={() => setFilter(f.id)}
					class={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
						activeFilter === f.id
							? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
							: 'bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30'
					}`}
				>
					{f.label}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filteredProjects as project (project.id)}
			<div
				class="p-5 rounded-3xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 transition-all duration-200 space-y-3 relative flex flex-col justify-between group shadow-xl hover:shadow-cyan-500/10"
			>
				<div class="space-y-2">
					<div class="flex items-center justify-between border-b border-cyan-500/20 pb-2">
						<h3
							class="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors tracking-wide"
						>
							{project.name}
						</h3>
						<span
							class="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-[9px] text-cyan-300 uppercase tracking-widest"
						>
							{project.category}
						</span>
					</div>

					<p class="text-xs text-cyan-200/80 font-sans leading-relaxed">
						{project.tagline}
					</p>

					<div class="space-y-1 pt-1">
						<div class="text-[9px] uppercase tracking-wider text-white/40">Propulsion Stack</div>
						<div class="flex flex-wrap gap-1">
							{#each project.technologies as tech}
								<span
									class="px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 text-[9px] text-emerald-300"
								>
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<div class="pt-3 border-t border-cyan-500/20 flex flex-wrap gap-2">
					{#each project.links as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => audioManager.play('click')}
							class="px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-200 text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
						>
							<span class="nf text-xs">{'\uf08e'}</span>
							<span>{link.label}</span>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
