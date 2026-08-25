<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
</script>

<section id="education" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-10">
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs text-[#89b4fa]">05.</span>
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{localeStore.dict.sections.educationHeading}
			</h2>
			<div class="flex-1 h-px bg-[#27272a]"></div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
			<div class="lg:col-span-7 space-y-4">
				<h3
					class="text-sm font-mono uppercase tracking-wider text-[#a6adc8] flex items-center gap-2"
				>
					<span class="nf text-xs text-[#89b4fa]">{'\uf19d'}</span>
					<span>Academic Background</span>
				</h3>

				<div class="space-y-4">
					{#each PORTFOLIO_DATA.education as edu}
						<div
							class="rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 space-y-3 hover:border-[#89b4fa]/40 transition-colors"
						>
							<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
								<div>
									<h4 class="text-base sm:text-lg font-bold text-white tracking-tight">
										{edu.institution}
									</h4>
									<div class="text-xs font-mono text-[#89b4fa]">
										{edu.degree}
									</div>
								</div>
								<div class="text-xs font-mono text-[#a6adc8] sm:text-right">
									<div>{edu.duration}</div>
									<div class="text-[#a6e3a1] font-bold">{edu.grade}</div>
								</div>
							</div>

							{#if edu.coursework && edu.coursework.length > 0}
								<div class="pt-2 border-t border-[#27272a]/60 flex flex-wrap items-center gap-1.5">
									{#each edu.coursework as course}
										<span
											class="px-2 py-0.5 rounded-md bg-[#11111b] border border-[#313244] text-[10px] font-mono text-[#a6adc8]"
										>
											{course}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="lg:col-span-5 space-y-4">
				<h3
					class="text-sm font-mono uppercase tracking-wider text-[#a6adc8] flex items-center gap-2"
				>
					<span class="nf text-xs text-[#f9e2af]">{'\uf091'}</span>
					<span>Honors & Certifications</span>
				</h3>

				<div class="space-y-3">
					{#each PORTFOLIO_DATA.achievements as item}
						<div
							class="rounded-2xl border border-[#27272a] bg-[#181825]/90 p-4.5 flex items-start gap-3.5 hover:border-[#f9e2af]/40 transition-colors"
						>
							<div
								class="w-8 h-8 rounded-xl bg-[#11111b] border border-[#313244] flex items-center justify-center shrink-0"
							>
								<span class="nf text-xs text-[#f9e2af]">
									{item.type === 'competition' ? '\uf091' : '\uf0a3'}
								</span>
							</div>
							<div class="space-y-0.5">
								<h4 class="text-xs sm:text-sm font-bold text-white leading-snug">
									{item.title}
								</h4>
								<div class="text-[11px] font-mono text-[#89b4fa]">
									{item.issuer}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
