<script lang="ts">
	import { onMount } from 'svelte';
	import { hyprland, WORKSPACES } from '$lib/themes/linux/HyprlandConfig.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';

	let timeString = $state('');
	let dateString = $state('');

	onMount(() => {
		function updateClock() {
			const now = new Date();
			timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
			dateString = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
		}
		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	});

	let activeWindow = $derived(
		hyprland.activeWindowId ? hyprland.windows[hyprland.activeWindowId] : null
	);
</script>

<header class="w-full h-10 bg-[#11111b]/95 backdrop-blur-md border-b border-[#313244] px-3 flex items-center justify-between font-mono text-xs text-[#cdd6f4] select-none z-30">
	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => hyprland.toggleRofi()}
			aria-label="Application Launcher (Rofi)"
			class="w-7 h-7 rounded-lg bg-[#313244] hover:bg-[#cba6f7] text-[#cba6f7] hover:text-[#11111b] flex items-center justify-center transition-all cursor-pointer shadow"
		>
			<span class="nf text-sm">{'\uf303'}</span>
		</button>

		<div class="flex items-center bg-[#181825] border border-[#313244] rounded-lg p-0.5 gap-0.5">
			{#each WORKSPACES as ws}
				<button
					type="button"
					onclick={() => hyprland.switchWorkspace(ws.id)}
					aria-label={`Workspace ${ws.id}`}
					class={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
						hyprland.activeWorkspace === ws.id
							? 'bg-[#cba6f7] text-[#11111b] shadow'
							: 'text-[#a6adc8] hover:text-white hover:bg-[#313244]'
					}`}
				>
					<span class="nf text-[10px]">{ws.icon}</span>
					<span>{ws.id}</span>
				</button>
			{/each}
		</div>

		{#if activeWindow}
			<div class="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181825] border border-[#313244] text-[11px] text-[#a6adc8]">
				<span class="nf text-xs text-[#cba6f7]">{activeWindow.icon}</span>
				<span class="max-w-[200px] truncate text-white">{activeWindow.title}</span>
			</div>
		{/if}
	</div>

	<div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#181825] border border-[#313244] text-xs text-[#cdd6f4]">
		<span class="nf text-xs text-[#89b4fa]">{'\uf017'}</span>
		<span class="font-bold text-white">{timeString}</span>
		<span class="text-[#a6adc8]">&bull;</span>
		<span class="text-[#a6adc8]">{dateString}</span>
	</div>

	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => hyprland.toggleTile()}
			aria-label="Toggle Tiling Mode"
			title={hyprland.isTiled ? 'Tiling Mode (Dwindle)' : 'Floating Mode'}
			class="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#181825] border border-[#313244] text-[11px] text-[#cdd6f4] hover:border-[#cba6f7] transition-all cursor-pointer"
		>
			<span class="nf text-xs text-[#cba6f7]">{hyprland.isTiled ? '\uf2d0' : '\uf2d2'}</span>
			<span>{hyprland.isTiled ? 'Tile' : 'Float'}</span>
		</button>

		<button
			type="button"
			onclick={() => hyprland.toggleCheatsheet()}
			aria-label="Keyboard Shortcuts Cheatsheet"
			title="Shortcuts Cheatsheet (Super+?)"
			class="w-7 h-7 rounded-lg bg-[#181825] border border-[#313244] hover:border-[#f9e2af] text-[#f9e2af] flex items-center justify-center transition-all cursor-pointer"
		>
			<span class="nf text-xs">{'\uf11c'}</span>
		</button>

		<LanguageToggle variant="compact" />
		<AudioToggle variant="compact" />

		<a
			href="/"
			onclick={() => audioManager.play('warp')}
			aria-label={localeStore.dict.common.backToPortal}
			title={localeStore.dict.common.backToPortal}
			class="w-7 h-7 rounded-lg bg-[#181825] border border-[#313244] hover:border-[#89b4fa] text-[#89b4fa] flex items-center justify-center transition-all cursor-pointer"
		>
			<span class="nf text-xs">{'\uf14e'}</span>
		</a>

		<button
			type="button"
			onclick={() => hyprland.togglePowerMenu()}
			aria-label="Power & Session Menu"
			class="w-7 h-7 rounded-lg bg-[#181825] border border-[#313244] hover:border-[#f38ba8] text-[#f38ba8] flex items-center justify-center transition-all cursor-pointer"
		>
			<span class="nf text-xs">{'\uf011'}</span>
		</button>
	</div>
</header>
