<script lang="ts">
	import { onMount } from 'svelte';
	import { macos } from '$lib/themes/macos/MacOSConfig.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { goto } from '$app/navigation';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';

	let clockString = $state('');

	onMount(() => {
		function updateTime() {
			const now = new Date();
			clockString =
				now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) +
				' ' +
				now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
		}
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});

	let activeAppName = $derived(
		macos.activeAppId === 'finder'
			? 'Finder'
			: macos.activeAppId === 'terminal'
				? 'Terminal'
				: macos.activeAppId === 'projects'
					? 'Projects'
					: macos.activeAppId === 'experience'
						? 'Activity Monitor'
						: macos.activeAppId === 'skills'
							? 'System Info'
							: macos.activeAppId === 'mail'
								? 'Mail'
								: macos.activeAppId === 'notes'
									? 'Notes'
									: 'System Settings'
	);
</script>

<header
	class="w-full h-7 bg-black/40 backdrop-blur-2xl border-b border-white/10 px-3 flex items-center justify-between text-xs text-white/90 font-sans select-none z-40"
>
	<div class="flex items-center gap-4">
		<div class="relative">
			<button
				type="button"
				onclick={() => macos.toggleAppleMenu()}
				aria-label="Apple Menu"
				class="hover:opacity-75 transition-opacity px-1 py-0.5 rounded flex items-center cursor-pointer"
			>
				<span class="nf text-sm">{'\uf179'}</span>
			</button>

			{#if macos.isAppleMenuOpen}
				<div
					class="absolute top-7 left-0 w-56 rounded-xl bg-[#1e1e2e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-1.5 space-y-1 font-sans text-xs text-[#cdd6f4] animate-in fade-in duration-100 z-50"
				>
					<button
						type="button"
						onclick={() => {
							macos.isAppleMenuOpen = false;
							macos.openApp('finder');
						}}
						class="w-full text-left px-2.5 py-1 rounded-lg hover:bg-[#89b4fa] hover:text-[#11111b] transition-colors cursor-pointer flex items-center justify-between"
					>
						<span>About Satyam Kumar</span>
						<span class="nf text-xs">{'\uf179'}</span>
					</button>

					<button
						type="button"
						onclick={() => {
							macos.isAppleMenuOpen = false;
							macos.openApp('settings');
						}}
						class="w-full text-left px-2.5 py-1 rounded-lg hover:bg-[#89b4fa] hover:text-[#11111b] transition-colors cursor-pointer"
					>
						System Settings...
					</button>

					<div class="h-px bg-white/10 my-1"></div>

					<button
						type="button"
						onclick={() => {
							macos.isAppleMenuOpen = false;
							audioManager.play('warp');
							goto('/clean');
						}}
						class="w-full text-left px-2.5 py-1 rounded-lg hover:bg-[#89b4fa] hover:text-[#11111b] transition-colors cursor-pointer"
					>
						Dimension: Clean Modern
					</button>

					<button
						type="button"
						onclick={() => {
							macos.isAppleMenuOpen = false;
							audioManager.play('warp');
							goto('/linux');
						}}
						class="w-full text-left px-2.5 py-1 rounded-lg hover:bg-[#89b4fa] hover:text-[#11111b] transition-colors cursor-pointer"
					>
						Dimension: Linux Hyprland
					</button>

					<div class="h-px bg-white/10 my-1"></div>

					<button
						type="button"
						onclick={() => {
							macos.isAppleMenuOpen = false;
							audioManager.play('warp');
							goto('/');
						}}
						class="w-full text-left px-2.5 py-1 rounded-lg hover:bg-[#f38ba8] hover:text-[#11111b] transition-colors cursor-pointer text-[#f38ba8]"
					>
						Return to Portal...
					</button>
				</div>
			{/if}
		</div>

		<span class="font-bold tracking-tight text-white">{activeAppName}</span>

		<nav class="hidden md:flex items-center gap-3 text-white/80 font-normal text-[11px]">
			<button type="button" class="hover:text-white transition-colors cursor-pointer">File</button>
			<button type="button" class="hover:text-white transition-colors cursor-pointer">Edit</button>
			<button type="button" class="hover:text-white transition-colors cursor-pointer">View</button>
			<button type="button" class="hover:text-white transition-colors cursor-pointer">Window</button
			>
			<button type="button" class="hover:text-white transition-colors cursor-pointer">Help</button>
		</nav>
	</div>

	<div class="flex items-center gap-3 text-white/90 text-[11px]">
		<div class="hidden sm:flex items-center gap-1.5">
			<span class="nf text-xs">{'\uf240'}</span>
			<span>100%</span>
		</div>

		<span class="nf text-xs hidden sm:inline-block">{'\uf1eb'}</span>

		<button
			type="button"
			onclick={() => macos.toggleSpotlight()}
			aria-label="Spotlight Search"
			class="hover:text-white transition-colors px-1 py-0.5 cursor-pointer"
		>
			<span class="nf text-xs">{'\uf002'}</span>
		</button>

		<button
			type="button"
			onclick={() => macos.toggleControlCenter()}
			aria-label="Control Center"
			class="hover:text-white transition-colors px-1 py-0.5 cursor-pointer"
		>
			<span class="nf text-xs">{'\uf085'}</span>
		</button>

		<LanguageToggle variant="compact" />
		<AudioToggle variant="compact" />

		<a
			href="/"
			onclick={() => audioManager.play('warp')}
			aria-label={localeStore.dict.common.backToPortal}
			title={localeStore.dict.common.backToPortal}
			class="hover:text-white transition-colors px-1 py-0.5 cursor-pointer"
		>
			<span class="nf text-xs text-[#89b4fa]">{'\uf14e'}</span>
		</a>

		<span class="font-medium text-white tracking-tight ml-1">{clockString}</span>
	</div>
</header>
