<script lang="ts">
	interface LeaderboardEntry {
		rank: string;
		name: string;
		score: number;
		title: string;
		color: string;
	}

	const LEADERBOARD: LeaderboardEntry[] = [
		{ rank: '1ST', name: 'SAT', score: 99990, title: 'Full-Stack Warrior', color: 'text-amber-400' },
		{ rank: '2ND', name: 'DEV', score: 85420, title: 'Hyprland Rice Lord', color: 'text-zinc-300' },
		{ rank: '3RD', name: 'BIT', score: 72100, title: 'BIT Mesra Scholar', color: 'text-amber-600' },
		{ rank: '4TH', name: 'DOT', score: 64800, title: '.NET WPF Architect', color: 'text-cyan-400' },
		{ rank: '5TH', name: 'SVT', score: 51200, title: 'Svelte 5 Runes Mage', color: 'text-rose-400' }
	];
</script>

<div class="w-full max-w-xl mx-auto p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl font-mono text-xs text-white space-y-4 select-none">
	<div class="text-center space-y-1 border-b border-zinc-800 pb-3">
		<div class="text-[10px] text-amber-400 font-bold tracking-widest uppercase">HALL OF FAME</div>
		<h3 class="text-base font-bold text-white tracking-widest uppercase">ALL-TIME HIGH SCORES</h3>
	</div>

	<div class="space-y-2">
		{#each LEADERBOARD as entry}
			<div class="p-2.5 rounded-xl bg-black/50 border border-zinc-800/80 flex items-center justify-between font-mono">
				<div class="flex items-center gap-3">
					<span class={`font-bold w-8 ${entry.color}`}>{entry.rank}</span>
					<span class="font-bold text-white tracking-widest bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
						{entry.name}
					</span>
					<span class="text-zinc-400 text-[11px] truncate hidden sm:inline">{entry.title}</span>
				</div>
				<span class="font-bold text-amber-400 text-sm tracking-wider font-mono">
					{entry.score.toLocaleString()}
				</span>
			</div>
		{/each}
	</div>
</div>
