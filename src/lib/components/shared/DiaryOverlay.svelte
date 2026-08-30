<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { DIARY_PAGES, type DiaryPage } from '$lib/data/diary-data';
	import { audioManager } from '$lib/stores/audio.svelte';

	interface Props {
		isOpen: boolean;
		onclose: () => void;
	}

	let { isOpen = $bindable(), onclose }: Props = $props();

	let currentPage = $state(0);
	let displayedText = $state<string[]>([]);
	let isTyping = $state(false);
	let cursorPosition = $state<{ paragraph: number; char: number }>({ paragraph: 0, char: 0 });
	let typingInterval: ReturnType<typeof setInterval> | null = null;
	let isFlipping = $state(false);
	let flipDirection = $state<'next' | 'prev'>('next');
	let showContent = $state(true);

	const page = $derived(DIARY_PAGES[currentPage]);
	const totalPages = DIARY_PAGES.length;

	function startTyping(pageData: DiaryPage) {
		stopTyping();
		displayedText = pageData.content.map(() => '');
		cursorPosition = { paragraph: 0, char: 0 };
		isTyping = true;

		let pIdx = 0;
		let cIdx = 0;
		let charCount = 0;

		typingInterval = setInterval(() => {
			if (pIdx >= pageData.content.length) {
				stopTyping();
				return;
			}

			const currentParagraph = pageData.content[pIdx];
			if (cIdx < currentParagraph.length) {
				displayedText[pIdx] = currentParagraph.substring(0, cIdx + 1);
				cursorPosition = { paragraph: pIdx, char: cIdx + 1 };
				cIdx++;
				charCount++;

				if (charCount % 2 === 0) {
					audioManager.play('keystroke');
				}
			} else {
				pIdx++;
				cIdx = 0;
			}
		}, 20);
	}

	function stopTyping() {
		if (typingInterval) {
			clearInterval(typingInterval);
			typingInterval = null;
		}
		isTyping = false;
	}

	function skipTyping() {
		stopTyping();
		displayedText = page.content.map((p) => p);
		cursorPosition = { paragraph: page.content.length - 1, char: page.content[page.content.length - 1].length };
	}

	function goToPage(pageIndex: number) {
		if (pageIndex < 0 || pageIndex >= totalPages || pageIndex === currentPage || isFlipping) return;

		stopTyping();
		flipDirection = pageIndex > currentPage ? 'next' : 'prev';
		isFlipping = true;
		showContent = false;

		audioManager.play('click');

		setTimeout(() => {
			currentPage = pageIndex;
			showContent = true;

			setTimeout(() => {
				isFlipping = false;
				startTyping(DIARY_PAGES[pageIndex]);
			}, 300);
		}, 380);
	}

	function nextPage() {
		goToPage(currentPage + 1);
	}

	function prevPage() {
		goToPage(currentPage - 1);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			nextPage();
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			prevPage();
		} else if (e.key === ' ' && isTyping) {
			e.preventDefault();
			skipTyping();
		}
	}

	function close() {
		stopTyping();
		audioManager.play('window_close');
		onclose();
	}

	$effect(() => {
		if (isOpen) {
			currentPage = 0;
			startTyping(DIARY_PAGES[0]);
		} else {
			stopTyping();
		}
	});

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		stopTyping();
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

{#if isOpen}
	<div
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		class="diary-backdrop"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={handleKeydown}
	>
		<div class="diary-book">
			<div class="diary-spine"></div>

			<div class="diary-page" class:flip-next={isFlipping && flipDirection === 'next'} class:flip-prev={isFlipping && flipDirection === 'prev'}>
				<div class="diary-margin"></div>
				<div class="diary-lines"></div>

				<button
					type="button"
					class="diary-close"
					onclick={close}
					aria-label="Close diary"
				>
					✕
				</button>

				{#if showContent}
					<div class="diary-content" class:diary-content-intro={page.type === 'intro'}>
						<div class="diary-header">
							<div class="diary-header-badge">
								{page.type === 'semester' ? `SEMESTER ${page.semesterNumber}` : page.type === 'index' ? 'DIRECTORY' : 'PROLOGUE'}
							</div>
							<h2 class="diary-title">
								{page.title}
							</h2>
							{#if page.subtitle}
								<p class="diary-subtitle">{page.subtitle}</p>
							{/if}
						</div>

						<div class="diary-body">
							{#each displayedText as text, i}
								{#if page.type === 'index'}
									<button
										type="button"
										class="diary-index-item"
										class:diary-index-active={text.length > 0}
										onclick={() => goToPage(i + 2)}
										disabled={text.length === 0}
									>
										<span class="diary-index-number">{i + 1}.</span>
										<span class="diary-index-label">{text}</span>
										{#if text.length > 0}
											<span class="diary-index-dots"></span>
											<span class="diary-index-page">pg. {i + 3}</span>
										{/if}
										{#if isTyping && cursorPosition.paragraph === i}
											<span class="diary-pen-anchor">
												<span class="diary-ink-splat"></span>
												<svg class="diary-fountain-pen" viewBox="0 0 80 140" width="40" height="70">
													<defs>
														<linearGradient id="penBarrelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
															<stop offset="0%" stop-color="#0f172a" />
															<stop offset="35%" stop-color="#1e3a8a" />
															<stop offset="65%" stop-color="#2563eb" />
															<stop offset="90%" stop-color="#172554" />
															<stop offset="100%" stop-color="#020617" />
														</linearGradient>
														<linearGradient id="penGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
															<stop offset="0%" stop-color="#b45309" />
															<stop offset="30%" stop-color="#fbbf24" />
															<stop offset="60%" stop-color="#fef08a" />
															<stop offset="100%" stop-color="#92400e" />
														</linearGradient>
													</defs>
													<path d="M40 134 L32 108 L48 108 Z" fill="url(#penGoldGrad)" stroke="#78350f" stroke-width="0.7" />
													<path d="M40 134 L36 114 L44 114 Z" fill="#fef08a" />
													<line x1="40" y1="134" x2="40" y2="116" stroke="#172554" stroke-width="0.8" />
													<circle cx="40" cy="116" r="1.3" fill="#172554" />
													<rect x="33" y="88" width="14" height="20" rx="1.5" fill="#1e293b" stroke="#0f172a" stroke-width="0.8" />
													<rect x="32" y="86" width="16" height="3" rx="0.5" fill="url(#penGoldGrad)" />
													<path d="M31 16 L49 16 L47 86 L33 86 Z" fill="url(#penBarrelGrad)" stroke="#0f172a" stroke-width="0.8" />
													<rect x="30.5" y="42" width="19" height="3" fill="url(#penGoldGrad)" />
													<rect x="31" y="83" width="18" height="2.5" fill="url(#penGoldGrad)" />
													<rect x="33" y="10" width="14" height="6" rx="2" fill="url(#penGoldGrad)" />
													<path d="M45 16 L46 56 L43.5 58 L43.5 16 Z" fill="url(#penGoldGrad)" stroke="#78350f" stroke-width="0.5" />
												</svg>
											</span>
										{/if}
									</button>
								{:else}
									<p class="diary-paragraph">
										<span>{text}</span>
										{#if isTyping && cursorPosition.paragraph === i}
											<span class="diary-pen-anchor">
												<span class="diary-ink-splat"></span>
												<svg class="diary-fountain-pen" viewBox="0 0 80 140" width="40" height="70">
													<defs>
														<linearGradient id="penBarrelGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
															<stop offset="0%" stop-color="#0f172a" />
															<stop offset="35%" stop-color="#1e3a8a" />
															<stop offset="65%" stop-color="#2563eb" />
															<stop offset="90%" stop-color="#172554" />
															<stop offset="100%" stop-color="#020617" />
														</linearGradient>
														<linearGradient id="penGoldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
															<stop offset="0%" stop-color="#b45309" />
															<stop offset="30%" stop-color="#fbbf24" />
															<stop offset="60%" stop-color="#fef08a" />
															<stop offset="100%" stop-color="#92400e" />
														</linearGradient>
													</defs>
													<path d="M40 134 L32 108 L48 108 Z" fill="url(#penGoldGrad2)" stroke="#78350f" stroke-width="0.7" />
													<path d="M40 134 L36 114 L44 114 Z" fill="#fef08a" />
													<line x1="40" y1="134" x2="40" y2="116" stroke="#172554" stroke-width="0.8" />
													<circle cx="40" cy="116" r="1.3" fill="#172554" />
													<rect x="33" y="88" width="14" height="20" rx="1.5" fill="#1e293b" stroke="#0f172a" stroke-width="0.8" />
													<rect x="32" y="86" width="16" height="3" rx="0.5" fill="url(#penGoldGrad2)" />
													<path d="M31 16 L49 16 L47 86 L33 86 Z" fill="url(#penBarrelGrad2)" stroke="#0f172a" stroke-width="0.8" />
													<rect x="30.5" y="42" width="19" height="3" fill="url(#penGoldGrad2)" />
													<rect x="31" y="83" width="18" height="2.5" fill="url(#penGoldGrad2)" />
													<rect x="33" y="10" width="14" height="6" rx="2" fill="url(#penGoldGrad2)" />
													<path d="M45 16 L46 56 L43.5 58 L43.5 16 Z" fill="url(#penGoldGrad2)" stroke="#78350f" stroke-width="0.5" />
												</svg>
											</span>
										{/if}
									</p>
								{/if}
							{/each}
						</div>

						{#if isTyping}
							<button type="button" class="diary-skip" onclick={skipTyping}>
								Press Space to skip ▸
							</button>
						{/if}
					</div>
				{/if}

				<div class="diary-nav">
					<button
						type="button"
						class="diary-nav-btn"
						onclick={prevPage}
						disabled={currentPage === 0 || isFlipping}
						aria-label="Previous page"
					>
						◂ Prev
					</button>

					<span class="diary-page-num">
						{currentPage + 1} / {totalPages}
					</span>

					<button
						type="button"
						class="diary-nav-btn"
						onclick={nextPage}
						disabled={currentPage === totalPages - 1 || isFlipping}
						aria-label="Next page"
					>
						Next ▸
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(:root) {
		--diary-line-height: 36px;
		--diary-header-height: 104px;
	}

	.diary-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(5, 7, 15, 0.82);
		backdrop-filter: blur(10px);
		animation: fadeIn 0.3s ease-out;
	}

	.diary-book {
		position: relative;
		width: min(94vw, 720px);
		height: min(88vh, 840px);
		display: flex;
		filter: drop-shadow(0 25px 60px rgba(0, 0, 0, 0.7));
		animation: bookOpen 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.diary-spine {
		width: 32px;
		flex-shrink: 0;
		background: linear-gradient(135deg, #3d2314, #6a3e1b, #4a2810);
		border-radius: 10px 0 0 10px;
		box-shadow:
			inset -4px 0 8px rgba(0, 0, 0, 0.5),
			inset 2px 0 4px rgba(255, 255, 255, 0.12);
		position: relative;
	}

	.diary-spine::after {
		content: '';
		position: absolute;
		top: 24px;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		width: 3px;
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(212, 175, 55, 0.6) 10%,
			rgba(212, 175, 55, 0.3) 50%,
			rgba(212, 175, 55, 0.6) 90%,
			transparent
		);
		border-radius: 2px;
	}

	.diary-page {
		flex: 1;
		position: relative;
		background: linear-gradient(175deg, #faf7f0 0%, #f6f0e4 40%, #eee5d3 100%);
		border-radius: 0 8px 8px 0;
		overflow: hidden;
		transform-origin: left center;
		box-shadow:
			4px 4px 20px rgba(0, 0, 0, 0.25),
			inset 0 0 80px rgba(139, 94, 60, 0.08);
	}

	.diary-page.flip-next {
		animation: flipNext 0.38s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.diary-page.flip-prev {
		animation: flipPrev 0.38s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.diary-margin {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 64px;
		width: 2px;
		background: rgba(220, 68, 68, 0.4);
		box-shadow: 0 0 1px rgba(220, 68, 68, 0.2);
		z-index: 1;
		pointer-events: none;
	}

	.diary-lines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			to bottom,
			transparent,
			transparent calc(var(--diary-line-height) - 1px),
			rgba(59, 130, 246, 0.18) calc(var(--diary-line-height) - 1px),
			rgba(59, 130, 246, 0.18) var(--diary-line-height)
		);
		background-position-y: var(--diary-header-height);
		pointer-events: none;
		z-index: 0;
	}

	.diary-close {
		position: absolute;
		top: 14px;
		right: 16px;
		z-index: 10;
		width: 30px;
		height: 30px;
		border: none;
		background: rgba(139, 94, 60, 0.12);
		border-radius: 50%;
		cursor: pointer;
		font-size: 14px;
		color: #78350f;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.diary-close:hover {
		background: rgba(220, 68, 68, 0.2);
		color: #991b1b;
		transform: scale(1.1);
	}

	.diary-content {
		position: relative;
		z-index: 2;
		height: calc(100% - 50px);
		overflow-y: auto;
		animation: contentFadeIn 0.3s ease-out;
		display: flex;
		flex-direction: column;
	}

	.diary-content::-webkit-scrollbar {
		width: 6px;
	}

	.diary-content::-webkit-scrollbar-track {
		background: transparent;
	}

	.diary-content::-webkit-scrollbar-thumb {
		background: rgba(30, 58, 138, 0.18);
		border-radius: 3px;
	}

	.diary-content::-webkit-scrollbar-thumb:hover {
		background: rgba(30, 58, 138, 0.35);
	}

	.diary-header {
		height: var(--diary-header-height);
		padding: 24px 32px 0 78px;
		border-bottom: 2px solid rgba(220, 68, 68, 0.35);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: 10px;
		position: relative;
		flex-shrink: 0;
	}

	.diary-header-badge {
		font-family: 'Kalam', cursive;
		font-size: 0.72rem;
		font-weight: 700;
		color: #b45309;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 2px;
	}

	.diary-title {
		font-family: 'Kalam', 'Caveat', cursive;
		font-size: 1.85rem;
		font-weight: 700;
		color: #0f294a;
		margin: 0;
		line-height: 1.2;
		letter-spacing: -0.01em;
	}

	.diary-subtitle {
		font-family: 'Caveat', 'Kalam', cursive;
		font-size: 1.15rem;
		font-weight: 600;
		color: #2563eb;
		margin: 2px 0 0;
		line-height: 1.2;
	}

	.diary-body {
		padding: 0 32px 40px 78px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.diary-paragraph {
		font-family: 'Caveat', 'Kalam', cursive;
		font-size: 1.42rem;
		font-weight: 600;
		line-height: var(--diary-line-height);
		color: #1e3a8a;
		margin: 0;
		margin-bottom: var(--diary-line-height);
		min-height: var(--diary-line-height);
		position: relative;
		letter-spacing: 0.015em;
		word-spacing: 0.08em;
	}

	.diary-content-intro .diary-paragraph:first-child {
		font-weight: 700;
		color: #0f294a;
		font-size: 1.55rem;
	}

	.diary-content-intro .diary-paragraph:last-child {
		text-align: right;
		font-weight: 700;
		color: #0f294a;
		font-size: 1.45rem;
		margin-top: 10px;
	}

	.diary-index-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: var(--diary-line-height);
		padding: 0 4px 0 0;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: 'Caveat', 'Kalam', cursive;
		font-size: 1.38rem;
		font-weight: 600;
		color: #1e3a8a;
		text-align: left;
		transition: all 0.2s;
		opacity: 0.25;
		position: relative;
	}

	.diary-index-item.diary-index-active {
		opacity: 1;
	}

	.diary-index-item:hover:not(:disabled) {
		color: #1d4ed8;
		transform: translateX(4px);
	}

	.diary-index-item:disabled {
		cursor: default;
	}

	.diary-index-number {
		font-family: 'Kalam', cursive;
		font-weight: 700;
		color: #b45309;
		min-width: 24px;
		font-size: 1.25rem;
	}

	.diary-index-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.diary-index-dots {
		flex: 1;
		border-bottom: 1px dotted rgba(59, 130, 246, 0.4);
		margin: 0 10px;
		height: 1px;
	}

	.diary-index-page {
		font-size: 1.15rem;
		color: #2563eb;
		font-style: italic;
		white-space: nowrap;
	}

	.diary-pen-anchor {
		display: inline-block;
		position: relative;
		width: 0;
		height: 0;
		vertical-align: baseline;
		pointer-events: none;
	}

	.diary-fountain-pen {
		position: absolute;
		left: -1px;
		bottom: -2px;
		transform: translate(-14px, 46px) rotate(-38deg);
		transform-origin: 40px 134px;
		filter: drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.35));
		animation: penWritingScribble 0.14s ease-in-out infinite alternate;
		z-index: 30;
		pointer-events: none;
	}

	.diary-ink-splat {
		position: absolute;
		left: 0;
		bottom: 2px;
		width: 3.5px;
		height: 3.5px;
		border-radius: 50%;
		background: #1d4ed8;
		box-shadow: 0 0 6px rgba(37, 99, 235, 0.6);
		animation: inkPulse 0.3s ease-out infinite alternate;
	}

	.diary-skip {
		position: absolute;
		bottom: 58px;
		right: 24px;
		z-index: 5;
		border: 1px solid rgba(59, 130, 246, 0.3);
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(4px);
		padding: 5px 14px;
		border-radius: 14px;
		font-family: 'Caveat', cursive;
		font-size: 1.05rem;
		font-weight: 700;
		color: #1e3a8a;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.diary-skip:hover {
		background: #1e3a8a;
		color: #ffffff;
		border-color: #1e3a8a;
		transform: translateY(-1px);
	}

	.diary-nav {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px 0 78px;
		border-top: 1.5px solid rgba(59, 130, 246, 0.25);
		background: linear-gradient(to top, rgba(238, 229, 211, 0.95), rgba(246, 240, 228, 0.8));
		z-index: 5;
	}

	.diary-nav-btn {
		border: 1px solid rgba(30, 58, 138, 0.25);
		background: rgba(255, 255, 255, 0.6);
		font-family: 'Caveat', cursive;
		font-size: 1.2rem;
		font-weight: 700;
		color: #1e3a8a;
		cursor: pointer;
		padding: 3px 14px;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.diary-nav-btn:hover:not(:disabled) {
		background: #1e3a8a;
		color: #ffffff;
		border-color: #1e3a8a;
	}

	.diary-nav-btn:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.diary-page-num {
		font-family: 'Caveat', cursive;
		font-size: 1.15rem;
		font-weight: 700;
		color: #1e3a8a;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes bookOpen {
		0% {
			opacity: 0;
			transform: scale(0.7) perspective(800px) rotateY(-30deg);
		}
		60% {
			transform: scale(1.02) perspective(800px) rotateY(3deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) perspective(800px) rotateY(0deg);
		}
	}

	@keyframes flipNext {
		0% {
			transform: perspective(1200px) rotateY(0deg);
		}
		50% {
			transform: perspective(1200px) rotateY(-8deg);
		}
		100% {
			transform: perspective(1200px) rotateY(0deg);
		}
	}

	@keyframes flipPrev {
		0% {
			transform: perspective(1200px) rotateY(0deg);
		}
		50% {
			transform: perspective(1200px) rotateY(8deg);
		}
		100% {
			transform: perspective(1200px) rotateY(0deg);
		}
	}

	@keyframes contentFadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes penWritingScribble {
		0% {
			transform: translate(-14px, 46px) rotate(-38deg) translateY(0);
		}
		50% {
			transform: translate(-13px, 44.5px) rotate(-36deg) translateY(-1.5px);
		}
		100% {
			transform: translate(-14.5px, 47px) rotate(-39.5deg) translateY(1px);
		}
	}

	@keyframes inkPulse {
		from {
			transform: scale(0.8);
			opacity: 0.7;
		}
		to {
			transform: scale(1.3);
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.diary-book {
			width: 96vw;
			height: 90vh;
		}

		.diary-spine {
			width: 20px;
		}

		.diary-margin {
			left: 44px;
		}

		.diary-header {
			padding: 18px 20px 0 54px;
		}

		.diary-title {
			font-size: 1.45rem;
		}

		.diary-body {
			padding: 0 20px 40px 54px;
		}

		.diary-paragraph {
			font-size: 1.25rem;
		}

		.diary-index-item {
			font-size: 1.18rem;
		}

		.diary-nav {
			padding: 0 16px 0 54px;
		}

		.diary-fountain-pen {
			width: 32px;
			height: 56px;
		}
	}
</style>
