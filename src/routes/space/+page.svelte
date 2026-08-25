<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import SpaceNavigation, { type SpaceSector } from '$lib/components/space/SpaceNavigation.svelte';
	import BridgeSector from '$lib/components/space/sectors/BridgeSector.svelte';
	import HangarSector from '$lib/components/space/sectors/HangarSector.svelte';
	import ReactorSector from '$lib/components/space/sectors/ReactorSector.svelte';
	import MissionsSector from '$lib/components/space/sectors/MissionsSector.svelte';
	import CommsSector from '$lib/components/space/sectors/CommsSector.svelte';
	import VaultSector from '$lib/components/space/sectors/VaultSector.svelte';

	let activeSector = $state<SpaceSector>('bridge');
</script>

<SEOHead
	title={`${PORTFOLIO_DATA.profile.name} | Cosmic Voyage`}
	description="Deep space orbital station portfolio experience by Satyam Kumar."
	pathname="/space"
/>

<main id="main-content" class="w-full h-full flex flex-col overflow-hidden">
	<SpaceNavigation {activeSector} onSelectSector={(sec) => (activeSector = sec)} />

	<div class="flex-1 p-3 sm:p-6 overflow-y-auto">
		{#if activeSector === 'bridge'}
			<BridgeSector />
		{:else if activeSector === 'hangar'}
			<HangarSector />
		{:else if activeSector === 'engineering'}
			<ReactorSector />
		{:else if activeSector === 'missions'}
			<MissionsSector />
		{:else if activeSector === 'comms'}
			<CommsSector />
		{:else if activeSector === 'vault'}
			<VaultSector />
		{/if}
	</div>
</main>
