<script lang="ts">
	import { onMount } from 'svelte';
	import { hyprland } from '$lib/themes/linux/HyprlandConfig.svelte';
	import type { WindowId } from '$lib/types/window';

	const SHORTCUTS = [
		{ key: 'Super + Return', action: 'Open Terminal', windowId: 'terminal' as WindowId },
		{ key: 'Super + D', action: 'Rofi App Launcher', custom: () => hyprland.toggleRofi() },
		{ key: 'Super + P', action: 'Projects Browser', windowId: 'projects' as WindowId },
		{ key: 'Super + E', action: 'Experience Monitor', windowId: 'experience' as WindowId },
		{ key: 'Super + S', action: 'Skills Arsenal', windowId: 'skills' as WindowId },
		{ key: 'Super + B', action: 'Technical Blog', windowId: 'blog' as WindowId },
		{ key: 'Super + C', action: 'Compose Transmission', windowId: 'contact' as WindowId },
		{ key: 'Super + Q', action: 'Close Active Window', custom: () => hyprland.activeWindowId && hyprland.closeWindow(hyprland.activeWindowId) },
		{ key: 'Super + 1..5', action: 'Switch Workspaces', custom: () => {} },
		{ key: 'Super + M', action: 'Toggle Maximize Window', custom: () => hyprland.activeWindowId && hyprland.toggleMaximize(hyprland.activeWindowId) },
		{ key: 'Super + Space', action: 'Toggle Tiling / Floating', custom: () => hyprland.toggleTile() }
	];

	onMount(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.metaKey || e.altKey) {
				if (e.key === 'Enter') {
					e.preventDefault();
					hyprland.openWindow('terminal');
				} else if (e.key === 'd' || e.key === 'D') {
					e.preventDefault();
					hyprland.toggleRofi();
				} else if (e.key === 'p' || e.key === 'P') {
					e.preventDefault();
					hyprland.openWindow('projects');
				} else if (e.key === 'e' || e.key === 'E') {
					e.preventDefault();
					hyprland.openWindow('experience');
				} else if (e.key === 's' || e.key === 'S') {
					e.preventDefault();
					hyprland.openWindow('skills');
				} else if (e.key === 'b' || e.key === 'B') {
					e.preventDefault();
					hyprland.openWindow('blog');
				} else if (e.key === 'c' || e.key === 'C') {
					e.preventDefault();
					hyprland.openWindow('contact');
				} else if (e.key === 'q' || e.key === 'Q') {
					e.preventDefault();
					if (hyprland.activeWindowId) hyprland.closeWindow(hyprland.activeWindowId);
				} else if (['1', '2', '3', '4', '5'].includes(e.key)) {
					e.preventDefault();
					hyprland.switchWorkspace(parseInt(e.key, 10));
				} else if (e.key === ' ') {
					e.preventDefault();
					hyprland.toggleTile();
				} else if (e.key === 'm' || e.key === 'M') {
					e.preventDefault();
					if (hyprland.activeWindowId) hyprland.toggleMaximize(hyprland.activeWindowId);
				}
			} else if (e.key === 'Escape') {
				if (hyprland.isRofiOpen) hyprland.isRofiOpen = false;
				if (hyprland.isPowerMenuOpen) hyprland.isPowerMenuOpen = false;
				if (hyprland.isCheatsheetOpen) hyprland.isCheatsheetOpen = false;
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="fixed bottom-4 left-4 z-10 pointer-events-none hidden lg:block opacity-40 hover:opacity-100 transition-opacity font-mono text-[11px] text-[#a6adc8] space-y-1">
	<div class="flex items-center gap-2">
		<span class="px-1.5 py-0.5 rounded bg-[#181825] border border-[#313244] text-[#cba6f7] text-[10px]">Super+D</span>
		<span>App Launcher</span>
	</div>
	<div class="flex items-center gap-2">
		<span class="px-1.5 py-0.5 rounded bg-[#181825] border border-[#313244] text-[#cba6f7] text-[10px]">Super+Return</span>
		<span>Terminal</span>
	</div>
	<div class="flex items-center gap-2">
		<span class="px-1.5 py-0.5 rounded bg-[#181825] border border-[#313244] text-[#cba6f7] text-[10px]">Super+1..5</span>
		<span>Workspaces</span>
	</div>
</div>

{#if hyprland.isCheatsheetOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
		role="dialog"
		aria-modal="true"
		aria-label="Hyprland Keybindings Cheatsheet"
	>
		<button
			type="button"
			class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
			onclick={() => (hyprland.isCheatsheetOpen = false)}
			aria-label="Close modal background"
		></button>

		<div class="relative z-10 w-full max-w-lg rounded-3xl border border-[#cba6f7]/40 bg-[#181825] shadow-2xl p-6 sm:p-7 font-mono space-y-5">
			<div class="flex items-center justify-between border-b border-[#313244] pb-3">
				<div class="flex items-center gap-2 text-white font-bold">
					<span class="nf text-sm text-[#cba6f7]">{'\uf11c'}</span>
					<span>Hyprland Keybindings Cheatsheet</span>
				</div>
				<button
					type="button"
					onclick={() => (hyprland.isCheatsheetOpen = false)}
					class="w-7 h-7 rounded-lg bg-[#11111b] border border-[#313244] text-[#a6adc8] hover:text-white flex items-center justify-center cursor-pointer"
				>
					<span class="nf text-xs">{'\uf00d'}</span>
				</button>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
				{#each SHORTCUTS as item}
					<div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244] flex items-center justify-between">
						<span class="text-[#cdd6f4]">{item.action}</span>
						<span class="px-1.5 py-0.5 rounded bg-[#313244] text-[#cba6f7] font-bold text-[10px]">
							{item.key}
						</span>
					</div>
				{/each}
			</div>

			<div class="pt-2 text-center text-[11px] text-[#a6adc8] border-t border-[#313244]">
				Tip: Press <kbd class="px-1.5 py-0.5 rounded bg-[#313244] text-white">Esc</kbd> to close any modal.
			</div>
		</div>
	</div>
{/if}
