<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		isOpen: boolean;
		onclose: () => void;
		themeStyle?: 'clean' | 'space';
	}

	let { isOpen, onclose, themeStyle = 'clean' }: Props = $props();

	let isExpanded = $state(false);
	let embedUrl = $derived(() => {
		const url = PORTFOLIO_DATA.profile.resumeUrl;
		const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
		if (match && match[1]) {
			return `https://drive.google.com/file/d/${match[1]}/preview`;
		}
		return url;
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			onclose();
		}
	}

	function toggleExpand() {
		audioManager.play('click');
		isExpanded = !isExpanded;
	}

	function handleClose() {
		audioManager.play('click');
		onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 animate-in fade-in"
		role="dialog"
		aria-modal="true"
		aria-label="Resume Document Viewer"
	>
		<button
			type="button"
			onclick={handleClose}
			class="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer border-0"
			aria-label="Close resume viewer background"
		></button>

		<div
			class={`relative z-10 flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
				isExpanded ? 'w-full h-full max-w-none' : 'w-full max-w-4xl h-[85vh]'
			} ${
				themeStyle === 'space'
					? 'bg-[#0a0a1a]/95 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] text-cyan-100'
					: 'bg-[#11111b]/95 border-[#313244] shadow-2xl text-[#cdd6f4]'
			}`}
		>
			<div
				class={`flex items-center justify-between px-4 py-3 border-b select-none ${
					themeStyle === 'space'
						? 'border-cyan-500/20 bg-cyan-950/30'
						: 'border-[#313244] bg-[#181825]'
				}`}
			>
				<div class="flex items-center gap-3">
					<span class={`nf text-lg ${themeStyle === 'space' ? 'text-cyan-400' : 'text-rose-400'}`}>
						{'\uf15c'}
					</span>
					<div>
						<div class="text-xs sm:text-sm font-bold truncate">
							{themeStyle === 'space'
								? 'SUB-SPACE FLIGHT DOSSIER — SATYAM KUMAR'
								: 'Satyam_Kumar_Resume.pdf'}
						</div>
						<div class="text-[10px] opacity-60">
							{themeStyle === 'space'
								? 'Security Clearance: Level 5 • Verified'
								: 'Interactive Document Viewer • SvelteKit'}
						</div>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={toggleExpand}
						class={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
							themeStyle === 'space'
								? 'border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300'
								: 'border-[#313244] bg-[#1e1e2e] hover:bg-[#313244] text-[#cdd6f4]'
						}`}
						title={isExpanded ? 'Restore window size' : 'Expand full screen'}
						aria-label={isExpanded ? 'Restore window size' : 'Expand full screen'}
					>
						<span class="nf">{isExpanded ? '\uf066' : '\uf065'}</span>
					</button>

					<a
						href={PORTFOLIO_DATA.profile.resumeUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => audioManager.play('click')}
						class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
							themeStyle === 'space'
								? 'border-cyan-400 bg-cyan-500 hover:bg-cyan-400 text-black'
								: 'border-[#89b4fa] bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b]'
						}`}
						title="Open original file"
					>
						<span class="nf text-xs">{'\uf019'}</span>
						<span class="hidden sm:inline">Download</span>
					</a>

					<button
						type="button"
						onclick={handleClose}
						class={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
							themeStyle === 'space'
								? 'border-red-500/30 bg-red-950/40 hover:bg-red-900/50 text-red-300'
								: 'border-rose-500/30 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300'
						}`}
						title="Close viewer (Esc)"
						aria-label="Close resume viewer"
					>
						<span class="nf">{'\uf00d'}</span>
					</button>
				</div>
			</div>

			<div class="relative flex-1 w-full h-full bg-[#181825] overflow-hidden">
				<iframe
					src={embedUrl()}
					title="Satyam Kumar Resume Document"
					class="w-full h-full border-0"
					loading="lazy"
					allow="fullscreen"
				></iframe>
			</div>
		</div>
	</div>
{/if}
