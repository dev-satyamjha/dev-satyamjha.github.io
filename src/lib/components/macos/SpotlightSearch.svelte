<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { macos, type MacAppId } from '$lib/themes/macos/MacOSConfig.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { getAllPosts } from '$lib/utils/blog';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { goto } from '$app/navigation';

	interface SearchResult {
		id: string;
		title: string;
		subtitle: string;
		icon: string;
		category: string;
		action: () => void;
	}

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let searchInput: HTMLInputElement | null = $state(null);

	const posts = getAllPosts();

	const ALL_ITEMS: SearchResult[] = [
		{
			id: 'app-finder',
			title: 'Finder',
			subtitle: 'File Manager & Profile Overview',
			icon: '\uf07b',
			category: 'Applications',
			action: () => macos.openApp('finder')
		},
		{
			id: 'app-terminal',
			title: 'Terminal',
			subtitle: 'Interactive zsh command line',
			icon: '\uf120',
			category: 'Applications',
			action: () => macos.openApp('terminal')
		},
		{
			id: 'app-projects',
			title: 'Projects',
			subtitle: 'Explore 50+ engineering software projects',
			icon: '\uf108',
			category: 'Applications',
			action: () => macos.openApp('projects')
		},
		{
			id: 'app-experience',
			title: 'Activity Monitor',
			subtitle: 'InPracSys & GEMA work experience',
			icon: '\uf080',
			category: 'Applications',
			action: () => macos.openApp('experience')
		},
		{
			id: 'app-skills',
			title: 'System Information',
			subtitle: 'Technical skills matrix & proficiencies',
			icon: '\uf0e4',
			category: 'Applications',
			action: () => macos.openApp('skills')
		},
		{
			id: 'app-mail',
			title: 'Mail',
			subtitle: 'Send direct transmission to Satyam',
			icon: '\uf0e0',
			category: 'Applications',
			action: () => macos.openApp('mail')
		},
		{
			id: 'app-notes',
			title: 'Notes',
			subtitle: 'Technical blog articles & architecture writeups',
			icon: '\uf249',
			category: 'Applications',
			action: () => macos.openApp('notes')
		},
		{
			id: 'app-settings',
			title: 'System Settings',
			subtitle: 'Preferences and theme configuration',
			icon: '\uf013',
			category: 'Applications',
			action: () => macos.openApp('settings')
		},
		...PORTFOLIO_DATA.projects.map((p) => ({
			id: `proj-${p.id}`,
			title: p.name,
			subtitle: `${p.tagline} • [${p.category}]`,
			icon: '\uf108',
			category: 'Projects',
			action: () => macos.openApp('projects')
		})),
		...posts.map((post) => ({
			id: `blog-${post.slug}`,
			title: post.title,
			subtitle: `${post.date} • ${post.readingTime}`,
			icon: '\ue62b',
			category: 'Articles',
			action: () => macos.openApp('notes')
		})),
		{
			id: 'dim-clean',
			title: 'Dimension: Clean Modern',
			subtitle: 'Switch to typography-focused portfolio',
			icon: '\uf108',
			category: 'Dimensions',
			action: () => {
				audioManager.play('warp');
				goto('/clean');
			}
		},
		{
			id: 'dim-linux',
			title: 'Dimension: Linux Hyprland',
			subtitle: 'Switch to Arch Linux tiling window manager',
			icon: '\uf303',
			category: 'Dimensions',
			action: () => {
				audioManager.play('warp');
				goto('/linux');
			}
		},
		{
			id: 'dim-gaming',
			title: 'Dimension: Arcade Realm',
			subtitle: 'Switch to Retro Arcade Cabinet',
			icon: '\uf11b',
			category: 'Dimensions',
			action: () => {
				audioManager.play('warp');
				goto('/gaming');
			}
		},
		{
			id: 'dim-space',
			title: 'Dimension: Cosmic Voyage',
			subtitle: 'Switch to Deep Space Station HUD',
			icon: '\uf135',
			category: 'Dimensions',
			action: () => {
				audioManager.play('warp');
				goto('/space');
			}
		},
		{
			id: 'dim-portal',
			title: 'Dimension Portal Gateway',
			subtitle: 'Return to Central Gateway Matrix',
			icon: '\uf14e',
			category: 'Dimensions',
			action: () => {
				audioManager.play('warp');
				goto('/');
			}
		}
	];

	let filteredResults = $derived(
		ALL_ITEMS.filter(
			(item) =>
				searchQuery === '' ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.category.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	$effect(() => {
		if (macos.isSpotlightOpen) {
			searchQuery = '';
			selectedIndex = 0;
			tick().then(() => searchInput?.focus());
		}
	});

	function executeResult(item: SearchResult) {
		audioManager.play('click');
		macos.isSpotlightOpen = false;
		item.action();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			audioManager.play('click');
			selectedIndex = (selectedIndex + 1) % Math.max(1, filteredResults.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			audioManager.play('click');
			selectedIndex = (selectedIndex - 1 + filteredResults.length) % Math.max(1, filteredResults.length);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filteredResults[selectedIndex]) {
				executeResult(filteredResults[selectedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			macos.isSpotlightOpen = false;
		}
	}
</script>

{#if macos.isSpotlightOpen}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-100"
		role="dialog"
		aria-modal="true"
		aria-label="Spotlight Search"
	>
		<button
			type="button"
			class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
			onclick={() => (macos.isSpotlightOpen = false)}
			aria-label="Close Spotlight"
		></button>

		<div
			class="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-[#1e1e2e]/90 backdrop-blur-3xl shadow-2xl overflow-hidden p-3 font-sans space-y-3"
		>
			<div class="flex items-center px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
				<span class="nf text-lg text-[#89b4fa] mr-3">{'\uf002'}</span>
				<input
					bind:this={searchInput}
					type="search"
					bind:value={searchQuery}
					onkeydown={handleKeyDown}
					placeholder="Spotlight Search"
					class="w-full bg-transparent border-none outline-none text-base sm:text-lg text-white placeholder-white/40 focus:ring-0"
					autocomplete="off"
					spellcheck="false"
				/>
				<span class="text-[10px] text-white/50 px-2 py-0.5 rounded bg-white/10">ESC</span>
			</div>

			<div class="max-h-[380px] overflow-y-auto space-y-1 pr-1">
				{#if filteredResults.length === 0}
					<div class="p-8 text-center text-sm text-white/50 space-y-1">
						<span class="nf text-2xl text-white/30 block">{'\uf002'}</span>
						<div>No results matching "{searchQuery}"</div>
					</div>
				{:else}
					{#each filteredResults as item, index}
						<button
							type="button"
							onclick={() => executeResult(item)}
							onmouseenter={() => (selectedIndex = index)}
							class={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
								selectedIndex === index
									? 'bg-blue-600 text-white font-medium shadow-lg'
									: 'hover:bg-white/5 text-white/90'
							}`}
						>
							<div class="flex items-center gap-3 truncate">
								<span
									class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
										selectedIndex === index
											? 'bg-white/20 border-white/30 text-white'
											: 'bg-white/5 border-white/10 text-[#89b4fa]'
									}`}
								>
									<span class="nf text-sm">{item.icon}</span>
								</span>
								<div class="truncate space-y-0.5">
									<div class="text-xs sm:text-sm truncate">{item.title}</div>
									<div class={`text-[11px] truncate font-normal ${selectedIndex === index ? 'text-white/80' : 'text-white/50'}`}>
										{item.subtitle}
									</div>
								</div>
							</div>

							<span
								class={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
									selectedIndex === index
										? 'bg-white/20 text-white'
										: 'bg-white/5 text-white/50'
								}`}
							>
								{item.category}
							</span>
						</button>
					{/each}
				{/if}
			</div>

			<div class="pt-2 border-t border-white/10 px-2 flex items-center justify-between text-[11px] text-white/50">
				<span>Spotlight Search</span>
				<span>Press <kbd class="px-1.5 py-0.5 bg-white/10 text-white rounded text-[10px]">Return</kbd> to open</span>
			</div>
		</div>
	</div>
{/if}
