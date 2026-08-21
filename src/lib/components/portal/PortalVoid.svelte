<script lang="ts">
	import { onMount } from 'svelte';

	interface Particle {
		x: number;
		y: number;
		radius: number;
		vx: number;
		vy: number;
		alpha: number;
		baseAlpha: number;
		pulseSpeed: number;
	}

	let canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const particleCount = prefersReducedMotion ? 25 : width < 768 ? 40 : 85;

		const particles: Particle[] = Array.from({ length: particleCount }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			radius: Math.random() * 1.6 + 0.4,
			vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.25),
			vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.25),
			alpha: Math.random() * 0.7 + 0.2,
			baseAlpha: Math.random() * 0.7 + 0.2,
			pulseSpeed: Math.random() * 0.02 + 0.005
		}));

		function handleResize() {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', handleResize);

		let time = 0;
		function render() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			time += 0.02;

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;

				const dynamicAlpha = p.baseAlpha + Math.sin(time + i) * 0.2;
				const clampedAlpha = Math.max(0.1, Math.min(0.9, dynamicAlpha));

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(180, 190, 254, ${clampedAlpha})`;
				ctx.fill();
			}

			animationFrameId = requestAnimationFrame(render);
		}

		render();

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-60"
	aria-hidden="true"
></canvas>
