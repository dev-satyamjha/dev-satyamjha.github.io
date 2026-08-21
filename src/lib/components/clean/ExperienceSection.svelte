<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
</script>

<section id="experience" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-10">
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs text-[#89b4fa]">03.</span>
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{localeStore.dict.sections.experienceHeading}
			</h2>
			<div class="flex-1 h-px bg-[#27272a]"></div>
		</div>

		<div class="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-[#27272a]">
			{#each PORTFOLIO_DATA.experience as exp, index}
				<div class="relative group">
					<div class="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 border-[#89b4fa] bg-[#11111b] group-hover:scale-125 transition-transform"></div>

					<div class="rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 sm:p-7 space-y-4 hover:border-[#89b4fa]/40 transition-colors">
						<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
							<div>
								<h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">
									{exp.role}
								</h3>
								<div class="text-sm font-mono text-[#89b4fa]">
									{exp.company}
								</div>
							</div>

							<div class="flex items-center gap-2 text-xs font-mono text-[#a6adc8]">
								<span class="nf text-xs text-[#89b4fa]">{'\uf073'}</span>
								<span>{exp.duration}</span>
								<span>&bull;</span>
								<span class="px-2 py-0.5 rounded bg-[#11111b] border border-[#313244] text-[10px]">
									{exp.mode}
								</span>
							</div>
						</div>

						<ul class="space-y-2 text-xs sm:text-sm text-[#cdd6f4] font-sans">
							{#each exp.highlights as highlight}
								<li class="flex items-start gap-2.5">
									<span class="nf text-xs text-[#89b4fa] mt-1 shrink-0">{'\uf00c'}</span>
									<span class="leading-relaxed">{highlight}</span>
								</li>
							{/each}
						</ul>

						<div class="pt-3 border-t border-[#27272a]/60 flex flex-wrap items-center gap-1.5">
							{#each exp.technologies as tech}
								<span class="px-2.5 py-1 rounded-lg bg-[#11111b] border border-[#313244] text-[10px] font-mono text-[#a6adc8]">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
