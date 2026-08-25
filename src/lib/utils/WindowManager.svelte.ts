import { audioManager } from '$lib/stores/audio.svelte';
import type { Position, Size } from '$lib/types/window';

export interface BaseWindowState {
	isOpen: boolean;
	isMinimized: boolean;
	isMaximized: boolean;
	zIndex: number;
	position: Position;
	size: Size;
}

export class BaseWindowManager<TId extends string, TState extends BaseWindowState> {
	activeId = $state<TId | null>(null);
	highestZIndex = $state(20);
	windows: Record<TId, TState>;

	constructor(initialWindows: Record<TId, TState>, defaultActiveId: TId | null = null) {
		this.windows = $state<Record<TId, TState>>({ ...initialWindows });
		this.activeId = defaultActiveId;
	}

	private normalizeZIndices() {
		if (this.highestZIndex > 500) {
			const sorted = (Object.keys(this.windows) as TId[])
				.map((id) => ({ id, zIndex: this.windows[id].zIndex }))
				.sort((a, b) => a.zIndex - b.zIndex);

			sorted.forEach((item, index) => {
				this.windows[item.id].zIndex = index + 1;
			});
			this.highestZIndex = sorted.length + 1;
		}
	}

	open(id: TId) {
		audioManager.play('click');
		this.normalizeZIndices();
		this.highestZIndex += 1;
		this.windows[id].isOpen = true;
		this.windows[id].isMinimized = false;
		this.windows[id].zIndex = this.highestZIndex;
		this.activeId = id;
	}

	close(id: TId, fallbackId: TId | null = null) {
		audioManager.play('click');
		this.windows[id].isOpen = false;
		if (this.activeId === id) {
			const remainingOpen = (Object.keys(this.windows) as TId[]).filter(
				(k) => this.windows[k].isOpen && !this.windows[k].isMinimized && k !== id
			);
			this.activeId =
				remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : fallbackId;
		}
	}

	focus(id: TId) {
		if (this.activeId === id && this.windows[id].zIndex === this.highestZIndex) return;
		this.normalizeZIndices();
		this.highestZIndex += 1;
		this.windows[id].zIndex = this.highestZIndex;
		this.windows[id].isMinimized = false;
		this.activeId = id;
	}

	toggleMinimize(id: TId, fallbackId: TId | null = null) {
		audioManager.play('click');
		this.windows[id].isMinimized = !this.windows[id].isMinimized;
		if (this.windows[id].isMinimized && this.activeId === id) {
			const remainingOpen = (Object.keys(this.windows) as TId[]).filter(
				(k) => this.windows[k].isOpen && !this.windows[k].isMinimized && k !== id
			);
			this.activeId =
				remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : fallbackId;
		} else if (!this.windows[id].isMinimized) {
			this.focus(id);
		}
	}

	toggleMaximize(id: TId) {
		audioManager.play('click');
		this.windows[id].isMaximized = !this.windows[id].isMaximized;
		this.focus(id);
	}

	updatePosition(id: TId, pos: Position) {
		this.windows[id].position = pos;
	}

	updateSize(id: TId, size: Size) {
		this.windows[id].size = size;
	}
}
