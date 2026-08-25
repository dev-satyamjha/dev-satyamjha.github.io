<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		onExit: () => void;
	}

	let { onExit }: Props = $props();

	type TabType = 'attributes' | 'equipment' | 'skills';
	let activeTab = $state<TabType>('attributes');

	function setTab(tab: TabType) {
		audioManager.play('click');
		activeTab = tab;
	}
</script>

<div
	class="w-full h-full p-4 sm:p-6 flex flex-col justify-between select-text font-mono text-xs text-purple-300"
>
	<div
		class="flex items-center justify-between px-3 py-2 bg-zinc-900/80 rounded-xl border border-zinc-800 select-none"
	>
		<div class="flex items-center gap-2">
			<span class="nf text-purple-400">{'\uf3ed'}</span>
			<span class="font-bold text-white uppercase tracking-wider">HERO CHARACTER SHEET</span>
		</div>

		<div class="flex items-center gap-3">
			<span
				class="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-[10px] text-purple-300 font-bold"
			>
				LVL 24 WARRIOR
			</span>
			<button
				type="button"
				onclick={onExit}
				class="px-2.5 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase transition-colors cursor-pointer"
			>
				Exit
			</button>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-12 gap-4 my-auto">
		<div
			class="md:col-span-4 p-4 rounded-2xl bg-zinc-900/80 border border-purple-500/30 space-y-3 text-center select-none"
		>
			<div
				class="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-purple-400 shadow-lg shadow-purple-500/20"
			>
				<img
					src={PORTFOLIO_DATA.profile.avatar}
					alt={PORTFOLIO_DATA.profile.name}
					width="96"
					height="96"
					class="w-full h-full object-cover"
				/>
			</div>

			<div>
				<div class="font-bold text-sm text-white">{PORTFOLIO_DATA.profile.name}</div>
				<div class="text-[10px] text-purple-400">Class: Full-Stack Architect</div>
			</div>

			<div class="space-y-1.5 text-[10px] text-left border-t border-purple-500/20 pt-2 font-mono">
				<div class="flex justify-between text-rose-300">
					<span>HP</span>
					<span>2400 / 2400</span>
				</div>
				<div class="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
					<div class="h-full bg-rose-500 rounded-full" style="width: 100%;"></div>
				</div>

				<div class="flex justify-between text-cyan-300 pt-1">
					<span>MP (MANA)</span>
					<span>1850 / 1850</span>
				</div>
				<div class="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
					<div class="h-full bg-cyan-500 rounded-full" style="width: 100%;"></div>
				</div>
			</div>
		</div>

		<div
			class="md:col-span-8 p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-purple-500/30 space-y-4 flex flex-col justify-between"
		>
			<div class="flex items-center gap-2 border-b border-purple-500/20 pb-2 select-none">
				<button
					type="button"
					onclick={() => setTab('attributes')}
					class={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors cursor-pointer ${
						activeTab === 'attributes'
							? 'bg-purple-500 text-black'
							: 'hover:bg-zinc-800 text-zinc-400'
					}`}
				>
					Attributes
				</button>
				<button
					type="button"
					onclick={() => setTab('equipment')}
					class={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors cursor-pointer ${
						activeTab === 'equipment'
							? 'bg-purple-500 text-black'
							: 'hover:bg-zinc-800 text-zinc-400'
					}`}
				>
					Equipment
				</button>
				<button
					type="button"
					onclick={() => setTab('skills')}
					class={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors cursor-pointer ${
						activeTab === 'skills' ? 'bg-purple-500 text-black' : 'hover:bg-zinc-800 text-zinc-400'
					}`}
				>
					Spells & Feats
				</button>
			</div>

			<div class="flex-1 overflow-y-auto">
				{#if activeTab === 'attributes'}
					<div class="space-y-2.5">
						<div
							class="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-zinc-800"
						>
							<span class="font-bold text-white">STR (Backend Architecture):</span>
							<span class="text-amber-400 font-bold">94 / 100</span>
						</div>
						<div
							class="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-zinc-800"
						>
							<span class="font-bold text-white">DEX (Frontend & Svelte 5):</span>
							<span class="text-amber-400 font-bold">96 / 100</span>
						</div>
						<div
							class="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-zinc-800"
						>
							<span class="font-bold text-white">INT (Problem Solving & CS):</span>
							<span class="text-amber-400 font-bold">92 / 100</span>
						</div>
						<div
							class="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-zinc-800"
						>
							<span class="font-bold text-white">VIT (Bug Elimination Stamina):</span>
							<span class="text-amber-400 font-bold">95 / 100</span>
						</div>
						<div
							class="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-zinc-800"
						>
							<span class="font-bold text-white">LCK (Zero-Downtime Deploys):</span>
							<span class="text-amber-400 font-bold">98 / 100</span>
						</div>
					</div>
				{:else if activeTab === 'equipment'}
					<div class="space-y-2 text-[11px]">
						<div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800 space-y-0.5">
							<div class="font-bold text-purple-300">WEAPON: Arch Linux + Hyprland Blade</div>
							<div class="text-zinc-400 text-[10px]">
								+45 Speed &bull; Pure Wayland Compositor Ricing
							</div>
						</div>
						<div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800 space-y-0.5">
							<div class="font-bold text-cyan-300">ARMOR: Tailwind CSS v4 Reactive Mail</div>
							<div class="text-zinc-400 text-[10px]">
								+50 Agility &bull; Zero config atomic styling
							</div>
						</div>
						<div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800 space-y-0.5">
							<div class="font-bold text-rose-300">RELIC: Ring of Svelte 5 Runes</div>
							<div class="text-zinc-400 text-[10px]">
								+60 Reactivity &bull; Ultra low bundle footprint
							</div>
						</div>
					</div>
				{:else if activeTab === 'skills'}
					<div class="space-y-2 text-[11px]">
						<div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800 space-y-0.5">
							<div class="font-bold text-amber-300">Cross-Platform Strike</div>
							<div class="text-zinc-400 text-[10px]">
								C# .NET WPF desktop applications with instant UI responsiveness.
							</div>
						</div>
						<div class="p-2.5 rounded-xl bg-black/40 border border-zinc-800 space-y-0.5">
							<div class="font-bold text-emerald-300">Full-Stack Synthesis</div>
							<div class="text-zinc-400 text-[10px]">
								End-to-end integration spanning TypeScript, SvelteKit, APIs, and SQL.
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="text-center text-[10px] text-zinc-500 select-none">
		CHARACTER CLASS: FULL-STACK HERO &bull; BIT MESRA SECTOR
	</div>
</div>
