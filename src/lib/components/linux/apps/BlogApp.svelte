<script lang="ts">
	import { getAllPosts } from '$lib/utils/blog';
	import { audioManager } from '$lib/stores/audio.svelte';
	import type { BlogPost } from '$lib/types/blog';

	const posts = getAllPosts();
	let activeIndex = $state(0);
	let activePost = $derived<BlogPost>(posts[activeIndex] ?? posts[0]);

	function selectPost(index: number) {
		audioManager.play('click');
		activeIndex = index;
	}
</script>

<div class="w-full h-full font-mono text-xs text-[#cdd6f4] bg-[#11111b] flex flex-col select-text">
	<div class="h-8 bg-[#181825] border-b border-[#313244] px-2 flex items-center gap-1 overflow-x-auto select-none">
		{#each posts as post, index}
			<button
				type="button"
				onclick={() => selectPost(index)}
				class={`px-3 py-1 rounded-t-lg text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border-t border-x ${
					activeIndex === index
						? 'bg-[#11111b] border-[#cba6f7] text-[#cba6f7] font-bold'
						: 'border-transparent text-[#a6adc8] hover:text-white'
				}`}
			>
				<span class="nf text-[10px]">{'\ue62b'}</span>
				<span class="truncate max-w-[140px]">{post.slug}.md</span>
			</button>
		{/each}
	</div>

	<div class="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
		<div class="border-b border-[#313244] pb-3 space-y-1">
			<div class="text-[10px] text-[#a6adc8] flex items-center gap-3">
				<span># {activePost.date}</span>
				<span>&bull;</span>
				<span>{activePost.readingTime}</span>
				<span>&bull;</span>
				<span class="text-[#89b4fa]">Author: {activePost.author}</span>
			</div>
			<h2 class="text-lg sm:text-xl font-bold text-white tracking-tight">
				{activePost.title}
			</h2>
			<div class="flex flex-wrap gap-1.5 pt-1">
				{#each activePost.tags as tag}
					<span class="px-2 py-0.5 rounded bg-[#181825] border border-[#313244] text-[10px] text-[#a6e3a1]">
						#{tag}
					</span>
				{/each}
			</div>
		</div>

		<div class="text-xs text-[#cdd6f4] leading-relaxed font-sans space-y-3">
			<p>{activePost.description}</p>
			<div class="p-3 rounded-xl bg-[#181825] border border-[#313244] font-mono text-[11px] text-[#89b4fa]">
				View full formatted article on Clean Blog:
				<a href={`/clean/blog/${activePost.slug}`} class="text-[#cba6f7] underline ml-1">
					/clean/blog/{activePost.slug}
				</a>
			</div>
		</div>
	</div>

	<div class="h-6 bg-[#181825] border-t border-[#313244] px-3 flex items-center justify-between text-[10px] text-[#a6adc8] select-none font-bold">
		<div class="flex items-center gap-2">
			<span class="px-1.5 py-0.2 bg-[#cba6f7] text-[#11111b] rounded text-[9px]">NORMAL</span>
			<span>{activePost.slug}.md</span>
			<span class="text-[#a6e3a1]">[RO]</span>
		</div>
		<div>utf-8 | markdown | 100%</div>
	</div>
</div>
