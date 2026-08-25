<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		id?: string;
		name: string;
		icon: string;
		color: string;
		isOpen: boolean;
		isActive: boolean;
		scale?: number;
		onclick: () => void;
	}

	let { id: _id, name, icon, color, isOpen, isActive, scale = 1, onclick }: Props = $props();

	let isHovered = $state(false);
	let isBouncing = $state(false);

	function handleClick() {
		isBouncing = true;
		audioManager.play('click');
		onclick();
		setTimeout(() => {
			isBouncing = false;
		}, 800);
	}
</script>

<div class="relative flex flex-col items-center">
	{#if isHovered}
		<div
			class="absolute -top-10 px-2.5 py-1 rounded-lg bg-[#181825]/90 backdrop-blur-md border border-white/10 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-100 pointer-events-none z-50"
		>
			{name}
		</div>
	{/if}

	<button
		type="button"
		onclick={handleClick}
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
		aria-label={name}
		style={`transform: scale(${scale}); transform-origin: bottom center;`}
		class={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform duration-100 ease-out cursor-pointer shadow-lg bg-gradient-to-b ${color} border border-white/20 ${
			isBouncing ? 'animate-bounce' : ''
		}`}
	>
		<span class="nf text-xl sm:text-2xl text-white drop-shadow">
			{icon}
		</span>
	</button>

	<div class="h-1.5 flex items-center justify-center mt-1">
		{#if isOpen}
			<span class={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-white/60'}`}></span>
		{/if}
	</div>
</div>
