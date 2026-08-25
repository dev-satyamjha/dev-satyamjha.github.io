<script lang="ts">
	import { macos } from '$lib/themes/macos/MacOSConfig.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';

	interface DesktopIconItem {
		id: string;
		name: string;
		icon: string;
		color: string;
		action: () => void;
	}

	let selectedIconId = $state<string | null>(null);

	const ICONS: DesktopIconItem[] = [
		{
			id: 'hd',
			name: 'Macintosh HD',
			icon: '\uf0a0',
			color: 'text-[#94a3b8]',
			action: () => macos.openApp('finder')
		},
		{
			id: 'projects',
			name: 'Projects',
			icon: '\uf07b',
			color: 'text-[#38bdf8]',
			action: () => macos.openApp('projects')
		},
		{
			id: 'resume',
			name: 'Resume.pdf',
			icon: '\uf15c',
			color: 'text-[#f87171]',
			action: () => {
				if (typeof window !== 'undefined') window.open(PORTFOLIO_DATA.profile.resumeUrl, '_blank');
			}
		},
		{
			id: 'notes',
			name: 'Notes',
			icon: '\uf249',
			color: 'text-[#facc15]',
			action: () => macos.openApp('notes')
		},
		{
			id: 'experience',
			name: 'Work History',
			icon: '\uf080',
			color: 'text-[#4ade80]',
			action: () => macos.openApp('experience')
		}
	];

	function handleClick(item: DesktopIconItem) {
		audioManager.play('click');
		if (selectedIconId === item.id) {
			item.action();
			selectedIconId = null;
		} else {
			selectedIconId = item.id;
		}
	}
</script>

<div class="absolute top-10 right-4 z-10 flex flex-col gap-4 select-none">
	{#each ICONS as item}
		<button
			type="button"
			onclick={() => handleClick(item)}
			ondblclick={() => item.action()}
			class={`w-20 p-2 rounded-xl flex flex-col items-center gap-1 text-center transition-colors cursor-pointer ${
				selectedIconId === item.id
					? 'bg-blue-600/30 border border-blue-400/50 shadow-lg'
					: 'hover:bg-white/10 border border-transparent'
			}`}
		>
			<span class={`nf text-3xl sm:text-4xl drop-shadow-md ${item.color}`}>
				{item.icon}
			</span>
			<span
				class="text-[11px] font-sans font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-2 leading-tight"
			>
				{item.name}
			</span>
		</button>
	{/each}
</div>
