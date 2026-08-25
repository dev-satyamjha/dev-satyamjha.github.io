<script lang="ts">
	import { page } from '$app/state';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';

	let isMobileMenuOpen = $state(false);

	const navItems = $derived([
		{ href: '/clean#about', label: localeStore.dict.nav.about },
		{ href: '/clean#experience', label: localeStore.dict.nav.experience },
		{ href: '/clean#projects', label: localeStore.dict.nav.projects },
		{ href: '/clean#skills', label: localeStore.dict.nav.skills },
		{ href: '/clean#education', label: localeStore.dict.nav.education },
		{ href: '/clean/blog', label: localeStore.dict.nav.blog },
		{ href: '/clean/contact', label: localeStore.dict.nav.contact }
	]);

	function handleLinkClick() {
		audioManager.play('click');
		isMobileMenuOpen = false;
	}
</script>

<header
	class="sticky top-0 z-40 w-full border-b border-[#27272a]/80 bg-[#09090b]/80 backdrop-blur-md transition-colors"
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<a
			href="/clean"
			onclick={handleLinkClick}
			class="flex items-center gap-2.5 font-mono text-sm font-bold text-white hover:text-[#89b4fa] transition-colors"
		>
			<span
				class="w-8 h-8 rounded-lg bg-[#181825] border border-[#313244] flex items-center justify-center text-[#89b4fa] text-xs"
			>
				SK
			</span>
			<span class="hidden sm:inline-block tracking-tight">{PORTFOLIO_DATA.profile.name}</span>
		</a>

		<nav class="hidden md:flex items-center gap-1 font-mono text-xs text-[#a6adc8]">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={handleLinkClick}
					class={`px-3 py-1.5 rounded-lg hover:text-white hover:bg-[#181825] transition-all ${
						page.url.pathname === item.href ||
						(item.href.includes('#') && page.url.hash === item.href.slice(item.href.indexOf('#')))
							? 'text-[#89b4fa] bg-[#181825]'
							: ''
					}`}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<LanguageToggle variant="pill" />
			<AudioToggle variant="icon" />

			<a
				href="/"
				onclick={() => audioManager.play('warp')}
				aria-label={localeStore.dict.common.backToPortal}
				title={localeStore.dict.common.backToPortal}
				class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#313244] bg-[#181825] hover:border-[#89b4fa] hover:bg-[#313244] text-[#cdd6f4] text-xs font-mono transition-all cursor-pointer select-none"
			>
				<span class="nf text-xs text-[#89b4fa]">{'\uf14e'}</span>
				<span>Portal</span>
			</a>

			<button
				type="button"
				onclick={() => {
					audioManager.play('click');
					isMobileMenuOpen = !isMobileMenuOpen;
				}}
				aria-expanded={isMobileMenuOpen}
				aria-label="Toggle navigation menu"
				class="md:hidden w-9 h-9 rounded-xl border border-[#313244] bg-[#181825] hover:bg-[#313244] text-[#cdd6f4] flex items-center justify-center transition-colors cursor-pointer"
			>
				<span class="nf text-base">{isMobileMenuOpen ? '\uf00d' : '\uf0c9'}</span>
			</button>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<div
			class="md:hidden border-b border-[#27272a] bg-[#11111b]/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in fade-in duration-150"
		>
			{#each navItems as item}
				<a
					href={item.href}
					onclick={handleLinkClick}
					class="block px-3 py-2 rounded-xl text-sm font-mono text-[#cdd6f4] hover:text-white hover:bg-[#181825] transition-colors"
				>
					{item.label}
				</a>
			{/each}
			<div class="pt-2 border-t border-[#313244] flex items-center justify-between">
				<a
					href="/"
					onclick={() => audioManager.play('warp')}
					class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#313244] bg-[#181825] text-xs font-mono text-[#cdd6f4]"
				>
					<span class="nf text-xs text-[#89b4fa]">{'\uf14e'}</span>
					<span>{localeStore.dict.common.backToPortal}</span>
				</a>
			</div>
		</div>
	{/if}
</header>
