<script lang="ts">
	import { page } from '$app/state';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';
	import ColorModeToggle from '$lib/components/shared/ColorModeToggle.svelte';

	let isMobileMenuOpen = $state(false);
	let isLight = $derived(colorModeStore.current === 'light');

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
	class={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 ${
		isLight ? 'border-slate-200/80 bg-white/85' : 'border-[#27272a]/80 bg-[#09090b]/80'
	}`}
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<a
			href="/clean"
			onclick={handleLinkClick}
			class={`flex items-center gap-2.5 font-mono text-sm font-bold transition-colors ${
				isLight ? 'text-slate-900 hover:text-blue-600' : 'text-white hover:text-[#89b4fa]'
			}`}
		>
			<span
				class={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
					isLight ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-[#181825] border-[#313244] text-[#89b4fa]'
				}`}
			>
				SK
			</span>
			<span class="hidden sm:inline-block tracking-tight">{PORTFOLIO_DATA.profile.name}</span>
		</a>

		<nav class={`hidden md:flex items-center gap-1 font-mono text-xs transition-colors ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>
			{#each navItems as item}
				<a
					href={item.href}
					onclick={handleLinkClick}
					class={`px-3 py-1.5 rounded-lg transition-all ${
						page.url.pathname === item.href ||
						(item.href.includes('#') && page.url.hash === item.href.slice(item.href.indexOf('#')))
							? isLight
								? 'text-blue-600 bg-blue-50 font-semibold'
								: 'text-[#89b4fa] bg-[#181825]'
							: isLight
								? 'hover:text-slate-900 hover:bg-slate-100'
								: 'hover:text-white hover:bg-[#181825]'
					}`}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<ColorModeToggle variant="icon" />
			<LanguageToggle variant="pill" />
			<AudioToggle variant="icon" />

			<a
				href="/"
				onclick={() => audioManager.play('warp')}
				aria-label={localeStore.dict.common.backToPortal}
				title={localeStore.dict.common.backToPortal}
				class={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer select-none ${
					isLight
						? 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-100 hover:text-blue-600'
						: 'border-[#313244] bg-[#181825] text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#313244]'
				}`}
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
				aria-label="Toggle Navigation Menu"
				class={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-all cursor-pointer ${
					isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-[#313244] bg-[#181825] text-[#cdd6f4]'
				}`}
			>
				<span class="nf text-sm">{isMobileMenuOpen ? '\uf00d' : '\uf0c9'}</span>
			</button>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<div
			class={`md:hidden border-t px-4 py-3 space-y-1 font-mono text-xs transition-colors ${
				isLight ? 'border-slate-200 bg-white' : 'border-[#27272a] bg-[#11111b]'
			}`}
		>
			{#each navItems as item}
				<a
					href={item.href}
					onclick={handleLinkClick}
					class={`block px-3 py-2 rounded-lg transition-colors ${
						isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-[#cdd6f4] hover:bg-[#181825]'
					}`}
				>
					{item.label}
				</a>
			{/each}
			<a
				href="/"
				onclick={handleLinkClick}
				class="block px-3 py-2 rounded-lg text-[#89b4fa] font-semibold"
			>
				{localeStore.dict.common.backToPortal}
			</a>
		</div>
	{/if}
</header>
