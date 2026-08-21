<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		isMaximized: boolean;
		onminimize: () => void;
		onmaximize: () => void;
		onclose: () => void;
	}

	let { isMaximized, onminimize, onmaximize, onclose }: Props = $props();
</script>

<div class="flex items-center gap-1.5 select-none">
	<button
		type="button"
		onclick={(e) => {
			e.stopPropagation();
			audioManager.play('click');
			onminimize();
		}}
		aria-label="Minimize Window"
		title="Minimize"
		class="w-6 h-6 rounded-md bg-[#181825] border border-[#313244] hover:border-[#f9e2af] text-[#f9e2af] flex items-center justify-center transition-colors cursor-pointer"
	>
		<span class="nf text-[10px]">{'\uf2d1'}</span>
	</button>

	<button
		type="button"
		onclick={(e) => {
			e.stopPropagation();
			audioManager.play('click');
			onmaximize();
		}}
		aria-label={isMaximized ? 'Restore Window' : 'Maximize Window'}
		title={isMaximized ? 'Restore' : 'Maximize'}
		class="w-6 h-6 rounded-md bg-[#181825] border border-[#313244] hover:border-[#a6e3a1] text-[#a6e3a1] flex items-center justify-center transition-colors cursor-pointer"
	>
		<span class="nf text-[10px]">{isMaximized ? '\uf2d2' : '\uf2d0'}</span>
	</button>

	<button
		type="button"
		onclick={(e) => {
			e.stopPropagation();
			audioManager.play('click');
			onclose();
		}}
		aria-label="Close Window"
		title="Close (Super+Q)"
		class="w-6 h-6 rounded-md bg-[#181825] border border-[#313244] hover:border-[#f38ba8] hover:bg-[#f38ba8]/10 text-[#f38ba8] flex items-center justify-center transition-colors cursor-pointer"
	>
		<span class="nf text-[10px]">{'\uf00d'}</span>
	</button>
</div>
