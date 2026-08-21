<script lang="ts">
	import Menubar from '$lib/components/macos/Menubar.svelte';
	import DesktopIcons from '$lib/components/macos/DesktopIcons.svelte';
	import Dock from '$lib/components/macos/Dock.svelte';
	import SpotlightSearch from '$lib/components/macos/SpotlightSearch.svelte';
	import ControlCenter from '$lib/components/macos/ControlCenter.svelte';
	import { macos } from '$lib/themes/macos/MacOSConfig.svelte';

	let { children } = $props();

	function handleGlobalKeyDown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
			e.preventDefault();
			macos.toggleSpotlight();
		} else if (e.key === 'Escape') {
			if (macos.isSpotlightOpen) macos.isSpotlightOpen = false;
			if (macos.isControlCenterOpen) macos.isControlCenterOpen = false;
			if (macos.isAppleMenuOpen) macos.isAppleMenuOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<div class="fixed inset-0 overflow-hidden flex flex-col select-none font-sans bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#311042] text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.15),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.12),transparent_50%)] pointer-events-none"></div>

	<Menubar />

	<div class="relative flex-1 w-full h-full overflow-hidden">
		<DesktopIcons />
		{@render children()}
	</div>

	<Dock />
	<SpotlightSearch />
	<ControlCenter />
</div>
