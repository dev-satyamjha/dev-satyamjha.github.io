<script lang="ts">
	import { colorModeStore } from '$lib/stores/colorMode.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';

	interface Props {
		variant?: 'compact' | 'pill' | 'icon';
		class?: string;
	}

	let { variant = 'compact', class: customClass = '' }: Props = $props();

	function handleToggle() {
		audioManager.play('toggle');
		colorModeStore.toggle();
	}
</script>

{#if variant === 'pill'}
	<button
		type="button"
		onclick={handleToggle}
		onmouseenter={() => audioManager.play('hover')}
		aria-label={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		title={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		class={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none text-xs font-mono backdrop-blur-md shadow-sm ${
			colorModeStore.current === 'dark'
				? 'border-[#313244] bg-[#181825]/90 text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#313244]'
				: 'border-slate-300 bg-white/90 text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 shadow-sm'
		} ${customClass}`}
	>
		<span
			class={`nf text-xs transition-transform duration-300 ${
				colorModeStore.current === 'dark'
					? 'text-[#f9e2af] rotate-0'
					: 'text-amber-500 rotate-180'
			}`}
		>
			{colorModeStore.current === 'dark' ? '\uf186' : '\uf185'}
		</span>
		<span>{colorModeStore.current === 'dark' ? 'Dark' : 'Light'}</span>
	</button>
{:else if variant === 'icon'}
	<button
		type="button"
		onclick={handleToggle}
		onmouseenter={() => audioManager.play('hover')}
		aria-label={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		title={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		class={`inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300 cursor-pointer shadow-sm ${
			colorModeStore.current === 'dark'
				? 'border-[#313244] bg-[#181825]/90 text-[#f9e2af] hover:border-[#89b4fa] hover:bg-[#313244]'
				: 'border-slate-300 bg-white/90 text-amber-500 hover:border-amber-400 hover:bg-amber-50 shadow-sm'
		} ${customClass}`}
	>
		<span class="nf text-xs transition-transform duration-300">
			{colorModeStore.current === 'dark' ? '\uf186' : '\uf185'}
		</span>
	</button>
{:else}
	<button
		type="button"
		onclick={handleToggle}
		onmouseenter={() => audioManager.play('hover')}
		aria-label={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		title={colorModeStore.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none text-xs font-mono backdrop-blur-md shadow-sm ${
			colorModeStore.current === 'dark'
				? 'border-[#45475a] bg-[#181825]/90 text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#313244]'
				: 'border-slate-300 bg-white/95 text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 shadow-md'
		} ${customClass}`}
	>
		<span
			class={`nf text-xs transition-transform duration-300 ${
				colorModeStore.current === 'dark' ? 'text-[#f9e2af]' : 'text-amber-500'
			}`}
		>
			{colorModeStore.current === 'dark' ? '\uf186' : '\uf185'}
		</span>
		<span>{colorModeStore.current === 'dark' ? 'Dark' : 'Light'}</span>
	</button>
{/if}
