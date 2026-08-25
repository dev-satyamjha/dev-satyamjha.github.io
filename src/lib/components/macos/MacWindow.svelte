<script lang="ts">
	import type { Snippet } from 'svelte';
	import { macos, type MacWindowState } from '$lib/themes/macos/MacOSConfig.svelte';
	import type { Position, Size } from '$lib/types/window';

	interface Props {
		appState: MacWindowState;
		children?: Snippet;
	}

	let { appState, children }: Props = $props();

	let isDragging = $state(false);
	let dragStartPos = $state<Position>({ x: 0, y: 0 });
	let initialWindowPos = $state<Position>({ x: 0, y: 0 });

	let isResizing = $state(false);
	let resizeDirection = $state<string | null>(null);
	let resizeStartPos = $state<Position>({ x: 0, y: 0 });
	let initialWindowSize = $state<Size>({ width: 0, height: 0 });

	let isFocused = $derived(macos.activeAppId === appState.id);

	function handleTitlebarPointerDown(e: PointerEvent) {
		if (appState.isMaximized) return;
		if ((e.target as HTMLElement).closest('button')) return;

		macos.focusApp(appState.id);
		isDragging = true;
		dragStartPos = { x: e.clientX, y: e.clientY };
		initialWindowPos = { ...appState.position };

		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function handleTitlebarPointerMove(e: PointerEvent) {
		if (!isDragging) return;

		const dx = e.clientX - dragStartPos.x;
		const dy = e.clientY - dragStartPos.y;

		const maxX = typeof window !== 'undefined' ? window.innerWidth - 100 : 1000;
		const maxY = typeof window !== 'undefined' ? window.innerHeight - 100 : 800;

		const newX = Math.max(0, Math.min(maxX, initialWindowPos.x + dx));
		const newY = Math.max(32, Math.min(maxY, initialWindowPos.y + dy));

		macos.updateAppPosition(appState.id, { x: newX, y: newY });
	}

	function handleTitlebarPointerUp(e: PointerEvent) {
		if (isDragging) {
			isDragging = false;
			try {
				(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
			} catch {}
		}
	}

	function handleResizePointerDown(direction: string, e: PointerEvent) {
		if (appState.isMaximized) return;

		e.stopPropagation();
		macos.focusApp(appState.id);
		isResizing = true;
		resizeDirection = direction;
		resizeStartPos = { x: e.clientX, y: e.clientY };
		initialWindowSize = { ...appState.size };
		initialWindowPos = { ...appState.position };

		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function handleResizePointerMove(e: PointerEvent) {
		if (!isResizing || !resizeDirection) return;

		const dx = e.clientX - resizeStartPos.x;
		const dy = e.clientY - resizeStartPos.y;

		let newWidth = initialWindowSize.width;
		let newHeight = initialWindowSize.height;
		let newX = initialWindowPos.x;
		let newY = initialWindowPos.y;

		if (resizeDirection.includes('e')) {
			newWidth = Math.max(380, initialWindowSize.width + dx);
		}
		if (resizeDirection.includes('s')) {
			newHeight = Math.max(260, initialWindowSize.height + dy);
		}
		if (resizeDirection.includes('w')) {
			const potentialWidth = initialWindowSize.width - dx;
			if (potentialWidth >= 380) {
				newWidth = potentialWidth;
				newX = initialWindowPos.x + dx;
			}
		}
		if (resizeDirection.includes('n')) {
			const potentialHeight = initialWindowSize.height - dy;
			if (potentialHeight >= 260) {
				newHeight = potentialHeight;
				newY = initialWindowPos.y + dy;
			}
		}

		macos.updateAppSize(appState.id, { width: newWidth, height: newHeight });
		if (newX !== initialWindowPos.x || newY !== initialWindowPos.y) {
			macos.updateAppPosition(appState.id, { x: newX, y: newY });
		}
	}

	function handleResizePointerUp(e: PointerEvent) {
		if (isResizing) {
			isResizing = false;
			resizeDirection = null;
			try {
				(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
			} catch {}
		}
	}
</script>

{#if appState.isOpen && !appState.isMinimized}
	<section
		aria-label={appState.title}
		onpointerdown={() => macos.focusApp(appState.id)}
		class={`flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all duration-150 font-sans ${
			appState.isMaximized ? 'fixed inset-x-2 top-8 bottom-20 rounded-2xl z-40' : 'absolute'
		} ${
			isFocused
				? 'border-white/30 shadow-2xl shadow-black/60 bg-[#1e1e2e]/95 backdrop-blur-3xl'
				: 'border-white/10 opacity-95 shadow-lg bg-[#181825]/90 backdrop-blur-xl'
		}`}
		style={!appState.isMaximized
			? `left: ${appState.position.x}px; top: ${appState.position.y}px; width: ${appState.size.width}px; height: ${appState.size.height}px; z-index: ${appState.zIndex};`
			: `z-index: ${appState.zIndex};`}
	>
		<header
			role="presentation"
			onpointerdown={handleTitlebarPointerDown}
			onpointermove={handleTitlebarPointerMove}
			onpointerup={handleTitlebarPointerUp}
			ondblclick={() => macos.toggleMaximizeApp(appState.id)}
			class="h-10 px-4 flex items-center justify-between border-b border-white/10 select-none cursor-grab active:cursor-grabbing bg-white/5"
		>
			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={() => macos.closeApp(appState.id)}
					aria-label="Close window"
					class="group w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center cursor-pointer border border-[#e0443e]"
				>
					<span
						class="nf text-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity leading-none"
					>
						{'\uf00d'}
					</span>
				</button>

				<button
					type="button"
					onclick={() => macos.toggleMinimizeApp(appState.id)}
					aria-label="Minimize window"
					class="group w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center cursor-pointer border border-[#dea123]"
				>
					<span
						class="nf text-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity leading-none"
					>
						{'\uf068'}
					</span>
				</button>

				<button
					type="button"
					onclick={() => macos.toggleMaximizeApp(appState.id)}
					aria-label="Maximize window"
					class="group w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center cursor-pointer border border-[#1aab29]"
				>
					<span
						class="nf text-[8px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity leading-none"
					>
						{'\uf065'}
					</span>
				</button>
			</div>

			<div class="flex items-center gap-2 truncate px-4">
				<span class="nf text-xs text-[#89b4fa]">{appState.icon}</span>
				<span class="text-xs font-medium text-white/90 truncate">{appState.title}</span>
			</div>

			<div class="w-12"></div>
		</header>

		<div class="flex-1 overflow-auto flex flex-col">
			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if !appState.isMaximized}
			<div
				role="presentation"
				class="absolute top-0 right-0 w-2 h-full cursor-ew-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('e', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
			<div
				role="presentation"
				class="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('s', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
			<div
				role="presentation"
				class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('se', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
			<div
				role="presentation"
				class="absolute top-0 left-0 w-2 h-full cursor-ew-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('w', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
			<div
				role="presentation"
				class="absolute top-0 left-0 w-full h-2 cursor-ns-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('n', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
			<div
				role="presentation"
				class="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize select-none"
				onpointerdown={(e) => handleResizePointerDown('sw', e)}
				onpointermove={handleResizePointerMove}
				onpointerup={handleResizePointerUp}
			></div>
		{/if}
	</section>
{/if}
