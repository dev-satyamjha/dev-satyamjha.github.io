<script lang="ts">
	import { notifications } from '$lib/stores/notifications.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
</script>

<div
	class="fixed top-12 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
	aria-live="polite"
>
	{#each notifications.items as item (item.id)}
		<div
			class={`pointer-events-auto p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl font-mono text-xs space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-200 ${
				item.type === 'success'
					? 'bg-[#181825]/95 border-[#a6e3a1]/60 text-white'
					: item.type === 'error'
						? 'bg-[#181825]/95 border-[#f38ba8]/60 text-white'
						: item.type === 'warning'
							? 'bg-[#181825]/95 border-[#f9e2af]/60 text-white'
							: 'bg-[#181825]/95 border-[#cba6f7]/60 text-white'
			}`}
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2 font-bold">
					<span
						class={`nf text-xs ${
							item.type === 'success'
								? 'text-[#a6e3a1]'
								: item.type === 'error'
									? 'text-[#f38ba8]'
									: item.type === 'warning'
										? 'text-[#f9e2af]'
										: 'text-[#cba6f7]'
						}`}
					>
						{item.icon}
					</span>
					<span class="text-xs">{item.title}</span>
				</div>

				<div class="flex items-center gap-2">
					<span class="text-[10px] text-[#a6adc8]">{item.timestamp}</span>
					<button
						type="button"
						onclick={() => {
							audioManager.play('click');
							notifications.dismiss(item.id);
						}}
						aria-label="Dismiss notification"
						class="w-5 h-5 rounded-md hover:bg-[#313244] text-[#a6adc8] hover:text-white flex items-center justify-center cursor-pointer"
					>
						<span class="nf text-[10px]">{'\uf00d'}</span>
					</button>
				</div>
			</div>

			<p class="text-[11px] text-[#cdd6f4] leading-snug pl-4">
				{item.message}
			</p>
		</div>
	{/each}
</div>
