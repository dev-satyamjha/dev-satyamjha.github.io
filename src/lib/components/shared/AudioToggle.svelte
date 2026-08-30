<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';

	interface Props {
		variant?: 'icon' | 'pill' | 'compact';
		class?: string;
	}

	let { variant = 'icon', class: customClass = '' }: Props = $props();
	let isLight = $derived(colorModeStore.current === 'light');
</script>

<button
	type="button"
	onclick={() => audioManager.toggleMute()}
	aria-label={audioManager.isMuted
		? localeStore.dict.common.soundOff
		: localeStore.dict.common.soundOn}
	class={`inline-flex items-center justify-center transition-all cursor-pointer select-none ${
		variant === 'pill'
			? `gap-2 px-3 py-1.5 rounded-full border text-xs font-mono ${
					isLight
						? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50 shadow-sm'
						: 'border-[#45475a] bg-[#181825]/80 hover:bg-[#313244] text-[#cdd6f4]'
				}`
			: variant === 'compact'
				? `p-1.5 rounded-full border ${
						isLight
							? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50 shadow-sm'
							: 'border-[#45475a] bg-[#181825]/90 hover:bg-[#313244] text-[#cdd6f4]'
					}`
				: `w-9 h-9 rounded-xl border backdrop-blur ${
						isLight
							? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50 shadow-sm'
							: 'border-[#313244] bg-[#181825]/90 hover:border-[#89b4fa] hover:bg-[#313244] text-[#cdd6f4]'
					}`
	} ${customClass}`}
>
	<span class={`nf text-sm ${isLight ? 'text-blue-600 font-bold' : 'text-[#89b4fa]'}`}>
		{audioManager.isMuted ? '\uf026' : '\uf028'}
	</span>
	{#if variant === 'pill'}
		<span
			>{audioManager.isMuted
				? localeStore.dict.common.soundOff
				: localeStore.dict.common.soundOn}</span
		>
	{/if}
</button>
