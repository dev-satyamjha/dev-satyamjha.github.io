<script lang="ts">
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		variant?: 'pill' | 'compact';
		class?: string;
	}

	let { variant = 'pill', class: customClass = '' }: Props = $props();

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
			? 'gap-3.5 px-5 py-2.5 rounded-full border border-[#45475a] bg-[#181825]/90 hover:bg-[#313244] hover:border-[#89b4fa] text-xs font-semibold tracking-wide text-[#cdd6f4] shadow-sm'
			: 'p-1.5 rounded-lg border border-[#313244] bg-[#181825]/90 hover:bg-[#313244] text-[#cdd6f4] text-xs'
	} ${customClass}`}
>
	<span class="nf text-xs text-[#89b4fa]">{'\uf0ac'}</span>
	<span>{localeStore.current === 'en' ? 'हिन्दी' : 'English'}</span>
</button>
