<script lang="ts">
	import type { Snippet } from 'svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		credits: number;
		onInsertCoin: () => void;
		isScanlinesActive: boolean;
		onToggleScanlines: () => void;
		children?: Snippet;
	}

	let { credits, onInsertCoin, isScanlinesActive, onToggleScanlines, children }: Props = $props();

	function handleCoin() {
		audioManager.play('notification');
		onInsertCoin();
	}
</script>

<div class="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none font-mono">
	<div class="w-full rounded-t-3xl bg-gradient-to-b from-[#18181b] to-[#09090b] border-t-2 border-x-2 border-rose-500/50 p-4 sm:p-6 shadow-[0_0_40px_rgba(244,63,94,0.25)] text-center relative overflow-hidden">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none"></div>

		<div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
			<div class="flex items-center gap-2">
				<span class="nf text-xl text-rose-400 animate-pulse">{'\uf11b'}</span>
				<span class="text-base sm:text-lg font-bold text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">
					SATYAM'S ARCADE REALM
				</span>
			</div>

			<div class="flex items-center gap-2 text-xs">
				<button
					type="button"
					onclick={onToggleScanlines}
					class={`px-2.5 py-1 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
						isScanlinesActive
							? 'bg-rose-500/20 border-rose-400 text-rose-300'
							: 'bg-zinc-800 border-zinc-700 text-zinc-400'
					}`}
				>
					CRT Scanlines: {isScanlinesActive ? 'ON' : 'OFF'}
				</button>
			</div>
		</div>
	</div>

	<div class="w-full bg-[#09090b] border-x-2 border-rose-500/50 p-2 sm:p-5 relative overflow-hidden">
		<div class="relative rounded-2xl bg-black border-4 border-zinc-800 overflow-hidden shadow-2xl min-h-[480px] sm:min-h-[540px] flex flex-col">
			{#if isScanlinesActive}
				<div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_2px,transparent_2px,transparent_4px)] pointer-events-none z-30"></div>
				<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-30"></div>
			{/if}

			<div class="relative z-20 flex-1 w-full h-full flex flex-col">
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>

	<div class="w-full rounded-b-3xl bg-gradient-to-t from-[#18181b] to-[#09090b] border-b-2 border-x-2 border-rose-500/50 p-4 sm:p-6 shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<div class="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center shadow-inner relative">
				<div class="w-5 h-5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
			</div>
			<div class="text-[11px] text-zinc-400">
				<div class="font-bold text-white">4-WAY JOYSTICK</div>
				<div>PORTFOLIO CONTROLLER</div>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<button
				type="button"
				onclick={handleCoin}
				class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(251,191,36,0.5)] cursor-pointer flex items-center gap-2"
			>
				<span class="nf text-sm">{'\uf155'}</span>
				<span>INSERT COIN</span>
			</button>

			<div class="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-amber-400 font-bold tracking-widest">
				CREDITS: {credits}
			</div>
		</div>

		<div class="flex items-center gap-2">
			<div class="w-7 h-7 rounded-full bg-rose-500 border border-rose-300 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_8px_rgba(244,63,94,0.6)]">
				A
			</div>
			<div class="w-7 h-7 rounded-full bg-blue-500 border border-blue-300 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_8px_rgba(59,130,246,0.6)]">
				B
			</div>
			<div class="w-7 h-7 rounded-full bg-emerald-500 border border-emerald-300 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_8px_rgba(16,185,129,0.6)]">
				X
			</div>
			<div class="w-7 h-7 rounded-full bg-purple-500 border border-purple-300 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_8px_rgba(168,85,247,0.6)]">
				Y
			</div>
		</div>
	</div>
</div>
