<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement | null = $state(null);

	interface Star {
		x: number;
		y: number;
		z: number;
		size: number;
		alpha: number;
		twinkleSpeed: number;
	}

	onMount(() => {
		if (!canvasEl) return;
		const canvas = canvasEl;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const starCount = Math.min(220, Math.floor((width * height) / 6000));
		const stars: Star[] = Array.from({ length: starCount }, () => ({
			x: (Math.random() - 0.5) * width * 2,
			y: (Math.random() - 0.5) * height * 2,
			z: Math.random() * width,
			size: Math.random() * 1.5 + 0.5,
			alpha: Math.random() * 0.8 + 0.2,
			twinkleSpeed: Math.random() * 0.02 + 0.005
		}));

		function resize() {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', resize);

		function render() {
			if (!ctx) return;

			ctx.fillStyle = '#030712';
			ctx.fillRect(0, 0, width, height);

			const gradient = ctx.createRadialGradient(
				width * 0.7,
				height * 0.3,
				50,
				width * 0.7,
				height * 0.3,
				width * 0.6
			);
			gradient.addColorStop(0, 'rgba(14, 116, 144, 0.12)');
			gradient.addColorStop(0.5, 'rgba(88, 28, 135, 0.08)');
			gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);

			const cx = width / 2;
			const cy = height / 2;

			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];
				s.z -= 0.6;
				if (s.z <= 0) {
					s.z = width;
					s.x = (Math.random() - 0.5) * width * 2;
					s.y = (Math.random() - 0.5) * height * 2;
				}

				const k = 250 / s.z;
				const px = s.x * k + cx;
				const py = s.y * k + cy;

				if (px >= 0 && px <= width && py >= 0 && py <= height) {
					s.alpha += s.twinkleSpeed;
					const currentAlpha = 0.3 + 0.7 * Math.abs(Math.sin(s.alpha));
					const rad = Math.max(0.5, s.size * (1 - s.z / width) * 2);

					ctx.beginPath();
					ctx.arc(px, py, rad, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(186, 230, 253, ${currentAlpha})`;
					ctx.fill();
				}
			}

			animId = requestAnimationFrame(render);
		}

		render();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas
	bind:this={canvasEl}
	class="fixed inset-0 w-full h-full pointer-events-none z-0"
	aria-hidden="true"
></canvas>
