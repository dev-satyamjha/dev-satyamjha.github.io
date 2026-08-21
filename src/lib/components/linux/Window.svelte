<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WindowState, Position, Size } from '$lib/types/window';
	import { hyprland } from '$lib/themes/linux/HyprlandConfig.svelte';
	import WindowControls from './WindowControls.svelte';

	interface Props {
		windowState: WindowState;
		children?: Snippet;
	}

	let { windowState, children }: Props = $props();

	let isDragging = $state(false);
	let dragStartPos = $state<Position>({ x: 0, y: 0 });
	let initialWindowPos = $state<Position>({ x: 0, y: 0 });

	let isResizing = $state(false);
	let resizeDirection = $state<string | null>(null);
	let resizeStartPos = $state<Position>({ x: 0, y: 0 });
	let initialWindowSize = $state<Size>({ width: 0, height: 0 });

	let isFocused = $derived(hyprland.activeWindowId === windowState.id);

	function handleTitlebarPointerDown(e: PointerEvent) {
		if (windowState.isMaximized || hyprland.isTiled) return;
		if ((e.target as HTMLElement).closest('button')) return;

		hyprland.focusWindow(windowState.id);
		isDragging = true;
		dragStartPos = { x: e.clientX, y: e.clientY };
		initialWindowPos = { ...windowState.position };

		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function handleTitlebarPointerMove(e: PointerEvent) {
		if (!isDragging) return;

		const dx = e.clientX - dragStartPos.x;
		const dy = e.clientY - dragStartPos.y;

		const maxX = typeof window !== 'undefined' ? window.innerWidth - 100 : 1000;
		const maxY = typeof window !== 'undefined' ? window.innerHeight - 100 : 800;

		const newX = Math.max(0, Math.min(maxX, initialWindowPos.x + dx));
		const newY = Math.max(40, Math.min(maxY, initialWindowPos.y + dy));

		hyprland.updatePosition(windowState.id, { x: newX, y: newY });
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
		if (windowState.isMaximized || hyprland.isTiled) return;

		e.stopPropagation();
		hyprland.focusWindow(windowState.id);
		isResizing = true;
		resizeDirection = direction;
		resizeStartPos = { x: e.clientX, y: e.clientY };
		initialWindowSize = { ...windowState.size };
		initialWindowPos = { ...windowState.position };

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
			newWidth = Math.max(340, initialWindowSize.width + dx);
		}
		if (resizeDirection.includes('s')) {
			newHeight = Math.max(220, initialWindowSize.height + dy);
		}
		if (resizeDirection.includes('w')) {
			const potentialWidth = initialWindowSize.width - dx;
			if (potentialWidth >= 340) {
				newWidth = potentialWidth;
				newX = initialWindowPos.x + dx;
			}
		}
		if (resizeDirection.includes('n')) {
			const potentialHeight = initialWindowSize.height - dy;
			if (potentialHeight >= 220) {
				newHeight = potentialHeight;
				newY = initialWindowPos.y + dy;
			}
		}

		hyprland.updateSize(windowState.id, { width: newWidth, height: newHeight });
		if (newX !== initialWindowPos.x || newY !== initialWindowPos.y) {
			hyprland.updatePosition(windowState.id, { x: newX, y: newY });
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

{#if windowState.isOpen && !windowState.isMinimized}
	<section
		aria-label={windowState.title}
		onpointerdown={() => hyprland.focusWindow(windowState.id)}
		class={`flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all duration-150 ${
			windowState.isMaximized
				? 'fixed inset-x-0 bottom-0 top-10 rounded-none z-40'
				: hyprland.isTiled
					? 'relative w-full h-full min-h-[380px]'
					: 'absolute'
		} ${
			isFocused
				? 'border-[#cba6f7] shadow-[#cba6f7]/10'
				: 'border-[#313244] opacity-95'
		}`}
		style={
			!windowState.isMaximized && !hyprland.isTiled
				? `left: ${windowState.position.x}px; top: ${windowState.position.y}px; width: ${windowState.size.width}px; height: ${windowState.size.height}px; z-index: ${windowState.zIndex};`
				: `z-index: ${windowState.zIndex};`
		}
	>
		<header
			role="presentation"
			onpointerdown={handleTitlebarPointerDown}
			onpointermove={handleTitlebarPointerMove}
			onpointerup={handleTitlebarPointerUp}
			ondblclick={() => hyprland.toggleMaximize(windowState.id)}
			class={`h-9 px-3 flex items-center justify-between font-mono text-xs select-none cursor-grab active:cursor-grabbing border-b ${
				isFocused
					? 'bg-[#181825] text-white border-[#cba6f7]/40'
					: 'bg-[#11111b] text-[#a6adc8] border-[#313244]'
			}`}
		>
			<div class="flex items-center gap-2 truncate">
				<span class="nf text-xs text-[#cba6f7]">{windowState.icon}</span>
				<span class="font-bold truncate text-[11px]">{windowState.title}</span>
			</div>

			<WindowControls
				isMaximized={windowState.isMaximized}
				onminimize={() => hyprland.toggleMinimize(windowState.id)}
				onmaximize={() => hyprland.toggleMaximize(windowState.id)}
				onclose={() => hyprland.closeWindow(windowState.id)}
			/>
		</header>

		<div class="flex-1 bg-[#181825]/95 backdrop-blur-md overflow-auto flex flex-col">
			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if !windowState.isMaximized && !hyprland.isTiled}
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
