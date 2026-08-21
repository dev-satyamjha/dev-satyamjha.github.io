import { animate } from 'motion';

export function isReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateEntrance(elements: HTMLElement[] | NodeListOf<HTMLElement>, baseDelay = 0.08) {
	if (isReducedMotion() || !elements || elements.length === 0) return;

	elements.forEach((el, index) => {
		animate(
			el,
			{
				opacity: [0, 1],
				y: [24, 0],
				scale: [0.96, 1]
			},
			{
				delay: index * baseDelay,
				duration: 0.45,
				ease: 'easeOut'
			}
		);
	});
}

export function animateFadeIn(element: HTMLElement, duration = 0.4, delay = 0) {
	if (isReducedMotion() || !element) return;
	animate(element, { opacity: [0, 1] }, { duration, delay, ease: 'easeOut' });
}

export function animateWarp(overlay: HTMLElement, onComplete: () => void) {
	if (isReducedMotion() || !overlay) {
		onComplete();
		return;
	}

	const controls = animate(
		overlay,
		{
			opacity: [0, 1],
			scale: [0.8, 1.05]
		},
		{
			duration: 0.35,
			ease: 'easeOut'
		}
	);

	controls.then(() => {
		onComplete();
	});
}
