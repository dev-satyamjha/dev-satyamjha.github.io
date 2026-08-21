<script lang="ts">
	import { goto } from '$app/navigation';
	import { themeStore, THEME_REGISTRY } from '$lib/stores/theme.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import type { ThemeKey } from '$lib/types/theme';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
	let isOpen = $state(false);

	const THEME_GLYPHS: Record<ThemeKey, string> = {
		portal: '\uf14e',
		clean: '\uf108',
		linux: '\uf303',
		gaming: '\uf11b',
		space: '\uf135',
		macos: '\uf179'
	};

	function selectTheme(key: ThemeKey) {
		audioManager.play('warp');
		themeStore.setTheme(key);
		isOpen = false;
		goto(THEME_REGISTRY[key].route);
	}
</script>

<div class={`relative inline-block ${customClass}`}>
	<button
		type="button"
		onclick={() => {
			audioManager.play('click');
			isOpen = !isOpen;
		}}
		aria-expanded={isOpen}
		aria-label={localeStore.dict.common.theme}
		class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#45475a] bg-[#181825]/90 backdrop-blur text-xs font-mono text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#313244] transition-all cursor-pointer select-none"
	>
		<span class="nf text-xs text-[#89b4fa]">
			{THEME_GLYPHS[themeStore.current] ?? '\uf14e'}
		</span>
		<span>{THEME_REGISTRY[themeStore.current]?.name ?? 'Theme'}</span>
		<span class="nf text-[10px] text-[#a6adc8]">{isOpen ? '\uf077' : '\uf078'}</span>
	</button>

	{#if isOpen}
		<div
			class="absolute bottom-full mb-2 right-0 sm:right-auto sm:left-0 w-48 rounded-2xl border border-[#45475a] bg-[#181825]/95 backdrop-blur-md shadow-2xl p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150"
		>
			{#each Object.values(THEME_REGISTRY) as theme}
				<button
					type="button"
					onclick={() => selectTheme(theme.key)}
					onmouseenter={() => audioManager.play('hover')}
					class={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
						themeStore.current === theme.key
							? 'bg-[#313244] text-[#89b4fa] font-semibold'
							: 'text-[#cdd6f4] hover:bg-[#313244]/60 hover:text-white'
					}`}
				>
					<span class="nf text-sm text-[#89b4fa] w-4 text-center">
						{THEME_GLYPHS[theme.key]}
					</span>
					<span class="flex-1">{theme.name}</span>
					{#if themeStore.current === theme.key}
						<span class="nf text-xs text-[#a6e3a1]">{'\uf00c'}</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
