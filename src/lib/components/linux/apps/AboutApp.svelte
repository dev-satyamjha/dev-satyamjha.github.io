<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
</script>

<div class="w-full h-full p-4 sm:p-6 font-mono text-xs text-[#cdd6f4] bg-[#181825] overflow-y-auto space-y-6 select-text">
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
		<div class="md:col-span-4 flex flex-col items-center space-y-4">
			<div class="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#cba6f7] bg-[#11111b] shadow-xl">
				<img
					src={PORTFOLIO_DATA.profile.avatar}
					alt={PORTFOLIO_DATA.profile.name}
					class="w-full h-full object-cover"
				/>
			</div>

			<div class="w-full p-3 rounded-xl bg-[#11111b] border border-[#313244] text-[11px] space-y-1.5">
				<div class="flex items-center justify-between">
					<span class="text-[#89b4fa]">Host</span>
					<span class="text-white">BIT Mesra Workstation</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-[#89b4fa]">OS</span>
					<span class="text-[#a6e3a1]">Arch Linux x86_64</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-[#89b4fa]">Kernel</span>
					<span class="text-[#f9e2af]">6.10.4-arch1-1</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-[#89b4fa]">WM</span>
					<span class="text-[#cba6f7]">Hyprland (Wayland)</span>
				</div>
			</div>
		</div>

		<div class="md:col-span-8 space-y-4">
			<div class="border-b border-[#313244] pb-3">
				<h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
					<span class="text-[#cba6f7]">{PORTFOLIO_DATA.profile.name}</span>
					<span class="text-xs px-2 py-0.5 rounded bg-[#313244] text-[#a6e3a1]">Active Session</span>
				</h2>
				<div class="text-xs text-[#89b4fa] mt-0.5">{PORTFOLIO_DATA.profile.title}</div>
			</div>

			<div class="space-y-3 text-xs leading-relaxed text-[#cdd6f4] font-sans">
				{#each PORTFOLIO_DATA.profile.bio as para}
					<p>{para}</p>
				{/each}
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
				<div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244]">
					<div class="text-lg font-bold text-[#89b4fa]">400+</div>
					<div class="text-[10px] text-[#a6adc8]">Tool Users</div>
				</div>
				<div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244]">
					<div class="text-lg font-bold text-[#a6e3a1]">50+</div>
					<div class="text-[10px] text-[#a6adc8]">Projects</div>
				</div>
				<div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244]">
					<div class="text-lg font-bold text-[#f9e2af]">8.1</div>
					<div class="text-[10px] text-[#a6adc8]">BIT Mesra CGPA</div>
				</div>
				<div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244]">
					<div class="text-lg font-bold text-[#cba6f7]">24+</div>
					<div class="text-[10px] text-[#a6adc8]">Tech Skills</div>
				</div>
			</div>

			<div class="pt-3 border-t border-[#313244] flex items-center justify-between">
				<div class="flex items-center gap-1.5">
					<span class="w-3 h-3 rounded-full bg-[#f38ba8]"></span>
					<span class="w-3 h-3 rounded-full bg-[#fab387]"></span>
					<span class="w-3 h-3 rounded-full bg-[#f9e2af]"></span>
					<span class="w-3 h-3 rounded-full bg-[#a6e3a1]"></span>
					<span class="w-3 h-3 rounded-full bg-[#74c7ec]"></span>
					<span class="w-3 h-3 rounded-full bg-[#89b4fa]"></span>
					<span class="w-3 h-3 rounded-full bg-[#cba6f7]"></span>
				</div>

				<a
					href={PORTFOLIO_DATA.profile.resumeUrl}
					target="_blank"
					onclick={() => audioManager.play('click')}
					class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold text-[11px] transition-colors"
				>
					<span class="nf text-xs">{'\uf15c'}</span>
					<span>Download CV</span>
				</a>
			</div>
		</div>
	</div>
</div>
