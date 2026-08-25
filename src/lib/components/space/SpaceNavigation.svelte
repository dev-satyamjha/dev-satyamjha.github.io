<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	export type SpaceSector = 'bridge' | 'hangar' | 'engineering' | 'missions' | 'comms' | 'vault';

	interface Props {
		activeSector: SpaceSector;
		onSelectSector: (sector: SpaceSector) => void;
	}

	let { activeSector, onSelectSector }: Props = $props();

	const SECTORS: { id: SpaceSector; name: string; designation: string; icon: string }[] = [
		{ id: 'bridge', name: 'Command Bridge', designation: 'SEC-01 // BIO', icon: '\uf135' },
		{ id: 'hangar', name: 'Fleet Hangar', designation: 'SEC-02 // PROJECTS', icon: '\uf07b' },
		{ id: 'engineering', name: 'Reactor Core', designation: 'SEC-03 // ARSENAL', icon: '\uf0e4' },
		{ id: 'missions', name: 'Mission Logs', designation: 'SEC-04 // CAREER', icon: '\uf080' },
		{ id: 'comms', name: 'Comms Array', designation: 'SEC-05 // TRANSMIT', icon: '\uf0e0' },
		{ id: 'vault', name: 'Data Vault', designation: 'SEC-06 // LOGS', icon: '\uf249' }
	];

	function select(id: SpaceSector) {
		audioManager.play('click');
		onSelectSector(id);
	}
</script>

<div
	class="w-full bg-[#030712]/70 backdrop-blur-md border-b border-cyan-500/20 px-3 py-2 overflow-x-auto select-none"
>
	<nav
		class="flex items-center justify-center gap-2 min-w-max mx-auto"
		aria-label="Space Station Sector Navigation"
	>
		{#each SECTORS as sector}
			<button
				type="button"
				onclick={() => select(sector.id)}
				class={`px-3 sm:px-4 py-2 rounded-xl border font-mono text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
					activeSector === sector.id
						? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
						: 'bg-[#0b1329]/40 border-cyan-500/20 text-cyan-400/70 hover:bg-cyan-950/50 hover:text-cyan-200'
				}`}
			>
				<span
					class={`nf text-sm ${activeSector === sector.id ? 'text-cyan-300' : 'text-cyan-500'}`}
				>
					{sector.icon}
				</span>
				<div class="text-left">
					<div class="font-bold text-[11px] uppercase tracking-wider">{sector.name}</div>
					<div class="text-[9px] opacity-60 tracking-widest">{sector.designation}</div>
				</div>
			</button>
		{/each}
	</nav>
</div>
