<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		onExit: () => void;
	}

	let { onExit }: Props = $props();

	interface Question {
		text: string;
		options: string[];
		answer: number;
		fact: string;
	}

	const QUESTIONS: Question[] = [
		{
			text: 'Which premier institution is Satyam pursuing his Computer Science degree at?',
			options: ['BIT Mesra', 'IIT Bombay', 'NIT Trichy', 'BITS Pilani'],
			answer: 0,
			fact: "Satyam is at BIT Mesra '27 with a CGPA of 8.1 (Top 10%)."
		},
		{
			text: 'What desktop technology stack powers Satyam’s ISM+ enterprise management suite?',
			options: ['C# .NET, WPF & SQLite', 'Electron & React', 'Flutter Desktop', 'JavaFX & Oracle'],
			answer: 0,
			fact: 'ISM+ is built with C# .NET and WPF with SQLite & Azure SQL connectivity.'
		},
		{
			text: 'How many active users deploy Satyam’s open-source productivity utilities?',
			options: ['10+ Users', '50+ Users', '400+ Users', '1,000+ Users'],
			answer: 2,
			fact: 'Over 400+ developers and teams actively use tools built by Satyam.'
		},
		{
			text: 'What reactive primitives power state management in this portfolio application?',
			options: ['Svelte 5 Runes ($state, $derived)', 'Redux Toolkit', 'MobX Observables', 'Vue Pinia'],
			answer: 0,
			fact: '100% architected with modern Svelte 5 Runes without virtual DOM overhead.'
		},
		{
			text: 'Which Wayland compositor aesthetic is simulated in the Linux theme dimension?',
			options: ['Hyprland (Catppuccin Mocha)', 'i3wm', 'KDE Plasma', 'XFCE4'],
			answer: 0,
			fact: 'The Linux dimension is a complete Hyprland + Waybar + Catppuccin simulation.'
		},
		{
			text: 'Which modern CSS engine powers this project using @theme tokens without tailwind.config.js?',
			options: ['Tailwind CSS v4', 'Tailwind CSS v3', 'Bootstrap 5', 'Sass/SCSS'],
			answer: 0,
			fact: 'Configured via @tailwindcss/vite with pure CSS-first @theme directives in src/app.css.'
		},
		{
			text: 'What role did Satyam serve during his engineering internship at InPracSys?',
			options: ['Software Engineering Intern', 'Graphic Designer', 'Data Entry', 'Systems Admin'],
			answer: 0,
			fact: 'Satyam served as a Software Engineering Intern at InPracSys developing full-stack features.'
		},
		{
			text: 'Which icon set is strictly used across all 5 dimensions of this portfolio?',
			options: ['Symbols Nerd Font Icons', 'Unicode Emojis', 'Font Awesome CDN', 'Heroicons'],
			answer: 0,
			fact: 'Zero emojis are used; 100% crisp iconography is rendered via Symbols Nerd Font.'
		}
	];

	let currentIndex = $state(0);
	let selectedOption = $state<number | null>(null);
	let isAnswered = $state(false);
	let score = $state(0);
	let isFinished = $state(false);

	let currentQuestion = $derived(QUESTIONS[currentIndex]);

	function handleAnswer(index: number) {
		if (isAnswered) return;
		selectedOption = index;
		isAnswered = true;

		if (index === currentQuestion.answer) {
			score += 1000;
			audioManager.play('notification');
		} else {
			audioManager.play('error');
		}
	}

	function handleNext() {
		audioManager.play('click');
		if (currentIndex < QUESTIONS.length - 1) {
			currentIndex += 1;
			selectedOption = null;
			isAnswered = false;
		} else {
			isFinished = true;
		}
	}

	function handleRestart() {
		audioManager.play('warp');
		currentIndex = 0;
		selectedOption = null;
		isAnswered = false;
		score = 0;
		isFinished = false;
	}
</script>

<div class="w-full h-full p-4 sm:p-8 flex flex-col justify-between select-none font-mono text-xs text-white">
	<div class="flex items-center justify-between px-3 py-2 bg-zinc-900/80 rounded-xl border border-zinc-800">
		<div class="flex items-center gap-2">
			<span class="nf text-amber-400">{'\uf059'}</span>
			<span class="font-bold text-white uppercase tracking-wider">PORTFOLIO TRIVIA</span>
		</div>

		<div class="flex items-center gap-4">
			<span class="text-amber-400 font-bold">SCORE: {score}</span>
			<button
				type="button"
				onclick={onExit}
				class="px-2.5 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase transition-colors cursor-pointer"
			>
				Exit
			</button>
		</div>
	</div>

	{#if !isFinished}
		<div class="max-w-2xl mx-auto w-full my-auto space-y-6">
			<div class="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800 pb-2">
				<span>QUESTION {currentIndex + 1} OF {QUESTIONS.length}</span>
				<span class="text-amber-400 font-bold">+{score} PTS</span>
			</div>

			<h3 class="text-base sm:text-lg font-bold text-white tracking-wide font-sans">
				{currentQuestion.text}
			</h3>

			<div class="grid grid-cols-1 gap-2.5">
				{#each currentQuestion.options as option, index}
					<button
						type="button"
						onclick={() => handleAnswer(index)}
						class={`p-3.5 rounded-xl border text-left font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
							isAnswered
								? index === currentQuestion.answer
									? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
									: selectedOption === index
										? 'bg-rose-500/20 border-rose-400 text-rose-200'
										: 'bg-zinc-900/40 border-zinc-800 opacity-40 text-zinc-400'
								: 'bg-zinc-900/70 border-zinc-800 hover:border-amber-400 hover:bg-zinc-800 text-white'
						}`}
					>
						<span>{option}</span>
						{#if isAnswered}
							{#if index === currentQuestion.answer}
								<span class="nf text-emerald-400">{'\uf00c'}</span>
							{:else if selectedOption === index}
								<span class="nf text-rose-400">{'\uf00d'}</span>
							{/if}
						{/if}
					</button>
				{/each}
			</div>

			{#if isAnswered}
				<div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-sans space-y-1">
					<div class="font-bold font-mono text-[10px] uppercase text-amber-400">DID YOU KNOW?</div>
					<div>{currentQuestion.fact}</div>
				</div>

				<div class="flex justify-end pt-2">
					<button
						type="button"
						onclick={handleNext}
						class="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
					>
						{currentIndex < QUESTIONS.length - 1 ? 'Next Question →' : 'View Results'}
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="max-w-md mx-auto w-full text-center my-auto space-y-4 p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
			<div class="text-3xl font-bold text-amber-400">QUIZ COMPLETE!</div>
			<div class="text-xs text-zinc-400">
				Final Accuracy: <strong class="text-white">{score / 1000} / {QUESTIONS.length}</strong> Correct
			</div>
			<div class="text-2xl font-bold text-white font-mono">{score} TOTAL POINTS</div>

			<div class="pt-4 flex items-center justify-center gap-3">
				<button
					type="button"
					onclick={handleRestart}
					class="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs uppercase cursor-pointer"
				>
					Play Again
				</button>
				<button
					type="button"
					onclick={onExit}
					class="px-4 py-2 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase cursor-pointer"
				>
					Exit to Menu
				</button>
			</div>
		</div>
	{/if}

	<div class="text-center text-[10px] text-zinc-500">
		PORTFOLIO TRIVIA &bull; MULTI-DIMENSIONAL QUIZ ENGINE
	</div>
</div>
