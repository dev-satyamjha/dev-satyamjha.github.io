<script lang="ts">
	import type { ThemeConfig, ThemeKey } from '$lib/types/theme';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';

	interface Props {
		theme: ThemeConfig;
		index: number;
		onselect: (key: ThemeKey) => void;
	}

	let { theme, index, onselect }: Props = $props();
	let isHovered = $state(false);

	let title = $derived(
		localeStore.dict.portal[theme.titleKey as keyof typeof localeStore.dict.portal] ?? theme.name
	);

	let description = $derived(
		localeStore.dict.portal[theme.descKey as keyof typeof localeStore.dict.portal] ?? ''
	);

	function handleClick() {
		audioManager.play('warp');
		onselect(theme.key);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	role="button"
	tabindex="0"
	onclick={handleClick}
	onkeydown={handleKeyDown}
	onmouseenter={() => {
		isHovered = true;
		audioManager.play('hover');
	}}
	onmouseleave={() => {
		isHovered = false;
	}}
	class="door-card group relative w-full h-[370px] sm:h-[410px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b]"
	style={`border: 1px solid ${isHovered ? theme.accentColor : '#313244'}; background: linear-gradient(180deg, #181825 0%, #11111b 100%); --tw-ring-color: ${theme.accentColor};`}
>
	<div
		class="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
		style={`background: radial-gradient(circle at 50% 35%, ${theme.accentColor} 0%, transparent 75%);`}
	></div>

	<div class="relative z-10 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span
				class="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors duration-300"
				style={`border-color: ${isHovered ? theme.accentColor : '#313244'}; color: ${theme.accentColor}; background: ${theme.accentColor}15;`}
			>
				{`0${index + 1}`}
			</span>
			<span class="text-xs font-mono tracking-wider uppercase text-[#a6adc8]">
				{theme.key}
			</span>
		</div>

		<span
			class="nf text-xl transition-all duration-300 group-hover:scale-125"
			style={`color: ${theme.accentColor};`}
		>
			{theme.glyph}
		</span>
	</div>

	<div class="relative z-10 my-auto flex flex-col items-center justify-center text-center px-2">
		{#if theme.key === 'clean'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl bg-[#1e1e2e] border border-[#313244] p-3 flex flex-col justify-between shadow-inner mb-3 transition-all duration-300 group-hover:border-[#89b4fa]/60"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-1.5">
						<div class="w-2 h-2 rounded-full bg-[#89b4fa]"></div>
						<div class="h-1.5 w-16 rounded bg-[#313244]"></div>
					</div>
					<span class="text-[9px] font-mono text-[#89b4fa] px-1.5 py-0.5 rounded bg-[#89b4fa]/10"
						>UI/UX</span
					>
				</div>
				<div class="space-y-1.5 text-left">
					<div
						class="h-1.5 w-full rounded bg-[#45475a]/60 group-hover:bg-[#89b4fa]/40 transition-colors"
					></div>
					<div class="h-1.5 w-3/4 rounded bg-[#45475a]/40"></div>
				</div>
				<div class="flex items-center gap-1 text-[9px] font-mono text-[#a6adc8]">
					<span class="nf text-[10px] text-[#89b4fa]">{'\uf06e'}</span>
					<span>Minimalist View</span>
				</div>
			</div>
		{:else if theme.key === 'linux'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl bg-[#11111b] border border-[#313244] group-hover:border-[#cba6f7]/60 p-3 font-mono text-[10px] text-left shadow-inner mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div
					class="flex items-center justify-between border-b border-[#313244] pb-1 text-[#a6adc8]"
				>
					<span class="text-[#cba6f7]">hyprland.conf</span>
					<span class="nf text-[#cba6f7]">{'\uf303'}</span>
				</div>
				<div class="text-[#a6e3a1] text-[10px]">
					<span>$ neofetch</span>
				</div>
				<div class="text-[#cdd6f4] text-[9px] truncate">
					<span class="text-[#f9e2af]">OS:</span> Arch Linux x86_64
				</div>
			</div>
		{:else if theme.key === 'gaming'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl bg-[#181825] border-2 border-dashed border-[#313244] group-hover:border-[#f38ba8]/70 p-3 font-mono text-[10px] shadow-inner mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div class="flex items-center justify-between text-[#fab387]">
					<span>{isHovered ? 'CREDITS: 99' : 'SCORE: 9990'}</span>
					<span class="nf text-[#f38ba8]">{'\uf11b'}</span>
				</div>
				<div class="text-[#f9e2af] text-center font-bold tracking-widest text-[11px] animate-pulse">
					{isHovered ? 'PRESS START' : '[ INSERT COIN ]'}
				</div>
				<div class="flex items-center justify-between text-[9px] text-[#a6adc8]">
					<span>LVL 01</span>
					<span>4 QUESTS</span>
				</div>
			</div>
		{:else if theme.key === 'space'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl bg-[#05050f] border border-[#313244] group-hover:border-[#22d3ee]/60 p-3 font-mono text-[10px] shadow-inner mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div class="flex items-center justify-between text-[#22d3ee]">
					<span>ORBIT // 42°N</span>
					<span class="nf">{'\uf135'}</span>
				</div>
				<div class="text-[#74c7ec] text-center text-[10px] font-bold tracking-wider">
					{isHovered ? 'HYPERDRIVE READY' : 'DEEP SPACE HUD'}
				</div>
				<div class="flex items-center justify-between text-[9px] text-[#a6adc8]">
					<span>SOLAR: 98%</span>
					<span>LIGHTYEARS: 0</span>
				</div>
			</div>
		{:else if theme.key === 'macos'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl bg-[#1e1e2e]/90 border border-[#313244] group-hover:border-[#f9e2af]/60 p-3 shadow-inner mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div class="flex items-center gap-1.5">
					<div class="w-2.5 h-2.5 rounded-full bg-[#f38ba8]"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-[#f9e2af]"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]"></div>
					<span class="ml-auto text-[9px] font-mono text-[#a6adc8]">Finder</span>
				</div>
				<div class="flex items-center justify-center gap-2 pt-1">
					<div
						class="w-6 h-6 rounded-lg bg-[#313244] group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] text-[#89b4fa] font-mono shadow"
					>
						<span class="nf">{'\uf07b'}</span>
					</div>
					<div
						class="w-6 h-6 rounded-lg bg-[#313244] group-hover:scale-125 transition-transform flex items-center justify-center text-[10px] text-[#a6e3a1] font-mono shadow"
					>
						<span class="nf">{'\uf120'}</span>
					</div>
					<div
						class="w-6 h-6 rounded-lg bg-[#313244] group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] text-[#cba6f7] font-mono shadow"
					>
						<span class="nf">{'\uf003'}</span>
					</div>
				</div>
				<div class="text-center text-[9px] font-mono text-[#a6adc8]">macOS Sonoma Sim</div>
			</div>
		{/if}

		<h2 class="text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5">
			{title}
		</h2>
		<p class="text-xs text-[#a6adc8] leading-relaxed line-clamp-2">
			{description}
		</p>
	</div>

	<div
		class="relative z-10 pt-4 border-t border-[#313244] flex items-center justify-between text-xs font-mono"
	>
		<span class="text-[#a6adc8]">{theme.route}</span>
		<span
			class="inline-flex items-center gap-1 font-semibold transition-transform duration-200 group-hover:translate-x-1"
			style={`color: ${theme.accentColor};`}
		>
			<span>Enter</span>
			<span class="nf text-xs">{'\uf061'}</span>
		</span>
	</div>
</div>
