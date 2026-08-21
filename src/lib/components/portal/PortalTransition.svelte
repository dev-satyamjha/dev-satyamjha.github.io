<script lang="ts">
	import type { ThemeConfig } from '$lib/types/theme';

	interface Props {
		activeTheme: ThemeConfig | null;
		isTransitioning: boolean;
	}

	let { activeTheme, isTransitioning }: Props = $props();
</script>

{#if isTransitioning && activeTheme}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto overflow-hidden animate-in fade-in duration-300"
		style={`background: radial-gradient(circle at center, ${activeTheme.accentColor}25 0%, #09090b 80%);`}
		aria-live="polite"
		aria-busy="true"
	>
		<div
			class="w-48 h-48 rounded-full border-2 border-dashed animate-spin duration-1000 flex items-center justify-center mb-6"
			style={`border-color: ${activeTheme.accentColor};`}
		>
			<div
				class="w-32 h-32 rounded-full border flex items-center justify-center animate-ping duration-700"
				style={`border-color: ${activeTheme.accentColor}80; background: ${activeTheme.accentColor}15;`}
			>
				<span class="nf text-3xl" style={`color: ${activeTheme.accentColor};`}>
					{activeTheme.key === 'linux' ? '\uf303' : activeTheme.key === 'gaming' ? '\uf11b' : activeTheme.key === 'space' ? '\uf135' : activeTheme.key === 'macos' ? '\uf179' : '\uf108'}
				</span>
			</div>
		</div>

		<div class="text-center space-y-2">
			<div class="text-xs font-mono tracking-widest uppercase text-[#a6adc8]">
				Entering Dimension
			</div>
			<div class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
				{activeTheme.name}
			</div>
			<div class="text-xs font-mono" style={`color: ${activeTheme.accentColor};`}>
				{activeTheme.route}
			</div>
		</div>
	</div>
{/if}
