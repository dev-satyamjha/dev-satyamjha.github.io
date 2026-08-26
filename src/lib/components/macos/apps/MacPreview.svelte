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

<div class="h-full flex flex-col bg-[#1e1e1e] text-white/90 overflow-hidden select-none">
	<div
		class="px-4 py-2 bg-[#2d2d2d] border-b border-white/10 flex items-center justify-between text-xs"
	>
		<div class="flex items-center gap-3">
			<span class="nf text-rose-400 text-sm">{'\uf15c'}</span>
			<div>
				<div class="font-semibold text-xs text-white truncate">Satyam_Kumar_Resume.pdf</div>
				<div class="text-[10px] text-white/50">PDF Document • 1 Page</div>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<a
				href={PORTFOLIO_DATA.profile.resumeUrl}
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => audioManager.play('click')}
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer"
				title="Download original file"
			>
				<span class="nf text-xs">{'\uf019'}</span>
				<span>Download</span>
			</a>
		</div>
	</div>

	<div class="relative flex-1 w-full h-full bg-[#181818] overflow-hidden">
		<iframe
			src={embedUrl()}
			title="Satyam Kumar Resume - macOS Preview"
			class="w-full h-full border-0"
			loading="lazy"
			allow="fullscreen"
		></iframe>
	</div>
</div>
