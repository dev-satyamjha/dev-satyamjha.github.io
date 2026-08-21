<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import ArcadeCabinet from '$lib/components/gaming/ArcadeCabinet.svelte';
	import GameSelector, { type GameId } from '$lib/components/gaming/GameSelector.svelte';
	import Scoreboard from '$lib/components/gaming/Scoreboard.svelte';
	import PlatformerGame from '$lib/components/gaming/games/PlatformerGame.svelte';
	import TriviaQuizGame from '$lib/components/gaming/games/TriviaQuizGame.svelte';
	import RpgStatsGame from '$lib/components/gaming/games/RpgStatsGame.svelte';
	import PacmanGame from '$lib/components/gaming/games/PacmanGame.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	let credits = $state(3);
	let isScanlinesActive = $state(true);
	let selectedGame = $state<GameId>('platformer');
	let isPlaying = $state(false);

	function insertCoin() {
		credits += 1;
	}

	function toggleScanlines() {
		audioManager.play('click');
		isScanlinesActive = !isScanlinesActive;
	}

	function startGame() {
		if (credits > 0) {
			credits -= 1;
			isPlaying = true;
		} else {
			audioManager.play('error');
		}
	}
</script>

<SEOHead
	title={`${PORTFOLIO_DATA.profile.name} | Arcade Realm`}
	description="Retro arcade cabinet and interactive mini-games portfolio by Satyam Kumar."
	pathname="/gaming"
/>

<main id="main-content" class="w-full max-w-5xl mx-auto space-y-8 pb-12">
	<ArcadeCabinet
		{credits}
		onInsertCoin={insertCoin}
		{isScanlinesActive}
		onToggleScanlines={toggleScanlines}
	>
		{#if !isPlaying}
			<GameSelector
				{selectedGame}
				onSelectGame={(g) => (selectedGame = g)}
				onStartGame={startGame}
			/>
		{:else if selectedGame === 'platformer'}
			<PlatformerGame onExit={() => (isPlaying = false)} />
		{:else if selectedGame === 'quiz'}
			<TriviaQuizGame onExit={() => (isPlaying = false)} />
		{:else if selectedGame === 'rpg'}
			<RpgStatsGame onExit={() => (isPlaying = false)} />
		{:else if selectedGame === 'pacman'}
			<PacmanGame onExit={() => (isPlaying = false)} />
		{/if}
	</ArcadeCabinet>

	<Scoreboard />
</main>
