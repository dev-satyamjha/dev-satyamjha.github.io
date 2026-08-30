<script lang="ts">
	import { onMount } from 'svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
	let isDark = $state(true);

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	});
	function toggleMode() {
		audioManager.play('toggle');
		if (typeof document !== 'undefined') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	}
</script>

<div
	class={`inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#313244] bg-[#181825]/90 text-[#f9e2af] ${customClass}`}
	title="Matte Dark Theme"
>
	<span class="nf text-xs text-[#f9e2af]">
		{'\uf186'}
	</span>
</div>
