<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { hyprland } from '$lib/themes/linux/HyprlandConfig.svelte';
	import Window from '$lib/components/linux/Window.svelte';
	import TerminalCore from '$lib/components/linux/TerminalCore.svelte';
	import AboutApp from '$lib/components/linux/apps/AboutApp.svelte';
	import ProjectsApp from '$lib/components/linux/apps/ProjectsApp.svelte';
	import ExperienceApp from '$lib/components/linux/apps/ExperienceApp.svelte';
	import SkillsApp from '$lib/components/linux/apps/SkillsApp.svelte';
	import ContactApp from '$lib/components/linux/apps/ContactApp.svelte';
	import BlogApp from '$lib/components/linux/apps/BlogApp.svelte';
	import ResumeApp from '$lib/components/linux/apps/ResumeApp.svelte';
	import type { WindowId } from '$lib/types/window';

	const openWindowKeys = $derived(
		(Object.keys(hyprland.windows) as WindowId[]).filter(
			(id) => hyprland.windows[id].isOpen && !hyprland.windows[id].isMinimized
		)
	);
</script>

<SEOHead
	title={`${PORTFOLIO_DATA.profile.name} | Linux Hyprland`}
	description="Arch Linux & Hyprland tiling window manager portfolio simulation by Satyam Kumar."
	pathname="/linux"
/>

<main
	id="main-content"
	class={`relative w-full h-full p-2 sm:p-4 overflow-hidden ${
		hyprland.isTiled && openWindowKeys.length > 0
			? openWindowKeys.length === 1
				? 'flex items-stretch justify-stretch'
				: openWindowKeys.length === 2
					? 'grid grid-cols-1 lg:grid-cols-2 gap-3'
					: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
			: 'block'
	}`}
>
	{#each openWindowKeys as id (id)}
		<Window windowState={hyprland.windows[id]}>
			{#if id === 'terminal'}
				<TerminalCore />
			{:else if id === 'about'}
				<AboutApp />
			{:else if id === 'projects'}
				<ProjectsApp />
			{:else if id === 'experience'}
				<ExperienceApp />
			{:else if id === 'skills'}
				<SkillsApp />
			{:else if id === 'contact'}
				<ContactApp />
			{:else if id === 'blog'}
				<BlogApp />
			{:else if id === 'resume'}
				<ResumeApp />
			{:else}
				<div class="p-4 font-mono text-xs text-[#cdd6f4] space-y-2">
					<div class="font-bold text-[#89b4fa]">{hyprland.windows[id].title}</div>
					<p class="text-[#a6adc8]">Application ready.</p>
				</div>
			{/if}
		</Window>
	{/each}
</main>
