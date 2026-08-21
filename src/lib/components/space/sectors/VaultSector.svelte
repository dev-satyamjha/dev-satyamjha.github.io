<script lang="ts">
	import { getAllPosts } from '$lib/utils/blog';
	import { audioManager } from '$lib/stores/audio.svelte';

	const posts = getAllPosts();
</script>

<div class="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 font-mono text-xs text-cyan-300 select-text">
	<div class="p-4 rounded-2xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span class="nf text-lg text-cyan-400">{'\uf249'}</span>
			<div>
				<h2 class="font-bold text-sm text-white uppercase tracking-wider">Data Vault // Sector 06</h2>
				<div class="text-[10px] text-cyan-400/60">Quantum Archives & Technical Architecture Articles</div>
			</div>
		</div>
		<span class="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-cyan-300">
			{posts.length} Data Entries
		</span>
	</div>

	<div class="space-y-4">
		{#each posts as post}
			<div class="p-6 rounded-3xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/40 shadow-xl space-y-3 relative">
				<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-cyan-500/20 pb-3">
					<div class="space-y-0.5">
						<div class="text-[10px] text-cyan-400/60 uppercase tracking-widest">{post.date} &bull; {post.readingTime} &bull; {post.author}</div>
						<h3 class="text-base font-bold text-white tracking-wide">{post.title}</h3>
					</div>
					<div class="flex flex-wrap gap-1 pt-1 sm:pt-0">
						{#each post.tags as tag}
							<span class="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[9px] text-cyan-300">
								#{tag}
							</span>
						{/each}
					</div>
				</div>

				<p class="text-xs text-cyan-100/90 font-sans leading-relaxed">
					{post.description}
				</p>

				<div class="pt-2 flex items-center justify-between">
					<span class="text-[10px] text-white/40">Encrypted Archive</span>
					<a
						href={`/clean/blog/${post.slug}`}
						onclick={() => audioManager.play('click')}
						class="px-3.5 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-200 text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
					>
						<span>Decouple & Read</span>
						<span class="nf text-xs">{'\uf08e'}</span>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
