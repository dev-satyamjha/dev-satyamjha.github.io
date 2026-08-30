<script lang="ts">
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';

	interface Props {
		variant?: 'pill' | 'compact';
		class?: string;
	}

	let { variant = 'pill', class: customClass = '' }: Props = $props();
	let isLight = $derived(colorModeStore.current === 'light');

	function handleToggle() {
		audioManager.play('click');
		localeStore.toggleLocale();
	}
</script>

<button
	type="button"
	onclick={handleToggle}
	aria-label={localeStore.dict.common.language}
	class={`inline-flex items-center justify-center transition-all cursor-pointer select-none font-mono ${
		variant === 'pill'
			? `gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide shadow-sm ${
					isLight
						? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50'
						: 'border-[#45475a] bg-[#181825]/90 hover:bg-[#313244] hover:border-[#89b4fa] text-[#cdd6f4]'
				}`
			: `gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
					isLight
						? 'border-slate-300 bg-white/95 text-slate-800 hover:border-blue-500 hover:bg-slate-50 shadow-sm'
						: 'border-[#45475a] bg-[#181825]/90 hover:bg-[#313244] text-[#cdd6f4]'
				}`
	} ${customClass}`}
>
	<span class={`nf text-xs ${isLight ? 'text-blue-600 font-bold' : 'text-[#89b4fa]'}`}>{'\uf0ac'}</span>
	<span>{localeStore.current === 'en' ? 'हिन्दी' : 'English'}</span>
</button>
