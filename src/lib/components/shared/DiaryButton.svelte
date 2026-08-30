<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';
	import DiaryOverlay from './DiaryOverlay.svelte';

	let isOpen = $state(false);
	let hasAnimated = $state(false);
	let isPopping = $state(false);
	let particles = $state<
		Array<{
			id: number;
			angle: number;
			distance: number;
			size: number;
			char: string;
			color: string;
			duration: number;
		}>
	>([]);

	const STAR_CHARS = ['\uf005', '\uf006', '\uf069', '\uf111', '\uf0aa'];
	const STAR_COLORS = ['#fef08a', '#facc15', '#eab308', '#fef9c3', '#ffffff', '#fbbf24', '#f59e0b'];

	function triggerSparkPop() {
		if (isPopping) return;
		isPopping = true;

		particles = Array.from({ length: 16 }, (_, i) => ({
			id: Date.now() + i,
			angle: i * (360 / 16) + (Math.random() * 16 - 8),
			distance: 55 + Math.random() * 55,
			size: 11 + Math.random() * 14,
			char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
			color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
			duration: 0.55 + Math.random() * 0.25
		}));

		audioManager.play('powerup');

		setTimeout(() => {
			audioManager.play('window_open');
			isOpen = true;
		}, 260);

		setTimeout(() => {
			isPopping = false;
			particles = [];
		}, 850);
	}

	function closeDiary() {
		isOpen = false;
	}

	$effect(() => {
		const timer = setTimeout(() => {
			hasAnimated = true;
		}, 500);
		return () => clearTimeout(timer);
	});
</script>

<div class="diary-trigger" class:diary-trigger-visible={hasAnimated}>
	<div class="ambient-stars" aria-hidden="true">
		<span class="ambient-star star-1 nf">{'\uf005'}</span>
		<span class="ambient-star star-2 nf">{'\uf006'}</span>
		<span class="ambient-star star-3 nf">{'\uf069'}</span>
		<span class="ambient-star star-4 nf">{'\uf005'}</span>
	</div>

	{#if isPopping}
		<div class="spark-burst-container" aria-hidden="true">
			<div class="spark-shockwave"></div>
			{#each particles as p (p.id)}
				<span
					class="spark-star nf"
					style="--tx: {Math.cos((p.angle * Math.PI) / 180) * p.distance}px; --ty: {Math.sin((p.angle * Math.PI) / 180) * p.distance}px; --duration: {p.duration}s; font-size: {p.size}px; color: {p.color}; text-shadow: 0 0 12px {p.color};"
				>
					{p.char}
				</span>
			{/each}
		</div>
	{/if}

	<button
		type="button"
		class="diary-btn"
		class:is-popping={isPopping}
		onclick={triggerSparkPop}
		onmouseenter={() => audioManager.play('hover')}
		aria-label="Open College Diary"
		title="My College Journey"
	>
		<div class="diary-glow-aura" class:aura-burst={isPopping}></div>

		<img
			src="/images/Diary.png"
			alt="College Diary"
			width="52"
			height="52"
			class="diary-icon"
			class:icon-popping={isPopping}
		/>
	</button>

	<span class="diary-label">College Diary</span>
</div>

<DiaryOverlay bind:isOpen onclose={closeDiary} />

<style>
	.diary-trigger {
		position: fixed;
		bottom: 24px;
		left: 24px;
		z-index: 45;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		opacity: 0;
		transform: translateY(35px) scale(0.6);
		transition: none;
		pointer-events: none;
	}

	.diary-trigger-visible {
		opacity: 1;
		transform: translateY(0) scale(1);
		pointer-events: auto;
		animation: diaryPopIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.diary-btn {
		width: 64px;
		height: 64px;
		border-radius: 20px;
		border: 2px solid rgba(250, 204, 21, 0.65);
		background: radial-gradient(circle at 35% 30%, rgba(35, 30, 20, 0.95), rgba(15, 15, 20, 0.98));
		backdrop-filter: blur(16px);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow:
			0 6px 24px rgba(0, 0, 0, 0.6),
			0 0 24px rgba(250, 204, 21, 0.35),
			inset 0 0 15px rgba(250, 204, 21, 0.15);
		animation: diaryFloat 3.2s ease-in-out infinite;
		position: relative;
	}

	.diary-glow-aura {
		position: absolute;
		inset: -8px;
		border-radius: 26px;
		background: radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, rgba(234, 179, 8, 0.15) 50%, transparent 75%);
		filter: blur(8px);
		opacity: 0.8;
		pointer-events: none;
		transition: all 0.3s ease;
		animation: auraPulse 2.5s ease-in-out infinite alternate;
	}

	.diary-glow-aura.aura-burst {
		inset: -24px;
		background: radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(250, 204, 21, 0.8) 40%, transparent 75%);
		filter: blur(14px);
		opacity: 1;
		transform: scale(1.6);
	}

	.diary-btn:hover {
		transform: scale(1.12) translateY(-3px);
		border-color: rgba(254, 240, 138, 0.95);
		box-shadow:
			0 10px 32px rgba(0, 0, 0, 0.5),
			0 0 35px rgba(250, 204, 21, 0.6),
			inset 0 0 20px rgba(254, 240, 138, 0.3);
	}

	.diary-btn.is-popping {
		animation: diaryPopClick 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		border-color: #fef08a;
		box-shadow:
			0 0 45px rgba(250, 204, 21, 0.95),
			0 0 90px rgba(234, 179, 8, 0.8),
			inset 0 0 25px rgba(254, 240, 138, 0.9);
	}

	.diary-icon {
		width: 44px;
		height: 44px;
		object-fit: contain;
		filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		z-index: 2;
	}

	.diary-btn:hover .diary-icon {
		transform: scale(1.1) rotate(-6deg);
	}

	.diary-icon.icon-popping {
		animation: iconSpinBurst 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.ambient-stars {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.ambient-star {
		position: absolute;
		color: #fde047;
		font-weight: bold;
		text-shadow: 0 0 8px #facc15;
		pointer-events: none;
	}

	.star-1 {
		top: -10px;
		right: -8px;
		font-size: 13px;
		animation: ambientTwinkle 2.2s ease-in-out infinite;
	}

	.star-2 {
		top: -6px;
		left: -8px;
		font-size: 11px;
		animation: ambientTwinkle 2.8s ease-in-out 0.6s infinite;
	}

	.star-3 {
		bottom: 16px;
		right: -12px;
		font-size: 11px;
		animation: ambientTwinkle 1.9s ease-in-out 1.1s infinite;
	}

	.star-4 {
		bottom: 18px;
		left: -10px;
		font-size: 12px;
		animation: ambientTwinkle 2.5s ease-in-out 1.6s infinite;
	}

	.spark-burst-container {
		position: absolute;
		left: 32px;
		top: 32px;
		width: 0;
		height: 0;
		pointer-events: none;
		z-index: 50;
	}

	.spark-shockwave {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 3px solid rgba(254, 240, 138, 0.95);
		box-shadow:
			0 0 25px rgba(250, 204, 21, 0.9),
			inset 0 0 25px rgba(250, 204, 21, 0.6);
		transform: translate(-50%, -50%);
		animation: shockwaveExpand 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		pointer-events: none;
	}

	.spark-star {
		position: absolute;
		left: 50%;
		top: 50%;
		font-weight: 900;
		line-height: 1;
		pointer-events: none;
		transform: translate(-50%, -50%);
		animation: starFlyOut var(--duration) cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.diary-label {
		font-family: 'Kalam', 'Georgia', serif;
		font-size: 0.75rem;
		font-weight: 700;
		color: #fde047;
		text-shadow: 0 0 8px rgba(250, 204, 21, 0.6);
		letter-spacing: 0.04em;
		pointer-events: none;
		opacity: 0.95;
		transform: translateY(0);
		transition: all 0.25s;
		white-space: nowrap;
		display: inline-block;
		padding: 2px 8px;
		border-radius: 9999px;
	}

	:global(html.light) .diary-label {
		color: #0f172a;
		background-color: rgba(255, 255, 255, 0.92);
		border: 1px solid #cbd5e1;
		text-shadow: none;
		box-shadow: 0 2px 8px rgba(15, 23, 42, 0.1);
	}

	:global(html.light) .diary-btn {
		border-color: rgba(217, 119, 6, 0.7);
		background: radial-gradient(circle at 35% 30%, rgba(254, 243, 199, 0.95), rgba(253, 230, 138, 0.98));
		box-shadow:
			0 6px 20px rgba(15, 23, 42, 0.12),
			0 0 20px rgba(245, 158, 11, 0.35);
	}

	:global(html.light) .ambient-star {
		color: #d97706;
		text-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
	}

	.diary-trigger:hover .diary-label {
		opacity: 1;
		transform: scale(1.05);
	}

	@keyframes diaryPopIn {
		0% {
			opacity: 0;
			transform: translateY(35px) scale(0.6);
		}
		60% {
			opacity: 1;
			transform: translateY(-8px) scale(1.1);
		}
		80% {
			transform: translateY(3px) scale(0.96);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes diaryFloat {
		0%,
		100% {
			transform: translateY(0);
			box-shadow:
				0 6px 24px rgba(0, 0, 0, 0.6),
				0 0 24px rgba(250, 204, 21, 0.35);
		}
		50% {
			transform: translateY(-4px);
			box-shadow:
				0 10px 30px rgba(0, 0, 0, 0.5),
				0 0 32px rgba(250, 204, 21, 0.55);
		}
	}

	@keyframes auraPulse {
		0% {
			transform: scale(0.95);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.15);
			opacity: 0.95;
		}
	}

	@keyframes ambientTwinkle {
		0%,
		100% {
			transform: scale(0.5) rotate(0deg);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.25) rotate(90deg);
			opacity: 1;
		}
	}

	@keyframes diaryPopClick {
		0% {
			transform: scale(0.95);
		}
		45% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1.08);
		}
	}

	@keyframes iconSpinBurst {
		0% {
			transform: scale(1) rotate(0deg);
		}
		40% {
			transform: scale(1.3) rotate(-15deg);
		}
		100% {
			transform: scale(1.1) rotate(0deg);
		}
	}

	@keyframes shockwaveExpand {
		0% {
			width: 30px;
			height: 30px;
			opacity: 1;
		}
		100% {
			width: 170px;
			height: 170px;
			opacity: 0;
		}
	}

	@keyframes starFlyOut {
		0% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
		}
		40% {
			opacity: 1;
			transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.4) rotate(180deg);
		}
		100% {
			opacity: 0;
			transform: translate(calc(-50% + var(--tx) * 1.35), calc(-50% + var(--ty) * 1.35)) scale(0) rotate(360deg);
		}
	}

	@media (max-width: 640px) {
		.diary-trigger {
			bottom: 16px;
			left: 16px;
		}

		.diary-btn {
			width: 52px;
			height: 52px;
			border-radius: 16px;
		}

		.diary-icon {
			width: 36px;
			height: 36px;
		}
	}
</style>
