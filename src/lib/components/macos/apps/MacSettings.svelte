<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { goto } from '$app/navigation';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';

	function switchTheme(route: string) {
		audioManager.play('warp');
		goto(route);
	}
</script>

<div
	class="w-full h-full p-6 font-sans text-xs text-white bg-[#181825]/90 overflow-y-auto space-y-6 select-none"
>
	<div class="flex items-center gap-4 border-b border-white/10 pb-4">
		<div class="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
			<img
				src={PORTFOLIO_DATA.profile.avatar}
				alt={PORTFOLIO_DATA.profile.name}
				width="56"
				height="56"
				class="w-full h-full object-cover"
			/>
		</div>
		<div>
			<h3 class="text-base font-bold text-white">{PORTFOLIO_DATA.profile.name}</h3>
			<div class="text-xs text-blue-400">{PORTFOLIO_DATA.profile.email}</div>
			<div class="text-[10px] text-white/50">{PORTFOLIO_DATA.profile.location}</div>
		</div>
	</div>

	<div class="space-y-3">
		<div class="text-xs font-bold text-white/60 uppercase tracking-wider">Dimensional Gateways</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
			<button
				type="button"
				onclick={() => switchTheme('/clean')}
				class="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 flex items-center justify-between text-left transition-colors cursor-pointer"
			>
				<div>
					<div class="font-medium text-white text-xs">Clean Modern</div>
					<div class="text-[10px] text-white/50">Typography showcase</div>
				</div>
				<span class="nf text-blue-400">{'\uf108'}</span>
			</button>

			<button
				type="button"
				onclick={() => switchTheme('/linux')}
				class="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 flex items-center justify-between text-left transition-colors cursor-pointer"
			>
				<div>
					<div class="font-medium text-white text-xs">Linux Hyprland</div>
					<div class="text-[10px] text-white/50">Arch Linux compositor</div>
				</div>
				<span class="nf text-purple-400">{'\uf303'}</span>
			</button>

			<button
				type="button"
				onclick={() => switchTheme('/gaming')}
				class="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500 flex items-center justify-between text-left transition-colors cursor-pointer"
			>
				<div>
					<div class="font-medium text-white text-xs">Arcade Realm</div>
					<div class="text-[10px] text-white/50">Retro mini-games</div>
				</div>
				<span class="nf text-rose-400">{'\uf11b'}</span>
			</button>

			<button
				type="button"
				onclick={() => switchTheme('/space')}
				class="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500 flex items-center justify-between text-left transition-colors cursor-pointer"
			>
				<div>
					<div class="font-medium text-white text-xs">Cosmic Voyage</div>
					<div class="text-[10px] text-white/50">Orbital space HUD</div>
				</div>
				<span class="nf text-cyan-400">{'\uf135'}</span>
			</button>
		</div>
	</div>

	<div class="space-y-3 pt-2 border-t border-white/10">
		<div class="text-xs font-bold text-white/60 uppercase tracking-wider">Audio & Localization</div>
		<div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
			<div>
				<div class="font-medium text-white text-xs">Web Audio Synthesizer</div>
				<div class="text-[10px] text-white/50">{audioManager.isMuted ? 'Muted' : 'Active'}</div>
			</div>
			<button
				type="button"
				onclick={() => audioManager.toggleMute()}
				class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
			>
				{audioManager.isMuted ? 'Unmute' : 'Mute'}
			</button>
		</div>

		<div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
			<div>
				<div class="font-medium text-white text-xs">Display Language</div>
				<div class="text-[10px] text-white/50">
					{localeStore.current === 'en' ? 'English (US)' : 'हिन्दी (Hindi)'}
				</div>
			</div>
			<button
				type="button"
				onclick={() => localeStore.toggleLocale()}
				class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
			>
				{localeStore.current === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}
			</button>
		</div>
	</div>
</div>
