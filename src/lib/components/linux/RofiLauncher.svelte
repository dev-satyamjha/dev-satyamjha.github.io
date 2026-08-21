<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { hyprland } from '$lib/themes/linux/HyprlandConfig.svelte';
	import { notifications } from '$lib/stores/notifications.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { goto } from '$app/navigation';
	import type { WindowId } from '$lib/types/window';

	interface RofiApp {
		id: string;
		name: string;
		desc: string;
		icon: string;
		category: 'system' | 'portfolio' | 'dimension';
		action: () => void;
	}

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let searchInput: HTMLInputElement | null = $state(null);

	const APPS: RofiApp[] = [
		{
			id: 'terminal',
			name: 'Alacritty',
			desc: 'Interactive Terminal Shell & Command Line',
			icon: '\uf120',
			category: 'system',
			action: () => {
				hyprland.openWindow('terminal');
				notifications.notify('Alacritty Launched', 'Terminal workspace active', 'info', '\uf120');
			}
		},
		{
			id: 'about',
			name: 'Fastfetch',
			desc: 'System Hardware & Profile Telemetry',
			icon: '\uf303',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('about');
				notifications.notify('Fastfetch Launched', 'Displaying system telemetry', 'info', '\uf303');
			}
		},
		{
			id: 'projects',
			name: 'Ranger',
			desc: 'Miller-Columns Project Files Explorer',
			icon: '\uf07c',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('projects');
				notifications.notify('Ranger Launched', 'Opened ~/projects explorer', 'info', '\uf07c');
			}
		},
		{
			id: 'experience',
			name: 'Htop',
			desc: 'Internship & Work Experience Process Monitor',
			icon: '\uf080',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('experience');
				notifications.notify('Htop Launched', 'Monitoring background internships', 'info', '\uf080');
			}
		},
		{
			id: 'skills',
			name: 'Btop',
			desc: 'Technical Skills & Arsenal Resource Monitor',
			icon: '\uf0e4',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('skills');
				notifications.notify('Btop Launched', 'Inspecting skill matrix', 'info', '\uf0e4');
			}
		},
		{
			id: 'contact',
			name: 'Mutt',
			desc: 'Encrypted Transmission & Email Client',
			icon: '\uf0e0',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('contact');
				notifications.notify('Mutt Launched', 'Ready to compose transmission', 'info', '\uf0e0');
			}
		},
		{
			id: 'blog',
			name: 'Neovim',
			desc: 'Markdown Technical Blog Buffer',
			icon: '\ue62b',
			category: 'portfolio',
			action: () => {
				hyprland.openWindow('blog');
				notifications.notify('Neovim Launched', 'Opened ~/notes/blog.md', 'info', '\ue62b');
			}
		},
		{
			id: 'dim-clean',
			name: 'Dimension: Clean Modern',
			desc: 'Switch to Minimalist Typography Portfolio',
			icon: '\uf108',
			category: 'dimension',
			action: () => {
				audioManager.play('warp');
				goto('/clean');
			}
		},
		{
			id: 'dim-gaming',
			name: 'Dimension: Arcade Realm',
			desc: 'Switch to Retro Arcade Cabinet',
			icon: '\uf11b',
			category: 'dimension',
			action: () => {
				audioManager.play('warp');
				goto('/gaming');
			}
		},
		{
			id: 'dim-space',
			name: 'Dimension: Cosmic Voyage',
			desc: 'Switch to Deep Space Orbital HUD',
			icon: '\uf135',
			category: 'dimension',
			action: () => {
				audioManager.play('warp');
				goto('/space');
			}
		},
		{
			id: 'dim-macos',
			name: 'Dimension: macOS Desktop',
			desc: 'Switch to Apple Sonoma Desktop Simulation',
			icon: '\uf179',
			category: 'dimension',
			action: () => {
				audioManager.play('warp');
				goto('/macos');
			}
		},
		{
			id: 'dim-portal',
			name: 'Dimension Portal Gateway',
			desc: 'Return to Central Gateway Matrix',
			icon: '\uf14e',
			category: 'dimension',
			action: () => {
				audioManager.play('warp');
				goto('/');
			}
		}
	];

	let filteredApps = $derived(
		APPS.filter(
			(a) =>
				searchQuery === '' ||
				a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
				a.category.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	$effect(() => {
		if (hyprland.isRofiOpen) {
			searchQuery = '';
			selectedIndex = 0;
			tick().then(() => searchInput?.focus());
		}
	});

	function executeApp(app: RofiApp) {
		audioManager.play('click');
		hyprland.isRofiOpen = false;
		app.action();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			audioManager.play('click');
			selectedIndex = (selectedIndex + 1) % Math.max(1, filteredApps.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			audioManager.play('click');
			selectedIndex = (selectedIndex - 1 + filteredApps.length) % Math.max(1, filteredApps.length);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filteredApps[selectedIndex]) {
				executeApp(filteredApps[selectedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			hyprland.isRofiOpen = false;
		}
	}
</script>

{#if hyprland.isRofiOpen}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
		role="dialog"
		aria-modal="true"
		aria-label="Application Launcher"
	>
		<button
			type="button"
			class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
			onclick={() => (hyprland.isRofiOpen = false)}
			aria-label="Close application launcher"
		></button>

		<div
			class="relative z-10 w-full max-w-xl rounded-3xl border-2 border-[#cba6f7] bg-[#181825] shadow-2xl p-4 sm:p-6 font-mono space-y-4"
		>
			<div class="relative flex items-center bg-[#11111b] border border-[#313244] rounded-2xl px-4 py-2.5">
				<span class="nf text-sm text-[#cba6f7] mr-3">{'\uf002'}</span>
				<input
					bind:this={searchInput}
					type="search"
					bind:value={searchQuery}
					onkeydown={handleKeyDown}
					placeholder="Search applications, tools, and dimensions..."
					class="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-[#45475a] focus:ring-0"
					autocomplete="off"
					spellcheck="false"
				/>
				<span class="text-[10px] text-[#a6adc8] font-mono px-2 py-0.5 rounded bg-[#313244]">rofi -drun</span>
			</div>

			<div class="max-h-[340px] overflow-y-auto space-y-1.5 pr-1">
				{#if filteredApps.length === 0}
					<div class="p-6 text-center text-xs text-[#a6adc8] space-y-1">
						<span class="nf text-lg text-[#f38ba8] block">{'\uf06a'}</span>
						<div>No applications matching "{searchQuery}"</div>
					</div>
				{:else}
					{#each filteredApps as app, index}
						<button
							type="button"
							onclick={() => executeApp(app)}
							onmouseenter={() => (selectedIndex = index)}
							class={`w-full text-left p-2.5 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
								selectedIndex === index
									? 'bg-[#cba6f7] text-[#11111b] font-bold shadow'
									: 'hover:bg-[#11111b] text-[#cdd6f4]'
							}`}
						>
							<div class="flex items-center gap-3 truncate">
								<span
									class={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
										selectedIndex === index
											? 'bg-[#11111b] border-[#11111b] text-[#cba6f7]'
											: 'bg-[#11111b] border-[#313244] text-[#89b4fa]'
									}`}
								>
									<span class="nf text-sm">{app.icon}</span>
								</span>
								<div class="truncate space-y-0.5">
									<div class="text-xs truncate">{app.name}</div>
									<div class={`text-[10px] truncate font-normal ${selectedIndex === index ? 'text-[#11111b]/80' : 'text-[#a6adc8]'}`}>
										{app.desc}
									</div>
								</div>
							</div>

							<span
								class={`text-[9px] uppercase px-2 py-0.5 rounded shrink-0 ${
									selectedIndex === index
										? 'bg-[#11111b] text-white'
										: 'bg-[#181825] border border-[#313244] text-[#89b4fa]'
								}`}
							>
								{app.category}
							</span>
						</button>
					{/each}
				{/if}
			</div>

			<div class="pt-2 border-t border-[#313244] flex items-center justify-between text-[10px] text-[#a6adc8]">
				<span>Navigate with <kbd class="px-1 py-0.5 bg-[#313244] text-white rounded">↑</kbd> <kbd class="px-1 py-0.5 bg-[#313244] text-white rounded">↓</kbd></span>
				<span>Press <kbd class="px-1.5 py-0.5 bg-[#313244] text-white rounded">Enter</kbd> to launch &bull; <kbd class="px-1.5 py-0.5 bg-[#313244] text-white rounded">Esc</kbd> to close</span>
			</div>
		</div>
	</div>
{/if}
