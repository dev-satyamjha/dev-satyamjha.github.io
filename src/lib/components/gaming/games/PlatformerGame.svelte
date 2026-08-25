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

	interface Platform {
		x: number;
		y: number;
		w: number;
		h: number;
	}

	interface Token {
		x: number;
		y: number;
		label: string;
		collected: boolean;
	}

	interface Hazard {
		x: number;
		y: number;
		w: number;
		h: number;
		vx: number;
		minX: number;
		maxX: number;
	}

	onMount(() => {
		if (!canvasEl) return;
		const canvas = canvasEl;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		const W = (canvas.width = 720);
		const H = (canvas.height = 420);

		const player = {
			x: 40,
			y: H - 70,
			w: 24,
			h: 32,
			vx: 0,
			vy: 0,
			speed: 4,
			jumpPower: -10.5,
			gravity: 0.45,
			isGrounded: false
		};

		const platforms: Platform[] = [
			{ x: 0, y: H - 30, w: W, h: 30 },
			{ x: 120, y: H - 90, w: 100, h: 14 },
			{ x: 260, y: H - 150, w: 120, h: 14 },
			{ x: 420, y: H - 200, w: 100, h: 14 },
			{ x: 220, y: H - 260, w: 110, h: 14 },
			{ x: 80, y: H - 310, w: 90, h: 14 },
			{ x: 240, y: H - 350, w: 120, h: 14 },
			{ x: 500, y: H - 120, w: 140, h: 14 },
			{ x: 580, y: H - 280, w: 110, h: 14 }
		];

		const tokens: Token[] = [
			{ x: 160, y: H - 120, label: 'JS', collected: false },
			{ x: 310, y: H - 180, label: 'TS', collected: false },
			{ x: 460, y: H - 230, label: 'C#', collected: false },
			{ x: 260, y: H - 290, label: 'PY', collected: false },
			{ x: 120, y: H - 340, label: 'GO', collected: false },
			{ x: 290, y: H - 380, label: 'ISM+', collected: false },
			{ x: 620, y: H - 310, label: 'SVT5', collected: false }
		];

		const hazards: Hazard[] = [
			{ x: 280, y: H - 164, w: 18, h: 14, vx: 1.2, minX: 260, maxX: 360 },
			{ x: 520, y: H - 134, w: 18, h: 14, vx: -1.5, minX: 500, maxX: 620 }
		];

		const goal = { x: 620, y: H - 320, w: 30, h: 40 };

		const keys: Record<string, boolean> = {};

		function onKeyDown(e: KeyboardEvent) {
			keys[e.code] = true;
			if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
				e.preventDefault();
				if (player.isGrounded && gameState === 'playing') {
					player.vy = player.jumpPower;
					player.isGrounded = false;
					audioManager.play('click');
				}
			}
		}

		function onKeyUp(e: KeyboardEvent) {
			keys[e.code] = false;
		}

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		function update() {
			if (gameState !== 'playing') return;

			if (keys['ArrowLeft'] || keys['KeyA']) {
				player.vx = -player.speed;
			} else if (keys['ArrowRight'] || keys['KeyD']) {
				player.vx = player.speed;
			} else {
				player.vx *= 0.7;
			}

			player.vy += player.gravity;
			player.x += player.vx;
			player.y += player.vy;

			if (player.x < 0) player.x = 0;
			if (player.x + player.w > W) player.x = W - player.w;

			player.isGrounded = false;
			for (const p of platforms) {
				if (
					player.x + player.w > p.x &&
					player.x < p.x + p.w &&
					player.y + player.h >= p.y &&
					player.y + player.h - player.vy <= p.y + 6
				) {
					player.y = p.y - player.h;
					player.vy = 0;
					player.isGrounded = true;
				}
			}

			for (const t of tokens) {
				if (!t.collected) {
					const dx = player.x + player.w / 2 - t.x;
					const dy = player.y + player.h / 2 - t.y;
					if (Math.hypot(dx, dy) < 22) {
						t.collected = true;
						score += 1500;
						audioManager.play('notification');
					}
				}
			}

			for (const h of hazards) {
				h.x += h.vx;
				if (h.x <= h.minX || h.x + h.w >= h.maxX) h.vx *= -1;

				if (
					player.x + player.w > h.x &&
					player.x < h.x + h.w &&
					player.y + player.h > h.y &&
					player.y < h.y + h.h
				) {
					lives -= 1;
					player.x = 40;
					player.y = H - 70;
					player.vx = 0;
					player.vy = 0;
					audioManager.play('error');

					if (lives <= 0) {
						gameState = 'gameover';
					}
				}
			}

			if (
				player.x + player.w > goal.x &&
				player.x < goal.x + goal.w &&
				player.y + player.h > goal.y &&
				player.y < goal.y + goal.h
			) {
				gameState = 'won';
				score += 5000;
				audioManager.play('warp');
			}
		}

		function draw() {
			if (!ctx) return;
			ctx.fillStyle = '#09090b';
			ctx.fillRect(0, 0, W, H);

			ctx.strokeStyle = 'rgba(244, 63, 94, 0.1)';
			ctx.lineWidth = 1;
			for (let x = 0; x < W; x += 30) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, H);
				ctx.stroke();
			}
			for (let y = 0; y < H; y += 30) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(W, y);
				ctx.stroke();
			}

			for (const p of platforms) {
				ctx.fillStyle = '#27272a';
				ctx.fillRect(p.x, p.y, p.w, p.h);
				ctx.fillStyle = '#f43f5e';
				ctx.fillRect(p.x, p.y, p.w, 2);
			}

			for (const t of tokens) {
				if (!t.collected) {
					ctx.fillStyle = '#facc15';
					ctx.beginPath();
					ctx.arc(t.x, t.y, 8, 0, Math.PI * 2);
					ctx.fill();

					ctx.fillStyle = '#000';
					ctx.font = 'bold 8px monospace';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(t.label, t.x, t.y);
				}
			}

			for (const h of hazards) {
				ctx.fillStyle = '#ef4444';
				ctx.fillRect(h.x, h.y, h.w, h.h);
				ctx.fillStyle = '#fff';
				ctx.font = '9px monospace';
				ctx.fillText('!', h.x + 9, h.y + 10);
			}

			ctx.fillStyle = '#38bdf8';
			ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 9px monospace';
			ctx.fillText('PORTAL', goal.x + 15, goal.y + 20);

			ctx.fillStyle = '#c084fc';
			ctx.fillRect(player.x, player.y, player.w, player.h);
			ctx.fillStyle = '#fff';
			ctx.fillRect(player.x + 4, player.y + 6, 4, 4);
			ctx.fillRect(player.x + 14, player.y + 6, 4, 4);
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
			window.removeEventListener('keyup', onKeyUp);
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
			<span class="text-rose-400 font-bold">CYBER-RUNNER 2D</span>
			<span class="text-zinc-400 text-[11px]"
				>SCORE: <strong class="text-amber-400 font-mono">{score}</strong></span
			>
		</div>

		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1 text-rose-400">
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
			class="rounded-xl border border-rose-500/30 max-w-full max-h-[380px] shadow-2xl bg-black"
		></canvas>

		{#if gameState === 'gameover'}
			<div
				class="absolute inset-0 bg-black/85 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 animate-in fade-in"
			>
				<div class="text-2xl font-bold text-rose-500 tracking-widest uppercase">GAME OVER</div>
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
					STAGE CLEARED!
				</div>
				<div class="text-xs text-zinc-400">
					All Starship Tokens Collected! Score: <span class="text-amber-400 font-bold">{score}</span
					>
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

	<div class="flex items-center justify-between text-[10px] text-zinc-400 px-3">
		<span
			>Controls: <kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">←</kbd>
			<kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">→</kbd>
			to Move &bull; <kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">Space</kbd> /
			<kbd class="px-1.5 py-0.5 bg-zinc-800 text-white rounded">↑</kbd> to Jump</span
		>
		<span>Reach the blue Starship Portal</span>
	</div>
</div>
