<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { macos, type MacAppId } from '$lib/themes/macos/MacOSConfig.svelte';
	import MacWindow from '$lib/components/macos/MacWindow.svelte';
	import MacFinder from '$lib/components/macos/apps/MacFinder.svelte';
	import MacActivityMonitor from '$lib/components/macos/apps/MacActivityMonitor.svelte';
	import MacNotes from '$lib/components/macos/apps/MacNotes.svelte';
	import MacMail from '$lib/components/macos/apps/MacMail.svelte';
	import MacSettings from '$lib/components/macos/apps/MacSettings.svelte';
	import MacTerminal from '$lib/components/macos/apps/MacTerminal.svelte';

	const openAppKeys = $derived(
		(Object.keys(macos.apps) as MacAppId[]).filter(
			(id) => macos.apps[id].isOpen && !macos.apps[id].isMinimized
		)
	);
</script>

<SEOHead
	title={`${PORTFOLIO_DATA.profile.name} | macOS Sonoma Desktop`}
	description="Apple macOS Sonoma desktop simulation portfolio by Satyam Kumar."
	pathname="/macos"
/>

<main id="main-content" class="relative w-full h-full overflow-hidden">
	{#each openAppKeys as id (id)}
		<MacWindow appState={macos.apps[id]}>
			{#if id === 'finder' || id === 'projects' || id === 'skills'}
				<MacFinder />
			{:else if id === 'experience'}
				<MacActivityMonitor />
			{:else if id === 'notes'}
				<MacNotes />
			{:else if id === 'mail'}
				<MacMail />
			{:else if id === 'terminal'}
				<MacTerminal />
			{:else if id === 'settings'}
				<MacSettings />
			{/if}
		</MacWindow>
	{/each}

	<div
		class="absolute bottom-6 left-6 text-white/30 font-sans text-[11px] select-none pointer-events-none"
	>
		<div>macOS Sonoma 14.5 Developer Preview</div>
		<div>Satyam's MacBook Pro (Apple Silicon)</div>
	</div>
</main>
