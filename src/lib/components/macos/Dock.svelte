<script lang="ts">
	import { macos, type MacAppId } from '$lib/themes/macos/MacOSConfig.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import DockItem from './DockItem.svelte';

	interface DockItemConfig {
		id: MacAppId;
		name: string;
		icon: string;
		color: string;
	}

	const DOCK_APPS: DockItemConfig[] = [
		{ id: 'finder', name: 'Finder', icon: '\uf07b', color: 'from-blue-500 to-blue-600' },
		{ id: 'terminal', name: 'Terminal', icon: '\uf120', color: 'from-slate-800 to-zinc-900' },
		{ id: 'projects', name: 'Projects', icon: '\uf108', color: 'from-cyan-500 to-blue-600' },
		{
			id: 'experience',
			name: 'Activity Monitor',
			icon: '\uf080',
			color: 'from-emerald-500 to-teal-700'
		},
		{
			id: 'skills',
			name: 'System Information',
			icon: '\uf0e4',
			color: 'from-purple-500 to-indigo-700'
		},
		{ id: 'mail', name: 'Mail', icon: '\uf0e0', color: 'from-sky-400 to-blue-600' },
		{ id: 'notes', name: 'Notes', icon: '\uf249', color: 'from-amber-400 to-yellow-600' },
		{ id: 'settings', name: 'System Settings', icon: '\uf013', color: 'from-slate-600 to-zinc-700' }
	];

	let mouseX = $state<number | null>(null);
	let dockContainer: HTMLElement | null = $state(null);

	function handlePointerMove(e: PointerEvent) {
		if (!dockContainer) return;
		const rect = dockContainer.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
	}

	function handlePointerLeave() {
		mouseX = null;
	}

	function calculateScale(index: number, _total: number): number {
		if (mouseX === null) return 1;
		const itemWidth = 56;
		const itemCenter = index * itemWidth + itemWidth / 2;
		const dist = Math.abs(mouseX - itemCenter);
		const maxDist = 120;
		if (dist > maxDist) return 1;
		return 1 + 0.45 * Math.cos((dist / maxDist) * (Math.PI / 2));
	}
</script>

<div class="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none select-none">
	<div
		role="toolbar"
		tabindex="0"
		aria-label="macOS Application Dock"
		bind:this={dockContainer}
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
		class="pointer-events-auto px-3 pt-2.5 pb-1 rounded-3xl bg-black/35 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-end gap-2.5 transition-all duration-200 outline-none"
	>
		{#each DOCK_APPS as app, index}
			<DockItem
				id={app.id}
				name={app.name}
				icon={app.icon}
				color={app.color}
				isOpen={macos.apps[app.id].isOpen}
				isActive={macos.activeAppId === app.id}
				scale={calculateScale(index, DOCK_APPS.length)}
				onclick={() => {
					if (
						macos.apps[app.id].isOpen &&
						!macos.apps[app.id].isMinimized &&
						macos.activeAppId === app.id
					) {
						macos.toggleMinimizeApp(app.id);
					} else {
						macos.openApp(app.id);
					}
				}}
			/>
		{/each}

		<div class="h-9 w-px bg-white/20 mx-1 mb-2"></div>

		<DockItem
			id="trash"
			name="Bin"
			icon={'\uf1f8'}
			color="from-zinc-700 to-zinc-800"
			isOpen={false}
			isActive={false}
			scale={calculateScale(DOCK_APPS.length + 1, DOCK_APPS.length + 1)}
			onclick={() => {
				audioManager.play('notification');
			}}
		/>
	</div>
</div>
