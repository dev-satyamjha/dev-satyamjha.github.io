<script lang="ts">
	import type { ThemeConfig, ThemeKey } from '$lib/types/theme';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';

	interface Props {
		theme: ThemeConfig;
		index: number;
		onselect: (key: ThemeKey) => void;
	}

	let { theme, index, onselect }: Props = $props();
	let isHovered = $state(false);

	let isLight = $derived(colorModeStore.current === 'light');

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
	class="door-card group relative w-full h-[370px] sm:h-[410px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2"
	style={`border: 1.5px solid ${isHovered ? theme.accentColor : isLight ? '#cbd5e1' : '#313244'}; background: ${isLight ? '#ffffff' : 'linear-gradient(180deg, #181825 0%, #11111b 100%)'}; box-shadow: ${isLight ? (isHovered ? '0 16px 36px -6px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)' : '0 6px 20px -4px rgba(15, 23, 42, 0.07), 0 2px 6px -1px rgba(15, 23, 42, 0.04)') : 'none'}; --tw-ring-color: ${theme.accentColor};`}
>
	<div
		class="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
		style={`background: radial-gradient(circle at 50% 35%, ${theme.accentColor} 0%, transparent 75%);`}
	></div>

	<div class="relative z-10 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span
				class="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors duration-300"
				style={`border-color: ${isHovered ? theme.accentColor : isLight ? '#cbd5e1' : '#313244'}; color: ${theme.accentColor}; background: ${theme.accentColor}18;`}
			>
				{`0${index + 1}`}
			</span>
			<span class={`text-xs font-mono tracking-wider uppercase font-semibold ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>
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
				class={`w-full max-w-[210px] h-24 rounded-2xl border p-3 flex flex-col justify-between shadow-inner mb-3 transition-all duration-300 group-hover:border-[#89b4fa]/60 ${
					isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#1e1e2e] border-[#313244]'
				}`}
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-1.5">
						<div class="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
						<div class={`h-1.5 w-16 rounded ${isLight ? 'bg-slate-300' : 'bg-[#313244]'}`}></div>
					</div>
					<span class="text-[9px] font-mono text-blue-600 font-semibold px-1.5 py-0.5 rounded bg-blue-500/10"
						>UI/UX</span
					>
				</div>
				<div class="space-y-1.5 text-left">
					<div
						class={`h-1.5 w-full rounded transition-colors ${isLight ? 'bg-slate-300' : 'bg-[#45475a]/60'}`}
					></div>
					<div class={`h-1.5 w-3/4 rounded ${isLight ? 'bg-slate-200' : 'bg-[#45475a]/40'}`}></div>
				</div>
				<div class={`flex items-center gap-1 text-[9px] font-mono font-medium ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>
					<span class="nf text-[10px] text-blue-600">{'\uf06e'}</span>
					<span>Minimalist View</span>
				</div>
			</div>
		{:else if theme.key === 'linux'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl border border-[#313244] bg-[#0f172a] group-hover:border-[#cba6f7]/60 p-3 font-mono text-[10px] text-left shadow-md mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div
					class="flex items-center justify-between border-b border-slate-800 pb-1 text-slate-400"
				>
					<span class="text-[#cba6f7]">hyprland.conf</span>
					<span class="nf text-[#cba6f7]">{'\uf303'}</span>
				</div>
				<div class="text-[#34d399] text-[10px] font-medium">
					<span>$ neofetch</span>
				</div>
				<div class="text-slate-300 text-[9px] truncate">
					<span class="text-[#fbbf24]">OS:</span> Arch Linux x86_64
				</div>
			</div>
		{:else if theme.key === 'gaming'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl border-2 border-dashed border-[#313244] bg-[#1e1b4b] group-hover:border-[#f38ba8]/70 p-3 font-mono text-[10px] shadow-md mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div class="flex items-center justify-between text-[#fdba74]">
					<span>{isHovered ? 'CREDITS: 99' : 'SCORE: 9990'}</span>
					<span class="nf text-[#f43f5e]">{'\uf11b'}</span>
				</div>
				<div class="text-[#fde047] text-center font-bold tracking-widest text-[11px] animate-pulse">
					{isHovered ? 'PRESS START' : '[ INSERT COIN ]'}
				</div>
				<div class="flex items-center justify-between text-[9px] text-slate-400">
					<span>LVL 01</span>
					<span>4 QUESTS</span>
				</div>
			</div>
		{:else if theme.key === 'space'}
			<div
				class="w-full max-w-[210px] h-24 rounded-2xl border border-[#313244] bg-[#020617] group-hover:border-[#22d3ee]/60 p-3 font-mono text-[10px] shadow-md mb-3 flex flex-col justify-between transition-all duration-300"
			>
				<div class="flex items-center justify-between text-[#38bdf8]">
					<span>ORBIT // 42°N</span>
					<span class="nf">{'\uf135'}</span>
				</div>
				<div class="text-[#7dd3fc] text-center text-[10px] font-bold tracking-wider">
					{isHovered ? 'HYPERDRIVE READY' : 'DEEP SPACE HUD'}
				</div>
				<div class="flex items-center justify-between text-[9px] text-slate-400">
					<span>SOLAR: 98%</span>
					<span>LIGHTYEARS: 0</span>
				</div>
			</div>
		{:else if theme.key === 'macos'}
			<div
				class={`w-full max-w-[210px] h-24 rounded-2xl border p-3 shadow-inner mb-3 flex flex-col justify-between transition-all duration-300 ${
					isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#1e1e2e]/90 border-[#313244]'
				}`}
			>
				<div class="flex items-center gap-1.5">
					<div class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
					<span class={`ml-auto text-[9px] font-mono font-medium ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>Finder</span>
				</div>
				<div class="flex items-center justify-center gap-2 pt-1">
					<div
						class={`w-6 h-6 rounded-lg group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] text-blue-600 font-mono shadow ${
							isLight ? 'bg-white border border-slate-200' : 'bg-[#313244]'
						}`}
					>
						<span class="nf">{'\uf07b'}</span>
					</div>
					<div
						class={`w-6 h-6 rounded-lg group-hover:scale-125 transition-transform flex items-center justify-center text-[10px] text-emerald-600 font-mono shadow ${
							isLight ? 'bg-white border border-slate-200' : 'bg-[#313244]'
						}`}
					>
						<span class="nf">{'\uf120'}</span>
					</div>
					<div
						class={`w-6 h-6 rounded-lg group-hover:scale-110 transition-transform flex items-center justify-center text-[10px] text-purple-600 font-mono shadow ${
							isLight ? 'bg-white border border-slate-200' : 'bg-[#313244]'
						}`}
					>
						<span class="nf">{'\uf003'}</span>
					</div>
				</div>
				<div class={`text-center text-[9px] font-mono font-medium ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>macOS Sonoma Sim</div>
			</div>
		{/if}

		<h2
			class={`text-lg sm:text-xl font-bold tracking-tight mb-1.5 transition-colors ${
				isLight ? 'text-slate-900' : 'text-white'
			}`}
		>
			{title}
		</h2>
		<p
			class={`text-xs leading-relaxed line-clamp-2 transition-colors ${
				isLight ? 'text-slate-600 font-normal' : 'text-[#a6adc8]'
			}`}
		>
			{description}
		</p>
	</div>

	<div
		class="relative z-10 pt-4 border-t flex items-center justify-between text-xs font-mono transition-colors"
		style={`border-color: ${isLight ? '#cbd5e1' : '#313244'};`}
	>
		<span class={`transition-colors font-medium ${isLight ? 'text-slate-600' : 'text-[#a6adc8]'}`}>
			{theme.route}
		</span>
		<span
			class="inline-flex items-center gap-1 font-bold transition-transform duration-200 group-hover:translate-x-1"
			style={`color: ${theme.accentColor};`}
		>
			<span>Enter</span>
			<span class="nf text-xs">{'\uf061'}</span>
		</span>
	</div>
</div>
