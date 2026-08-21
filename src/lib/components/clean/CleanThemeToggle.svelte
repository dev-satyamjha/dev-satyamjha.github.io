<script lang="ts">
	import { onMount } from 'svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
	let isDark = $state(true);

	onMount(() => {
		const saved = localStorage.getItem('clean_theme_mode');
		if (saved) {
			isDark = saved === 'dark';
		} else {
			isDark = true;
		}
		applyMode(isDark);
	});

	function applyMode(dark: boolean) {
		if (typeof document !== 'undefined') {
			if (dark) {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.remove('light');
			} else {
				document.documentElement.classList.add('light');
				document.documentElement.classList.remove('dark');
			}
		}
	}

	function toggleMode() {
		audioManager.play('toggle');
		isDark = !isDark;
		localStorage.setItem('clean_theme_mode', isDark ? 'dark' : 'light');
		applyMode(isDark);
	}
</script>

<button
	type="button"
	onclick={toggleMode}
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	class={`inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#313244] bg-[#181825]/90 hover:border-[#89b4fa] hover:bg-[#313244] text-[#cdd6f4] transition-all cursor-pointer ${customClass}`}
>
	<span class="nf text-xs text-[#f9e2af]">
		{isDark ? '\uf185' : '\uf186'}
	</span>
</button>
