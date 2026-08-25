<script lang="ts">
	import { onMount } from 'svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		onExit: () => void;
	}

	let { onExit }: Props = $props();

	let canvasEl: HTMLCanvasElement | null = $state(null);
	let score = $state(0);
	let lives = $state(3);
	let gameState = $state<'playing' | 'won' | 'gameover'>('playing');

	onMount(() => {
		if (!canvasEl) return;
		const canvas = canvasEl;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		const tileSize = 20;
		const cols = 19;
		const rows = 19;
		const W = (canvas.width = cols * tileSize);
		const H = (canvas.height = rows * tileSize);

		const map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
			[1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
			[1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
			[1, 2, 2, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
			[1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1],
			[1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];

		const dots: { r: number; c: number }[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (map[r][c] === 2) dots.push({ r, c });
			}
		}

		const player = {
			r: 15,
			c: 8,
			x: 8 * tileSize + 10,
			y: 15 * tileSize + 10,
			dirX: 0,
			dirY: 0,
			nextDirX: 0,
			nextDirY: 0
		};
		const ghosts = [
			{
				r: 7,
				c: 8,
				x: 8 * tileSize + 10,
				y: 7 * tileSize + 10,
				dirX: 1,
				dirY: 0,
				color: '#f43f5e'
			},
			{
				r: 7,
				c: 10,
				x: 10 * tileSize + 10,
				y: 7 * tileSize + 10,
				dirX: -1,
				dirY: 0,
				color: '#38bdf8'
			}
		];

		function onKeyDown(e: KeyboardEvent) {
			if (['ArrowUp', 'KeyW'].includes(e.code)) {
				player.nextDirX = 0;
				player.nextDirY = -1;
			} else if (['ArrowDown', 'KeyS'].includes(e.code)) {
				player.nextDirX = 0;
				player.nextDirY = 1;
			} else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
				player.nextDirX = -1;
				player.nextDirY = 0;
			} else if (['ArrowRight', 'KeyD'].includes(e.code)) {
				player.nextDirX = 1;
				player.nextDirY = 0;
			}
		}

		window.addEventListener('keydown', onKeyDown);

		let tick = 0;
		function update() {
			if (gameState !== 'playing') return;
			tick++;

			if (tick % 10 === 0) {
				const nextR = player.r + player.nextDirY;
				const nextC = player.c + player.nextDirX;
				if (nextR >= 0 && nextR < rows && nextC >= 0 && nextC < cols && map[nextR][nextC] !== 1) {
					player.dirX = player.nextDirX;
					player.dirY = player.nextDirY;
				}

				const targetR = player.r + player.dirY;
				const targetC = player.c + player.dirX;
				if (
					targetR >= 0 &&
					targetR < rows &&
					targetC >= 0 &&
					targetC < cols &&
					map[targetR][targetC] !== 1
				) {
					player.r = targetR;
					player.c = targetC;
					player.x = player.c * tileSize + 10;
					player.y = player.r * tileSize + 10;
				}

				const dotIndex = dots.findIndex((d) => d.r === player.r && d.c === player.c);
				if (dotIndex !== -1) {
					dots.splice(dotIndex, 1);
					score += 100;
					audioManager.play('click');
					if (dots.length === 0) {
						gameState = 'won';
						score += 10000;
						audioManager.play('warp');
					}
				}

				for (const g of ghosts) {
					const dirs = [
						{ x: 1, y: 0 },
						{ x: -1, y: 0 },
						{ x: 0, y: 1 },
						{ x: 0, y: -1 }
					];
					const validDirs = dirs.filter((d) => {
						const gr = g.r + d.y;
						const gc = g.c + d.x;
						return gr >= 0 && gr < rows && gc >= 0 && gc < cols && map[gr][gc] !== 1;
					});
					const chosen = validDirs[Math.floor(Math.random() * validDirs.length)];
					if (chosen) {
						g.dirX = chosen.x;
						g.dirY = chosen.y;
						g.r += g.dirY;
						g.c += g.dirX;
						g.x = g.c * tileSize + 10;
						g.y = g.r * tileSize + 10;
					}

					if (g.r === player.r && g.c === player.c) {
						lives -= 1;
						player.r = 15;
						player.c = 8;
						player.dirX = 0;
						player.dirY = 0;
						audioManager.play('error');
						if (lives <= 0) {
							gameState = 'gameover';
						}
					}
				}
			}
		}

		function draw() {
			if (!ctx) return;
			ctx.fillStyle = '#09090b';
			ctx.fillRect(0, 0, W, H);

			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					if (map[r][c] === 1) {
						ctx.fillStyle = '#1e1b4b';
						ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
						ctx.strokeStyle = '#6366f1';
						ctx.strokeRect(c * tileSize + 1, r * tileSize + 1, tileSize - 2, tileSize - 2);
					}
				}
			}

			for (const d of dots) {
				ctx.fillStyle = '#facc15';
				ctx.beginPath();
				ctx.arc(d.c * tileSize + 10, d.r * tileSize + 10, 2.5, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.fillStyle = '#fde047';
			ctx.beginPath();
			ctx.arc(player.x, player.y, 7.5, 0.2 * Math.PI, 1.8 * Math.PI);
			ctx.lineTo(player.x, player.y);
			ctx.fill();

			for (const g of ghosts) {
				ctx.fillStyle = g.color;
				ctx.beginPath();
				ctx.arc(g.x, g.y, 7.5, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function loop() {
			update();
			draw();
			animId = requestAnimationFrame(loop);
		}

		loop();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<div
	class="w-full h-full flex flex-col justify-between p-3 font-mono text-xs text-white select-none"
>
	<div
		class="flex items-center justify-between px-3 py-1 bg-zinc-900/80 rounded-xl border border-zinc-800"
	>
		<div class="flex items-center gap-3">
			<span class="text-emerald-400 font-bold">CODE-MAN MAZE</span>
			<span class="text-zinc-400 text-[11px]"
				>SCORE: <strong class="text-amber-400">{score}</strong></span
			>
		</div>

		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1 text-emerald-400">
				{#each Array(lives) as _}
					<span class="nf text-xs">{'\uf004'}</span>
				{/each}
			</div>

			<button
				type="button"
				onclick={onExit}
				class="px-2.5 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase transition-colors cursor-pointer"
			>
				Exit
			</button>
		</div>
	</div>

	<div class="relative flex-1 flex items-center justify-center my-2">
		<canvas
			bind:this={canvasEl}
			class="rounded-xl border border-emerald-500/30 max-w-full max-h-[380px] shadow-2xl bg-black"
		></canvas>

		{#if gameState === 'gameover'}
			<div
				class="absolute inset-0 bg-black/85 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 animate-in fade-in"
			>
				<div class="text-2xl font-bold text-rose-500 tracking-widest uppercase">CAUGHT BY BUG!</div>
				<div class="text-xs text-zinc-400">
					Final Score: <span class="text-amber-400 font-bold">{score}</span>
				</div>
				<button
					type="button"
					onclick={onExit}
					class="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase cursor-pointer"
				>
					Return to Cartridge Menu
				</button>
			</div>
		{:else if gameState === 'won'}
			<div
				class="absolute inset-0 bg-black/85 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 animate-in fade-in"
			>
				<div class="text-2xl font-bold text-emerald-400 tracking-widest uppercase">
					MAZE CLEARED!
				</div>
				<div class="text-xs text-zinc-400">
					All Code Tokens Ingested! Score: <span class="text-amber-400 font-bold">{score}</span>
				</div>
				<button
					type="button"
					onclick={onExit}
					class="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase cursor-pointer"
				>
					Return to Cartridge Menu
				</button>
			</div>
		{/if}
	</div>

	<div class="text-center text-[10px] text-zinc-400">
		Controls: <kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">W</kbd>
		<kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">A</kbd>
		<kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">S</kbd>
		<kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">D</kbd>
		or <kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">Arrow Keys</kbd> to Navigate Maze
	</div>
</div>
