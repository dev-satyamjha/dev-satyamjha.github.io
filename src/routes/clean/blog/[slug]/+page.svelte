<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	let { data } = $props();

	const ContentComponent = $derived(data.content);
	const meta = $derived(data.metadata);
</script>

<SEOHead
	title={`${meta.title} | ${PORTFOLIO_DATA.profile.name}`}
	description={meta.description}
	type="article"
	publishedTime={meta.date}
	tags={meta.tags}
	pathname={`/clean/blog/${data.slug}`}
/>

<main id="main-content" class="py-12 sm:py-16 max-w-3xl mx-auto space-y-8">
	<div class="space-y-4">
		<a
			href="/clean/blog"
			onclick={() => audioManager.play('click')}
			class="inline-flex items-center gap-1.5 text-xs font-mono text-[#89b4fa] hover:text-white transition-colors"
		>
			<span class="nf text-xs">{'\uf060'}</span>
			<span>Back to Articles</span>
		</a>

		<div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[#a6adc8]">
			<span class="flex items-center gap-1.5 text-[#89b4fa]">
				<span class="nf text-xs">{'\uf073'}</span>
				<span>{meta.date}</span>
			</span>
			<span>&bull;</span>
			<span class="flex items-center gap-1.5">
				<span class="nf text-xs">{'\uf017'}</span>
				<span>{meta.readingTime}</span>
			</span>
		</div>

		<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
			{meta.title}
		</h1>

		<div class="flex flex-wrap items-center gap-1.5 pt-1">
			{#each meta.tags as tag}
				<span
					class="px-2.5 py-1 rounded-md bg-[#181825] border border-[#313244] text-xs font-mono text-[#89b4fa]"
				>
					#{tag}
				</span>
			{/each}
		</div>
	</div>

	<article
		class="prose-clean space-y-6 pt-6 border-t border-[#27272a] text-sm sm:text-base text-[#cdd6f4] leading-relaxed font-sans"
	>
		{#if ContentComponent}
			<ContentComponent />
		{/if}
	</article>

	<div
		class="pt-8 mt-12 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4"
	>
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-full overflow-hidden border border-[#313244] bg-[#181825]">
				<img
					src={PORTFOLIO_DATA.profile.avatar}
					alt={PORTFOLIO_DATA.profile.name}
					width="40"
					height="40"
					class="w-full h-full object-cover"
				/>
			</div>
			<div>
				<div class="text-xs font-bold text-white font-mono">{PORTFOLIO_DATA.profile.name}</div>
				<div class="text-[11px] text-[#a6adc8] font-mono">{PORTFOLIO_DATA.profile.title}</div>
			</div>
		</div>

		<a
			href="/clean/blog"
			onclick={() => audioManager.play('click')}
			class="px-4 py-2 rounded-xl border border-[#313244] bg-[#181825] hover:border-[#89b4fa] text-xs font-mono text-[#cdd6f4] transition-colors"
		>
			Read More Articles
		</a>
	</div>
</main>

<style>
	:global(.prose-clean h2) {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
		letter-spacing: -0.025em;
	}

	:global(.prose-clean h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: #89b4fa;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose-clean p) {
		margin-bottom: 1.25rem;
		color: #cdd6f4;
	}

	:global(.prose-clean ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}

	:global(.prose-clean li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose-clean pre) {
		background: #11111b;
		border: 1px solid #313244;
		border-radius: 1rem;
		padding: 1rem;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: #cdd6f4;
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
	}

	:global(.prose-clean code:not(pre code)) {
		background: #181825;
		border: 1px solid #313244;
		border-radius: 0.375rem;
		padding: 0.15rem 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: #f9e2af;
	}
</style>
