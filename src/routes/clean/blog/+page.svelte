<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { getAllPosts, getAllTags } from '$lib/utils/blog';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	const allPosts = getAllPosts();
	const allTags = getAllTags();

	let searchQuery = $state('');
	let selectedTag = $state<string | null>(null);

	let filteredPosts = $derived(
		allPosts.filter((post) => {
			const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
			const query = searchQuery.toLowerCase().trim();
			const matchesQuery =
				query === '' ||
				post.title.toLowerCase().includes(query) ||
				post.description.toLowerCase().includes(query) ||
				post.tags.some((t) => t.toLowerCase().includes(query));

			return matchesTag && matchesQuery;
		})
	);

	function setTag(tag: string | null) {
		audioManager.play('click');
		selectedTag = selectedTag === tag ? null : tag;
	}
</script>

<SEOHead
	title={`${localeStore.dict.nav.blog} | Clean Modern`}
	description="Technical articles and engineering deep dives by Satyam Kumar."
	pathname="/clean/blog"
/>

<main id="main-content" class="py-12 sm:py-16 space-y-10">
	<div class="space-y-4">
		<div class="flex items-center gap-2 text-xs font-mono text-[#89b4fa]">
			<a
				href="/clean"
				onclick={() => audioManager.play('click')}
				class="hover:underline flex items-center gap-1"
			>
				<span class="nf">{'\uf060'}</span>
				<span>Clean Portfolio</span>
			</a>
			<span>/</span>
			<span class="text-[#a6adc8]">Articles</span>
		</div>

		<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
			{localeStore.dict.sections.blogHeading}
		</h1>
		<p class="text-sm sm:text-base text-[#a6adc8] max-w-2xl font-sans leading-relaxed">
			Engineering notes, architectural decisions, Linux optimization, and systems explorations.
		</p>
	</div>

	<div class="space-y-4 pt-2">
		<div class="relative w-full max-w-md">
			<span
				class="nf absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#89b4fa] pointer-events-none"
			>
				{'\uf002'}
			</span>
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Search articles by title, tag, or topic..."
				class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#181825] border border-[#313244] text-xs font-mono text-white placeholder-[#45475a] focus:outline-none focus:border-[#89b4fa] focus:ring-1 focus:ring-[#89b4fa] transition-colors"
			/>
		</div>

		<div class="flex flex-wrap items-center gap-1.5 font-mono text-xs">
			<button
				type="button"
				onclick={() => setTag(null)}
				class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
					selectedTag === null
						? 'border-[#89b4fa] bg-[#89b4fa]/15 text-[#89b4fa] font-bold'
						: 'border-[#313244] bg-[#181825] text-[#a6adc8] hover:text-white hover:border-[#45475a]'
				}`}
			>
				All Tags ({allPosts.length})
			</button>
			{#each allTags as tag}
				<button
					type="button"
					onclick={() => setTag(tag)}
					class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
						selectedTag === tag
							? 'border-[#89b4fa] bg-[#89b4fa]/15 text-[#89b4fa] font-bold'
							: 'border-[#313244] bg-[#181825] text-[#a6adc8] hover:text-white hover:border-[#45475a]'
					}`}
				>
					#{tag}
				</button>
			{/each}
		</div>
	</div>

	<div class="space-y-6">
		{#if filteredPosts.length === 0}
			<div
				class="p-8 rounded-3xl border border-[#27272a] bg-[#181825] text-center space-y-2 font-mono text-xs text-[#a6adc8]"
			>
				<span class="nf text-2xl text-[#f38ba8] block">{'\uf06a'}</span>
				<div>No articles found matching "{searchQuery}".</div>
				<button
					type="button"
					onclick={() => {
						searchQuery = '';
						selectedTag = null;
					}}
					class="text-[#89b4fa] underline hover:text-white"
				>
					Reset filters
				</button>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6">
				{#each filteredPosts as post (post.slug)}
					<article
						class="group rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 sm:p-8 space-y-4 transition-all duration-300 hover:border-[#89b4fa]/60 hover:-translate-y-1 hover:shadow-2xl"
					>
						<div
							class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#a6adc8]"
						>
							<div class="flex items-center gap-3">
								<span class="flex items-center gap-1.5 text-[#89b4fa]">
									<span class="nf text-xs">{'\uf073'}</span>
									<span>{post.date}</span>
								</span>
								<span>&bull;</span>
								<span class="flex items-center gap-1.5">
									<span class="nf text-xs">{'\uf017'}</span>
									<span>{post.readingTime}</span>
								</span>
							</div>

							<div class="flex flex-wrap items-center gap-1.5">
								{#each post.tags as tag}
									<span
										class="px-2 py-0.5 rounded-md bg-[#11111b] border border-[#313244] text-[10px] text-[#89b4fa]"
									>
										#{tag}
									</span>
								{/each}
							</div>
						</div>

						<h2
							class="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#89b4fa] transition-colors"
						>
							<a href={`/clean/blog/${post.slug}`} onclick={() => audioManager.play('click')}>
								{post.title}
							</a>
						</h2>

						<p class="text-xs sm:text-sm text-[#cdd6f4] font-sans leading-relaxed">
							{post.description}
						</p>

						<div class="pt-2 flex items-center justify-between">
							<a
								href={`/clean/blog/${post.slug}`}
								onclick={() => audioManager.play('click')}
								class="inline-flex items-center gap-1.5 text-xs font-mono text-[#89b4fa] hover:text-[#b4befe] font-semibold transition-colors"
							>
								<span>{localeStore.dict.common.readMore}</span>
								<span class="nf text-xs">{'\uf061'}</span>
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</main>
