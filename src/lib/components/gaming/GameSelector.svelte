<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	export type GameId = 'platformer' | 'quiz' | 'rpg' | 'pacman';

	interface Props {
		selectedGame: GameId;
		onSelectGame: (gameId: GameId) => void;
		onStartGame: () => void;
	}

	let { selectedGame, onSelectGame, onStartGame }: Props = $props();

	interface GameInfo {
		id: GameId;
		title: string;
		subtitle: string;
		desc: string;
		icon: string;
		badge: string;
		color: string;
	}

	const GAMES: GameInfo[] = [
		{
			id: 'platformer',
			title: 'CYBER-RUNNER 2D',
			subtitle: '2D Platformer & Badge Collector',
			desc: 'Dash across futuristic platforms, dodge obstacles, and collect language tokens and project stars.',
			icon: '\uf11b',
			badge: 'ACTION',
			color: 'text-rose-400 border-rose-500/50 bg-rose-500/10'
		},
		{
			id: 'quiz',
			title: 'PORTFOLIO TRIVIA',
			subtitle: 'Interactive Developer Quiz',
			desc: "Test your knowledge of Satyam's engineering projects, tech stack, and career background.",
			icon: '\uf059',
			badge: 'TRIVIA',
			color: 'text-amber-400 border-amber-500/50 bg-amber-500/10'
		},
		{
			id: 'rpg',
			title: 'HERO STATS SHEET',
			subtitle: 'Full-Stack RPG Character Sheet',
			desc: 'Inspect Satyam as a Level 24 Full-Stack Warrior with attributes, gear inventory, and special abilities.',
			icon: '\uf3ed',
			badge: 'RPG',
			color: 'text-purple-400 border-purple-500/50 bg-purple-500/10'
		},
		{
			id: 'pacman',
			title: 'CODE-MAN MAZE',
			subtitle: 'Retro Grid Arcade',
			desc: 'Navigate the digital maze, collect code snippets, and dodge runtime exceptions and memory leaks.',
			icon: '\uf120',
			badge: 'ARCADE',
			color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
		}
	];

	function select(id: GameId) {
		audioManager.play('click');
		onSelectGame(id);
	}

	function start() {
		audioManager.play('warp');
		onStartGame();
	}
</script>

<div class="w-full h-full p-4 sm:p-8 flex flex-col justify-between select-none font-mono text-xs text-white space-y-6">
	<div class="text-center space-y-1">
		<div class="text-[10px] text-rose-400 tracking-widest uppercase font-bold">SELECT CARTRIDGE</div>
		<h2 class="text-xl sm:text-2xl font-bold text-white tracking-wider drop-shadow">CHOOSE YOUR CHALLENGE</h2>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
		{#each GAMES as game}
			<button
				type="button"
				onclick={() => select(game.id)}
				class={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
					selectedGame === game.id
						? 'border-rose-400 bg-rose-500/20 shadow-xl shadow-rose-500/20 scale-[1.02]'
						: 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 text-zinc-300'
				}`}
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2.5">
						<span class="nf text-xl text-rose-400">{game.icon}</span>
						<span class="font-bold text-sm text-white tracking-wide">{game.title}</span>
					</div>
					<span class="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase border border-white/20 bg-black/40">
						{game.badge}
					</span>
				</div>

				<p class="text-[11px] text-zinc-400 leading-relaxed font-sans">
					{game.desc}
				</p>
			</button>
		{/each}
	</div>

	<div class="flex flex-col items-center gap-3 pt-2">
		<button
			type="button"
			onclick={start}
			class="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-sm tracking-widest uppercase shadow-xl shadow-rose-500/30 transition-all cursor-pointer animate-pulse"
		>
			PRESS START TO PLAY
		</button>
		<div class="text-[10px] text-zinc-500">1 CREDIT REQUIRED PER GAME</div>
	</div>
</div>
