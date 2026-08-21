<script lang="ts">
	import { onMount } from 'svelte';
	import Waybar from '$lib/components/linux/Waybar.svelte';
	import DesktopShortcuts from '$lib/components/linux/DesktopShortcuts.svelte';
	import RofiLauncher from '$lib/components/linux/RofiLauncher.svelte';
	import NotificationCenter from '$lib/components/linux/NotificationCenter.svelte';
	import { notifications } from '$lib/stores/notifications.svelte';

	let { children } = $props();

	onMount(() => {
		notifications.notify(
			'Hyprland 0.41 (Wayland)',
			'Session initialized. Press Super+D for Rofi, Super+Return for Terminal.',
			'info',
			'\uf303'
		);
	});
</script>

<div class="fixed inset-0 bg-[#1e1e2e] text-[#cdd6f4] font-mono overflow-hidden flex flex-col select-none selection:bg-[#cba6f7] selection:text-[#11111b]">
	<Waybar />

	<div class="relative flex-1 w-full h-full overflow-hidden bg-radial from-[#1e1e2e] to-[#11111b]">
		<div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
			<span class="nf text-[280px] sm:text-[360px] text-[#cba6f7]">{'\uf303'}</span>
		</div>

		{@render children()}
		<DesktopShortcuts />
		<RofiLauncher />
		<NotificationCenter />
	</div>
</div>
