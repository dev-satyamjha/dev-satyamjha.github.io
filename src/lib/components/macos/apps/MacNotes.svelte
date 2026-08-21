<script lang="ts">
	import { getAllPosts } from '$lib/utils/blog';
	import { audioManager } from '$lib/stores/audio.svelte';
	import type { BlogPost } from '$lib/types/blog';

	const posts = getAllPosts();
	let selectedSlug = $state(posts[0]?.slug ?? '');
	let currentNote = $derived<BlogPost>(
		posts.find((p) => p.slug === selectedSlug) ?? posts[0]
	);

	function selectNote(slug: string) {
		audioManager.play('click');
		selectedSlug = slug;
	}
</script>

<div class="w-full h-full flex font-sans text-xs text-white bg-[#181825]/90 select-none overflow-hidden">
	<aside class="w-56 sm:w-64 border-r border-white/10 p-2 space-y-1 bg-white/5 backdrop-blur-xl overflow-y-auto shrink-0">
		<div class="p-2 text-[11px] font-bold text-white/50 uppercase tracking-wider">All Notes ({posts.length})</div>
		{#each posts as note}
			<button
				type="button"
				onclick={() => selectNote(note.slug)}
				class={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer space-y-1 ${
					selectedSlug === note.slug ? 'bg-amber-500/20 border border-amber-500/40 text-white' : 'hover:bg-white/5 text-white/80'
				}`}
			>
				<div class="font-bold text-xs truncate text-white">{note.title}</div>
				<div class="flex items-center gap-2 text-[10px] text-white/50">
					<span>{note.date}</span>
					<span class="truncate text-amber-300">#{note.tags[0]}</span>
				</div>
			</button>
		{/each}
	</aside>

	<section class="flex-1 p-6 overflow-y-auto space-y-4 select-text">
		<div class="border-b border-white/10 pb-4 space-y-2">
			<div class="text-[11px] text-white/50">{currentNote.date} &bull; {currentNote.readingTime} &bull; By {currentNote.author}</div>
			<h2 class="text-xl font-bold text-white tracking-tight">{currentNote.title}</h2>
			<div class="flex flex-wrap gap-1.5 pt-1">
				{#each currentNote.tags as tag}
					<span class="px-2 py-0.5 rounded bg-white/10 text-amber-300 text-[10px]">#{tag}</span>
				{/each}
			</div>
		</div>

		<div class="text-xs text-white/90 leading-relaxed space-y-4">
			<p>{currentNote.description}</p>
			<div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
				<span>Read complete formatted technical article on Clean Blog: </span>
				<a href={`/clean/blog/${currentNote.slug}`} class="text-blue-400 underline font-medium ml-1">
					/clean/blog/{currentNote.slug}
				</a>
			</div>
		</div>
	</section>
</div>
