<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	let embedUrl = $derived(() => {
		const url = PORTFOLIO_DATA.profile.resumeUrl;
		const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
		if (match && match[1]) {
			return `https://drive.google.com/file/d/${match[1]}/preview`;
		}
		return url;
	});
</script>

<div class="h-full flex flex-col bg-[#11111b] text-[#cdd6f4] overflow-hidden select-none">
	<div
		class="px-3 py-1.5 bg-[#181825] border-b border-[#313244] flex items-center justify-between text-xs"
	>
		<div class="flex items-center gap-2">
			<span class="nf text-rose-400">{'\uf15c'}</span>
			<span class="font-mono font-bold text-[11px]">Satyam_Kumar_Resume.pdf</span>
			<span class="text-[10px] px-1.5 py-0.5 rounded bg-[#313244] text-[#a6adc8] font-mono"
				>[zathura]</span
			>
		</div>

		<div class="flex items-center gap-2">
			<a
				href={PORTFOLIO_DATA.profile.resumeUrl}
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => audioManager.play('click')}
				class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold text-[10px] transition-colors cursor-pointer"
				title="Download original PDF"
			>
				<span class="nf text-[10px]">{'\uf019'}</span>
				<span>Download</span>
			</a>
		</div>
	</div>

	<div class="relative flex-1 w-full h-full bg-[#181825] overflow-hidden">
		<iframe
			src={embedUrl()}
			title="Satyam Kumar Resume - Zathura PDF Viewer"
			class="w-full h-full border-0"
			loading="lazy"
			allow="fullscreen"
		></iframe>
	</div>

	<div
		class="px-3 py-1 bg-[#181825] border-t border-[#313244] flex items-center justify-between text-[10px] font-mono text-[#a6adc8]"
	>
		<div>[1/1] 100% | fit-page</div>
		<div class="text-[#89b4fa]">press Super+Q to close window</div>
	</div>
</div>
