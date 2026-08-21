<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
</script>

<section id="about" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-10">
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs text-[#89b4fa]">01.</span>
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{localeStore.dict.sections.aboutHeading}
			</h2>
			<div class="flex-1 h-px bg-[#27272a]"></div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
			<div class="lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
				<div class="relative group">
					<div class="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#313244] bg-[#181825] shadow-2xl">
						<img
							src={PORTFOLIO_DATA.profile.avatar}
							alt={PORTFOLIO_DATA.profile.name}
							class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
							loading="lazy"
						/>
					</div>
					<div class="absolute -bottom-3 -right-3 px-3 py-1 rounded-xl bg-[#1e1e2e] border border-[#313244] text-[10px] font-mono text-[#a6e3a1] shadow-lg flex items-center gap-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#a6e3a1]"></span>
						<span>BIT Mesra '27</span>
					</div>
				</div>

				<div class="w-full space-y-2 pt-2 text-xs font-mono text-[#a6adc8]">
					<div class="flex items-center justify-between py-1.5 border-b border-[#27272a]">
						<span class="text-[#89b4fa]">{PORTFOLIO_DATA.profile.location}</span>
						<span>India</span>
					</div>
					<div class="flex items-center justify-between py-1.5 border-b border-[#27272a]">
						<span class="text-[#89b4fa]">Focus</span>
						<span>Full Stack & Systems</span>
					</div>
					<div class="flex items-center justify-between py-1.5 border-b border-[#27272a]">
						<span class="text-[#89b4fa]">OS</span>
						<span>Arch Linux / Windows</span>
					</div>
				</div>
			</div>

			<div class="lg:col-span-8 space-y-6">
				<div class="space-y-4 text-sm sm:text-base text-[#cdd6f4] leading-relaxed font-sans">
					{#each PORTFOLIO_DATA.profile.bio as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] text-center space-y-1">
						<div class="text-2xl font-bold font-mono text-[#89b4fa]">400+</div>
						<div class="text-[11px] text-[#a6adc8] font-mono">App Users</div>
					</div>
					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] text-center space-y-1">
						<div class="text-2xl font-bold font-mono text-[#a6e3a1]">50+</div>
						<div class="text-[11px] text-[#a6adc8] font-mono">Projects</div>
					</div>
					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] text-center space-y-1">
						<div class="text-2xl font-bold font-mono text-[#f9e2af]">8.1</div>
						<div class="text-[11px] text-[#a6adc8] font-mono">CGPA (Top 10%)</div>
					</div>
					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] text-center space-y-1">
						<div class="text-2xl font-bold font-mono text-[#cba6f7]">24+</div>
						<div class="text-[11px] text-[#a6adc8] font-mono">Tech Skills</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
