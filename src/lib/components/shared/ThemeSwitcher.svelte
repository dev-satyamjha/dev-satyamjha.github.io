<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { themeStore, THEME_REGISTRY } from '$lib/stores/theme.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';
	import type { ThemeKey } from '$lib/types/theme';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
	let isOpen = $state(false);
	let containerRef: HTMLDivElement | null = null;
	let isLight = $derived(colorModeStore.current === 'light');

	function handleWindowClick(event: MouseEvent) {
		if (isOpen && containerRef && !containerRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		window.addEventListener('click', handleWindowClick);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('click', handleWindowClick);
		}
	});

	function selectTheme(key: ThemeKey) {
		audioManager.play('warp');
		themeStore.setTheme(key);
		isOpen = false;
		goto(THEME_REGISTRY[key].route);
	}
</script>

<div bind:this={containerRef} class={`relative inline-block ${customClass}`}>
	<button
		type="button"
		onclick={(e) => {
			e.stopPropagation();
			audioManager.play('click');
			isOpen = !isOpen;
		}}
		aria-expanded={isOpen}
		aria-label={localeStore.dict.common.theme}
		class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer select-none shadow-sm ${
			isLight
				? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50'
				: 'border-[#45475a] bg-[#181825]/90 text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#313244]'
		}`}
	>
		<span class={`nf text-xs ${isLight ? 'text-blue-600 font-bold' : 'text-[#89b4fa]'}`}>
			{THEME_REGISTRY[themeStore.current]?.glyph ?? '\uf14e'}
		</span>
		<span>{THEME_REGISTRY[themeStore.current]?.name ?? 'Theme'}</span>
		<span class={`nf text-[10px] ${isLight ? 'text-slate-500' : 'text-[#a6adc8]'}`}>
			{isOpen ? '\uf077' : '\uf078'}
		</span>
	</button>

	{#if isOpen}
		<div
			class={`absolute bottom-full mb-2 right-0 sm:right-auto sm:left-0 w-52 rounded-2xl border backdrop-blur-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150 ${
				isLight
					? 'border-slate-300 bg-white/98 text-slate-900 shadow-slate-900/15'
					: 'border-[#45475a] bg-[#181825]/95 text-[#cdd6f4]'
			}`}
		>
			{#each Object.values(THEME_REGISTRY) as theme}
				<button
					type="button"
					onclick={() => selectTheme(theme.key)}
					onmouseenter={() => audioManager.play('hover')}
					class={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
						themeStore.current === theme.key
							? isLight
								? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold shadow-xs'
								: 'bg-[#313244] text-[#89b4fa] font-semibold'
							: isLight
								? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
								: 'text-[#cdd6f4] hover:bg-[#313244]/60 hover:text-white'
					}`}
				>
					<span
						class={`nf text-sm w-4 text-center ${
							isLight
								? themeStore.current === theme.key
									? 'text-blue-600 font-bold'
									: 'text-slate-600'
								: 'text-[#89b4fa]'
						}`}
					>
						{theme.glyph}
					</span>
					<span class="flex-1">{theme.name}</span>
					{#if themeStore.current === theme.key}
						<span class={`nf text-xs ${isLight ? 'text-blue-600 font-bold' : 'text-[#a6e3a1]'}`}>
							{'\uf00c'}
						</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
