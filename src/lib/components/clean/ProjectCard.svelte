<script lang="ts">
	import type { Project } from '$lib/types/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	function getLinkIcon(label: string): string {
		const lower = label.toLowerCase();
		if (lower.includes('github')) return '\uf09b';
		if (lower.includes('store')) return '\uf17a';
		if (lower.includes('game') || lower.includes('play')) return '\uf11b';
		return '\uf08e';
	}
</script>

<article
	class="group relative flex flex-col justify-between rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#89b4fa]/60 hover:shadow-2xl hover:shadow-[#89b4fa]/10"
>
	<div class="space-y-4">
		<div class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<span class="px-2.5 py-1 rounded-full border border-[#313244] bg-[#11111b] text-[10px] font-mono uppercase tracking-wider text-[#89b4fa]">
					{project.category}
				</span>
				{#if project.featured}
					<span class="px-2.5 py-1 rounded-full border border-[#f9e2af]/30 bg-[#f9e2af]/10 text-[10px] font-mono text-[#f9e2af] flex items-center gap-1">
						<span class="nf text-[10px]">{'\uf005'}</span>
						<span>Featured</span>
					</span>
				{/if}
			</div>

			<div class="flex items-center gap-2">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => audioManager.play('click')}
						aria-label={`${project.name} - ${link.label}`}
						title={link.label}
						class="w-8 h-8 rounded-lg border border-[#313244] bg-[#11111b] hover:bg-[#313244] hover:border-[#89b4fa] text-[#a6adc8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
					>
						<span class="nf text-sm">{getLinkIcon(link.label)}</span>
					</a>
				{/each}
			</div>
		</div>

		<div class="space-y-1.5">
			<h3 class="text-xl font-bold tracking-tight text-white group-hover:text-[#89b4fa] transition-colors">
				{project.name}
			</h3>
			<p class="text-xs font-mono text-[#89b4fa] font-medium">
				{project.tagline}
			</p>
		</div>

		<p class="text-xs sm:text-sm text-[#cdd6f4] leading-relaxed font-sans">
			{project.description}
		</p>
	</div>

	<div class="pt-6 mt-4 border-t border-[#27272a]/60 flex flex-wrap items-center gap-1.5">
		{#each project.technologies as tech}
			<span class="px-2.5 py-1 rounded-lg bg-[#11111b] border border-[#313244] text-[10px] font-mono text-[#a6adc8]">
				{tech}
			</span>
		{/each}
	</div>
</article>
